#!/usr/bin/env python3
# node_simulator_pynq_compatible.py — PYNQ-like node simulator based on test_package.py structure
#
# Simulates PYNQ button inputs and state transmission exactly like the real nodes:
# - 20 Hz tick rate
# - Button-based movement (with collision detection)
# - Proper packet handling with registration/state loop
# - Fixed-point coordinate system (scaled by 1024)
# - 4096-unit angle system
# - Multiple behavior patterns via button sequences

import math
import socket
import struct
import time
import argparse
import threading
import json
import sys
from pathlib import Path

try:
    import redis as redislib
except ImportError:
    redislib = None

from protocol import (
    # Constants
    HEADER_SIZE, PKT_ACK, PKT_GAME_STATE, PKT_STATE_UPDATE, PKT_HEARTBEAT,
    PKT_REGISTER, PKT_MAP, GAME_MODE_CHASE,
    MOVEMENT_MODE_POSE,
    FLAG_TAGGED, FLAG_MATCH_END,
    # Functions
    pack_node_packet, pack_register_packet, unpack_header, unpack_server_packet,
)

# --- Hardware Configuration ---
HW_COORD_FRAC_BITS = 10
HW_ANGLE_STEPS = 1 << 12
HW_ANGLE_MASK = HW_ANGLE_STEPS - 1
MAP_TILE_SCALE = 8
PLAYER_COLLISION_RADIUS = 2.0

# --- Timing Configuration ---
TICK_HZ = 20
TICK_INTERVAL = 1.0 / TICK_HZ
REGISTER_RETRY_S = 2.0
SERVER_SILENCE_S = 5.0
STATE_LOG_PERIOD_S = 1.0
SOCKET_RECV_SIZE = 4096

# --- Movement Configuration ---
INITIAL_X = 5.0
INITIAL_Y = 5.0
INITIAL_ANGLE_RAW = 0
MOVE_SPEED = 0.2
TURN_STEP = 64
BUTTON_TURN_RIGHT_MASK = 1 << 0
BUTTON_BACKWARD_MASK = 1 << 1
BUTTON_FORWARD_MASK = 1 << 2
BUTTON_TURN_LEFT_MASK = 1 << 3

# --- Control Patterns (simulated button sequences) ---
CONTROL_PATTERNS = {
    "wander": [
        {"buttons": 0b0100, "duration": 20},  # Move forward
        {"buttons": 0b1000, "duration": 10},  # Turn left
        {"buttons": 0b0100, "duration": 20},  # Move forward
        {"buttons": 0b0001, "duration": 10},  # Turn right
        {"buttons": 0b0010, "duration": 15},  # Move backward
        {"buttons": 0b0000, "duration": 5},   # Stop
    ],
    "circle": [
        {"buttons": 0b0100, "duration": 5},   # Move forward
        {"buttons": 0b1000, "duration": 2},   # Turn left
    ],
    "chase": [
        {"buttons": 0b0100, "duration": 30},  # Move forward
        {"buttons": 0b1001, "duration": 3},   # Move + turn left
    ],
}


def _role_name(player_id: int) -> str:
    if player_id == 0:
        return "LOBBY"
    if player_id == 1:
        return "RUNNER"
    if player_id == 2:
        return "TAGGER"
    return f"PLAYER_{player_id}"


def _describe_packet(data: bytes) -> str:
    if len(data) < HEADER_SIZE:
        return f"short packet ({len(data)} bytes)"
    pkt_type, seq, timestamp = unpack_header(data)
    return f"type=0x{pkt_type:04x} seq={seq} ts={timestamp} len={len(data)}"


def _is_walkable(map_w: int, map_h: int, tile_scale: int, tiles: bytes, 
                 x: float, y: float, radius: float = PLAYER_COLLISION_RADIUS) -> bool:
    """Check if position is walkable (no wall collisions)."""
    if not tiles or map_w <= 0 or map_h <= 0 or tile_scale <= 0:
        return True

    offsets = [(0.0, 0.0)]
    if radius > 0.0:
        offsets.extend([
            (radius, 0.0), (-radius, 0.0),
            (0.0, radius), (0.0, -radius),
            (radius, radius), (radius, -radius),
            (-radius, radius), (-radius, -radius),
        ])

    for dx, dy in offsets:
        col = int(math.floor(((x + dx) / tile_scale) + (map_w / 2.0)))
        row = int(math.floor(((y + dy) / tile_scale) + (map_h / 2.0)))
        if col < 0 or row < 0 or col >= map_w or row >= map_h:
            return False
        if tiles[row * map_w + col]:
            return False
    return True


