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
    decode_movement_mode, unpack_node_packet, pack_map_packet, pack_bits_init_packet,
)
from game_logic.anticheat import Anticheat, DEFAULT_MAX_SPEED_PER_TICK
from t2_constants import MAX_PLAYERS, MATCH_PLAYERS, NODE_TIMEOUT_S, MAX_GHOSTS
from game_logic.match_state import MatchState


# Drains the inbound packet queue, registers players, sends ACK+MAP on registration
class PacketHandler:

    def __init__(self, state: MatchState, packet_queue: asyncio.Queue,
                 write_queue, udp_transport,
                 map_state,   # mutable dict: {width, height, tiles, name, tile_scale}
                 on_match_start, on_match_abort, on_event):
        self.state          = state
        self.packet_queue   = packet_queue
        self.write_queue    = write_queue
        self.udp_transport  = udp_transport
        self.map_state      = map_state
        # Callbacks into the orchestrator so this module stays decoupled
        self._on_match_start = on_match_start
        self._on_match_abort = on_match_abort
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
        pkt_type         = pkt["pkt_type"]
        seq              = pkt["seq"]
        x, y, angle      = pkt["x"], pkt["y"], pkt["angle"]
        raw_flags        = pkt["input_flags"]
        movement_mode    = pkt["movement_mode"]
        protocol_version = pkt["protocol_version"]

        # Auto-register unknown address — pass preferred_role from the reserved byte
        if addr not in self.state.players:
            self._register_player(addr, x, y, angle,
                                  preferred_role=pkt.get("reserved", ROLE_ANY))

        if addr not in self.state.players:
            return  # registration rejected (lockout / full) — discard packet

        p = self.state.players[addr]
        p["last_seen"] = time.monotonic()  # heartbeat — updated on every packet

        if pkt_type == PKT_REGISTER:
            # Accept the node's reported starting position on REGISTER so it
            # doesn't appear at (0,0) before the first STATE_UPDATE arrives.
            p["x"], p["y"], p["angle"] = x, y, angle
            p["last_seq"]         = seq   # reset sequence baseline
            p["movement_mode"]    = movement_mode
            p["protocol_version"] = protocol_version
            print(f"[T2] P{p['player_id']} protocol=v{protocol_version} "
                  f"movement={decode_movement_mode(movement_mode)}")
            return

        # Position validation — skip for intent-only mode and on the very first packet
        last = p["last_seq"]
        min_x, min_y, max_x, max_y = self._world_bounds()
        if (
            movement_mode != MOVEMENT_MODE_INTENT_ONLY
            and last is not None
            and not self.anticheat.validate_position(
                last, p["x"], p["y"], p["angle"],
                x, y, angle, seq,
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
            p["x"], p["y"], p["angle"] = x, y, angle

        # Client can only set CLIENT_INPUT_FLAGS; server-owned bits are preserved
        client_input = raw_flags & CLIENT_INPUT_FLAGS
        p["flags"] = (p["flags"] & SERVER_STATE_FLAGS) | client_input

    # ── Player registration ───────────────────────────────────────────────────
    # Record preferred role, then when both humans are registered assign roles
    # and start the match (spawning a ghost if both chose runner).

    def _register_player(self, addr, x=0.0, y=0.0, angle=0.0, preferred_role=ROLE_ANY):
        if self.state.is_in_lockout():
            return
        # Count only human players (not ghost sentinels) for the cap check
        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        if human_count >= MATCH_PLAYERS:
            print(f"[T2] rejected {addr} — already at {MATCH_PLAYERS} human players")
            return

        self.state.clear_lockout()
        self.state.pending_roles[addr] = preferred_role

        # Placeholder player_id=0 until role assignment resolves both players
        self.state.players[addr] = {
            "player_id":        0,
            "x": x, "y": y, "angle": angle, "flags": 0,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
        }

        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        if human_count < MATCH_PLAYERS:
            print(f"[T2] player queued from {addr} (waiting for {MATCH_PLAYERS - human_count} more)")
            return

        # Both humans registered — resolve roles now
        self._assign_roles_and_start()

    # Assign player_id 1 (runner) and 2 (tagger) based on declared preferences.
    # If both want runner → assign runner + spawn ghost tagger instead of human tagger.
    def _assign_roles_and_start(self):
        addrs = [a for a in self.state.players if not str(a).startswith("ghost:")]
        roles = {a: self.state.pending_roles.get(a, ROLE_ANY) for a in addrs}

        # Determine who gets runner (player_id=1)
        runners = [a for a, r in roles.items() if r == ROLE_RUNNER]
        taggers = [a for a, r in roles.items() if r == ROLE_TAGGER]

        if runners and taggers:
            # Each got what they want
            runner_addr = runners[0]
            tagger_addr = taggers[0]
        elif len(runners) == 2:
            # Both want runner → first-come-first-served, second becomes runner too;
            # we spawn a ghost tagger instead
            runner_addr  = addrs[0]
            tagger_addr  = None   # ghost will fill this slot
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
        else:
            # Remove placeholder for the second addr that was going to be tagger
            second_addr = addrs[1] if len(addrs) > 1 else None
            if second_addr:
                self.state.players[second_addr]["player_id"] = 2
                self._send_ack(second_addr, 2)
                self._send_map(second_addr)
            # Spawn one ghost tagger
            self._spawn_ghost()

        self.state.pending_roles = {}
        self.state.next_id       = len(self.state.players) + 1

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

        self.state.match_started = True
        self.state.match_tick    = 0
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
        ghost_id   = len(self.state.players) + 1
        angle      = math.pi / 2   # tagger spawn angle
        self.state.players[ghost_addr] = {
            "player_id":        ghost_id,
            "x":                0.0, "y":  0.0, "angle": angle,
            "flags":            FLAG_GHOST,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
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
    # Remove nodes that have gone silent, aborting any active match

    async def evict_timed_out_nodes(self):
        now     = time.monotonic()
        # Ghosts are server-driven — never time out
        evicted = [addr for addr, p in self.state.players.items()
                   if not str(addr).startswith("ghost:")
                   and now - p["last_seen"] > NODE_TIMEOUT_S]
        for addr in evicted:
            p = self.state.players.pop(addr)
            print(f"[T2] evicted player {p['player_id']} from {addr} "
                  f"— no packets for {NODE_TIMEOUT_S}s")
            self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})

        if evicted and self.state.match_started and not self.state.match_ended:
            # Match can't continue with fewer than MATCH_PLAYERS — reset
            remaining_humans = sum(
                1 for addr in self.state.players
                if not str(addr).startswith("ghost:")
            )
            remaining_players = list(self.state.players.values())
            for player in remaining_players:
                self.write_queue.put({"op": "del", "key": f"player:{player['player_id']}"})
            abort_event = {
                "reason": "player_evicted",
                "game_mode": self.state.game_mode,
                "players_remaining": remaining_humans,
                "ghosts_remaining": sum(
                    1 for addr in self.state.players
                    if str(addr).startswith("ghost:")
                ),
                "bits_mask": self.state.bits_mask,
            }
            print("[T2] match aborted — not enough players after eviction")
            self.state.abort_match()
            self._on_match_abort(abort_event)
