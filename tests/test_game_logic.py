import importlib.util
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def _load_module(name, rel_path):
    path = ROOT / rel_path
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def test_sim_validate_position_accepts_newer_in_bounds_step():
    game_logic = _load_module("sim_game_logic", "sim_full/ec2/server/game_logic.py")

    assert game_logic.validate_position(
        10,
        0.0, 0.0, 0.0,
        3.0, 4.0, 0.1, 11,
        -100.0, -100.0, 100.0, 100.0,
        10.0,
    )


def test_sim_validate_position_rejects_stale_seq():
    game_logic = _load_module("sim_game_logic", "sim_full/ec2/server/game_logic.py")

    assert not game_logic.validate_position(
        10,
        0.0, 0.0, 0.0,
        1.0, 1.0, 0.1, 10,
        -100.0, -100.0, 100.0, 100.0,
        10.0,
    )


def test_sim_validate_position_rejects_out_of_bounds():
    game_logic = _load_module("sim_game_logic", "sim_full/ec2/server/game_logic.py")

    assert not game_logic.validate_position(
        10,
        0.0, 0.0, 0.0,
        101.0, 0.0, 0.1, 11,
        -100.0, -100.0, 100.0, 100.0,
        10.0,
    )


def test_sim_validate_position_rejects_speed_cap():
    game_logic = _load_module("sim_game_logic", "sim_full/ec2/server/game_logic.py")

    assert not game_logic.validate_position(
        10,
        0.0, 0.0, 0.0,
        11.0, 0.0, 0.1, 11,
        -100.0, -100.0, 100.0, 100.0,
        10.0,
    )


def test_pynq_bridge_python_fallback_matches_policy():
    bridge = _load_module("pynq_game_logic_bridge", "pynq_full/ec2/server/game_logic_bridge.py")

    assert bridge._FallbackGameLogic.validate_position(
        65535,
        0.0, 0.0, 0.0,
        1.0, 1.0, 0.0, 0,
        -100.0, -100.0, 100.0, 100.0,
        10.0,
    )
    assert not bridge._FallbackGameLogic.validate_position(
        20,
        0.0, 0.0, 0.0,
        50.0, 0.0, 0.0, 21,
        -100.0, -100.0, 100.0, 100.0,
        10.0,
    )


def test_protocol_flag_names_make_direction_explicit():
    sim_protocol = _load_module("sim_protocol", "sim_full/interfacing_+_sim/protocol.py")

    assert sim_protocol.client_input_flags(shooting=True) == sim_protocol.FLAG_INPUT_SHOOT
    assert sim_protocol.decode_flag_names(
        sim_protocol.FLAG_INPUT_SHOOT, direction="client_to_server"
    ) == ["shoot"]
    assert sim_protocol.decode_flag_names(
        sim_protocol.FLAG_TAGGED | sim_protocol.FLAG_MATCH_END,
        direction="server_to_client",
    ) == ["tagged", "match_end"]


def test_protocol_node_packet_carries_mode_and_version():
    sim_protocol = _load_module("sim_protocol", "sim_full/interfacing_+_sim/protocol.py")

    packet = sim_protocol.pack_node_packet(
        sim_protocol.PKT_STATE_UPDATE,
        7,
        1.5, 2.5, 0.75,
        sim_protocol.client_input_flags(shooting=True),
        movement_mode=sim_protocol.MOVEMENT_MODE_INTENT_WITH_PREDICTION,
    )
    unpacked = sim_protocol.unpack_node_packet(packet)

    assert unpacked["seq"] == 7
    assert unpacked["input_flags"] == sim_protocol.FLAG_INPUT_SHOOT
    assert unpacked["movement_mode"] == sim_protocol.MOVEMENT_MODE_INTENT_WITH_PREDICTION
    assert unpacked["protocol_version"] == sim_protocol.NODE_PROTOCOL_VERSION
