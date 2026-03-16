import asyncio
import errno
import importlib
import math
import struct
import sys
from contextlib import contextmanager
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PYNQ_EC2 = ROOT / "pynq_full" / "ec2"
PYNQ_SERVER = PYNQ_EC2 / "server"
PYNQ_INTERFACING = ROOT / "pynq_full" / "interfacing"
JUPYTER_SIDE = ROOT / "jupyter_side"


@contextmanager
def pynq_import_context():
    original_path = list(sys.path)
    sys.path[:0] = [str(JUPYTER_SIDE), str(PYNQ_INTERFACING), str(PYNQ_SERVER), str(PYNQ_EC2)]
    for name in list(sys.modules):
        if name in {
            "protocol",
            "test_package_v2",
            "test_package_v3",
            "test_package_v4",
            "t2_packet_handler",
            "match_state",
            "game_logic.match_state",
            "player_profiles",
            "t2_constants",
            "t2_map_loader",
        }:
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name in {
                "protocol",
                "test_package_v2",
                "test_package_v3",
                "test_package_v4",
                "t2_packet_handler",
                "match_state",
                "game_logic.match_state",
                "player_profiles",
                "t2_constants",
                "t2_map_loader",
            }:
                sys.modules.pop(name, None)


class FakeButtons:
    def __init__(self, value):
        self._value = value

    def read(self):
        return self._value


class FakeWriteQueue:
    def __init__(self):
        self.items = []

    def put(self, item):
        self.items.append(item)


class DummyBram:
    def __init__(self):
        self.writes = {}

    def write(self, offset, value):
        self.writes[offset] = value


class BlockingSock:
    def sendto(self, _packet, _addr):
        raise BlockingIOError(errno.EAGAIN, "Resource temporarily unavailable")


def test_test_package_v2_encodes_leftmost_wall_to_msb():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v2")

        tiles = bytearray(32 * 32)
        tiles[0] = 1
        tiles[5] = 1
        tiles[31] = 1
        tiles[(7 * 32) + 3] = 1

        rows = test_package._encode_map_rows_for_bram(32, 32, tiles)

        assert len(rows) == 32
        assert rows[0] == ((1 << 31) | (1 << 26) | (1 << 0))
        assert rows[7] == (1 << 28)
        assert rows[8] == 0


def test_test_package_v2_manual_turns_match_real_left_right():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v2")

        base_state = {
            "input_flags": 0,
            "angle_raw": 0,
            "angle": 0.0,
            "x": 0.0,
            "y": 0.0,
            "move_speed": 0.2,
            "turn_step": 64,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
        }

        left_state = dict(base_state)
        test_package._apply_manual_input(left_state, FakeButtons(test_package.BUTTON_TURN_LEFT_MASK))
        assert left_state["angle_raw"] == 64

        right_state = dict(base_state)
        test_package._apply_manual_input(right_state, FakeButtons(test_package.BUTTON_TURN_RIGHT_MASK))
        assert right_state["angle_raw"] == (test_package.HW_ANGLE_STEPS - 64)


def test_test_package_v3_manual_turns_match_real_left_right():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")

        base_state = {
            "input_flags": 0,
            "angle_raw": 0,
            "angle": 0.0,
            "x": 0.0,
            "y": 0.0,
            "move_speed": 0.2,
            "turn_step": 64,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
        }

        left_state = dict(base_state)
        test_package._apply_manual_input(left_state, FakeButtons(test_package.BUTTON_TURN_LEFT_MASK))
        assert left_state["angle_raw"] == 64

        right_state = dict(base_state)
        test_package._apply_manual_input(right_state, FakeButtons(test_package.BUTTON_TURN_RIGHT_MASK))
        assert right_state["angle_raw"] == (test_package.HW_ANGLE_STEPS - 64)


