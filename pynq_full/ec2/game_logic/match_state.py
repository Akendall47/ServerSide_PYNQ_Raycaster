# match_state.py — MatchState: all mutable match-level fields in one place.
#
# Lives in game_logic/ because match state is a pure data structure — no queues,
# no asyncio. Any module can import it without pulling in SEDA orchestration.

import time
from t2_constants import (
    SPAWN_POSITIONS, SPAWN_ANGLES, LOCKOUT_S, GRACE_TICKS, PAUSE_ABORT_S,
    GHOST_SPEED, TAG_RADIUS, MAX_GHOSTS,
)
from protocol import GAME_MODE_CHASE
# t2_constants lives in server/ — imported here because constants are config, not logic


def _clamp_float(value, default: float, minimum: float, maximum: float) -> float:
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return default
    return max(minimum, min(maximum, parsed))


# All mutable state that belongs to one match lifecycle — passed by reference to sub-modules
class MatchState:

    def __init__(self):
        self.reset_all()

    # ── Full reset ────────────────────────────────────────────────────────────
    # Clears every field — called on startup and after each match ends cleanly

    def reset_all(self):
        self.spawn_positions = list(SPAWN_POSITIONS)
        self.slot_modes = {1: "manual", 2: "manual"}
        self.reconnect_blocked_until = {}
        self.ghost_profiles = {
            slot: self.default_ghost_profile(slot)
            for slot in range(1, MAX_GHOSTS + 1)
        }
        self.clear_match(arm_lockout=False)

    def reset_slot_modes(self):
        """Reset all board slots to manual — call when returning to lobby so a
        monitor-set auto mode from the previous match doesn't carry over."""
        self.slot_modes = {1: "manual", 2: "manual"}

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
        self.match_end_at  = None
        self.match_winner  = None
        self.match_end_reason = None
        self.pause_reason  = None
        self.paused_at     = None
        self.pause_abort_at = None
        self.paused_player_ids = []
        self.lockout_until = time.monotonic() + LOCKOUT_S if arm_lockout else None
        self.tag_count     = 0
        self.tag_flash_at  = None
        self.match_tick    = 0
        self.game_mode     = GAME_MODE_CHASE
        self.bits          = []
        self.bits_mask     = 0
        self.pending_roles = {}

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

    def default_ghost_profile(self, slot: int) -> dict:
        return {
            "slot": int(slot),
            "speed": round(float(GHOST_SPEED), 4),
            "tag_radius": round(float(TAG_RADIUS), 4),
        }

    def ghost_profile(self, slot: int) -> dict:
        slot_key = int(slot)
        profile = self.ghost_profiles.get(slot_key)
        if profile is None:
            profile = self.default_ghost_profile(slot_key)
            self.ghost_profiles[slot_key] = profile
        return {
            "slot": slot_key,
            "speed": float(profile.get("speed", GHOST_SPEED)),
            "tag_radius": float(profile.get("tag_radius", TAG_RADIUS)),
        }

    def set_ghost_profile(self, slot: int, speed=None, tag_radius=None) -> dict | None:
        slot_key = int(slot)
        if slot_key < 1 or slot_key > MAX_GHOSTS:
            return None
        current = self.ghost_profile(slot_key)
        if speed is not None:
            current["speed"] = round(_clamp_float(speed, GHOST_SPEED, 0.02, 1.0), 4)
        if tag_radius is not None:
            current["tag_radius"] = round(_clamp_float(tag_radius, TAG_RADIUS, 2.0, 64.0), 4)
        self.ghost_profiles[slot_key] = current
        return dict(current)

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

    def block_reconnect(self, addr, duration_s: float):
        if duration_s <= 0:
            self.reconnect_blocked_until.pop(addr, None)
            return
        self.reconnect_blocked_until[addr] = time.monotonic() + duration_s

    def reconnect_block_remaining(self, addr) -> float:
        deadline = self.reconnect_blocked_until.get(addr)
        if deadline is None:
            return 0.0
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            self.reconnect_blocked_until.pop(addr, None)
            return 0.0
        return remaining

    # True while match_tick is below GRACE_TICKS — proximity check is skipped
    def in_grace_period(self) -> bool:
        return self.match_tick < GRACE_TICKS
