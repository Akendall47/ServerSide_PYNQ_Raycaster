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
#   Button GPIO:     0x41200000  [3:0]=button inputs from the Button-control branch
#   Map rows:        32 x 32-bit words at offsets 0x00..0x7C
#   Player position: 0x80  [31:16]=x, [15:0]=y, unsigned Q6.10 tile coords
#   Player angle:    0x84  [11:0]=angle, 0..4095 maps a full turn
#
# Upload to board:
#   scp... etc
#   Make sure raycaster.hwh matches the exact raycaster.bit build.
#
# Run on board:
#   ssh xilinx@<PYNQ_IP>
#   cd /home/xilinx/jupyter_notebooks
#   python3 pynq_client.py --server 3.9.71.204 --port 9000 --overlay raycaster.bit --username louis

import asyncio
import socket
import struct
import math
import argparse
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from protocol import (
    # constants
    MOVEMENT_MODE_POSE,
    PKT_REGISTER, PKT_ACK, PKT_GAME_STATE, PKT_MAP, PKT_HEARTBEAT, PKT_BITS_INIT,
    FLAG_TAGGED, FLAG_MATCH_END, FLAG_GHOST,
    HEADER_SIZE,
    # functions
    pack_node_packet, pack_register_packet, unpack_bits_init_packet, unpack_header,
    unpack_map_packet, unpack_server_packet,
)

# ── Network cadence ───────────────────────────────────────────────────────────

TICK_RATE = 60  # Hz — keep the board client aligned with the server send loop

# ── Real hardware BRAM layout ─────────────────────────────────────────────────

HW_BRAM_BASE_ADDR      = 0x40000000
HW_BRAM_RANGE          = 0x2000
HW_GPIO_BASE_ADDR      = 0x41200000
HW_GPIO_RANGE          = 0x10000
HW_GPIO_DATA_OFFSET    = 0x00
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
BUTTON_FORWARD_MASK    = 1 << 0
BUTTON_BACKWARD_MASK   = 1 << 1
BUTTON_TURN_LEFT_MASK  = 1 << 2
BUTTON_TURN_RIGHT_MASK = 1 << 3
MANUAL_MOVE_SPEED      = 1.5
MANUAL_TURN_SPEED      = 0.08
PLAYER_COLLISION_RADIUS = 2.5

def _try_import_pynq():
    # Import pynq only when available so laptop-side smoke tests still work.
    try:
        import pynq
        return pynq
    except ImportError:
        return None


# Decode the 4-button GPIO word into movement actions for the local player.
def decode_button_bits(raw_buttons: int):
    return {
        "forward": bool(raw_buttons & BUTTON_FORWARD_MASK),
        "backward": bool(raw_buttons & BUTTON_BACKWARD_MASK),
        "turn_left": bool(raw_buttons & BUTTON_TURN_LEFT_MASK),
        "turn_right": bool(raw_buttons & BUTTON_TURN_RIGHT_MASK),
    }


# Convert the server's flat 32x32 tile bytes into the row-bitpacked BRAM format.
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

# Convert centred world-space coordinates into unsigned Q6.10 tile coordinates.
def world_to_hw_q6_10(value: float, tile_scale: int, map_dim: int):
    tile_units = (value / tile_scale) + (map_dim / 2.0)
    raw = int(round(tile_units * (1 << HW_COORD_FRAC_BITS)))
    max_raw = (map_dim << HW_COORD_FRAC_BITS) - 1
    return max(0, min(max_raw, raw))

# Map radians onto the FPGA's 12-bit full-turn angle encoding.
def radians_to_hw_angle(angle_radians: float):
    turn = angle_radians % (2.0 * math.pi)
    return int(round(turn * HW_ANGLE_STEPS / (2.0 * math.pi))) & HW_ANGLE_MASK

# Keep every non-local player from PKT_GAME_STATE, including ghosts.
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
        self.gpio_mmio = None
        self.init_error = None

        if pynq is None:
            self.init_error = "pynq runtime is unavailable; this client requires real PYNQ hardware"
            return

        try:
            print(f"[HW] loading overlay: {overlay_path}")
            self.overlay = pynq.Overlay(overlay_path)
            self.bram_mmio = pynq.MMIO(HW_BRAM_BASE_ADDR, HW_BRAM_RANGE)
            self.gpio_mmio = pynq.MMIO(HW_GPIO_BASE_ADDR, HW_GPIO_RANGE)
            print(
                f"[HW] BRAM MMIO ready at 0x{HW_BRAM_BASE_ADDR:08x} "
                f"(range=0x{HW_BRAM_RANGE:x})"
            )
            print(
                f"[HW] button GPIO MMIO ready at 0x{HW_GPIO_BASE_ADDR:08x} "
                f"(range=0x{HW_GPIO_RANGE:x})"
            )
        except Exception as e:
            self.init_error = f"overlay/gpio init failed: {e}"
            print(f"[HW] {self.init_error}")
            self.overlay = None
            self.bram_mmio = None
            self.gpio_mmio = None

    @property
    def hardware_ready(self) -> bool:
        return self.bram_mmio is not None and self.gpio_mmio is not None

    # Read the raw 4-bit button state from the AXI GPIO block added in Button-control.
    def read_button_bits(self) -> int:
        if self.gpio_mmio is None:
            return 0
        return self.gpio_mmio.read(HW_GPIO_DATA_OFFSET) & 0xF

    # Push the authoritative local pose into the fixed BRAM control words the FPGA reads.
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

    # TODO(hardware): the FPGA bitstream still needs a sprite/entity pass that reads this BRAM table.
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

