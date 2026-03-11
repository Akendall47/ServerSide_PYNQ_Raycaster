# Remote Entities On PYNQ

See also: `INTERFACING_NOTES.md` for the broader board-side split and offload status.

This note describes the minimum board-side work needed to render basic ghosts
and other remote entities on the PYNQ path.

## Current State

- EC2 already sends full player lists in `PKT_GAME_STATE`.
- Ghosts already exist in authoritative server state and are tagged with
  `FLAG_GHOST`.
- The PYNQ client now keeps:
  - local player pose
  - a capped remote-entity list (other human + ghosts)
  - bit mask / bit positions
- The FPGA-side register interface currently exposes only the local player pose.
- The Python client stages remote entities into BRAM, but the current FPGA bitstream
  does not render them yet.

That means the network/protocol path is mostly ready, but the board-side render
path is not.

## Direction

For the real PYNQ build, rendering should be board-side, not software fallback.
The Python client should behave as a thin transport/control layer:

- receive world state from EC2
- decode remote entities
- write a compact entity list into FPGA-visible registers or BRAM
- let the FPGA renderer draw walls + sprites

The software fallback renderer in `pynq_client.py` is useful for bring-up, but
it should not be treated as the target architecture.

## Minimum PYNQ Changes

### 1. Track all remote entities in the PYNQ client

Update `pynq_full/interfacing/pynq_client.py` so it keeps a list like:

```text
remote_entities = [
  {entity_id, x, y, angle, flags, active},
  ...
]
```

Rules:

- exclude `self.player_id`
- include ghosts
- include the other human player
- preserve `FLAG_GHOST`, `FLAG_TAGGED`, `FLAG_MATCH_END`
- clear stale entries each `PKT_GAME_STATE`

Recommended early cap:

- `MAX_REMOTE_ENTITIES = 4`

That is enough for:

- 1 opposing human
- up to 3 ghosts

### 2. Extend the FPGA-visible control surface

The raycaster IP needs more than:

- `player_x`
- `player_y`
- `player_angle`

Add either:

1. AXI-Lite registers for a small fixed entity count, or
2. a BRAM-backed entity table

BRAM is the better long-term choice.

Suggested per-entity fields:

- `active`
- `x`
- `y`
- `angle`
- `flags`
- optional `sprite_id`

Suggested minimal layout:

```text
entity_count
entity[0].x
entity[0].y
entity[0].flags
...
entity[3].x
entity[3].y
entity[3].flags
```

If angles are not needed for the sprite art, drop them initially.

### 3. Add sprite rendering in the FPGA pipeline

The hardware renderer needs a basic billboard sprite pass:

- transform entity world position into camera space
- reject entities behind the player
- project to screen x / apparent size
- depth-test against wall distance per column
- draw sprite columns only where the entity is in front of the wall

Minimum useful behavior:

- one sprite for ghost
- one sprite for opposing human
- optional tint from flags:
  - ghost = grey/blue
  - tagged = red flash
  - match_end = amber

No animation system is required for the first pass.

### 4. Bits should use the same pattern

Bits should not stay as monitor-only information.

Board-side target:

- Python client stores bit positions from `PKT_BITS_INIT`
- Python client writes bit positions + current `bits_mask` to FPGA-visible memory
- FPGA draws simple collectible markers/sprites

This is the same infrastructure problem as ghosts, just with smaller/static
objects.

## Recommended Implementation Order

1. Change `pynq_client.py` to keep full remote entity state from `PKT_GAME_STATE`.
2. Define a small BRAM entity-table format.
3. Write remote entities from Python into that table every tick.
4. Add one simple ghost billboard sprite in the FPGA renderer.
5. Reuse the same pattern for bits.

## What Not To Do

- Do not make ghosts separate UDP clients just to get them on screen.
  The server already owns ghost AI correctly.
- Do not keep expanding Python/software rendering if the goal is the real PYNQ path.
- Do not special-case ghosts too heavily. Treat them as normal remote entities
  with a `FLAG_GHOST` bit.

## Minimum Success Criteria

The first acceptable PYNQ result is:

- walls rendered by FPGA
- local player controlled as now
- one or more remote entities visible as sprites
- ghosts visibly distinct from humans
- sprite visibility respects wall occlusion
- bits shown from `bits_mask` / `PKT_BITS_INIT`

That is enough to support basic chase and chase-bits on the actual board path.
