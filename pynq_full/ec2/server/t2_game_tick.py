# t2_game_tick.py — T2 GameTick: authoritative game loop at 60 Hz.
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
import copy
import json
import os
import queue
import time
import threading

import redis as redislib

from t2_constants import CONTROL_CHANNEL
from t2_map_loader import load_map
from game_logic.match_state import MatchState
from t2_packet_handler import PacketHandler
from game_logic.core_logic import CoreLogic
from t2_redis_io import RedisIO

_MAPS_DIR = os.path.normpath(
    os.path.join(os.path.dirname(__file__), '..', 'maps')
)
_LOBBY_MAP_NAME = "lobby"

class GameTick:
    def __init__(self, packet_queue, broadcast_queue, write_queue, tick_rate=60,
                 udp_transport=None):
        self.packet_queue    = packet_queue
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue
        self.interval        = 1.0 / tick_rate
        self.tick_count      = 0
        self.control_queue   = queue.SimpleQueue()

        self.map_state = self._build_lobby_map()      # mutable dict; starts on the shared lobby map
        self._selected_map = copy.deepcopy(self.map_state)
        self.state     = MatchState()                 # all mutable match fields
        self.state.selected_map_name = self._selected_map.get("name", "")
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))

        # Sub-modules share state by reference; callbacks keep them decoupled
        self.redis_io = RedisIO(self.state, self.map_state, broadcast_queue, write_queue)
        self.logic    = CoreLogic(self.state, write_queue,
                                  on_event=self._push_event,
                                  on_force_end_consumed=self._return_to_lobby_after_match_end,
                                  map_state=self.map_state)
        self.packets  = PacketHandler(self.state, packet_queue, write_queue,
                                      udp_transport=udp_transport,
                                      map_state=self.map_state,
                                      on_match_start=self._on_match_start,
                                      on_match_abort=self._on_match_abort,
                                      on_match_pause=self._on_match_pause,
                                      on_match_resume=self._on_match_resume,
                                      on_event=self._push_event)

    # ── Main loop ─────────────────────────────────────────────────────────────

    async def run(self):
        print(f"[T2 GameTick] running at {1/self.interval:.0f} Hz")
        self._start_control_subscriber()
        while True:
            tick_start = time.monotonic()

            self._drain_control_commands()
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

    def _start_control_subscriber(self):
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
                self.control_queue.put(data)
        threading.Thread(target=_subscribe, daemon=True).start()

    def _drain_control_commands(self):
        while True:
            try:
                data = self.control_queue.get_nowait()
            except queue.Empty:
                break
            self._apply_control_command(data)

    def _apply_control_command(self, data: dict):
        cmd = data.get("cmd")
        if cmd == "force_end":
            self.logic._force_end_flag = True
        elif cmd == "start_match":
            if self._selected_map.get("name") == _LOBBY_MAP_NAME:
                print("[T2] start_match blocked: select a game map before starting")
                return
            started, message = self.packets.start_match_from_lobby()
            print(f"[T2] start_match: {message}")
        elif cmd == "restart":
            self._reset_session("restart", arm_lockout=False)
        elif cmd == "set_ghost_count":
            count = int(data.get("count", 0))
            self.packets.set_ghost_count(count)
        elif cmd == "set_node_mode":
            board_slot = int(data.get("board_slot", 0) or 0)
            mode = str(data.get("mode", "manual"))
            if board_slot in (1, 2):
                started, message = self.packets.set_node_mode(board_slot, mode)
                print(f"[T2] set_node_mode: {message}")
        elif cmd == "kick_board":
            board_slot = int(data.get("board_slot", 0) or 0)
            kicked, message = self._kick_board_slot(board_slot)
            print(f"[T2] kick_board: {message}")
        elif cmd == "set_map":
            name = data.get("map", "chase")
            new_map = load_map(os.path.join(_MAPS_DIR, f"{name}.txt"))
            if new_map["width"] > 0:
                self._selected_map = copy.deepcopy(new_map)
                self.state.selected_map_name = self._selected_map.get("name", "")
                self._swap_map(new_map)

    def _kick_board_slot(self, board_slot: int):
        if board_slot not in (1, 2):
            return False, f"invalid board slot {board_slot}"

        match_was_live = self.state.match_started and not self.state.match_ended
        kicked, message = self.packets.evict_board_slot(board_slot)
        if not kicked:
            return False, message

        if match_was_live:
            self._return_players_to_lobby("player_kicked")
            return True, f"{message}; remaining players returned to lobby"
        return True, message

    def _swap_map(self, new_map: dict):
        self._return_players_to_lobby("map_changed", next_map=new_map)

    def _build_lobby_map(self) -> dict:
        return load_map(os.path.join(_MAPS_DIR, f"{_LOBBY_MAP_NAME}.txt"))

    def _drain_asyncio_queue(self, q: asyncio.Queue) -> int:
        drained = 0
        while True:
            try:
                q.get_nowait()
                drained += 1
            except asyncio.QueueEmpty:
                return drained

    def _reset_session(self, reason: str, next_map: dict | None = None, arm_lockout: bool = False):
        current_players = list(self.state.players.values())
        had_players = bool(current_players)
        was_active = self.state.match_started and not self.state.match_ended
        if was_active:
            event = {
                "event": "match_aborted",
                "reason": reason,
                "game_mode": self.state.game_mode,
                "bits_mask": self.state.bits_mask,
                "map": self.map_state.get("name"),
            }
            if next_map is not None:
                event["next_map"] = next_map.get("name")
            self.redis_io.push_event(event)

        target_map_name = self.map_state.get("name")
        if next_map is not None:
            self.map_state.clear()
            self.map_state.update(next_map)
            target_map_name = next_map.get("name")
        dropped_packets = self._drain_asyncio_queue(self.packet_queue)
        dropped_broadcasts = self._drain_asyncio_queue(self.broadcast_queue)
        for player in current_players:
            self.write_queue.put({"op": "del", "key": f"player:{player['player_id']}"})
        self.state.clear_match(arm_lockout=arm_lockout)
        self.state.selected_map_name = self._selected_map.get("name", "")
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))
        self.logic._force_end_flag = False

        action = "map swapped" if next_map is not None else "match reset"
        print(
            f"[T2] {action} ({reason}) — map='{target_map_name}' "
            f"players_cleared={len(current_players)} "
            f"packet_backlog={dropped_packets} broadcast_backlog={dropped_broadcasts}"
        )
        if not had_players and next_map is None:
            print("[T2] restart requested with no active or queued players")

    def _return_players_to_lobby(self, reason: str, next_map: dict | None = None):
        current_players = list(self.state.players.values())
        had_players = bool(current_players)
        was_active = self.state.match_started and not self.state.match_ended
        if was_active:
            event = {
                "event": "match_aborted",
                "reason": reason,
                "game_mode": self.state.game_mode,
                "bits_mask": self.state.bits_mask,
                "map": self.map_state.get("name"),
            }
            if next_map is not None:
                event["next_map"] = next_map.get("name")
            self.redis_io.push_event(event)

        if next_map is not None:
            self.map_state.clear()
            self.map_state.update(next_map)

        dropped_packets = self._drain_asyncio_queue(self.packet_queue)
        dropped_broadcasts = self._drain_asyncio_queue(self.broadcast_queue)
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))
        self.packets.return_players_to_lobby()
        self.logic._force_end_flag = False

        print(
            f"[T2] returned to lobby ({reason}) — map='{self.map_state.get('name')}' "
            f"humans={sum(1 for addr in self.state.players if not str(addr).startswith('ghost:'))} "
            f"ghosts={sum(1 for addr in self.state.players if str(addr).startswith('ghost:'))} "
            f"packet_backlog={dropped_packets} broadcast_backlog={dropped_broadcasts}"
        )
        if not had_players:
            print("[T2] lobby return requested with no active or queued players")

    def _return_to_lobby_after_match_end(self):
        self._return_players_to_lobby("match_end_hold_expired")

    # ── Match event callbacks ─────────────────────────────────────────────────

    def _on_match_start(self):
        bits = [[round(b[0], 2), round(b[1], 2)] for b in self.state.bits]
        human_players = sum(1 for addr in self.state.players if not str(addr).startswith("ghost:"))
        ghost_count = sum(1 for addr in self.state.players if str(addr).startswith("ghost:"))
        player_snapshot = [
            {
                "player_id": p["player_id"],
                "x": round(p["x"], 4),
                "y": round(p["y"], 4),
                "angle": round(p["angle"], 4),
                "flags": p["flags"],
                "username": p.get("username", ""),
                "display_name": p.get("display_name", ""),
                "profile_key": p.get("profile_key", ""),
                "controller_key": p.get("controller_key", ""),
                "identity_source": p.get("identity_source", ""),
            }
            for p in sorted(self.state.players.values(), key=lambda player: player["player_id"])
        ]
        asyncio.ensure_future(self._push_event({
            "event": "match_start",
            "players": len(self.state.players),
            "human_players": human_players,
            "ghost_count": ghost_count,
            "game_mode": self.state.game_mode,
            "bits": bits,
            "map": self.map_state.get("name"),
            "player_snapshot": player_snapshot,
        }))

    def _on_match_abort(self, event=None):
        payload = {"event": "match_aborted"}
        if event:
            payload.update(event)
        asyncio.ensure_future(self._push_event(payload))

    def _on_match_pause(self, event=None):
        payload = {"event": "match_paused"}
        if event:
            payload.update(event)
        asyncio.ensure_future(self._push_event(payload))

    def _on_match_resume(self, event=None):
        payload = {"event": "match_resumed"}
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
