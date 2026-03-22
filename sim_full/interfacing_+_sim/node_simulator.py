#!/usr/bin/env python3
# node_simulator.py — fake PYNQ node for testing without hardware.
#
# State machine: CONNECTED (send position @ 60 Hz) ↔ DISCONNECTED/REJOINING.
# The simulator now auto-registers into the lobby on launch; explicit reconnect
# controls are only needed when the operator wants to drop a node manually.
# Usage: python3 node_simulator.py <server_ip> [port] --nodes N --node-index I --username sim

import os
import queue
import socket
import struct
import time
import math
import heapq
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
    HEADER_SIZE, PKT_ACK, PKT_GAME_STATE, PKT_MAP, PKT_REGISTER,
    GAME_MODE_CHASE, GAME_MODE_CHASE_BITS,
    MOVEMENT_MODE_INTENT_WITH_PREDICTION,
    FLAG_SHOOTING, FLAG_TAGGED, FLAG_MATCH_END,
    # functions
    client_input_flags, decode_flag_names, decode_movement_mode,
    pack_node_packet, pack_register_packet, unpack_header, unpack_map_packet, unpack_server_packet,
)

# How long to wait after restart signal before re-registering.
# Must exceed server's MATCH_END_HOLD_S (0.5s) + LOCKOUT_S (0.5s).
RESTART_DELAY_S = 1.5
MAP_CHANGE_REJOIN_DELAY_S = 0.25

BASE_TICK_HZ = 20
TICK_HZ      = 60
TICK_INTERVAL = 1.0 / TICK_HZ
ARENA_RADIUS = 50.0


def _scaled_linear_for_tick_rate(value: float, target_tick_hz: int, baseline_tick_hz: int = BASE_TICK_HZ) -> float:
    target = max(1, int(target_tick_hz))
    baseline = max(1, int(baseline_tick_hz))
    return float(value) * (baseline / target)


ORBIT_RUNNER_ROTATION_SPEED = _scaled_linear_for_tick_rate(0.06, TICK_HZ)
ORBIT_TAGGER_ROTATION_SPEED = _scaled_linear_for_tick_rate(0.10, TICK_HZ)
ORBIT_FALLBACK_ROTATION_SPEED = _scaled_linear_for_tick_rate(0.08, TICK_HZ)
MAP_ROTATION_SPEED_BASE = _scaled_linear_for_tick_rate(0.05, TICK_HZ)
MAP_ROTATION_SPEED_STEP = _scaled_linear_for_tick_rate(0.06, TICK_HZ)
MANUAL_TURN_STEP = _scaled_linear_for_tick_rate(0.2, TICK_HZ)
MANUAL_MOVE_STEP = _scaled_linear_for_tick_rate(4.0, TICK_HZ)
AUTO_TURN_STEP = _scaled_linear_for_tick_rate(0.22, TICK_HZ)
AUTO_RUNNER_SPEED = _scaled_linear_for_tick_rate(3.8, TICK_HZ)
AUTO_TAGGER_SPEED = _scaled_linear_for_tick_rate(4.6, TICK_HZ)
AUTO_FALLBACK_SPEED = _scaled_linear_for_tick_rate(3.4, TICK_HZ)
AUTO_RUNNER_EVADE_DISTANCE = 42.0
AUTO_TAGGER_SHOOT_RANGE = 26.0
AUTO_TAGGER_SHOOT_ARC = 0.4
MAP_TILE_SCALE = 8
PLAYER_COLLISION_RADIUS = 2.0
SPAWN_CLEARANCE_RADIUS = 3.25
DEFAULT_MAP_NAME = ""
ORBIT_TEST_MAP_NAME = "orbit_test"
LOBBY_MAP_NAME = "lobby"
MAPS_DIR = Path(__file__).resolve().parents[2] / "pynq_full" / "ec2" / "maps"
SPAWN_ANGLES = [0.0, math.pi, math.pi / 2, 3 * math.pi / 2, math.pi / 4]
AUTHORITATIVE_STATE_TIMEOUT_S = 0.4
SOCKET_RECV_SIZE = 4096
SPAWN_MARKERS = {str(index): index - 1 for index in range(1, 6)}