def test_test_package_v4_manual_turns_match_dashboard_left_right():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v4")

        base_state = {
            "input_flags": 0,
            "angle_raw": 0,
            "angle": 0.0,
            "x": 0.0,
            "y": 0.0,
            "move_speed": 0.2,
            "turn_step": 64,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "input_suspended_until": 0.0,
        }

        left_state = dict(base_state)
        test_package._apply_manual_input(left_state, FakeButtons(test_package.BTN_LEFT))
        assert left_state["angle_raw"] == (test_package.ANGLE_STEPS - 64)

        right_state = dict(base_state)
        test_package._apply_manual_input(right_state, FakeButtons(test_package.BTN_RIGHT))
        assert right_state["angle_raw"] == 64


def test_test_package_v3_tick_rate_scaling_preserves_20hz_baseline():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")

        assert test_package._scaled_linear_for_tick_rate(0.2, 20) == 0.2
        assert math.isclose(test_package._scaled_linear_for_tick_rate(0.2, 50), 0.08)
        assert test_package._scaled_linear_for_tick_rate(0.2, 60) == 0.2 / 3.0
        assert test_package._scaled_turn_step_for_tick_rate(64, 20) == 64
        assert test_package._scaled_turn_step_for_tick_rate(64, 50) == 26
        assert test_package._scaled_turn_step_for_tick_rate(64, 60) == 21
        assert test_package._scaled_period_ticks_for_tick_rate(4, 20) == 4
        assert test_package._scaled_period_ticks_for_tick_rate(4, 50) == 10
        assert test_package._scaled_period_ticks_for_tick_rate(4, 60) == 12


def test_test_package_v2_ignores_small_server_echo_deltas():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v2")

        state = {
            "player_id": 1,
            "x": 10.0,
            "y": 20.0,
            "angle": 0.5,
            "angle_raw": test_package._radians_to_hw_angle(0.5),
            "match_ended": False,
            "force_server_pose_sync": False,
            "server_pose_snap_distance": 1.0,
            "server_pose_snap_angle": 0.35,
        }

        test_package._update_local_pose_from_server(state, [{
            "player_id": 1,
            "x": 10.3,
            "y": 20.1,
            "angle": 0.62,
            "flags": 0,
        }])

        assert state["x"] == 10.0
        assert state["y"] == 20.0
        assert state["angle"] == 0.5
        assert state["match_ended"] is False


def test_test_package_v2_snaps_large_server_corrections_and_match_end():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v2")

        state = {
            "player_id": 1,
            "x": 10.0,
            "y": 20.0,
            "angle": 0.5,
            "angle_raw": test_package._radians_to_hw_angle(0.5),
            "match_ended": False,
            "force_server_pose_sync": False,
            "server_pose_snap_distance": 1.0,
            "server_pose_snap_angle": 0.35,
        }

        test_package._update_local_pose_from_server(state, [{
            "player_id": 1,
            "x": 18.0,
            "y": 28.0,
            "angle": 1.1,
            "flags": protocol.FLAG_MATCH_END,
        }])

        assert state["x"] == 18.0
        assert state["y"] == 28.0
        assert state["angle"] == 1.1
        assert state["match_ended"] is True


def test_test_package_v3_map_packet_clears_stale_end_and_bits_state():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v3")

        class DummyBram:
            def __init__(self):
                self.writes = []

            def write(self, offset, value):
                self.writes.append((offset, value))

        state = {
            "registered": True,
            "player_id": 1,
            "match_ended": True,
            "force_server_pose_sync": False,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "game_mode": protocol.GAME_MODE_CHASE_BITS,
            "bits_mask": 0xFFFF,
            "bits": [(1.0, 1.0)],
        }
        bram = DummyBram()
        tiles = bytearray(32 * 32)
        tiles[0] = 1
        pkt = protocol.pack_map_packet(0, 32, 32, 8, tiles)

        test_package._handle_packet(pkt, state, bram)

        assert state["match_ended"] is False
        assert state["game_mode"] == protocol.GAME_MODE_CHASE
        assert state["bits_mask"] == 0
        assert state["bits"] == []
        assert state["tiles"] == tiles
        assert len(bram.writes) == 32


