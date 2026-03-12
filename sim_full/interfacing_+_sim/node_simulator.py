#!/usr/bin/env python3
# node_simulator.py — fake PYNQ node for testing without hardware.
#
# State machine: CONNECTED (send position @ 20 Hz) ↔ DISCONNECTED/REJOINING.
# The simulator now auto-registers into the lobby on launch; explicit reconnect
# controls are only needed when the operator wants to drop a node manually.
# Usage: python3 node_simulator.py <server_ip> [port] --nodes N --node-index I --username sim

import socket
import struct
import time
import math
import argparse
import threading
import json
import sys
import select
from pathlib import Path
try:
    import redis as redislib
except ImportError:
    redislib = None
try:
    import termios
    import tty
except ImportError:
    termios = None
    tty = None

from protocol import (
    # constants
    HEADER_SIZE, PKT_ACK, PKT_GAME_STATE, PKT_REGISTER,
    MOVEMENT_MODE_INTENT_WITH_PREDICTION,
    FLAG_SHOOTING, FLAG_TAGGED, FLAG_MATCH_END,
    # functions
    client_input_flags, decode_flag_names, decode_movement_mode,
    pack_node_packet, pack_register_packet, unpack_header, unpack_server_packet,
)

# How long to wait after restart signal before re-registering.
# Must exceed server's MATCH_END_HOLD_S (0.5s) + LOCKOUT_S (0.5s).
RESTART_DELAY_S = 1.5
MAP_CHANGE_REJOIN_DELAY_S = 0.25

TICK_HZ      = 20
TICK_INTERVAL = 1.0 / TICK_HZ
ARENA_RADIUS = 50.0
ORBIT_RUNNER_ROTATION_SPEED = 0.06
ORBIT_TAGGER_ROTATION_SPEED = 0.10
ORBIT_FALLBACK_ROTATION_SPEED = 0.08
MAP_ROTATION_SPEED_BASE = 0.05
MAP_ROTATION_SPEED_STEP = 0.06
MANUAL_TURN_STEP = 0.2
MANUAL_MOVE_STEP = 4.0
MAP_TILE_SCALE = 8
PLAYER_COLLISION_RADIUS = 2.5
SPAWN_CLEARANCE_RADIUS = 3.25
DEFAULT_MAP_NAME = ""
ORBIT_TEST_MAP_NAME = "orbit_test"
LOBBY_MAP_NAME = "__lobby__"
MAPS_DIR = Path(__file__).resolve().parents[2] / "pynq_full" / "ec2" / "maps"
SPAWN_ANGLES = [0.0, math.pi, math.pi / 2, 3 * math.pi / 2, math.pi / 4]
AUTHORITATIVE_STATE_TIMEOUT_S = 0.4
SPAWN_MARKERS = {str(index): index - 1 for index in range(1, 6)}


def load_local_map(name: str):
    if not name or name == LOBBY_MAP_NAME:
        return {
            "name": LOBBY_MAP_NAME,
            "width": 32,
            "height": 32,
            "tile_scale": MAP_TILE_SCALE,
            "tiles": bytearray(
                1 if row in (0, 31) or col in (0, 31) else 0
                for row in range(32)
                for col in range(32)
            ),
            "spawn_positions": [
                (-56.0, -56.0),
                (56.0, 56.0),
                (-56.0, 56.0),
                (56.0, -56.0),
                (0.0, 0.0),
            ],
        }
    if name == ORBIT_TEST_MAP_NAME:
        return build_orbit_test_map()
    path = MAPS_DIR / f"{name}.txt"
    rows = []
    try:
        with open(path) as handle:
            for line in handle:
                line = line.rstrip("\r\n")
                if line:
                    rows.append(line)
    except OSError as exc:
        print(f"[node-map] failed to load {path}: {exc}")
        return {"name": name, "width": 0, "height": 0, "tile_scale": MAP_TILE_SCALE, "tiles": bytearray()}

    width = len(rows[0]) if rows else 0
    height = len(rows)
    tiles = bytearray()
    spawn_anchors = [None] * len(SPAWN_MARKERS)
    for row_idx, row in enumerate(rows):
        for col_idx, cell in enumerate(row):
            tiles.append(1 if cell == "#" else 0)
            if cell in SPAWN_MARKERS:
                spawn_anchors[SPAWN_MARKERS[cell]] = (col_idx, row_idx)
    spawn_positions = build_spawn_positions(width, height, tiles, MAP_TILE_SCALE, spawn_anchors)
    return {
        "name": name,
        "width": width,
        "height": height,
        "tile_scale": MAP_TILE_SCALE,
        "tiles": tiles,
        "spawn_positions": spawn_positions,
    }


