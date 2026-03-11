# pynq_full/interfacing/pynq_client.py — PYNQ-Z1 board client.
#
# Wiring:
#   UDP networking  → protocol.py (same packet format as the EC2 server)
#   PKT_MAP         → row-major tile bytes from the server
#   BRAM writes     → convert map + player pose into the real hardware repo's format
#   HDMI output     → driven autonomously by the bitstream once BRAM is populated
#
# Hardware contract taken from ~/Documents/pynq_raycaster:
#   BRAM base:       0x40000000
#   BRAM range:      0x2000
#   Map rows:        32 x 32-bit words at offsets 0x00..0x7C
#   Player position: 0x80  [31:16]=x, [15:0]=y, unsigned Q6.10 tile coords
#   Player angle:    0x84  [11:0]=angle, 0..4095 maps a full turn
#
# Run on PYNQ-Z1:
#   python3 pynq_client.py --server <EC2_IP> [--port 9000] [--overlay raycaster.bit]

import asyncio
import socket
import struct
import math
import argparse
import sys
import os
import time

sys.path.insert(0, os.path.dirname(__file__))
from protocol import (
    # constants
    MOVEMENT_MODE_INTENT_WITH_PREDICTION,
    PKT_REGISTER, PKT_ACK, PKT_GAME_STATE, PKT_MAP, PKT_HEARTBEAT, PKT_BITS_INIT,
    FLAG_TAGGED, FLAG_MATCH_END, FLAG_GHOST,
    HEADER_SIZE,
    # functions
    client_input_flags, pack_node_packet, unpack_bits_init_packet, unpack_header,
    unpack_map_packet, unpack_server_packet,
)

# ── Display constants ─────────────────────────────────────────────────────────

SCREEN_W    = 640
SCREEN_H    = 480
HALF_H      = SCREEN_H // 2
FOV         = math.pi / 3          # 60°
NUM_RAYS    = SCREEN_W
MAX_DIST    = 500.0
WALL_HEIGHT = 300.0                 # base height at distance 1.0

# ── Orbit / movement params (mirror server spawn values) ─────────────────────

ORBIT_RADIUS = 50.0
SPAWN_ANGLES = [0.0, math.pi / 2]  # player_id 1 → angle 0, player_id 2 → angle π/2
RUNNER_SPEED = 0.05                 # rad/tick (player 1)
TAGGER_SPEED = 0.11                 # rad/tick (player 2)
TICK_RATE    = 60                   # Hz — match server
PLAYER_COLLISION_RADIUS = 2.5
AUTHORITATIVE_STATE_TIMEOUT_S = 0.4

# ── Real hardware BRAM layout ─────────────────────────────────────────────────

HW_BRAM_BASE_ADDR      = 0x40000000
HW_BRAM_RANGE          = 0x2000
HW_MAP_ROWS            = 32
HW_MAP_COLS            = 32
HW_PLAYER_POS_OFFSET   = 0x80
HW_PLAYER_ANGLE_OFFSET = 0x84
HW_ENTITY_COUNT_OFFSET = 0x88
HW_ENTITY_TABLE_OFFSET = 0x8C
HW_ENTITY_STRIDE       = 0x0C
MAX_REMOTE_ENTITIES    = 4
HW_COORD_FRAC_BITS     = 10
HW_ANGLE_STEPS         = 1 << 12
HW_ANGLE_MASK          = HW_ANGLE_STEPS - 1

# ── Colour palette (floor / ceiling / wall) ───────────────────────────────────

COLOUR_CEILING = (50,  50,  80)    # dark blue-grey
COLOUR_FLOOR   = (80,  60,  40)    # brown
COLOUR_WALL    = (180, 150, 100)   # tan; brightness scaled by distance

# ─────────────────────────────────────────────────────────────────────────────


def _try_import_pynq():
    # Import pynq only when available so laptop-side smoke tests still work.
    try:
        import pynq
        return pynq
    except ImportError:
        return None


