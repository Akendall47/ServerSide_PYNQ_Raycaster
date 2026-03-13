from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path

try:
    from botocore.exceptions import ClientError
except Exception:  # pragma: no cover - botocore is present in runtime, optional in tests
    ClientError = None

GRID_WIDTH = 32
GRID_HEIGHT = 32
GRID_CELLS = GRID_WIDTH * GRID_HEIGHT
TILE_SCALE = 8
MAP_SCHEMA_VERSION = 1
MAP_METADATA_DIRNAME = ".mapmeta"
DEFAULT_SUPPORTED_MODES = ["tag"]
SPAWN_MARKERS = {index: str(index + 1) for index in range(5)}
RUNTIME_MARKERS = {
    "B": "bit_spawn",
}
MAP_RECORD_TYPE = "META"


class MapStorageError(ValueError):
    pass


def _utc_now():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _metadata_dir(maps_dir: Path):
    return maps_dir / MAP_METADATA_DIRNAME


def _runtime_path(maps_dir: Path, map_id: str):
    return maps_dir / f"{map_id}.txt"


def _metadata_path(maps_dir: Path, map_id: str):
    return _metadata_dir(maps_dir) / f"{map_id}.json"


def _atomic_write_text(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = path.with_suffix(f"{path.suffix}.tmp")
    tmp_path.write_text(content, encoding="utf-8")
    tmp_path.replace(path)


def _atomic_write_json(path: Path, payload: dict):
    _atomic_write_text(path, json.dumps(payload, indent=2, sort_keys=True) + "\n")


def sanitise_map_id(value: str):
    raw = str(value or "").strip().lower()
    raw = re.sub(r"[^a-z0-9_-]+", "_", raw)
    raw = re.sub(r"_+", "_", raw).strip("_-")
    if not raw:
        raise MapStorageError("map name must contain letters or numbers")
    return raw[:48].rstrip("_-")


def display_name_for_map(value: str):
    text = str(value or "").strip()
    if not text:
        raise MapStorageError("display name is required")
    return text[:80]


def coerce_grid(grid):
    if grid is None:
        raise MapStorageError("missing grid payload")
    values = list(grid)
    if len(values) != GRID_CELLS:
        raise MapStorageError(f"grid must contain exactly {GRID_CELLS} cells")
    normalised = []
    for index, value in enumerate(values):
        try:
            cell = int(value)
        except (TypeError, ValueError) as exc:
            raise MapStorageError(f"grid cell {index} is not numeric") from exc
        if cell not in (0, 1):
            raise MapStorageError(f"grid cell {index} must be 0 or 1")
        normalised.append(cell)
    return normalised


def coerce_spawns(spawns):
    if spawns is None:
        return []
    if not isinstance(spawns, list):
        raise MapStorageError("spawns must be a list")

    normalised = []
    seen = set()
    for index, spawn in enumerate(spawns[:5]):
        if not isinstance(spawn, dict):
            raise MapStorageError(f"spawn {index + 1} is not an object")
        try:
            x = int(spawn["x"])
            y = int(spawn["y"])
        except (KeyError, TypeError, ValueError) as exc:
            raise MapStorageError(f"spawn {index + 1} is missing numeric x/y") from exc
        if not (0 <= x < GRID_WIDTH and 0 <= y < GRID_HEIGHT):
            raise MapStorageError(f"spawn {index + 1} must stay within the {GRID_WIDTH}x{GRID_HEIGHT} grid")
        if (x, y) in seen:
            raise MapStorageError("spawn points must be unique")
        seen.add((x, y))
        normalised.append({"x": x, "y": y})
    return normalised


def coerce_markers(markers):
    if markers is None:
        return []
    if not isinstance(markers, list):
        raise MapStorageError("markers must be a list")

    normalised = []
    for index, marker in enumerate(markers):
        if not isinstance(marker, dict):
            raise MapStorageError(f"marker {index + 1} is not an object")
        symbol = str(marker.get("marker", "") or "").strip()
        if symbol not in RUNTIME_MARKERS:
            raise MapStorageError(f"marker {index + 1} has unsupported symbol '{symbol}'")
        try:
            x = int(marker["x"])
            y = int(marker["y"])
        except (KeyError, TypeError, ValueError) as exc:
            raise MapStorageError(f"marker {index + 1} is missing numeric x/y") from exc
        if not (0 <= x < GRID_WIDTH and 0 <= y < GRID_HEIGHT):
            raise MapStorageError(f"marker {index + 1} must stay within the {GRID_WIDTH}x{GRID_HEIGHT} grid")
        normalised.append({
            "type": RUNTIME_MARKERS[symbol],
            "marker": symbol,
            "x": x,
            "y": y,
        })
    return normalised


def ensure_runtime_constraints(grid, spawns):
    def cell(x: int, y: int):
        return grid[(y * GRID_WIDTH) + x]

    for x in range(GRID_WIDTH):
        if cell(x, 0) != 1 or cell(x, GRID_HEIGHT - 1) != 1:
            raise MapStorageError("top and bottom borders must be solid walls for hardware-safe maps")
    for y in range(GRID_HEIGHT):
        if cell(0, y) != 1 or cell(GRID_WIDTH - 1, y) != 1:
            raise MapStorageError("left and right borders must be solid walls for hardware-safe maps")
    for spawn in spawns:
        if cell(spawn["x"], spawn["y"]) != 0:
            raise MapStorageError("spawn points must be placed on empty cells")


def grid_to_rows(grid):
    return [
        grid[row_index * GRID_WIDTH:(row_index + 1) * GRID_WIDTH]
        for row_index in range(GRID_HEIGHT)
    ]


def parse_runtime_text(text: str):
    rows = [line.rstrip("\r\n") for line in text.splitlines() if line.strip()]
    if len(rows) != GRID_HEIGHT:
        raise MapStorageError(f"runtime map must contain exactly {GRID_HEIGHT} rows")
    if any(len(row) != GRID_WIDTH for row in rows):
        raise MapStorageError(f"runtime map rows must be exactly {GRID_WIDTH} cells wide")

    grid = []
    spawns_by_index = [None] * 5
    markers = []
    for y, row in enumerate(rows):
        for x, char in enumerate(row):
            if char == "#":
                grid.append(1)
                continue
            grid.append(0)
            if char in {"1", "2", "3", "4", "5"}:
                spawns_by_index[int(char) - 1] = {"x": x, "y": y}
            elif char in RUNTIME_MARKERS:
                markers.append({
                    "type": RUNTIME_MARKERS[char],
                    "marker": char,
                    "x": x,
                    "y": y,
                })

    spawns = [spawn for spawn in spawns_by_index if spawn is not None]
    ensure_runtime_constraints(grid, spawns)
    return {
        "grid": grid,
        "spawns": spawns,
        "markers": markers,
        "rows": rows,
    }


def serialise_runtime_text(grid, spawns, markers):
    rows = [["#" if grid[(y * GRID_WIDTH) + x] else "." for x in range(GRID_WIDTH)] for y in range(GRID_HEIGHT)]

    for marker in markers:
        x = marker["x"]
        y = marker["y"]
        if rows[y][x] == ".":
            rows[y][x] = marker["marker"]

    for index, spawn in enumerate(spawns[:5]):
        x = spawn["x"]
        y = spawn["y"]
        rows[y][x] = SPAWN_MARKERS[index]

    return "\n".join("".join(row) for row in rows) + "\n"


def _metadata_defaults(map_id: str, map_name: str, created_at: str | None = None):
    return {
        "schema_version": MAP_SCHEMA_VERSION,
        "map_id": map_id,
        "map_name": map_name,
        "source": "editor",
        "layout_type": "binary-grid",
        "grid_size": {"width": GRID_WIDTH, "height": GRID_HEIGHT},
        "tile_scale": TILE_SCALE,
        "supported_modes": list(DEFAULT_SUPPORTED_MODES),
        "entity_budget": {
            "human_spawns": 2,
            "ghost_slots": 3,
        },
        "deletable": True,
        "created_at": created_at or _utc_now(),
        "updated_at": _utc_now(),
        "notes": "",
        "tags": ["editor"],
    }


def _plain_number(value: Decimal):
    if value == value.to_integral_value():
        return int(value)
    return float(value)


def _normalise_dynamo_value(value):
    if isinstance(value, Decimal):
        return _plain_number(value)
    if isinstance(value, dict):
        return {key: _normalise_dynamo_value(inner) for key, inner in value.items()}
    if isinstance(value, list):
        return [_normalise_dynamo_value(inner) for inner in value]
    return value


def _is_missing_table_error(exc: Exception):
    if ClientError is None or not isinstance(exc, ClientError):
        return False
    code = str(exc.response.get("Error", {}).get("Code", "") or "")
    return code in {"ResourceNotFoundException", "ValidationException"}


def _table_get_item(map_table, map_id: str):
    if map_table is None:
        return None
    try:
        response = map_table.get_item(Key={"map_id": map_id})
    except Exception as exc:
        if _is_missing_table_error(exc):
            return None
        raise MapStorageError(f"map table read failed: {exc}") from exc
    item = response.get("Item")
    if not item:
        return None
    if item.get("record_type", MAP_RECORD_TYPE) != MAP_RECORD_TYPE:
        return None
    return item


def _table_scan_items(map_table):
    if map_table is None:
        return []
    items = []
    kwargs = {}
    while True:
        try:
            response = map_table.scan(**kwargs)
        except Exception as exc:
            if _is_missing_table_error(exc):
                return []
            raise MapStorageError(f"map table scan failed: {exc}") from exc
        items.extend(
            item for item in response.get("Items", [])
            if item.get("record_type", MAP_RECORD_TYPE) == MAP_RECORD_TYPE
        )
        last_key = response.get("LastEvaluatedKey")
        if not last_key:
            return items
        kwargs["ExclusiveStartKey"] = last_key


def _table_put_item(map_table, item: dict):
    if map_table is None:
        return False
    try:
        map_table.put_item(Item=item)
    except Exception as exc:
        if _is_missing_table_error(exc):
            return False
        raise MapStorageError(f"map table write failed: {exc}") from exc
    return True


def _table_delete_item(map_table, map_id: str):
    if map_table is None:
        return False
    try:
        map_table.delete_item(Key={"map_id": map_id})
    except Exception as exc:
        if _is_missing_table_error(exc):
            return False
        raise MapStorageError(f"map table delete failed: {exc}") from exc
    return True


def _metadata_from_table_item(item: dict):
    if not item:
        return None
    grid_size = _normalise_dynamo_value(item.get("grid_size")) or {"width": GRID_WIDTH, "height": GRID_HEIGHT}
    entity_budget = _normalise_dynamo_value(item.get("entity_budget")) or {"human_spawns": 2, "ghost_slots": 3}
    return {
        "schema_version": _normalise_dynamo_value(item.get("schema_version", MAP_SCHEMA_VERSION)),
        "map_id": item.get("map_id"),
        "map_name": item.get("map_name") or item.get("map_id"),
        "source": item.get("source") or "editor",
        "layout_type": item.get("layout_type") or "binary-grid",
        "grid_size": grid_size,
        "tile_scale": _normalise_dynamo_value(item.get("tile_scale")) or TILE_SCALE,
        "supported_modes": list(_normalise_dynamo_value(item.get("supported_modes")) or DEFAULT_SUPPORTED_MODES),
        "entity_budget": entity_budget,
        "deletable": bool(item.get("deletable", False)),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at"),
        "notes": str(item.get("notes") or ""),
        "tags": list(item.get("tags") or []),
    }


def _build_table_item(map_id: str, runtime_text: str, metadata: dict):
    return {
        "map_id": map_id,
        "record_type": MAP_RECORD_TYPE,
        "map_name": metadata.get("map_name") or map_id,
        "runtime_text": runtime_text,
        "schema_version": int(metadata.get("schema_version", MAP_SCHEMA_VERSION)),
        "source": metadata.get("source") or "editor",
        "layout_type": metadata.get("layout_type") or "binary-grid",
        "grid_size": metadata.get("grid_size") or {"width": GRID_WIDTH, "height": GRID_HEIGHT},
        "tile_scale": int(metadata.get("tile_scale", TILE_SCALE)),
        "supported_modes": list(metadata.get("supported_modes") or DEFAULT_SUPPORTED_MODES),
        "entity_budget": metadata.get("entity_budget") or {"human_spawns": 2, "ghost_slots": 3},
        "deletable": bool(metadata.get("deletable", False)),
        "created_at": metadata.get("created_at"),
        "updated_at": metadata.get("updated_at"),
        "notes": str(metadata.get("notes") or ""),
        "tags": list(metadata.get("tags") or []),
    }


def _entry_from_table_item(item: dict, include_grid: bool = True):
    map_id = sanitise_map_id(item.get("map_id") or "")
    runtime_text = str(item.get("runtime_text") or "")
    if not runtime_text:
        raise MapStorageError(f"map table entry '{map_id}' is missing runtime_text")
    runtime_payload = parse_runtime_text(runtime_text)
    return build_map_entry(
        map_id,
        runtime_payload,
        _metadata_from_table_item(item),
        include_grid=include_grid,
    )


def _load_table_entry(map_table, map_id: str, include_grid: bool = True):
    item = _table_get_item(map_table, map_id)
    if not item:
        return None
    return _entry_from_table_item(item, include_grid=include_grid)


def _read_metadata(maps_dir: Path, map_id: str):
    path = _metadata_path(maps_dir, map_id)
    if not path.is_file():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def build_map_entry(map_id: str, runtime_payload: dict, metadata: dict | None = None, include_grid: bool = False):
    meta = metadata or {}
    grid = runtime_payload["grid"]
    spawns = runtime_payload["spawns"]
    markers = runtime_payload["markers"]
    wall_count = sum(grid)
    entry = {
        "map_id": map_id,
        "name": map_id,
        "map_name": meta.get("map_name") or map_id,
        "source": meta.get("source") or "system",
        "deletable": bool(meta.get("deletable", False)),
        "schema_version": int(meta.get("schema_version", MAP_SCHEMA_VERSION)),
        "layout_type": meta.get("layout_type") or "binary-grid",
        "supported_modes": list(meta.get("supported_modes") or DEFAULT_SUPPORTED_MODES),
        "entity_budget": meta.get("entity_budget") or {"human_spawns": 2, "ghost_slots": 3},
        "notes": str(meta.get("notes") or ""),
        "tags": list(meta.get("tags") or ([] if meta else ["system"])),
        "created_at": meta.get("created_at"),
        "updated_at": meta.get("updated_at"),
        "width": GRID_WIDTH,
        "height": GRID_HEIGHT,
        "tile_scale": TILE_SCALE,
        "wall_count": wall_count,
        "open_count": GRID_CELLS - wall_count,
        "spawns": spawns,
        "marker_count": len(markers),
        "markers": markers,
    }
    if include_grid:
        entry["grid"] = grid
        entry["tiles"] = grid_to_rows(grid)
    return entry


def list_map_entries(maps_dir: Path, map_table=None):
    entries_by_id = {}
    for path in sorted(maps_dir.glob("*.txt")):
        map_id = path.stem
        runtime_payload = parse_runtime_text(path.read_text(encoding="utf-8"))
        entries_by_id[map_id] = build_map_entry(map_id, runtime_payload, _read_metadata(maps_dir, map_id))
    for item in _table_scan_items(map_table):
        loaded = _entry_from_table_item(item, include_grid=False)
        entries_by_id[loaded["map_id"]] = loaded
    return [entries_by_id[key] for key in sorted(entries_by_id)]


def load_map_entry(maps_dir: Path, map_id: str, include_grid: bool = True, map_table=None):
    safe_map_id = sanitise_map_id(map_id)
    table_entry = _load_table_entry(map_table, safe_map_id, include_grid=include_grid)
    if table_entry is not None:
        return table_entry
    path = _runtime_path(maps_dir, safe_map_id)
    if not path.is_file():
        raise MapStorageError(f"map not found: {safe_map_id}")
    runtime_payload = parse_runtime_text(path.read_text(encoding="utf-8"))
    return build_map_entry(safe_map_id, runtime_payload, _read_metadata(maps_dir, safe_map_id), include_grid=include_grid)


def save_map_entry(maps_dir: Path, payload: dict, map_table=None):
    map_name = display_name_for_map(payload.get("map_name") or payload.get("name") or "")
    map_id = sanitise_map_id(payload.get("map_id") or map_name)
    grid = coerce_grid(payload.get("grid"))
    spawns = coerce_spawns(payload.get("spawns"))
    markers = coerce_markers(payload.get("markers"))
    ensure_runtime_constraints(grid, spawns)

    runtime_path = _runtime_path(maps_dir, map_id)
    existing_metadata = _read_metadata(maps_dir, map_id)
    existing_table_item = _table_get_item(map_table, map_id)
    existing_table_metadata = _metadata_from_table_item(existing_table_item) if existing_table_item else None
    if runtime_path.exists() and (not existing_metadata or existing_metadata.get("source") != "editor"):
        raise MapStorageError(f"system map '{map_id}' is read-only; save under a new name")
    if existing_table_metadata and existing_table_metadata.get("source") != "editor":
        raise MapStorageError(f"system map '{map_id}' is read-only; save under a new name")

    existing_editor_metadata = existing_table_metadata or existing_metadata

    metadata = _metadata_defaults(
        map_id,
        map_name,
        created_at=existing_editor_metadata.get("created_at") if existing_editor_metadata else None,
    )
    metadata["map_name"] = map_name
    supported_modes = payload.get("supported_modes")
    if supported_modes is None and existing_editor_metadata:
        supported_modes = existing_editor_metadata.get("supported_modes")
    metadata["supported_modes"] = list(supported_modes or DEFAULT_SUPPORTED_MODES)
    metadata["notes"] = str(payload.get("notes") or (existing_editor_metadata.get("notes") if existing_editor_metadata else ""))
    metadata["tags"] = list(payload.get("tags") or (existing_editor_metadata.get("tags") if existing_editor_metadata else ["editor"]))
    metadata["entity_budget"] = payload.get("entity_budget") or (existing_editor_metadata.get("entity_budget") if existing_editor_metadata else {"human_spawns": 2, "ghost_slots": 3})
    metadata["updated_at"] = _utc_now()
    runtime_text = serialise_runtime_text(grid, spawns, markers)

    _atomic_write_text(runtime_path, runtime_text)
    _atomic_write_json(_metadata_path(maps_dir, map_id), metadata)
    _table_put_item(map_table, _build_table_item(map_id, runtime_text, metadata))
    return load_map_entry(maps_dir, map_id, include_grid=True, map_table=map_table)


def delete_map_entry(maps_dir: Path, map_id: str, protected_map_ids=None, map_table=None):
    safe_map_id = sanitise_map_id(map_id)
    protected = set(protected_map_ids or [])
    if safe_map_id in protected:
        raise MapStorageError(f"map '{safe_map_id}' is active and cannot be deleted")

    runtime_path = _runtime_path(maps_dir, safe_map_id)
    metadata = _read_metadata(maps_dir, safe_map_id)
    table_item = _table_get_item(map_table, safe_map_id)
    table_metadata = _metadata_from_table_item(table_item) if table_item else None
    effective_metadata = table_metadata or metadata
    if not runtime_path.exists() and table_item is None:
        raise MapStorageError(f"map not found: {safe_map_id}")
    if not effective_metadata or effective_metadata.get("source") != "editor" or not effective_metadata.get("deletable", False):
        raise MapStorageError(f"map '{safe_map_id}' is protected")

    if runtime_path.exists():
        runtime_path.unlink(missing_ok=False)
    meta_path = _metadata_path(maps_dir, safe_map_id)
    if meta_path.exists():
        meta_path.unlink()
    _table_delete_item(map_table, safe_map_id)
    return {"map_id": safe_map_id, "deleted": True}