def test_test_package_v4_write_map_clears_stale_rows_before_short_update():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v4")

        bram = DummyBram()
        old_tiles = bytearray(32 * 32)
        old_tiles[31 * 32] = 1
        test_package._write_map(bram, old_tiles, 32, 32)

        short_tiles = bytearray(8 * 8)
        short_tiles[0] = 1
        test_package._write_map(bram, short_tiles, 8, 8)

        assert bram.writes[0] == (1 << 31)
        assert bram.writes[31 * 4] == 0


def test_test_package_v4_ignores_stale_map_packets():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v4")

        def pack_map(timestamp, tiles):
            header = struct.pack(protocol.HEADER_FMT, protocol.PKT_MAP, 0, timestamp)
            map_header = struct.pack(protocol.MAP_HEADER_FMT, 32, 32, 8)
            return header + map_header + bytes(tiles)

        bram = DummyBram()
        state = {
            "registered": True,
            "player_id": 1,
            "mode": "manual",
            "x": 0.0,
            "y": 0.0,
            "angle": 0.0,
            "angle_raw": 0,
            "match_ended": False,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "game_mode": protocol.GAME_MODE_CHASE,
            "bits_mask": 0,
            "bits": [],
            "players": [],
            "input_flags": 0,
            "last_log": 0.0,
            "sprites_dirty": False,
            "force_server_pose_sync": False,
            "input_suspended_until": 0.0,
            "last_map_ts": None,
        }

        fresh_tiles = bytearray(32 * 32)
        fresh_tiles[0] = 1
        stale_tiles = bytearray(32 * 32)
        stale_tiles[(10 * 32) + 10] = 1

        test_package._handle(pack_map(2000, fresh_tiles), state, bram)
        test_package._handle(pack_map(1000, stale_tiles), state, bram)

        assert state["tiles"] == fresh_tiles
        assert bram.writes[0] == (1 << 31)
        assert bram.writes[10 * 4] == 0


def test_test_package_v4_auto_runner_prefers_nearest_active_bit_in_bits_mode():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v4")

        state = {
            "registered": True,
            "player_id": 1,
            "x": 0.0,
            "y": 0.0,
            "angle": 0.0,
            "angle_raw": 0,
            "input_flags": 0,
            "match_ended": False,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "game_mode": protocol.GAME_MODE_CHASE_BITS,
            "bits_mask": 0b11,
            "bits": [(-8.0, 0.0), (24.0, 0.0)],
            "players": [{"player_id": 1, "x": 0.0, "y": 0.0, "flags": 0}],
            "tick": 1,
        }

        test_package._apply_auto_input(state)

        assert state["x"] < 0.0
        assert (state["input_flags"] & protocol.FLAG_INPUT_SHOOT) == 0


def test_test_package_v4_auto_tagger_chases_runner_and_shoots_when_aligned():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v4")

        state = {
            "registered": True,
            "player_id": 2,
            "x": 0.0,
            "y": 0.0,
            "angle": 0.0,
            "angle_raw": 0,
            "input_flags": 0,
            "match_ended": False,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "game_mode": protocol.GAME_MODE_CHASE,
            "bits_mask": 0,
            "bits": [],
            "players": [
                {"player_id": 1, "x": 16.0, "y": 0.0, "flags": 0},
                {"player_id": 2, "x": 0.0, "y": 0.0, "flags": 0},
            ],
            "tick": 0,
        }

        test_package._apply_auto_input(state)

        assert state["x"] > 0.0
        assert state["input_flags"] & protocol.FLAG_INPUT_SHOOT


def test_test_package_v3_ignores_stale_game_state_packets():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v3")

        class DummyBram:
            def write(self, _offset, _value):
                pass

        def pack_game_state(seq, x, y, angle):
            payload = struct.pack(protocol.GAME_STATE_EXT_FMT, protocol.GAME_MODE_CHASE, 1, 0)
            payload += struct.pack(protocol.PLAYER_FMT, 1, float(x), float(y), float(angle), 0)
            header = struct.pack(protocol.HEADER_FMT, protocol.PKT_GAME_STATE, seq, 1000 + seq)
            return header + payload

        state = {
            "registered": True,
            "player_id": 1,
            "x": 0.0,
            "y": 0.0,
            "angle": 0.0,
            "angle_raw": test_package._radians_to_hw_angle(0.0),
            "match_ended": False,
            "force_server_pose_sync": True,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "game_mode": protocol.GAME_MODE_CHASE,
            "bits_mask": 0,
            "bits": [],
            "players": [],
            "last_state_log_at": 0.0,
            "last_game_state_seq": None,
        }

        bram = DummyBram()
        test_package._handle_packet(pack_game_state(10, 4.0, 5.0, 0.25), state, bram)
        test_package._handle_packet(pack_game_state(9, 14.0, 15.0, 1.25), state, bram)

        assert state["x"] == 4.0
        assert state["y"] == 5.0
        assert state["angle"] == 0.25


