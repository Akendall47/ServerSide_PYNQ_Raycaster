# match_state.py — MatchState: all mutable match-level fields in one place.
#
# Lives in game_logic/ because match state is a pure data structure — no queues,
# no asyncio. Any module can import it without pulling in SEDA orchestration.

import time
from t2_constants import (
    SPAWN_POSITIONS, SPAWN_ANGLES, LOCKOUT_S, GRACE_TICKS, PAUSE_ABORT_S,
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
        self.reset_match_runtime(arm_lockout=arm_lockout)

    def reset_match_runtime(self, arm_lockout: bool):
        self.next_id       = 1
        self.match_started = False
        self.match_ended   = False
        self.match_paused  = False
        self.match_end_at  = None   # monotonic time when match-end hold expires
        self.match_winner  = None
        self.match_end_reason = None
        self.pause_reason  = None
        self.paused_at     = None
        self.pause_abort_at = None
        self.paused_player_ids = []
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

    def pause_match(self, reason: str, paused_player_ids=None, abort_after_s: float = PAUSE_ABORT_S) -> bool:
        paused_ids = [int(pid) for pid in (paused_player_ids or [])]
        now = time.monotonic()
        changed = (
            not self.match_paused
            or self.pause_reason != reason
            or self.paused_player_ids != paused_ids
        )
        if not self.match_paused:
            self.paused_at = now
            self.pause_abort_at = (
                now + abort_after_s if abort_after_s is not None else None
            )
        self.match_paused = True
        self.pause_reason = reason
        self.paused_player_ids = paused_ids
        return changed

    def resume_match(self) -> bool:
        if not self.match_paused:
            return False
        self.match_paused = False
        self.pause_reason = None
        self.paused_at = None
        self.pause_abort_at = None
        self.paused_player_ids = []
        return True

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
