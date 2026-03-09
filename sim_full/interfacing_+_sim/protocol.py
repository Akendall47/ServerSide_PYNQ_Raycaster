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
#
# The same byte is reused in both directions:
# - node -> server: input / intent flags
# - server -> node: authoritative state flags

FLAG_INPUT_SHOOT = 0x01   # client intent: fired this tick
FLAG_TAGGED      = 0x02   # server state: player tagged this tick
FLAG_MATCH_END   = 0x04   # server state: match is over

CLIENT_INPUT_FLAGS = FLAG_INPUT_SHOOT
SERVER_STATE_FLAGS = FLAG_TAGGED | FLAG_MATCH_END

# Backward-compatible alias used by older call sites.
FLAG_SHOOTING = FLAG_INPUT_SHOOT

# ── Node movement modes ───────────────────────────────────────────────────────

NODE_PROTOCOL_VERSION = 1

MOVEMENT_MODE_POSE                   = 0x00
MOVEMENT_MODE_INTENT_ONLY            = 0x01
MOVEMENT_MODE_INTENT_WITH_PREDICTION = 0x02

# ── Wire format ───────────────────────────────────────────────────────────────
#
# Node → Server (NodePacket): 24 bytes, little-endian
#
#   Offset  Size  Fmt  Field
#     0       2    H   type              packet type
#     2       2    H   seq               sender sequence number (wraps at 65535)
#     4       4    I   timestamp         milliseconds since epoch (truncated to 32-bit)
#     8       4    f   pred_x            client predicted world-space X
#    12       4    f   pred_y            client predicted world-space Y
#    16       4    f   pred_angle        client predicted view angle, radians
#    20       1    B   input_flags       node -> server input / intent bitmask
#    21       1    B   movement_mode     pose / intent_only / intent_with_prediction
#    22       1    B   protocol_version  node packet version
#    23       1    B   reserved          reserved for future use, send zero

NODE_FMT  = '<HHIfffBBBB'
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

# Pack a NodePacket for sending to the server — returns 24 bytes ready for sendto()
def pack_node_packet(pkt_type, seq, x, y, angle, flags=0,
                     movement_mode=MOVEMENT_MODE_INTENT_WITH_PREDICTION,
                     protocol_version=NODE_PROTOCOL_VERSION,
                     reserved=0):
    timestamp = int(time.time() * 1000) & 0xFFFFFFFF
    return struct.pack(NODE_FMT, pkt_type, seq & 0xFFFF, timestamp,
                       float(x), float(y), float(angle),
                       flags & 0xFF, movement_mode & 0xFF,
                       protocol_version & 0xFF, reserved & 0xFF)


def client_input_flags(*, shooting=False):
    flags = 0
    if shooting:
        flags |= FLAG_INPUT_SHOOT
    return flags


def decode_flag_names(flags, *, direction):
    names = []
    if direction == "client_to_server":
        if flags & FLAG_INPUT_SHOOT:
            names.append("shoot")
    elif direction == "server_to_client":
        if flags & FLAG_TAGGED:
            names.append("tagged")
        if flags & FLAG_MATCH_END:
            names.append("match_end")
    else:
        raise ValueError(f"unknown direction: {direction}")
    return names


def decode_movement_mode(mode):
    return {
        MOVEMENT_MODE_POSE: "pose",
        MOVEMENT_MODE_INTENT_ONLY: "intent_only",
        MOVEMENT_MODE_INTENT_WITH_PREDICTION: "intent_with_prediction",
    }.get(mode, f"unknown({mode})")


# ── Unpack helpers (decode incoming packets) ──────────────────────────────────

# Unpack a raw NodePacket into a dict of named fields
def unpack_node_packet(data):
    if len(data) < NODE_SIZE:
        raise ValueError(f"Packet too short for node packet: {len(data)} bytes")
    # x/y/angle are always the node's predicted pose on the wire now. Whether
    # EC2 treats them as authoritative, advisory, or ignores them depends on
    # movement_mode.
    pkt_type, seq, timestamp, x, y, angle, input_flags, movement_mode, protocol_version, reserved = (
        struct.unpack(NODE_FMT, data[:NODE_SIZE])
    )
    return {
        "pkt_type": pkt_type,
        "seq": seq,
        "timestamp": timestamp,
        "x": x,
        "y": y,
        "angle": angle,
        "input_flags": input_flags,
        "movement_mode": movement_mode,
        "protocol_version": protocol_version,
        "reserved": reserved,
    }

# Unpack the 8-byte server header — returns (pkt_type, seq, timestamp)
def unpack_header(data):
    if len(data) < HEADER_SIZE:
        raise ValueError(f"Packet too short for header: {len(data)} bytes")
    return struct.unpack(HEADER_FMT, data[:HEADER_SIZE])

# Unpack all PlayerEntry records from the post-header payload of a GAME_STATE packet
def unpack_player_entries(payload):
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

# Unpack a full server→node packet — returns (pkt_type, seq, timestamp, players_list)
def unpack_server_packet(data):
    pkt_type, seq, timestamp = unpack_header(data)
    players = unpack_player_entries(data[HEADER_SIZE:])
    return pkt_type, seq, timestamp, players