def encode_map_rows_for_bram(width: int, height: int, tiles: bytes):
    if width != HW_MAP_COLS or height != HW_MAP_ROWS:
        raise ValueError(
            f"hardware expects a {HW_MAP_COLS}x{HW_MAP_ROWS} map, got {width}x{height}"
        )
    if len(tiles) != width * height:
        raise ValueError(
            f"expected {width * height} tile bytes, got {len(tiles)}"
        )

    rows = []
    for row in range(height):
        word = 0
        base = row * width
        for col in range(width):
            if tiles[base + col]:
                word |= 1 << col
        rows.append(word)
    return rows


def world_to_hw_q6_10(value: float, tile_scale: int, map_dim: int):
    tile_units = (value / tile_scale) + (map_dim / 2.0)
    raw = int(round(tile_units * (1 << HW_COORD_FRAC_BITS)))
    max_raw = (map_dim << HW_COORD_FRAC_BITS) - 1
    return max(0, min(max_raw, raw))


def radians_to_hw_angle(angle_radians: float):
    turn = angle_radians % (2.0 * math.pi)
    return int(round(turn * HW_ANGLE_STEPS / (2.0 * math.pi))) & HW_ANGLE_MASK


def build_remote_entities(local_player_id, players, *, limit=MAX_REMOTE_ENTITIES):
    entities = []
    for player in players:
        if player["player_id"] == local_player_id:
            continue
        entities.append({
            "active": True,
            "entity_id": player["player_id"],
            "x": player["x"],
            "y": player["y"],
            "angle": player["angle"],
            "flags": player["flags"],
        })
    entities.sort(key=lambda entity: entity["entity_id"])
    return entities[:limit]


class HardwareContext:
    # Wraps the real BRAM-backed hardware interface from the pynq_raycaster repo.

    def __init__(self, overlay_path: str):
        pynq = _try_import_pynq()
        self.pynq = pynq
        self.overlay = None
        self.bram_mmio = None

        if pynq is None:
            print("[HW] pynq not available — running in software-only mode")
            return

        try:
            print(f"[HW] loading overlay: {overlay_path}")
            self.overlay = pynq.Overlay(overlay_path)
            self.bram_mmio = pynq.MMIO(HW_BRAM_BASE_ADDR, HW_BRAM_RANGE)
            print(
                f"[HW] BRAM MMIO ready at 0x{HW_BRAM_BASE_ADDR:08x} "
                f"(range=0x{HW_BRAM_RANGE:x})"
            )
        except Exception as e:
            print(f"[HW] overlay load failed: {e}")
            self.overlay = None
            self.bram_mmio = None

    @property
    def hardware_ready(self) -> bool:
        return self.bram_mmio is not None

    def write_player_pose(self, x: float, y: float, angle: float,
                          map_w: int, map_h: int, tile_scale: int):
        if self.bram_mmio is None:
            return
        x_q = world_to_hw_q6_10(x, tile_scale, map_w)
        y_q = world_to_hw_q6_10(y, tile_scale, map_h)
        angle_raw = radians_to_hw_angle(angle)
        self.bram_mmio.write(HW_PLAYER_POS_OFFSET, ((x_q & 0xFFFF) << 16) | (y_q & 0xFFFF))
        self.bram_mmio.write(HW_PLAYER_ANGLE_OFFSET, angle_raw)

    def write_map_to_bram(self, width: int, height: int, tiles: bytes):
        if self.bram_mmio is None:
            print("[HW] BRAM not available — map tiles not written")
            return
        try:
            rows = encode_map_rows_for_bram(width, height, tiles)
        except ValueError as exc:
            print(f"[HW] map conversion failed: {exc}")
            return
        for row_index, word in enumerate(rows):
            self.bram_mmio.write(row_index * 4, word & 0xFFFFFFFF)
        print(f"[HW] wrote {len(rows)} packed map rows to BRAM ({width}x{height})")

    def write_remote_entities(self, remote_entities, map_w: int, map_h: int, tile_scale: int):
        if self.bram_mmio is None:
            return
        self.bram_mmio.write(HW_ENTITY_COUNT_OFFSET, len(remote_entities) & 0xFF)
        for index in range(MAX_REMOTE_ENTITIES):
            base = HW_ENTITY_TABLE_OFFSET + (index * HW_ENTITY_STRIDE)
            if index < len(remote_entities):
                entity = remote_entities[index]
                x_q = world_to_hw_q6_10(entity["x"], tile_scale, map_w)
                y_q = world_to_hw_q6_10(entity["y"], tile_scale, map_h)
                angle_raw = radians_to_hw_angle(entity["angle"])
                flags_word = (
                    (1 << 16)
                    | ((entity["entity_id"] & 0xFF) << 8)
                    | (entity["flags"] & 0xFF)
                )
                self.bram_mmio.write(base + 0x00, ((x_q & 0xFFFF) << 16) | (y_q & 0xFFFF))
                self.bram_mmio.write(base + 0x04, angle_raw & HW_ANGLE_MASK)
                self.bram_mmio.write(base + 0x08, flags_word)
            else:
                self.bram_mmio.write(base + 0x00, 0)
                self.bram_mmio.write(base + 0x04, 0)
                self.bram_mmio.write(base + 0x08, 0)

    def present_frame(self, frame_data):
        # The real hardware bitstream drives HDMI internally; software mode has no display sink.
        return


