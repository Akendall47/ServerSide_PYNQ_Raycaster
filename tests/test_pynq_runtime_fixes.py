import asyncio
import importlib
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