def test_test_package_v3_ignores_soft_server_corrections_while_manual_input_is_recent():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")

        state = {
            "player_id": 1,
            "mode": "manual",
            "x": 10.0,
            "y": 20.0,
            "angle": 0.5,
            "angle_raw": test_package._radians_to_hw_angle(0.5),
            "match_ended": False,
            "force_server_pose_sync": False,
            "server_pose_snap_distance": 4.0,
            "server_pose_snap_angle": 0.75,
            "server_pose_hard_snap_distance": 12.0,
            "server_pose_hard_snap_angle": 1.8,
            "last_manual_input_at": 0.0,
        }

        original_monotonic = test_package.time.monotonic
        try:
            now = original_monotonic()
            state["last_manual_input_at"] = now
            test_package.time.monotonic = lambda: now
            test_package._update_local_pose_from_server(state, [{
                "player_id": 1,
                "x": 12.0,
                "y": 20.5,
                "angle": 0.9,
                "flags": 0,
            }])
        finally:
            test_package.time.monotonic = original_monotonic

        assert state["x"] == 10.0
        assert state["y"] == 20.0
        assert state["angle"] == 0.5


def test_test_package_v3_keeps_manual_angle_local_even_when_position_snaps():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")

        state = {
            "player_id": 1,
            "mode": "manual",
            "x": 10.0,
            "y": 20.0,
            "angle": 0.5,
            "angle_raw": test_package._radians_to_hw_angle(0.5),
            "match_ended": False,
            "force_server_pose_sync": False,
            "server_pose_snap_distance": 4.0,
            "server_pose_snap_angle": 0.1,
            "server_pose_hard_snap_distance": 8.0,
            "server_pose_hard_snap_angle": 0.2,
            "last_manual_input_at": 0.0,
        }

        test_package._update_local_pose_from_server(state, [{
            "player_id": 1,
            "x": 25.0,
            "y": 28.0,
            "angle": 1.4,
            "flags": 0,
        }])

        assert state["x"] == 25.0
        assert state["y"] == 28.0
        assert state["angle"] == 0.5


def test_test_package_v3_builds_fallback_lobby_map_with_border_walls():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")

        fallback = test_package._build_fallback_lobby_map()

        assert fallback["map_w"] == 32
        assert fallback["map_h"] == 32
        assert fallback["tile_scale"] == 8
        assert len(fallback["tiles"]) == 32 * 32
        assert all(fallback["tiles"][col] == 1 for col in range(32))
        assert all(fallback["tiles"][31 * 32 + col] == 1 for col in range(32))
        assert all(fallback["tiles"][row * 32] == 1 for row in range(32))
        assert all(fallback["tiles"][row * 32 + 31] == 1 for row in range(32))
        assert fallback["tiles"][16 * 32 + 16] == 0


def test_test_package_v3_suspends_manual_input_during_map_sync_grace():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")

        state = {
            "input_flags": 0,
            "angle_raw": 0,
            "angle": 0.0,
            "x": 0.0,
            "y": 0.0,
            "move_speed": 0.2,
            "turn_step": 64,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "input_suspended_until": 9999999999.0,
        }

        test_package._apply_manual_input(
            state,
            FakeButtons(
                test_package.BUTTON_FORWARD_MASK | test_package.BUTTON_TURN_LEFT_MASK
            ),
        )

        assert state["x"] == 0.0
        assert state["y"] == 0.0
        assert state["angle_raw"] == 0