# ── Software raycaster fallback ───────────────────────────────────────────────
# Used when the FPGA raycaster is not available (overlay not loaded or not on PYNQ).
# Plain DDA — same algorithm the FPGA implements.

def _cast_rays(x: float, y: float, angle: float, map_w: int, map_h: int,
               tiles: bytearray, tile_scale: int):
    # Return list of (distance, hit_side) for each screen column
    results = []
    ray_angle = angle - FOV / 2.0
    d_angle   = FOV / NUM_RAYS

    for _ in range(NUM_RAYS):
        ra   = ray_angle
        cos_ = math.cos(ra) or 1e-10
        sin_ = math.sin(ra) or 1e-10

        # DDA step sizes
        delta_x = abs(tile_scale / cos_)
        delta_y = abs(tile_scale / sin_)

        map_x = int(x / tile_scale)
        map_y = int(y / tile_scale)
        frac_x = x / tile_scale - map_x
        frac_y = y / tile_scale - map_y

        step_x = 1 if cos_ > 0 else -1
        step_y = 1 if sin_ > 0 else -1
        side_x = (1.0 - frac_x) * delta_x if cos_ > 0 else frac_x * delta_x
        side_y = (1.0 - frac_y) * delta_y if sin_ > 0 else frac_y * delta_y

        hit = False
        side = 0
        dist = MAX_DIST

        for _ in range(256):
            if side_x < side_y:
                side_x += delta_x
                map_x  += step_x
                side    = 0
            else:
                side_y += delta_y
                map_y  += step_y
                side    = 1
            if 0 <= map_x < map_w and 0 <= map_y < map_h:
                if tiles[map_y * map_w + map_x]:
                    if side == 0:
                        dist = (map_x - x / tile_scale + (1 - step_x) / 2) / (cos_ / tile_scale)
                    else:
                        dist = (map_y - y / tile_scale + (1 - step_y) / 2) / (sin_ / tile_scale)
                    hit = True
                    break
            else:
                break

        results.append((max(dist, 0.1), side) if hit else (MAX_DIST, 0))
        ray_angle += d_angle

    return results


