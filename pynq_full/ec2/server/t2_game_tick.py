# t2_game_tick.py — T2 GameTick: authoritative game loop at 20 Hz.
#
# Queues:
#   in:  packet_queue    {"data": bytes, "addr": (ip, port)}
#   out: broadcast_queue {"data": bytes, "targets": [(ip,port),...]}
#   out: write_queue     {"op": "hset"|"lpush"|"del", "key": str, ...}
#
# Thin orchestrator — all logic lives in:
#   t2_constants          — tunable constants
#   t2_map_loader         — map file parsing and hot-swap dict
#   game_logic.match_state — mutable match fields + reset helpers
#   t2_packet_handler     — UDP ingestion, player registration, eviction
#   game_logic.core_logic  — per-tick tag/match-end rules
#   t2_redis_io           — broadcast packet builder, Redis write helpers

import asyncio
import json
import os
import time

import redis as redislib

from t2_constants import CONTROL_CHANNEL
from t2_map_loader import load_map, DEFAULT_MAP_PATH
from game_logic.match_state import MatchState
from t2_packet_handler import PacketHandler
from game_logic.core_logic import CoreLogic
from t2_redis_io import RedisIO


class GameTick:
    def __init__(self, packet_queue, broadcast_queue, write_queue, tick_rate=20,
                 udp_transport=None):
        self.packet_queue    = packet_queue
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue
        self.interval        = 1.0 / tick_rate
        self.tick_count      = 0

        self.map_state = load_map(DEFAULT_MAP_PATH)  # mutable dict; hot-swappable via set_map
        self.state     = MatchState()                 # all mutable match fields

        # Sub-modules share state by reference; callbacks keep them decoupled
        self.redis_io = RedisIO(self.state, self.map_state, broadcast_queue, write_queue)
        self.logic    = CoreLogic(self.state, write_queue,
                                  on_event=self._push_event,
                                  on_force_end_consumed=lambda: None)
        self.packets  = PacketHandler(self.state, packet_queue, write_queue,
                                      udp_transport=udp_transport,
                                      map_state=self.map_state,
                                      on_match_start=self._on_match_start,
                                      on_match_abort=self._on_match_abort,
                                      on_event=self._push_event)

    # ── Main loop ─────────────────────────────────────────────────────────────

    async def run(self):
        print(f"[T2 GameTick] running at {1/self.interval:.0f} Hz")
        asyncio.ensure_future(self._listen_control())
        while True:
            tick_start = time.monotonic()

            await self.packets.drain()
            await self.packets.evict_timed_out_nodes()
            await self.logic.tick()
            await self.redis_io.push_broadcast(self.tick_count)
            self.redis_io.push_redis_writes(self.tick_count, self.state.match_tick)

            elapsed   = time.monotonic() - tick_start
            sleep_for = max(0.0, self.interval - elapsed)
            if self.tick_count % 60 == 0:
                self._print_metrics(elapsed)
            self.tick_count += 1
            await asyncio.sleep(sleep_for)

    # ── Redis control channel ─────────────────────────────────────────────────
    # Runs redis-py's blocking pubsub in a thread; handles force_end and set_map

    async def _listen_control(self):
        maps_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'maps')

        def _blocking_subscribe():
            rc  = redislib.Redis(host="127.0.0.1", port=6379, decode_responses=True)
            pub = rc.pubsub()
            pub.subscribe(CONTROL_CHANNEL)
            for msg in pub.listen():
                if msg["type"] != "message":
                    continue
                try:
                    data = json.loads(msg["data"])
                except Exception:
                    continue
                cmd = data.get("cmd")
                if cmd == "force_end":
                    self.logic._force_end_flag = True
                elif cmd == "set_ghost_count":
                    count = int(data.get("count", 0))
                    self.packets.set_ghost_count(count)
                elif cmd == "set_map":
                    name    = data.get("map", "level1")
                    new_map = load_map(os.path.join(maps_dir, f"{name}.txt"))
                    if new_map["width"] > 0:
                        self.map_state.update(new_map)
                        print(f"[T2] map swapped to '{name}' — takes effect on next registration")

        try:
            await asyncio.to_thread(_blocking_subscribe)
        except Exception as e:
            print(f"[T2] control listener error: {e}")

    # ── Match event callbacks ─────────────────────────────────────────────────

    def _on_match_start(self):
        bits = [[round(b[0], 2), round(b[1], 2)] for b in self.state.bits]
        human_players = sum(1 for addr in self.state.players if not str(addr).startswith("ghost:"))
        ghost_count = sum(1 for addr in self.state.players if str(addr).startswith("ghost:"))
        asyncio.ensure_future(self._push_event({
            "event": "match_start",
            "players": len(self.state.players),
            "human_players": human_players,
            "ghost_count": ghost_count,
            "game_mode": self.state.game_mode,
            "bits": bits,
            "map": self.map_state.get("name"),
        }))

    def _on_match_abort(self, event=None):
        payload = {"event": "match_aborted"}
        if event:
            payload.update(event)
        asyncio.ensure_future(self._push_event(payload))

    async def _push_event(self, event: dict):
        self.redis_io.push_event(event)

    # ── Metrics ───────────────────────────────────────────────────────────────

    def _print_metrics(self, elapsed_s: float):
        print(
            f"[T2] tick={self.tick_count:5d} | players={len(self.state.players)} | "
            f"tick={elapsed_s*1000:.2f}ms | pkt_q={self.packet_queue.qsize():3d} | "
            f"bcast_q={self.broadcast_queue.qsize():3d} | write_q={self.write_queue.qsize():3d}"
        )
