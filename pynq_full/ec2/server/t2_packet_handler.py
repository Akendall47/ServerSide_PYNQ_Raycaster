# t2_packet_handler.py — Packet ingestion, player registration, and node eviction.
#
# Owns: drain, _process_packet, _register_player, evict_timed_out_nodes
#
# pynq_full extras vs sim_full:
#   - _register_player calls _send_ack (assigns player_id) and _send_map (loads tiles)
#   - Position validation goes through game_logic.Anticheat (authoritative server-side check)
#
# Why a separate module: packet processing is the noisiest part of the codebase
# (validation, flag merging, sequence checks). Keeping it here lets GameTick stay
# a clean orchestrator with no protocol-level logic.

import asyncio
import struct
import time

from protocol import (
    # constants
    NODE_SIZE, PKT_REGISTER, PKT_ACK, HEADER_FMT,
    CLIENT_INPUT_FLAGS, SERVER_STATE_FLAGS, MOVEMENT_MODE_INTENT_ONLY,
    ROLE_ANY, ROLE_RUNNER, ROLE_TAGGER,
    GAME_MODE_CHASE, GAME_MODE_CHASE_BITS, FLAG_GHOST,
    # functions
    decode_movement_mode, unpack_node_packet, unpack_register_packet,
    pack_map_packet, pack_bits_init_packet,
)
from game_logic.anticheat import Anticheat, DEFAULT_MAX_SPEED_PER_TICK
from t2_constants import (
    MATCH_PLAYERS,
    NODE_TIMEOUT_S,
    PAUSE_ABORT_S,
    MAX_GHOSTS,
    PLAYER_COLLISION_RADIUS,
)
from game_logic.match_state import MatchState
from t2_map_loader import resolve_walkable_world
from player_profiles import build_player_identity


