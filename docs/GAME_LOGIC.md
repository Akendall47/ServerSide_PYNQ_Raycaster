# Game Logic

## Authority model

The node is the authority for **its own position**. It computes movement locally, sends claimed `(x, y, angle)` to the server. The server accepts it subject to two lightweight corrections:

**Sequence validation**: stale or replayed packets are dropped:
```python
def _validate_seq(prev_seq, seq):
    delta = (int(seq) - int(prev_seq)) & 0xFFFF
    return delta != 0 and delta <= 0x7FFF
```
`(0 - 65535) & 0xFFFF = 1`; rollover reads as a forward step of 1, correct.

**Wall clamping**: the server runs `resolve_walkable_world()` on the claimed position. If the node reported a position inside a wall (out-of-order packets, minor physics divergence), the server snaps it to the nearest walkable point.

There is **no speed cap**. Full position validation (`anticheat.py`) exists but is not called on node packets; it caused visible jitter on the FPGA renderer when delayed burst packets made apparent speed look implausible, causing the server and node to disagree on position. Removing speed-cap validation eliminated the jitter. The only clients are trusted PYNQ boards; adversarial validation is not needed.

All **match events** (tags, bit collection, match end) are server-authoritative regardless.

## Tagging

Euclidean distance check every tick, all player pairs. `TAG_RADIUS = 16.0` world units (~2 tile widths). No wall occlusion check; at this range it's unnecessary on current maps.

On a tag:
- Both players teleport to spawn positions (`π/2` apart).
- `GRACE_TICKS = 30` (0.5 s) suppresses proximity checks after reset.
- `FLAG_TAGGED` held for `TAG_FLASH_S = 0.3 s` so nodes can react (teleport animation, sound).
- `FLAG_MATCH_END` held for `MATCH_END_HOLD_S = 0.5 s` on the final tag (`TAGS_TO_WIN = 2`).

## Flag signalling

Flags are per-player bits in each `PKT_GAME_STATE` `PlayerEntry`:

| Flag | Value | Meaning |
|------|-------|---------|
| `FLAG_TAGGED` | `0x02` | Runner tagged this tick |
| `FLAG_MATCH_END` | `0x04` | Match over |
| `FLAG_GHOST` | `0x08` | Server-controlled entity |

## Collision resolution

Stepped fallback when a move would enter a wall (`t2_map_loader.py`):
1. Try full move.
2. Try x-only (slide along Y wall).
3. Try y-only (slide along X wall).
4. Binary-search midpoints between current and desired (10 iterations); resolves corner catches.
5. Stay put.

Nine probe points (centre + 8 around `collision_radius = 2.0`) are tested at each step.

## Ghost AI

Ghosts use **reactive steering**, not A*. Each tick:
1. Compute base heading toward runner.
2. Try 10 candidate headings (base ± 0°, ±20°, ±40°, ±60°, ±90°, ±180°).
3. Score each: `progress_toward_runner × 10 + distance_moved - heading_deviation × 0.15 - steer_change × 0.2`.
4. Take best non-blocked candidate.
5. Carry forward `steer_dir` to reduce corner oscillation.

No path cache, no graph search. Stateless per tick. Cheaper than A* and produces believable pressure on current maps. Up to 3 ghosts; `FLAG_GHOST=0x08`; ghost `player_id`s start at 3.

Ghost count is controlled at runtime via Monitor > Redis `game:control` `{"cmd":"set_ghost_count","count":N}`.

## Simulator auto-mode (A*)

The PC node simulator (`node_simulator.py`) uses full 4-direction A* on the 32×32 tile grid. Grid is tiny (1024 cells) so A* completes in microseconds.

`choose_auto_objective()` decides target each tick:

| Role | Situation | Objective |
|------|-----------|-----------|
| Tagger | Always | A* to runner position |
| Runner | Tagger within `AUTO_RUNNER_EVADE_DISTANCE` | Evade (highest priority) |
| Runner | Chase-bits map + bits remaining | A* to nearest uncollected bit |
| Runner | No threat, no bits | Kite (maintain distance) |
| Either | No valid target | Roam |

`path_step_target()` returns the next waypoint; `choose_best_step_towards()` takes one collision-resolved step. This is simulator-only; the PYNQ board auto mode uses heading arithmetic rather than full grid A*.

## Game modes

- `GAME_MODE_CHASE (0x00)`: tag-only, no collectibles.
- `GAME_MODE_CHASE_BITS (0x01)`: runner collects `B` tiles. Detected at match start from map `B` tile count. `PKT_BITS_INIT` sent once with world-space `(x, y)` of every bit. `bits_mask` (16-bit) in each `PKT_GAME_STATE` tracks which bits remain. `BIT_COLLECT_RADIUS = 8.0` world units.

## Maps

32×32 required by FPGA BRAM. `'B'` tile = floor in hardware, world position recorded for `PKT_BITS_INIT`. BRAM encoding: `word |= 1 << col` (LSB = col 0, matches HDL).

Maps live in `pynq_full/ec2/maps/`. Hot-swap via Monitor editor > Redis `game:control` `{"cmd":"set_map"}` > `load_map()` in T2; no server restart needed.

## Tunable constants

All game balance values in `pynq_full/ec2/server/t2_constants.py`:

```python
TAG_RADIUS          = 16.0   # world units
TAGS_TO_WIN         = 2
GHOST_SPEED         = 0.15   # world units/tick at 60 Hz
GRACE_TICKS         = 30     # ticks of tag immunity after reset
MATCH_END_HOLD_S    = 0.5
BIT_COLLECT_RADIUS  = 8.0
```

Changes take effect on next server restart. No recompile, no protocol change, no hardware reflash.
