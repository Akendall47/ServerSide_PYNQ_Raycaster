# t2_packet_handler.py — Packet ingestion, player registration, and node eviction.
#
# Owns: drain, _process_packet, _register_player, evict_timed_out_nodes
#
# pynq_full extras vs sim_full:
#   - _register_player calls _send_ack (assigns player_id) and _send_map (loads tiles)
#   - Board slots and live node-mode control are handled here for the real hardware path
#
# Why a separate module: packet processing is the noisiest part of the codebase
# (validation, flag merging, sequence checks). Keeping it here lets GameTick stay
# a clean orchestrator with no protocol-level logic.

import asyncio
import struct
import time

from protocol import (
    # constants
    NODE_SIZE, PKT_REGISTER, PKT_ACK, PKT_PERF, HEADER_FMT, HEADER_SIZE,
    CLIENT_INPUT_FLAGS, SERVER_STATE_FLAGS, MOVEMENT_MODE_INTENT_ONLY,
    ROLE_ANY, ROLE_RUNNER, ROLE_TAGGER,
    GAME_MODE_CHASE, GAME_MODE_CHASE_BITS, FLAG_GHOST,
    NODE_CONTROL_MODE_MANUAL, NODE_CONTROL_MODE_AUTO, NODE_CONTROL_MODE_REPLAY,
    # functions
    decode_movement_mode, unpack_node_packet, unpack_register_packet,
    unpack_perf_packet,
    pack_map_packet, pack_bits_init_packet, pack_node_mode_packet,
)
from t2_constants import (
    MATCH_PLAYERS,
    NODE_TIMEOUT_S,
    LOBBY_TIMEOUT_S,
    PAUSE_ABORT_S,
    KICK_RECONNECT_BLOCK_S,
    MAX_GHOSTS,
    PLAYER_COLLISION_RADIUS,
    SPAWN_ANGLES,
)
from game_logic.match_state import MatchState
from t2_map_loader import resolve_walkable_world
from player_profiles import build_player_identity


