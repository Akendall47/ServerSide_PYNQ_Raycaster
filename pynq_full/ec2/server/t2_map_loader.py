# t2_map_loader.py — Map file loading for the pynq_full server.
#
# Kept separate so GameTick stays a pure orchestrator with no file-I/O logic.
# Map state is a plain mutable dict so the control listener can hot-swap it
# without touching GameTick or PacketHandler internals.

import math
import os
from t2_constants import MAP_TILE_SCALE, PLAYER_COLLISION_RADIUS, SPAWN_CLEARANCE_RADIUS

DEFAULT_MAP_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'maps', 'chase.txt')
SPAWN_MARKERS = {str(index): index - 1 for index in range(1, 6)}
HARDWARE_MAP_WIDTH = 32
HARDWARE_MAP_HEIGHT = 32


def cell_to_world(col: int, row: int, width: int, height: int, tile_scale: int):
    return (
        (col - width / 2.0 + 0.5) * tile_scale,
        (row - height / 2.0 + 0.5) * tile_scale,
    )


def world_to_cell(x: float, y: float, width: int, height: int, tile_scale: int):
    col = int(math.floor((x / tile_scale) + (width / 2.0)))
    row = int(math.floor((y / tile_scale) + (height / 2.0)))
    return col, row


def is_walkable_cell(width: int, height: int, tiles: bytearray, col: int, row: int) -> bool:
    if col < 0 or row < 0 or col >= width or row >= height:
        return False
    return tiles[row * width + col] == 0


def is_walkable_world(map_state: dict, x: float, y: float, radius: float = 0.0) -> bool:
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
        col, row = world_to_cell(x + dx, y + dy, width, height, tile_scale)
        if not is_walkable_cell(width, height, tiles, col, row):
            return False
    return True


def resolve_walkable_world(map_state: dict,
                           current_x: float, current_y: float,
                           desired_x: float, desired_y: float,
                           radius: float = 0.0):
    if is_walkable_world(map_state, desired_x, desired_y, radius):
        return desired_x, desired_y
    if is_walkable_world(map_state, desired_x, current_y, radius):
        return desired_x, current_y
    if is_walkable_world(map_state, current_x, desired_y, radius):
        return current_x, desired_y
    if not is_walkable_world(map_state, current_x, current_y, radius):
        return current_x, current_y

    low_x, low_y = current_x, current_y
    high_x, high_y = desired_x, desired_y
    for _ in range(10):
        mid_x = (low_x + high_x) / 2.0
        mid_y = (low_y + high_y) / 2.0
        if is_walkable_world(map_state, mid_x, mid_y, radius):
            low_x, low_y = mid_x, mid_y
        else:
            high_x, high_y = mid_x, mid_y
    return low_x, low_y


def _cell_open_score(width: int, height: int, tiles: bytearray, col: int, row: int) -> int:
    score = 0
    for row_off in (-1, 0, 1):
        for col_off in (-1, 0, 1):
            if row_off == 0 and col_off == 0:
                continue
            if is_walkable_cell(width, height, tiles, col + col_off, row + row_off):
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


def _nearest_walkable_cell(width: int, height: int, tiles: bytearray,
                           start_col: int, start_row: int, used: set,
                           tile_scale: int, clearance_radius: float):
    fallback = None
    map_state = {
        "width": width,
        "height": height,
        "tile_scale": tile_scale,
        "tiles": tiles,
    }
    max_radius = max(width, height)
    for radius in range(max_radius + 1):
        best = None
        row_min = max(0, start_row - radius)
        row_max = min(height - 1, start_row + radius)
        col_min = max(0, start_col - radius)
        col_max = min(width - 1, start_col + radius)
        for row in range(row_min, row_max + 1):
            for col in range(col_min, col_max + 1):
                if abs(col - start_col) != radius and abs(row - start_row) != radius:
                    continue
                if (col, row) in used:
                    continue
                if not is_walkable_cell(width, height, tiles, col, row):
                    continue
                dist_sq = (col - start_col) ** 2 + (row - start_row) ** 2
                open_score = _cell_open_score(width, height, tiles, col, row)
                candidate = (open_score, -dist_sq, col, row)
                if fallback is None or candidate > fallback:
                    fallback = candidate
                world_x, world_y = cell_to_world(col, row, width, height, tile_scale)
                if not is_walkable_world(map_state, world_x, world_y, clearance_radius):
                    continue
                if best is None or candidate > best:
                    best = candidate
        if best is not None:
            used.add((best[2], best[3]))
            return best[2], best[3]
    if fallback is not None:
        used.add((fallback[2], fallback[3]))
        return fallback[2], fallback[3]
    return None


