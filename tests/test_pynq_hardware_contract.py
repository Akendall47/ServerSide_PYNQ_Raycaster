import importlib
import json
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
            "t2_constants", "t2_map_loader", "run_pynq", "protocol", "test_package_v2",
            "player_profiles", "t2_packet_handler", "t2_redis_io", "t2_game_tick",
            "replay_store", "game_logic.match_state",
        }:
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name in {
                "t2_constants", "t2_map_loader", "run_pynq", "protocol", "test_package_v2",
                "player_profiles", "t2_packet_handler", "t2_redis_io", "t2_game_tick",
                "replay_store", "game_logic.match_state",
            }:
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


def test_run_pynq_encodes_map_pose_and_angle_for_real_hardware():
    with pynq_import_context():
        run_pynq = importlib.import_module("run_pynq")

        tiles = bytearray(32 * 32)
        tiles[0] = 1
        tiles[5] = 1
        tiles[31] = 1
        tiles[(7 * 32) + 3] = 1

        class DummyBram:
            def __init__(self):
                self.writes = {}

            def write(self, offset, value):
                self.writes[offset] = value

        bram = DummyBram()
        assert run_pynq._write_map(bram, tiles, 32, 32) is True

        assert bram.writes[0] == ((1 << 0) | (1 << 5) | (1 << 31))
        assert bram.writes[7 * 4] == (1 << 3)
        assert bram.writes[8 * 4] == 0

        assert run_pynq._q6_10(0.0, 8, 32) == (16 << 10)
        assert run_pynq._q6_10(-8.0, 8, 32) == (15 << 10)
        assert run_pynq._hw_angle(0.0) == 0
        assert run_pynq._hw_angle(3.141592653589793 / 2) == 1024


def test_run_pynq_keeps_remote_entities_including_ghosts():
    with pynq_import_context():
        run_pynq = importlib.import_module("run_pynq")
        protocol = importlib.import_module("protocol")

        players = [
            {"player_id": 1, "x": 10.0, "y": 20.0, "angle": 0.25, "flags": 0},
            {"player_id": 2, "x": 30.0, "y": 40.0, "angle": 0.50, "flags": 0},
            {"player_id": 3, "x": 50.0, "y": 60.0, "angle": 0.75, "flags": protocol.FLAG_GHOST},
            {"player_id": 4, "x": 70.0, "y": 80.0, "angle": 1.00, "flags": protocol.FLAG_GHOST},
        ]

        class DummyBram:
            def __init__(self):
                self.writes = {}

            def write(self, offset, value):
                self.writes[offset] = value

        state = {
            "player_id": 1,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "players": players,
            "bits": [],
            "bits_mask": 0,
        }
        bram = DummyBram()
        run_pynq._write_sprites(bram, state)

        meta0 = bram.writes[run_pynq.ENTITY_BASE_OFFSET + 4]
        meta1 = bram.writes[run_pynq.ENTITY_BASE_OFFSET + 12]
        meta2 = bram.writes[run_pynq.ENTITY_BASE_OFFSET + 20]
        assert (meta0 >> 24) & 0x7F == 2
        assert (meta1 >> 24) & 0x7F == 3
        assert (meta2 >> 24) & 0x7F == 4
        assert (meta1 >> 16) & 0xFF & protocol.FLAG_GHOST
        assert (meta2 >> 16) & 0xFF & protocol.FLAG_GHOST


def test_run_pynq_caps_remote_entity_count():
    with pynq_import_context():
        run_pynq = importlib.import_module("run_pynq")

        players = [
            {"player_id": player_id, "x": float(player_id), "y": 0.0, "angle": 0.0, "flags": 0}
            for player_id in range(1, 8)
        ]

        class DummyBram:
            def __init__(self):
                self.writes = {}

            def write(self, offset, value):
                self.writes[offset] = value

        state = {
            "player_id": 1,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "players": players,
            "bits": [],
            "bits_mask": 0,
        }
        bram = DummyBram()
        run_pynq._write_sprites(bram, state)

        metas = [
            bram.writes[run_pynq.ENTITY_BASE_OFFSET + 4 + (slot * 8)]
            for slot in range(run_pynq.MAX_ENTITIES)
        ]
        assert [((meta >> 24) & 0x7F) for meta in metas] == [2, 3, 4, 5]


def test_run_pynq_decodes_button_gpio_bits():
    with pynq_import_context():
        run_pynq = importlib.import_module("run_pynq")

        state = {
            "input_flags": 0,
            "angle_raw": 0,
            "angle": 0.0,
            "x": 0.0,
            "y": 0.0,
            "move_speed": 0.0,
            "turn_step": 64,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "input_suspended_until": 0.0,
        }

        class Buttons:
            def read(self):
                return run_pynq.BTN_FWD | run_pynq.BTN_RIGHT

        run_pynq._apply_manual_input(state, Buttons())
        assert state["angle_raw"] == 64


def test_run_pynq_auto_runner_prefers_nearest_active_bit_in_bits_mode():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("run_pynq")

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
        assert (state["input_flags"] & protocol.FLAG_SHOOTING) == 0


def test_run_pynq_auto_tagger_chases_runner_and_shoots_when_aligned():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("run_pynq")

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
        assert state["input_flags"] & protocol.FLAG_SHOOTING


