# t2_packet_handler.py — Packet ingestion, player registration, and node eviction.
#
# Owns: drain, _process_packet, _register_player, evict_timed_out_nodes
#
# Why a separate module: packet processing is the noisiest part of the codebase
# (validation, flag merging, sequence checks). Keeping it here lets GameTick stay
# a clean orchestrator with no protocol-level logic.

import asyncio
import math
import time

from protocol import (
    CLIENT_INPUT_FLAGS,
    GAME_MODE_CHASE,
    GAME_MODE_CHASE_BITS,
    MOVEMENT_MODE_INTENT_ONLY,
    NODE_SIZE,
    PKT_REGISTER,
    ROLE_ANY,
    ROLE_RUNNER,
    ROLE_TAGGER,
    SERVER_STATE_FLAGS,
    FLAG_GHOST,
    decode_movement_mode,
    unpack_node_packet,
)
from game_logic.anticheat import validate_position, DEFAULT_MAX_SPEED_PER_TICK
from game_logic.match_state import MatchState
from t2_constants import MATCH_PLAYERS, NODE_TIMEOUT_S, MAX_GHOSTS


# Drains the inbound packet queue and maintains the player registry
class PacketHandler:

    def __init__(self, state: MatchState, packet_queue: asyncio.Queue,
                 write_queue, map_state, on_match_start, on_match_abort, on_event):
        self.state         = state
        self.packet_queue  = packet_queue
        self.write_queue   = write_queue
        self.map_state     = map_state
        self._on_match_start = on_match_start
        self._on_match_abort = on_match_abort
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
        pkt_type         = pkt["pkt_type"]
        seq              = pkt["seq"]
        x, y, angle      = pkt["x"], pkt["y"], pkt["angle"]
        raw_flags        = pkt["input_flags"]
        movement_mode    = pkt["movement_mode"]
        protocol_version = pkt["protocol_version"]

        # Auto-register unknown address and capture preferred role from reserved.
        if addr not in self.state.players:
            self._register_player(
                addr, x, y, angle,
                preferred_role=pkt.get("reserved", ROLE_ANY),
            )

        if addr not in self.state.players:
            return

        p = self.state.players[addr]
        p["last_seen"] = time.monotonic()

        if pkt_type == PKT_REGISTER:
            p["x"], p["y"], p["angle"] = x, y, angle
            p["last_seq"] = seq
            p["movement_mode"] = movement_mode
            p["protocol_version"] = protocol_version
            print(f"[T2] P{p['player_id']} protocol=v{protocol_version} "
                  f"movement={decode_movement_mode(movement_mode)}")
            return

        last = p["last_seq"]
        min_x, min_y, max_x, max_y = self._world_bounds()
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
            return

        p["last_seq"] = seq
        p["movement_mode"] = movement_mode
        p["protocol_version"] = protocol_version

        if movement_mode != MOVEMENT_MODE_INTENT_ONLY:
            p["x"], p["y"], p["angle"] = x, y, angle

        client_input = raw_flags & CLIENT_INPUT_FLAGS
        p["flags"] = (p["flags"] & SERVER_STATE_FLAGS) | client_input

    # ── Player registration ───────────────────────────────────────────────────
    # Record preferred role, then assign roles once two humans are present.

    def _register_player(self, addr, x=0.0, y=0.0, angle=0.0, preferred_role=ROLE_ANY):
        if self.state.is_in_lockout():
            return

        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        if human_count >= MATCH_PLAYERS:
            print(f"[T2] rejected {addr} — already at {MATCH_PLAYERS} human players")
            return

        self.state.clear_lockout()
        self.state.pending_roles[addr] = preferred_role
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

        self._assign_roles_and_start()

    def _assign_roles_and_start(self):
        addrs = [a for a in self.state.players if not str(a).startswith("ghost:")]
        roles = {a: self.state.pending_roles.get(a, ROLE_ANY) for a in addrs}

        runners = [a for a, role in roles.items() if role == ROLE_RUNNER]
        taggers = [a for a, role in roles.items() if role == ROLE_TAGGER]

        if runners and taggers:
            runner_addr = runners[0]
            tagger_addr = taggers[0]
        elif len(runners) == 2:
            runner_addr = addrs[0]
            tagger_addr = None
        else:
            runner_addr = addrs[0]
            tagger_addr = addrs[1] if len(addrs) > 1 else None

        self.state.players[runner_addr]["player_id"] = 1
        print(f"[T2] assigned RUNNER(1) to {runner_addr}")

        if tagger_addr:
            self.state.players[tagger_addr]["player_id"] = 2
            print(f"[T2] assigned TAGGER(2) to {tagger_addr}")
        else:
            second_addr = addrs[1] if len(addrs) > 1 else None
            if second_addr:
                self.state.players[second_addr]["player_id"] = 2
                print(f"[T2] assigned TAGGER(2) to {second_addr}")
            self._spawn_ghost()

        self.state.pending_roles = {}
        self.state.next_id = len(self.state.players) + 1

        bits = self.map_state.get("bits", [])
        if bits:
            self.state.game_mode = GAME_MODE_CHASE_BITS
            self.state.bits = [[x, y, True] for x, y in bits]
            self.state.bits_mask = (1 << len(bits)) - 1
        else:
            self.state.game_mode = GAME_MODE_CHASE
            self.state.bits = []
            self.state.bits_mask = 0xFFFF

        self.state.match_started = True
        self.state.match_tick = 0
        self._on_match_start()

    # ── Ghost management ──────────────────────────────────────────────────────

    def _spawn_ghost(self):
        ghost_count = sum(1 for a in self.state.players if str(a).startswith("ghost:"))
        if ghost_count >= MAX_GHOSTS:
            return
        ghost_addr = f"ghost:{ghost_count + 1}"
        ghost_id = len(self.state.players) + 1
        angle = math.pi / 2
        self.state.players[ghost_addr] = {
            "player_id":        ghost_id,
            "x":                0.0, "y": 0.0, "angle": angle,
            "flags":            FLAG_GHOST,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
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
    # Remove nodes that have gone silent, aborting any active match

    async def evict_timed_out_nodes(self):
        now = time.monotonic()
        evicted = [
            addr for addr, p in self.state.players.items()
            if not str(addr).startswith("ghost:")
            and now - p["last_seen"] > NODE_TIMEOUT_S
        ]
        for addr in evicted:
            p = self.state.players.pop(addr)
            print(f"[T2] evicted player {p['player_id']} from {addr} "
                  f"— no packets for {NODE_TIMEOUT_S}s")
            self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})

        if evicted and self.state.match_started and not self.state.match_ended:
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
