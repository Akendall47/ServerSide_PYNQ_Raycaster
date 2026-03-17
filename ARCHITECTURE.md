# Server Architecture: Pipeline Design and Concurrency Model

---

## The honest picture

The server is described as "SEDA" in the codebase comments — and the inspiration is genuine — but the implementation is more precisely an **asyncio event-driven pipeline with one real thread boundary**.

The workload is almost entirely I/O-bound: UDP network messaging, FPGA BRAM communication, and WebSocket/SSE state delivery to the monitor. For I/O-bound workloads, asyncio beats thread pools on every relevant metric:

- **No context switching** — the event loop yields cooperatively only at `await` points, not whenever the OS decides to preempt. Context switches have real cost (register save/restore, TLB flush, cache warming); asyncio avoids them entirely on the hot path.
- **No locking** — shared state (the player dict, match flags, map data) is accessed by T1/T2/T3 without any mutexes because cooperative scheduling guarantees they never interleave mid-statement. Thread pools would require a lock around every access.
- **Lower latency** — a coroutine that is ready to run executes immediately when control is yielded to it. A thread waiting on a lock or for the OS scheduler to give it a time slice has no such guarantee.

Thread pools would add all of this overhead for zero gain — there is no CPU-heavy parallel work to distribute.

True SEDA (Staged Event-Driven Architecture, Welsh et al. 2001) gives each stage its own thread pool and lets stages run in parallel. Our design does not do that. T1, T2, and T3 are all `asyncio` coroutines running on a **single OS thread** inside a single event loop. They do not run in parallel; they take turns cooperatively. Only T4 is a genuine second OS thread.

This is not a weakness — it is the right design for this workload. Here is why, and how it all fits together.

---

## Naming — why T1/T2/T3/T4?

The T-prefixed names come from the SEDA convention of numbering pipeline stages sequentially (Stage 1, Stage 2, …). We use T for "task" or "stage". The benefit is purely navigational: seeing `t2_packet_handler.py` or `t4_redis_writer.py` in the file listing immediately tells you which stage of the pipeline it belongs to and roughly where it sits in the data flow — without opening anything. T1 feeds T2, T2 feeds T3 and T4. The order is the architecture.

---

## The four stages

```
                   ┌─────────────────────────────── single OS thread (asyncio event loop) ──────────────────────────────┐
                   │                                                                                                       │
  UDP arrives ───► │  T1 UDPReceiver        packet_queue         T2 GameTick        broadcast_queue     T3 Broadcaster   │ ───► UDP sent
                   │  (DatagramProtocol) ──► (asyncio.Queue) ──► (60 Hz coroutine) ──► (asyncio.Queue) ──► (coroutine)   │
                   │                                │                                                                      │
                   └────────────────────────────────┼─────────────────────────────────────────────────────────────────────┘
                                                    │ write_queue
                                                    │ (queue.SimpleQueue)  ← thread boundary
                                                    ▼
                                             T4 RedisWriter
                                             (OS thread, blocking redis-py calls)
                                                    │
                                                 Redis
```

---

## T1 — UDPReceiver

**What:** `asyncio.DatagramProtocol` subclass. The event loop calls `datagram_received()` each time a UDP packet arrives on port 9000.

**What it does:** Peeks at the packet type header. If it is a `PKT_PERF` telemetry packet it handles it inline (just a log write). Everything else is placed on `packet_queue` with `put_nowait()` — a non-blocking call that returns immediately.

**Why a callback, not a coroutine:** `DatagramProtocol.datagram_received()` is called by the event loop's I/O multiplexer (epoll/kqueue under the hood). It cannot `await`. The design is therefore: do the absolute minimum (peek + enqueue) and return. T2 does the real processing.

**Why `put_nowait()` and not `await put()`:** The queue has no max size, so `put_nowait()` never raises. Using `await put()` would be wrong here — T1's callback is not a coroutine and cannot suspend.

**File:** `pynq_full/ec2/server/t1_udp_receiver.py`

---

## T2 — GameTick

**What:** The heart of the server. An `async def run()` coroutine that loops at 60 Hz.

**What it does each tick:**
1. Drain `packet_queue` — process every packet that arrived since the last tick.
2. Run game logic — proximity check, ghost movement, bit collection, match state transitions.
3. Build the `PKT_GAME_STATE` broadcast payload.
4. Put it on `broadcast_queue` for T3.
5. Put Redis write jobs on `write_queue` for T4.
6. Sleep for whatever time remains in the 16.67 ms tick budget.

