# t2_game_tick.py — T2 GameTick: authoritative game loop at 20 Hz.
#
# Queues:
#   in:  packet_queue    {"data": bytes, "addr": (ip, port)}
#   out: broadcast_queue {"data": bytes, "targets": [(ip,port),...]}
#   out: write_queue     {"op": "hset"|"lpush"|"del", "key": str, ...}
#
# This module is a thin orchestrator — game logic lives in:
#   t2_constants           — tunable constants
#   game_logic.match_state  — all mutable match fields + reset helpers
#   t2_packet_handler      — inbound UDP processing, player registration, eviction
#   game_logic.core_logic   — per-tick tag/match-end rules
#   t2_redis_io            — broadcast packet builder, Redis write helpers

import asyncio
import json
import time
import threading

import redis as redislib

from t2_constants import ORBIT_RADIUS, CONTROL_CHANNEL
from game_logic.match_state import MatchState
from t2_packet_handler import PacketHandler
from game_logic.core_logic import CoreLogic
from t2_redis_io import RedisIO


class GameTick:
    def __init__(self, packet_queue, broadcast_queue, write_queue, tick_rate=20):
        self.packet_queue    = packet_queue
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue
        self.interval        = 1.0 / tick_rate
        self.tick_count      = 0

        # Shared match state — passed by reference into every sub-module
        self.state = MatchState()

        # Sub-modules wired up with callbacks so they stay decoupled
        self.redis_io = RedisIO(self.state, broadcast_queue, write_queue)
        self.logic    = CoreLogic(
            self.state, write_queue,
            on_event=self._push_event,
            on_force_end_consumed=lambda: None,
        )
        self.packets  = PacketHandler(
            self.state, packet_queue, write_queue,
            on_match_start=self._on_match_start,
            on_match_abort=self._on_match_abort,
            on_event=self._push_event,
        )

    # ── Main loop ─────────────────────────────────────────────────────────────

    async def run(self):
        print(f"[T2 GameTick] running at {1/self.interval:.0f} Hz")
        self._start_control_subscriber()
        while True:
            tick_start = time.monotonic()

            await self.packets.drain(ORBIT_RADIUS)
            await self.packets.evict_timed_out_nodes()
            await self.logic.tick()
            await self.redis_io.push_broadcast(self.tick_count)
            self.redis_io.push_redis_writes(self.tick_count, self.state.match_tick)

            elapsed   = time.monotonic() - tick_start
            sleep_for = max(0.0, self.interval - elapsed)
            if self.tick_count % 20 == 0:
                self._print_metrics(elapsed)
            self.tick_count += 1
            await asyncio.sleep(sleep_for)

    # ── Redis control channel ─────────────────────────────────────────────────

    def _start_control_subscriber(self):
        # Background thread: subscribe to game:control for force_end commands
        def _subscribe():
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
                if data.get("cmd") == "force_end":
                    self.logic._force_end_flag = True
        threading.Thread(target=_subscribe, daemon=True).start()

    # ── Match event callbacks ─────────────────────────────────────────────────

    def _on_match_start(self):
        asyncio.ensure_future(self._push_event(
            {"event": "match_start", "players": 2}
        ))

    def _on_match_abort(self):
        asyncio.ensure_future(self._push_event({"event": "match_aborted"}))

    async def _push_event(self, event: dict):
        self.redis_io.push_event(event)

    # ── Metrics ───────────────────────────────────────────────────────────────

    def _print_metrics(self, elapsed_s: float):
        print(
            f"[T2] tick={self.tick_count:5d} | "
            f"players={len(self.state.players)} | "
            f"tick={elapsed_s*1000:.2f}ms | "
            f"pkt_q={self.packet_queue.qsize():3d} | "
            f"bcast_q={self.broadcast_queue.qsize():3d} | "
            f"write_q={self.write_queue.qsize():3d}"
        )