# ── Node state machine ────────────────────────────────────────────────────────

class PYNQNode:
    def __init__(self, server_ip: str, server_port: int, hw: HardwareContext, username: str = ""):
        self.server_addr = (server_ip, server_port)
        self.hw          = hw
        self.username    = username.strip()

        # Game state
        self.player_id   = None
        self.x           = 0.0
        self.y           = 0.0
        self.angle       = 0.0
        self.server_flags = 0
        self.input_flags  = 0
        self.seq         = 0
        self.registered  = False
        self.match_ended = False
        self.movement_mode = MOVEMENT_MODE_POSE
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

    # Decode all server-driven packets and mirror the authoritative state locally.
    def datagram_received(self, data: bytes, addr):
        if len(data) < HEADER_SIZE:
            return
        pkt_type, seq, timestamp = unpack_header(data)

        if pkt_type == PKT_ACK:
            player_id = struct.unpack_from('<B', data, HEADER_SIZE)[0]
            self.player_id   = player_id
            self.registered  = True
            self.match_ended = False
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
                    self.server_flags = p["flags"]
                    if self.server_flags & FLAG_TAGGED:
                        print(f"[Node] P{self.player_id} tagged!")
                    if self.server_flags & FLAG_MATCH_END:
                        print(f"[Node] match ended")
                        self.match_ended = True

    def error_received(self, exc):
        print(f"[Node] UDP error: {exc}")

    # Apply button-driven local movement while keeping the player inside walkable map space.
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

    # Try full movement first, then axis slides, then a safe partial step.
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

    # Poll the board buttons and turn them into a local pose update for this tick.
    def _apply_manual_input(self):
        if not self.registered or self.match_ended:
            return

        buttons = decode_button_bits(self.hw.read_button_bits())

        if buttons["turn_left"]:
            self.angle -= MANUAL_TURN_SPEED
        if buttons["turn_right"]:
            self.angle += MANUAL_TURN_SPEED
        self.angle %= 2.0 * math.pi

        move_step = 0.0
        if buttons["forward"]:
            move_step += MANUAL_MOVE_SPEED
        if buttons["backward"]:
            move_step -= MANUAL_MOVE_SPEED
        if move_step == 0.0:
            return

        desired_x = self.x + move_step * math.cos(self.angle)
        desired_y = self.y + move_step * math.sin(self.angle)
        self.x, self.y = self._resolve_move(desired_x, desired_y)

    # ── Send helpers ───────────────────────────────────────────────────────

    def _send_register(self):
        pkt = pack_register_packet(
            self.seq, self.x, self.y, self.angle,
            movement_mode=self.movement_mode,
            username=self.username,
        )
        self.seq += 1
        self.transport.sendto(pkt, self.server_addr)

    def _send_state(self):
        if not self.registered:
            return
        pkt = pack_node_packet(PKT_HEARTBEAT if self.match_ended else 0x0001,
                               self.seq, self.x, self.y, self.angle, self.input_flags,
                               movement_mode=self.movement_mode)
        self.seq += 1
        self.transport.sendto(pkt, self.server_addr)

    # ── Main loop ─────────────────────────────────────────────────────────

    # Keep the server connection alive and mirror the latest pose/entity state into BRAM.
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
        reg_retry_at = loop.time() + 2.0  # resend REGISTER if no ACK

        try:
            while True:
                tick_start = loop.time()

                if not self.registered:
                    if loop.time() >= reg_retry_at:
                        self._send_register()
                        reg_retry_at = loop.time() + 2.0
                else:
                    self._apply_manual_input()
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

                elapsed   = loop.time() - tick_start
                sleep_for = max(0.0, interval - elapsed)
                await asyncio.sleep(sleep_for)

        finally:
            if self.transport:
                self.transport.close()


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="PYNQ-Z1 raycaster client")
    parser.add_argument("--server",  default="3.9.71.204", help="EC2 server IP")
    parser.add_argument("--port",    type=int, default=9000)
    parser.add_argument("--overlay", default="raycaster.bit",
                        help="Path to FPGA bitstream (.bit)")
    parser.add_argument("--username", default=os.environ.get("PYNQ_USERNAME", ""),
                        help="Optional display name stored with match/player history")
    args = parser.parse_args()

    hw = HardwareContext(args.overlay)
    if not hw.hardware_ready:
        raise SystemExit(hw.init_error or "hardware init failed")
    node = PYNQNode(args.server, args.port, hw, username=args.username)
    asyncio.run(node.run())


if __name__ == "__main__":
    main()
