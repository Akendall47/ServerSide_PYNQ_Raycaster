#pragma once
#include "state.h"

namespace Anticheat {
    // Validate an incoming position update against the player's last known state.
    // Returns false if the update should be rejected.
    bool validate_position(const PlayerState& prev,
                           float new_x, float new_y, float new_angle,
                           uint16_t seq);
}