def _resolve_move(map_w: int, map_h: int, tile_scale: int, tiles: bytes,
                  current_x: float, current_y: float, desired_x: float, desired_y: float):
    """Resolve movement with collision detection (smoothing)."""
    if _is_walkable(map_w, map_h, tile_scale, tiles, desired_x, desired_y):
        return desired_x, desired_y
    if _is_walkable(map_w, map_h, tile_scale, tiles, desired_x, current_y):
        return desired_x, current_y
    if _is_walkable(map_w, map_h, tile_scale, tiles, current_x, desired_y):
        return current_x, desired_y
    if not _is_walkable(map_w, map_h, tile_scale, tiles, current_x, current_y):
        return current_x, current_y

    # Binary search for valid position
    low_x, low_y = current_x, current_y
    high_x, high_y = desired_x, desired_y
    for _ in range(10):
        mid_x = (low_x + high_x) / 2.0
        mid_y = (low_y + high_y) / 2.0
        if _is_walkable(map_w, map_h, tile_scale, tiles, mid_x, mid_y):
            low_x, low_y = mid_x, mid_y
        else:
            high_x, high_y = mid_x, mid_y
    return low_x, low_y


def _radians_to_hw_angle(angle_radians: float) -> int:
    """Convert radians to 4096-unit angle system."""
    turn = angle_radians % (2.0 * math.pi)
    return int(round(turn * HW_ANGLE_STEPS / (2.0 * math.pi))) & HW_ANGLE_MASK


def _apply_button_input(state: dict, buttons: int) -> None:
    """Apply button presses to update position and angle."""
    if buttons & BUTTON_TURN_LEFT_MASK:
        state["angle_raw"] = (state["angle_raw"] + TURN_STEP) % HW_ANGLE_STEPS
    if buttons & BUTTON_TURN_RIGHT_MASK:
        state["angle_raw"] = (state["angle_raw"] - TURN_STEP) % HW_ANGLE_STEPS

    state["angle"] = (state["angle_raw"] * (2.0 * math.pi / HW_ANGLE_STEPS)) % (2.0 * math.pi)

    move_step = 0.0
    if buttons & BUTTON_FORWARD_MASK:
        move_step += MOVE_SPEED
    if buttons & BUTTON_BACKWARD_MASK:
        move_step -= MOVE_SPEED
    
    if move_step == 0.0:
        return

    desired_x = state["x"] + move_step * math.cos(state["angle"])
    desired_y = state["y"] + move_step * math.sin(state["angle"])
    
    # Only apply collision if we have map data
    if state["tiles"]:
        state["x"], state["y"] = _resolve_move(
            state["map_w"], state["map_h"], state["tile_scale"], 
            state["tiles"], state["x"], state["y"], desired_x, desired_y
        )
    else:
        state["x"], state["y"] = desired_x, desired_y


def _send_register(sock: socket.socket, server_address, state: dict) -> None:
    """Send registration packet to server."""
    pkt = pack_register_packet(
        seq=state["seq"],
        x=state["x"],
        y=state["y"],
        angle=state["angle"],
        movement_mode=MOVEMENT_MODE_POSE,
    )
    sock.sendto(pkt, server_address)
    tag = state["tag"]
    print(f"{tag} [TX] REGISTER seq={state['seq']} "
          f"pose=({state['x']:.2f}, {state['y']:.2f}, {state['angle']:.2f})")
    state["seq"] = (state["seq"] + 1) & 0xFFFF
    state["last_register_tx_at"] = time.monotonic()


def _send_state(sock: socket.socket, server_address, state: dict) -> None:
    """Send state update packet to server."""
    pkt_type = PKT_HEARTBEAT if state["match_ended"] else PKT_STATE_UPDATE
    pkt = pack_node_packet(
        pkt_type=pkt_type,
        seq=state["seq"],
        x=state["x"],
        y=state["y"],
        angle=state["angle"],
        flags=0,
        movement_mode=MOVEMENT_MODE_POSE,
    )
    sock.sendto(pkt, server_address)
    state["seq"] = (state["seq"] + 1) & 0xFFFF


def _update_from_server(state: dict, players) -> None:
    """Update local state from authoritative server data."""
    player_id = state["player_id"]
    if player_id is None:
        return
    
    for player in players:
        if player["player_id"] != player_id:
            continue
        state["x"] = player["x"]
        state["y"] = player["y"]
        state["angle"] = player["angle"]
        state["angle_raw"] = _radians_to_hw_angle(player["angle"])
        state["match_ended"] = bool(player["flags"] & FLAG_MATCH_END)
        return


