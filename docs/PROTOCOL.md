# Protocol

Source of truth: `pynq_full/interfacing/protocol.py`

## Node → Server

### `PKT_STATE_UPDATE (0x0001)` — 24 bytes

Sent by the node every tick. Primary position and input update.

```
# format: '<HHIfff BBBB'
Offset  Size  Field
  0       2   packet_type    0x0001
  2       2   seq            16-bit counter, increments each tick, wraps at 65535
  4       4   timestamp      ms since epoch (32-bit truncated)
  8       4   pred_x         float32, locally predicted world X
 12       4   pred_y         float32, locally predicted world Y
 16       4   pred_angle     float32, radians
 20       1   input_flags    bitmask: FLAG_INPUT_SHOOT=0x01
 21       1   movement_mode  0x00=POSE  0x01=INTENT_ONLY  0x02=INTENT_WITH_PREDICTION
 22       1   protocol_version
 23       1   reserved / role (used by PKT_REGISTER)
```

**Sequence number**: `(seq - prev_seq) & 0xFFFF`. Valid if delta is not 0 and is <= 0x7FFF. Rollover `(0 - 65535) & 0xFFFF = 1` is treated as a forward step of 1.

### `PKT_REGISTER (0x0020)` — 24 bytes

Same wire format as `PKT_STATE_UPDATE`. The `reserved` byte carries the preferred role:
- `ROLE_ANY=0x00`, `ROLE_RUNNER=0x01`, `ROLE_TAGGER=0x02`

Optional UTF-8 username string appended after the 24-byte header.

### `PKT_PERF (0x0070)` — telemetry

Sent from the board ~every 2 seconds. Carries worst BRAM write time, worst tick overrun, measured tick rate. Server logs it; Monitor can display it.

## Server → Node

### `PKT_ACK (0x0030)` — 9 bytes

Sent immediately after successful `PKT_REGISTER`. 8-byte header + 1 byte: assigned `player_id`. Player 1 = runner, player 2 = tagger. Ghost IDs start at 3.

### `PKT_MAP (0x0040)` — 1032 bytes

Sent once after `PKT_ACK`. Full 32x32 tile grid: 1024 bytes (one byte per cell, 0=floor, 1=wall) + 8-byte header. Fits inside 1500-byte MTU; never fragments.

Node writes to BRAM: one 32-bit word per row, `word |= (1 << col)` for wall tiles. LSB = col 0, matches HDL.

### `PKT_BITS_INIT (0x0050)`

Sent once at match start if map has `B` tiles (chase-bits mode). Sequence of float pairs `(x, y)` for each bit pickup world position. Node writes these into BRAM sprite slots.

### `PKT_GAME_STATE (0x0002)` — per-tick broadcast

```
Header (8 bytes):
  packet_type (H) + seq (H) + timestamp (I)

Game-mode extension (4 bytes):  '<BBH'
  game_mode     (B)  0x00=chase  0x01=chase_bits
  player_count  (B)  number of PlayerEntry records following
  bits_mask     (H)  bitmask of active bit pickups (1=on map, 0=collected)

PlayerEntry (14 bytes each):  '<BfffB'
  player_id  (B)  1=runner  2=tagger  3+=ghost
  x          (f)  world X (float32)
  y          (f)  world Y (float32)
  angle      (f)  radians (float32)
  flags      (B)  FLAG_TAGGED=0x02  FLAG_MATCH_END=0x04  FLAG_GHOST=0x08
```

`PlayerEntry` is exactly 14 bytes: `1+4+4+4+1`. No padding; an `x` suffix would silently misalign every subsequent entry. Player entries start at offset `GAME_STATE_EXT_SIZE = 4` after the 8-byte header.

### `PKT_NODE_MODE (0x0060)`

Runtime control from Monitor via Redis via server via UDP. Switches a board between `manual` (human input), `auto` (AI pathfinding), `replay` (server-driven). Board honours this without reconnecting.

## Movement modes

Three modes in `movement_mode` byte, representing different ownership models:

| Mode | Value | Node sends | Server does |
|------|-------|-----------|-------------|
| `POSE` | `0x00` | Raw position | Accept with wall clamping |
| `INTENT_ONLY` | `0x01` | Input flags only | Simulate all movement server-side |
| `INTENT_WITH_PREDICTION` | `0x02` | Flags + locally-predicted pose | Accept prediction with wall clamping |

**Current default:** `INTENT_WITH_PREDICTION`. Node moves locally without waiting for server, making button presses feel instantaneous over 30-50 ms UK to EC2 RTT.

`INTENT_ONLY` is the cleanest authoritative model but not fully wired; it would require richer input flags and complete server-side movement. The server currently treats both `POSE` and `INTENT_WITH_PREDICTION` as pose-carrying updates.

Sending `pred_x/y/angle` alongside intent gives a cheap comparison point: what the node thought should happen vs what the server accepted. Useful for debugging client/server movement divergence, especially when bringing up new PYNQ hardware.

## Redis control messages

Monitor to `game:control` pub/sub to T2:

```json
{"cmd": "set_map",         "map_name": "ghost_chase", "tiles": "...32x32 string..."}
{"cmd": "set_ghost_count", "count": 2}
{"cmd": "force_end"}
{"cmd": "start_match"}
{"cmd": "set_node_mode",   "board_slot": 1, "mode": "auto"}
{"cmd": "restart"}
```
