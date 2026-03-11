import importlib
import sys
from contextlib import contextmanager
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SIM_EC2 = ROOT / "sim_full" / "ec2"
SIM_SERVER = SIM_EC2 / "server"
SIM_INTERFACING = ROOT / "sim_full" / "interfacing_+_sim"


@contextmanager
def sim_import_context():
    original_path = list(sys.path)
    sys.path[:0] = [str(SIM_INTERFACING), str(SIM_SERVER), str(SIM_EC2)]
    for name in list(sys.modules):
        if (
            name in {
                "t2_constants", "t2_map_loader", "protocol", "player_profiles",
                "t2_packet_handler", "t2_redis_io",
            }
            or name.startswith("game_logic")
        ):
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if (
                name in {
                    "t2_constants", "t2_map_loader", "protocol", "player_profiles",
                    "t2_packet_handler", "t2_redis_io",
                }
                or name.startswith("game_logic")
            ):
                sys.modules.pop(name, None)


def test_sim_register_packet_round_trips_username_trailer():
    with sim_import_context():
        protocol = importlib.import_module("protocol")

        packet = protocol.pack_register_packet(
            seq=3,
            x=2.5,
            y=-1.0,
            angle=1.25,
            preferred_role=protocol.ROLE_RUNNER,
            username="sim-a",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        unpacked = protocol.unpack_register_packet(packet)

        assert unpacked["pkt_type"] == protocol.PKT_REGISTER
        assert unpacked["preferred_role"] == protocol.ROLE_RUNNER
        assert unpacked["username"] == "sim-a"
        assert unpacked["movement_mode"] == protocol.MOVEMENT_MODE_POSE


def test_sim_player_identity_falls_back_to_controller_key_without_username():
    with sim_import_context():
        player_profiles = importlib.import_module("player_profiles")

        identity = player_profiles.build_player_identity("", ("127.0.0.1", 45678))

        assert identity["identity_source"] == "controller"
        assert identity["profile_key"] == "controller-127-0-0-1"
        assert identity["display_name"] == "controller-127-0-0-1"


def test_sim_packet_handler_registers_username_and_profile_metadata():
    with sim_import_context():
        import asyncio

        protocol = importlib.import_module("protocol")
        packet_handler_mod = importlib.import_module("t2_packet_handler")
        match_state_mod = importlib.import_module("game_logic.match_state")

        state = match_state_mod.MatchState()
        handler = packet_handler_mod.PacketHandler(
            state=state,
            packet_queue=asyncio.Queue(),
            write_queue=[],
            map_state={"width": 32, "height": 32, "tile_scale": 8, "tiles": bytearray(32 * 32)},
            on_match_start=lambda: None,
            on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None,
            on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None,
            udp_transport=None,
        )

        addr = ("127.0.0.1", 40123)
        packet = protocol.pack_register_packet(
            seq=1,
            x=0.0,
            y=0.0,
            angle=0.0,
            preferred_role=protocol.ROLE_TAGGER,
            username="sim-b",
            movement_mode=protocol.MOVEMENT_MODE_POSE,
        )
        handler._process_packet({"data": packet, "addr": addr})

        player = state.players[addr]
        assert player["username"] == "sim-b"
        assert player["display_name"] == "sim-b"
        assert player["profile_key"] == "sim-b"
        assert player["controller_key"] == "controller-127-0-0-1"
        assert state.pending_roles[addr] == protocol.ROLE_TAGGER
