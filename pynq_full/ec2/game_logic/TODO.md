# game_logic TODO

C++ server-side game logic module. Built as `libgame_logic.so`, loaded from Python T2 via ctypes.
The server is authoritative — all game rules live here once wired in.

Build: `cmake -B build && cmake --build build` from this directory.

---

## 1. Position validation — `anticheat.cpp : validate_position`

Three checks, each guarded by a `return false`:
1. **Stale sequence** — reject if `seq <= prev.last_seq` (handle wraparound at 65535)
2. **Out of bounds** — reject if position is outside map extents
3. **Speed cap** — reject if movement delta > `MAX_SPEED_PER_TICK` per tick

## 2. Node expiry — `node_manager.cpp : expire`

Already partially implemented — just needs connecting to T2's eviction loop.
Consider exposing `player_count()` to Python so T2 can query it without keeping its own dict.

## 3. Wire into Python T2

Once the above are implemented, load `libgame_logic.so` from `t2_game_tick.py` via ctypes:
- Call `validate_position` in `_process_packet` before accepting position updates
- The proximity distance check (`check_proximity`) can replace the inline Python sqrt

## 4. DDA raycaster — `raycaster.h / raycaster.cpp`

Stubs are commented out in `raycaster.h`. Uncomment and implement when needed (shooting mechanic,
LOS-gated tags, or any future game mode that requires server-side visibility).

`ray_intersects_wall(x, y, angle, map, max_dist)`:
- Compute ray direction: `dx = cos(angle)`, `dy = sin(angle)`
- Compute step sizes: `delta_x = tile_scale / |dx|`, `delta_y = tile_scale / |dy|`
- Accumulate `side_dist_x` / `side_dist_y`; always step on the smaller axis
- On each cell, check `tiles[map_y * width + map_x] == 1` — return hit distance if wall found
- Return `-1.0` if nothing hit within `max_dist`

`is_visible(a, b, map)`:
- Aim ray from `a` toward `b` (angle = `atan2(b.y - a.y, b.x - a.x)`)
- LOS clear if `ray_intersects_wall` returns `-1.0` or hit distance >= `dist(a, b)`

## 5. Pathfinding — `pathfinding.cpp` (new file)

Useful for: AI-controlled players, NPC enemies, tagger auto-pilot demo mode.

**A\* on the tile grid** is the standard approach:
- Nodes = open tiles; edges = 4-directional (or 8-directional) adjacency
- Heuristic = Euclidean or Manhattan distance to goal
- Returns a waypoint list the player steps toward each tick
- Pre-compute a navigation mesh or just run A\* on demand (fast enough for 20×16 maps)

**Simpler alternative — flow fields:**
- Pre-compute a gradient map toward the target tile (BFS from goal outward)
- Each player just reads their cell's direction vector — O(1) per tick after build
- Better if multiple agents chase the same target simultaneously

Suggested interface:
```cpp
// pathfinding.h
std::vector<Vec2> find_path(Vec2 start, Vec2 goal, const Map& map);
Vec2 next_waypoint(Vec2 pos, Vec2 goal, const Map& map);  // single-step convenience
```

## 6. General game logic extensions (SDK / future)

Good additions if this grows into a general FPGA game server framework:
- **Collision response** — push players apart on overlap rather than just detecting it
- **Spawn system** — weighted random spawn selection avoiding recent player positions
- **Event bus** — C++ side emits typed events (tag, match_end) that Python T2 reads via a queue
- **Replay recorder** — write state snapshots to a ring buffer in C++ for zero-copy replay
