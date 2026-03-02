# ec2/server/t2_game_tick.py
#
# T2 : GameTick
#
# The authoritative game loop. Runs at a fixed tick rate (20 Hz = every 50ms).
# Each tick:
#   1. Drain all packets from packet_queue
#   2. Deserialise and update player state (handles REGISTER + STATE_UPDATE)
#   3. Run game logic: proximity / tag detection
#   4. Push merged state to broadcast_queue  (→ T3)
#   5. Push player state to write_queue      (→ T4 Redis HSET)
#   6. Push match events to write_queue      (→ T4 Redis LPUSH)
#
# Metrics printed every 20 ticks (1 second):
#   tick | players | tick_ms | pkt_q | bcast_q | write_q
#
# Queue input:  {"data": bytes, "addr": (ip, port)}

# Queue output: {"op": "hset",  "key": str, "mapping": dict}  → write_queue
#               {"op": "lpush", "key": str, "value":   str}   → write_queue
#               {"data": bytes, "targets": [(ip, port), ...]} → broadcast_queue

import asyncio
import time
import math
import json
import sys
import os
import struct

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'interfacing_+_sim'))
from protocol import (
    NODE_SIZE,
    PKT_REGISTER,
    FLAG_TAGGED,
    FLAG_MATCH_END,
)

TAG_RADIUS       = 20.0  # units
MATCH_PLAYERS    = 2
MAX_PLAYERS      = 2
TAGS_TO_WIN      = 2     # two tags end the match
TAG_FLASH_S      = 0.3   # keep FLAG_TAGGED visible for 0.3s (enough for nodes to see it)
MATCH_END_HOLD_S = 0.5   # broadcast FLAG_TAGGED for 0.5s on final tag
LOCKOUT_S        = 0.5   # reject re-registration for 0.5s after match ends
# Grace period after each tag reset — players are teleported to spawn so need
# a moment before proximity detection resumes.
GRACE_TICKS      = 10    # 0.5s at 20 Hz
# Roles: player 1 = RUNNER (speed 0.05 rad/tick), player 2 = TAGGER (speed 0.11 rad/tick)
# Spawn positions mirror node_simulator.py: angle = player_id-1 * π/2, radius = 50
ORBIT_RADIUS     = 50.0
SPAWN_ANGLES     = [0.0, math.pi / 2]   # player_id 1 → angle 0, player_id 2 → angle π/2
REPLAY_KEY       = "game:seda-replay"

