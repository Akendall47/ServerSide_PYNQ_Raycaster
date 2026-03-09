# t2_packet_handler.py — Packet ingestion, player registration, and node eviction.
#
# Owns: drain, _process_packet, _register_player, evict_timed_out_nodes
#
# Why a separate module: packet processing is the noisiest part of the codebase
# (validation, flag merging, sequence checks). Keeping it here lets GameTick stay
# a clean orchestrator with no protocol-level logic.

import asyncio
import time

from protocol import (
    # constants
    NODE_SIZE, PKT_REGISTER, CLIENT_INPUT_FLAGS, SERVER_STATE_FLAGS, MOVEMENT_MODE_INTENT_ONLY,
    # functions
    decode_movement_mode, unpack_node_packet,
)
from game_logic.anticheat import validate_position, DEFAULT_MAX_SPEED_PER_TICK
from game_logic.match_state import MatchState
from t2_constants import MAX_PLAYERS, MATCH_PLAYERS, NODE_TIMEOUT_S


# Drains the inbound packet queue and maintains the player registry
class PacketHandler:

    def __init__(self, state: MatchState, packet_queue: asyncio.Queue,
                 write_queue, on_match_start, on_match_abort, on_event):
        self.state         = state
        self.packet_queue  = packet_queue
        self.write_queue   = write_queue
        # Callbacks into the orchestrator so this module stays decoupled
        self._on_match_start = on_match_start
        self._on_match_abort = on_match_abort
        self._on_event       = on_event

    # Derive world-space AABB from orbit radius for position validation
    def _world_bounds(self, orbit_radius: float):
        half = orbit_radius * 2.0
        return (-half, -half, half, half)

    # ── Main drain loop ───────────────────────────────────────────────────────
    # Pull every queued packet and process it — called once per game tick

    async def drain(self, orbit_radius: float):
        while True:
            try:
                raw = self.packet_queue.get_nowait()
            except asyncio.QueueEmpty:
                break
            self._process_packet(raw, orbit_radius)

    # ── Individual packet handling ────────────────────────────────────────────
    # Validate sequence/position, merge flags, update player state

    def _process_packet(self, raw: dict, orbit_radius: float):
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
            self._register_player(addr)

        if addr not in self.state.players:
            return  # registration rejected (lockout / full) — discard packet

        p = self.state.players[addr]
        p["last_seen"] = time.monotonic()

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
        min_x, min_y, max_x, max_y = self._world_bounds(orbit_radius)
        if (
            movement_mode != MOVEMENT_MODE_INTENT_ONLY
            and last is not None
            and not validate_position(
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
    # Assign a player_id to a new address; start the match when the room is full

    def _register_player(self, addr):
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
            "x": 0.0, "y": 0.0, "angle": 0.0, "flags": 0,
            "last_seen":        time.monotonic(),
            "last_seq":         None,   # set on first packet; used for sequence validation
            "movement_mode":    0,
            "protocol_version": 0,
        }
        print(f"[T2] registered player {player_id} from {addr} "
              f"(total: {len(self.state.players)})")

        if len(self.state.players) == MATCH_PLAYERS and not self.state.match_started:
            self.state.match_started = True
            self.state.match_tick    = 0
            self._on_match_start()

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
            print("[T2] match aborted — not enough players after eviction")
            self.state.abort_match()
            self._on_match_abort()