def test_run_pynq_pathfinder_routes_through_gap():
    with pynq_import_context():
        test_package = importlib.import_module("run_pynq")

        width = 8
        height = 8
        tiles = bytearray(width * height)
        for row in range(height):
            tiles[row * width + 4] = 1
        tiles[4 * width + 4] = 0

        state = {"map_w": width, "map_h": height, "tile_scale": 8, "tiles": tiles}
        start = test_package._nearest_open_cell(state, -12.0, -12.0)
        goal = test_package._nearest_open_cell(state, 12.0, -12.0)
        path = test_package._build_cell_path(
            state,
            start,
            goal,
        )

        assert path[0] == start
        assert path[-1] == goal
        assert (4, 4) in path


def test_run_pynq_runtime_mode_packet_switches_live_mode():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("run_pynq")

        state = {
            "mode": "manual",
            "registered": True,
            "player_id": 1,
            "x": 0.0,
            "y": 0.0,
            "angle": 0.0,
            "angle_raw": 0,
            "input_flags": 0,
            "game_mode": protocol.GAME_MODE_CHASE,
            "bits_mask": 0,
            "bits": [],
            "players": [],
            "last_state_log_at": 0.0,
        }

        packet = protocol.pack_node_mode_packet(seq=9, mode=protocol.NODE_CONTROL_MODE_AUTO)
        test_package._handle(packet, state, bram=test_package._NullBram())

        assert state["mode"] == "auto"


def test_run_pynq_manual_input_uses_runtime_speed_override():
    with pynq_import_context():
        test_package = importlib.import_module("run_pynq")

        class Buttons:
            def read(self):
                return test_package.BTN_FWD

        state = {
            "x": 0.0,
            "y": 0.0,
            "angle": 0.0,
            "angle_raw": 0,
            "input_flags": 0,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "tiles": bytearray(32 * 32),
            "move_speed": 0.75,
            "turn_step": 64,
        }

        test_package._apply_manual_input(state, Buttons())

        assert state["x"] == 0.75
        assert state["y"] == 0.0


def test_run_pynq_ack_clears_live_state():
    with pynq_import_context():
        run_pynq = importlib.import_module("run_pynq")
        protocol = importlib.import_module("protocol")

        state = {
            "registered": True,
            "player_id": 2,
            "mode": "manual",
            "x": 3.0,
            "y": 4.0,
            "angle": 0.5,
            "angle_raw": 99,
            "map_w": 32,
            "map_h": 32,
            "tile_scale": 8,
            "match_ended": True,
            "bits": [(1.0, 1.0)],
            "bits_mask": 7,
            "players": [{"player_id": 3}],
            "input_flags": protocol.FLAG_INPUT_SHOOT,
            "force_server_pose_sync": False,
            "input_suspended_until": 0.0,
            "last_game_state_seq": 10,
            "last_ack_ts": None,
        }

        packet = struct.pack(protocol.HEADER_FMT, protocol.PKT_ACK, 0, 1234) + struct.pack("<B", 1)
        run_pynq._handle(packet, state, run_pynq._NullBram())

        assert state["registered"] is True
        assert state["player_id"] == 1
        assert state["match_ended"] is False
        assert state["bits"] == []
        assert state["bits_mask"] == 0
        assert state["players"] == []
        assert state["input_flags"] == 0
        assert state["x"] == 0.0
        assert state["y"] == 0.0


