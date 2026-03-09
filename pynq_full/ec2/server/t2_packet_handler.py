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
    # functions
    decode_movement_mode, unpack_node_packet, pack_map_packet,
)
from game_logic.anticheat import Anticheat, DEFAULT_MAX_SPEED_PER_TICK
from t2_constants import MAX_PLAYERS, MATCH_PLAYERS, NODE_TIMEOUT_S
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

        # Auto-register unknown address before any state reads so we don't drop P1
        if addr not in self.state.players:
            self._register_player(addr, x, y, angle)

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
    # Assign player_id, ACK the node, send the map, start match when room is full

    def _register_player(self, addr, x=0.0, y=0.0, angle=0.0):
        if self.state.is_in_lockout():
            return  # nodes still winding down after match end — silently reject
        if len(self.state.players) >= MAX_PLAYERS:
            print(f"[T2] rejected {addr} — already at {MAX_PLAYERS} players")
            return

        self.state.clear_lockout()
        player_id = self.state.next_id
        self.state.next_id += 1
        self.state.players[addr] = {
            "player_id":        player_id,
            "x": x, "y": y, "angle": angle, "flags": 0,
            "last_seen":        time.monotonic(),
            "last_seq":         None,   # set on first packet; used for sequence validation
            "movement_mode":    0,
            "protocol_version": 0,
        }
        print(f"[T2] registered player {player_id} from {addr} "
              f"(total: {len(self.state.players)})")

        # ACK assigns the player_id — node must wait for this before sending
        # STATE_UPDATEs and uses it to determine its role (RUNNER=1 / TAGGER=2).
        self._send_ack(addr, player_id)
        # MAP streams tile data into node DRAM for the FPGA raycaster
        self._send_map(addr)

        if len(self.state.players) == MATCH_PLAYERS and not self.state.match_started:
            self.state.match_started = True
            self.state.match_tick    = 0
            self._on_match_start()

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

    # ── Node eviction ─────────────────────────────────────────────────────────
    # Remove nodes that have gone silent, aborting any active match

    async def evict_timed_out_nodes(self):
        now     = time.monotonic()
        evicted = [addr for addr, p in self.state.players.items()
                   if now - p["last_seen"] > NODE_TIMEOUT_S]
        for addr in evicted:
            p = self.state.players.pop(addr)
            print(f"[T2] evicted player {p['player_id']} from {addr} "
                  f"— no packets for {NODE_TIMEOUT_S}s")
            self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})

        if evicted and self.state.match_started and not self.state.match_ended:
            # Match can't continue with fewer than MATCH_PLAYERS — reset
            print("[T2] match aborted — not enough players after eviction")
            self.state.abort_match()
            self._on_match_abort()
