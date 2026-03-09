import asyncio
import importlib
import queue
import struct
import sys
import time
from contextlib import contextmanager
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SIM_EC2 = ROOT / "sim_full" / "ec2"
SIM_SERVER = SIM_EC2 / "server"
SIM_PROTOCOL = ROOT / "sim_full" / "interfacing_+_sim"


@contextmanager
def sim_import_context():
    original_path = list(sys.path)
    sys.path[:0] = [str(SIM_PROTOCOL), str(SIM_SERVER), str(SIM_EC2)]
    for name in list(sys.modules):
        if name in {"protocol", "t2_constants", "t2_redis_io"} or name.startswith("game_logic"):
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name in {"protocol", "t2_constants", "t2_redis_io"} or name.startswith("game_logic"):
                sys.modules.pop(name, None)


def test_sim_protocol_unpack_server_packet_reads_extended_match_fields():
    with sim_import_context():
        protocol = importlib.import_module("protocol")

        header = struct.pack(protocol.HEADER_FMT, protocol.PKT_GAME_STATE, 12, 34)
        ext = struct.pack(protocol.GAME_STATE_EXT_FMT, protocol.GAME_MODE_CHASE_BITS, 2, 0x0003)
        player1 = struct.pack(protocol.PLAYER_FMT, 1, 10.0, 20.0, 0.5, 0)
        player2 = struct.pack(protocol.PLAYER_FMT, 2, -5.0, 15.0, 1.5, protocol.FLAG_GHOST)

        pkt_type, seq, timestamp, game_mode, players, bits_mask = protocol.unpack_server_packet(
            header + ext + player1 + player2
        )

        assert pkt_type == protocol.PKT_GAME_STATE
        assert seq == 12
        assert timestamp == 34
        assert game_mode == protocol.GAME_MODE_CHASE_BITS
        assert bits_mask == 0x0003
        assert [player["player_id"] for player in players] == [1, 2]
        assert players[1]["flags"] == protocol.FLAG_GHOST


def test_sim_core_logic_runner_wins_when_all_bits_are_collected():
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        match_state_mod = importlib.import_module("game_logic.match_state")
        core_logic_mod = importlib.import_module("game_logic.core_logic")

        state = match_state_mod.MatchState()
        state.match_started = True
        state.game_mode = protocol.GAME_MODE_CHASE_BITS
        state.players = {
            ("runner", 1): {
                "player_id": 1,
                "x": 0.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 0,
                "movement_mode": 0,
                "protocol_version": 1,
            },
            ("tagger", 2): {
                "player_id": 2,
                "x": 80.0,
                "y": 80.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 0,
                "movement_mode": 0,
                "protocol_version": 1,
            },
        }
        state.bits = [[0.0, 0.0, True]]
        state.bits_mask = 0x0001

        events = []

        async def on_event(event):
            events.append(event)

        logic = core_logic_mod.CoreLogic(
            state,
            queue.SimpleQueue(),
            on_event=on_event,
            on_force_end_consumed=lambda: None,
        )

        asyncio.run(logic.tick())

        assert state.match_ended is True
        assert state.match_winner == "runner"
        assert state.match_end_reason == "bits_cleared"
        assert state.bits_mask == 0
        assert [event["event"] for event in events] == ["bit_collected", "match_end"]
        assert events[-1]["winner"] == "runner"
        assert events[-1]["reason"] == "bits_cleared"


def test_sim_state_snapshot_carries_bit_positions():
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        match_state_mod = importlib.import_module("game_logic.match_state")
        redis_io_mod = importlib.import_module("t2_redis_io")

        state = match_state_mod.MatchState()
        state.game_mode = protocol.GAME_MODE_CHASE_BITS
        state.bits = [[-4.0, 8.0, True], [12.0, -16.0, False]]
        state.bits_mask = 0x0001
        state.players = {
            ("runner", 1): {
                "player_id": 1,
                "x": 1.0,
                "y": 2.0,
                "angle": 0.25,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 0,
                "movement_mode": 0,
                "protocol_version": 1,
            }
        }

        redis_io = redis_io_mod.RedisIO(state, {"name": "ghost_bits"}, None, queue.SimpleQueue())
        snapshot = redis_io._build_state_snapshot(7, 3)

        assert snapshot["event"] == "state_snapshot"
        assert snapshot["map"] == "ghost_bits"
        assert snapshot["bits_mask"] == 0x0001
        assert snapshot["bits"] == [[-4.0, 8.0], [12.0, -16.0]]


