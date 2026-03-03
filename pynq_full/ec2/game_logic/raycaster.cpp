// ec2/game_logic/raycaster.cpp — raycaster primitives (stubs, see raycaster.h).

#include "raycaster.h"
#include <cmath>

namespace Raycaster {

float ray_intersects_wall(float x, float y, float angle, const Map& map, float max_dist) {
    // TODO: DDA ray-march — step through tiles along ray, return hit distance or -1.0
    (void)x; (void)y; (void)angle; (void)map; (void)max_dist;
    return -1.0f;
}

bool is_visible(Vec2 a, Vec2 b, const Map& map) {
    // TODO: reuse ray_intersects_wall; LOS clear if hit distance >= dist(a,b)
    (void)a; (void)b; (void)map;
    return true;
}

float check_proximity(Vec2 a, Vec2 b) {
    float dx = a.x - b.x;
    float dy = a.y - b.y;
    return std::sqrt(dx * dx + dy * dy);
}

}   // namespace Raycaster
