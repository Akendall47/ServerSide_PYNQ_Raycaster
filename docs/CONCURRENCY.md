# Concurrency & Language Design

## What is a tick?

One complete cycle of the game loop at **20 Hz** (50 ms/tick). Each tick: drain packets, update positions, run game logic, broadcast state, emit replay/events, sleep.

If logic takes 5 ms, server sleeps 45 ms. A tick taking > 50 ms means the next tick is late.

## Language split

**Python server** (`ec2/server/`): the hot path is I/O-bound; UDP recv, struct.unpack, dict ops, UDP send, Redis handoff. asyncio handles these efficiently on one thread. Python is the right tool: fast iteration, simple deployment, boto3/redis-py work out of the box.

**Python game logic** (`ec2/game_logic/`): `core_logic.py`, `match_state.py`, `anticheat.py`. At 2-4 players the logic is simple enough (proximity checks, ghost steering, bit collection) that Python is fast enough. C++ reference implementations exist in `cpp_archive/` but are not compiled or used at runtime.

**Python sidecar**: AWS operations (DynamoDB, S3, SNS) run in a separate process. If the sidecar stalls or crashes, gameplay continues.

## Reactor architecture with SEDA-inspired topology

The server is fundamentally a **single-threaded asyncio reactor**: T1, T2, and T3 run as cooperative coroutines on one OS thread. The hot path is I/O-bound with negligible CPU work per tick, so a true thread pool (as in classical SEDA) would add lock contention and context-switch overhead for no throughput gain.

The processing is decomposed into four named stages (T1-T4) connected by lock-free queues, inspired by the staged event-driven topology of SEDA [Welsh et al., SOSP 2001]. This gives the structural benefits of staged decomposition (per-stage observability, backpressure isolation, independent testability) without shared-state locking.

**Classical SEDA** uses thread pools behind each stage queue. **Our design** keeps T1-T3 as coroutines on one thread; only T4 (blocking redis-py writes) uses a second OS thread. This is the minimum threading needed.

```
T1 ──packet_queue──► T2 ──broadcast_queue──► T3    (all asyncio, one OS thread)
                      │
                 write_queue (thread boundary)
                      ▼
                      T4  (OS thread, redis-py)
```

**Why not a pure Reactor (single loop, no stage separation)?**

A single asyncio loop doing everything works fine for I/O-bound servers with many connections. For a fixed-rate game tick it has one problem: the tick timer competes with UDP recv. A slow game_logic call stalls incoming packets; Redis write latency bleeds into broadcast timing. The four-stage split isolates these concerns cleanly without adding meaningful complexity.

**Why not classical SEDA with thread pools?**

At 2-4 players the per-tick CPU work is trivial (a handful of distance checks, one struct.pack). Thread pools add lock contention, context-switch overhead, and shared-state coordination. The coroutine model achieves the same structural isolation at a fraction of the cost.

## Alternatives considered

| Approach | Good for | Why not here |
|----------|---------|--------------|
| Pure Reactor (single async loop) | High connection count, I/O-bound | Tick timer competes with recv; no stage isolation |
| Classical SEDA (thread pools) | CPU-heavy stages, many entities | Thread overhead exceeds benefit at n=4 players |
| Thread-per-client | Very few clients | Python GIL negates CPU parallelism; tick sync hard |
| Actor model (Erlang/Akka) | Thousands of entities, distributed | Framework overhead; overkill at this scale |