**Why asyncio and not a thread:** T2 owns the authoritative game state — the `players` dict, match flags, bits, everything. If T2 were a thread, every access to that state from T1 or T3 would need a lock. As a coroutine on the same event loop, T1/T2/T3 cannot interleave mid-statement — a coroutine only yields at `await` points. No locks, no races.

**The drain loop:**

```python
# pynq_full/ec2/server/t2_game_tick.py
while True:
    try:
        data, addr = self._packet_queue.get_nowait()
        await self._handler.handle(data, addr)
    except asyncio.QueueEmpty:
        break
```

This processes all queued packets at the top of the tick before doing anything else. If a burst of packets arrived during the previous tick's sleep, they are all handled at once at the start of the next tick.

**File:** `pynq_full/ec2/server/t2_game_tick.py`, `t2_packet_handler.py`, `t2_game_logic.py`, `t2_constants.py`, `t2_map_loader.py`

---

## T3 — Broadcaster

**What:** An `async def run()` coroutine that waits on `broadcast_queue`.

**What it does:** Picks up the `(payload, addrs)` tuple T2 placed on the queue, then calls `transport.sendto(payload, addr)` for each registered node address. Uses the **same transport object** that T1 bound — so every outbound packet has source port 9000, which is essential for NAT to allow return traffic through.

**Why separated from T2:** In principle T2 could call `sendto` directly. The separation exists so T3 is a clean, measurable stage. If `sendto` ever backed up (kernel send buffer full under load), it would not stall T2's game logic. In practice on a lightly-loaded EC2 instance this is not a concern, but the architecture is correct regardless.

**Why the same transport as T1:** See [PERFORMANCE_AND_DESIGN.md §2.2](PERFORMANCE_AND_DESIGN.md) for the NAT explanation. The short version: NAT only passes return traffic from the exact IP:port the node sent to. T1 and T3 must share port 9000 or the nodes receive nothing.

```python
# pynq_full/ec2/server/t3_broadcaster.py
payload, addrs = await self._broadcast_queue.get()
for addr in addrs:
    self._transport.sendto(payload, addr)
```

**File:** `pynq_full/ec2/server/t3_broadcaster.py`

---

## T4 — RedisWriter

**What:** A real OS thread (`threading.Thread`). The primary second thread in the server.

**Why a real thread:** `redis-py` is a blocking library. It opens a TCP connection to Redis and each call (`hset`, `lpush`, `pipeline().execute()`) blocks until Redis responds. Blocking calls on the asyncio event loop would freeze T1, T2, and T3 for 1–3 ms per call — at 60 Hz that is catastrophic. A dedicated thread absorbs that latency entirely.

**What it does:** Blocks on `write_queue.get()` waiting for work. When an item arrives, it drains the rest of the queue non-blocking, groups the writes by type, and executes them:

```python
# pynq_full/ec2/server/t4_redis_writer.py
items = [write_queue.get()]           # block until at least one item arrives
while True:
    try:
        items.append(write_queue.get_nowait())
    except queue.Empty:
        break

pipe = redis_client.pipeline(transaction=False)
for item in items:
    if item["op"] == "hset":
        pipe.hset(item["key"], mapping=item["fields"])
pipe.execute()                         # one round-trip for all HSETs

for item in items:
    if item["op"] == "lpush":
        redis_client.lpush(item["key"], item["value"])
```

All per-tick player state HSETs are pipelined into **one Redis round-trip**, regardless of how many players are active. Events (tags, match end) are LPUSHed individually so errors can be attributed to specific events.

**Why `queue.SimpleQueue` and not `asyncio.Queue`:** `asyncio.Queue` is not thread-safe — it is designed for use within a single event loop thread. `queue.SimpleQueue` is Python stdlib's thread-safe FIFO with no maximum size and no `task_done()` overhead. T2 puts items on it from the event loop thread; T4 gets items from its OS thread. `SimpleQueue` is exactly the right primitive for this crossing.

**File:** `pynq_full/ec2/server/t4_redis_writer.py`

---

## Other threads

Beyond T4 there are two more permanent threads and a pool of transient workers:

### Redis pub/sub subscriber (daemon thread)

**What:** A daemon `threading.Thread` started inside `GameTick._start_control_subscriber()` at server startup. Blocks indefinitely on the Redis pub/sub channel `game:control`.

**What it does:** When the monitor publishes a control command (`set_map`, `force_end`, `set_ghost_count`, etc.), this thread receives it, JSON-decodes it, and puts it onto `control_queue` — a plain `queue.Queue` shared with T2.

