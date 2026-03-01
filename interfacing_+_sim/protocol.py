# interfacing/protocol.py
#
# Single source of truth for the UDP packet format.
#
# This file is THE contract between the Python client/simulator and the Python server.
# If you change a field, size, or order here you MUST update the server-side unpack
# logic in ec2/server/game_tick.py to match. The asserts below will catch size
# mismatches at startup.
#
# Used by:
#   interfacing/node_simulator.py   : test client, runs on laptop
#   PYNQ Jupyter notebooks          : runs on the FPGA board

import struct
import time

# ── Packet types ──────────────────────────────────────────────────────────────

PKT_STATE_UPDATE = 0x0001   # node  → server: position this tick
PKT_GAME_STATE   = 0x0002   # server → node:  all player positions
PKT_HEARTBEAT    = 0x0010   # node  → server: keepalive
PKT_REGISTER     = 0x0020   # node  → server: first contact, triggers ACK
PKT_ACK          = 0x0030   # server → node:  confirms registration

# ── Flags bitmask (uint8 flags field) ─────────────────────────────────────────

FLAG_SHOOTING = 0x01   # player fired this tick
FLAG_TAGGED   = 0x02   # player has been tagged : game over signal

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

# ── Pack helpers (build outgoing packets) ─────────────────────────────────────

def pack_node_packet(pkt_type, seq, x, y, angle, flags=0):
    """
    Pack a NodePacket for sending to the server.
    Returns 24 bytes ready to pass to socket.sendto().
    """
    timestamp = int(time.time() * 1000) & 0xFFFFFFFF
    return struct.pack(NODE_FMT, pkt_type, seq & 0xFFFF, timestamp,
                       float(x), float(y), float(angle), flags & 0xFF)

# ── Unpack helpers (decode incoming packets) ──────────────────────────────────

def unpack_header(data):
    """
    Unpack the 8-byte server header from a received packet.
    Returns (pkt_type, seq, timestamp).
    """
    if len(data) < HEADER_SIZE:
        raise ValueError(f"Packet too short for header: {len(data)} bytes")
    return struct.unpack(HEADER_FMT, data[:HEADER_SIZE])

def unpack_player_entries(payload):
    """
    Unpack all PlayerEntry records from the payload portion of a GAME_STATE packet
    (i.e. data after the 8-byte header).
    Returns a list of dicts: [{"player_id", "x", "y", "angle", "flags"}, ...]
    """
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

def unpack_server_packet(data):
    """
    Unpack a full server → node packet.
    Returns (pkt_type, seq, timestamp, players_list).
    """
    pkt_type, seq, timestamp = unpack_header(data)
    players = unpack_player_entries(data[HEADER_SIZE:])
    return pkt_type, seq, timestamp, players
