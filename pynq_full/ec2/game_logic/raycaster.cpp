// game_logic/raycaster.cpp — spatial query helpers for server-side game logic.
// The FPGA handles all rendering raycasting independently.

#include "raycaster.h"
#include <cmath>

namespace Raycaster {

float check_proximity(Vec2 a, Vec2 b) {
    float dx = a.x - b.x;
    float dy = a.y - b.y;
    return std::sqrt(dx * dx + dy * dy);
}

}   // namespace Raycaster
