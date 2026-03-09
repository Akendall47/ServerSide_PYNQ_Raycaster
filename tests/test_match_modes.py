import asyncio
import importlib
import queue
import struct
import sys
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