class GameTick:
    def __init__(self, packet_queue, broadcast_queue, write_queue, tick_rate=20):
        self.packet_queue    = packet_queue
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue
        self.interval        = 1.0 / tick_rate

        self.players       = {}
        self.next_id       = 1
        self.match_started = False
        self.match_ended   = False
        self.match_end_at  = None
        self.lockout_until = None
        self.tag_count     = 0
        self.tag_flash_at  = None
        self.tick_count    = 0
        self.match_tick    = 0      # ticks since match started (for grace period)

    async def run(self):
        print(f"[T2 GameTick] running at {1/self.interval:.0f} Hz")
        while True:
            tick_start = time.monotonic()

            await self._drain_packets()
            await self._tick()
            await self._push_broadcast()
            await self._push_redis_writes()

            elapsed   = time.monotonic() - tick_start
            sleep_for = max(0.0, self.interval - elapsed)

            if self.tick_count % 20 == 0:
                self._print_metrics(elapsed)

            self.tick_count += 1
            await asyncio.sleep(sleep_for)

    # ── Metrics ───────────────────────────────────────────────────────────────

    def _print_metrics(self, elapsed_s: float):
        print(
            f"[T2] tick={self.tick_count:5d} | "
            f"players={len(self.players)} | "
            f"tick={elapsed_s*1000:.2f}ms | "
            f"pkt_q={self.packet_queue.qsize():3d} | "
            f"bcast_q={self.broadcast_queue.qsize():3d} | "
            f"write_q={self.write_queue.qsize():3d}"
        )

    # ── Packet drain ──────────────────────────────────────────────────────────

    async def _drain_packets(self):
        while True:
            try:
                raw = self.packet_queue.get_nowait()
            except asyncio.QueueEmpty:
                break
            self._process_packet(raw)

    def _process_packet(self, raw: dict):
        data = raw["data"]
        addr = raw["addr"]

        if len(data) < NODE_SIZE:
            return

        pkt_type, seq, timestamp, x, y, angle, flags = struct.unpack_from('<HHIfffB', data)

        # Register new players (on REGISTER packet or first STATE_UPDATE)
        if addr not in self.players:
            self._register_player(addr)

        if addr not in self.players:
            return  # registration was rejected (lockout or full) — drop packet

        p = self.players[addr]

        if pkt_type == PKT_REGISTER:
            # Accept starting position from REGISTER so player doesn't sit at (0,0)
            # until the first STATE_UPDATE arrives.
            p["x"], p["y"], p["angle"] = x, y, angle
            return
        p["x"]     = x
        p["y"]     = y
        p["angle"] = angle
        # Client cannot set server-owned flag bits
        SERVER_FLAGS = FLAG_TAGGED | FLAG_MATCH_END
        p["flags"] = (p["flags"] & SERVER_FLAGS) | (flags & ~SERVER_FLAGS)

    def _register_player(self, addr):
        if self.lockout_until and time.monotonic() < self.lockout_until:
            return  # silently drop — sims are still winding down after match end
        if len(self.players) >= MAX_PLAYERS:
            print(f"[T2] rejected connection from {addr} — already at {MAX_PLAYERS} players")
            return
        self.lockout_until = None  # first registration after lockout clears it
        player_id = self.next_id
        self.next_id += 1
        self.players[addr] = {
            "player_id": player_id,
            "x": 0.0, "y": 0.0, "angle": 0.0, "flags": 0,
        }
        print(f"[T2] registered player {player_id} from {addr} "
              f"(total: {len(self.players)})")

        if len(self.players) == MATCH_PLAYERS and not self.match_started:
            self.match_started = True
            self.match_tick    = 0
            asyncio.ensure_future(self._push_event(
                {"event": "match_start", "players": MATCH_PLAYERS}
            ))

    # ── Game logic ────────────────────────────────────────────────────────────
    #
    # _tick() dispatches to separate game-mode methods.
    # Each method is responsible for one mechanic and can be added/removed
    # independently as the game evolves.
    #
    # Current mechanics:
    #   _check_proximity() : tag game — players within TAG_RADIUS get tagged
    #
    # Future mechanics (TODO):
    #   _check_shooting()  : line-of-sight hit detection using C++ is_visible()
    #   _check_match_end() : win condition (all tagged, time limit, score, etc.)

    async def _tick(self):
        await self._check_match_end_hold()
        await self._check_proximity()
        await self._check_match_end()
        self._clear_tag_flash()
        if self.match_started and not self.match_ended:
            self.match_tick += 1
        # await self._check_shooting()   # TODO: wire to C++ is_visible()

    def _reset_positions(self):
        """Teleport all players back to spawn and restart grace period."""
        for p in self.players.values():
            idx   = p["player_id"] - 1          # player_id 1→0, 2→1
            angle = SPAWN_ANGLES[idx] if idx < len(SPAWN_ANGLES) else 0.0
            p["x"]     = ORBIT_RADIUS * math.cos(angle)
            p["y"]     = ORBIT_RADIUS * math.sin(angle)
            p["angle"] = angle
        self.match_tick = 0   # restart grace period so proximity check pauses
        print(f"[T2] positions reset to spawn, grace period restarted")

    def _clear_tag_flash(self):
        """Clear FLAG_TAGGED after TAG_FLASH_S so the runner can be tagged again."""
        if self.tag_flash_at is None or self.match_ended:
            return
        if time.monotonic() >= self.tag_flash_at:
            for p in self.players.values():
                if p["flags"] & FLAG_TAGGED:
                    p["flags"] &= ~FLAG_TAGGED
                    print(f"[T2] P{p['player_id']} tag flash cleared "
                          f"({self.tag_count}/{TAGS_TO_WIN} tags)")
            self.tag_flash_at = None

    async def _check_match_end_hold(self):
        """After final tag: keep broadcasting FLAG_TAGGED for MATCH_END_HOLD_S
        so nodes are guaranteed to see it, then clear players and go idle."""
        if self.match_end_at is None:
            return
        if time.monotonic() >= self.match_end_at:
            print(f"[T2] match end hold expired — clearing players, lockout {LOCKOUT_S}s")
            # Delete stale player HSET keys from Redis so monitor goes idle cleanly
            for p in self.players.values():
                self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})
            self.players       = {}
            self.next_id       = 1
            self.tag_count     = 0
            self.tag_flash_at  = None
            self.match_end_at  = None
            self.match_started = False
            self.match_ended   = False
            self.lockout_until = time.monotonic() + LOCKOUT_S

    async def _check_proximity(self):
        """Pairwise tag check. Skipped during grace period so nodes can
        reach their orbits before proximity detection starts."""
        players = list(self.players.values())
        if len(players) < 2:
            return
        if self.match_tick < GRACE_TICKS:
            return

        for i in range(len(players)):
            for j in range(i + 1, len(players)):
                p1, p2 = players[i], players[j]

                # Generic: compute straight-line distance between this pair
                dist = math.sqrt((p1["x"] - p2["x"])**2 + (p1["y"] - p2["y"])**2)

                # Tag game rule: when a player enters another's hitbox (dist < TAG_RADIUS),
                # the runner (lower player_id = slower orbit) gets tagged by the tagger
                # (higher player_id = faster orbit, speed 0.08 vs 0.05).
                if dist < TAG_RADIUS:
                    tagged = p1 if p1["player_id"] < p2["player_id"] else p2
                    # Only register a new tag if flash has cleared (no double-counting)
                    if not (tagged["flags"] & FLAG_TAGGED) and self.tag_flash_at is None:
                        tagged["flags"] |= FLAG_TAGGED
                        self.tag_count   += 1
                        self.tag_flash_at = time.monotonic() + TAG_FLASH_S
                        print(f"[T2] P{tagged['player_id']} tagged (dist={dist:.2f}) "
                              f"— tag {self.tag_count}/{TAGS_TO_WIN}")
                        # Reset all players to spawn so they aren't still in contact
                        # after the flash clears — prevents instant double-tag.
                        self._reset_positions()
                        await self._push_event({
                            "event":     "player_tagged",
                            "player_id": tagged["player_id"],
                            "dist":      round(dist, 2),
                            "tag_count": self.tag_count,
                            "tags_to_win": TAGS_TO_WIN,
                        })

    async def _check_match_end(self):
        """Match ends when runner has been tagged TAGS_TO_WIN times.
        Fires match_end event and schedules player clear after MATCH_END_HOLD_S,
        giving nodes time to receive the final FLAG_TAGGED broadcast before going idle.
        """
        if not self.match_started or self.match_ended:
            return
        if self.tag_count >= TAGS_TO_WIN:
            self.match_ended  = True
            self.match_end_at = time.monotonic() + MATCH_END_HOLD_S
            # Set FLAG_MATCH_END on all players so nodes know this is the final tag
            for p in self.players.values():
                p["flags"] |= FLAG_MATCH_END
            print(f"[T2] match ended — runner tagged {self.tag_count}x "
                  f"(clearing players in {MATCH_END_HOLD_S}s)")
            await self._push_event({
                "event": "match_end", "winner": "tagger",
                "tag_count": self.tag_count,
            })

    # ── Broadcast ─────────────────────────────────────────────────────────────

    async def _push_broadcast(self):
        if not self.players:
            return

        header  = struct.pack('<HHI', 0x0002, self.tick_count & 0xFFFF,
                              int(time.time() * 1000) & 0xFFFFFFFF)
        entries = b""
        for p in self.players.values():
            entries += struct.pack('<BfffB',
                                   p["player_id"], p["x"], p["y"],
                                   p["angle"], p["flags"])

        await self.broadcast_queue.put({
            "data":    header + entries,
            "targets": list(self.players.keys()),
        })

    # ── Redis writes ──────────────────────────────────────────────────────────
    #
    # All writes go onto write_queue → T4 handles them async, never blocking T2.
    #
    # HSET  player:<id>  {x,y,angle,flags}  — every tick, overwrites previous
    # LPUSH game:seda-events  <json>         — only on events (match_start etc.)
    # BRPOP game:seda-events                 — sidecar blocks here, wakes on LPUSH
    #                                           - sidecar writes event to DynamoDB

    async def _push_redis_writes(self):
        for p in self.players.values():
            self.write_queue.put({          # SimpleQueue.put() — no await
                "op": "hset", "key": f"player:{p['player_id']}",
                "mapping": {"x": round(p["x"], 4), "y": round(p["y"], 4),
                            "angle": round(p["angle"], 4), "flags": p["flags"]},
            })
        if self.match_started and self.players:
            self.write_queue.put({
                "op": "lpush",
                "key": REPLAY_KEY,
                "value": json.dumps(self._build_state_snapshot()),
            })

    def _build_state_snapshot(self):
        players = []
        for p in sorted(self.players.values(), key=lambda item: item["player_id"]):
            players.append({
                "player_id": p["player_id"],
                "x": round(p["x"], 4),
                "y": round(p["y"], 4),
                "angle": round(p["angle"], 4),
                "flags": p["flags"],
            })
        return {
            "event": "state_snapshot",
            "server_tick": self.tick_count,
            "match_tick": self.match_tick,
            "match_ended": self.match_ended,
            "players": players,
        }

    async def _push_event(self, event: dict):
        self.write_queue.put({              # SimpleQueue.put() — no await
            "op": "lpush", "key": "game:seda-events", "value": json.dumps(event),
        })