def test_sim_abort_match_clears_players_and_resets_ids():
    with sim_import_context():
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        state.players = {
            ("runner", 1): {"player_id": 1},
            ("ghost:1",): {"player_id": 3},
        }
        state.next_id = 4
        state.match_started = True

        state.abort_match()

        assert state.players == {}
        assert state.next_id == 1
        assert state.match_started is False


def test_sim_anticheat_allows_packet_gaps_within_speed_budget():
    with sim_import_context():
        anticheat_mod = importlib.import_module("game_logic.anticheat")

        assert anticheat_mod.validate_position(
            10, 0.0, 0.0, 0.0,
            20.0, 0.0, 0.0, 12,
            -100.0, -100.0, 100.0, 100.0,
            10.0,
        )


def test_sim_map_loader_builds_walkable_spawn_positions():
    with sim_import_context():
        constants = importlib.import_module("t2_constants")
        map_loader = importlib.import_module("t2_map_loader")

        map_state = map_loader.load_map(str(ROOT / "pynq_full" / "ec2" / "maps" / "chase.txt"))
        clearance_radius = max(
            constants.PLAYER_COLLISION_RADIUS + 0.5,
            constants.SPAWN_CLEARANCE_RADIUS,
        )

        assert map_state["spawn_positions"]
        for x, y in map_state["spawn_positions"]:
            assert map_loader.is_walkable_world(map_state, x, y, clearance_radius)


def test_sim_map_loader_uses_explicit_spawn_markers():
    with sim_import_context():
        map_loader = importlib.import_module("t2_map_loader")

        for name in ("chase", "ghost_chase", "chase_bits", "ghost_bits"):
            path = ROOT / "pynq_full" / "ec2" / "maps" / f"{name}.txt"
            rows = [line.rstrip("\r\n") for line in path.read_text().splitlines() if line]
            expected = {}
            for row_idx, row in enumerate(rows):
                for col_idx, cell in enumerate(row):
                    if cell in {"1", "2", "3", "4", "5"}:
                        expected[int(cell)] = map_loader.cell_to_world(
                            col_idx, row_idx, len(row), len(rows), 8
                        )

            map_state = map_loader.load_map(str(path))

            assert len(expected) == 5
            for slot, world_pos in expected.items():
                assert map_state["spawn_positions"][slot - 1] == world_pos


def test_sim_map_loader_resolves_blocked_moves_without_leaving_walkable_space():
    with sim_import_context():
        map_loader = importlib.import_module("t2_map_loader")

        map_state = {
            "width": 3,
            "height": 3,
            "tile_scale": 8,
            "tiles": bytearray([
                0, 0, 0,
                0, 1, 0,
                0, 0, 0,
            ]),
        }

        resolved_x, resolved_y = map_loader.resolve_walkable_world(
            map_state,
            -8.0, 0.0,
            0.0, 0.0,
            0.0,
        )

        assert resolved_x < 0.0
        assert resolved_y == 0.0
        assert map_loader.is_walkable_world(map_state, resolved_x, resolved_y, 0.0)


def test_sim_match_end_hold_clears_runtime_state():
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        core_logic_mod = importlib.import_module("game_logic.core_logic")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        state.players = {
            ("runner", 1): {"player_id": 1, "flags": 0},
            ("tagger", 2): {"player_id": 2, "flags": 0},
        }
        state.match_started = True
        state.match_ended = True
        state.match_end_at = time.monotonic() - 0.1
        state.match_winner = "runner"
        state.match_end_reason = "bits_cleared"
        state.game_mode = protocol.GAME_MODE_CHASE_BITS
        state.bits = [[1.0, 2.0, False]]
        state.bits_mask = 0x0001
        state.pending_roles = {("runner", 1): 1}
        state.tag_count = 2
        state.tag_flash_at = time.monotonic() + 1.0

        async def on_event(event):
            return None

        write_queue = queue.SimpleQueue()
        logic = core_logic_mod.CoreLogic(
            state,
            write_queue,
            on_event=on_event,
            on_force_end_consumed=lambda: None,
            map_state={},
        )

        asyncio.run(logic._check_match_end_hold())

        assert state.players == {}
        assert state.match_started is False
        assert state.match_ended is False
        assert state.match_end_at is None
        assert state.match_winner is None
        assert state.match_end_reason is None
        assert state.tag_count == 0
        assert state.tag_flash_at is None
        assert state.bits == []
        assert state.bits_mask == 0
        assert state.pending_roles == {}
        assert state.game_mode == protocol.GAME_MODE_CHASE
        assert state.lockout_until is not None