# Drains the inbound packet queue, registers players, sends ACK+MAP on registration
class PacketHandler:

    def __init__(self, state: MatchState, packet_queue: asyncio.Queue,
                 write_queue, udp_transport,
                 map_state,   # mutable dict: {width, height, tiles, name, tile_scale}
                 on_match_start, on_match_abort, on_match_pause, on_match_resume, on_event):
        self.state          = state
        self.packet_queue   = packet_queue
        self.write_queue    = write_queue
        self.udp_transport  = udp_transport
        self.map_state      = map_state
        # Callbacks into the orchestrator so this module stays decoupled
        self._on_match_start = on_match_start
        self._on_match_abort = on_match_abort
        self._on_match_pause = on_match_pause
        self._on_match_resume = on_match_resume
        self._on_event       = on_event
        self.anticheat       = Anticheat()

    # Derive world-space AABB from current map dimensions for position validation
    def _world_bounds(self):
        w  = self.map_state["width"]
        h  = self.map_state["height"]
        ts = self.map_state["tile_scale"]
        half_w = (w * ts) / 2.0 if w else 96.0
        half_h = (h * ts) / 2.0 if h else 96.0
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
            self._register_player(addr, x, y, angle,
                                  preferred_role=pkt.get("preferred_role", ROLE_ANY),
                                  username=pkt.get("username", ""))

        if addr not in self.state.players:
            return  # registration rejected (lockout / full) — discard packet

        p = self.state.players[addr]
        was_timed_out = bool(p.get("timed_out"))
        p["last_seen"] = time.monotonic()  # heartbeat — updated on every packet
        p["timed_out"] = False

        if pkt_type == PKT_REGISTER:
            if pkt.get("username", ""):
                p.update(build_player_identity(pkt["username"], addr))
            if not self.state.match_started or p["player_id"] == 0:
                p["x"], p["y"], p["angle"] = x, y, angle
            p["last_seq"]         = seq   # reset sequence baseline
            p["movement_mode"]    = movement_mode
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
        min_x, min_y, max_x, max_y = self._world_bounds()
        next_x, next_y = x, y
        if movement_mode != MOVEMENT_MODE_INTENT_ONLY:
            next_x, next_y = resolve_walkable_world(
                self.map_state, p["x"], p["y"], x, y, PLAYER_COLLISION_RADIUS
            )
        if (
            movement_mode != MOVEMENT_MODE_INTENT_ONLY
            and last is not None
            and not self.anticheat.validate_position(
                last, p["x"], p["y"], p["angle"],
                next_x, next_y, angle, seq,
                min_x, min_y, max_x, max_y,
                DEFAULT_MAX_SPEED_PER_TICK,
            )
        ):
            return  # reject implausible position jump

        p["last_seq"]          = seq
        p["movement_mode"]     = movement_mode
        p["protocol_version"]  = protocol_version

        # In non-intent-only modes the node sends its predicted pose;
        # intent-only mode leaves position advancement to future server logic.
        if movement_mode != MOVEMENT_MODE_INTENT_ONLY:
            p["x"], p["y"], p["angle"] = next_x, next_y, angle

        # Client can only set CLIENT_INPUT_FLAGS; server-owned bits are preserved
        client_input = raw_flags & CLIENT_INPUT_FLAGS
        p["flags"] = (p["flags"] & SERVER_STATE_FLAGS) | client_input
        self._maybe_resume_match()

    # ── Player registration ───────────────────────────────────────────────────
    # Record preferred role, then once two humans are present assign roles and
    # start the match. Queued humans get ACK(0) so clients can move in the lobby.

    def _register_player(self, addr, x=0.0, y=0.0, angle=0.0,
                         preferred_role=ROLE_ANY, username=""):
        if self.state.is_in_lockout():
            return
        if self.state.match_started:
            print(f"[T2] rejected {addr} — match already started")
            return
        # Count only human players (not ghost sentinels) for the cap check
        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        if human_count >= MATCH_PLAYERS:
            print(f"[T2] rejected {addr} — already at {MATCH_PLAYERS} human players")
            return

        self.state.clear_lockout()
        self.state.pending_roles[addr] = preferred_role

        identity = build_player_identity(username, addr)

        # Placeholder player_id=0 until role assignment resolves both players
        self.state.players[addr] = {
            "player_id":        0,
            "x": x, "y": y, "angle": angle, "flags": 0,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
            "timed_out":        False,
            **identity,
        }

        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        if human_count < MATCH_PLAYERS:
            self._send_ack(addr, 0)
            self._send_map(addr)
            print(f"[T2] player queued from {addr} (waiting for {MATCH_PLAYERS - human_count} more)")
            return

        self._assign_roles_and_start()

    # Assign player_id 1 (runner) and 2 (tagger) based on declared preferences.
    def _assign_roles_and_start(self):
        addrs = [a for a in self.state.players if not str(a).startswith("ghost:")]
        roles = {a: self.state.pending_roles.get(a, ROLE_ANY) for a in addrs}

        runners = [a for a, r in roles.items() if r == ROLE_RUNNER]
        taggers = [a for a, r in roles.items() if r == ROLE_TAGGER]

        if runners and taggers:
            # Each got what they want
            runner_addr = runners[0]
            tagger_addr = taggers[0]
        elif len(runners) == 2:
            # Two-human PYNQ MVP: fall back to first-come runner and second human tagger.
            runner_addr = addrs[0]
            tagger_addr = addrs[1]
        else:
            # Both want tagger, or both ROLE_ANY → first-come is runner
            runner_addr = addrs[0]
            tagger_addr = addrs[1] if len(addrs) > 1 else None

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
        self.state.next_id       = len(self.state.players) + 1
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))

        # Set game mode based on whether the map has bits
        bits = self.map_state.get("bits", [])
        if bits:
            self.state.game_mode  = GAME_MODE_CHASE_BITS
            self.state.bits       = [[x, y, True] for x, y in bits]
            self.state.bits_mask  = (1 << len(bits)) - 1
            # Send bit positions to all human nodes once
            for addr in addrs:
                self._send_bits_init(addr)
        else:
            self.state.game_mode = GAME_MODE_CHASE
            self.state.bits = []
            self.state.bits_mask = 0

        self.state.match_started = True
        self.state.match_tick    = 0
        self.state.reset_positions()
        self._on_match_start()

    # Adjust ghost count at runtime (e.g. from Monitor "set_ghost_count" control command)
    def set_ghost_count(self, target: int):
        target  = max(0, min(target, MAX_GHOSTS))
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

    # Create a ghost tagger entry in players — driven by CoreLogic, not UDP packets
    def _spawn_ghost(self):
        ghost_count = sum(1 for a in self.state.players if str(a).startswith("ghost:"))
        if ghost_count >= MAX_GHOSTS:
            return
        import math
        ghost_addr = f"ghost:{ghost_count + 1}"
        used_ids   = {player["player_id"] for player in self.state.players.values()}
        ghost_id   = 3
        while ghost_id in used_ids:
            ghost_id += 1
        angle      = math.pi / 2
        spawn_positions = self.state.spawn_positions
        x, y = spawn_positions[ghost_id - 1] if ghost_id - 1 < len(spawn_positions) else (0.0, 0.0)
        self.state.players[ghost_addr] = {
            "player_id":        ghost_id,
            "x":                x, "y":  y, "angle": angle,
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

    # ── Node-to-node messaging ────────────────────────────────────────────────
    # These are sent directly over the T1 socket, not via the broadcast queue

    # Send PKT_ACK so the node learns its assigned player_id
    def _send_ack(self, addr, player_id: int):
        if self.udp_transport is None:
            return
        ts  = int(time.time() * 1000) & 0xFFFFFFFF
        pkt = struct.pack(HEADER_FMT, PKT_ACK, player_id, ts) + struct.pack('<B', player_id)
        try:
            self.udp_transport.sendto(pkt, addr)
        except Exception as e:
            print(f"[T2] failed to send ACK to {addr}: {e}")

    # Send PKT_MAP so the node can load tile data into FPGA DRAM
    def _send_map(self, addr):
        if self.udp_transport is None or not self.map_state["tiles"]:
            return
        ms  = self.map_state
        pkt = pack_map_packet(0, ms["width"], ms["height"], ms["tile_scale"], ms["tiles"])
        try:
            self.udp_transport.sendto(pkt, addr)
            print(f"[T2] sent PKT_MAP ({ms['name']}) to {addr} ({len(pkt)} bytes)")
        except Exception as e:
            print(f"[T2] failed to send PKT_MAP to {addr}: {e}")

    # Send PKT_BITS_INIT so the node knows where bits are — sent once at match start
    def _send_bits_init(self, addr):
        if self.udp_transport is None:
            return
        bits = self.map_state.get("bits", [])
        if not bits:
            return
        pkt = pack_bits_init_packet(0, bits)
        try:
            self.udp_transport.sendto(pkt, addr)
            print(f"[T2] sent PKT_BITS_INIT ({len(bits)} bits) to {addr}")
        except Exception as e:
            print(f"[T2] failed to send PKT_BITS_INIT to {addr}: {e}")

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