def test_test_package_v3_drops_backpressured_state_send_without_crashing():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")

        state = {
            "seq": 12,
            "x": 1.0,
            "y": 2.0,
            "angle": 0.5,
            "input_flags": 0,
            "match_ended": False,
            "tx_drop_count": 0,
            "last_tx_error_log_at": 0.0,
            "last_state_tx_at": 0.0,
        }

        ok = test_package._send_state(BlockingSock(), ("127.0.0.1", 9000), state)

        assert ok is False
        assert state["seq"] == 12
        assert state["tx_drop_count"] == 1


def test_test_package_v3_build_remote_entities_keeps_ghosts_and_caps():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")
        protocol = importlib.import_module("protocol")

        players = [
            {"player_id": 1, "x": 10.0, "y": 20.0, "angle": 0.25, "flags": 0},
            {"player_id": 2, "x": 30.0, "y": 40.0, "angle": 0.50, "flags": 0},
            {"player_id": 3, "x": 50.0, "y": 60.0, "angle": 0.75, "flags": protocol.FLAG_GHOST},
            {"player_id": 4, "x": 70.0, "y": 80.0, "angle": 1.00, "flags": protocol.FLAG_GHOST},
            {"player_id": 5, "x": 90.0, "y": 100.0, "angle": 1.25, "flags": 0},
            {"player_id": 6, "x": 110.0, "y": 120.0, "angle": 1.50, "flags": 0},
        ]

        entities = test_package.build_remote_entities(1, players)

        assert len(entities) == test_package.HW_MAX_REMOTE_ENTITIES
        assert [entity["entity_id"] for entity in entities] == [2, 3, 4, 5]
        assert entities[1]["flags"] & protocol.FLAG_GHOST
        assert entities[2]["flags"] & protocol.FLAG_GHOST


def test_test_package_v3_writes_sprite_tables_and_clears_unused_slots():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v3")
        protocol = importlib.import_module("protocol")

        bram = DummyBram()
        state = {
            "player_id": 1,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "players": [
                {"player_id": 1, "x": 0.0, "y": 0.0, "angle": 0.0, "flags": 0},
                {"player_id": 2, "x": 16.0, "y": -8.0, "angle": 0.5, "flags": 0},
                {"player_id": 3, "x": -24.0, "y": 12.0, "angle": 1.0, "flags": protocol.FLAG_GHOST},
            ],
            "bits": [(8.0, 8.0), (-8.0, 16.0)],
            "bits_mask": 0b11,
        }

        test_package._write_sprite_state_to_bram(bram, state)

        entities = state["remote_entities"]
        assert len(entities) == 2
        assert bram.writes[test_package.HW_REMOTE_ENTITY_COUNT_OFFSET] == 2
        assert bram.writes[test_package.HW_BITS_COUNT_OFFSET] == 2
        assert bram.writes[test_package.HW_BITS_MASK_OFFSET] == 0b11

        entity0_base = test_package.HW_REMOTE_ENTITY_BASE_OFFSET
        entity1_base = entity0_base + (test_package.HW_REMOTE_ENTITY_STRIDE_WORDS * 4)
        empty_entity_base = entity1_base + (test_package.HW_REMOTE_ENTITY_STRIDE_WORDS * 4)
        assert bram.writes[entity0_base] == test_package._pack_hw_xy_word(16.0, -8.0, 8, 32, 32)
        assert bram.writes[entity0_base + 4] == test_package._pack_remote_entity_meta(entities[0])
        assert bram.writes[entity1_base] == test_package._pack_hw_xy_word(-24.0, 12.0, 8, 32, 32)
        assert bram.writes[entity1_base + 4] == test_package._pack_remote_entity_meta(entities[1])
        assert bram.writes[empty_entity_base] == 0
        assert bram.writes[empty_entity_base + 4] == 0

        assert bram.writes[test_package.HW_BITS_BASE_OFFSET] == test_package._pack_hw_xy_word(8.0, 8.0, 8, 32, 32)
        assert bram.writes[test_package.HW_BITS_BASE_OFFSET + 4] == test_package._pack_hw_xy_word(-8.0, 16.0, 8, 32, 32)
        assert bram.writes[test_package.HW_BITS_BASE_OFFSET + (15 * 4)] == 0


