# Maps

Text format: `#` = wall, `.` = empty, `B` = bit spawn point, `1`..`5` = explicit spawn anchors.
`1` = runner, `2` = tagger, `3`..`5` = ghost slots. Row-major; all rows must be exactly
32 characters and there must be exactly 32 rows (FPGA BRAM constraint — see `ref_files/drivers/mapDriver.py`).
Maps must have a solid border of `#` on all four edges — the raycaster does no bounds checking.
Server loads `chase.txt` by default; the dashboard `set_map` command switches maps mid-session.

## Maps and game modes

| File | Game mode | Player setup | Bits |
|------|-----------|--------------|------|
| `chase.txt` | GAME_MODE_CHASE | runner vs tagger | none |
| `ghost_chase.txt` | GAME_MODE_CHASE | runner vs tagger + ghosts | none |
| `chase_bits.txt` | GAME_MODE_CHASE_BITS | runner vs tagger + bits | 9 |
| `ghost_bits.txt` | GAME_MODE_CHASE_BITS | runner vs tagger + ghosts + bits | 9 |

Ghost count is set at runtime via the Monitor (simulates PYNQ player-menu selection).
The map determines whether bits are present; ghosts are always added on top independently.

---

## How Visibility / Tagging Works

The server does **no raycasting**. Tag detection uses a simple Euclidean distance check in
`t2_game_tick._check_proximity`: if the two players are within `TAG_RADIUS = 20.0` world units,
a tag is registered. This is the standard approach for small-scale multiplayer — cheap, correct,
and impossible to exploit at 2 players.

**Walls are intentionally ignored by the server for tagging.** At `TAG_RADIUS = 20.0` units
(2.5 tiles at `tile_scale = 8`), two players close enough to tag are essentially in the same
room — a wall between them at that range would be a corner-case edge, not a real exploit.
Wall awareness via `is_visible` / DDA is only worth adding server-side if a mechanic genuinely
requires it (e.g. shooting across the map — see `game_logic/TODO.md §4`).

The FPGA is the only place raycasting runs. It renders the player's first-person view each frame
using a DDA traversal of the tile grid. The server sends the map once on registration (PKT_MAP)
and player positions each tick (PKT_GAME_STATE); the FPGA does the rest autonomously.

---

## Procedural Generation Ideas

### Maze generation (guaranteed connected, no dead-end traps)

**Recursive backtracker (DFS)**
Carve passages from a fully-walled grid by walking randomly and removing walls between
unvisited cells. Produces long winding corridors — good for tense chases.
Simple to implement; output is always a perfect maze (exactly one path between any two cells).

**Prim's algorithm**
Grow a maze outward from a random seed cell. Produces shorter, bushier corridors with more
branching than DFS. Better for raycaster because sightlines stay short and frame cost stays low.

**Recursive division**
Start with an open room, recursively split it with walls that have one gap each.
Produces a very regular, room-like feel. Easy to bias toward larger open arenas — useful
if you want a map that forces player contact rather than hiding.

---

### Adding tactical structure on top of a generated maze

- **Spawn clearance** — guarantee a minimum open radius around each spawn point so players
  aren't immediately trapped against a wall on match start.
- **Chokepoints** — identify narrow 1-tile corridors and widen a few of them to 2 tiles;
  makes the tagger role less frustrating in tight maps.
- **Symmetry pass** — mirror the top half onto the bottom (or left onto right) to ensure
  neither player has a structural advantage from their spawn.
- **Connectivity check** — BFS/flood-fill from every open cell after generation to confirm
  all floor tiles are reachable; discard and regenerate if not.

---

### Other algorithms worth considering elsewhere in the project

**Spatial hashing / grid bucketing** (proximity scaling)
`t2_game_tick._check_proximity` does an O(n²) pairwise distance check.
Fine for n=2, but a spatial hash or grid bucket cuts it to O(n) average if player count grows.

**DDA (Digital Differential Analyser)** (FPGA raycaster)
The intended FPGA rendering algorithm — each ray advances one grid cell at a time using only
addition, no sqrt or division per step. Same incremental logic as the classic Wolfenstein engine.

**Exponential backoff** (UDP reliability)
The REGISTER packet is currently retried on a fixed 2 s interval (`pynq_client.py`).
Exponential backoff (2 s → 4 s → 8 s, capped) is more polite under packet loss and avoids
thundering-herd if multiple boards reconnect simultaneously after a server restart.