```python
# pynq_full/ec2/server/t2_game_tick.py
def _subscribe():
    pub.subscribe("game:control")
    for msg in pub.listen():           # blocks here — Redis pub/sub is a blocking API
        data = json.loads(msg["data"])
        self.control_queue.put(data)   # hand off to T2 via queue

threading.Thread(target=_subscribe, daemon=True).start()
```

T2 drains `control_queue` at the top of each tick with `get_nowait()`, the same pattern as `packet_queue`. The thread is necessary for the same reason as T4: `pub.listen()` blocks, and blocking on the event loop would freeze the game tick.

**Why daemon:** It has no cleanup to do. When the server process exits the thread dies with it.

### `asyncio.to_thread()` workers (transient thread pool)

**What:** Python's built-in `ThreadPoolExecutor`, used via `asyncio.to_thread()`. Workers are created on demand and returned to the pool when done.

**Where used in the game server** (`pynq_full/ec2/server/t2_game_tick.py`):
```python
# Board replay: loading a compressed NDJSON file from S3 is a blocking call
payload = await asyncio.to_thread(self._load_board_replay, match_id)
```

**Where used in the monitor** (`pynq_full/ec2/monitor/monitor.py`) — every blocking operation that would otherwise stall the monitor's event loop:
```python
await asyncio.to_thread(refresh_state_cache)           # Redis reads
await asyncio.to_thread(fetch_replay, match_id)        # S3 fetch
await asyncio.to_thread(fetch_players)                 # DynamoDB scan
await asyncio.to_thread(save_map_entry, ...)           # map library write
await asyncio.to_thread(handle_control_command, data)  # Redis publish
```

**Why `asyncio.to_thread()` and not explicit threads:** It offloads a blocking call to a thread pool worker and suspends the calling coroutine until it completes — from the coroutine's perspective it looks like a normal `await`. No manual thread management, no queues, no callbacks. The thread pool is managed by the event loop and workers are reused automatically.

---

## Full thread inventory

| Thread | Type | Lifetime | Purpose |
|--------|------|----------|---------|
| Event loop thread | Real OS thread | Permanent | Runs T1/T2/T3 coroutines |
| T4 RedisWriter | `threading.Thread` | Permanent | Batched blocking Redis writes |
| pub/sub subscriber | `threading.Thread` (daemon) | Permanent | Blocks on `game:control` Redis channel, feeds `control_queue` |
| `to_thread()` workers | `ThreadPoolExecutor` pool | Transient | S3/DynamoDB/Redis blocking calls in T2 and monitor |

All threads communicate with the event loop thread via queues or `asyncio.to_thread()` — never by touching asyncio state directly. The game state (player dict, match flags) is only ever read or written from the event loop thread.

---

## Is this true SEDA?

**Partially.** The design is inspired by SEDA and uses the same vocabulary, but differs in one important way:

| Property | True SEDA | Our design |
|----------|-----------|------------|
| Stages separated by queues | ✓ | ✓ |
| Each stage independently schedulable | ✓ (thread pool per stage) | Partial — T1/T2/T3 share one thread |
| Stages can run in parallel | ✓ | ✗ — T1/T2/T3 are cooperative, not parallel |
| Slow stage cannot block fast stage | ✓ | ✓ — cooperative yield achieves this |
| Real thread boundary at I/O stage | Sometimes | ✓ — T4 is a real thread for Redis |
| Decoupled stages | ✓ | ✓ |
| Queue buffering and burst absorption | ✓ | ✓ |
| Modular pipeline — stages replaceable | ✓ | ✓ |
| Load isolation between stages | ✓ | ✓ — to the extent the workload needs it |

The core SEDA benefits are all present. What we don't have is per-stage thread pools — and for this workload, that is not a loss. The parallelism SEDA's thread pools provide is only valuable when stages are CPU-bound and can usefully execute at the same time. Our stages are I/O-bound and fast; the event loop's cooperative scheduling gives the same decoupling and isolation properties without the threading overhead.

T1/T2/T3 are better described as a **cooperative async pipeline**. They are ordered coroutines on a single event loop that yield to each other at `await` points. The queue between them is not for parallelism — it is for decoupling and back-pressure visibility. A slow T2 tick does not block T1 from receiving packets; T1's callback returns immediately and the packets queue up.

**Why this is the right trade-off for this workload:**