# Reject a stale or replayed 16-bit client sequence number with wraparound handling.
def _validate_seq(prev_seq, seq):
    delta = (int(seq) - int(prev_seq)) & 0xFFFF
    return delta != 0 and delta <= 0x7FFF


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

    # Return the first unused stable board slot for a newly connected human node.
    def _allocate_board_slot(self) -> int | None:
        used = {
            int(player.get("board_slot"))
            for addr, player in self.state.players.items()
            if not str(addr).startswith("ghost:") and player.get("board_slot") is not None
        }
        for slot in range(1, MATCH_PLAYERS + 1):
            if slot not in used:
                return slot
        return None

    # Look up a live human node by its stable board slot.
    def _addr_for_board_slot(self, board_slot: int):
        for addr, player in self.state.players.items():
            if str(addr).startswith("ghost:"):
                continue
            if int(player.get("board_slot") or 0) == int(board_slot):
                return addr
        return None

    # Remove the human currently occupying a board slot.
    def evict_board_slot(self, board_slot: int):
        key = self._addr_for_board_slot(board_slot)
        if key is None:
            return False, f"board {board_slot} not connected"

        player = self.state.players.pop(key)
        self.state.pending_roles.pop(key, None)
        udp_addr = player.get("_addr") or key
        self.state.block_reconnect(udp_addr, KICK_RECONNECT_BLOCK_S)

        player_id = int(player.get("player_id", 0) or 0)
        self.write_queue.put({"op": "del", "key": f"player:{player_id}"})

        label = player.get("display_name") or player.get("username") or (
            f"player {player_id}" if player_id > 0 else "queued player"
        )
        print(
            f"[T2] evicted board {board_slot} from {udp_addr} "
            f"(player_id={player_id}, label={label})"
        )
        return True, f"board {board_slot} kicked ({label}); reconnect blocked for {KICK_RECONNECT_BLOCK_S:.0f}s"

    # Send the runtime control mode packet to one connected board.
    def _send_control_mode(self, addr, player=None):
        if self.udp_transport is None:
            return
        control_mode = str((player or {}).get("control_mode") or "manual").lower()
        mode_value = {
            "manual": NODE_CONTROL_MODE_MANUAL,
            "auto": NODE_CONTROL_MODE_AUTO,
            "replay": NODE_CONTROL_MODE_REPLAY,
        }.get(control_mode, NODE_CONTROL_MODE_MANUAL)
        pkt = pack_node_mode_packet(0, mode_value)
        try:
            self.udp_transport.sendto(pkt, addr)
            print(f"[T2] sent PKT_NODE_MODE ({control_mode}) to {addr}")
        except Exception as e:
            print(f"[T2] failed to send PKT_NODE_MODE to {addr}: {e}")

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

    def _player_key(self, addr, username: str = ""):
        """Return the players-dict key for this connection.

        When a username is provided we key on ("username", username) so that two
        boards behind the same NAT (identical addr) register as separate players
        as long as they use different usernames.  Without a username we fall back
        to the raw addr tuple (existing behaviour).
        """
        if username:
            return ("username", username.strip())
        return addr

    def _process_packet(self, raw: dict):
        data = raw["data"]
        addr = raw["addr"]

        # PKT_PERF is shorter than NODE_SIZE — handle before the length check.
        if len(data) >= HEADER_SIZE:
            pkt_type_peek = struct.unpack_from('<H', data, 0)[0]
            if pkt_type_peek == PKT_PERF:
                self._handle_perf(data, addr)
                return

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
        preferred_role   = pkt.get("preferred_role", ROLE_ANY)
        username         = pkt.get("username", "") if pkt_type == PKT_REGISTER else ""

        # Resolve key: username-keyed when username present, addr-keyed otherwise.
        # For non-REGISTER packets (no username), scan for a username-keyed player
        # whose _addr matches this UDP source — handles boards behind shared NAT.
        key = self._player_key(addr, username)
        if key not in self.state.players:
            # Search all players for one whose real UDP addr matches
            found_key = None
            for k, p in self.state.players.items():
                if not str(k).startswith("ghost:") and p.get("_addr") == addr:
                    found_key = k
                    break
            if found_key is not None:
                key = found_key
            elif pkt_type == PKT_REGISTER:
                self._register_player(key, addr, x, y, angle,
                                      preferred_role=preferred_role,
                                      username=pkt.get("username", ""))
            else:
                return

        if key not in self.state.players:
            return  # registration rejected (lockout / full) — discard packet

        p = self.state.players[key]
        # Keep reply address current (NAT port may change on reconnect)
        p["_addr"] = addr
        was_timed_out = bool(p.get("timed_out"))
        p["last_seen"] = time.monotonic()  # heartbeat — updated on every packet
        p["timed_out"] = False

        if pkt_type == PKT_REGISTER:
            if pkt.get("username", ""):
                p.update(build_player_identity(pkt["username"], addr))
            p["preferred_role"] = preferred_role
            self.state.pending_roles[key] = preferred_role
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
        if last is not None and not _validate_seq(last, seq):
            last_log = float(p.get("_last_invalid_seq_log_at", 0.0) or 0.0)
            now = time.monotonic()
            if (now - last_log) >= 0.5:
                p["_last_invalid_seq_log_at"] = now
                print(f"[T2] dropped stale seq for {addr}: prev={last} next={seq}")
            return

        next_x, next_y = x, y
        if movement_mode != MOVEMENT_MODE_INTENT_ONLY:
            next_x, next_y = resolve_walkable_world(
                self.map_state, p["x"], p["y"], x, y, PLAYER_COLLISION_RADIUS
            )

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
    def _handle_perf(self, data: bytes, addr):
        try:
            pkt = unpack_perf_packet(data)
        except Exception:
            return
        p = self.state.players.get(addr)
        if p is None:
            # username-keyed player — find by stored _addr
            for candidate in self.state.players.values():
                if candidate.get("_addr") == addr:
                    p = candidate
                    break
        if p is None:
            return
        p["perf"] = {
            "tick_rate_hz":      pkt["tick_rate_hz"],
            "cpu_temp_c":        pkt["cpu_temp_c"],
            "bram_write_us":     pkt["bram_write_us"],
            "worst_overrun_us":  pkt["worst_overrun_us"],
        }

    # Record preferred role and keep humans in the lobby until the monitor sends Start.
    # Queued humans get ACK(0) so clients can move before the match begins.

    def _register_player(self, key, addr, x=0.0, y=0.0, angle=0.0,
                         preferred_role=ROLE_ANY, username=""):
        remaining = self.state.reconnect_block_remaining(addr)
        if remaining > 0:
            print(f"[T2] rejected {addr} — reconnect blocked for {remaining:.1f}s after kick")
            return
        if self.state.is_in_lockout():
            return
        if self.state.match_started:
            print(f"[T2] rejected {addr} — match already started")
            return

        # ── Dedup: evict stale entry from the same physical board ─────────────
        # Username-keyed players only evict other entries with the same username.
        # Controller-keyed (no username) players evict same-IP entries as before.
        identity = build_player_identity(username, addr)
        new_ck = identity.get("controller_key", "")
        new_pk = identity.get("profile_key", "")
        is_username_keyed = bool(username)

        stale_keys = []
        for existing_key, existing_p in list(self.state.players.items()):
            if str(existing_key).startswith("ghost:"):
                continue
            if existing_key == key:
                continue
            ex_ck = existing_p.get("controller_key", "")
            ex_pk = existing_p.get("profile_key", "")
            if is_username_keyed:
                # Username-keyed: only evict an entry with the same username
                # (same board reconnecting with same username).
                # Never evict a different username — that's a different board.
                if (new_pk and ex_pk == new_pk
                        and identity.get("identity_source") == "username"
                        and existing_p.get("identity_source") == "username"):
                    stale_keys.append(existing_key)
            else:
                # No username: fall back to IP-based dedup (original behaviour).
                if new_ck and ex_ck == new_ck:
                    stale_keys.append(existing_key)

        for stale_key in stale_keys:
            stale_p = self.state.players.pop(stale_key)
            self.state.pending_roles.pop(stale_key, None)
            self.write_queue.put({"op": "del", "key": f"player:{stale_p['player_id']}"})
            print(f"[T2] evicted stale {stale_key} "
                  f"(player_id={stale_p['player_id']}, board_slot={stale_p.get('board_slot')}) "
                  f"— same board reconnected as {key}")

        # ── Cap check (after dedup so freed slot counts as available) ─────────
        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        if human_count >= MATCH_PLAYERS:
            print(f"[T2] rejected {addr} — already at {MATCH_PLAYERS} human players")
            return

        board_slot = self._allocate_board_slot()
        if board_slot is None:
            print(f"[T2] rejected {addr} — no board slots available")
            return

        self.state.clear_lockout()
        self.state.pending_roles[key] = preferred_role

        # Placeholder player_id=0 until role assignment resolves both players
        self.state.players[key] = {
            "player_id":        0,
            "x": x, "y": y, "angle": angle, "flags": 0,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
            "timed_out":        False,
            "preferred_role":   preferred_role,
            "board_slot":       board_slot,
            "control_mode":     self.state.slot_modes.get(board_slot, "manual"),
            "_addr":            addr,   # real UDP addr for sending replies
            **identity,
        }

        human_count = sum(1 for a in self.state.players if not str(a).startswith("ghost:"))
        self._send_ack(addr, 0)
        self._send_map(addr)
        self._send_bits_init(addr)
        self._send_control_mode(addr, self.state.players[key])
        print(f"[T2] player queued key={key} addr={addr} (lobby humans={human_count}, ghosts={self._ghost_count()})")

    def _human_addrs(self):
        humans = [
            (addr, player)
            for addr, player in self.state.players.items()
            if not str(addr).startswith("ghost:")
        ]
        humans.sort(
            key=lambda item: (
                int(item[1].get("board_slot") or MATCH_PLAYERS + 1),
                repr(item[0]),
            )
        )
        return [addr for addr, _ in humans]

    def _ghost_count(self):
        return sum(1 for addr in self.state.players if str(addr).startswith("ghost:"))

    def _ghost_slot_for_player(self, player: dict) -> int:
        slot = int(player.get("ghost_slot") or 0)
        if slot > 0:
            return slot
        player_id = int(player.get("player_id") or 0)
        return max(1, player_id - 2)

    def _apply_ghost_profile(self, slot: int, player: dict):
        profile = self.state.ghost_profile(slot)
        player["ghost_slot"] = int(slot)
        player["speed"] = float(profile["speed"])
        player["tag_radius"] = float(profile["tag_radius"])

    def set_ghost_profile(self, slot: int, speed=None, tag_radius=None):
        profile = self.state.set_ghost_profile(slot, speed=speed, tag_radius=tag_radius)
        if profile is None:
            return False, f"invalid ghost slot {slot}"

        live_ghost = self.state.players.get(f"ghost:{int(slot)}")
        if live_ghost is not None:
            self._apply_ghost_profile(int(slot), live_ghost)
        return True, (
            f"ghost {int(slot)} traits -> speed {profile['speed']:.2f}, "
            f"tag radius {profile['tag_radius']:.1f}"
        )

    def _spawn_pose_for_slot(self, slot_index: int):
        positions = self.state.spawn_positions
        x, y = positions[slot_index] if slot_index < len(positions) else (0.0, 0.0)
        angle = SPAWN_ANGLES[slot_index] if slot_index < len(SPAWN_ANGLES) else 0.0
        return x, y, angle

    # Move current humans back into the lobby instead of clearing them from the session.
    def return_players_to_lobby(self):
        human_addrs = self._human_addrs()
        existing_players = list(self.state.players.items())
        for _, player in existing_players:
            if player["player_id"] > 0:
                self.write_queue.put({"op": "del", "key": f"player:{player['player_id']}"})

        self.state.reset_match_runtime(arm_lockout=False)
        self.state.reset_slot_modes()
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))

        for queue_slot, key in enumerate(human_addrs):
            player = self.state.players[key]
            udp_addr = player.get("_addr") or key
            lobby_x, lobby_y, lobby_angle = self._spawn_pose_for_slot(queue_slot)
            player["player_id"] = 0
            player["x"] = lobby_x
            player["y"] = lobby_y
            player["angle"] = lobby_angle
            player["flags"] = 0
            player["last_seq"] = None
            player["timed_out"] = False
            player["preferred_role"] = player.get("preferred_role", ROLE_ANY)
            player["control_mode"] = self.state.slot_modes.get(player.get("board_slot", queue_slot + 1), "manual")
            self.state.pending_roles[key] = player["preferred_role"]
            self._send_ack(udp_addr, 0)
            self._send_map(udp_addr)
            self._send_bits_init(udp_addr)
            self._send_control_mode(udp_addr, player)

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
            self._apply_ghost_profile(self._ghost_slot_for_player(player), player)

        self.state.next_id = max(
            (player["player_id"] for player in self.state.players.values()),
            default=0,
        ) + 1

    # Promote queued lobby humans into an active match, optionally alongside loaded ghosts.
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

        runner_p = self.state.players[runner_addr]
        runner_udp = runner_p.get("_addr") or runner_addr
        runner_p["player_id"] = 1
        self._send_ack(runner_udp, 1)
        self._send_map(runner_udp)
        self._send_bits_init(runner_udp)
        self._send_control_mode(runner_udp, runner_p)
        print(f"[T2] assigned RUNNER(1) to {runner_addr}")

        if tagger_addr:
            tagger_p = self.state.players[tagger_addr]
            tagger_udp = tagger_p.get("_addr") or tagger_addr
            tagger_p["player_id"] = 2
            self._send_ack(tagger_udp, 2)
            self._send_map(tagger_udp)
            self._send_bits_init(tagger_udp)
            self._send_control_mode(tagger_udp, tagger_p)
            print(f"[T2] assigned TAGGER(2) to {tagger_addr}")

        self.state.pending_roles = {}
        self.state.next_id = max(
            (player["player_id"] for player in self.state.players.values()),
            default=0,
        ) + 1
        self.state.set_spawn_positions(self.map_state.get("spawn_positions", []))

        bits = self.map_state.get("bits", [])
        if bits:
            self.state.game_mode  = GAME_MODE_CHASE_BITS
            self.state.bits       = [[x, y, True] for x, y in bits]
            self.state.bits_mask  = (1 << len(bits)) - 1
        else:
            self.state.game_mode = GAME_MODE_CHASE
            self.state.bits = []
            self.state.bits_mask = 0

        self.state.match_started = True
        self.state.match_tick    = 0
        self.state.reset_positions()
        self._on_match_start()
        if participant_count == 1:
            return True, "single-player match started"
        return True, "match started"

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

    # Update the desired runtime mode for one stable board slot and notify it if connected.
    def set_node_mode(self, board_slot: int, mode: str):
        target_slot = int(board_slot)
        requested_mode = str(mode).lower()
        if requested_mode == "auto":
            target_mode = "auto"
        elif requested_mode == "replay":
            target_mode = "replay"
        else:
            target_mode = "manual"
        self.state.slot_modes[target_slot] = target_mode
        key = self._addr_for_board_slot(target_slot)
        if key is None:
            print(f"[T2] node mode stored for board slot {target_slot} -> {target_mode} (offline)")
            return False, f"board {target_slot} {target_mode} stored for next reconnect"
        player = self.state.players[key]
        player["control_mode"] = target_mode
        udp_addr = player.get("_addr") or key
        self._send_control_mode(udp_addr, player)
        print(f"[T2] node mode set for board slot {target_slot} -> {target_mode}")
        return True, f"board {target_slot} -> {target_mode}"

    # Create a ghost tagger entry in players — driven by CoreLogic, not UDP packets
    def _spawn_ghost(self):
        ghost_count = sum(1 for a in self.state.players if str(a).startswith("ghost:"))
        if ghost_count >= MAX_GHOSTS:
            return
        import math
        ghost_slot = ghost_count + 1
        ghost_addr = f"ghost:{ghost_slot}"
        used_ids   = {player["player_id"] for player in self.state.players.values()}
        ghost_id   = 3
        while ghost_id in used_ids:
            ghost_id += 1
        angle      = math.pi / 2
        spawn_positions = self.state.spawn_positions
        x, y = spawn_positions[ghost_id - 1] if ghost_id - 1 < len(spawn_positions) else (0.0, 0.0)
        ghost = {
            "player_id":        ghost_id,
            "x":                x, "y":  y, "angle": angle,
            "flags":            FLAG_GHOST,
            "last_seen":        time.monotonic(),
            "last_seq":         None,
            "movement_mode":    0,
            "protocol_version": 0,
            "timed_out":        False,
            "board_slot":       None,
            "control_mode":     "",
            "username":         "",
            "display_name":     f"ghost-{ghost_id}",
            "profile_key":      "",
            "controller_key":   "",
            "identity_source":  "ghost",
        }
        self._apply_ghost_profile(ghost_slot, ghost)
        self.state.players[ghost_addr] = ghost
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
    def _send_map(self, addr, map_state=None):
        if self.udp_transport is None:
            return
        ms = map_state or self.map_state
        if not ms.get("tiles"):
            return
        pkt = pack_map_packet(0, ms["width"], ms["height"], ms["tile_scale"], ms["tiles"])
        try:
            self.udp_transport.sendto(pkt, addr)
            print(f"[T2] sent PKT_MAP ({ms['name']}) to {addr} ({len(pkt)} bytes)")
        except Exception as e:
            print(f"[T2] failed to send PKT_MAP to {addr}: {e}")

    # Send PKT_BITS_INIT so the node knows the current bit layout — including zero bits.
    def _send_bits_init(self, addr, bits=None):
        if self.udp_transport is None:
            return
        bits_payload = self.map_state.get("bits", []) if bits is None else bits
        pkt = pack_bits_init_packet(0, bits_payload)
        try:
            self.udp_transport.sendto(pkt, addr)
            print(f"[T2] sent PKT_BITS_INIT ({len(bits_payload)} bits) to {addr}")
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
            in_lobby = not self.state.match_started or self.state.match_ended
            timeout = LOBBY_TIMEOUT_S if in_lobby else NODE_TIMEOUT_S
            if now - p["last_seen"] <= timeout:
                continue
            if in_lobby:
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
                  f"— no packets for {LOBBY_TIMEOUT_S:.0f}s")
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