def build_spawn_positions(width: int, height: int, tiles: bytearray, tile_scale: int,
                          spawn_anchors=None):
    if width <= 0 or height <= 0 or not tiles:
        return []

    anchors = _default_spawn_anchors(width, height)
    if spawn_anchors:
        for index, anchor in enumerate(spawn_anchors[:len(anchors)]):
            if anchor is not None:
                anchors[index] = anchor
    used = set()
    positions = []
    clearance_radius = max(
        tile_scale * 0.75,
        PLAYER_COLLISION_RADIUS + 0.5,
        SPAWN_CLEARANCE_RADIUS,
    )
    for col, row in anchors:
        cell = _nearest_walkable_cell(
            width, height, tiles, col, row, used, tile_scale, clearance_radius
        )
        if cell is None:
            positions.append((0.0, 0.0))
            continue
        positions.append(cell_to_world(cell[0], cell[1], width, height, tile_scale))
    return positions

def load_map(path: str) -> dict:
    """Parse a text map file.

    Tile key: '#' = wall, 'B' = bit spawn, '1'..'5' = explicit spawn anchors,
    anything else = empty.
    """
    rows = []
    try:
        with open(path) as f:
            for line in f:
                line = line.rstrip('\r\n')
                if not line:
                    continue
                rows.append(line)
        if not rows:
            raise ValueError("map file is empty")
        width = len(rows[0])
        height = len(rows)
        if any(len(row) != width for row in rows):
            raise ValueError("all map rows must be the same width")
        if width != HARDWARE_MAP_WIDTH or height != HARDWARE_MAP_HEIGHT:
            raise ValueError(
                f"hardware requires {HARDWARE_MAP_WIDTH}x{HARDWARE_MAP_HEIGHT} maps, got {width}x{height}"
            )
        if any(cell != '#' for cell in rows[0] + rows[-1]):
            raise ValueError("top and bottom map borders must be solid walls")
        if any(row[0] != '#' or row[-1] != '#' for row in rows):
            raise ValueError("left and right map borders must be solid walls")

        ts = MAP_TILE_SCALE
        tiles = bytearray()
        bits = []
        spawn_anchors = [None] * len(SPAWN_MARKERS)

        for row_idx, row in enumerate(rows):
            for col_idx, c in enumerate(row):
                tiles.append(1 if c == '#' else 0)
                if c == 'B':
                    bits.append(cell_to_world(col_idx, row_idx, width, height, ts))
                elif c in SPAWN_MARKERS:
                    spawn_anchors[SPAWN_MARKERS[c]] = (col_idx, row_idx)

        spawn_positions = build_spawn_positions(width, height, tiles, ts, spawn_anchors)
        name = os.path.splitext(os.path.basename(path))[0]
        print(f"[T2] map loaded: {path}  {width}x{height}  bits={len(bits)}")
        return {"width": width, "height": height,
                "tile_scale": ts, "tiles": tiles, "name": name, "bits": bits,
                "spawn_positions": spawn_positions}
    except Exception as e:
        print(f"[T2] WARNING: could not load map {path}: {e}")
        return {"width": 0, "height": 0,
                "tile_scale": MAP_TILE_SCALE, "tiles": bytearray(), "name": "none",
                "bits": [], "spawn_positions": []}
