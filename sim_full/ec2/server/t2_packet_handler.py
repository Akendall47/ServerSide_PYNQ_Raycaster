# t2_packet_handler.py — Packet ingestion, player registration, and node eviction.
#
# Owns: drain, _process_packet, _register_player, evict_timed_out_nodes
#
# Why a separate module: packet processing is the noisiest part of the codebase
# (validation, flag merging, sequence checks). Keeping it here lets GameTick stay
# a clean orchestrator with no protocol-level logic.

import asyncio
import math
import re
import struct
import time

from protocol import (
    CLIENT_INPUT_FLAGS,
    GAME_MODE_CHASE,
    GAME_MODE_CHASE_BITS,
    HEADER_FMT,
    MOVEMENT_MODE_INTENT_ONLY,
    NODE_SIZE,
    PKT_ACK,
    PKT_REGISTER,
    ROLE_ANY,
    ROLE_RUNNER,
    ROLE_TAGGER,
    SERVER_STATE_FLAGS,
    FLAG_GHOST,
    pack_bits_init_packet,
    pack_map_packet,
    decode_movement_mode,
    unpack_node_packet,
    unpack_register_packet,
)
from game_logic.anticheat import validate_position, validate_seq, DEFAULT_MAX_SPEED_PER_TICK
from game_logic.match_state import MatchState
from player_profiles import build_player_identity
from t2_constants import (
    MATCH_PLAYERS,
    NODE_TIMEOUT_S,
    PAUSE_ABORT_S,
    MAX_GHOSTS,
    PLAYER_COLLISION_RADIUS,
    SPAWN_ANGLES,
)
from t2_map_loader import resolve_walkable_world


