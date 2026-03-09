#pragma once
#include "state.h"

namespace Raycaster {
    // Euclidean distance between two world-space positions.
    // Server uses this for tag detection — same logic as T2 _check_proximity.
    float check_proximity(Vec2 a, Vec2 b);

    // TODO: DDA ray-march from (x,y) along angle. Returns hit distance or -1.0.
    // Needed by is_visible and any future shooting mechanic.
    // float ray_intersects_wall(float x, float y, float angle,
    //                           const Map& map, float max_dist = 500.0f);

    // TODO: LOS check — true if no wall between a and b.
    // Implement by calling ray_intersects_wall(a → b) and comparing hit dist to dist(a,b).
    // bool is_visible(Vec2 a, Vec2 b, const Map& map);
}