def test_pynq_redis_io_sanitises_none_values_before_hset():
    with pynq_import_context():
        redis_io_mod = importlib.import_module("t2_redis_io")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        state.players = {
            ("ghost", 1): {
                "player_id": 3,
                "x": 1.0,
                "y": 2.0,
                "angle": 0.5,
                "flags": 0,
                "board_slot": None,
                "control_mode": None,
                "username": None,
                "display_name": None,
                "profile_key": None,
                "controller_key": None,
                "identity_source": None,
            }
        }
        state.selected_map_name = None
        queue = FakeWriteQueue()
        redis_io = redis_io_mod.RedisIO(
            state=state,
            map_state={"name": None, "bits": []},
            broadcast_queue=None,
            write_queue=queue,
        )

        redis_io.push_redis_writes(tick_count=1, match_tick=0)

        hsets = [item for item in queue.items if item.get("op") == "hset"]
        assert hsets
        for item in hsets:
            assert all(value is not None for value in item["mapping"].values())


def test_pynq_packet_handler_allows_single_player_match_start():
    with pynq_import_context():
        packet_handler = importlib.import_module("t2_packet_handler")
        match_state = importlib.import_module("game_logic.match_state")
        protocol = importlib.import_module("protocol")

        state = match_state.MatchState()
        state.players = {
            ("127.0.0.1", 9001): {
                "player_id": 0,
                "x": 0.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": None,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_ANY,
                "board_slot": 1,
                "control_mode": "manual",
                "username": "solo",
                "display_name": "solo",
                "profile_key": "solo",
                "controller_key": "controller-solo",
                "identity_source": "username",
            },
        }
        state.pending_roles = {("127.0.0.1", 9001): protocol.ROLE_ANY}
        state.slot_modes = {1: "manual", 2: "manual"}

        handler = packet_handler.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=FakeWriteQueue(),
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(),
                "name": "single_player_test",
                "bits": [],
                "spawn_positions": [(-32.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda *_args, **_kwargs: None,
            on_match_pause=lambda *_args, **_kwargs: None,
            on_match_resume=lambda *_args, **_kwargs: None,
            on_event=lambda *_args, **_kwargs: None,
        )

        ok, message = handler.start_match_from_lobby()

        assert ok is True
        assert message == "single-player match started"
        assert state.match_started is True
        assert state.players[("127.0.0.1", 9001)]["player_id"] == 1


def test_pynq_packet_handler_rejects_stale_sequences():
    with pynq_import_context():
        packet_handler = importlib.import_module("t2_packet_handler")
        match_state = importlib.import_module("game_logic.match_state")
        protocol = importlib.import_module("protocol")

        state = match_state.MatchState()
        addr = ("127.0.0.1", 9001)
        state.players = {
            addr: {
                "player_id": 1,
                "x": 1.0,
                "y": 2.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 10,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_ANY,
                "board_slot": 1,
                "control_mode": "manual",
                "username": "p1",
                "display_name": "p1",
                "profile_key": "p1",
                "controller_key": "controller-p1",
                "identity_source": "username",
            },
        }

        handler = packet_handler.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=FakeWriteQueue(),
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "name": "test_map",
                "bits": [],
                "spawn_positions": [],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda *_args, **_kwargs: None,
            on_match_pause=lambda *_args, **_kwargs: None,
            on_match_resume=lambda *_args, **_kwargs: None,
            on_event=lambda *_args, **_kwargs: None,
        )

        pkt = protocol.pack_node_packet(
            pkt_type=protocol.PKT_STATE_UPDATE,
            seq=9,
            x=9.0,
            y=9.0,
            angle=1.0,
            flags=0,
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )

        handler._process_packet({"data": pkt, "addr": addr})

        assert state.players[addr]["last_seq"] == 10
        assert state.players[addr]["x"] == 1.0
        assert state.players[addr]["y"] == 2.0