The hot path — receive UDP, unpack 24 bytes, update a dict, pack 30 bytes, send UDP — is entirely I/O bound. There is no CPU-heavy work that would benefit from parallel threads. Adding thread pools for T1/T2/T3 would require locks on the shared player state, add context-switch overhead, and gain nothing in throughput for 2–4 players at 60 Hz.

The **one real thread boundary** (T4) is placed exactly where it is needed: at the Redis write, which is the only genuinely blocking operation. Everything else runs clean on the event loop.

---

## What the queues actually protect against

The queues exist not primarily for parallelism but for **decoupling and burst absorption**:

- **`packet_queue`** — decouples the rate at which UDP packets arrive from the rate at which T2 processes them. A burst of 10 packets in one tick is fine; they queue up and T2 drains them all at the top of the next tick.
- **`broadcast_queue`** — decouples T2's game logic from the act of sending UDP. If the kernel send buffer were ever full, T3 would back up without affecting T2's tick timing.
- **`write_queue`** — decouples T2's tick from Redis latency. T2 fires and forgets; T4 catches up asynchronously on its own thread.

---

## Runtime characteristics

- **OS threads:** at least 3, up to several more
  - Event loop thread (T1, T2, T3 coroutines)
  - T4 RedisWriter — explicit `threading.Thread`, permanent
  - Redis pub/sub subscriber — explicit `threading.Thread` (daemon), blocks on `game:control` channel, posts received commands back to the event loop via `call_soon_threadsafe()`
  - `asyncio.to_thread()` workers — Python's default `ThreadPoolExecutor`, used in T2 for S3 replay loads and throughout the monitor for all blocking Redis/DynamoDB/S3 calls; these are transient (spun up on demand, returned to pool when done)
- **Asyncio coroutines:** 3 (T1, T2, T3) — all on the event loop thread
- **Tick rate:** 60 Hz (16.67 ms per tick)
- **Typical T2 tick time:** < 2 ms (mostly packet unpacking + dict updates)
- **Typical Redis write latency (T4):** 1–3 ms (EC2 localhost — invisible to the game loop)
- **Typical UDP round-trip (UK → EC2 eu-west-2):** 20–50 ms
- **Queue depths at steady state:** 0–1 items each

---

## Is this still good architecture?

Yes — and deliberately so. The design matches the actual workload constraints:

**The hot path is I/O bound, not CPU bound.** Receiving a UDP packet, unpacking 24 bytes with `struct.unpack`, updating a Python dict, packing a response, and sending it back is not CPU-heavy work. There is nothing to parallelise. Adding more OS threads for T1/T2/T3 would not make any of those steps faster — it would only add lock contention on the shared player state and context-switch overhead.

**Two real OS threads is the right number for this workload.** One thread handles all network I/O and game logic via asyncio's event loop — cooperative scheduling is sufficient because none of those operations block. One thread handles Redis — because `redis-py` is a blocking library and Redis writes genuinely need to be isolated from the event loop. No more threads are needed.

**Asyncio's cooperative scheduling gives us something thread pools cannot: shared mutable state with no locks.** T2 owns the player dict. T1 and T3 also touch it (T1 enqueues packets T2 will process; T3 reads addresses T2 wrote). Because all three are coroutines on the same event loop, they can never interleave mid-statement. There is no moment where T1 is halfway through writing a player entry while T2 is reading it. Lock-free shared state is a direct consequence of cooperative single-thread execution — and it is not a compromise, it is a feature.

**The one real thread boundary is placed at the only operation that actually needs it.** Redis writes block. Everything else does not. The `write_queue` + T4 thread pattern puts the thread boundary exactly where the blocking is, and nowhere else.

**Comparison with true multi-threaded SEDA for this scale:**

| Property | 2-thread async pipeline (ours) | Full multi-threaded SEDA |
|----------|-------------------------------|--------------------------|
| Shared state complexity | None — asyncio gives lock-free access | Locks required on every shared structure |
| Parallelism | 1 core for game logic, 1 for Redis | Potentially more cores |
| Benefit of more cores | None — workload is I/O bound at 2–4 players | Useful at hundreds of players |
| Context switch overhead | Minimal — cooperative yield | Real OS context switches between thread pools |
| Debugging | Single event loop trace | Concurrent thread interleaving |

For the player counts this system targets (2–4 players, 60 Hz), the async pipeline is not a simplification of a "proper" multi-threaded design — it *is* the proper design. The complexity budget is spent exactly where it produces value: decoupled stages, burst-absorbing queues, and one real thread for the one genuinely blocking operation.
