# match_state.py — MatchState: all mutable match-level fields in one place.
#
# Lives in game_logic/ because match state is a pure data structure — no queues,
# no asyncio. Any module can import it without pulling in SEDA orchestration.

import time
from t2_constants import (
    SPAWN_POSITIONS, SPAWN_ANGLES, LOCKOUT_S, GRACE_TICKS,
)
from protocol import GAME_MODE_CHASE


# All mutable state that belongs to one match lifecycle — passed by reference to sub-modules
class MatchState:

    def __init__(self):
        self.reset_all()

    # ── Full reset ────────────────────────────────────────────────────────────
    # Clears every field — called on startup and after each match ends cleanly

    def reset_all(self):
        self.spawn_positions = list(SPAWN_POSITIONS)
        self.clear_match(arm_lockout=False)

    # ── Player position helpers ───────────────────────────────────────────────
    # Teleporting to spawn after a tag prevents immediate re-tag after flash clears

    def reset_positions(self):
        for p in self.players.values():
            idx       = p["player_id"] - 1
            sx, sy    = self.spawn_positions[idx] if idx < len(self.spawn_positions) else (0.0, 0.0)
            p["x"]    = sx
            p["y"]    = sy
            p["angle"] = SPAWN_ANGLES[idx] if idx < len(SPAWN_ANGLES) else 0.0
        self.match_tick = 0   # restart grace period so proximity check pauses
        print("[T2] positions reset to spawn, grace period restarted")

    # ── Match lifecycle helpers ───────────────────────────────────────────────
    # Centralised state transitions so GameTick, PacketHandler, CoreLogic all agree

    def clear_match(self, arm_lockout: bool):
        self.players       = {}   # addr → player dict (ghost addrs use sentinel "ghost:<id>")
        self.next_id       = 1
        self.match_started = False
        self.match_ended   = False
        self.match_end_at  = None   # monotonic time when match-end hold expires
        self.match_winner  = None
        self.match_end_reason = None
        self.tag_count     = 0
        self.tag_flash_at  = None   # monotonic time when FLAG_TAGGED should clear
        self.match_tick    = 0      # ticks elapsed since match started (grace period)
        self.game_mode     = GAME_MODE_CHASE
        self.bits          = []     # list of [x, y, active]
        self.bits_mask     = 0
        self.pending_roles = {}     # addr → preferred_role from PKT_REGISTER
        self.lockout_until = time.monotonic() + LOCKOUT_S if arm_lockout else None

    # Called when a node times out mid-match — resets state and arms lockout
    def abort_match(self):
        self.clear_match(arm_lockout=True)

    def set_spawn_positions(self, positions):
        self.spawn_positions = [tuple(pos) for pos in positions] if positions else list(SPAWN_POSITIONS)

    # Return the player dict for the runner (player_id=1), or None if not yet registered
    def runner(self):
        for p in self.players.values():
            if p["player_id"] == 1:
                return p
        return None

    # True while we're still within the post-match lockout window
    def is_in_lockout(self) -> bool:
        return self.lockout_until is not None and time.monotonic() < self.lockout_until

    def clear_lockout(self):
        self.lockout_until = None

    # True while match_tick is below GRACE_TICKS — proximity check is skipped
    def in_grace_period(self) -> bool:
        return self.match_tick < GRACE_TICKS
