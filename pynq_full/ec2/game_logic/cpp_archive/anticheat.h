#pragma once
#include "state.h"
#include <cstdint>

namespace Anticheat {
    // Validate an incoming position update against the player's last known state.
    // Returns false if the update should be rejected.
    bool validate_position(const PlayerState& prev,
                           float new_x, float new_y, float new_angle,
                           uint16_t seq,
                           float min_x, float min_y,
                           float max_x, float max_y,
                           float max_speed_per_tick);

    float distance_between(float ax, float ay, float bx, float by);
}

extern "C" {
    int validate_position_c(uint16_t prev_seq,
                            float prev_x, float prev_y, float prev_angle,
                            float new_x, float new_y, float new_angle,
                            uint16_t seq,
                            float min_x, float min_y,
                            float max_x, float max_y,
                            float max_speed_per_tick);

    float distance_between_c(float ax, float ay, float bx, float by);
}