def test_sim_packet_handler_requires_register_for_unknown_addr():
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        match_state_mod = importlib.import_module("game_logic.match_state")
        packet_handler_mod = importlib.import_module("t2_packet_handler")

        state = match_state_mod.MatchState()
        handler = packet_handler_mod.PacketHandler(
            state,
            asyncio.Queue(),
            queue.SimpleQueue(),
            {
                "width": 0,
                "height": 0,
                "tile_scale": 8,
                "tiles": bytearray(),
                "spawn_positions": [],
            },
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_event=lambda event: None,
        )

        addr = ("runner", 1)
        handler._process_packet({
            "data": protocol.pack_node_packet(
                0x0001,
                7,
                12.0,
                8.0,
                0.0,
                movement_mode=protocol.MOVEMENT_MODE_INTENT_WITH_PREDICTION,
            ),
            "addr": addr,
        })
        assert state.players == {}

        handler._process_packet({
            "data": protocol.pack_node_packet(
                protocol.PKT_REGISTER,
                0,
                0.0,
                0.0,
                0.0,
                movement_mode=protocol.MOVEMENT_MODE_INTENT_WITH_PREDICTION,
            ),
            "addr": addr,
        })
        assert addr in state.players


def test_sim_restart_command_clears_players_and_backlog():
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        game_tick_mod = importlib.import_module("t2_game_tick")

        packet_queue = asyncio.Queue()
        broadcast_queue = asyncio.Queue()
        write_queue = queue.SimpleQueue()
        game_tick = game_tick_mod.GameTick(packet_queue, broadcast_queue, write_queue)
        game_tick.state.players = {
            ("runner", 1): {"player_id": 1},
            ("tagger", 2): {"player_id": 2},
        }
        game_tick.state.pending_roles = {("runner", 1): 1}
        game_tick.state.match_started = True
        game_tick.state.game_mode = protocol.GAME_MODE_CHASE_BITS
        game_tick.state.bits = [[1.0, 2.0, True]]
        game_tick.state.bits_mask = 0x0001
        packet_queue.put_nowait({"data": b"stale", "addr": ("runner", 1)})
        broadcast_queue.put_nowait({"data": b"stale", "targets": [("runner", 1)]})

        game_tick._apply_control_command({"cmd": "restart"})

        assert game_tick.state.players == {}
        assert game_tick.state.match_started is False
        assert game_tick.state.match_ended is False
        assert game_tick.state.bits == []
        assert game_tick.state.bits_mask == 0
        assert game_tick.state.pending_roles == {}
        assert packet_queue.empty()
        assert broadcast_queue.empty()
        assert game_tick.state.lockout_until is None


def test_sim_ghosts_steer_without_crossing_walls():
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        core_logic_mod = importlib.import_module("game_logic.core_logic")
        match_state_mod = importlib.import_module("game_logic.match_state")
        map_loader = importlib.import_module("t2_map_loader")
        constants = importlib.import_module("t2_constants")

        map_state = {
            "width": 5,
            "height": 5,
            "tile_scale": 8,
            "tiles": bytearray([
                0, 0, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 0, 0,
            ]),
        }

        state = match_state_mod.MatchState()
        state.match_started = True
        state.game_mode = protocol.GAME_MODE_CHASE
        state.players = {
            ("runner", 1): {
                "player_id": 1,
                "x": 12.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": 0,
                "last_seen": 0.0,
                "last_seq": 0,
                "movement_mode": 0,
                "protocol_version": 1,
            },
            "ghost:1": {
                "player_id": 3,
                "x": -12.0,
                "y": 0.0,
                "angle": 0.0,
                "flags": protocol.FLAG_GHOST,
                "last_seen": 0.0,
                "last_seq": 0,
                "movement_mode": 0,
                "protocol_version": 1,
            },
        }

        async def on_event(event):
            return None

        logic = core_logic_mod.CoreLogic(
            state,
            queue.SimpleQueue(),
            on_event=on_event,
            on_force_end_consumed=lambda: None,
            map_state=map_state,
        )

        positions = []
        for _ in range(6):
            logic._move_ghosts()
            ghost = state.players["ghost:1"]
            positions.append((ghost["x"], ghost["y"]))
            assert map_loader.is_walkable_world(
                map_state,
                ghost["x"],
                ghost["y"],
                constants.PLAYER_COLLISION_RADIUS,
            )

        assert positions[-1][0] > -12.0
        assert any(abs(y) > 0.5 for _, y in positions)