def desired_runtime_from_game_state(game_state: dict, current_selected_map: str):
    desired_view = "orbit" if str(game_state.get("sim_view_mode", "map")).lower() == "orbit" else "map"
    selected_map = str(game_state.get("selected_map") or "").strip()
    if not selected_map:
        fallback_map = str(game_state.get("map") or "").strip()
        if fallback_map and fallback_map != ORBIT_TEST_MAP_NAME:
            selected_map = fallback_map
    return desired_view, (selected_map or current_selected_map)


def orbit_rotation_speed_for_player(player_id: int | None, node_index: int) -> float:
    if player_id == 1:
        return ORBIT_RUNNER_ROTATION_SPEED
    if player_id == 2:
        return ORBIT_TAGGER_ROTATION_SPEED
    if node_index == 0:
        return ORBIT_RUNNER_ROTATION_SPEED
    if node_index == 1:
        return ORBIT_TAGGER_ROTATION_SPEED
    return ORBIT_FALLBACK_ROTATION_SPEED


def build_orbit_test_map():
    width = 32
    height = 32
    return {
        "name": ORBIT_TEST_MAP_NAME,
        "width": width,
        "height": height,
        "tile_scale": MAP_TILE_SCALE,
        "tiles": bytearray(width * height),
        "spawn_positions": [
            (
                round(ARENA_RADIUS * math.cos(angle), 2),
                round(ARENA_RADIUS * math.sin(angle), 2),
            )
            for angle in SPAWN_ANGLES
        ],
    }


def cell_to_world(col: int, row: int, width: int, height: int, tile_scale: int):
    return (
        (col - width / 2.0 + 0.5) * tile_scale,
        (row - height / 2.0 + 0.5) * tile_scale,
    )


def _cell_open_score(width: int, height: int, tiles: bytearray, col: int, row: int) -> int:
    score = 0
    for row_off in (-1, 0, 1):
        for col_off in (-1, 0, 1):
            if row_off == 0 and col_off == 0:
                continue
            next_row = row + row_off
            next_col = col + col_off
            if next_row < 0 or next_col < 0 or next_row >= height or next_col >= width:
                continue
            if tiles[next_row * width + next_col] == 0:
                score += 1
    return score


