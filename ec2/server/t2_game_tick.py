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

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'interfacing_+_sim'))
from protocol import (
    NODE_SIZE,
    PKT_REGISTER,
    FLAG_TAGGED,
)
import struct

TAG_RADIUS    = 20.0  # units: players closer than this get tagged (orbit radius=50, so ~40° arc)
MATCH_PLAYERS = 2     # number of players that triggers match_start
MAX_PLAYERS   = 2     # reject registrations beyond this limit
# Roles: player 1 = RUNNER (speed 0.05 rad/tick), player 2 = TAGGER (speed 0.08 rad/tick)
# Tag fires when tagger enters runner's hitbox (dist < TAG_RADIUS). Runner (lower ID) is tagged.
TAG_CLEAR_S   = 1.5   # seconds before FLAG_TAGGED is cleared (visual flash)

class GameTick:
    def __init__(self, packet_queue, broadcast_queue, write_queue, tick_rate=20):
        self.packet_queue    = packet_queue
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue
        self.interval        = 1.0 / tick_rate

        self.players       = {}     # addr → {player_id, x, y, angle, flags}
        self.next_id       = 1      # player IDs start at 1
        self.match_started = False
        self.match_ended   = False
        self.tick_count    = 0
        self.tag_clear_at  = {}     # player_id → monotonic time when FLAG_TAGGED clears

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

        if pkt_type == PKT_REGISTER:
            return  # position not included in REGISTER packets

        p = self.players[addr]
        p["x"]     = x
        p["y"]     = y
        p["angle"] = angle
        # Client cannot set FLAG_TAGGED — server owns that bit
        p["flags"] = (p["flags"] & FLAG_TAGGED) | (flags & ~FLAG_TAGGED)

    def _register_player(self, addr):
        if len(self.players) >= MAX_PLAYERS:
            print(f"[T2] rejected connection from {addr} — already at {MAX_PLAYERS} players")
            return
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
        self._clear_expired_tags()
        await self._check_proximity()
        await self._check_match_end()
        # await self._check_shooting()   # TODO: wire to C++ is_visible()

    def _clear_expired_tags(self):
        now = time.monotonic()
        for p in self.players.values():
            pid = p["player_id"]
            if (p["flags"] & FLAG_TAGGED) and pid in self.tag_clear_at:
                if now >= self.tag_clear_at[pid]:
                    p["flags"] &= ~FLAG_TAGGED
                    del self.tag_clear_at[pid]
                    print(f"[T2] player {pid} tag cleared")

    async def _check_proximity(self):
        """Generic pairwise distance check across all players.
        Game-mode rule applied here: tag game (player within TAG_RADIUS gets tagged).
        Swap out the rule block below for a different game mode without touching
        the distance loop.
        """
        players = list(self.players.values())
        if len(players) < 2:
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
                    if not (tagged["flags"] & FLAG_TAGGED):
                        tagged["flags"] |= FLAG_TAGGED
                        self.tag_clear_at[tagged["player_id"]] = (
                            time.monotonic() + TAG_CLEAR_S
                        )
                        print(f"[T2] player {tagged['player_id']} tagged "
                              f"(dist={dist:.2f}) — clears in {TAG_CLEAR_S}s")
                        await self._push_event({
                            "event":     "player_tagged",
                            "player_id": tagged["player_id"],
                            "dist":      round(dist, 2),
                        })

    async def _check_match_end(self):
        """Match ends the moment the runner (lowest player_id) gets tagged.
        Fires match_end event, then resets match state so a new game can start
        once the tag flash expires.
        """
        if not self.match_started or self.match_ended:
            return
        runner = min(self.players.values(), key=lambda p: p["player_id"], default=None)
        if runner and (runner["flags"] & FLAG_TAGGED):
            self.match_ended = True
            print(f"[T2] match ended — runner P{runner['player_id']} tagged")
            await self._push_event({"event": "match_end", "winner": "tagger"})
            # Reset so next connect pair starts a fresh match
            self.match_started = False
            self.match_ended   = False

    # ── Broadcast ─────────────────────────────────────────────────────────────

    async def _push_broadcast(self):
        if not self.players:
            return

        header  = struct.pack('<HHI', 0x0002, self.tick_count & 0xFFFF,
                              int(time.time() * 1000) & 0xFFFFFFFF)
        entries = b""
        for p in self.players.values():
            entries += struct.pack('<BfffBx',
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

    async def _push_event(self, event: dict):
        self.write_queue.put({              # SimpleQueue.put() — no await
            "op": "lpush", "key": "game:seda-events", "value": json.dumps(event),
        })