def _handle_packet(data: bytes, state: dict) -> None:
    """Process incoming packet from server."""
    if len(data) < HEADER_SIZE:
        return
    
    pkt_type, seq, timestamp = unpack_header(data)
    tag = state["tag"]
    state["last_rx_at"] = time.monotonic()

    if pkt_type == PKT_ACK:
        if len(data) < HEADER_SIZE + 1:
            print(f"{tag} [ACK] malformed")
            return
        player_id = struct.unpack_from("<B", data, HEADER_SIZE)[0]
        previous_player_id = state["player_id"]
        state["registered"] = True
        state["player_id"] = player_id
        state["match_ended"] = False
        if previous_player_id != player_id:
            print(f"{tag} [ACK] player_id={player_id} role={_role_name(player_id)}")
        return

    if pkt_type == PKT_MAP:
        try:
            from protocol import unpack_map_packet
            width, height, tile_scale, tiles = unpack_map_packet(data)
            state["map_w"] = width
            state["map_h"] = height
            state["tile_scale"] = tile_scale
            state["tiles"] = tiles
            print(f"{tag} [MAP] {width}x{height} tile_scale={tile_scale}")
        except Exception as e:
            print(f"{tag} [MAP_ERR] {e}")
        return

    if pkt_type == PKT_GAME_STATE:
        try:
            _, rx_seq, rx_ts, game_mode, players, bits_mask = unpack_server_packet(data)
            state["game_mode"] = game_mode
            state["bits_mask"] = bits_mask
            _update_from_server(state, players)

            now = time.monotonic()
            if now - state["last_state_log_at"] >= STATE_LOG_PERIOD_S:
                print(f"{tag} [STATE] seq={rx_seq} players={len(players)} "
                      f"pos=({state['x']:.2f}, {state['y']:.2f}, {state['angle']:.2f})")
                state["last_state_log_at"] = now
        except Exception as e:
            print(f"{tag} [STATE_ERR] {e}")
        return


def _drain_packets(sock: socket.socket, state: dict) -> None:
    """Receive all queued packets from server."""
    while True:
        try:
            data, addr = sock.recvfrom(SOCKET_RECV_SIZE)
            _handle_packet(data, state)
        except BlockingIOError:
            return
        except OSError as e:
            print(f"{state['tag']} [SOCK] recv error: {e}")
            return


def _load_default_map() -> dict:
    """Load default map if available, otherwise return empty."""
    maps_dir = Path(__file__).resolve().parents[2] / "pynq_full" / "ec2" / "maps"
    map_path = maps_dir / "chase.txt"
    
    if map_path.exists():
        rows = []
        try:
            with open(map_path) as f:
                for line in f:
                    line = line.rstrip("\r\n")
                    if line:
                        rows.append(line)
        except Exception:
            return {"width": 0, "height": 0, "tile_scale": MAP_TILE_SCALE, "tiles": bytearray()}
        
        width = len(rows[0]) if rows else 0
        height = len(rows)
        tiles = bytearray()
        for row in rows:
            for cell in row:
                tiles.append(1 if cell == "#" else 0)
        
        return {
            "width": width,
            "height": height,
            "tile_scale": MAP_TILE_SCALE,
            "tiles": tiles,
        }
    
    return {"width": 0, "height": 0, "tile_scale": MAP_TILE_SCALE, "tiles": bytearray()}


