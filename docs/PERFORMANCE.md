# Performance

## Network: why it's fast

### UDP not TCP

No connection overhead, no retransmission, no head-of-line blocking. A missed packet is replaced by the next broadcast 16 ms later. At 60 Hz with 2-4 players: ~3 KB/s inbound, ~4 KB/s outbound. Bandwidth is never the bottleneck.

### Shared socket: critical for NAT

T1 (receive) and T3 (broadcast) share the **same socket** bound to port 9000. This is not optional.

When a PYNQ board (behind WSL NAT or a university LAN) sends to `EC2:9000`, NAT creates a mapping that only accepts return traffic *from* `EC2:9000`. If T3 opened its own socket, broadcasts would come from a random ephemeral port; NAT drops them silently. Nodes never see `FLAG_TAGGED` or position updates.

```python
# server.py: T1 binds first, T3 reuses the same transport
await receiver.bind(UDP_PORT)
ticker = GameTick(..., receiver.transport, ...)   # T3 calls transport.sendto(...)
```

### Fixed-size structs, no hot-path parsing

Every wire format is a `struct` with no variable-length fields on the hot path. `struct.pack/unpack` calls into C, no Python loops. `PKT_STATE_UPDATE` is 24 bytes; `PKT_GAME_STATE` is 8-byte header + 4-byte ext + 14 bytes per player. The `PlayerEntry` struct is exactly 14 bytes (`'<BfffB'`) with no padding; adding an `x` byte would silently misalign every subsequent entry.

### One queue drain per tick

T2 drains the entire packet queue at the top of each tick, then runs game logic, then sleeps for remaining time. Burst arrivals are absorbed instantly; tick-to-tick latency stays stable.

## BRAM writes: why PYNQ boards update so quickly

The FPGA BRAM is **memory-mapped** via `axi_bram_ctrl_0`. Writing a player position is a CPU memory write, no syscall, no socket, no file. The FPGA raycaster reads from BRAM continuously; there is no push step.

Typical BRAM write time per tick: **100-500 µs** (reported back via `PKT_PERF`).

### Q6.10 fixed-point coordinates

World coordinates are float32 on the server. Before BRAM write they are converted to **Q6.10**: 6 integer bits + 10 fractional bits packed into 16 bits. X and Y packed into one 32-bit word:

```python
def to_q6_10(world_val, tile_scale=8, dim=32):
    tile_pos = world_val / tile_scale + dim / 2
    return int(tile_pos * 1024) & 0xFFFF

bram_word = (to_q6_10(x) << 16) | to_q6_10(y)
```

Note: `COORD_FRAC_BITS=16` in the raycaster IP is internal DDA precision only. The BRAM interface is Q6.10.

### Angle encoding

12-bit raw index into a 4096-step circle. Conversion: `int((angle_rad / (2π)) * 4096) & 0xFFF`. The FPGA casts this directly to its DDA angle lookup, no hardware floating-point needed.

### Map loaded once

`PKT_MAP` is a single 1032-byte UDP packet (fits inside 1500-byte MTU). One 32-bit BRAM word per row; bit N = col N is a wall (LSB = col 0, matching HDL). After write the map is live, no further CPU involvement for geometry.

### BRAM entity slot layout

Each entity slot is two 32-bit words:
```
Word 0: xy   = x_q6_10[31:16] | y_q6_10[15:0]
Word 1: meta = valid[31] | id[30:24] | flags[23:16] | angle_raw[11:0]
```

Current bitstream has two active hardware sprite slots (`v_sprite_*`, `v_r_sprite_*`). Software writes up to `MAX_ENTITIES=4` slots; hardware renders as many as its pipeline supports.

### End-to-end latency

```
UDP recv → Python unpack → BRAM write → FPGA renders → HDMI output
  ~50 µs      ~10 µs        ~300 µs       ~1 frame
```

Round-trip latency is dominated by network RTT to EC2 (~20-50 ms UK to eu-west-2), not software overhead.

## Redis writes: batched to one round-trip

T4 drains its queue in bulk and pipelines all HSETs:

```python
# t4_redis_writer.py
pipe = redis_client.pipeline(transaction=False)
for player_id, fields in player_updates:
    pipe.hset(f"player:{player_id}", mapping=fields)
pipe.hset("game:state", mapping=match_fields)
pipe.execute()   # one round-trip for all per-tick state
```

4 player updates + 1 match state = **one** Redis round-trip, not five.

LPUSHes (events) are done individually; events are rare and errors need visibility.

## Monitor rendering

### Two-layer canvas

The arena canvas splits into:
- **Static layer**: walls, floor, grid, AO shadows, vignette. Rendered once into an `OffscreenCanvas`. Blitted each frame via `drawImage`. Invalidated on map change, theme change, or canvas resize.
- **Dynamic layer**: player dots, name pills, bit animations, ghost markers. Redrawn every `requestAnimationFrame`.

Without caching, drawing 1024 wall tiles with gradient bevels every 16 ms would be expensive. With caching: one `drawImage` plus a handful of circles per frame.

### Interpolation

Server pushes state at ~30 Hz. Monitor interpolates positions in the `requestAnimationFrame` loop (60 fps) using per-player `from/to` + `startedAt/durationMs`. Players snap immediately on teleport (distance > `INTERPOLATION_SNAP_DISTANCE = 18.0` units) or flag change.

### JS bundle

Built with esbuild. Gzip pre-compressed at build time; monitor server serves `.gz` directly on `Accept-Encoding: gzip`, no runtime compression cost. 3D tabs (`PYNQBoard`, `PlayerStatsTab`) are `React.lazy`-loaded with idle-time prefetch. Main entry: ~229 KB raw / ~63 KB gzip (was 778 KB before code-splitting).
