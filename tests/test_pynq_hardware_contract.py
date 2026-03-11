import importlib
import sys
from contextlib import contextmanager
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PYNQ_EC2 = ROOT / "pynq_full" / "ec2"
PYNQ_SERVER = PYNQ_EC2 / "server"
PYNQ_INTERFACING = ROOT / "pynq_full" / "interfacing"


@contextmanager
def pynq_import_context():
    original_path = list(sys.path)
    sys.path[:0] = [str(PYNQ_INTERFACING), str(PYNQ_SERVER), str(PYNQ_EC2)]
    for name in list(sys.modules):
        if name in {"t2_constants", "t2_map_loader", "pynq_client", "protocol"}:
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name in {"t2_constants", "t2_map_loader", "pynq_client", "protocol"}:
                sys.modules.pop(name, None)


def test_pynq_map_loader_uses_explicit_spawn_markers():
    with pynq_import_context():
        map_loader = importlib.import_module("t2_map_loader")

        path = ROOT / "pynq_full" / "ec2" / "maps" / "chase.txt"
        rows = [line.rstrip("\r\n") for line in path.read_text().splitlines() if line]
        expected = {}
        for row_idx, row in enumerate(rows):
            for col_idx, cell in enumerate(row):
                if cell in {"1", "2", "3", "4", "5"}:
                    expected[int(cell)] = map_loader.cell_to_world(
                        col_idx, row_idx, len(row), len(rows), 8
                    )

        map_state = map_loader.load_map(str(path))

        assert map_state["width"] == 32
        assert map_state["height"] == 32
        for slot, world_pos in expected.items():
            assert map_state["spawn_positions"][slot - 1] == world_pos


def test_pynq_map_loader_rejects_non_32x32_map(tmp_path):
    with pynq_import_context():
        map_loader = importlib.import_module("t2_map_loader")

        bad_map = tmp_path / "bad_map.txt"
        bad_map.write_text("###\n#.#\n###\n")

        map_state = map_loader.load_map(str(bad_map))

        assert map_state["width"] == 0
        assert map_state["height"] == 0
        assert map_state["spawn_positions"] == []


def test_pynq_client_encodes_map_pose_and_angle_for_real_hardware():
    with pynq_import_context():
        pynq_client = importlib.import_module("pynq_client")

        tiles = bytearray(32 * 32)
        tiles[0] = 1
        tiles[5] = 1
        tiles[31] = 1
        tiles[(7 * 32) + 3] = 1

        rows = pynq_client.encode_map_rows_for_bram(32, 32, tiles)

        assert len(rows) == 32
        assert rows[0] == ((1 << 0) | (1 << 5) | (1 << 31))
        assert rows[7] == (1 << 3)
        assert rows[8] == 0

        assert pynq_client.world_to_hw_q6_10(0.0, 8, 32) == (16 << 10)
        assert pynq_client.world_to_hw_q6_10(-8.0, 8, 32) == (15 << 10)
        assert pynq_client.radians_to_hw_angle(0.0) == 0
        assert pynq_client.radians_to_hw_angle(3.141592653589793 / 2) == 1024


def test_pynq_client_keeps_remote_entities_including_ghosts():
    with pynq_import_context():
        pynq_client = importlib.import_module("pynq_client")

        players = [
            {"player_id": 1, "x": 10.0, "y": 20.0, "angle": 0.25, "flags": 0},
            {"player_id": 2, "x": 30.0, "y": 40.0, "angle": 0.50, "flags": 0},
            {"player_id": 3, "x": 50.0, "y": 60.0, "angle": 0.75, "flags": pynq_client.FLAG_GHOST},
            {"player_id": 4, "x": 70.0, "y": 80.0, "angle": 1.00, "flags": pynq_client.FLAG_GHOST},
        ]

        entities = pynq_client.build_remote_entities(1, players)

        assert [entity["entity_id"] for entity in entities] == [2, 3, 4]
        assert entities[1]["flags"] & pynq_client.FLAG_GHOST
        assert entities[2]["flags"] & pynq_client.FLAG_GHOST


def test_pynq_client_caps_remote_entity_count():
    with pynq_import_context():
        pynq_client = importlib.import_module("pynq_client")

        players = [
            {"player_id": player_id, "x": float(player_id), "y": 0.0, "angle": 0.0, "flags": 0}
            for player_id in range(1, 8)
        ]

        entities = pynq_client.build_remote_entities(1, players)

        assert len(entities) == pynq_client.MAX_REMOTE_ENTITIES
        assert [entity["entity_id"] for entity in entities] == [2, 3, 4, 5]
