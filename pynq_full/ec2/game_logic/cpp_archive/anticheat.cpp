// game_logic/anticheat.cpp — server-side position validation.
// Called from T2 _process_packet before accepting a player update.

#include "anticheat.h"
#include <cmath>

namespace Anticheat {

static bool is_newer_seq(uint16_t seq, uint16_t prev_seq) {
    const uint16_t delta = static_cast<uint16_t>(seq - prev_seq);
    return delta != 0 && delta <= 0x7FFF;
}

bool validate_position(const PlayerState& prev, float new_x, float new_y,
                       float new_angle, uint16_t seq,
                       float min_x, float min_y,
                       float max_x, float max_y,
                       float max_speed_per_tick) {
    (void)new_angle;

    if (!is_newer_seq(seq, prev.last_seq)) {
        return false;
    }

    if (new_x < min_x || new_x > max_x || new_y < min_y || new_y > max_y) {
        return false;
    }

    const float dx = new_x - prev.x;
    const float dy = new_y - prev.y;
    const float max_dist_sq = max_speed_per_tick * max_speed_per_tick;
    if ((dx * dx) + (dy * dy) > max_dist_sq) {
        return false;
    }

    return true;
}

float distance_between(float ax, float ay, float bx, float by) {
    const float dx = ax - bx;
    const float dy = ay - by;
    return std::sqrt((dx * dx) + (dy * dy));
}

} // namespace Anticheat

extern "C" int validate_position_c(uint16_t prev_seq,
                                   float prev_x, float prev_y, float prev_angle,
                                   float new_x, float new_y, float new_angle,
                                   uint16_t seq,
                                   float min_x, float min_y,
                                   float max_x, float max_y,
                                   float max_speed_per_tick) {
    const PlayerState prev{0, prev_x, prev_y, prev_angle, 0, prev_seq, 0};
    return Anticheat::validate_position(prev, new_x, new_y, new_angle, seq,
                                        min_x, min_y, max_x, max_y,
                                        max_speed_per_tick) ? 1 : 0;
}

extern "C" float distance_between_c(float ax, float ay, float bx, float by) {
    return Anticheat::distance_between(ax, ay, bx, by);
}