def load_local_map(name: str):
    if not name:
        name = LOBBY_MAP_NAME
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
        print(f"[node-map] waiting for server PKT_MAP for '{name}'")
        return {"name": name, "width": 0, "height": 0, "tile_scale": MAP_TILE_SCALE, "tiles": bytearray()}

    width = len(rows[0]) if rows else 0
    height = len(rows)
    tiles = bytearray()
    bits = []
    spawn_anchors = [None] * len(SPAWN_MARKERS)
    for row_idx, row in enumerate(rows):
        for col_idx, cell in enumerate(row):
            tiles.append(1 if cell == "#" else 0)
            if cell == "B":
                bits.append(cell_to_world(col_idx, row_idx, width, height, MAP_TILE_SCALE))
            if cell in SPAWN_MARKERS:
                spawn_anchors[SPAWN_MARKERS[cell]] = (col_idx, row_idx)
    spawn_positions = build_spawn_positions(width, height, tiles, MAP_TILE_SCALE, spawn_anchors)
    return {
        "name": name,
        "width": width,
        "height": height,
        "tile_scale": MAP_TILE_SCALE,
        "tiles": tiles,
        "bits": bits,
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


def parse_spawn_positions_from_game_state(game_state: dict):
    raw = game_state.get("spawn_positions")
    if not raw:
        return []
    try:
        decoded = json.loads(raw)
    except Exception:
        return []
    positions = []
    for item in decoded:
        if not isinstance(item, (list, tuple)) or len(item) < 2:
            continue
        try:
            positions.append((float(item[0]), float(item[1])))
        except (TypeError, ValueError):
            continue
    return positions


def parse_bits_from_game_state(game_state: dict):
    raw = game_state.get("bits")
    if not raw:
        return []
    try:
        decoded = json.loads(raw)
    except Exception:
        return []
    positions = []
    for item in decoded:
        if not isinstance(item, (list, tuple)) or len(item) < 2:
            continue
        try:
            positions.append((float(item[0]), float(item[1])))
        except (TypeError, ValueError):
            continue
    return positions


def parse_bits_mask_from_game_state(game_state: dict):
    try:
        return int(game_state.get("bits_mask", 0))
    except (TypeError, ValueError):
        return 0


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
        "bits": [],
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


def world_to_cell(map_state: dict, x: float, y: float):
    width = map_state.get("width", 0)
    height = map_state.get("height", 0)
    tile_scale = map_state.get("tile_scale", MAP_TILE_SCALE)
    if width <= 0 or height <= 0 or tile_scale <= 0:
        return None
    col = int(math.floor((x / tile_scale) + (width / 2.0)))
    row = int(math.floor((y / tile_scale) + (height / 2.0)))
    if col < 0 or row < 0 or col >= width or row >= height:
        return None
    return (col, row)


def cell_is_open(map_state: dict, col: int, row: int) -> bool:
    width = map_state.get("width", 0)
    height = map_state.get("height", 0)
    tiles = map_state.get("tiles", bytearray())
    if col < 0 or row < 0 or col >= width or row >= height:
        return False
    if not tiles:
        return True
    return tiles[row * width + col] == 0


def cell_center_world(map_state: dict, col: int, row: int):
    width = map_state.get("width", 0)
    height = map_state.get("height", 0)
    tile_scale = map_state.get("tile_scale", MAP_TILE_SCALE)
    return cell_to_world(col, row, width, height, tile_scale)


def nearest_open_cell(map_state: dict, x: float, y: float):
    origin = world_to_cell(map_state, x, y)
    width = map_state.get("width", 0)
    height = map_state.get("height", 0)
    if width <= 0 or height <= 0:
        return None

    if origin and cell_is_open(map_state, origin[0], origin[1]):
        return origin

    if origin is None:
        tile_scale = map_state.get("tile_scale", MAP_TILE_SCALE)
        guess_col = min(width - 1, max(0, int(round((x / tile_scale) + (width / 2.0) - 0.5))))
        guess_row = min(height - 1, max(0, int(round((y / tile_scale) + (height / 2.0) - 0.5))))
        origin = (guess_col, guess_row)

    max_radius = max(width, height)
    for radius in range(1, max_radius + 1):
        row_min = max(0, origin[1] - radius)
        row_max = min(height - 1, origin[1] + radius)
        col_min = max(0, origin[0] - radius)
        col_max = min(width - 1, origin[0] + radius)
        for row in range(row_min, row_max + 1):
            for col in range(col_min, col_max + 1):
                if abs(col - origin[0]) != radius and abs(row - origin[1]) != radius:
                    continue
                if cell_is_open(map_state, col, row):
                    return (col, row)
    return None


def build_cell_path(map_state: dict, start_cell, goal_cell):
    if start_cell is None or goal_cell is None:
        return []
    if start_cell == goal_cell:
        return [start_cell]

    width = map_state.get("width", 0)
    height = map_state.get("height", 0)
    if width <= 0 or height <= 0:
        return []

    open_heap = []
    heapq.heappush(open_heap, (0, 0, start_cell))
    came_from = {}
    g_score = {start_cell: 0}
    closed = set()

    while open_heap:
        _, cost_so_far, current = heapq.heappop(open_heap)
        if current in closed:
            continue
        if current == goal_cell:
            path = [current]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            path.reverse()
            return path

        closed.add(current)
        col, row = current
        for next_col, next_row in (
            (col + 1, row),
            (col - 1, row),
            (col, row + 1),
            (col, row - 1),
        ):
            if not cell_is_open(map_state, next_col, next_row):
                continue
            neighbour = (next_col, next_row)
            next_cost = cost_so_far + 1
            if next_cost >= g_score.get(neighbour, 1_000_000):
                continue
            came_from[neighbour] = current
            g_score[neighbour] = next_cost
            heuristic = abs(goal_cell[0] - next_col) + abs(goal_cell[1] - next_row)
            heapq.heappush(open_heap, (next_cost + heuristic, next_cost, neighbour))

    return []


def path_step_target(map_state: dict, current_x: float, current_y: float, target_x: float, target_y: float):
    if map_state.get("width", 0) <= 0 or not map_state.get("tiles"):
        return (target_x, target_y)

    start_cell = nearest_open_cell(map_state, current_x, current_y)
    goal_cell = nearest_open_cell(map_state, target_x, target_y)
    path = build_cell_path(map_state, start_cell, goal_cell)
    if len(path) >= 2:
        return cell_center_world(map_state, path[1][0], path[1][1])
    if len(path) == 1:
        return cell_center_world(map_state, path[0][0], path[0][1])
    return (target_x, target_y)


def choose_best_step_towards(x: float, y: float, angle: float, map_state: dict, target, move_speed: float):
    desired_angle = math.atan2(target[1] - y, target[0] - x)
    best = None
    offsets = (0.0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05, math.pi)
    for offset in offsets:
        candidate_angle = wrap_angle(desired_angle + offset)
        desired_x = x + move_speed * math.cos(candidate_angle)
        desired_y = y + move_speed * math.sin(candidate_angle)
        next_x, next_y = resolve_move(map_state, x, y, desired_x, desired_y)
        blocked = next_x == x and next_y == y
        score = ((next_x - target[0]) ** 2 + (next_y - target[1]) ** 2) + (abs(offset) * 3.0)
        if blocked:
            score += 1_000_000
        candidate = (score, next_x, next_y, candidate_angle)
        if best is None or candidate < best:
            best = candidate
    if best is None:
        return x, y, angle, desired_angle
    return best[1], best[2], best[3], desired_angle


def wrap_angle(angle: float) -> float:
    while angle <= -math.pi:
        angle += math.pi * 2.0
    while angle > math.pi:
        angle -= math.pi * 2.0
    return angle


def turn_towards(current_angle: float, target_angle: float, max_turn_step: float) -> float:
    delta = wrap_angle(target_angle - current_angle)
    if delta > max_turn_step:
        delta = max_turn_step
    elif delta < -max_turn_step:
        delta = -max_turn_step
    return wrap_angle(current_angle + delta)


def active_bit_positions(bits, bits_mask):
    positions = []
    for index, bit in enumerate(bits or []):
        if (bits_mask & (1 << index)) == 0:
            continue
        positions.append(bit)
    return positions


def compute_evade_target(x: float, y: float, threat_x: float, threat_y: float, distance: float):
    away_x = x - threat_x
    away_y = y - threat_y
    length = math.hypot(away_x, away_y)
    if length < 0.001:
        away_x, away_y, length = 1.0, 0.0, 1.0
    away_x /= length
    away_y /= length
    lateral_x = -away_y
    lateral_y = away_x
    return (
        x + away_x * distance + lateral_x * (distance * 0.35),
        y + away_y * distance + lateral_y * (distance * 0.2),
    )


def choose_auto_objective(x: float, y: float, assigned_player_id, game_mode: int, packet_players, bits, bits_mask: int):
    players = [
        player for player in (packet_players or [])
        if not (player.get("flags", 0) & FLAG_MATCH_END)
    ]
    runner = next((player for player in players if player.get("player_id") == 1), None)
    tagger = next((player for player in players if player.get("player_id") == 2), None)

    if assigned_player_id == 2 and runner:
        return {
            "mode": "chase",
            "target": (float(runner["x"]), float(runner["y"])),
        }

    if assigned_player_id == 1:
        if tagger:
            tagger_dx = float(tagger["x"]) - x
            tagger_dy = float(tagger["y"]) - y
            tagger_dist = math.hypot(tagger_dx, tagger_dy)
            if tagger_dist <= AUTO_RUNNER_EVADE_DISTANCE:
                return {
                    "mode": "evade",
                    "target": compute_evade_target(x, y, float(tagger["x"]), float(tagger["y"]), AUTO_RUNNER_EVADE_DISTANCE),
                }
        if game_mode == GAME_MODE_CHASE_BITS:
            candidates = active_bit_positions(bits, bits_mask)
            if candidates:
                target = min(
                    candidates,
                    key=lambda bit: (float(bit[0]) - x) ** 2 + (float(bit[1]) - y) ** 2,
                )
                return {
                    "mode": "collect",
                    "target": (float(target[0]), float(target[1])),
                }
        if tagger:
            return {
                "mode": "kite",
                "target": compute_evade_target(x, y, float(tagger["x"]), float(tagger["y"]), AUTO_RUNNER_EVADE_DISTANCE * 0.7),
            }

    return {"mode": "roam", "target": None}


def advance_auto_player(x: float, y: float, angle: float, map_state: dict, assigned_player_id,
                        game_mode: int, packet_players, bits, bits_mask: int, tick: int, shoot_freq: int):
    objective = choose_auto_objective(x, y, assigned_player_id, game_mode, packet_players, bits, bits_mask)
    mode = objective["mode"]
    target = objective["target"]

    if mode == "chase":
        move_speed = AUTO_TAGGER_SPEED
    elif mode in {"evade", "collect", "kite"}:
        move_speed = AUTO_RUNNER_SPEED
    else:
        move_speed = AUTO_FALLBACK_SPEED

    shoot_now = False

    if target is None:
        roam_target = (
            x + move_speed * 3.0 * math.cos(angle),
            y + move_speed * 3.0 * math.sin(angle),
        )
        next_x, next_y, angle, _ = choose_best_step_towards(x, y, angle, map_state, roam_target, move_speed)
        return next_x, next_y, angle, shoot_now

    nav_target = path_step_target(map_state, x, y, target[0], target[1])
    next_x, next_y, angle, desired_angle = choose_best_step_towards(
        x, y, angle, map_state, nav_target, move_speed,
    )

    if mode == "chase":
        distance = math.hypot(target[0] - x, target[1] - y)
        aligned = abs(wrap_angle(desired_angle - angle)) <= AUTO_TAGGER_SHOOT_ARC
        shoot_now = aligned and distance <= AUTO_TAGGER_SHOOT_RANGE and (tick % shoot_freq == 0)

    return next_x, next_y, angle, shoot_now


def spawn_pose(map_state: dict, node_index: int, radius: float):
    positions = map_state.get("spawn_positions", [])
    if node_index < len(positions):
        angle = SPAWN_ANGLES[node_index] if node_index < len(SPAWN_ANGLES) else 0.0
        x, y = positions[node_index]
        return x, y, angle
    angle = node_index * math.pi * 2 / 4
    return radius * math.cos(angle), radius * math.sin(angle), angle


class ManualController:
    # Background-thread key reader using /dev/tty directly so it works
    # regardless of how stdin is wired (tmux, pipes, WSL PTY).

    def __init__(self):
        if termios is None or tty is None:
            raise RuntimeError("manual mode requires termios (Unix only)")
        try:
            self._tty = open("/dev/tty", "rb", buffering=0)
        except OSError as exc:
            raise RuntimeError(f"manual mode: cannot open /dev/tty: {exc}") from exc
        self.fd = self._tty.fileno()
        self._old_attrs = None
        self._queue = queue.SimpleQueue()
        self._thread = None
        self._stop = threading.Event()

    def enable(self):
        if self._old_attrs is None:
            self._old_attrs = termios.tcgetattr(self.fd)
            tty.setcbreak(self.fd)
        if self._thread is None or not self._thread.is_alive():
            self._stop.clear()
            self._thread = threading.Thread(target=self._reader, daemon=True)
            self._thread.start()
        return self

    def disable(self):
        self._stop.set()
        if self._old_attrs is not None:
            termios.tcsetattr(self.fd, termios.TCSADRAIN, self._old_attrs)
            self._old_attrs = None
        self._tty.close()

    def _reader(self):
        key_map = {
            b"w": "forward",
            b"s": "backward",
            b"a": "turn_left",
            b"d": "turn_right",
            b" ": "shoot",
        }
        while not self._stop.is_set():
            try:
                b = os.read(self.fd, 1)
            except OSError:
                break
            if not b:
                break
            action = key_map.get(b)
            if action:
                self._queue.put(action)

    def read_actions(self):
        actions = []
        while True:
            try:
                actions.append(self._queue.get_nowait())
            except queue.Empty:
                break
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
    latest_packet_players = []
    latest_game_mode = GAME_MODE_CHASE
    latest_bits_mask = 0
    latest_bit_positions = list(map_state.get("bits", []))
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
                print(f"{tag} manual mode: W/S move, A/D turn, space shoots")
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
        loaded_map = load_local_map(current_map_name)
        if loaded_map.get("width", 0) > 0 and loaded_map.get("tiles"):
            map_state = loaded_map
            x, y, angle = spawn_pose(map_state, node_index, radius)
            orbit_phase = math.atan2(y, x) if abs(x) > 0.01 or abs(y) > 0.01 else angle
            return
        if map_state.get("width", 0) > 0 and map_state.get("tiles"):
            print(f"{tag} keeping current runtime map until server PKT_MAP arrives for '{current_map_name}'")
            return
        map_state = loaded_map
        x, y, angle = spawn_pose(map_state, node_index, radius)
        orbit_phase = math.atan2(y, x) if abs(x) > 0.01 or abs(y) > 0.01 else angle

    def load_selected_map(next_map: str):
        nonlocal selected_map_name, latest_bit_positions, latest_bits_mask
        nonlocal have_authoritative_state, last_authoritative_state_at
        selected_map_name = next_map
        load_runtime_map()
        latest_bit_positions = list(map_state.get("bits", []))
        latest_bits_mask = 0
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
        nonlocal selected_map_name, x, y, angle, orbit_phase
        nonlocal latest_bit_positions, latest_bits_mask
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
        spawn_positions = parse_spawn_positions_from_game_state(game_state)
        if spawn_positions:
            existing_positions = map_state.get("spawn_positions") or []
            if list(existing_positions) != list(spawn_positions):
                map_state["spawn_positions"] = list(spawn_positions)
                if assigned_player_id in (None, 0):
                    x, y, angle = spawn_pose(map_state, node_index, radius)
                    orbit_phase = math.atan2(y, x) if abs(x) > 0.01 or abs(y) > 0.01 else angle
                changed = True
        bit_positions = parse_bits_from_game_state(game_state)
        if "bits" in game_state and list(map_state.get("bits", [])) != list(bit_positions):
            map_state["bits"] = list(bit_positions)
            latest_bit_positions = list(bit_positions)
            changed = True
        latest_bits_mask = parse_bits_mask_from_game_state(game_state)
        return changed

    try:
        if manual_controller:
            print(f"{tag} manual mode: W/S move, A/D turn, space shoots")
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
                latest_packet_players = []
                latest_game_mode = GAME_MODE_CHASE
                latest_bits_mask = 0
                latest_bit_positions = list(map_state.get("bits", []))

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
                        print(f"{tag} map selected as {selected_map_name} — staying connected, waiting for server map")
                        continue
                    if next_view and switch_sim_view(next_view):
                        print(f"{tag} sim view changed to {sim_view_mode} — staying connected")
                        continue
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
                print(f"{tag} runtime state changed via Redis snapshot — staying connected")

            # receive all queued broadcasts
            while playing:
                try:
                    data, _ = sock.recvfrom(SOCKET_RECV_SIZE)
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
                    if pkt_type == PKT_MAP:
                        width, height, tile_scale, tiles = unpack_map_packet(data)
                        map_state["width"] = width
                        map_state["height"] = height
                        map_state["tile_scale"] = tile_scale
                        map_state["tiles"] = tiles
                        print(f"{tag} loaded server map {width}x{height} tile_scale={tile_scale}")
                        continue
                    if pkt_type == PKT_GAME_STATE:
                        _, _, _, latest_game_mode, players, latest_bits_mask = unpack_server_packet(data)
                        latest_packet_players = players
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
                                if normalized_mode != "manual":
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
            if normalized_mode == "manual":
                actions = manual_controller.read_actions() if manual_controller else []
                x, y, angle, shoot_now = apply_manual_actions(x, y, angle, actions, map_state)
                input_flags = client_input_flags(shooting=shoot_now)
            elif not have_authoritative_state and assigned_player_id != 0:
                input_flags = 0
            elif assigned_player_id == 0:
                input_flags = 0
            elif sim_view_mode == "orbit":
                orbit_rotation_speed = orbit_rotation_speed_for_player(assigned_player_id, node_index)
                orbit_phase = (orbit_phase + orbit_rotation_speed) % (math.pi * 2.0)
                x = radius * math.cos(orbit_phase)
                y = radius * math.sin(orbit_phase)
                angle = orbit_phase + (math.pi / 2.0)
                input_flags = client_input_flags(shooting=(tick % shoot_freq == 0))
            else:
                x, y, angle, shoot_now = advance_auto_player(
                    x,
                    y,
                    angle,
                    map_state,
                    assigned_player_id,
                    latest_game_mode,
                    latest_packet_players,
                    latest_bit_positions,
                    latest_bits_mask,
                    tick,
                    shoot_freq,
                )
                input_flags = client_input_flags(shooting=shoot_now)

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
