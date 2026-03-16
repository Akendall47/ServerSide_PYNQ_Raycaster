# core_logic.py — Per-tick authoritative game rules: proximity tagging, match lifecycle.
#
# Owns: tick, _check_proximity, _check_match_end, _check_match_end_hold,
#        _clear_tag_flash
#
# Lives in game_logic/ (not server/) because these are pure rules, not SEDA wiring.


import asyncio
import math
import time

from protocol import FLAG_TAGGED, FLAG_MATCH_END, GAME_MODE_CHASE_BITS, FLAG_GHOST
from game_logic.anticheat import Anticheat
from game_logic.match_state import MatchState
from t2_map_loader import resolve_walkable_world
from t2_constants import (
    TAG_RADIUS, TAGS_TO_WIN,
    TAG_FLASH_S, MATCH_END_HOLD_S, LOCKOUT_S,
    BIT_COLLECT_RADIUS, GHOST_SPEED, PLAYER_COLLISION_RADIUS,
)


# Runs the per-tick game rules against shared MatchState
class CoreLogic:

    def __init__(self, state: MatchState, write_queue, on_event, on_force_end_consumed, map_state=None):
        self.state                  = state
        self.write_queue            = write_queue
        self._on_event              = on_event
        self._on_force_end_consumed = on_force_end_consumed
        self._force_end_flag        = False  # set by Redis control channel
        self._anticheat             = Anticheat()
        self.map_state              = map_state if map_state is not None else {}

    # ── Main tick entry point ─────────────────────────────────────────────────
    # Run all per-tick game-rule checks in the correct order each tick

    async def tick(self):
        await self._check_match_end_hold()
        if self.state.match_ended:
            return
        if self.state.match_paused:
            return
        self._move_ghosts()
        await self._check_proximity()
        await self._check_bits()
        await self._check_match_end()
        self._clear_tag_flash()
        if self.state.match_started and not self.state.match_ended:
            self.state.match_tick += 1

    # ── Ghost AI movement ─────────────────────────────────────────────────────
    # Each tick move every ghost tagger straight toward the runner at GHOST_SPEED

    def _move_ghosts(self):
        if not self.state.match_started or self.state.match_ended:
            return
        runner = self.state.runner()
        if runner is None:
            return
        rx, ry = runner["x"], runner["y"]
        for addr, p in self.state.players.items():
            if not str(addr).startswith("ghost:"):
                continue
            next_x, next_y, next_angle = self._choose_ghost_step(p, rx, ry)
            p["x"] = next_x
            p["y"] = next_y
            p["angle"] = next_angle

    def _choose_ghost_step(self, ghost: dict, target_x: float, target_y: float):
        current_x = ghost["x"]
        current_y = ghost["y"]
        dx = target_x - current_x
        dy = target_y - current_y
        dist = math.hypot(dx, dy)
        if dist < 0.01:
            return current_x, current_y, ghost.get("angle", 0.0)

        base_angle = math.atan2(dy, dx)
        current_angle = ghost.get("angle", base_angle)
        step = min(self._ghost_speed(ghost), dist)
        steer_dir = int(ghost.get("steer_dir", 0) or 0)
        if steer_dir > 0:
            offsets = (
                0.0,
                0.35, 0.7, 1.05, math.pi / 2,
                -0.35, -0.7, -1.05, -math.pi / 2,
                math.pi,
            )
        elif steer_dir < 0:
            offsets = (
                0.0,
                -0.35, -0.7, -1.05, -math.pi / 2,
                0.35, 0.7, 1.05, math.pi / 2,
                math.pi,
            )
        else:
            offsets = (
                0.0,
                0.35, -0.35,
                0.7, -0.7,
                1.05, -1.05,
                math.pi / 2, -math.pi / 2,
                math.pi,
            )
        best = None

        for scale in (1.0, 0.75, 0.5):
            candidate_step = step * scale
            for offset in offsets:
                candidate_angle = base_angle + offset
                desired_x = current_x + math.cos(candidate_angle) * candidate_step
                desired_y = current_y + math.sin(candidate_angle) * candidate_step
                next_x, next_y = resolve_walkable_world(
                    self.map_state,
                    current_x,
                    current_y,
                    desired_x,
                    desired_y,
                    PLAYER_COLLISION_RADIUS,
                )
                move_dist = self._anticheat.distance_between(current_x, current_y, next_x, next_y)
                if move_dist < 0.05:
                    continue
                remaining = self._anticheat.distance_between(next_x, next_y, target_x, target_y)
                progress = dist - remaining
                heading_delta = math.atan2(
                    math.sin(candidate_angle - current_angle),
                    math.cos(candidate_angle - current_angle),
                )
                score = (
                    (progress * 10.0)
                    + move_dist
                    - (abs(offset) * 0.15)
                    - (abs(heading_delta) * 0.2)
                )
                if steer_dir and offset * steer_dir < 0:
                    score -= 2.0
                if best is None or score > best[0]:
                    best = (score, next_x, next_y, candidate_angle, offset)
            if best is not None:
                break

        if best is None:
            return current_x, current_y, ghost.get("angle", base_angle)
        ghost["steer_dir"] = 0 if abs(best[4]) < 0.05 else (1 if best[4] > 0.0 else -1)
        return best[1], best[2], best[3]

    def _ghost_speed(self, ghost: dict) -> float:
        try:
            speed = float(ghost.get("speed", GHOST_SPEED))
        except (TypeError, ValueError):
            speed = GHOST_SPEED
        return max(0.02, speed)

    def _pair_tag_radius(self, p1: dict, p2: dict) -> float:
        overrides = []
        for player in (p1, p2):
            if not (int(player.get("flags", 0)) & FLAG_GHOST):
                continue
            try:
                overrides.append(float(player.get("tag_radius", TAG_RADIUS)))
            except (TypeError, ValueError):
                continue
        if overrides:
            return max(2.0, max(overrides))
        return TAG_RADIUS

    # ── Bit collection ────────────────────────────────────────────────────────
    # Runner collects bits in CHASE_BITS mode; all-collected → match end

    async def _check_bits(self):
        if self.state.game_mode != GAME_MODE_CHASE_BITS:
            return
        if not self.state.match_started or self.state.match_ended:
            return
        runner = self.state.runner()
        if runner is None:
            return
        rx, ry = runner["x"], runner["y"]
        for i, bit in enumerate(self.state.bits):
            if not bit[2]:   # already collected
                continue
            dist = self._anticheat.distance_between(rx, ry, bit[0], bit[1])
            if dist >= BIT_COLLECT_RADIUS:
                continue
            bit[2] = False
            self.state.bits_mask &= ~(1 << i)
            print(f"[T2] runner collected bit {i} (dist={dist:.2f}) "
                  f"mask=0x{self.state.bits_mask:04X}")
            await self._on_event({
                "event":     "bit_collected",
                "bit_id":    i,
                "runner_id": runner["player_id"],
                "bits_mask": self.state.bits_mask,
            })
            if self.state.bits_mask == 0:
                await self._finish_match("runner", "bits_cleared")
                return

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

        print(f"[T2] match end hold expired — returning players to lobby")
        self._on_force_end_consumed()

    # ── Proximity / tag detection ─────────────────────────────────────────────
    # Pairwise check — skipped during grace period so players can separate after spawn/reset

    async def _check_proximity(self):
        players = list(self.state.players.values())
        if len(players) < 2 or self.state.match_ended or self.state.in_grace_period():
            return

        for i in range(len(players)):
            for j in range(i + 1, len(players)):
                p1, p2 = players[i], players[j]
                dist = self._anticheat.distance_between(
                    p1["x"], p1["y"], p2["x"], p2["y"]
                )
                tag_radius = self._pair_tag_radius(p1, p2)
                if dist >= tag_radius:
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

                final_tag = self.state.tag_count >= TAGS_TO_WIN
                if not final_tag:
                    # Teleport both to spawn so they aren't still overlapping after
                    # the flash clears, which would cause an immediate second tag.
                    self.state.reset_positions()
                await self._on_event({
                    "event":      "player_tagged",
                    "player_id":  tagged["player_id"],
                    "dist":       round(dist, 2),
                    "tag_count":  self.state.tag_count,
                    "tags_to_win": TAGS_TO_WIN,
                    "final_tag":  final_tag,
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

        winner = self.state.match_winner or ("unknown" if forced else "tagger")
        reason = self.state.match_end_reason or ("force_end" if forced else "runner_tagged")
        await self._finish_match(winner, reason)

    async def _finish_match(self, winner: str, reason: str):
        if not self.state.match_started or self.state.match_ended:
            return

        self.state.match_ended  = True
        self.state.match_end_at = time.monotonic() + MATCH_END_HOLD_S
        self.state.match_winner = winner
        self.state.match_end_reason = reason

        for p in self.state.players.values():
            p["flags"] |= FLAG_MATCH_END

        bits_total = len(self.state.bits)
        bits_collected = sum(1 for bit in self.state.bits if not bit[2])
        print(
            f"[T2] match ended — {reason} (winner={winner}, clearing players in {MATCH_END_HOLD_S}s)"
        )
        await self._on_event({
            "event": "match_end",
            "winner": winner,
            "reason": reason,
            "tag_count": self.state.tag_count,
            "game_mode": self.state.game_mode,
            "bits_total": bits_total,
            "bits_collected": bits_collected,
            "bits_mask": self.state.bits_mask,
        })
