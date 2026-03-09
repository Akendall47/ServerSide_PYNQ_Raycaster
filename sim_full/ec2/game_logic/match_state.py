# match_state.py — MatchState: all mutable match-level fields in one place.
#
# Lives in game_logic/ because match state is a pure data structure — no queues,
# no asyncio. Any module can import it without pulling in SEDA orchestration.

import math
import time
from t2_constants import (
    ORBIT_RADIUS, SPAWN_ANGLES, LOCKOUT_S, GRACE_TICKS,
)


# All mutable state that belongs to one match lifecycle — passed by reference to sub-modules
class MatchState:

    def __init__(self):
        self.reset_all()

    # ── Full reset ────────────────────────────────────────────────────────────
    # Clears every field — called on startup and after each match ends cleanly

    def reset_all(self):
        self.players       = {}   # addr → player dict
        self.next_id       = 1
        self.match_started = False
        self.match_ended   = False
        self.match_end_at  = None   # monotonic time when match-end hold expires
        self.lockout_until = None   # monotonic time until new registrations allowed
        self.tag_count     = 0
        self.tag_flash_at  = None   # monotonic time when FLAG_TAGGED should clear
        self.match_tick    = 0      # ticks elapsed since match started (grace period)

    # ── Player position helpers ───────────────────────────────────────────────
    # Teleporting to spawn after a tag prevents immediate re-tag after flash clears

    def reset_positions(self):
        for p in self.players.values():
            idx   = p["player_id"] - 1
            angle = SPAWN_ANGLES[idx] if idx < len(SPAWN_ANGLES) else 0.0
            p["x"]     = ORBIT_RADIUS * math.cos(angle)
            p["y"]     = ORBIT_RADIUS * math.sin(angle)
            p["angle"] = angle
        self.match_tick = 0   # restart grace period so proximity check pauses
        print("[T2] positions reset to spawn, grace period restarted")

    # ── Match lifecycle helpers ───────────────────────────────────────────────
    # Centralised state transitions so GameTick, PacketHandler, CoreLogic all agree

    # Called when a node times out mid-match — resets state and arms lockout
    def abort_match(self):
        self.match_started = False
        self.match_ended   = False
        self.match_end_at  = None
        self.tag_count     = 0
        self.tag_flash_at  = None
        self.match_tick    = 0
        self.lockout_until = time.monotonic() + LOCKOUT_S

    # True while we're still within the post-match lockout window
    def is_in_lockout(self) -> bool:
        return self.lockout_until is not None and time.monotonic() < self.lockout_until

    def clear_lockout(self):
        self.lockout_until = None

    # True while match_tick is below GRACE_TICKS — proximity check is skipped
    def in_grace_period(self) -> bool:
        return self.match_tick < GRACE_TICKS