def _default_spawn_anchors(width: int, height: int):
    low_col = min(width - 2, max(1, int(round((width - 1) * 0.25))))
    high_col = min(width - 2, max(1, (width - 1) - low_col))
    low_row = min(height - 2, max(1, int(round((height - 1) * 0.25))))
    high_row = min(height - 2, max(1, (height - 1) - low_row))
    return [
        (low_col, low_row),
        (high_col, high_row),
        (low_col, high_row),
        (high_col, low_row),
        (width // 2, height // 2),
    ]


def build_spawn_positions(width: int, height: int, tiles: bytearray, tile_scale: int,
                          spawn_anchors=None):
    if width <= 0 or height <= 0 or not tiles:
        return []

    anchors = _default_spawn_anchors(width, height)
    if spawn_anchors:
        for index, anchor in enumerate(spawn_anchors[:len(anchors)]):
            if anchor is not None:
                anchors[index] = anchor
    clearance_radius = max(tile_scale * 0.75, PLAYER_COLLISION_RADIUS + 0.5, SPAWN_CLEARANCE_RADIUS)
    used = set()
    positions = []
    for anchor_col, anchor_row in anchors:
        best = None
        best_fallback = None
        max_radius = max(width, height)
        for radius in range(max_radius + 1):
            row_min = max(0, anchor_row - radius)
            row_max = min(height - 1, anchor_row + radius)
            col_min = max(0, anchor_col - radius)
            col_max = min(width - 1, anchor_col + radius)
            for row in range(row_min, row_max + 1):
                for col in range(col_min, col_max + 1):
                    if abs(col - anchor_col) != radius and abs(row - anchor_row) != radius:
                        continue
                    if (col, row) in used:
                        continue
                    if tiles[row * width + col]:
                        continue
                    dist_sq = (col - anchor_col) ** 2 + (row - anchor_row) ** 2
                    open_score = _cell_open_score(width, height, tiles, col, row)
                    candidate = (open_score, -dist_sq, col, row)
                    if best_fallback is None or candidate > best_fallback:
                        best_fallback = candidate
                    world_x, world_y = cell_to_world(col, row, width, height, tile_scale)
                    if not is_walkable(
                        {
                            "width": width,
                            "height": height,
                            "tile_scale": tile_scale,
                            "tiles": tiles,
                        },
                        world_x,
                        world_y,
                        clearance_radius,
                    ):
                        continue
                    if best is None or candidate > best:
                        best = candidate
            if best is not None:
                break
        chosen = best or best_fallback
        if chosen is None:
            positions.append((0.0, 0.0))
            continue
        used.add((chosen[2], chosen[3]))
        positions.append(cell_to_world(chosen[2], chosen[3], width, height, tile_scale))
    return positions


def is_walkable(map_state: dict, x: float, y: float, radius: float = PLAYER_COLLISION_RADIUS) -> bool:
    width = map_state.get("width", 0)
    height = map_state.get("height", 0)
    tile_scale = map_state.get("tile_scale", MAP_TILE_SCALE)
    tiles = map_state.get("tiles", bytearray())
    if width <= 0 or height <= 0 or not tiles:
        return True

    offsets = [(0.0, 0.0)]
    if radius > 0.0:
        offsets.extend([
            (radius, 0.0), (-radius, 0.0),
            (0.0, radius), (0.0, -radius),
            (radius, radius), (radius, -radius),
            (-radius, radius), (-radius, -radius),
        ])

    for dx, dy in offsets:
        col = int(math.floor(((x + dx) / tile_scale) + (width / 2.0)))
        row = int(math.floor(((y + dy) / tile_scale) + (height / 2.0)))
        if col < 0 or row < 0 or col >= width or row >= height:
            return False
        if tiles[row * width + col]:
            return False
    return True


def resolve_move(map_state: dict, current_x: float, current_y: float, desired_x: float, desired_y: float):
    if is_walkable(map_state, desired_x, desired_y):
        return desired_x, desired_y
    if is_walkable(map_state, desired_x, current_y):
        return desired_x, current_y
    if is_walkable(map_state, current_x, desired_y):
        return current_x, desired_y
    if not is_walkable(map_state, current_x, current_y):
        return current_x, current_y

    low_x, low_y = current_x, current_y
    high_x, high_y = desired_x, desired_y
    for _ in range(10):
        mid_x = (low_x + high_x) / 2.0
        mid_y = (low_y + high_y) / 2.0
        if is_walkable(map_state, mid_x, mid_y):
            low_x, low_y = mid_x, mid_y
        else:
            high_x, high_y = mid_x, mid_y
    return low_x, low_y


def spawn_pose(map_state: dict, node_index: int, radius: float):
    positions = map_state.get("spawn_positions", [])
    if node_index < len(positions):
        angle = SPAWN_ANGLES[node_index] if node_index < len(SPAWN_ANGLES) else 0.0
        x, y = positions[node_index]
        return x, y, angle
    angle = node_index * math.pi * 2 / 4
    return radius * math.cos(angle), radius * math.sin(angle), angle


class ManualController:
    # Non-blocking arrow-key reader for one simulator process

    def __init__(self):
        if termios is None or tty is None or not sys.stdin.isatty():
            raise RuntimeError("manual mode requires a real TTY on a Unix-like terminal")
        self.fd = sys.stdin.fileno()
        self._old_attrs = None

    def enable(self):
        if self._old_attrs is None:
            self._old_attrs = termios.tcgetattr(self.fd)
            tty.setcbreak(self.fd)
        return self

    def disable(self):
        if self._old_attrs is not None:
            termios.tcsetattr(self.fd, termios.TCSADRAIN, self._old_attrs)
            self._old_attrs = None

    def read_actions(self):
        actions = []
        while True:
            ready, _, _ = select.select([sys.stdin], [], [], 0)
            if not ready:
                break
            ch = sys.stdin.read(1)
            if ch == "\x1b":
                seq = ch + sys.stdin.read(1) + sys.stdin.read(1)
                mapping = {
                    "\x1b[A": "forward",
                    "\x1b[B": "backward",
                    "\x1b[C": "turn_right",
                    "\x1b[D": "turn_left",
                }
                action = mapping.get(seq)
                if action:
                    actions.append(action)
            elif ch == " ":
                actions.append("shoot")
        return actions


def apply_manual_actions(x, y, angle, actions, map_state):
    shoot_now = False
    for action in actions:
        if action == "turn_left":
            angle -= MANUAL_TURN_STEP
        elif action == "turn_right":
            angle += MANUAL_TURN_STEP
        elif action == "forward":
            desired_x = x + MANUAL_MOVE_STEP * math.cos(angle)
            desired_y = y + MANUAL_MOVE_STEP * math.sin(angle)
            x, y = resolve_move(map_state, x, y, desired_x, desired_y)
        elif action == "backward":
            desired_x = x - MANUAL_MOVE_STEP * math.cos(angle)
            desired_y = y - MANUAL_MOVE_STEP * math.sin(angle)
            x, y = resolve_move(map_state, x, y, desired_x, desired_y)
        elif action == "shoot":
            shoot_now = True
    return x, y, angle, shoot_now


def normalize_mode(mode: str):
    return "auto" if mode == "scripted" else mode


def apply_control_command(tag: str, command: dict, current_mode: str, node_index: int):
    target_index = command.get("node_index")
    if target_index is not None:
        try:
            if int(target_index) != node_index:
                return current_mode, None, None, None
        except (TypeError, ValueError):
            return current_mode, None, None, None

    cmd = command.get("cmd")
    if cmd == "set_mode":
        requested = normalize_mode(str(command.get("mode", "")).lower())
        if requested in ("auto", "manual") and requested != current_mode:
            print(f"{tag} mode switch requested: {current_mode} -> {requested}")
            return requested, None, None, None
    elif cmd == "restart":
        return current_mode, "restart", None, None
    elif cmd == "disconnect":
        return current_mode, "disconnect", None, None
    elif cmd == "reconnect":
        return current_mode, "reconnect", None, None
    elif cmd == "set_map":
        return current_mode, None, str(command.get("map", DEFAULT_MAP_NAME)), None
    elif cmd == "set_sim_view":
        requested_view = str(command.get("view", "map")).lower()
        return current_mode, None, None, ("orbit" if requested_view == "orbit" else "map")
    return current_mode, None, None, None


def run_node(server_ip, server_port, player_id, node_index,
             redis_host, redis_port, max_ticks=None, mode="auto", username=""):
    server_addr = (server_ip, server_port)

    radius         = ARENA_RADIUS
    map_rotation_speed = MAP_ROTATION_SPEED_BASE + node_index * MAP_ROTATION_SPEED_STEP
    shoot_freq     = 20  + node_index * 10
    selected_map_name = DEFAULT_MAP_NAME
    sim_view_mode = "map"
    current_map_name = selected_map_name
    map_state = load_local_map(current_map_name)
    x, y, angle = spawn_pose(map_state, node_index, radius)
    orbit_phase = math.atan2(y, x) if abs(x) > 0.01 or abs(y) > 0.01 else angle

    tag = f"[NODE {player_id}]"

    ps = None  # Redis pub/sub (optional)
    rc = None
    if redislib:
        try:
            rc = redislib.Redis(host=redis_host, port=redis_port,
                                decode_responses=True)
            rc.ping()
            ps = rc.pubsub(ignore_subscribe_messages=True)
            ps.subscribe("game:control")
            print(f"{tag} subscribed to game:control ({redis_host}:{redis_port})")
        except Exception as e:
            print(f"{tag} Redis unavailable ({e}) — dashboard reconnect/mode controls disabled")
            ps = None

    sock    = None
    playing = False
    rejoin_at = time.monotonic()
    assigned_player_id = None
    have_authoritative_state = False
    last_authoritative_state_at = 0.0
    seq               = 0
    tick              = 0
    normalized_mode = normalize_mode(mode)
    manual_controller = None
    if normalized_mode == "manual":
        manual_controller = ManualController()
        manual_controller.enable()

    def switch_mode(next_mode: str):
        nonlocal normalized_mode, manual_controller
        if next_mode == normalized_mode:
            return
        if next_mode == "manual":
            try:
                manual_controller = ManualController()
                manual_controller.enable()
                print(f"{tag} manual mode: arrows move/turn, space shoots")
                normalized_mode = "manual"
            except Exception as exc:
                print(f"{tag} manual mode unavailable: {exc}")
                normalized_mode = "auto"
                manual_controller = None
        else:
            if manual_controller:
                manual_controller.disable()
                manual_controller = None
            normalized_mode = "auto"

    def load_runtime_map():
        nonlocal current_map_name, map_state, x, y, angle, orbit_phase
        current_map_name = ORBIT_TEST_MAP_NAME if sim_view_mode == "orbit" else selected_map_name
        map_state = load_local_map(current_map_name)
        x, y, angle = spawn_pose(map_state, node_index, radius)
        orbit_phase = math.atan2(y, x) if abs(x) > 0.01 or abs(y) > 0.01 else angle

    def load_selected_map(next_map: str):
        nonlocal selected_map_name
        nonlocal have_authoritative_state, last_authoritative_state_at
        selected_map_name = next_map
        load_runtime_map()
        have_authoritative_state = False
        last_authoritative_state_at = 0.0

    def switch_sim_view(next_view: str):
        nonlocal sim_view_mode
        nonlocal have_authoritative_state, last_authoritative_state_at
        target_view = "orbit" if next_view == "orbit" else "map"
        if target_view == sim_view_mode:
            return False
        sim_view_mode = target_view
        load_runtime_map()
        have_authoritative_state = False
        last_authoritative_state_at = 0.0
        print(f"{tag} sim view switched to {sim_view_mode}")
        return True

    def schedule_rejoin(delay_s: float, reason: str):
        nonlocal playing, rejoin_at, assigned_player_id
        nonlocal have_authoritative_state, last_authoritative_state_at
        playing = False
        rejoin_at = time.monotonic() + delay_s
        assigned_player_id = None
        have_authoritative_state = False
        last_authoritative_state_at = 0.0
        print(f"{tag} {reason} — rejoining in {delay_s:.2f}s...")

    def disconnect_node(reason: str):
        nonlocal playing, rejoin_at, assigned_player_id
        nonlocal have_authoritative_state, last_authoritative_state_at
        playing = False
        rejoin_at = None
        assigned_player_id = None
        have_authoritative_state = False
        last_authoritative_state_at = 0.0
        print(f"{tag} {reason} — disconnected")

    def sync_runtime_from_redis():
        nonlocal selected_map_name
        if rc is None:
            return False
        try:
            game_state = rc.hgetall("game:state")
        except Exception:
            return False
        if not game_state:
            return False

        desired_view, desired_map = desired_runtime_from_game_state(game_state, selected_map_name)
        changed = False
        if desired_map != selected_map_name:
            load_selected_map(desired_map)
            changed = True
        if desired_view != sim_view_mode:
            changed = switch_sim_view(desired_view) or changed
        return changed

    try:
        if manual_controller:
            print(f"{tag} manual mode: arrows move/turn, space shoots")
        while True:
            sync_runtime_from_redis()
            # ── DISCONNECTED / REJOINING ─────────────────────────────────────
            if not playing:
                if ps:
                    while True:
                        msg = ps.get_message()
                        if not msg:
                            break
                        if msg["type"] != "message":
                            continue
                        try:
                            command = json.loads(msg["data"])
                        except Exception:
                            continue
                        next_mode, lifecycle_cmd, next_map, next_view = apply_control_command(tag, command, normalized_mode, node_index)
                        switch_mode(next_mode)
                        if next_map:
                            load_selected_map(next_map)
                            print(f"{tag} map selected as {selected_map_name}")
                        if next_view:
                            switch_sim_view(next_view)
                        if lifecycle_cmd == "restart":
                            rejoin_at = time.monotonic() + RESTART_DELAY_S
                            print(f"{tag} restart received — rejoining in {RESTART_DELAY_S}s...")
                        elif lifecycle_cmd == "reconnect":
                            rejoin_at = time.monotonic()
                            print(f"{tag} reconnect received — joining lobby now")
                        elif lifecycle_cmd == "disconnect":
                            rejoin_at = None
                            print(f"{tag} disconnect received — waiting for reconnect")
                elif rejoin_at is None:
                    print(f"{tag} no Redis — disconnected until process restart")
                    while True:
                        time.sleep(1)

                if rejoin_at is None:
                    time.sleep(0.1)
                    continue
                if time.monotonic() < rejoin_at:
                    time.sleep(0.1)
                    continue

                if sock:
                    sock.close()
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                sock.settimeout(0.05)
                x, y, angle = spawn_pose(map_state, node_index, radius)
                orbit_phase = math.atan2(y, x) if abs(x) > 0.01 or abs(y) > 0.01 else angle
                pkt = pack_register_packet(
                    seq=0,
                    x=x, y=y, angle=angle, flags=0,
                    movement_mode=MOVEMENT_MODE_INTENT_WITH_PREDICTION,
                    username=username,
                )
                sock.sendto(pkt, server_addr)
                identity_note = f" username={username}" if username else ""
                print(f"{tag} REGISTER sent at ({x:.1f},{y:.1f}){identity_note}")
                seq     = 1
                tick    = 0
                playing = True
                rejoin_at = None
                assigned_player_id = None
                have_authoritative_state = False
                last_authoritative_state_at = 0.0

            # ── PLAYING: one tick ─────────────────────────────────────────────
            tick_start = time.time()

            if ps:
                while True:
                    msg = ps.get_message()
                    if not msg:
                        break
                    if msg["type"] != "message":
                        continue
                    try:
                        command = json.loads(msg["data"])
                    except Exception:
                        continue
                    next_mode, lifecycle_cmd, next_map, next_view = apply_control_command(tag, command, normalized_mode, node_index)
                    switch_mode(next_mode)
                    if next_map:
                        load_selected_map(next_map)
                        schedule_rejoin(MAP_CHANGE_REJOIN_DELAY_S, f"map selected as {selected_map_name}")
                        break
                    if next_view and switch_sim_view(next_view):
                        schedule_rejoin(MAP_CHANGE_REJOIN_DELAY_S, f"sim view changed to {sim_view_mode}")
                        break
                    if lifecycle_cmd == "restart":
                        schedule_rejoin(RESTART_DELAY_S, "restart received")
                        break
                    if lifecycle_cmd == "reconnect":
                        schedule_rejoin(0.0, "reconnect received")
                        break
                    if lifecycle_cmd == "disconnect":
                        disconnect_node("disconnect received")
                        break

            if playing and sync_runtime_from_redis():
                schedule_rejoin(MAP_CHANGE_REJOIN_DELAY_S, "runtime state changed via Redis snapshot")

            # receive all queued broadcasts
            while playing:
                try:
                    data, _ = sock.recvfrom(1024)
                    pkt_type, _, _ = unpack_header(data)
                    if pkt_type == PKT_ACK and len(data) >= HEADER_SIZE + 1:
                        assigned_player_id = struct.unpack_from('<B', data, HEADER_SIZE)[0]
                        print(f"{tag} assigned server player_id={assigned_player_id}")
                        if assigned_player_id == 0:
                            x, y, angle = spawn_pose(map_state, node_index, radius)
                            orbit_phase = math.atan2(y, x) if abs(x) > 0.01 or abs(y) > 0.01 else angle
                            have_authoritative_state = False
                            last_authoritative_state_at = 0.0
                        continue
                    if pkt_type == PKT_GAME_STATE:
                        _, _, _, _, players, _ = unpack_server_packet(data)
                        active_player_id = (
                            assigned_player_id
                            if assigned_player_id is not None and assigned_player_id > 0
                            else None
                        )
                        for p in players:
                            state_names = ",".join(
                                decode_flag_names(p["flags"], direction="server_to_client")
                            ) or "none"
                            if active_player_id is not None and p["player_id"] == active_player_id:
                                x = p["x"]
                                y = p["y"]
                                angle = p["angle"]
                                if sim_view_mode == "orbit" and (abs(x) > 0.01 or abs(y) > 0.01):
                                    orbit_phase = math.atan2(y, x)
                                have_authoritative_state = True
                                last_authoritative_state_at = time.monotonic()
                            if active_player_id is not None and p["player_id"] == active_player_id and p["flags"] & FLAG_MATCH_END:
                                print(f"{tag} P{p['player_id']} state={state_names} — awaiting lobby return")
                            elif active_player_id is not None and p["player_id"] == active_player_id and p["flags"] & FLAG_TAGGED:
                                print(f"{tag} P{p['player_id']} state={state_names}")
                except socket.timeout:
                    break
                except Exception as e:
                    print(f"{tag} recv error: {e}")
                    break

            if not playing:
                sock.close()
                sock = None
                continue

            if (
                have_authoritative_state
                and time.monotonic() - last_authoritative_state_at > AUTHORITATIVE_STATE_TIMEOUT_S
            ):
                have_authoritative_state = False

            # send position update
            if not have_authoritative_state and assigned_player_id != 0:
                input_flags = 0
            elif normalized_mode == "manual":
                actions = manual_controller.read_actions() if manual_controller else []
                x, y, angle, shoot_now = apply_manual_actions(x, y, angle, actions, map_state)
                input_flags = client_input_flags(shooting=shoot_now)
            elif sim_view_mode == "orbit":
                orbit_rotation_speed = orbit_rotation_speed_for_player(assigned_player_id, node_index)
                orbit_phase = (orbit_phase + orbit_rotation_speed) % (math.pi * 2.0)
                x = radius * math.cos(orbit_phase)
                y = radius * math.sin(orbit_phase)
                angle = orbit_phase + (math.pi / 2.0)
                input_flags = client_input_flags(shooting=(tick % shoot_freq == 0))
            else:
                move_speed = radius * map_rotation_speed
                desired_x = x + move_speed * math.cos(angle)
                desired_y = y + move_speed * math.sin(angle)
                next_x, next_y = resolve_move(map_state, x, y, desired_x, desired_y)
                if next_x == x and next_y == y:
                    angle += map_rotation_speed * 2.5
                    desired_x = x + move_speed * math.cos(angle)
                    desired_y = y + move_speed * math.sin(angle)
                    next_x, next_y = resolve_move(map_state, x, y, desired_x, desired_y)
                x, y = next_x, next_y
                input_flags = client_input_flags(shooting=(tick % shoot_freq == 0))

            pkt = pack_node_packet(
                0x0001, seq=seq, x=x, y=y, angle=angle, flags=input_flags,
                movement_mode=MOVEMENT_MODE_INTENT_WITH_PREDICTION,
            )
            sock.sendto(pkt, server_addr)

            if tick % TICK_HZ == 0:
                input_names = ",".join(
                    decode_flag_names(input_flags, direction="client_to_server")
                ) or "none"
                print(f"{tag} tick={tick:4d} seq={seq:5d} "
                      f"pos=({x:7.2f},{y:7.2f}) angle={angle:7.3f} "
                      f"input={input_names} movement={decode_movement_mode(MOVEMENT_MODE_INTENT_WITH_PREDICTION)} "
                      f"mode={normalized_mode}")

            seq  = (seq + 1) & 0xFFFF
            tick += 1

            if max_ticks and tick >= max_ticks:
                print(f"{tag} max_ticks {max_ticks} reached, stopping")
                break

            elapsed = time.time() - tick_start
            sleep   = max(0.0, TICK_INTERVAL - elapsed)
            if sleep:
                time.sleep(sleep)

    except KeyboardInterrupt:
        print(f"\n{tag} interrupted")
    finally:
        if manual_controller:
            manual_controller.disable()
        if sock:
            sock.close()
        if ps:
            ps.close()
        print(f"{tag} stopped at tick {tick}")


def main():
    parser = argparse.ArgumentParser(description="Simulate PYNQ nodes (UDP clients)")
    parser.add_argument("server_ip")
    parser.add_argument("port",       nargs="?", type=int, default=9000)
    parser.add_argument("max_ticks",  nargs="?", type=int, default=None)
    parser.add_argument("--nodes",      "-n", type=int, default=1)
    parser.add_argument("--node-index",       type=int, default=None,
                        help="Override node_index (default: 0,1,2... per node)")
    parser.add_argument("--player-id",  "-p", type=int, default=1,
                        help="Starting player_id label (local only)")
    parser.add_argument("--redis-host",       default="127.0.0.1")
    parser.add_argument("--redis-port",       type=int, default=6380)
    parser.add_argument("--mode",             choices=["auto", "manual", "scripted"],
                        default="auto")
    parser.add_argument("--username",         default="",
                        help="Optional simulator display name; with --nodes >1 this becomes base-1, base-2, ...")
    args = parser.parse_args()

    if args.mode == "manual" and args.nodes != 1:
        parser.error("--mode manual requires --nodes 1 (one terminal controls one node)")

    if args.mode == "scripted":
        args.mode = "auto"

    print(f"server={args.server_ip}:{args.port}  nodes={args.nodes}  "
          f"redis={args.redis_host}:{args.redis_port}  "
          f"max_ticks={args.max_ticks or 'unlimited'}  "
          f"mode={args.mode}")

    threads = []
    for i in range(args.nodes):
        t = threading.Thread(
            target=run_node,
            kwargs=dict(
                server_ip   = args.server_ip,
                server_port = args.port,
                player_id   = args.player_id + i,
                node_index  = args.node_index if args.node_index is not None else i,
                redis_host  = args.redis_host,
                redis_port  = args.redis_port,
                max_ticks   = args.max_ticks,
                mode        = args.mode,
                username    = (
                    f"{args.username}-{i + 1}" if args.username and args.nodes > 1 else args.username
                ),
            ),
            daemon=False,
        )
        threads.append(t)
        t.start()

    try:
        for t in threads:
            t.join()
    except KeyboardInterrupt:
        print("\nshutting down...")


if __name__ == "__main__":
    main()
