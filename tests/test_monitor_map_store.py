from pathlib import Path

import pytest

from monitor_map_store import (
    MapStorageError,
    delete_map_entry,
    list_map_entries,
    load_map_entry,
    save_map_entry,
)


class FakeMapTable:
    def __init__(self):
        self.items = {}

    def get_item(self, Key):
        item = self.items.get(Key["map_id"])
        return {"Item": dict(item)} if item else {}

    def put_item(self, Item):
        self.items[Item["map_id"]] = dict(Item)
        return {"ResponseMetadata": {"HTTPStatusCode": 200}}

    def delete_item(self, Key):
        self.items.pop(Key["map_id"], None)
        return {"ResponseMetadata": {"HTTPStatusCode": 200}}

    def scan(self, **kwargs):
        return {"Items": [dict(item) for item in self.items.values()]}


def bordered_grid():
    grid = [0] * (32 * 32)
    for x in range(32):
        grid[x] = 1
        grid[(31 * 32) + x] = 1
    for y in range(32):
        grid[y * 32] = 1
        grid[(y * 32) + 31] = 1
    return grid


def test_save_and_load_editor_map(tmp_path: Path):
    maps_dir = tmp_path / "maps"
    payload = save_map_entry(maps_dir, {
        "map_name": "Arena Alpha",
        "grid": bordered_grid(),
        "spawns": [{"x": 2, "y": 2}, {"x": 29, "y": 29}],
        "markers": [{"marker": "B", "x": 10, "y": 10}],
    })

    assert payload["map_id"] == "arena_alpha"
    assert payload["source"] == "editor"
    assert payload["spawns"] == [{"x": 2, "y": 2}, {"x": 29, "y": 29}]
    assert payload["marker_count"] == 1

    loaded = load_map_entry(maps_dir, "arena_alpha", include_grid=True)
    assert loaded["grid"][2 * 32 + 2] == 0
    assert loaded["markers"][0]["marker"] == "B"
    assert loaded["spawns"][0] == {"x": 2, "y": 2}


def test_spawn_order_is_loaded_from_runtime_marker_number(tmp_path: Path):
    maps_dir = tmp_path / "maps"
    maps_dir.mkdir(parents=True)
    rows = ["#" * 32]
    for y in range(1, 31):
        if y == 4:
            rows.append("#" + ("." * 28) + "2.#")
        elif y == 28:
            rows.append("#1" + ("." * 29) + "#")
        else:
            rows.append("#..............................#")
    rows.append("#" * 32)
    (maps_dir / "ordered.txt").write_text("\n".join(rows) + "\n", encoding="utf-8")

    loaded = load_map_entry(maps_dir, "ordered", include_grid=True)
    assert loaded["spawns"] == [{"x": 1, "y": 28}, {"x": 29, "y": 4}]


def test_system_maps_are_protected(tmp_path: Path):
    maps_dir = tmp_path / "maps"
    maps_dir.mkdir(parents=True)
    (maps_dir / "chase.txt").write_text(("#" * 32 + "\n") * 32, encoding="utf-8")

    with pytest.raises(MapStorageError, match="read-only"):
        save_map_entry(maps_dir, {
            "map_name": "chase",
            "grid": bordered_grid(),
            "spawns": [{"x": 2, "y": 2}, {"x": 29, "y": 29}],
        })


def test_delete_protected_active_map(tmp_path: Path):
    maps_dir = tmp_path / "maps"
    save_map_entry(maps_dir, {
        "map_name": "Arena Beta",
        "grid": bordered_grid(),
        "spawns": [{"x": 2, "y": 2}, {"x": 29, "y": 29}],
    })

    with pytest.raises(MapStorageError, match="active"):
        delete_map_entry(maps_dir, "arena_beta", {"arena_beta"})

    result = delete_map_entry(maps_dir, "arena_beta", set())
    assert result["deleted"] is True
    assert not list_map_entries(maps_dir)


def test_editor_maps_persist_to_table_and_runtime_mirror(tmp_path: Path):
    maps_dir = tmp_path / "maps"
    table = FakeMapTable()

    payload = save_map_entry(maps_dir, {
        "map_name": "Arena Gamma",
        "grid": bordered_grid(),
        "spawns": [{"x": 2, "y": 2}, {"x": 29, "y": 29}],
        "markers": [{"marker": "B", "x": 8, "y": 8}],
        "notes": "table-backed",
    }, table)

    assert payload["map_id"] == "arena_gamma"
    assert (maps_dir / "arena_gamma.txt").is_file()
    assert "arena_gamma" in table.items
    assert table.items["arena_gamma"]["runtime_text"]

    # Delete the runtime mirror to prove table load still works.
    (maps_dir / "arena_gamma.txt").unlink()
    loaded = load_map_entry(maps_dir, "arena_gamma", include_grid=True, map_table=table)
    assert loaded["map_id"] == "arena_gamma"
    assert loaded["notes"] == "table-backed"
    assert loaded["markers"][0]["marker"] == "B"


def test_table_entries_appear_alongside_system_maps(tmp_path: Path):
    maps_dir = tmp_path / "maps"
    maps_dir.mkdir(parents=True)
    system_rows = ["#" * 32] + ["#" + ("." * 30) + "#" for _ in range(30)] + ["#" * 32]
    (maps_dir / "chase.txt").write_text("\n".join(system_rows) + "\n", encoding="utf-8")
    table = FakeMapTable()

    save_map_entry(maps_dir, {
        "map_name": "Arena Delta",
        "grid": bordered_grid(),
        "spawns": [{"x": 2, "y": 2}, {"x": 29, "y": 29}],
    }, table)

    entries = list_map_entries(maps_dir, table)
    assert [entry["map_id"] for entry in entries] == ["arena_delta", "chase"]


def test_delete_removes_table_entry_and_runtime_mirror(tmp_path: Path):
    maps_dir = tmp_path / "maps"
    table = FakeMapTable()
    save_map_entry(maps_dir, {
        "map_name": "Arena Epsilon",
        "grid": bordered_grid(),
        "spawns": [{"x": 2, "y": 2}, {"x": 29, "y": 29}],
    }, table)

    result = delete_map_entry(maps_dir, "arena_epsilon", set(), table)
    assert result["deleted"] is True
    assert "arena_epsilon" not in table.items
    assert not (maps_dir / "arena_epsilon.txt").exists()