def render_frame_software(x, y, angle, map_w, map_h, tiles, tile_scale, remote_entities=None):
    # Render a full frame as a H×W×3 uint8 numpy array (software path)
    try:
        import numpy as np
    except ImportError:
        return None

    frame = np.zeros((SCREEN_H, SCREEN_W, 3), dtype=np.uint8)
    # Ceiling
    frame[:HALF_H, :] = COLOUR_CEILING
    # Floor
    frame[HALF_H:, :] = COLOUR_FLOOR

    rays = _cast_rays(x, y, angle, map_w, map_h, tiles, tile_scale)
    wall_depths = [dist for dist, _ in rays]
    for col, (dist, side) in enumerate(rays):
        wall_h = min(int(WALL_HEIGHT / (dist + 0.0001)), SCREEN_H)
        top    = HALF_H - wall_h // 2
        bot    = top + wall_h
        bright = max(0.0, min(1.0, 1.0 - dist / MAX_DIST))
        shade  = 0.7 if side else 1.0
        r = int(COLOUR_WALL[0] * bright * shade)
        g = int(COLOUR_WALL[1] * bright * shade)
        b = int(COLOUR_WALL[2] * bright * shade)
        frame[max(0, top):min(SCREEN_H, bot), col] = (r, g, b)

    remote_entities = remote_entities or []
    for entity in remote_entities:
        dx = entity["x"] - x
        dy = entity["y"] - y
        distance = math.hypot(dx, dy)
        if distance <= 0.001:
            continue
        relative_angle = math.atan2(dy, dx) - angle
        while relative_angle <= -math.pi:
            relative_angle += 2.0 * math.pi
        while relative_angle > math.pi:
            relative_angle -= 2.0 * math.pi
        if abs(relative_angle) > (FOV / 2.0) + 0.3:
            continue

        projected_x = int(((relative_angle + (FOV / 2.0)) / FOV) * SCREEN_W)
        sprite_h = max(8, min(SCREEN_H, int(WALL_HEIGHT / distance)))
        sprite_w = max(4, sprite_h // 2)
        top = max(0, HALF_H - sprite_h // 2)
        bot = min(SCREEN_H, top + sprite_h)
        left = max(0, projected_x - sprite_w // 2)
        right = min(SCREEN_W, projected_x + sprite_w // 2)

        if entity["flags"] & FLAG_GHOST:
            colour = (100, 160, 220)
        elif entity["flags"] & FLAG_TAGGED:
            colour = (220, 80, 80)
        else:
            colour = (220, 200, 120)

        for col in range(left, right):
            if col >= len(wall_depths) or distance >= wall_depths[col]:
                continue
            frame[top:bot, col] = colour

    return frame


# ── Node state machine ────────────────────────────────────────────────────────

class PYNQNode:
    def __init__(self, server_ip: str, server_port: int, hw: HardwareContext):
        self.server_addr = (server_ip, server_port)
        self.hw          = hw

        # Game state
        self.player_id   = None
        self.x           = 0.0
        self.y           = 0.0
        self.angle       = 0.0
        self.orbit_angle = 0.0   # angular position on orbit circle
        self.server_flags = 0
        self.input_flags  = 0
        self.seq         = 0
        self.registered  = False
        self.match_ended = False
        self.have_authoritative_state = False
        self.last_authoritative_state_at = 0.0
        self.movement_mode = MOVEMENT_MODE_INTENT_WITH_PREDICTION
        self.game_mode   = 0
        self.bits_mask   = 0xFFFF
        self.bits        = []

        # Map state
        self.map_w      = 0
        self.map_h      = 0
        self.tile_scale = 8
        self.tiles      = bytearray()

        # Remote entities visible in PKT_GAME_STATE (opponent + ghosts).
        self.remote_entities = []

        # asyncio transport
        self.transport  = None

    # ── UDP transport callback ─────────────────────────────────────────────

    def connection_made(self, transport):
        self.transport = transport

    def datagram_received(self, data: bytes, addr):
        if len(data) < HEADER_SIZE:
            return
        pkt_type, seq, timestamp = unpack_header(data)

        if pkt_type == PKT_ACK:
            player_id = struct.unpack_from('<B', data, HEADER_SIZE)[0]
            self.player_id   = player_id
            self.orbit_angle = SPAWN_ANGLES[player_id - 1] if player_id <= 2 else 0.0
            self.angle = self.orbit_angle
            self.registered  = True
            self.match_ended = False
            self.have_authoritative_state = False
            self.last_authoritative_state_at = 0.0
            self.server_flags = 0
            role = "RUNNER" if player_id == 1 else "TAGGER"
            print(f"[Node] registered as player {player_id} ({role})")

        elif pkt_type == PKT_MAP:
            self.map_w, self.map_h, self.tile_scale, self.tiles = unpack_map_packet(data)
            print(f"[Node] received map {self.map_w}x{self.map_h} tile_scale={self.tile_scale}")
            self.hw.write_map_to_bram(self.map_w, self.map_h, self.tiles)

        elif pkt_type == PKT_BITS_INIT:
            raw_bits = unpack_bits_init_packet(data)
            if raw_bits:
                max_id = max(bit_id for bit_id, _, _ in raw_bits)
                self.bits = [None] * (max_id + 1)
                for bit_id, bit_x, bit_y in raw_bits:
                    self.bits[bit_id] = (bit_x, bit_y)
            else:
                self.bits = []
            print(f"[Node] received {len(raw_bits)} bit positions")
            return

        elif pkt_type == PKT_GAME_STATE:
            _, _, _, self.game_mode, players, self.bits_mask = unpack_server_packet(data)
            self.remote_entities = build_remote_entities(self.player_id, players)
            for p in players:
                if p["player_id"] == self.player_id:
                    self.x = p["x"]
                    self.y = p["y"]
                    self.angle = p["angle"]
                    self.orbit_angle = p["angle"]
                    self.server_flags = p["flags"]
                    self.have_authoritative_state = True
                    self.last_authoritative_state_at = time.monotonic()
                    if self.server_flags & FLAG_TAGGED:
                        print(f"[Node] P{self.player_id} tagged!")
                    if self.server_flags & FLAG_MATCH_END:
                        print(f"[Node] match ended")
                        self.match_ended = True

    def error_received(self, exc):
        print(f"[Node] UDP error: {exc}")

    # ── Movement logic (orbiting circle, same as node_simulator) ──────────

    def _is_walkable(self, x: float, y: float, radius: float = PLAYER_COLLISION_RADIUS) -> bool:
        if not self.tiles or self.map_w <= 0 or self.map_h <= 0 or self.tile_scale <= 0:
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
            col = int(math.floor(((x + dx) / self.tile_scale) + (self.map_w / 2.0)))
            row = int(math.floor(((y + dy) / self.tile_scale) + (self.map_h / 2.0)))
            if col < 0 or row < 0 or col >= self.map_w or row >= self.map_h:
                return False
            if self.tiles[row * self.map_w + col]:
                return False
        return True

    def _resolve_move(self, desired_x: float, desired_y: float):
        if self._is_walkable(desired_x, desired_y):
            return desired_x, desired_y
        if self._is_walkable(desired_x, self.y):
            return desired_x, self.y
        if self._is_walkable(self.x, desired_y):
            return self.x, desired_y
        if not self._is_walkable(self.x, self.y):
            return self.x, self.y

        low_x, low_y = self.x, self.y
        high_x, high_y = desired_x, desired_y
        for _ in range(10):
            mid_x = (low_x + high_x) / 2.0
            mid_y = (low_y + high_y) / 2.0
            if self._is_walkable(mid_x, mid_y):
                low_x, low_y = mid_x, mid_y
            else:
                high_x, high_y = mid_x, mid_y
        return low_x, low_y

    def _step(self):
        if not self.registered or self.match_ended or not self.have_authoritative_state:
            return
        turn_step = RUNNER_SPEED if self.player_id == 1 else TAGGER_SPEED
        move_speed = ORBIT_RADIUS * turn_step
        desired_x = self.x + move_speed * math.cos(self.angle)
        desired_y = self.y + move_speed * math.sin(self.angle)
        next_x, next_y = self._resolve_move(desired_x, desired_y)
        if next_x == self.x and next_y == self.y:
            self.angle += turn_step * 2.5
            desired_x = self.x + move_speed * math.cos(self.angle)
            desired_y = self.y + move_speed * math.sin(self.angle)
            next_x, next_y = self._resolve_move(desired_x, desired_y)
        self.x = next_x
        self.y = next_y
        self.orbit_angle = self.angle

    # ── Send helpers ───────────────────────────────────────────────────────

    def _send_register(self):
        pkt = pack_node_packet(
            PKT_REGISTER, self.seq, self.x, self.y, self.angle,
            movement_mode=self.movement_mode,
        )
        self.seq += 1
        self.transport.sendto(pkt, self.server_addr)

    def _send_state(self):
        if not self.registered:
            return
        self.input_flags = client_input_flags(shooting=False)
        pkt = pack_node_packet(PKT_HEARTBEAT if self.match_ended else 0x0001,
                               self.seq, self.x, self.y, self.angle, self.input_flags,
                               movement_mode=self.movement_mode)
        self.seq += 1
        self.transport.sendto(pkt, self.server_addr)

    # ── Main loop ─────────────────────────────────────────────────────────

    async def run(self):
        loop     = asyncio.get_running_loop()
        sock     = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.transport, _ = await loop.create_datagram_endpoint(
            lambda: self,
            sock=sock,
        )

        print(f"[Node] connecting to {self.server_addr}")
        self._send_register()

        interval = 1.0 / TICK_RATE
        reg_retry_at = asyncio.get_event_loop().time() + 2.0  # resend REGISTER if no ACK

        try:
            while True:
                tick_start = loop.time()

                if not self.registered:
                    if loop.time() >= reg_retry_at:
                        self._send_register()
                        reg_retry_at = loop.time() + 2.0
                else:
                    if (
                        self.have_authoritative_state
                        and time.monotonic() - self.last_authoritative_state_at > AUTHORITATIVE_STATE_TIMEOUT_S
                    ):
                        self.have_authoritative_state = False
                    self._step()
                    self._send_state()

                    # Translate centred world coords into the BRAM pose format the FPGA expects.
                    self.hw.write_player_pose(
                        self.x, self.y, self.angle,
                        self.map_w, self.map_h, self.tile_scale,
                    )
                    self.hw.write_remote_entities(
                        self.remote_entities,
                        self.map_w, self.map_h, self.tile_scale,
                    )

                    # Render frame: use FPGA if BRAM-backed hardware is active, software otherwise
                    if self.hw.hardware_ready and self.tiles:
                        frame = None
                    elif self.tiles:
                        frame = render_frame_software(
                            self.x, self.y, self.angle,
                            self.map_w, self.map_h, self.tiles, self.tile_scale,
                            self.remote_entities,
                        )
                        self.hw.present_frame(frame)

                elapsed   = loop.time() - tick_start
                sleep_for = max(0.0, interval - elapsed)
                await asyncio.sleep(sleep_for)

        finally:
            if self.transport:
                self.transport.close()


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="PYNQ-Z1 raycaster client")
    parser.add_argument("--server",  required=True, help="EC2 server IP")
    parser.add_argument("--port",    type=int, default=9000)
    parser.add_argument("--overlay", default="raycaster.bit",
                        help="Path to FPGA bitstream (.bit)")
    args = parser.parse_args()

    hw   = HardwareContext(args.overlay)
    node = PYNQNode(args.server, args.port, hw)
    asyncio.run(node.run())


if __name__ == "__main__":
    main()