def test_register_packet_round_trips_username_trailer():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")

        packet = protocol.pack_register_packet(
            seq=7,
            x=1.25,
            y=-3.5,
            angle=0.75,
            preferred_role=protocol.ROLE_RUNNER,
            username="louis",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        unpacked = protocol.unpack_register_packet(packet)

        assert unpacked["pkt_type"] == protocol.PKT_REGISTER
        assert unpacked["preferred_role"] == protocol.ROLE_RUNNER
        assert unpacked["username"] == "louis"
        assert unpacked["movement_mode"] == protocol.MOVEMENT_MODE_POSE


def test_node_mode_packet_round_trips_auto_control():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")

        packet = protocol.pack_node_mode_packet(
            seq=7,
            mode=protocol.NODE_CONTROL_MODE_AUTO,
        )
        pkt_type, seq, _ = protocol.unpack_header(packet)

        assert pkt_type == protocol.PKT_NODE_MODE
        assert seq == 7
        assert protocol.unpack_node_mode_packet(packet) == protocol.NODE_CONTROL_MODE_AUTO
        assert protocol.decode_node_control_mode(protocol.unpack_node_mode_packet(packet)) == "auto"


def test_node_mode_packet_round_trips_replay_control():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")

        packet = protocol.pack_node_mode_packet(
            seq=11,
            mode=protocol.NODE_CONTROL_MODE_REPLAY,
        )
        pkt_type, seq, _ = protocol.unpack_header(packet)

        assert pkt_type == protocol.PKT_NODE_MODE
        assert seq == 11
        assert protocol.unpack_node_mode_packet(packet) == protocol.NODE_CONTROL_MODE_REPLAY
        assert protocol.decode_node_control_mode(protocol.unpack_node_mode_packet(packet)) == "replay"


def test_player_identity_falls_back_to_controller_key_without_username():
    with pynq_import_context():
        player_profiles = importlib.import_module("player_profiles")

        identity = player_profiles.build_player_identity("", ("192.168.2.55", 50123))

        assert identity["identity_source"] == "controller"
        assert identity["profile_key"] == "controller-192-168-2-55"
        assert identity["display_name"] == "controller-192-168-2-55"


def test_player_identity_uses_controller_key_when_username_has_no_safe_slug():
    with pynq_import_context():
        player_profiles = importlib.import_module("player_profiles")

        identity = player_profiles.build_player_identity("!!!", ("192.168.2.56", 50123))

        assert identity["username"] == "!!!"
        assert identity["display_name"] == "!!!"
        assert identity["profile_key"] == "controller-192-168-2-56"


def test_packet_handler_registers_username_and_profile_metadata():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            udp_transport=None,
            map_state={"width": 32, "height": 32, "tile_scale": 8, "tiles": bytearray(32 * 32)},
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        addr = ("192.168.2.10", 40000)
        packet = protocol.pack_register_packet(
            seq=1,
            x=0.0,
            y=0.0,
            angle=0.0,
            preferred_role=protocol.ROLE_TAGGER,
            username="kat",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        handler._process_packet({"data": packet, "addr": addr})

        player = state.players[("username", "kat")]
        assert player["username"] == "kat"
        assert player["display_name"] == "kat"
        assert player["profile_key"] == "kat"
        assert player["controller_key"] == "controller-192-168-2-10"
        assert player["player_id"] == 0
        assert state.match_started is False
        assert state.pending_roles[("username", "kat")] == protocol.ROLE_TAGGER


def test_pynq_packet_handler_queues_single_player_lobby_session():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        class DummyQueue:
            def __init__(self):
                self.items = []

            def put(self, item):
                self.items.append(item)

        state = match_state_mod.MatchState()
        transport = DummyTransport()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=DummyQueue(),
            udp_transport=transport,
            map_state={
                "name": "lobby",
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0), (16.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        addr = ("192.168.2.10", 40000)
        packet = protocol.pack_register_packet(
            seq=1,
            x=0.0,
            y=0.0,
            angle=0.0,
            preferred_role=protocol.ROLE_TAGGER,
            username="solo",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        handler._process_packet({"data": packet, "addr": addr})

        assert state.match_started is False
        player = state.players[("username", "solo")]
        assert player["player_id"] == 0
        assert player["board_slot"] == 1
        assert player["control_mode"] == "manual"
        assert len(transport.sent) == 4
        ack_type, _, _ = protocol.unpack_header(transport.sent[0][0])
        assert ack_type == protocol.PKT_ACK
        assert transport.sent[0][0][protocol.HEADER_SIZE] == 1
        map_width, map_height, _, _ = protocol.unpack_map_packet(transport.sent[1][0])
        assert (map_width, map_height) == (32, 32)
        bits_type, _, _ = protocol.unpack_header(transport.sent[2][0])
        assert bits_type == protocol.PKT_BITS_INIT
        assert protocol.unpack_bits_init_packet(transport.sent[2][0]) == []
        mode_type, _, _ = protocol.unpack_header(transport.sent[3][0])
        assert mode_type == protocol.PKT_NODE_MODE
        assert protocol.unpack_node_mode_packet(transport.sent[3][0]) == protocol.NODE_CONTROL_MODE_MANUAL
        assert not any(str(player_addr).startswith("ghost:") for player_addr in state.players)


def test_pynq_packet_handler_keeps_two_humans_in_lobby_until_manual_start():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        match_started = []
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0)],
            },
            on_match_start=lambda: match_started.append(True),
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        addr1 = ("192.168.2.10", 40000)
        addr2 = ("192.168.2.11", 40001)
        for seq, addr in enumerate((addr1, addr2), start=1):
            packet = protocol.pack_register_packet(
                seq=seq,
                x=0.0,
                y=0.0,
                angle=0.0,
                preferred_role=protocol.ROLE_RUNNER,
                username="",
                movement_mode=protocol.MOVEMENT_MODE_POSE,
            )
            handler._process_packet({"data": packet, "addr": addr})

        assert state.match_started is False
        assert match_started == []
        assert sorted(player["player_id"] for player in state.players.values()) == [0, 0]
        assert not any(str(addr).startswith("ghost:") for addr in state.players)

        started, message = handler.start_match_from_lobby()

        assert started is True
        assert message == "match started"
        assert state.match_started is True
        assert match_started == [True]
        assert sorted(player["player_id"] for player in state.players.values()) == [1, 2]


def test_pynq_packet_handler_runtime_mode_switch_targets_connected_board_slot():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        class DummyQueue:
            def __init__(self):
                self.items = []

            def put(self, item):
                self.items.append(item)

        state = match_state_mod.MatchState()
        transport = DummyTransport()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=DummyQueue(),
            udp_transport=transport,
            map_state={
                "name": "lobby",
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        addr = ("192.168.2.10", 40000)
        packet = protocol.pack_register_packet(
            seq=1,
            x=0.0,
            y=0.0,
            angle=0.0,
            preferred_role=protocol.ROLE_ANY,
            username="solo",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        handler._process_packet({"data": packet, "addr": addr})
        sent_before = len(transport.sent)

        updated, message = handler.set_node_mode(1, "auto")

        assert updated is True
        assert message == "board 1 -> auto"
        assert state.slot_modes[1] == "auto"
        assert state.players[("username", "solo")]["control_mode"] == "auto"
        assert len(transport.sent) == sent_before + 1
        mode_type, _, _ = protocol.unpack_header(transport.sent[-1][0])
        assert mode_type == protocol.PKT_NODE_MODE
        assert protocol.unpack_node_mode_packet(transport.sent[-1][0]) == protocol.NODE_CONTROL_MODE_AUTO
        assert transport.sent[-1][1] == addr


def test_pynq_packet_handler_registration_sends_empty_bits_init_for_lobby_sync():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        state = match_state_mod.MatchState()
        transport = DummyTransport()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            udp_transport=transport,
            map_state={
                "name": "lobby",
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        addr = ("192.168.2.10", 40000)
        packet = protocol.pack_register_packet(
            seq=1,
            x=0.0,
            y=0.0,
            angle=0.0,
            preferred_role=protocol.ROLE_ANY,
            username="solo",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        handler._process_packet({"data": packet, "addr": addr})

        packet_types = [protocol.unpack_header(data)[0] for data, _ in transport.sent]
        assert protocol.PKT_ACK in packet_types
        assert protocol.PKT_MAP in packet_types
        assert protocol.PKT_BITS_INIT in packet_types
        bits_packet = next(data for data, _ in transport.sent if protocol.unpack_header(data)[0] == protocol.PKT_BITS_INIT)
        assert protocol.unpack_bits_init_packet(bits_packet) == []


def test_pynq_packet_handler_start_match_supports_one_human_plus_ghost():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0), (16.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        solo_addr = ("192.168.2.10", 40000)
        solo_packet = protocol.pack_register_packet(
            seq=1,
            x=0.0,
            y=0.0,
            angle=0.0,
            preferred_role=protocol.ROLE_ANY,
            username="solo",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )

        handler._process_packet({"data": solo_packet, "addr": solo_addr})
        handler.set_ghost_count(1)

        started, message = handler.start_match_from_lobby()

        assert started is True
        assert message == "match started"
        assert state.match_started is True
        assert ("username", "solo") in state.players
        assert state.players[("username", "solo")]["player_id"] == 1
        ghost_keys = [addr for addr in state.players if str(addr).startswith("ghost:")]
        assert len(ghost_keys) == 1
        assert state.players[ghost_keys[0]]["flags"] & protocol.FLAG_GHOST


def test_pynq_packet_handler_monitor_ghost_requests_do_not_start_match():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyQueue:
            def __init__(self):
                self.items = []

            def put(self, item):
                self.items.append(item)

        state = match_state_mod.MatchState()
        write_queue = DummyQueue()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=write_queue,
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        handler.set_ghost_count(1)

        ghost_keys = [addr for addr in state.players if str(addr).startswith("ghost:")]
        assert len(ghost_keys) == 1
        assert state.match_started is False
        ghost = state.players[ghost_keys[0]]
        assert ghost["flags"] & protocol.FLAG_GHOST
        assert ghost["player_id"] >= 3
        assert write_queue.items == []


def test_pynq_packet_handler_applies_saved_ghost_profile_to_spawned_slot():
    with pynq_import_context():
        import asyncio

        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0), (16.0, 0.0), (24.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        updated, message = handler.set_ghost_profile(2, speed=0.09, tag_radius=10.5)
        handler.set_ghost_count(2)

        assert updated is True
        assert "ghost 2 traits" in message
        assert state.players["ghost:1"]["ghost_slot"] == 1
        assert state.players["ghost:2"]["ghost_slot"] == 2
        assert state.players["ghost:2"]["speed"] == 0.09
        assert state.players["ghost:2"]["tag_radius"] == 10.5
        assert state.ghost_profile(2)["speed"] == 0.09
        assert state.ghost_profile(2)["tag_radius"] == 10.5


def test_pynq_packet_handler_return_to_lobby_preserves_humans_and_ghosts():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyQueue:
            def __init__(self):
                self.items = []

            def put(self, item):
                self.items.append(item)

        state = match_state_mod.MatchState()
        write_queue = DummyQueue()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=write_queue,
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0), (16.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        state.players = {
            ("runner", 1): {
                "player_id": 1,
                "x": 4.0,
                "y": 4.0,
                "angle": 0.5,
                "flags": protocol.FLAG_MATCH_END,
                "last_seen": 0.0,
                "last_seq": 2,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_RUNNER,
            },
            ("tagger", 2): {
                "player_id": 2,
                "x": 12.0,
                "y": 4.0,
                "angle": 1.0,
                "flags": protocol.FLAG_TAGGED,
                "last_seen": 0.0,
                "last_seq": 3,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_TAGGER,
            },
            "ghost:1": {
                "player_id": 3,
                "x": 20.0,
                "y": 4.0,
                "angle": 1.57,
                "flags": protocol.FLAG_GHOST | protocol.FLAG_MATCH_END,
                "last_seen": 0.0,
                "last_seq": None,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
            },
        }
        state.match_started = True
        state.match_ended = True
        state.pending_roles = {("runner", 1): protocol.ROLE_RUNNER, ("tagger", 2): protocol.ROLE_TAGGER}

        handler.return_players_to_lobby()

        assert state.match_started is False
        assert state.match_ended is False
        assert state.players[("runner", 1)]["player_id"] == 0
        assert state.players[("tagger", 2)]["player_id"] == 0
        assert state.players["ghost:1"]["player_id"] == 3
        assert state.players["ghost:1"]["flags"] == protocol.FLAG_GHOST
        assert state.pending_roles[("runner", 1)] == protocol.ROLE_RUNNER
        assert state.pending_roles[("tagger", 2)] == protocol.ROLE_TAGGER
        assert [item["key"] for item in write_queue.items] == ["player:1", "player:2", "player:3"]


def test_pynq_packet_handler_return_to_lobby_sends_empty_bits_init_to_clear_clients():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        class DummyQueue:
            def __init__(self):
                self.items = []

            def put(self, item):
                self.items.append(item)

        state = match_state_mod.MatchState()
        transport = DummyTransport()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=DummyQueue(),
            udp_transport=transport,
            map_state={
                "name": "lobby",
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0), (16.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        state.players = {
            ("runner", 1): {
                "player_id": 1,
                "x": 4.0,
                "y": 4.0,
                "angle": 0.5,
                "flags": protocol.FLAG_MATCH_END,
                "last_seen": 0.0,
                "last_seq": 2,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_RUNNER,
                "board_slot": 1,
                "control_mode": "manual",
                "username": "runner",
                "display_name": "runner",
                "profile_key": "runner",
                "controller_key": "controller-runner",
                "identity_source": "username",
            },
            ("tagger", 2): {
                "player_id": 2,
                "x": 12.0,
                "y": 4.0,
                "angle": 1.0,
                "flags": protocol.FLAG_TAGGED,
                "last_seen": 0.0,
                "last_seq": 3,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_TAGGER,
                "board_slot": 2,
                "control_mode": "auto",
                "username": "tagger",
                "display_name": "tagger",
                "profile_key": "tagger",
                "controller_key": "controller-tagger",
                "identity_source": "username",
            },
        }
        state.match_started = True
        state.match_ended = True
        state.pending_roles = {
            ("runner", 1): protocol.ROLE_RUNNER,
            ("tagger", 2): protocol.ROLE_TAGGER,
        }

        handler.return_players_to_lobby()

        bits_packets = [
            data for data, _ in transport.sent
            if protocol.unpack_header(data)[0] == protocol.PKT_BITS_INIT
        ]
        assert len(bits_packets) == 2
        assert all(protocol.unpack_bits_init_packet(packet) == [] for packet in bits_packets)


def test_pynq_packet_handler_start_match_prefers_board_slot_order_when_roles_are_unspecified():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=asyncio.Queue(),
            udp_transport=None,
            map_state={
                "name": "ghost_chase",
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(-24.0, 0.0), (24.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        # Insert board 2 first to prove role/spawn order is not driven by dict history.
        state.players = {
            ("board2", 2): {
                "player_id": 0,
                "x": 9.0,
                "y": 1.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": None,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_ANY,
                "board_slot": 2,
                "control_mode": "manual",
            },
            ("board1", 1): {
                "player_id": 0,
                "x": -9.0,
                "y": 1.0,
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
            },
        }
        state.pending_roles = {
            ("board2", 2): protocol.ROLE_ANY,
            ("board1", 1): protocol.ROLE_ANY,
        }

        started, _ = handler.start_match_from_lobby()

        assert started is True
        assert state.players[("board1", 1)]["player_id"] == 1
        assert state.players[("board2", 2)]["player_id"] == 2
        assert state.players[("board1", 1)]["x"] == -24.0
        assert state.players[("board2", 2)]["x"] == 24.0


def test_pynq_packet_handler_return_to_lobby_requeues_humans_by_board_slot():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyQueue:
            def __init__(self):
                self.items = []

            def put(self, item):
                self.items.append(item)

        state = match_state_mod.MatchState()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=DummyQueue(),
            udp_transport=None,
            map_state={
                "name": "lobby",
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(-24.0, 0.0), (24.0, 0.0), (0.0, 24.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        state.players = {
            ("board2", 2): {
                "player_id": 2,
                "x": 12.0,
                "y": 8.0,
                "angle": 1.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 7,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_TAGGER,
                "board_slot": 2,
                "control_mode": "manual",
            },
            ("board1", 1): {
                "player_id": 1,
                "x": 4.0,
                "y": 8.0,
                "angle": 0.25,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 5,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_RUNNER,
                "board_slot": 1,
                "control_mode": "manual",
            },
        }
        state.match_started = True

        handler.return_players_to_lobby()

        assert state.players[("board1", 1)]["player_id"] == 0
        assert state.players[("board2", 2)]["player_id"] == 0
        assert state.players[("board1", 1)]["x"] == -24.0
        assert state.players[("board2", 2)]["x"] == 24.0


def test_pynq_redis_broadcast_hides_ghosts_while_waiting_in_lobby():
    with pynq_import_context():
        import asyncio
        import queue

        protocol = importlib.import_module("protocol")
        redis_io_mod = importlib.import_module("t2_redis_io")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        state.match_started = False
        state.players = {
            ("board1", 1): {
                "player_id": 0,
                "x": -24.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": None,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "board_slot": 1,
            },
            "ghost:1": {
                "player_id": 3,
                "x": 24.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": protocol.FLAG_GHOST,
                "last_seen": 0.0,
                "last_seq": None,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
            },
        }
        broadcast_queue = asyncio.Queue()
        redis_io = redis_io_mod.RedisIO(
            state=state,
            map_state={"name": "lobby", "bits": []},
            broadcast_queue=broadcast_queue,
            write_queue=queue.SimpleQueue(),
        )

        asyncio.run(redis_io.push_broadcast(11))

        payload = broadcast_queue.get_nowait()
        _, _, _, _, players, _ = protocol.unpack_server_packet(payload["data"])

        assert payload["targets"] == [("board1", 1)]
        assert len(players) == 1
        assert not any(player["flags"] & protocol.FLAG_GHOST for player in players)


def test_pynq_redis_writes_include_ghost_profiles():
    with pynq_import_context():
        import json
        import queue

        protocol = importlib.import_module("protocol")
        redis_io_mod = importlib.import_module("t2_redis_io")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        state.game_mode = protocol.GAME_MODE_CHASE
        state.set_ghost_profile(1, speed=0.11, tag_radius=9.0)
        state.set_ghost_profile(3, speed=0.07, tag_radius=6.5)

        write_queue = queue.SimpleQueue()
        redis_io = redis_io_mod.RedisIO(
            state=state,
            map_state={"name": "lobby", "bits": []},
            broadcast_queue=None,
            write_queue=write_queue,
        )

        redis_io.push_redis_writes(7, 3)

        writes = []
        while True:
            try:
                writes.append(write_queue.get_nowait())
            except Exception:
                break

        game_state_write = next(msg for msg in writes if msg.get("key") == "game:state")
        ghost_profiles = json.loads(game_state_write["mapping"]["ghost_profiles"])

        assert ghost_profiles[0]["slot"] == 1
        assert ghost_profiles[0]["speed"] == 0.11
        assert ghost_profiles[0]["tag_radius"] == 9.0
        assert ghost_profiles[2]["slot"] == 3
        assert ghost_profiles[2]["speed"] == 0.07
        assert ghost_profiles[2]["tag_radius"] == 6.5


def test_pynq_packet_handler_records_latest_input_latency():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        state.players = {
            ("board1", 1): {
                "player_id": 1,
                "x": 0.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 9,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "board_slot": 1,
                "display_name": "board-one",
                "username": "board-one",
                "controller_key": "controller-board-one",
                "_addr": ("board1", 1),
            },
        }
        state.match_started = True

        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            udp_transport=None,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        packet = protocol.pack_node_packet(
            protocol.PKT_STATE_UPDATE,
            10,
            2.0,
            0.0,
            0.25,
            flags=protocol.FLAG_INPUT_SHOOT,
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        handler._process_packet({"data": packet, "addr": ("board1", 1)})

        latest = state.latest_input_latency
        assert latest is not None
        assert latest["player_id"] == 1
        assert latest["board_slot"] == 1
        assert latest["seq"] == 10
        assert latest["input_flags"] == protocol.FLAG_INPUT_SHOOT
        assert latest["input_to_server_ms"] >= 0.0


def test_pynq_redis_writes_include_latest_input_latency():
    with pynq_import_context():
        import asyncio
        import queue

        protocol = importlib.import_module("protocol")
        redis_io_mod = importlib.import_module("t2_redis_io")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        state.match_started = True
        state.players = {
            ("board1", 1): {
                "player_id": 1,
                "x": 0.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 1,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "_addr": ("board1", 1),
            },
        }
        state.latest_input_latency = {
            "player_id": 1,
            "board_slot": 1,
            "display_name": "board-one",
            "username": "board-one",
            "controller_key": "controller-board-one",
            "seq": 10,
            "movement_mode": protocol.MOVEMENT_MODE_POSE,
            "input_flags": protocol.FLAG_INPUT_SHOOT,
            "client_sent_at_ms": 1000,
            "server_received_at_ms": 1012,
            "input_to_server_ms": 12.0,
            "server_broadcast_at_ms": None,
            "input_to_broadcast_ms": None,
        }

        broadcast_queue = asyncio.Queue()
        write_queue = queue.SimpleQueue()
        redis_io = redis_io_mod.RedisIO(
            state=state,
            map_state={"name": "lobby", "bits": []},
            broadcast_queue=broadcast_queue,
            write_queue=write_queue,
        )

        asyncio.run(redis_io.push_broadcast(7))
        redis_io.push_redis_writes(7, 3)

        writes = []
        while True:
            try:
                writes.append(write_queue.get_nowait())
            except Exception:
                break

        game_state_write = next(msg for msg in writes if msg.get("key") == "game:state")
        latest = json.loads(game_state_write["mapping"]["latest_input_latency"])
        assert latest["player_id"] == 1
        assert latest["seq"] == 10
        assert latest["input_to_server_ms"] == 12.0
        assert latest["input_to_broadcast_ms"] is not None


def test_protocol_round_trips_direct_rtt_packets():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")

        ping = protocol.pack_rtt_ping_packet(seq=17, timestamp=1234)
        pong = protocol.pack_rtt_pong_packet(seq=17, timestamp=5678)

        assert protocol.unpack_header(ping) == (protocol.PKT_RTT_PING, 17, 1234)
        assert protocol.unpack_header(pong) == (protocol.PKT_RTT_PONG, 17, 5678)
        assert protocol.unpack_rtt_packet(ping) == {
            "pkt_type": protocol.PKT_RTT_PING,
            "seq": 17,
            "timestamp": 1234,
        }
        assert protocol.unpack_rtt_packet(pong) == {
            "pkt_type": protocol.PKT_RTT_PONG,
            "seq": 17,
            "timestamp": 5678,
        }


def test_packet_handler_echoes_direct_rtt_ping():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        state = match_state_mod.MatchState()
        transport = DummyTransport()

        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            udp_transport=transport,
            map_state={
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        packet = protocol.pack_rtt_ping_packet(seq=9, timestamp=2222)
        handler._process_packet({"data": packet, "addr": ("board1", 9001)})

        assert len(transport.sent) == 1
        response, addr = transport.sent[0]
        assert addr == ("board1", 9001)
        pkt_type, seq, _timestamp = protocol.unpack_header(response)
        assert pkt_type == protocol.PKT_RTT_PONG
        assert seq == 9


def test_pynq_packet_handler_kicked_board_is_temporarily_blocked_from_rejoining():
    with pynq_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        class DummyQueue:
            def __init__(self):
                self.items = []

            def put(self, item):
                self.items.append(item)

        state = match_state_mod.MatchState()
        transport = DummyTransport()
        write_queue = DummyQueue()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=write_queue,
            udp_transport=transport,
            map_state={
                "name": "lobby",
                "width": 32,
                "height": 32,
                "tile_scale": 8,
                "tiles": bytearray(32 * 32),
                "bits": [],
                "spawn_positions": [(0.0, 0.0), (8.0, 0.0)],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
        )

        addr = ("192.168.2.10", 40000)
        packet = protocol.pack_register_packet(
            seq=1,
            x=0.0,
            y=0.0,
            angle=0.0,
            preferred_role=protocol.ROLE_ANY,
            username="solo",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )

        handler._process_packet({"data": packet, "addr": addr})
        sent_before_kick = len(transport.sent)

        kicked, _ = handler.evict_board_slot(1)

        assert kicked is True
        assert addr not in state.players
        assert state.reconnect_block_remaining(addr) > 0

        handler._process_packet({"data": packet, "addr": addr})

        assert addr not in state.players
        assert len(transport.sent) == sent_before_kick


def test_pynq_game_tick_set_map_is_ignored_during_live_match():
    with pynq_import_context():
        import asyncio
        import queue

        protocol = importlib.import_module("protocol")
        game_tick_mod = importlib.import_module("t2_game_tick")

        packet_queue = asyncio.Queue()
        broadcast_queue = asyncio.Queue()
        write_queue = queue.SimpleQueue()
        game_tick = game_tick_mod.GameTick(packet_queue, broadcast_queue, write_queue)

        game_tick.state.players = {
            ("runner", 1): {
                "player_id": 1,
                "x": 4.0,
                "y": 8.0,
                "angle": 0.25,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 5,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_RUNNER,
            },
            "ghost:1": {
                "player_id": 3,
                "x": 12.0,
                "y": 8.0,
                "angle": 1.57,
                "flags": protocol.FLAG_GHOST,
                "last_seen": 0.0,
                "last_seq": None,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
            },
        }
        game_tick.state.match_started = True
        game_tick.state.pending_roles = {("runner", 1): protocol.ROLE_RUNNER}
        packet_queue.put_nowait({"data": b"stale", "addr": ("runner", 1)})
        broadcast_queue.put_nowait({"data": b"stale", "targets": [("runner", 1)]})

        game_tick._apply_control_command({"cmd": "set_map", "map": "ghost_bits"})

        assert game_tick.map_state["name"] == "lobby"
        assert game_tick.state.match_started is True
        assert game_tick.state.players[("runner", 1)]["player_id"] == 1
        assert game_tick.state.players["ghost:1"]["player_id"] == 3
        assert not packet_queue.empty()
        assert not broadcast_queue.empty()


def test_pynq_game_tick_kick_board_removes_target_and_returns_remaining_players_to_lobby():
    with pynq_import_context():
        import asyncio
        import queue

        protocol = importlib.import_module("protocol")
        game_tick_mod = importlib.import_module("t2_game_tick")

        packet_queue = asyncio.Queue()
        broadcast_queue = asyncio.Queue()
        write_queue = queue.SimpleQueue()
        game_tick = game_tick_mod.GameTick(packet_queue, broadcast_queue, write_queue)

        game_tick.state.players = {
            ("runner", 1): {
                "player_id": 1,
                "x": 4.0,
                "y": 8.0,
                "angle": 0.25,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 5,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_RUNNER,
                "board_slot": 1,
                "control_mode": "manual",
                "display_name": "runner",
            },
            ("tagger", 2): {
                "player_id": 2,
                "x": 12.0,
                "y": 8.0,
                "angle": 1.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 7,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
                "preferred_role": protocol.ROLE_TAGGER,
                "board_slot": 2,
                "control_mode": "manual",
                "display_name": "tagger",
            },
            "ghost:1": {
                "player_id": 3,
                "x": 20.0,
                "y": 8.0,
                "angle": 1.57,
                "flags": protocol.FLAG_GHOST,
                "last_seen": 0.0,
                "last_seq": None,
                "movement_mode": 0,
                "protocol_version": 1,
                "timed_out": False,
            },
        }
        game_tick.state.match_started = True
        game_tick.state.pending_roles = {
            ("runner", 1): protocol.ROLE_RUNNER,
            ("tagger", 2): protocol.ROLE_TAGGER,
        }

        game_tick._apply_control_command({"cmd": "kick_board", "board_slot": 2})

        assert ("tagger", 2) not in game_tick.state.players
        assert game_tick.state.match_started is False
        assert game_tick.state.match_ended is False
        assert game_tick.state.players[("runner", 1)]["player_id"] == 0
        assert game_tick.state.players[("runner", 1)]["control_mode"] == "manual"
        assert game_tick.state.players["ghost:1"]["player_id"] == 3
        assert game_tick.state.players["ghost:1"]["flags"] == protocol.FLAG_GHOST
        assert game_tick.state.pending_roles == {("runner", 1): protocol.ROLE_RUNNER}


def test_pynq_game_tick_start_board_replay_streams_setup_and_first_frame():
    with pynq_import_context():
        import asyncio
        import queue

        protocol = importlib.import_module("protocol")
        game_tick_mod = importlib.import_module("t2_game_tick")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        async def exercise():
            packet_queue = asyncio.Queue()
            broadcast_queue = asyncio.Queue()
            write_queue = queue.SimpleQueue()
            transport = DummyTransport()
            game_tick = game_tick_mod.GameTick(
                packet_queue,
                broadcast_queue,
                write_queue,
                udp_transport=transport,
            )

            addr = ("runner", 1)
            game_tick.state.players = {
                addr: {
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
                    "display_name": "runner",
                    "username": "runner",
                    "profile_key": "runner",
                    "controller_key": "controller-runner",
                    "identity_source": "username",
                },
            }
            game_tick.tick_count = 42
            game_tick._load_board_replay = lambda match_id: {
                "match_id": match_id,
                "events": [
                    {"event": "match_start", "map": "chase", "bits": [[8.0, 8.0]]},
                    {
                        "event": "state_snapshot",
                        "map": "chase",
                        "game_mode": protocol.GAME_MODE_CHASE_BITS,
                        "bits_mask": 0x0001,
                        "bits": [[8.0, 8.0]],
                        "players": [
                            {"player_id": 1, "x": 4.0, "y": 5.0, "angle": 0.25, "flags": 0},
                            {"player_id": 2, "x": 10.0, "y": 5.0, "angle": 3.14, "flags": 0},
                        ],
                    },
                ],
            }

            started, message = game_tick._request_board_replay(1, "match-abc")

            assert started is True
            assert "loading" in message
            await game_tick._board_replay_tasks[1]

            packet_types = [protocol.unpack_header(data)[0] for data, _ in transport.sent]
            assert packet_types[:5] == [
                protocol.PKT_ACK,
                protocol.PKT_MAP,
                protocol.PKT_BITS_INIT,
                protocol.PKT_NODE_MODE,
                protocol.PKT_GAME_STATE,
            ]
            assert protocol.unpack_node_mode_packet(transport.sent[3][0]) == protocol.NODE_CONTROL_MODE_REPLAY
            _, seq, _, game_mode, players, bits_mask = protocol.unpack_server_packet(transport.sent[4][0])
            assert seq == 42
            assert game_mode == protocol.GAME_MODE_CHASE_BITS
            assert bits_mask == 0x0001
            assert [player["player_id"] for player in players] == [1, 2]
            assert game_tick.state.slot_modes[1] == "replay"
            assert game_tick.state.players[addr]["control_mode"] == "replay"
            assert game_tick.state.board_replays[1]["status"] == "playing"
            assert game_tick.state.board_replays[1]["frame_index"] == 0

        asyncio.run(exercise())


def test_pynq_game_tick_stop_board_replay_restores_board_contract():
    with pynq_import_context():
        import asyncio
        import queue

        protocol = importlib.import_module("protocol")
        game_tick_mod = importlib.import_module("t2_game_tick")

        class DummyTransport:
            def __init__(self):
                self.sent = []

            def sendto(self, data, addr):
                self.sent.append((data, addr))

        packet_queue = asyncio.Queue()
        broadcast_queue = asyncio.Queue()
        write_queue = queue.SimpleQueue()
        transport = DummyTransport()
        game_tick = game_tick_mod.GameTick(
            packet_queue,
            broadcast_queue,
            write_queue,
            udp_transport=transport,
        )

        addr = ("runner", 1)
        game_tick.state.players = {
            addr: {
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
                "control_mode": "replay",
                "display_name": "runner",
                "username": "runner",
                "profile_key": "runner",
                "controller_key": "controller-runner",
                "identity_source": "username",
            },
        }
        game_tick.state.slot_modes[1] = "replay"

        game_tick._restore_board_after_replay(1, "manual")

        packet_types = [protocol.unpack_header(data)[0] for data, _ in transport.sent]
        assert packet_types == [
            protocol.PKT_ACK,
            protocol.PKT_MAP,
            protocol.PKT_BITS_INIT,
            protocol.PKT_NODE_MODE,
        ]
        assert protocol.unpack_node_mode_packet(transport.sent[-1][0]) == protocol.NODE_CONTROL_MODE_MANUAL
        assert game_tick.state.slot_modes[1] == "manual"
        assert game_tick.state.players[addr]["control_mode"] == "manual"
