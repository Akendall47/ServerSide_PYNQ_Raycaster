# Performance, Design, and Architecture Deep-Dive

This document explains why the PYNQcast game server is fast, how the network stays responsive, how the PYNQ boards update so quickly, and the engineering decisions behind the live map editor, monitor, and overall system design.

---

## Table of Contents

1. [Why SEDA — the pipeline architecture](#1-why-seda)
2. [Why the network is fast](#2-why-the-network-is-fast)
3. [Why PYNQ boards update so quickly](#3-why-pynq-boards-update-so-quickly)
4. [Authority model and position handling](#4-authority-model-and-position-handling)
5. [The live map editor — end to end](#5-the-live-map-editor-end-to-end)
6. [Game logic performance](#6-game-logic-performance)
7. [Monitor rendering performance](#7-monitor-rendering-performance)
8. [Redis — why it is ideal for this use case](#8-redis-why-it-is-ideal-for-this-use-case)
9. [Storage tiers and why they exist](#9-storage-tiers-and-why-they-exist)
10. [Why this is a good game-dev environment](#10-why-this-is-a-good-game-dev-environment)
11. [Decisions considered and not taken](#11-decisions-considered-and-not-taken)

---

## 1. Pipeline architecture

The server uses an asyncio event-driven pipeline with one real thread boundary. A full explanation of each stage (T1–T4), the three queues, why asyncio is used instead of threads, and how this relates to SEDA is in [ARCHITECTURE.md](../ARCHITECTURE.md) at the repo root.

The short version:

```
T1 UDPReceiver ──packet_queue──► T2 GameTick ──broadcast_queue──► T3 Broadcaster
  (asyncio)      (asyncio.Queue)   (asyncio)    (asyncio.Queue)      (asyncio)
                                       │
                                  write_queue (queue.SimpleQueue — thread boundary)
                                       ▼
                                  T4 RedisWriter  (OS thread)
```

T1, T2, and T3 are coroutines on a single OS thread. T4 is the only real second thread — it exists to isolate blocking `redis-py` calls from the event loop so Redis latency never stalls a game tick.

---

## 2. Why the network is fast

### 2.1 UDP — not TCP

Game state is sent as raw UDP datagrams. UDP has no connection overhead, no three-way handshake, no retransmission, no head-of-line blocking. A missed packet is simply missed — the next tick's broadcast replaces it 16 ms later anyway.

At 60 Hz with 2–4 players:
- **Inbound**: ~120 packets/s × 24 bytes = ~2.9 KB/s
- **Outbound**: ~60 `PKT_GAME_STATE`/s × ~30 bytes × 2 nodes ≈ 3.6 KB/s total

This is trivially small. The bottleneck is never bandwidth.

### 2.2 The shared socket — critical for NAT (Network Address Translation)

NAT (Network Address Translation) is the mechanism that allows many devices on a private network (or WSL, or a university LAN) to share a single public IP address. When a device sends a UDP packet out to the internet, NAT creates a temporary mapping table entry:

```
internal device:port  ──►  public IP:ephemeral_port  ──►  EC2:9000
```

Return traffic is only allowed back through that entry if it arrives **from the same destination address and port** — in this case, `EC2:9000`. If the return packet comes from any other port, NAT has no matching entry and drops it silently.

T1 (receiver) and T3 (broadcaster) share the **same UDP socket** bound to port 9000. This is not a coincidence; it is the most important single architectural decision in the network layer.

When a PYNQ board sends a packet to `EC2:9000`, NAT creates the mapping. If T3 opened its own socket, outbound broadcasts would come from a **random ephemeral port** chosen by the OS — NAT drops them, the nodes receive nothing and never see `FLAG_TAGGED`, `FLAG_MATCH_END`, or position updates.

Sharing the socket ensures every outbound packet has source port 9000, which matches the NAT mapping exactly:

```python
# pynq_full/ec2/server/server.py
# T1 binds first — exposes receiver.transport for T3 and T2 to share.
await receiver.bind(UDP_PORT)

ticker = GameTick(
    packet_queue, broadcast_queue, write_queue,
    receiver.transport,   # <-- T3 reuses this same socket
    ...
)
```

```python
# pynq_full/ec2/server/t3_broadcaster.py
# T3 sends via the shared transport — source port is always 9000
self._transport.sendto(payload, addr)
```

### 2.3 Packet structure — minimal overhead

Every wire format is a fixed-size `struct` with no variable-length fields on the hot path. `struct.pack` and `struct.unpack` in Python call directly into C — no Python-level loops.

#### Node → Server: `PKT_STATE_UPDATE (0x0001)` — 24 bytes

Sent by the node every tick. Carries the node's locally-computed position plus any input flags (e.g. shoot button). This is the primary state update that T2 processes to track player positions.

```
# pynq_full/interfacing/protocol.py  —  format: '<HHIfff BBBB'
Offset  Size  Field
  0       2   packet_type    (0x0001 for state update)
  2       2   seq            (16-bit counter, increments each tick, wraps at 65535)
  4       4   timestamp      (ms since epoch, 32-bit truncated)
  8       4   pred_x         (float32 — locally predicted world X)
 12       4   pred_y         (float32 — locally predicted world Y)
 16       4   pred_angle     (float32 — radians)
 20       1   input_flags    (bitmask: FLAG_INPUT_SHOOT=0x01)
 21       1   movement_mode  (0x00=pose, 0x01=intent_only, 0x02=intent_with_prediction)
 22       1   protocol_version
 23       1   reserved / role (used by PKT_REGISTER for role selection)
```

The 16-bit sequence number (`seq`) increments by 1 every tick. At 60 Hz it rolls over after 65535 ÷ 60 = **~18 minutes** of continuous play. The wraparound is handled by masking arithmetic so no special casing is needed:

```python
# pynq_full/ec2/server/t2_packet_handler.py
def _validate_seq(prev_seq, seq):
    delta = (int(seq) - int(prev_seq)) & 0xFFFF
    return delta != 0 and delta <= 0x7FFF
```

`(0 - 65535) & 0xFFFF = 1` — the rollover reads as a forward step of 1, which is correct. A packet is only rejected if its delta is 0 (duplicate) or greater than `0x7FFF` (32767 ticks, ~9 minutes in the future — impossible in practice).

#### Node → Server: `PKT_REGISTER (0x0020)`

Same 24-byte wire format as `PKT_STATE_UPDATE`, but the `reserved` byte carries the node's preferred **role** (`ROLE_ANY=0x00`, `ROLE_RUNNER=0x01`, `ROLE_TAGGER=0x02`). If a username string is appended after the 24-byte header, the server reads it as UTF-8. This is how players get named in the monitor and in match records without adding a separate registration packet.

#### Server → Node: `PKT_ACK (0x0030)` — 9 bytes

Sent immediately after a successful `PKT_REGISTER`. Carries an 8-byte header plus a single byte: the assigned `player_id`. Player 1 is always runner, player 2 is always tagger. Ghost IDs start at 3.

#### Server → Node: `PKT_MAP (0x0040)` — 1032 bytes

Sent once after `PKT_ACK`. Contains the full 32×32 tile grid — 1024 bytes of tile data (one byte per cell, 0=floor, 1=wall) plus an 8-byte header. This single packet gives the node everything it needs to program the FPGA BRAM with the map geometry. At 1032 bytes it is well inside the 1500-byte UDP MTU so it never fragments.

#### Server → Node: `PKT_BITS_INIT (0x0050)`

Sent once at match start if the map contains `B` tiles (chase-bits mode). Contains the world-space `(x, y)` coordinates of every bit pickup as a sequence of float pairs. The node writes these into BRAM sprite slots so the FPGA can render them as collectibles.

#### Server → Node: `PKT_GAME_STATE (0x0002)` — per tick broadcast

The core per-tick broadcast. Structure:

```
# pynq_full/interfacing/protocol.py
Header (8 bytes):
  packet_type (H) + seq (H) + timestamp (I)

Game-mode extension (4 bytes):  format '<BBH'
  game_mode     (B)  — 0x00=chase, 0x01=chase_bits
  player_count  (B)  — number of entries following
  bits_mask     (H)  — bitmask of still-active bit pickups (1=on map, 0=collected)

Per-player entry (14 bytes each):  format '<BfffB'
  player_id  (B)  — 1=runner, 2=tagger, 3+=ghost
  x          (f)  — world X (float32)
  y          (f)  — world Y (float32)
  angle      (f)  — radians (float32)
  flags      (B)  — FLAG_TAGGED=0x02, FLAG_MATCH_END=0x04, FLAG_GHOST=0x08
```

The `PlayerEntry` struct is exactly 14 bytes: `1 + 4 + 4 + 4 + 1`. There is no padding byte at the end — adding `x` (explicit padding) would shift every subsequent entry by 1 byte and silently misalign all player data. The struct is tight by design.

The `bits_mask` field is a 16-bit bitmask where bit `i` is 1 if bit pickup `i` is still on the map. The monitor reads this field every tick to update the pulsing yellow dots on the arena canvas in real time.

#### Server → Node: `PKT_NODE_MODE (0x0060)`

Runtime control sent by the monitor (via Redis → server → UDP). Switches a specific board between `manual` (human button input), `auto` (AI pathfinding), and `replay` (server streams a recorded match). The board honours this immediately without reconnecting or re-registering.

#### Node → Server: `PKT_PERF (0x0070)`

Telemetry sent from the board roughly every 2 seconds. Carries tick timing stats: worst BRAM write time, worst tick overrun, measured tick rate. The server logs these and the monitor can display them. Used during development to confirm the board is hitting 60 Hz and BRAM writes are staying under budget.

### 2.4 One socket poll per tick

T2 does not `await` on the packet queue with a long timeout. Instead it processes all available packets at the top of each tick, then proceeds to game logic, then broadcasts, then sleeps for whatever time remains. This drains bursts instantly and keeps tick-to-tick latency stable.

---

## 3. Why PYNQ boards update so quickly

### 3.1 BRAM writes are memory-mapped

The FPGA BRAM is memory-mapped via Xilinx PYNQ's `axi_bram_ctrl_0`. Writing a player position means writing two 32-bit words to a memory address — it is a CPU memory write, not a file operation, not a socket call, not a system call. The BRAM controller presents these as Python integers.

Typical BRAM write time per tick: **100–500 µs** (measured and reported back to the server via `PKT_PERF`).

The raycasting hardware reads from that BRAM continuously. There is no "push" or "sync" step — the CPU writes the word, and the FPGA reads the updated value on its next clock edge. Latency from Python write to rendered pixel: sub-millisecond.

### 3.2 Fixed-point coordinates — Q6.10

World coordinates are continuous floating-point on the server. Before writing to BRAM, they are converted to **Q6.10 fixed-point**: 6 integer bits, 10 fractional bits, packed into a 16-bit value. X and Y are packed into one 32-bit BRAM word:

```python
# jupyter_side/test_package_v4.py
def to_q6_10(world_val, tile_scale=8, dim=32):
    tile_pos = world_val / tile_scale + dim / 2   # centre-to-tile-offset
    return int(tile_pos * 1024) & 0xFFFF           # × 2^10

bram_word = (to_q6_10(x) << 16) | to_q6_10(y)
```

This is what the HDL raycaster IP expects. `COORD_FRAC_BITS=10` at the BRAM interface (the raycaster IP uses `COORD_FRAC_BITS=16` internally for DDA precision, but the interface is Q6.10).

### 3.3 Angle encoding

Angle is stored as a 12-bit raw index into a 4096-step circle (`ANGLE_STEPS=4096`). Conversion from radians:

```python
# jupyter_side/test_package_v4.py
angle_raw = int((angle_rad / (2 * math.pi)) * 4096) & 0xFFF
```

This maps a full rotation to 4096 discrete steps — about 0.088° per step. The FPGA casts this directly into its DDA angle lookup, so no floating-point computation is needed in hardware.

### 3.4 The map is loaded once, not streamed

When a node registers, the server sends `PKT_MAP` — a single 1032-byte UDP packet containing the entire 32×32 tile grid. The node writes it to BRAM row by row:

```python
# jupyter_side/test_package_v4.py
# One 32-bit BRAM word per row — bit N = col N is a wall (LSB = col 0, matches HDL)
for row in range(32):
    word = 0
    for col in range(32):
        if tiles[row * 32 + col] == 1:
            word |= (1 << col)
    bram.write(MAP_BASE_ADDR + row * 4, word)
```

After this write the map is live in hardware. The raycaster performs DDA traversal against this BRAM every frame — no further CPU involvement needed for map geometry.

### 3.5 60 Hz server → 60 Hz board

The server broadcasts at 60 Hz. Each `PKT_GAME_STATE` carries all player positions. The board receives this, writes the remote entity positions into BRAM sprite slots, and the FPGA hardware renders them on the next frame. The total pipeline from server packet arrival to rendered pixel is:

```
UDP recv → Python unpack → BRAM write → FPGA raycaster renders → VGA/HDMI output
  ~50 µs       ~10 µs        ~300 µs         ~1 frame (HDMI refresh)
```

Round-trip latency from a local move to seeing the result on-screen is dominated by network RTT to EC2 (typically 20–50 ms on a UK connection to eu-west-2) — not by any software overhead.

### 3.6 Sprite slots and hardware entities

The current bitstream (`design_1_wrapper.bit`) exposes two active hardware sprite slots (`v_sprite_*` and `v_r_sprite_*` port groups — confirmed from `design_1.hwh`). The board client writes up to `MAX_ENTITIES=4` slots to BRAM regardless; the hardware renders as many as its pipeline supports. This means adding more hardware sprite slots in a future bitstream requires no software change.

Each entity slot is two 32-bit words:

```
# jupyter_side/test_package_v4.py  —  BRAM entity slot layout
Word 0:  xy    = x_q6_10[31:16] | y_q6_10[15:0]
Word 1:  meta  = valid[31] | id[30:24] | flags[23:16] | angle_raw[11:0]
```

Ghosts, the remote player, and bit pickups all use these slots.

---

## 4. Authority model and position handling

### 4.1 Local authority — the node owns its own position

The node is the authority for its own position. The node computes movement locally each tick (button input → physics → collision), then sends its claimed `(x, y, angle)` to the server. The server accepts it, subject to two lightweight corrections:

**Sequence validation** — stale or replayed packets are dropped:

```python
# pynq_full/ec2/server/t2_packet_handler.py
def _validate_seq(prev_seq, seq):
    delta = (int(seq) - int(prev_seq)) & 0xFFFF
    return delta != 0 and delta <= 0x7FFF
```

**Wall-collision clamping** — the server runs `resolve_walkable_world()` on the claimed position. If the node reported a position inside a wall (possible if packets arrive out of order or physics diverged slightly), the server snaps it to the nearest walkable point:

```python
# pynq_full/ec2/server/t2_packet_handler.py
next_x, next_y = resolve_walkable_world(
    self.map_state, p["x"], p["y"], x, y, PLAYER_COLLISION_RADIUS
)
p["x"], p["y"], p["angle"] = next_x, next_y, angle
```

There is no speed cap, no bounds check beyond collision geometry. This is a deliberate design choice driven by two factors:

**The use case doesn't need it.** The only clients are trusted PYNQ boards. There is no adversarial input to defend against. Full position validation is a feature for public multiplayer games where strangers can modify their client.

**Server-side position correction causes visible jitter on the FPGA renderer.** When the server ran `validate_position()` on incoming packets and rejected or corrected positions that failed the speed cap (e.g. due to a burst of delayed packets arriving together, making the apparent speed look implausible), the server's stored position would diverge from what the node believed its position to be. The node continued rendering from its local position; the server broadcast a different one. Other nodes (and the monitor) saw the player snap back and forth each time a correction fired. On the FPGA display this showed up as flickering and jitter in the remote player sprite — the renderer is sensitive to even sub-tile position changes because it is doing per-column raycasting at hardware clock speed. Removing the speed-cap validation eliminated the jitter entirely: the server always mirrors exactly what the node reports, so all clients agree on the same position.

The `Anticheat` class exists in `game_logic/anticheat.py` and `validate_position()` is fully implemented, but it is not called on incoming node packets. Inside `core_logic.py` the class is used only for its `distance_between()` helper — ghost movement distances and bit proximity checks. The validation infrastructure is there if the project ever needs it (e.g. browser-based clients where input cannot be trusted).

### 4.2 Tagging is server-computed

All match events are server-authoritative. The server computes proximity for every player pair every tick. Tag detection uses Euclidean distance against `TAG_RADIUS = 16.0` world units (about 2 tile widths). Wall occlusion is not checked server-side — at that range in a 32×32 map the gameplay feel is correct without it, and server-side raycasting for 2–4 players would be unnecessary overhead.

### 4.3 Flag-based state signalling

The server uses a bitmask in each `PlayerEntry` to signal match events:

| Flag | Value | Meaning |
|------|-------|---------|
| `FLAG_TAGGED` | `0x02` | Runner was tagged this tick |
| `FLAG_MATCH_END` | `0x04` | Match is over |
| `FLAG_GHOST` | `0x08` | This entity is server-controlled |

`FLAG_TAGGED` is held for `TAG_FLASH_S = 0.3 s` — long enough for the node to react (teleport to spawn, play a sound) without being permanently set. `FLAG_MATCH_END` is held for `MATCH_END_HOLD_S = 0.5 s` so nodes can display an end screen before the server clears state.

After a tag, both players are teleported to spawn positions (`π/2` radians apart). A `GRACE_TICKS = 30` tick window (0.5 s at 60 Hz) suppresses proximity checks after the reset so players have time to separate before tagging can occur again.

---

## 5. The live map editor — end to end

The map editor is perhaps the best example of how all layers of the stack work together. A change in the browser reaches the FPGA BRAM in under a second, with no server restart.

### 5.1 Drawing in the browser

The monitor's Map Editor tab renders the 32×32 grid in the browser with click-to-toggle wall tiles, spawn point placement, bit-pickup placement, and name editing. Validation is run client-side before submission: exactly 32 columns, exactly 32 rows, solid border, at least two spawn markers.

### 5.2 Submitting to the server

When the player clicks "Hot-Swap", the browser sends a command via the monitor's HTTP API:

```json
{"cmd": "set_map", "map_name": "ghost_chase", "tiles": "...32×32 string..."}
```

The monitor's FastAPI handler publishes this to the Redis pub/sub channel `game:control`.

### 5.3 Server picks it up — no restart needed

T2 (`GameTick`) subscribes to `game:control` via a background Redis pub/sub listener. When it receives `set_map`, it calls `load_map()` on the new tile data, swaps the live `map_state` reference, and schedules the new `PKT_MAP` to be sent to all currently-connected nodes at the next match start.

The game server process never restarts. The currently running match finishes normally, and the new map is in effect from the next `start_match`.

### 5.4 Nodes receive the new map

At match start, `PacketHandler` sends `PKT_MAP` to every registered node — a single 1032-byte UDP packet. The node receives it and calls the BRAM map-write loop (one 32-bit word per row). The FPGA immediately starts raycasting the new geometry — no reboot, no re-flash.

### 5.5 Bit pickups update automatically

If the new map has `B` tiles, the server detects `GAME_MODE_CHASE_BITS` automatically. At match start it sends `PKT_BITS_INIT` with the world-space positions of all bit tiles. The node writes these into BRAM sprite slots; the FPGA renders them as collectible entities.

The monitor canvas shows bit positions as pulsing yellow dots. When a runner collects a bit, the server clears the corresponding bit in `bits_mask`, broadcasts the updated bitmask in every subsequent `PKT_GAME_STATE`, and the monitor dims the dot in real time.

### 5.6 End-to-end latency

```
Browser click → HTTP POST → Redis publish → T2 receives → load_map() in-place
    ~1 ms           ~1 ms       ~1 ms            ~1 ms          ~1 ms

At next match start → PKT_MAP UDP to nodes → BRAM write → FPGA renders new walls
       ~0 ms                ~10 ms (RTT)      ~300 µs          next frame
```

Total from editor click to new geometry on the FPGA screen: under one second, dominated by match-reset timing.

---

## 6. Game logic performance

### 6.1 O(n²) is fine at n=4

The tag proximity loop iterates all player pairs. For `n=4` (two humans + two ghosts), there are 6 pairs. This is a handful of Euclidean distance calculations — negligible. The design does not need spatial hashing, BVH trees, or quadtrees. The correct data structure for n=4 is a flat list.

### 6.2 Ghost pathfinding — reactive, not A*

Ghost AI does not run A*. At 60 Hz, running full A* per ghost per tick would be unnecessary. Instead, each ghost uses reactive steering (`pynq_full/ec2/game_logic/core_logic.py`):

1. Compute the base heading toward the runner.
2. Try 10 candidate headings (base ± angular offsets: 0°, ±20°, ±40°, ±60°, ±90°, ±180°).
3. Score each candidate: progress toward runner (×10) + distance moved − heading deviation penalty (×0.15) − steer-change penalty (×0.2).
4. Take the best non-blocked candidate.
5. Carry forward the chosen `steer_dir` to reduce corner oscillation.

No path cache, no graph search, no memory of previous positions. Each tick is entirely stateless. This is cheaper than A* and produces believable tagger behaviour — ghosts reach the runner in a few seconds on any of the current maps.

### 6.3 Grid A* for simulator auto-mode and board auto-mode

Where actual pathfinding is needed (the PC simulator and PYNQ auto mode), 4-direction A* on the 32×32 tile grid is used. The grid is tiny: 32×32 = 1024 cells. A* on this completes in microseconds. The node computes the full path, then steps one cell per tick with collision-resolved motion.

### 6.4 Collision resolution

When a move would place a player inside a wall, the server (and board client) use a stepped fallback (`pynq_full/ec2/server/t2_map_loader.py`):

1. Try the full move. If walkable — done.
2. Try x-only (slide along Y wall). If walkable — done.
3. Try y-only (slide along X wall). If walkable — done.
4. Binary-search midpoints between current and desired (10 iterations). This resolves corner catches.
5. If all fail — stay put.

Nine probe points (centre + 8 around a `collision_radius = 2.0` unit circle) are tested at each step. This is thorough enough to prevent players wedging into corners.

### 6.5 Tunable constants in one file

All game balance values live in `pynq_full/ec2/server/t2_constants.py`:

```python
# pynq_full/ec2/server/t2_constants.py
TAG_RADIUS       = 16.0    # world units — how close before tag (~2 tile widths)
TAGS_TO_WIN      = 2       # tags needed for match win
GHOST_SPEED      = 0.15    # world units per tick at 60 Hz
GRACE_TICKS      = 30      # ticks of tag immunity after reset (0.5 s at 60 Hz)
MATCH_END_HOLD_S = 0.5     # seconds to hold FLAG_MATCH_END before lobby return
BIT_COLLECT_RADIUS = 8.0   # world units — proximity for runner to collect a bit
```

Changing any of these takes effect on the next server restart. No recompilation, no protocol change, no hardware reflash.

---

## 7. Monitor rendering performance

### 7.1 OffscreenCanvas for the static layer

The arena canvas separates its draw work into two layers (`pynq_full/ec2/monitor/monitor-render.js`):

- **Static layer**: Walls, floor, grid lines, ambient-occlusion edge shadows, vignette. Rendered once into an `OffscreenCanvas` whenever the map or canvas size changes. Blitted each frame via `drawImage`.
- **Dynamic layer**: Player dots, glow/pulse, name label pills, bit collectible animations, ghost markers. Redrawn every `requestAnimationFrame`.

Without caching, drawing 1024 wall tiles with gradient bevels, ambient-occlusion gradients, and a full vignette every 16 ms would be noticeably expensive. With caching, each frame is one `drawImage` call plus a handful of circles and rectangles.

The cache is invalidated (and rebuilt on the next frame) when:
- Canvas pixel size changes (ResizeObserver fires)
- Active theme changes (dark ↔ light)
- Active map changes (different map name)

### 7.2 ResizeObserver — no fixed 480×480

The canvas used to be hard-coded to 480×480 pixels in the HTML attribute. It now uses a `ResizeObserver` on the parent wrapper element. When the wrapper resizes, the canvas `width` and `height` attributes are updated to match 92% of the smaller dimension:

```js
// pynq_full/ec2/monitor/monitor-render.js
function syncCanvasSize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  const side = Math.floor(Math.min(rect.width, rect.height) * 0.92);
  if (canvas.width === side && canvas.height === side) return false;
  canvas.width = side;
  canvas.height = side;
  invalidateMapCache();
  return true;
}
const _arenaResizeObserver = new ResizeObserver(() => { syncCanvasSize(); });
```

### 7.3 Interpolation between server ticks

The monitor receives state pushes from the server at ~30 Hz. To avoid choppy animation, player positions are linearly interpolated in the `requestAnimationFrame` loop (which runs at 60 fps). Each player gets an entry in `interpolatedLivePoses` (`pynq_full/ec2/monitor/monitor-render.js`) that tracks `fromX/Y`, `toX/Y`, `startedAt`, and `durationMs`. The render function advances the interpolation fraction `t = (now - startedAt) / durationMs` each frame.

Players snap to the server position immediately when:
- The player re-queues (flags change)
- The move distance exceeds `INTERPOLATION_SNAP_DISTANCE = 18.0` units (teleport after a tag)

### 7.4 JS bundle — gzip pre-compression

The monitor JS is built with esbuild from `monitor_ui/build.mjs`. The build writes both `dist/monitor-ui.js` and `dist/monitor-ui.js.gz`. The monitor Python server detects `Accept-Encoding: gzip` and serves the pre-compressed file directly — no runtime compression cost. At ~64 KB gzip, the monitor loads fast on any connection.

---

## 8. Redis — why it is ideal for this use case

### 8.1 What Redis is

Redis is an in-memory key-value store. Everything lives in RAM. Reads and writes are single-digit microseconds when accessed on the same machine, and 1–3 ms over a local network. It supports strings, hashes, lists, pub/sub channels, and sorted sets as native data types — no schema, no query planner, no disk seek.

### 8.2 Why Redis and not a database on the hot path

At 60 Hz the server writes player state every tick. A relational database (Postgres, MySQL) would involve:
- A TCP connection
- SQL parsing
- A query planner
- A disk write (or WAL flush)
- A response round-trip

Even on the same machine this adds 5–20 ms per write. At 60 Hz that is more than the tick budget. Redis removes every one of those steps. A `HSET` to a local Redis instance completes in under 1 ms — fast enough that it could run on the hot path, though we deliberately isolate it to T4 anyway to keep T2 clean.

### 8.3 How we use Redis

Redis serves three distinct roles in the stack:

**Live game state** — T4 writes player positions, match status, and the bits bitmask to Redis hashes every tick. The monitor reads these at ~30 Hz to drive the arena canvas. This is pure hot-path state: ephemeral, written constantly, read frequently.

```python
# pynq_full/ec2/server/t4_redis_writer.py
# All per-tick HSETs are pipelined into a single round-trip
pipe = redis_client.pipeline(transaction=False)
for player_id, fields in player_updates:
    pipe.hset(f"player:{player_id}", mapping=fields)
pipe.hset("game:state", mapping=match_fields)
pipe.execute()
```

**Event stream** — On significant match events (tag, bit collected, match end, player joined), T2 pushes a JSON event to the `game:seda-events` list via T4:

```python
# pynq_full/ec2/server/t4_redis_writer.py
redis_client.lpush("game:seda-events", json.dumps({
    "event": "player_tagged",
    "player_id": 1,
    "tag_count": 1,
    "match_id": "match-20260317-143022"
}))
```

The sidecar process reads this list and writes to DynamoDB and S3. The monitor also tails it for the live event feed panel.

**Control channel** — The monitor publishes commands to `game:control` as a Redis pub/sub channel. T2 subscribes via a background listener. This is how map hot-swaps, ghost count changes, force-end commands, and node mode switches reach the server without any HTTP connection between the monitor and the game server:

```python
# pynq_full/ec2/server/t2_packet_handler.py (control handler)
# Redis pub/sub message arrives on game:control
{"cmd": "set_map",         "map_name": "ghost_chase"}
{"cmd": "set_ghost_count", "count": 2}
{"cmd": "force_end"}
{"cmd": "start_match"}
{"cmd": "set_node_mode",   "board_slot": 1, "mode": "auto"}
```

### 8.4 Batching writes in T4

T4 does not write one item at a time. It drains the entire `write_queue` on every pass and groups writes:

```python
# pynq_full/ec2/server/t4_redis_writer.py
items = [write_queue.get()]          # block until at least one item
while True:
    try:
        items.append(write_queue.get_nowait())
    except queue.Empty:
        break

# Pipeline all HSETs — one network round-trip for all per-tick state
pipe = redis_client.pipeline(transaction=False)
for item in items:
    if item["op"] == "hset":
        pipe.hset(item["key"], mapping=item["fields"])
pipe.execute()

# LPUSHes done individually (events are rare; errors need visibility)
for item in items:
    if item["op"] == "lpush":
        redis_client.lpush(item["key"], item["value"])
```

This means a tick that generates 4 player state updates + 1 match state update produces **one** Redis round-trip for all five `HSET`s, not five.

### 8.5 Redis clears stale state on startup

On startup T4 deletes all runtime keys before the game begins:

```python
# pynq_full/ec2/server/t4_redis_writer.py
for key in redis_client.scan_iter("player:*"):
    redis_client.delete(key)
redis_client.delete("game:state", "game:seda-events", "game:seda-replay")
```

This prevents a crashed or restarted server from the monitor showing phantom players from a previous session.

### 8.6 ElastiCache — Redis as a managed AWS service

In a production deployment Redis would move from EC2 localhost to **AWS ElastiCache for Redis**. ElastiCache is a managed Redis cluster that handles:

- **Automatic failover** — if the primary node fails, a replica is promoted within seconds, with no changes to connection strings
- **Multi-AZ replication** — data is replicated to a standby in a different Availability Zone, surviving full data centre failures
- **Cluster mode** — horizontal sharding across multiple Redis nodes for workloads that exceed a single instance's memory or throughput
- **Automated backups and snapshots** — point-in-time recovery without manual configuration
- **VPC integration** — Redis is inside the same VPC as EC2, so there is no public internet exposure and network latency stays at ~0.3 ms

For the current project Redis runs on the EC2 instance itself (`localhost:6379`) — latency is sub-millisecond and there is no separate billing. The Redis tunnel in the dev scripts (`sim_dev2.sh`, `pynq_dev.sh`) forwards EC2 localhost:6379 to local port 6380, so developers can inspect Redis state with `redis-cli -p 6380` from their workstation without exposing it publicly.

The architecture is already ElastiCache-ready: replacing `localhost:6379` with an ElastiCache endpoint in the server config would require no code changes anywhere in the pipeline.

---

## 9. Storage tiers and why they exist

The three-tier architecture is a deliberate trade between cost, latency, and durability:

| Tier | Store | Access latency | Cost model | Contents |
|------|-------|---------------|------------|----------|
| Hot | Redis (EC2 localhost) | < 1 ms | Memory (no per-op cost) | Live game state, player registry, event stream |
| Warm | DynamoDB | 5–20 ms | Read/write units | Recent match metadata, per-player stats |
| Cold | S3 | 50–200 ms | Storage + request | Compressed NDJSON replay files, archived rows |

### Why the sidecar is separate

The sidecar reads `game:seda-events` from Redis and writes to DynamoDB and S3. It is a completely separate process. This means:

- AWS latency (5–200 ms) never touches the game loop.
- If DynamoDB or S3 is slow, the sidecar queues up and catches up — the game continues at full tick rate.
- The sidecar can be restarted independently (deployments, failures) without affecting the server.

Match IDs (`match-YYYYMMDD-HHMMSS`) are generated by the server and propagated through all three tiers, making cross-tier joins trivial.

---

## 10. Why this is a good game-dev environment

### 10.1 Fast iteration loop

`pynq_dev.sh` and `sim_dev2.sh` start the full stack (server + sidecar + monitor + tunnels) in one command. Both scripts check for uncommitted changes and refuse to launch if the working tree is dirty — preventing the classic "running old code" confusion during a hardware demo.

The entire startup sequence (kill old processes → git pull on EC2 → build monitor bundle → rsync to EC2 → launch tmux panes) completes in about 10 seconds. From `./pynq_dev.sh` to a running game is sub-minute.

### 10.2 Live map editing without restarts

As described in §5, map changes flow from browser to FPGA BRAM without restarting any process. This means a developer can:

- Draw a new map in the browser editor
- Submit it
- Start the next match (one button press)
- See the new geometry rendered on both PYNQ boards immediately

This is genuine live iteration on hardware — not a simulator tweak.

### 10.3 The monitor as a development tool

The browser monitor is not just an observation window — it is a control panel:

- **Start/End match** — force match transitions without waiting for players
- **Ghost count** (0–3) — spawn AI taggers on demand; test with 0 humans
- **Hot-swap map** — change the live map mid-session
- **Kick players** — remove a stuck node with a 30-second reconnect cooldown
- **Node mode switch** — flip a PYNQ board between manual (human input), auto (AI), and replay (server-driven) without touching the board
- **Archive / Replay** — load any previous match from S3 and stream it back to the boards via `PKT_NODE_MODE` + `PKT_GAME_STATE` replay packets

This level of runtime control means hardware sessions can be fully directed from a laptop.

### 10.4 Match replay — re-running any match on real hardware

Every match is recorded automatically. The sidecar collects the frame-by-frame event stream from `game:seda-replay` in Redis and uploads it to S3 as a compressed NDJSON file (`match-YYYYMMDD-HHMMSS.ndjson.gz`) at match end. Each line is one tick's worth of player state — positions, angles, flags, bits mask — enough to fully reconstruct what happened.

The monitor's Archive tab lists all stored matches pulled from DynamoDB (warm tier). Clicking "Start Board Replay" on any match does the following:

1. The monitor fetches the replay file from S3 and streams it to the server tick-by-tick via Redis.
2. The server sends `PKT_NODE_MODE` to the target boards, switching them into `replay` mode. In this mode the board ignores all button input — the FPGA raycaster still runs fully, but position is driven entirely by the server.
3. The server sends each replay frame as a normal `PKT_GAME_STATE` packet at the original tick rate. The boards write the received positions directly to BRAM each frame.
4. The player sees the match play back on the actual FPGA display — the same first-person raycasted view they had during the original game, rendered live in hardware.

When replay ends (or "Stop Replay" is pressed), `PKT_NODE_MODE` switches the boards back to manual or auto mode and the game resumes normally.

This is not a video recording — it is the actual hardware re-executing the game geometry from stored state. The replay is indistinguishable from a live match from the FPGA's perspective, because it receives the same packet types in the same format. There is no special replay rendering path in the hardware or the board client.

The same mechanism works per-board: "Stop P1 Screen" and "Stop P2 Screen" buttons can stop replay independently, so one board can be in replay while the other is in live play — useful for side-by-side comparison during a session.

### 10.6 Input prediction for local feel

The protocol supports three movement modes (defined in `pynq_full/interfacing/protocol.py`):

| Mode | Node sends | Server does |
|------|-----------|-------------|
| `POSE (0x00)` | Raw position | Accept with wall clamping |
| `INTENT_ONLY (0x01)` | Input flags only | Server simulates all movement |
| `INTENT_WITH_PREDICTION (0x02)` | Flags + locally-predicted pose | Accept prediction with wall clamping |

The current default is `INTENT_WITH_PREDICTION`. The node moves locally without waiting for the server's response, making button presses feel instantaneous even over a 30–50 ms UK-to-EC2 round trip.

### 10.7 Modes for every scenario

| Scenario | Entry point | How |
|----------|-------------|-----|
| Two PYNQ boards, full hardware game | `./pynq_dev.sh` | Boards register and play directly |
| PC development without hardware | `./sim_dev2.sh` | `node_simulator.py` replaces boards |
| Solo test (one human + AI ghost) | `./pynq_dev.sh` + monitor set_ghost_count=1 | Monitor spawns a ghost tagger |
| Replay a match on hardware | Archive tab → "Start Board Replay" | Server streams old state to boards |
| Zero players, watch AI only | set_ghost_count=2 + start_match | Two ghost taggers chase each other |

### 10.8 The test suite covers the rules

`tests/` has dedicated test files for every major subsystem:

| File | Covers |
|------|--------|
| `test_game_logic.py` | Tag detection, match lifecycle, ghost spawning |
| `test_match_modes.py` | Chase vs chase-bits, bit collection win condition |
| `test_protocol.py` | Packet encode/decode round-trips |
| `test_pynq_hardware_contract.py` | BRAM encoding, Q6.10 coordinate format, column bit ordering |
| `test_server_latency.py` | T2 tick timing under load |
| `test_bottleneck_fixes.py` | Speed cap, sequence number validation |

Running `python -m pytest tests/` gives a full green pass against the pure Python game logic without needing EC2, Redis, or hardware.

---

## 11. Decisions considered and not taken

### Thread-per-client

Standard for many servers. Rejected because at 2–4 players the thread overhead (stack allocation, context switches, GIL contention) would dominate. Asyncio handles the same workload on a single thread with lower overhead and no shared-state race conditions.

### Full server-side raycasting for tag anti-cheat

Would allow the server to verify line-of-sight before accepting a tag. Rejected: at `TAG_RADIUS = 16.0` units (2 tile widths), players close enough to tag each other are not meaningfully occluded in any of the current maps. The gameplay feel is correct without wall checks, and the implementation remains simple.

### WebRTC for node ↔ server transport

Would enable browser-based nodes. Rejected: PYNQ nodes are Python scripts, not browsers. UDP is simpler, faster, and directly supported by Python stdlib (`socket`). No signalling server, no STUN/TURN, no ICE negotiation.

### DynamoDB for live game state

Would simplify the architecture (no Redis). Rejected: DynamoDB write latency (5–20 ms) is longer than the tick budget at 60 Hz. Redis on localhost is 100× faster for the live-state use case.

### A* for ghost AI

Would give ghosts better path planning around obstacles. Noted and deferred: current reactive steering is good enough for the existing maps, and simpler to tune. A* would help on maps with long corridors and tight corners — a natural next step when such maps are added.

### Fixed 480×480 canvas

Original implementation. Replaced by `ResizeObserver` + dynamic `canvas.width/height` assignment so the arena fills its panel correctly at any window size and renders at native resolution rather than being upscaled.

---

*For wire format details see `pynq_full/interfacing/protocol.py`.
For BRAM layout and board client see `jupyter_side/test_package_v4.py`.
For game constants see `pynq_full/ec2/server/t2_constants.py`.
For map authoring see `pynq_full/ec2/maps/README.md`.
For T4 Redis batching see `pynq_full/ec2/server/t4_redis_writer.py`.*
