# t2_map_loader.py — Map file loading for the pynq_full server.
#
# Kept separate so GameTick stays a pure orchestrator with no file-I/O logic.
# Map state is a plain mutable dict so the control listener can hot-swap it
# without touching GameTick or PacketHandler internals.

import os
from t2_constants import MAP_TILE_SCALE

DEFAULT_MAP_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'maps', 'level1.txt')

# Parse a text map file — '#' cells become 1 (wall), others 0 (empty).
# Returns a dict: {width, height, tile_scale, tiles, name}; zeros out on error.
def load_map(path: str) -> dict:
    rows = []
    try:
        with open(path) as f:
            for line in f:
                line = line.rstrip('\r\n')
                if not line:
                    continue
                rows.append(bytes(1 if c == '#' else 0 for c in line))
        width  = len(rows[0]) if rows else 0
        height = len(rows)
        tiles  = bytearray(b''.join(rows))
        name   = os.path.splitext(os.path.basename(path))[0]
        print(f"[T2] map loaded: {path}  {width}x{height}")
        return {"width": width, "height": height,
                "tile_scale": MAP_TILE_SCALE, "tiles": tiles, "name": name}
    except Exception as e:
        print(f"[T2] WARNING: could not load map {path}: {e}")
        return {"width": 0, "height": 0,
                "tile_scale": MAP_TILE_SCALE, "tiles": bytearray(), "name": "none"}
