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
from protocol import pack_game_state_packet
from replay_store import ReplayNotFoundError, load_replay_payload

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
        self._replay_cache   = {}
        self._board_replays  = {}
        self._board_replay_tasks = {}

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
            self._advance_board_replays()
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
            self._stop_all_board_replays("live_match_start", restore_board=True)
            if self._selected_map.get("name") == _LOBBY_MAP_NAME:
                print("[T2] start_match blocked: select a game map before starting")
                return
            started, message = self.packets.start_match_from_lobby()
            print(f"[T2] start_match: {message}")
        elif cmd == "restart":
            self._stop_all_board_replays("restart", restore_board=True)
            self._reset_session("restart", arm_lockout=False)
        elif cmd == "set_ghost_count":
            count = int(data.get("count", 0))
            self.packets.set_ghost_count(count)
        elif cmd == "set_ghost_profile":
            slot = int(data.get("slot", 0) or 0)
            updated, message = self.packets.set_ghost_profile(
                slot,
                speed=data.get("speed"),
                tag_radius=data.get("tag_radius"),
            )
            print(f"[T2] set_ghost_profile: {message}")
        elif cmd == "set_node_mode":
            board_slot = int(data.get("board_slot", 0) or 0)
            mode = str(data.get("mode", "manual"))
            if board_slot in (1, 2):
                if str(mode).lower() != "replay":
                    self._stop_board_replay(board_slot, "node_mode_override", restore_board=False)
                started, message = self.packets.set_node_mode(board_slot, mode)
                print(f"[T2] set_node_mode: {message}")
        elif cmd == "start_board_replay":
            board_slot = int(data.get("board_slot", 0) or 0)
            match_id = str(data.get("match_id", "") or "").strip()
            started, message = self._request_board_replay(board_slot, match_id)
            print(f"[T2] start_board_replay: {message}")
        elif cmd == "stop_board_replay":
            board_slot = int(data.get("board_slot", 0) or 0)
            stopped, message = self._stop_board_replay(board_slot, "monitor_stop", restore_board=True)
            print(f"[T2] stop_board_replay: {message}")
        elif cmd == "kick_board":
            board_slot = int(data.get("board_slot", 0) or 0)
            self._stop_board_replay(board_slot, "board_kicked", restore_board=False)
            kicked, message = self._kick_board_slot(board_slot)
            print(f"[T2] kick_board: {message}")
        elif cmd == "set_map":
            if self.state.match_started and not self.state.match_ended:
                print("[T2] set_map ignored — map cannot be changed during a live match")
                return
            name = data.get("map", "chase")
            new_map = load_map(os.path.join(_MAPS_DIR, f"{name}.txt"))
            if new_map["width"] > 0:
                self._stop_all_board_replays("map_changed", restore_board=True)
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

    def _set_board_replay_summary(
        self,
        board_slot: int,
        *,
        match_id: str,
        status: str,
        frame_index: int = 0,
        frame_count: int = 0,
        view_player_id: int | None = None,
        message: str = "",
    ):
        slot = int(board_slot)
        self.state.board_replays[slot] = {
            "board_slot": slot,
            "match_id": str(match_id or ""),
            "status": str(status or "idle"),
            "frame_index": max(0, int(frame_index or 0)),
            "frame_count": max(0, int(frame_count or 0)),
            "view_player_id": int(view_player_id or slot),
            "message": str(message or ""),
        }

    def _clear_board_replay_summary(self, board_slot: int):
        self.state.board_replays.pop(int(board_slot), None)

    def _restore_board_after_replay(self, board_slot: int, restore_mode: str):
        slot = int(board_slot)
        target_mode = str(restore_mode or "manual").lower()
        if target_mode not in {"manual", "auto"}:
            target_mode = "manual"
        self.state.slot_modes[slot] = target_mode

        addr = self.packets._addr_for_board_slot(slot)
        if addr is None:
            return
        player = self.state.players.get(addr)
        if not player or str(addr).startswith("ghost:"):
            return

        player["control_mode"] = target_mode
        self.packets._send_ack(addr, int(player.get("player_id", 0) or 0))
        self.packets._send_map(addr)
        self.packets._send_bits_init(addr)
        self.packets._send_control_mode(addr)

    def _stop_board_replay(self, board_slot: int, reason: str, restore_board: bool):
        slot = int(board_slot or 0)
        if slot not in (1, 2):
            return False, f"invalid board slot {slot}"

        task = self._board_replay_tasks.pop(slot, None)
        if task is not None:
            task.cancel()

        session = self._board_replays.pop(slot, None)
        had_summary = slot in self.state.board_replays
        if session is None and task is None and not had_summary:
            return False, f"board {slot} replay not active"

        restore_mode = "manual"
        match_id = ""
        if session is not None:
            restore_mode = str(session.get("restore_mode") or "manual").lower()
            match_id = str(session.get("match_id") or "")
        elif had_summary:
            summary = self.state.board_replays.get(slot, {})
            match_id = str(summary.get("match_id") or "")

        if restore_board:
            self._restore_board_after_replay(slot, restore_mode)
        elif session is not None:
            self.state.slot_modes[slot] = restore_mode
            addr = self.packets._addr_for_board_slot(slot)
            if addr is not None and addr in self.state.players:
                self.state.players[addr]["control_mode"] = restore_mode

        self._clear_board_replay_summary(slot)
        return True, f"board {slot} replay stopped ({reason}){f' for {match_id}' if match_id else ''}"

    def _stop_all_board_replays(self, reason: str, restore_board: bool):
        active_slots = sorted({
            *self._board_replays.keys(),
            *self._board_replay_tasks.keys(),
            *getattr(self.state, "board_replays", {}).keys(),
        })
        for board_slot in active_slots:
            self._stop_board_replay(board_slot, reason, restore_board=restore_board)

    def _request_board_replay(self, board_slot: int, match_id: str):
        slot = int(board_slot or 0)
        if slot not in (1, 2):
            return False, f"invalid board slot {slot}"
        if not match_id:
            return False, "missing match_id for board replay"
        if self.state.match_started and not self.state.match_ended:
            return False, "cannot start board replay during a live match"
        if self.packets._addr_for_board_slot(slot) is None:
            return False, f"board {slot} not connected"

        self._stop_board_replay(slot, "replay_replaced", restore_board=True)
        self._set_board_replay_summary(
            slot,
            match_id=match_id,
            status="loading",
            frame_index=0,
            frame_count=0,
            view_player_id=slot,
        )
        task = asyncio.create_task(self._prepare_board_replay(slot, match_id))
        self._board_replay_tasks[slot] = task

        def _clear_finished_task(done_task, *, board_slot=slot):
            if self._board_replay_tasks.get(board_slot) is done_task:
                self._board_replay_tasks.pop(board_slot, None)

        task.add_done_callback(_clear_finished_task)
        return True, f"board {slot} replay loading {match_id}"

    def _load_board_replay(self, match_id: str):
        return load_replay_payload(match_id, cache=self._replay_cache)

    def _extract_replay_frames(self, payload: dict):
        return [event for event in payload.get("events", []) if event.get("event") == "state_snapshot"]

    def _extract_replay_bits(self, payload: dict):
        for event in payload.get("events", []):
            if event.get("event") == "match_start" and event.get("bits"):
                return [tuple(bit[:2]) for bit in event.get("bits", [])]
        for event in payload.get("events", []):
            if event.get("event") == "state_snapshot" and event.get("bits"):
                return [tuple(bit[:2]) for bit in event.get("bits", [])]
        return []

    def _load_replay_map(self, payload: dict):
        map_name = ""
        for event in payload.get("events", []):
            candidate = str(event.get("map", "") or "").strip()
            if candidate:
                map_name = candidate
                break
        if not map_name:
            raise ValueError("replay is missing a map name")

        replay_map = load_map(os.path.join(_MAPS_DIR, f"{map_name}.txt"))
        if replay_map.get("width", 0) <= 0:
            raise ValueError(f"replay map is unavailable on server: {map_name}")
        return replay_map

    async def _prepare_board_replay(self, board_slot: int, match_id: str):
        try:
            payload = await asyncio.to_thread(self._load_board_replay, match_id)
            frames = self._extract_replay_frames(payload)
            if not frames:
                raise ValueError(f"replay {match_id} has no state frames")

            view_player_id = int(board_slot)
            has_perspective = any(
                int(player.get("player_id", 0) or 0) == view_player_id
                for frame in frames
                for player in frame.get("players", [])
            )
            if not has_perspective:
                raise ValueError(f"replay {match_id} has no player {view_player_id} perspective")

            addr = self.packets._addr_for_board_slot(board_slot)
            if addr is None:
                raise ValueError(f"board {board_slot} disconnected before replay start")
            player = self.state.players.get(addr)
            if not player or str(addr).startswith("ghost:"):
                raise ValueError(f"board {board_slot} is not available for replay")

            replay_map = self._load_replay_map(payload)
            replay_bits = self._extract_replay_bits(payload)
            restore_mode = str(player.get("control_mode") or self.state.slot_modes.get(board_slot, "manual")).lower()
            if restore_mode not in {"manual", "auto"}:
                restore_mode = "manual"

            session = {
                "board_slot": int(board_slot),
                "addr": addr,
                "match_id": match_id,
                "view_player_id": view_player_id,
                "frames": frames,
                "frame_index": 0,
                "frame_count": len(frames),
                "bits": replay_bits,
                "map_state": replay_map,
                "restore_mode": restore_mode,
            }
            self._board_replays[int(board_slot)] = session
            self.state.slot_modes[int(board_slot)] = "replay"
            player["control_mode"] = "replay"

            self.packets._send_ack(addr, view_player_id)
            self.packets._send_map(addr, replay_map)
            self.packets._send_bits_init(addr, replay_bits)
            self.packets._send_control_mode(addr)
            self._set_board_replay_summary(
                board_slot,
                match_id=match_id,
                status="playing",
                frame_index=0,
                frame_count=len(frames),
                view_player_id=view_player_id,
            )
            self._send_board_replay_frame(session)
            print(
                f"[T2] board {board_slot} replay streaming {match_id} "
                f"({len(frames)} frames, player {view_player_id} view)"
            )
        except asyncio.CancelledError:
            raise
        except ReplayNotFoundError as exc:
            self._board_replays.pop(int(board_slot), None)
            self._set_board_replay_summary(
                board_slot,
                match_id=match_id,
                status="error",
                frame_index=0,
                frame_count=0,
                view_player_id=board_slot,
                message=str(exc),
            )
            print(f"[T2] board replay unavailable: {exc}")
        except Exception as exc:
            self._board_replays.pop(int(board_slot), None)
            self._set_board_replay_summary(
                board_slot,
                match_id=match_id,
                status="error",
                frame_index=0,
                frame_count=0,
                view_player_id=board_slot,
                message=str(exc),
            )
            print(f"[T2] board replay start failed: {exc}")

    def _send_board_replay_frame(self, session: dict):
        if self.packets.udp_transport is None:
            raise RuntimeError("UDP transport unavailable for board replay")
        frame_index = int(session.get("frame_index", 0) or 0)
        frames = session.get("frames") or []
        if frame_index >= len(frames):
            return False

        frame = frames[frame_index]
        pkt = pack_game_state_packet(
            self.tick_count,
            frame.get("game_mode", 0),
            frame.get("players", []),
            frame.get("bits_mask", 0xFFFF),
        )
        self.packets.udp_transport.sendto(pkt, session["addr"])
        session["frame_index"] = frame_index + 1
        # Update the Redis-visible summary at ~10 Hz (every 6 frames) to avoid
        # serialising the board_replays dict to Redis 60 times per second.
        if session["frame_index"] % 6 == 0:
            self._set_board_replay_summary(
                int(session["board_slot"]),
                match_id=session.get("match_id", ""),
                status="playing",
                frame_index=session["frame_index"],
                frame_count=int(session.get("frame_count", 0) or 0),
                view_player_id=int(session.get("view_player_id", session["board_slot"])),
            )
        return True

    def _advance_board_replays(self):
        for board_slot in sorted(list(self._board_replays.keys())):
            session = self._board_replays.get(board_slot)
            if session is None:
                continue

            current_addr = self.packets._addr_for_board_slot(board_slot)
            if current_addr is None:
                self._stop_board_replay(board_slot, "board_disconnected", restore_board=False)
                continue
            if current_addr != session.get("addr"):
                self._stop_board_replay(board_slot, "board_reconnected", restore_board=True)
                continue

            if int(session.get("frame_index", 0) or 0) >= int(session.get("frame_count", 0) or 0):
                self._stop_board_replay(board_slot, "replay_complete", restore_board=True)
                continue

            try:
                self._send_board_replay_frame(session)
            except Exception as exc:
                print(f"[T2] board replay stream failed for board {board_slot}: {exc}")
                self._stop_board_replay(board_slot, "stream_failed", restore_board=True)

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
        self.redis_io.push_event({
            "event": "match_start",
            "players": len(self.state.players),
            "human_players": human_players,
            "ghost_count": ghost_count,
            "game_mode": self.state.game_mode,
            "bits": bits,
            "map": self.map_state.get("name"),
            "player_snapshot": player_snapshot,
        })

    def _on_match_abort(self, event=None):
        payload = {"event": "match_aborted"}
        if event:
            payload.update(event)
        self.redis_io.push_event(payload)

    def _on_match_pause(self, event=None):
        payload = {"event": "match_paused"}
        if event:
            payload.update(event)
        self.redis_io.push_event(payload)

    def _on_match_resume(self, event=None):
        payload = {"event": "match_resumed"}
        if event:
            payload.update(event)
        self.redis_io.push_event(payload)

    async def _push_event(self, event: dict):
        self.redis_io.push_event(event)

    # ── Metrics ───────────────────────────────────────────────────────────────

    def _print_metrics(self, elapsed_s: float):
        print(
            f"[T2] tick={self.tick_count:5d} | players={len(self.state.players)} | "
            f"tick={elapsed_s*1000:.2f}ms | pkt_q={self.packet_queue.qsize():3d} | "
            f"bcast_q={self.broadcast_queue.qsize():3d} | write_q={self.write_queue.qsize():3d}"
        )
