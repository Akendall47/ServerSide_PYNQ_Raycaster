# core_logic.py — Per-tick authoritative game rules: proximity tagging, match lifecycle.
#
# Owns: tick, _check_proximity, _check_match_end, _check_match_end_hold,
#        _clear_tag_flash
#
# Lives in game_logic/ (not server/) because these are pure rules, not SEDA wiring.


import asyncio
import time

from protocol import FLAG_TAGGED, FLAG_MATCH_END
from game_logic.anticheat import Anticheat
from game_logic.match_state import MatchState
from t2_constants import (
    TAG_RADIUS, TAGS_TO_WIN,
    TAG_FLASH_S, MATCH_END_HOLD_S, LOCKOUT_S,
)


# Runs the per-tick game rules against shared MatchState
class CoreLogic:

    def __init__(self, state: MatchState, write_queue, on_event, on_force_end_consumed):
        self.state                  = state
        self.write_queue            = write_queue
        self._on_event              = on_event
        self._on_force_end_consumed = on_force_end_consumed
        self._force_end_flag        = False  # set by Redis control channel
        self._anticheat             = Anticheat()

    # ── Main tick entry point ─────────────────────────────────────────────────
    # Run all per-tick game-rule checks in the correct order each tick

    async def tick(self):
        await self._check_match_end_hold()
        await self._check_proximity()
        await self._check_match_end()
        self._clear_tag_flash()
        if self.state.match_started and not self.state.match_ended:
            self.state.match_tick += 1

    # ── Tag flash expiry ──────────────────────────────────────────────────────
    # Clear FLAG_TAGGED after TAG_FLASH_S so the next tag can be registered

    def _clear_tag_flash(self):
        if self.state.tag_flash_at is None or self.state.match_ended:
            return
        if time.monotonic() >= self.state.tag_flash_at:
            for p in self.state.players.values():
                if p["flags"] & FLAG_TAGGED:
                    p["flags"] &= ~FLAG_TAGGED
                    print(f"[T2] P{p['player_id']} tag flash cleared "
                          f"({self.state.tag_count}/{TAGS_TO_WIN} tags)")
            self.state.tag_flash_at = None

    # ── Match-end hold phase ──────────────────────────────────────────────────
    # After final tag FLAG_TAGGED is held for MATCH_END_HOLD_S so every node sees it

    async def _check_match_end_hold(self):
        if self.state.match_end_at is None:
            return
        if time.monotonic() < self.state.match_end_at:
            return

        print(f"[T2] match end hold expired — clearing players, lockout {LOCKOUT_S}s")
        for p in self.state.players.values():
            self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})
        self.state.players       = {}
        self.state.next_id       = 1
        self.state.tag_count     = 0
        self.state.tag_flash_at  = None
        self.state.match_end_at  = None
        self.state.match_started = False
        self.state.match_ended   = False
        self.state.lockout_until = time.monotonic() + LOCKOUT_S

    # ── Proximity / tag detection ─────────────────────────────────────────────
    # Pairwise check — skipped during grace period so nodes reach their orbits first

    async def _check_proximity(self):
        players = list(self.state.players.values())
        if len(players) < 2 or self.state.in_grace_period():
            return

        for i in range(len(players)):
            for j in range(i + 1, len(players)):
                p1, p2 = players[i], players[j]
                dist = self._anticheat.distance_between(
                    p1["x"], p1["y"], p2["x"], p2["y"]
                )

                if dist >= TAG_RADIUS:
                    continue
                # Lower player_id (runner = 1) is always the one tagged
                tagged = p1 if p1["player_id"] < p2["player_id"] else p2

                # Guard: only one tag per flash window — prevents double-counting
                if (tagged["flags"] & FLAG_TAGGED) or self.state.tag_flash_at is not None:
                    continue

                tagged["flags"]         |= FLAG_TAGGED
                self.state.tag_count    += 1
                self.state.tag_flash_at  = time.monotonic() + TAG_FLASH_S
                print(f"[T2] P{tagged['player_id']} tagged (dist={dist:.2f}) "
                      f"— tag {self.state.tag_count}/{TAGS_TO_WIN}")

                # Teleport both to spawn so they aren't still overlapping after
                # the flash clears, which would cause an immediate second tag.
                self.state.reset_positions()
                await self._on_event({
                    "event":      "player_tagged",
                    "player_id":  tagged["player_id"],
                    "dist":       round(dist, 2),
                    "tag_count":  self.state.tag_count,
                    "tags_to_win": TAGS_TO_WIN,
                })

    # ── Match end trigger ─────────────────────────────────────────────────────
    # End match on TAGS_TO_WIN tags or an immediate force_end command

    async def _check_match_end(self):
        if not self.state.match_started or self.state.match_ended:
            self._force_end_flag = False
            return

        forced = self._force_end_flag
        self._force_end_flag = False

        if not forced and self.state.tag_count < TAGS_TO_WIN:
            return

        self.state.match_ended  = True
        self.state.match_end_at = time.monotonic() + MATCH_END_HOLD_S

        # Mark all players so nodes can distinguish intermediate vs final tag
        for p in self.state.players.values():
            p["flags"] |= FLAG_MATCH_END

        reason = "force_end" if forced else f"runner tagged {self.state.tag_count}x"
        print(f"[T2] match ended — {reason} (clearing players in {MATCH_END_HOLD_S}s)")
        await self._on_event({
            "event": "match_end", "winner": "tagger",
            "tag_count": self.state.tag_count,
        })