def run_pynq_node(server_ip: str, server_port: int, node_id: int, 
                  behavior: str = "wander", redis_host: str = "127.0.0.1",
                  redis_port: int = 6380, max_ticks: int = None) -> None:
    """Run a PYNQ-compatible node simulator."""
    
    server_addr = (server_ip, server_port)
    tag = f"[NODE {node_id}]"

    # Initialize state
    state = {
        "tag": tag,
        "registered": False,
        "player_id": None,
        "seq": 0,
        "x": INITIAL_X + (node_id - 1) * 3.0,
        "y": INITIAL_Y,
        "angle_raw": INITIAL_ANGLE_RAW & HW_ANGLE_MASK,
        "angle": (INITIAL_ANGLE_RAW & HW_ANGLE_MASK) * (2.0 * math.pi / HW_ANGLE_STEPS),
        "match_ended": False,
        "last_rx_at": None,
        "last_register_tx_at": 0.0,
        "last_state_log_at": 0.0,
        "map_w": 0,
        "map_h": 0,
        "tile_scale": MAP_TILE_SCALE,
        "tiles": bytearray(),
        "game_mode": GAME_MODE_CHASE,
        "bits_mask": 0xFFFF,
    }

    # Load default map if available
    default_map = _load_default_map()
    state.update(default_map)

    # Control pattern tracking
    pattern = CONTROL_PATTERNS.get(behavior, CONTROL_PATTERNS["wander"])
    pattern_index = 0
    pattern_tick = 0
    
    # Redis subscription (optional)
    ps = None
    if redislib:
        try:
            rc = redislib.Redis(host=redis_host, port=redis_port, decode_responses=True)
            rc.ping()
            ps = rc.pubsub(ignore_subscribe_messages=True)
            ps.subscribe("game:control")
            print(f"{tag} connected to Redis")
        except Exception as e:
            print(f"{tag} Redis unavailable: {e}")

    # Create socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setblocking(False)
    
    tick = 0
    
    try:
        print(f"{tag} starting — behavior={behavior}")
        
        while True:
            tick_start = time.monotonic()

            # Receive packets
            _drain_packets(sock, state)

            # Check server silence timeout
            now = time.monotonic()
            if state["registered"] and state["last_rx_at"] is not None:
                if now - state["last_rx_at"] > SERVER_SILENCE_S:
                    print(f"{tag} server silent for {SERVER_SILENCE_S}s, re-registering")
                    state["registered"] = False
                    state["player_id"] = None
                    state["match_ended"] = False

            # Check Redis for control commands
            if ps:
                while True:
                    msg = ps.get_message()
                    if not msg:
                        break
                    if msg["type"] != "message":
                        continue
                    try:
                        command = json.loads(msg["data"])
                        if command.get("cmd") == "restart":
                            state["registered"] = False
                            state["player_id"] = None
                            state["match_ended"] = False
                            print(f"{tag} restart signal received")
                    except Exception:
                        pass

            # Apply button input
            current_action = pattern[pattern_index]
            _apply_button_input(state, current_action["buttons"])

            # Send packets
            if not state["registered"]:
                if now - state["last_register_tx_at"] >= REGISTER_RETRY_S:
                    _send_register(sock, server_addr, state)
            else:
                _send_state(sock, server_addr, state)

            # Log periodically
            if tick % TICK_HZ == 0:
                status = "registered" if state["registered"] else "waiting"
                print(f"{tag} tick={tick:4d} {status} "
                      f"pos=({state['x']:7.2f},{state['y']:7.2f}) angle={state['angle']:7.3f}")

            # Update control pattern
            pattern_tick += 1
            if pattern_tick >= current_action["duration"]:
                pattern_index = (pattern_index + 1) % len(pattern)
                pattern_tick = 0

            tick += 1
            if max_ticks and tick >= max_ticks:
                print(f"{tag} reached max_ticks {max_ticks}")
                break

            # Maintain tick rate
            elapsed = time.monotonic() - tick_start
            sleep_time = TICK_INTERVAL - elapsed
            if sleep_time > 0:
                time.sleep(sleep_time)

    except KeyboardInterrupt:
        print(f"\n{tag} interrupted")
    finally:
        sock.close()
        if ps:
            ps.close()
        print(f"{tag} stopped at tick {tick}")


def main():
    parser = argparse.ArgumentParser(
        description="PYNQ-compatible node simulator with realistic behavior"
    )
    parser.add_argument("server_ip", help="Server IP address")
    parser.add_argument("--port", type=int, default=9000, help="Server port")
    parser.add_argument("--nodes", "-n", type=int, default=1, help="Number of nodes")
    parser.add_argument("--behavior", choices=["wander", "circle", "chase"],
                        default="wander", help="Movement behavior")
    parser.add_argument("--redis-host", default="127.0.0.1", help="Redis host")
    parser.add_argument("--redis-port", type=int, default=6380, help="Redis port")
    parser.add_argument("--max-ticks", type=int, default=None, help="Max ticks to run")

    args = parser.parse_args()

    print(f"Starting {args.nodes} PYNQ-compatible node(s)")
    print(f"  Server: {args.server_ip}:{args.port}")
    print(f"  Behavior: {args.behavior}")
    print(f"  Redis: {args.redis_host}:{args.redis_port}")

    threads = []
    for i in range(args.nodes):
        t = threading.Thread(
            target=run_pynq_node,
            kwargs=dict(
                server_ip=args.server_ip,
                server_port=args.port,
                node_id=i + 1,
                behavior=args.behavior,
                redis_host=args.redis_host,
                redis_port=args.redis_port,
                max_ticks=args.max_ticks,
            ),
            daemon=False,
        )
        threads.append(t)
        t.start()
        time.sleep(0.1)

    try:
        for t in threads:
            t.join()
    except KeyboardInterrupt:
        print("\nShutting down...")


if __name__ == "__main__":
    main()
