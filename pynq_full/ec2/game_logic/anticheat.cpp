// game_logic/anticheat.cpp — server-side position validation.
// Called from T2 _process_packet before accepting a player update.

#include "anticheat.h"

namespace Anticheat {

// Maximum allowed movement per tick in world units.
// At 20 Hz, a speed of 5.0 units/tick = 100 units/sec.
static constexpr float MAX_SPEED_PER_TICK = 10.0f;

bool validate_position(const PlayerState& prev, float new_x, float new_y,
                       float new_angle, uint16_t seq) {
    // TODO: reject stale or replayed sequence numbers.
    //   if (seq <= prev.last_seq && !(prev.last_seq > 60000 && seq < 5000)) return false;

    // TODO: reject out-of-bounds positions (outside map extents).
    //   if (new_x < 0 || new_y < 0 || new_x > map_w * scale || ...) return false;

    // TODO: reject movement delta exceeding MAX_SPEED_PER_TICK.
    //   float dx = new_x - prev.x, dy = new_y - prev.y;
    //   if (dx*dx + dy*dy > MAX_SPEED_PER_TICK * MAX_SPEED_PER_TICK) return false;

    (void)prev; (void)new_x; (void)new_y; (void)new_angle; (void)seq;
    return true;  // accept all until TODOs are implemented
}

} // namespace Anticheat