# Drains the inbound packet queue and maintains the player registry
class PacketHandler:

    def __init__(self, state: MatchState, packet_queue: asyncio.Queue,
                 write_queue, map_state, on_match_start, on_match_abort, on_match_pause,
                 on_match_resume, on_event,
                 udp_transport=None):
        self.state         = state
        self.packet_queue  = packet_queue
        self.write_queue   = write_queue
        self.map_state     = map_state
        self.udp_transport = udp_transport
        self._on_match_start = on_match_start
        self._on_match_abort = on_match_abort
        self._on_match_pause = on_match_pause
        self._on_match_resume = on_match_resume
        self._on_event       = on_event

    # Derive world-space AABB from the current map dimensions
    def _world_bounds(self):
        width = self.map_state.get("width", 0)
        height = self.map_state.get("height", 0)
        tile_scale = self.map_state.get("tile_scale", 8)
        half_w = (width * tile_scale) / 2.0 if width else 96.0
        half_h = (height * tile_scale) / 2.0 if height else 96.0
        return (-half_w, -half_h, half_w, half_h)

    # ── Main drain loop ───────────────────────────────────────────────────────
    # Pull every queued packet and process it — called once per game tick

    async def drain(self):
        while True:
            try:
                raw = self.packet_queue.get_nowait()
            except asyncio.QueueEmpty:
                break
            self._process_packet(raw)

    # ── Individual packet handling ────────────────────────────────────────────
    # Validate sequence/position, merge flags, update player state

    def _process_packet(self, raw: dict):
        data = raw["data"]
        addr = raw["addr"]

        if len(data) < NODE_SIZE:
            return

        pkt = unpack_node_packet(data)
        if pkt["pkt_type"] == PKT_REGISTER:
            pkt = unpack_register_packet(data)
        pkt_type         = pkt["pkt_type"]
        seq              = pkt["seq"]
        x, y, angle      = pkt["x"], pkt["y"], pkt["angle"]
        raw_flags        = pkt["input_flags"]
        movement_mode    = pkt["movement_mode"]
        protocol_version = pkt["protocol_version"]

        if addr not in self.state.players:
            if pkt_type != PKT_REGISTER:
                return
            self._register_player(
                addr, x, y, angle,
                preferred_role=pkt.get("preferred_role", ROLE_ANY),
                username=pkt.get("username", ""),
            )

        if addr not in self.state.players:
            return

        p = self.state.players[addr]
        was_timed_out = bool(p.get("timed_out"))
        p["last_seen"] = time.monotonic()
        p["timed_out"] = False

        if pkt_type == PKT_REGISTER:
            if pkt.get("username", ""):
                p.update(build_player_identity(pkt["username"], addr))
                p["sim_slot"] = self._sim_slot_for_player(p)
            p["preferred_role"] = pkt.get("preferred_role", ROLE_ANY)
            self.state.pending_roles[addr] = p["preferred_role"]
            if not self.state.match_started or p["player_id"] == 0:
                p["x"], p["y"], p["angle"] = x, y, angle
            p["last_seq"] = seq
            p["movement_mode"] = movement_mode
            p["protocol_version"] = protocol_version
            self._maybe_resume_match()
            print(f"[T2] P{p['player_id']} protocol=v{protocol_version} "
                  f"movement={decode_movement_mode(movement_mode)}")
            return

        if self.state.match_paused and not self.state.match_ended:
            p["last_seq"] = None if was_timed_out else seq
            p["movement_mode"] = movement_mode
            p["protocol_version"] = protocol_version
            self._maybe_resume_match()
            return

        last = p["last_seq"]
        if last is not None and not validate_seq(last, seq):
            last_log = float(p.get("_last_invalid_seq_log_at", 0.0) or 0.0)
            now = time.monotonic()
            if (now - last_log) >= 0.5:
                p["_last_invalid_seq_log_at"] = now
                print(f"[T2] dropped seq for {addr}: prev={last} next={seq}")
            return

        min_x, min_y, max_x, max_y = self._world_bounds()
        next_x, next_y = x, y
        if movement_mode != MOVEMENT_MODE_INTENT_ONLY:
            next_x, next_y = resolve_walkable_world(
                self.map_state, p["x"], p["y"], x, y, PLAYER_COLLISION_RADIUS
            )
        if (
            movement_mode != MOVEMENT_MODE_INTENT_ONLY
            and last is not None
            and not validate_position(
                last, p["x"], p["y"], p["angle"],
                next_x, next_y, angle, seq,
                min_x, min_y, max_x, max_y,
                DEFAULT_MAX_SPEED_PER_TICK,
            )
        ):
            last_log = float(p.get("_last_invalid_pos_log_at", 0.0) or 0.0)
            now = time.monotonic()
            if (now - last_log) >= 0.5:
                p["_last_invalid_pos_log_at"] = now
                print(
                    f"[T2] dropped movement for {addr}: "
                    f"prev=({p['x']:.2f},{p['y']:.2f}) next=({next_x:.2f},{next_y:.2f}) "
                    f"seq={seq} mode={decode_movement_mode(movement_mode)} map={self.map_state.get('name')}"
                )
            return

        p["last_seq"] = seq
        p["movement_mode"] = movement_mode
        p["protocol_version"] = protocol_version

        if movement_mode != MOVEMENT_MODE_INTENT_ONLY:
            p["x"], p["y"], p["angle"] = next_x, next_y, angle

        client_input = raw_flags & CLIENT_INPUT_FLAGS
        p["flags"] = (p["flags"] & SERVER_STATE_FLAGS) | client_input
        self._maybe_resume_match()

    # ── Player registration ───────────────────────────────────────────────────
    # Record preferred role and keep humans in the lobby until the monitor sends Start.
    # Queued humans get ACK(0) so simulator clients can move before the match begins.

    def _register_player(self, addr, x=0.0, y=0.0, angle=0.0,
                         preferred_role=ROLE_ANY, username=""):
        if self.state.is_in_lockout():
            return
        if self.state.match_started:
            print(f"[T2] rejected {addr} — match already started")
            return

        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        if human_count >= MATCH_PLAYERS:
            print(f"[T2] rejected {addr} — already at {MATCH_PLAYERS} human players")
            return

        self.state.clear_lockout()
        self.state.pending_roles[addr] = preferred_role
        identity = build_player_identity(username, addr)
        self.state.players[addr] = {
            "player_id":        0,
            "x": x, "y": y, "angle": angle, "flags": 0,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
            "timed_out":        False,
            "preferred_role":   preferred_role,
            "sim_slot":         self._sim_slot_for_player(identity),
            **identity,
        }

        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        self._refresh_lobby_queue_positions()
        print(f"[T2] player queued from {addr} (lobby humans={human_count}, ghosts={self._ghost_count()})")

    def _human_addrs(self):
        return [addr for addr in self.state.players if not str(addr).startswith("ghost:")]

    def _ghost_count(self):
        return sum(1 for addr in self.state.players if str(addr).startswith("ghost:"))

    def _sim_slot_for_player(self, player: dict):
        for raw in (
            player.get("profile_key", ""),
            player.get("username", ""),
            player.get("display_name", ""),
        ):
            text = str(raw or "").strip().lower()
            if not text:
                continue
            match = re.search(r"(?:^|[^a-z0-9])sim[-_ ]*([1-9][0-9]*)$", text)
            if match:
                return int(match.group(1)) - 1
        return None

    def _find_human_addr_for_slot(self, slot_index: int):
        explicit_matches = []
        inferred_matches = []
        for addr, player in self.state.players.items():
            if str(addr).startswith("ghost:"):
                continue
            if player.get("sim_slot") == slot_index:
                explicit_matches.append(addr)
                continue
            if self._sim_slot_for_player(player) == slot_index:
                inferred_matches.append(addr)
        if len(explicit_matches) == 1:
            return explicit_matches[0]
        if len(inferred_matches) == 1:
            return inferred_matches[0]
        return None

    def _queued_human_addrs(self):
        return [
            addr for addr, _ in sorted(
                (
                    (addr, player) for addr, player in self.state.players.items()
                    if not str(addr).startswith("ghost:") and player.get("player_id", 0) == 0
                ),
                key=lambda item: (
                    item[1].get("sim_slot") if item[1].get("sim_slot") is not None else 999,
                    item[1].get("controller_key", ""),
                    item[1].get("display_name", ""),
                    item[1].get("x", 0.0),
                    item[1].get("y", 0.0),
                ),
            )
        ]

    def _refresh_lobby_queue_positions(self):
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))
        for queue_slot, addr in enumerate(self._queued_human_addrs()):
            player = self.state.players.get(addr)
            if not player:
                continue
            lobby_x, lobby_y, lobby_angle = self._spawn_pose_for_slot(queue_slot)
            player["player_id"] = 0
            player["x"] = lobby_x
            player["y"] = lobby_y
            player["angle"] = lobby_angle
            player["flags"] = 0
            player["last_seq"] = None
            player["timed_out"] = False
            player["preferred_role"] = player.get("preferred_role", ROLE_ANY)
            self.state.pending_roles[addr] = player["preferred_role"]
            self._send_ack(addr, 0)

    def _spawn_pose_for_slot(self, slot_index: int):
        positions = self.state.spawn_positions
        x, y = positions[slot_index] if slot_index < len(positions) else (0.0, 0.0)
        angle = SPAWN_ANGLES[slot_index] if slot_index < len(SPAWN_ANGLES) else 0.0
        return x, y, angle

    def return_players_to_lobby(self):
        human_addrs = self._human_addrs()
        existing_players = list(self.state.players.items())
        for _, player in existing_players:
            if player["player_id"] > 0:
                self.write_queue.put({"op": "del", "key": f"player:{player['player_id']}"})

        self.state.reset_match_runtime(arm_lockout=False)
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))

        for addr in human_addrs:
            player = self.state.players.get(addr)
            if not player:
                continue
            player["player_id"] = 0
            player["flags"] = 0
            player["last_seq"] = None
            player["timed_out"] = False

        self._refresh_lobby_queue_positions()
        for addr in human_addrs:
            self._send_map(addr)

        for addr, player in self.state.players.items():
            if not str(addr).startswith("ghost:"):
                continue
            ghost_x, ghost_y, ghost_angle = self._spawn_pose_for_slot(player["player_id"] - 1)
            player["x"] = ghost_x
            player["y"] = ghost_y
            player["angle"] = ghost_angle
            player["flags"] = FLAG_GHOST
            player["last_seq"] = None
            player["timed_out"] = False

        self.state.next_id = max(
            (player["player_id"] for player in self.state.players.values()),
            default=0,
        ) + 1

    def start_match_from_lobby(self):
        if self.state.match_started and not self.state.match_ended:
            return False, "match already live"

        addrs = self._human_addrs()
        ghost_count = self._ghost_count()
        participant_count = len(addrs) + ghost_count
        if not addrs:
            return False, "no human players in the lobby"

        roles = {
            addr: self.state.pending_roles.get(
                addr,
                self.state.players[addr].get("preferred_role", ROLE_ANY),
            )
            for addr in addrs
        }
        if len(addrs) == 1:
            runner_addr = addrs[0]
            tagger_addr = None
        else:
            runners = [addr for addr, role in roles.items() if role == ROLE_RUNNER]
            taggers = [addr for addr, role in roles.items() if role == ROLE_TAGGER]
            if runners and taggers:
                runner_addr = runners[0]
                tagger_addr = taggers[0]
            else:
                runner_addr = addrs[0]
                tagger_addr = addrs[1]

        for addr in addrs:
            player = self.state.players[addr]
            player["player_id"] = 0
            player["flags"] = 0
            player["last_seq"] = None
            player["timed_out"] = False

        self.state.players[runner_addr]["player_id"] = 1
        self._send_ack(runner_addr, 1)
        self._send_map(runner_addr)
        print(f"[T2] assigned RUNNER(1) to {runner_addr}")

        if tagger_addr:
            self.state.players[tagger_addr]["player_id"] = 2
            self._send_ack(tagger_addr, 2)
            self._send_map(tagger_addr)
            print(f"[T2] assigned TAGGER(2) to {tagger_addr}")

        self.state.pending_roles = {}
        self.state.next_id = max(
            (player["player_id"] for player in self.state.players.values()),
            default=0,
        ) + 1
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))

        bits = self.map_state.get("bits", [])
        if bits:
            self.state.game_mode = GAME_MODE_CHASE_BITS
            self.state.bits = [[x, y, True] for x, y in bits]
            self.state.bits_mask = (1 << len(bits)) - 1
        else:
            self.state.game_mode = GAME_MODE_CHASE
            self.state.bits = []
            self.state.bits_mask = 0

        self.state.match_started = True
        self.state.match_tick = 0
        self.state.reset_positions()
        self._on_match_start()
        if participant_count == 1:
            return True, "single-player match started"
        return True, "match started"

    def disconnect_human_slot(self, slot_index: int):
        if slot_index < 0:
            return False, "invalid node slot"

        target_addr = self._find_human_addr_for_slot(slot_index)

        if not self.state.match_started or self.state.match_ended:
            queued_addrs = self._queued_human_addrs()
            if target_addr and target_addr in self.state.players and self.state.players[target_addr].get("player_id", 0) == 0:
                addr = target_addr
            else:
                if slot_index >= len(queued_addrs):
                    return False, f"node slot {slot_index + 1} not present in lobby"
                addr = queued_addrs[slot_index]
            player = self.state.players.pop(addr, None)
            if not player:
                return False, f"node slot {slot_index + 1} missing"
            self.state.pending_roles.pop(addr, None)
            self.write_queue.put({"op": "del", "key": f"player:{player['player_id']}"})
            self._refresh_lobby_queue_positions()
            print(f"[T2] removed queued lobby player from slot {slot_index + 1}: {addr}")
            return True, f"removed node slot {slot_index + 1} from lobby"

        active_humans = sorted(
            (
                (addr, player) for addr, player in self.state.players.items()
                if not str(addr).startswith("ghost:") and player.get("player_id", 0) > 0
            ),
            key=lambda item: item[1]["player_id"],
        )
        active_by_addr = {addr: player for addr, player in active_humans}
        if target_addr and target_addr in active_by_addr:
            addr = target_addr
            player = active_by_addr[target_addr]
        else:
            if slot_index >= len(active_humans):
                return False, f"node slot {slot_index + 1} not active"
            addr, player = active_humans[slot_index]
        player["timed_out"] = True
        player["last_seq"] = None
        player["last_seen"] = 0.0
        print(f"[T2] marked active player as disconnected from slot {slot_index + 1}: {addr}")
        self._pause_for_timeouts()
        return True, f"disconnected active node slot {slot_index + 1}"

    def _send_ack(self, addr, player_id: int):
        if self.udp_transport is None:
            return
        packet = (
            struct.pack(HEADER_FMT, PKT_ACK, 0, int(time.time() * 1000) & 0xFFFFFFFF)
            + struct.pack("<B", player_id & 0xFF)
        )
        try:
            self.udp_transport.sendto(packet, addr)
        except Exception as exc:
            print(f"[T2] failed sending ACK to {addr}: {exc}")

    def _send_map(self, addr):
        if self.udp_transport is None or not self.map_state.get("tiles"):
            return
        ms = self.map_state
        packet = pack_map_packet(0, ms["width"], ms["height"], ms["tile_scale"], ms["tiles"])
        try:
            self.udp_transport.sendto(packet, addr)
            print(f"[T2] sent PKT_MAP ({ms['name']}) to {addr} ({len(packet)} bytes)")
        except Exception as exc:
            print(f"[T2] failed sending PKT_MAP to {addr}: {exc}")

    def _send_bits_init(self, addr):
        if self.udp_transport is None:
            return
        bits = self.map_state.get("bits", [])
        if not bits:
            return
        packet = pack_bits_init_packet(0, bits)
        try:
            self.udp_transport.sendto(packet, addr)
            print(f"[T2] sent PKT_BITS_INIT ({len(bits)} bits) to {addr}")
        except Exception as exc:
            print(f"[T2] failed sending PKT_BITS_INIT to {addr}: {exc}")

    # ── Ghost management ──────────────────────────────────────────────────────

    def _spawn_ghost(self):
        ghost_count = sum(1 for a in self.state.players if str(a).startswith("ghost:"))
        if ghost_count >= MAX_GHOSTS:
            return
        ghost_addr = f"ghost:{ghost_count + 1}"
        used_ids = {player["player_id"] for player in self.state.players.values()}
        ghost_id = 3
        while ghost_id in used_ids:
            ghost_id += 1
        angle = math.pi / 2
        spawn_positions = self.state.spawn_positions
        x, y = spawn_positions[ghost_id - 1] if ghost_id - 1 < len(spawn_positions) else (0.0, 0.0)
        self.state.players[ghost_addr] = {
            "player_id":        ghost_id,
            "x":                x, "y": y, "angle": angle,
            "flags":            FLAG_GHOST,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
            "timed_out":        False,
            "username":         "",
            "display_name":     f"ghost-{ghost_id}",
            "profile_key":      "",
            "controller_key":   "",
            "identity_source":  "ghost",
        }
        print(f"[T2] spawned ghost tagger (player_id={ghost_id}) at {ghost_addr}")

    def set_ghost_count(self, target: int):
        target = max(0, min(target, MAX_GHOSTS))
        current = [a for a in self.state.players if str(a).startswith("ghost:")]
        while len(current) < target:
            self._spawn_ghost()
            current = [a for a in self.state.players if str(a).startswith("ghost:")]
        while len(current) > target:
            addr = current.pop()
            p = self.state.players.pop(addr, None)
            if p:
                self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})
                print(f"[T2] removed ghost {addr}")

    # ── Node eviction ─────────────────────────────────────────────────────────
    # Pause active matches when nodes go silent; only abort after the pause grace.

    def _timed_out_human_ids(self):
        return sorted(
            p["player_id"]
            for addr, p in self.state.players.items()
            if not str(addr).startswith("ghost:") and p.get("timed_out")
        )

    def _pause_for_timeouts(self):
        timed_out_ids = self._timed_out_human_ids()
        if not timed_out_ids or not self.state.match_started or self.state.match_ended:
            return
        if self.state.pause_match("player_timeout", timed_out_ids, abort_after_s=PAUSE_ABORT_S):
            print(f"[T2] match paused — timed out players {timed_out_ids}")
            self._on_match_pause({
                "reason": "player_timeout",
                "timed_out_player_ids": timed_out_ids,
                "pause_abort_s": PAUSE_ABORT_S,
                "game_mode": self.state.game_mode,
                "bits_mask": self.state.bits_mask,
            })

    def _maybe_resume_match(self):
        if (
            not self.state.match_paused
            or self.state.pause_reason != "player_timeout"
            or not self.state.match_started
            or self.state.match_ended
        ):
            return

        timed_out_ids = self._timed_out_human_ids()
        if timed_out_ids:
            self.state.paused_player_ids = timed_out_ids
            return

        for addr, p in self.state.players.items():
            if str(addr).startswith("ghost:"):
                continue
            p["last_seq"] = None

        if self.state.resume_match():
            print("[T2] match resumed — all timed out players returned")
            self._on_match_resume({
                "reason": "player_timeout_cleared",
                "game_mode": self.state.game_mode,
                "bits_mask": self.state.bits_mask,
            })

    async def evict_timed_out_nodes(self):
        now = time.monotonic()
        lobby_evicted = []
        newly_timed_out = []
        for addr, p in list(self.state.players.items()):
            if str(addr).startswith("ghost:"):
                continue
            if now - p["last_seen"] <= NODE_TIMEOUT_S:
                continue
            if not self.state.match_started or self.state.match_ended:
                lobby_evicted.append(addr)
                continue
            if p.get("timed_out"):
                continue
            p["timed_out"] = True
            p["last_seq"] = None
            newly_timed_out.append((addr, p["player_id"]))

        for addr in lobby_evicted:
            p = self.state.players.pop(addr)
            print(f"[T2] evicted queued player {p['player_id']} from {addr} "
                  f"— no packets for {NODE_TIMEOUT_S}s")
            self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})

        if newly_timed_out:
            print(
                f"[T2] players timed out after {NODE_TIMEOUT_S}s: "
                f"{[player_id for _, player_id in newly_timed_out]}"
            )
            self._pause_for_timeouts()

        if (
            self.state.match_paused
            and self.state.pause_reason == "player_timeout"
            and self.state.pause_abort_at is not None
            and self._timed_out_human_ids()
            and now >= self.state.pause_abort_at
        ):
            timed_out_ids = self._timed_out_human_ids()
            remaining_humans = sum(
                1 for addr in self.state.players
                if not str(addr).startswith("ghost:") and not self.state.players[addr].get("timed_out")
            )
            for player in list(self.state.players.values()):
                self.write_queue.put({"op": "del", "key": f"player:{player['player_id']}"})
            abort_event = {
                "reason": "pause_timeout",
                "timed_out_player_ids": timed_out_ids,
                "game_mode": self.state.game_mode,
                "players_remaining": remaining_humans,
                "ghosts_remaining": sum(
                    1 for addr in self.state.players
                    if str(addr).startswith("ghost:")
                ),
                "bits_mask": self.state.bits_mask,
            }
            print(f"[T2] match aborted — timed out players never returned {timed_out_ids}")
            self.state.abort_match()
            self._on_match_abort(abort_event)
