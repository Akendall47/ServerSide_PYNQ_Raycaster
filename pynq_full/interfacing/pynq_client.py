# pynq_full/interfacing/pynq_client.py — PYNQ-Z1 board client.
#
# Wiring:
#   UDP networking  → protocol.py (same packet format as sim)
#   Raycaster input → AXI-Lite register writes (player x, y, angle each frame)
#   Map tiles       → BRAM via AXI-Lite (written once on PKT_MAP)
#   HDMI output     → VDMA via pynq.lib.video (runs continuously from framebuffer)
#
# AXI-Lite register map (raycaster IP, base addr from overlay):
#   0x00  float  player_x
#   0x04  float  player_y
#   0x08  float  player_angle
#   0x0C  uint32 done / output valid flag (read only)
#
# Run on PYNQ-Z1:
#   python3 pynq_client.py --server <EC2_IP> [--port 9000] [--overlay base.bit]

import asyncio
import socket
import struct
import math
import argparse
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from protocol import (
    PKT_REGISTER, PKT_ACK, PKT_GAME_STATE, PKT_MAP, PKT_HEARTBEAT,
    FLAG_TAGGED, FLAG_MATCH_END,
    HEADER_SIZE, HEADER_FMT, PLAYER_SIZE, PLAYER_FMT,
    pack_node_packet, unpack_header, unpack_player_entries, unpack_map_packet,
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
TICK_RATE    = 20                   # Hz — match server

# ── AXI-Lite register offsets ─────────────────────────────────────────────────

REG_PLAYER_X     = 0x00
REG_PLAYER_Y     = 0x04
REG_PLAYER_ANGLE = 0x08
REG_DONE         = 0x0C            # read to check if frame is rendered

# ── BRAM map tile layout ───────────────────────────────────────────────────────
# Tiles are written as a flat byte array: row-major, 0=empty 1=wall.
# Each tile occupies one word (4 bytes) in the BRAM to keep addressing simple.
# BRAM base address and AXI-Lite IP name are set in the overlay; adjust if
# your HWH names differ.

BRAM_IP_NAME      = "axi_bram_ctrl_0"    # IP block name in Vivado design
RAYCASTER_IP_NAME = "raycaster_0"        # AXI-Lite slave IP block name

# ── Colour palette (floor / ceiling / wall) ───────────────────────────────────

COLOUR_CEILING = (50,  50,  80)    # dark blue-grey
COLOUR_FLOOR   = (80,  60,  40)    # brown
COLOUR_WALL    = (180, 150, 100)   # tan; brightness scaled by distance

# ─────────────────────────────────────────────────────────────────────────────


def _try_import_pynq():
    """Import pynq and pynq.lib.video; return (pynq, video) or (None, None)."""
    try:
        import pynq
        from pynq.lib import video
        return pynq, video
    except ImportError:
        return None, None


class HardwareContext:
    """Wraps PYNQ overlay, AXI-Lite IP, BRAM, and HDMI output.

    Falls back to software rendering + no-op register writes if not on a PYNQ board.
    """

    def __init__(self, overlay_path: str):
        pynq, video = _try_import_pynq()
        self.pynq    = pynq
        self.video   = video
        self.overlay = None
        self.rc_ip   = None     # AXI-Lite raycaster IP handle
        self.bram    = None     # BRAM controller handle
        self.hdmi    = None     # HDMI output pipeline
        self.frame   = None     # numpy array backed by VDMA buffer (H×W×3 uint8)

        if pynq is None:
            print("[HW] pynq not available — running in software-only mode")
            return

        try:
            print(f"[HW] loading overlay: {overlay_path}")
            self.overlay = pynq.Overlay(overlay_path)
            self.rc_ip   = getattr(self.overlay, RAYCASTER_IP_NAME, None)
            self.bram    = getattr(self.overlay, BRAM_IP_NAME, None)
            print(f"[HW] raycaster IP: {self.rc_ip}")
            print(f"[HW] BRAM ctrl:    {self.bram}")
        except Exception as e:
            print(f"[HW] overlay load failed: {e}")
            return

        try:
            self.hdmi = self.overlay.video.hdmi_out
            self.hdmi.configure(self.video.VideoMode(SCREEN_W, SCREEN_H, 24))
            self.hdmi.start()
            self.frame = self.hdmi.newframe()
            print(f"[HW] HDMI out started: {SCREEN_W}x{SCREEN_H}")
        except Exception as e:
            print(f"[HW] HDMI init failed: {e}")
            self.hdmi  = None
            self.frame = None

    def write_player_regs(self, x: float, y: float, angle: float):
        """Write player position to AXI-Lite raycaster registers."""
        if self.rc_ip is None:
            return
        self.rc_ip.write(REG_PLAYER_X,     struct.unpack('<I', struct.pack('<f', x))[0])
        self.rc_ip.write(REG_PLAYER_Y,     struct.unpack('<I', struct.pack('<f', y))[0])
        self.rc_ip.write(REG_PLAYER_ANGLE, struct.unpack('<I', struct.pack('<f', angle))[0])

    def write_map_to_bram(self, width: int, height: int, tiles: bytes):
        """Write map tiles to BRAM (one 32-bit word per tile)."""
        if self.bram is None:
            print(f"[HW] BRAM not available — map tiles not written")
            return
        for i, tile in enumerate(tiles):
            self.bram.write(i * 4, int(tile))
        print(f"[HW] wrote {len(tiles)} tiles to BRAM ({width}x{height})")

    def present_frame(self, frame_data):
        """Copy rendered frame into VDMA buffer and present it on HDMI."""
        if self.hdmi is None or self.frame is None:
            return
        self.frame[:] = frame_data
        self.hdmi.writeframe(self.frame)


# ── Software raycaster fallback ───────────────────────────────────────────────
# Used when the FPGA raycaster is not available (overlay not loaded or not on PYNQ).
# Plain DDA — same algorithm the FPGA implements.

def _cast_rays(x: float, y: float, angle: float, map_w: int, map_h: int,
               tiles: bytearray, tile_scale: int):
    """Return list of (distance, hit_side) for each screen column."""
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


def render_frame_software(x, y, angle, map_w, map_h, tiles, tile_scale):
    """Render a full frame as a H×W×3 uint8 numpy array (software path)."""
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
        self.flags       = 0
        self.seq         = 0
        self.registered  = False
        self.match_ended = False

        # Map state
        self.map_w      = 0
        self.map_h      = 0
        self.tile_scale = 8
        self.tiles      = bytearray()

        # Peer state (for display)
        self.peer_x     = 0.0
        self.peer_y     = 0.0
        self.peer_angle = 0.0
        self.peer_flags = 0

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
            self.x = ORBIT_RADIUS * math.cos(self.orbit_angle)
            self.y = ORBIT_RADIUS * math.sin(self.orbit_angle)
            self.angle       = self.orbit_angle
            self.registered  = True
            role = "RUNNER" if player_id == 1 else "TAGGER"
            print(f"[Node] registered as player {player_id} ({role})")

        elif pkt_type == PKT_MAP:
            self.map_w, self.map_h, self.tile_scale, self.tiles = unpack_map_packet(data)
            print(f"[Node] received map {self.map_w}x{self.map_h} tile_scale={self.tile_scale}")
            self.hw.write_map_to_bram(self.map_w, self.map_h, self.tiles)

        elif pkt_type == PKT_GAME_STATE:
            players = unpack_player_entries(data[HEADER_SIZE:])
            for p in players:
                if p["player_id"] == self.player_id:
                    self.flags = p["flags"]
                    if self.flags & FLAG_TAGGED:
                        print(f"[Node] P{self.player_id} tagged!")
                    if self.flags & FLAG_MATCH_END:
                        print(f"[Node] match ended")
                        self.match_ended = True
                else:
                    self.peer_x     = p["x"]
                    self.peer_y     = p["y"]
                    self.peer_angle = p["angle"]
                    self.peer_flags = p["flags"]

    def error_received(self, exc):
        print(f"[Node] UDP error: {exc}")

    # ── Movement logic (orbiting circle, same as node_simulator) ──────────

    def _step(self):
        if not self.registered or self.match_ended:
            return
        speed = RUNNER_SPEED if self.player_id == 1 else TAGGER_SPEED
        self.orbit_angle += speed
        self.x     = ORBIT_RADIUS * math.cos(self.orbit_angle)
        self.y     = ORBIT_RADIUS * math.sin(self.orbit_angle)
        self.angle = self.orbit_angle

    # ── Send helpers ───────────────────────────────────────────────────────

    def _send_register(self):
        pkt = pack_node_packet(PKT_REGISTER, self.seq, self.x, self.y, self.angle)
        self.seq += 1
        self.transport.sendto(pkt, self.server_addr)

    def _send_state(self):
        if not self.registered:
            return
        pkt = pack_node_packet(PKT_HEARTBEAT if self.match_ended else 0x0001,
                               self.seq, self.x, self.y, self.angle, self.flags)
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
                    self._step()
                    self._send_state()

                    # Write position to FPGA registers
                    self.hw.write_player_regs(self.x, self.y, self.angle)

                    # Render frame: use FPGA if available, software otherwise
                    if self.hw.rc_ip is not None and self.tiles:
                        # FPGA renders into VDMA framebuffer automatically;
                        # just trigger start and wait for done.
                        frame = None    # FPGA drives HDMI directly
                    elif self.tiles:
                        frame = render_frame_software(
                            self.x, self.y, self.angle,
                            self.map_w, self.map_h, self.tiles, self.tile_scale,
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
    parser.add_argument("--overlay", default="base.bit",
                        help="Path to FPGA bitstream (.bit)")
    args = parser.parse_args()

    hw   = HardwareContext(args.overlay)
    node = PYNQNode(args.server, args.port, hw)
    asyncio.run(node.run())


if __name__ == "__main__":
    main()
