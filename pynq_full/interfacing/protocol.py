# pynq_full/interfacing/protocol.py — UDP packet format (node ↔ server).
# Asserts catch size mismatches at startup. Used by PYNQ board code and EC2 server.

import struct
import time

# ── Packet types ──────────────────────────────────────────────────────────────

PKT_STATE_UPDATE = 0x0001   # node  → server: position this tick
PKT_GAME_STATE   = 0x0002   # server → node:  all player positions
PKT_HEARTBEAT    = 0x0010   # node  → server: keepalive
PKT_REGISTER     = 0x0020   # node  → server: first contact, triggers ACK
PKT_ACK          = 0x0030   # server → node:  confirms registration
                             #   byte 8 = player_id (1=RUNNER, 2=TAGGER) — wait for this
                             #   before sending STATE_UPDATEs. No node-to-node comms needed;
                             #   opponent position arrives in every PKT_GAME_STATE broadcast.
PKT_MAP          = 0x0040   # server → node:  map tile data, sent once after PKT_ACK
                             #   header (8 bytes) + MapHeader (4 bytes) + tiles (width*height bytes)
                             #   node stores tiles in DRAM; FPGA raycaster reads them each frame.

# ── Flags bitmask (uint8 flags field) ─────────────────────────────────────────

FLAG_SHOOTING   = 0x01   # player fired this tick
FLAG_TAGGED     = 0x02   # player has been tagged this tick (intermediate or final)
FLAG_MATCH_END  = 0x04   # set on final tag only — node should stop and wait for restart

# ── Wire format ───────────────────────────────────────────────────────────────
#
# Node → Server (NodePacket): 24 bytes, little-endian
#
#   Offset  Size  Fmt  Field
#     0       2    H   type       packet type
#     2       2    H   seq        sender sequence number (wraps at 65535)
#     4       4    I   timestamp  milliseconds since epoch (truncated to 32-bit)
#     8       4    f   x          world-space X
#    12       4    f   y          world-space Y
#    16       4    f   angle      view angle, radians
#    20       1    B   flags      bitmask
#    21       3    3x  pad        reserved, zero

NODE_FMT  = '<HHIfffB3x'
NODE_SIZE = struct.calcsize(NODE_FMT)
assert NODE_SIZE == 24, f"NodePacket must be 24 bytes, got {NODE_SIZE}"

# Server → Node header (ServerPacketHeader): 8 bytes
#
#   Offset  Size  Fmt  Field
#     0       2    H   type
#     2       2    H   seq
#     4       4    I   timestamp

HEADER_FMT  = '<HHI'
HEADER_SIZE = struct.calcsize(HEADER_FMT)
assert HEADER_SIZE == 8, f"ServerPacketHeader must be 8 bytes, got {HEADER_SIZE}"

# Per-player entry (PlayerEntry): 14 bytes
#
#   Offset  Size  Fmt  Field
#     0       1    B   player_id
#     1       4    f   x
#     5       4    f   y
#     9       4    f   angle
#    13       1    B   flags
#    14       :    x   (implicit : 14 bytes total, no tail padding needed)

PLAYER_FMT  = '<BfffB'
PLAYER_SIZE = struct.calcsize(PLAYER_FMT)
assert PLAYER_SIZE == 14, f"PlayerEntry must be 14 bytes, got {PLAYER_SIZE}"

# MapHeader (follows the 8-byte ServerPacketHeader in a PKT_MAP packet): 4 bytes
#
#   Offset  Size  Fmt  Field
#     0       1    B   width       map width in tiles
#     1       1    B   height      map height in tiles
#     2       1    B   tile_scale  world units per tile (e.g. 8 → each tile = 8×8 world units)
#     3       1    x   pad         reserved, zero
#
# Followed immediately by width*height bytes of tile data (row-major, 0=empty 1=wall).
# Total PKT_MAP size: 8 + 4 + width*height bytes.
# For a 20×16 map: 8 + 4 + 320 = 332 bytes — well within UDP MTU.

MAP_HEADER_FMT  = '<BBBx'
MAP_HEADER_SIZE = struct.calcsize(MAP_HEADER_FMT)
assert MAP_HEADER_SIZE == 4, f"MapHeader must be 4 bytes, got {MAP_HEADER_SIZE}"

# ── Pack helpers (build outgoing packets) ─────────────────────────────────────

def pack_map_packet(seq, width, height, tile_scale, tiles):
    """Build PKT_MAP: 8-byte header + 4-byte MapHeader + tiles (0=empty, 1=wall)."""
    timestamp = int(time.time() * 1000) & 0xFFFFFFFF
    header    = struct.pack(HEADER_FMT, PKT_MAP, seq & 0xFFFF, timestamp)
    map_hdr   = struct.pack(MAP_HEADER_FMT, width & 0xFF, height & 0xFF, tile_scale & 0xFF)
    return header + map_hdr + bytes(tiles)

def pack_node_packet(pkt_type, seq, x, y, angle, flags=0):
    """Pack a 24-byte NodePacket for sending to the server."""
    timestamp = int(time.time() * 1000) & 0xFFFFFFFF
    return struct.pack(NODE_FMT, pkt_type, seq & 0xFFFF, timestamp,
                       float(x), float(y), float(angle), flags & 0xFF)

# ── Unpack helpers (decode incoming packets) ──────────────────────────────────

def unpack_header(data):
    """Unpack the 8-byte server header. Returns (pkt_type, seq, timestamp)."""
    if len(data) < HEADER_SIZE:
        raise ValueError(f"Packet too short for header: {len(data)} bytes")
    return struct.unpack(HEADER_FMT, data[:HEADER_SIZE])

def unpack_player_entries(payload):
    """Unpack PlayerEntry records from the post-header payload of a GAME_STATE packet."""
    players = []
    n = len(payload) // PLAYER_SIZE
    for i in range(n):
        chunk = payload[i * PLAYER_SIZE : (i + 1) * PLAYER_SIZE]
        player_id, x, y, angle, flags = struct.unpack(PLAYER_FMT, chunk)
        players.append({
            "player_id": player_id,
            "x":         x,
            "y":         y,
            "angle":     angle,
            "flags":     flags,
        })
    return players

def unpack_map_packet(data):
    """Unpack a PKT_MAP packet. Returns (width, height, tile_scale, tiles bytearray)."""
    if len(data) < HEADER_SIZE + MAP_HEADER_SIZE:
        raise ValueError(f"PKT_MAP too short: {len(data)} bytes")
    width, height, tile_scale = struct.unpack_from(MAP_HEADER_FMT, data, HEADER_SIZE)
    tile_start = HEADER_SIZE + MAP_HEADER_SIZE
    tiles = bytearray(data[tile_start : tile_start + width * height])
    return width, height, tile_scale, tiles

def unpack_server_packet(data):
    """Unpack a full server→node packet. Returns (pkt_type, seq, timestamp, players)."""
    pkt_type, seq, timestamp = unpack_header(data)
    players = unpack_player_entries(data[HEADER_SIZE:])
    return pkt_type, seq, timestamp, players
