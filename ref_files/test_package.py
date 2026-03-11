import argparse
import importlib.util
import random
import socket
import struct
import time
from pathlib import Path


def _load_protocol():
    for parent in Path(__file__).resolve().parents:
        candidate = parent / "pynq_full" / "interfacing" / "protocol.py"
        if candidate.exists():
            spec = importlib.util.spec_from_file_location("pynq_protocol", candidate)
            module = importlib.util.module_from_spec(spec)
            assert spec.loader is not None
            spec.loader.exec_module(module)
            return module
    raise RuntimeError("Could not locate pynq_full/interfacing/protocol.py")


protocol = _load_protocol()


def _describe_packet(data: bytes):
    if len(data) < protocol.HEADER_SIZE:
        return f"short packet ({len(data)} bytes)"
    pkt_type, seq, timestamp = protocol.unpack_header(data)
    return f"type=0x{pkt_type:04x} seq={seq} ts={timestamp} len={len(data)}"


def _handle_packet(data: bytes, *, registered_state: dict):
    if len(data) < protocol.HEADER_SIZE:
        print(f"[SHORT] {len(data)} bytes")
        return

    pkt_type, seq, timestamp = protocol.unpack_header(data)

    if pkt_type == protocol.PKT_ACK:
        if len(data) < protocol.HEADER_SIZE + 1:
            print(f"[ACK] malformed: {_describe_packet(data)}")
            return
        player_id = struct.unpack_from("<B", data, protocol.HEADER_SIZE)[0]
        role = "RUNNER" if player_id == 1 else "TAGGER" if player_id == 2 else "UNKNOWN"
        registered_state["registered"] = True
        registered_state["player_id"] = player_id
        print(f"[ACK] player_id={player_id} role={role} header_seq={seq} ts={timestamp}")
        return

    if pkt_type == protocol.PKT_MAP:
        width, height, tile_scale, tiles = protocol.unpack_map_packet(data)
        walls = sum(1 for tile in tiles if tile)
        print(
            f"[MAP] {width}x{height} tile_scale={tile_scale} "
            f"tiles={len(tiles)} walls={walls}"
        )
        return

    if pkt_type == protocol.PKT_BITS_INIT:
        bits = protocol.unpack_bits_init_packet(data)
        print(f"[BITS_INIT] count={len(bits)} bits={bits}")
        return

    if pkt_type == protocol.PKT_GAME_STATE:
        _, rx_seq, rx_ts, game_mode, players, bits_mask = protocol.unpack_server_packet(data)
        print(
            f"[STATE] tick={rx_seq} ts={rx_ts} mode={game_mode} "
            f"players={len(players)} bits_mask=0x{bits_mask:04x}"
        )
        for player in players:
            print(
                f"  P{player['player_id']}: ({player['x']:.2f}, {player['y']:.2f}) "
                f"angle={player['angle']:.2f} flags=0b{player['flags']:08b}"
            )
        return

    print(f"[OTHER] {_describe_packet(data)} hex={data[:32].hex()}")


def main():
    parser = argparse.ArgumentParser(description="UDP smoke test for the current PYNQ protocol")
    parser.add_argument("--server", default="18.175.238.148")
    parser.add_argument("--port", type=int, default=9000)
    parser.add_argument("--tick-rate", type=int, default=20)
    parser.add_argument("--register-timeout", type=float, default=5.0)
    parser.add_argument("--movement-mode", type=int,
                        default=protocol.MOVEMENT_MODE_INTENT_WITH_PREDICTION)
    args = parser.parse_args()

    tick_interval = 1.0 / args.tick_rate
    server_address = (args.server, args.port)
    state = {"registered": False, "player_id": None}

    print(f"Setting up UDP socket to {args.server}:{args.port} ...")
    print(
        f"Protocol check: HEADER_SIZE={protocol.HEADER_SIZE}, "
        f"PLAYER_SIZE={protocol.PLAYER_SIZE}, NODE_SIZE={protocol.NODE_SIZE}"
    )

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    try:
        seq_num = 0
        reg_packet = protocol.pack_node_packet(
            pkt_type=protocol.PKT_REGISTER,
            seq=seq_num,
            x=0.0,
            y=0.0,
            angle=0.0,
            flags=0,
            movement_mode=args.movement_mode,
            reserved=protocol.ROLE_ANY,
        )

        print("Sending PKT_REGISTER ...")
        sock.sendto(reg_packet, server_address)
        seq_num = (seq_num + 1) & 0xFFFF

        sock.settimeout(args.register_timeout)
        while not state["registered"]:
            try:
                data, addr = sock.recvfrom(2048)
                print(f"[RX] from {addr} {_describe_packet(data)}")
                _handle_packet(data, registered_state=state)
            except socket.timeout:
                print("No ACK yet, retrying registration ...")
                sock.sendto(reg_packet, server_address)

        sock.settimeout(tick_interval)
        print(f"Starting {args.tick_rate}Hz update loop")

        while True:
            loop_start = time.time()
            mock_x = random.uniform(-10.0, 10.0)
            mock_y = random.uniform(-10.0, 10.0)
            mock_angle = random.uniform(0.0, 6.28)

            packet = protocol.pack_node_packet(
                pkt_type=protocol.PKT_STATE_UPDATE,
                seq=seq_num,
                x=mock_x,
                y=mock_y,
                angle=mock_angle,
                flags=0,
                movement_mode=args.movement_mode,
            )
            sock.sendto(packet, server_address)
            seq_num = (seq_num + 1) & 0xFFFF

            while True:
                try:
                    data, addr = sock.recvfrom(4096)
                    print(f"[RX] from {addr} {_describe_packet(data)}")
                    _handle_packet(data, registered_state=state)
                except socket.timeout:
                    break
                except Exception as exc:
                    print(f"[ERR] {exc}")
                    break

            elapsed = time.time() - loop_start
            sleep_time = tick_interval - elapsed
            if sleep_time > 0:
                time.sleep(sleep_time)

    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        sock.close()


if __name__ == "__main__":
    main()
