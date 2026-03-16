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
            "t2_constants", "t2_map_loader", "pynq_client", "protocol", "test_package_v2",
            "player_profiles", "t2_packet_handler", "t2_redis_io",
        }:
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name in {
                "t2_constants", "t2_map_loader", "pynq_client", "protocol", "test_package_v2",
                "player_profiles", "t2_packet_handler", "t2_redis_io",
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


def test_pynq_client_decodes_button_gpio_bits():
    with pynq_import_context():
        pynq_client = importlib.import_module("pynq_client")

        buttons = pynq_client.decode_button_bits(
            pynq_client.BUTTON_FORWARD_MASK | pynq_client.BUTTON_TURN_RIGHT_MASK
        )

        assert buttons == {
            "forward": True,
            "backward": False,
            "turn_left": False,
            "turn_right": True,
        }


def test_test_package_auto_runner_prefers_nearest_active_bit_in_bits_mode():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v2")

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


def test_test_package_auto_tagger_chases_runner_and_shoots_when_aligned():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v2")

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


def test_test_package_pathfinder_routes_through_gap():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v2")

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


def test_test_package_runtime_mode_packet_switches_live_mode():
    with pynq_import_context():
        protocol = importlib.import_module("protocol")
        test_package = importlib.import_module("test_package_v2")

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
        test_package._handle_packet(packet, state, bram=None)

        assert state["mode"] == "auto"


def test_test_package_manual_input_uses_runtime_speed_override():
    with pynq_import_context():
        test_package = importlib.import_module("test_package_v2")

        class Buttons:
            def read(self):
                return test_package.BUTTON_FORWARD_MASK

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


def test_pynq_client_drop_to_registration_clears_live_state():
    with pynq_import_context():
        pynq_client = importlib.import_module("pynq_client")

        class DummyHardware:
            pass

        node = pynq_client.PYNQNode("127.0.0.1", 9000, DummyHardware())
        node.registered = True
        node.player_id = 2
        node.match_ended = True
        node.server_flags = pynq_client.FLAG_MATCH_END
        node.remote_entities = [{"entity_id": 3}]
        node.last_server_packet_at = 123.0

        node._drop_to_registration("test")

        assert node.registered is False
        assert node.player_id is None
        assert node.match_ended is False
        assert node.server_flags == 0
        assert node.remote_entities == []
        assert node.last_server_packet_at is None


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

        player = state.players[addr]
        assert player["username"] == "kat"
        assert player["display_name"] == "kat"
        assert player["profile_key"] == "kat"
        assert player["controller_key"] == "controller-192-168-2-10"
        assert player["player_id"] == 0
        assert state.match_started is False
        assert state.pending_roles[addr] == protocol.ROLE_TAGGER


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
        assert state.players[addr]["player_id"] == 0
        assert state.players[addr]["board_slot"] == 1
        assert state.players[addr]["control_mode"] == "manual"
        assert len(transport.sent) == 4
        ack_type, _, _ = protocol.unpack_header(transport.sent[0][0])
        assert ack_type == protocol.PKT_ACK
        assert transport.sent[0][0][protocol.HEADER_SIZE] == 0
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
        assert state.players[addr]["control_mode"] == "auto"
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
        assert solo_addr in state.players
        assert state.players[solo_addr]["player_id"] == 1
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


def test_pynq_game_tick_set_map_returns_players_to_lobby_on_new_map():
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

        assert game_tick.map_state["name"] == "ghost_bits"
        assert game_tick.state.match_started is False
        assert game_tick.state.players[("runner", 1)]["player_id"] == 0
        assert game_tick.state.players["ghost:1"]["player_id"] == 3
        assert game_tick.state.players["ghost:1"]["flags"] == protocol.FLAG_GHOST
        assert packet_queue.empty()
        assert broadcast_queue.empty()


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
