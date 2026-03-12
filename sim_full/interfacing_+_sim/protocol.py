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
                             #   optional trailer after the 24-byte NodePacket:
                             #   username_len (1 byte) + UTF-8 username bytes
PKT_ACK          = 0x0030   # server → node:  confirms registration
PKT_BITS_INIT    = 0x0050   # server → node:  bit positions, sent once at match start
                             #   header (8 bytes) + count (1 byte) + N × BitEntry (9 bytes each)

# ── Flags bitmask (uint8 flags field) ─────────────────────────────────────────
#
# The same byte is reused in both directions:
# - node -> server: input / intent flags
# - server -> node: authoritative state flags

FLAG_INPUT_SHOOT = 0x01   # client intent: fired this tick
FLAG_TAGGED      = 0x02   # server state: player tagged this tick
FLAG_MATCH_END   = 0x04   # server state: match is over
FLAG_GHOST       = 0x08   # server state: this player is a server-controlled ghost

CLIENT_INPUT_FLAGS = FLAG_INPUT_SHOOT
SERVER_STATE_FLAGS = FLAG_TAGGED | FLAG_MATCH_END | FLAG_GHOST

# Backward-compatible alias used by older call sites.
FLAG_SHOOTING = FLAG_INPUT_SHOOT

# ── Role selection (sent in PKT_REGISTER reserved byte) ───────────────────────

ROLE_ANY    = 0x00   # no preference — server assigns by join order
ROLE_RUNNER = 0x01   # player wants to be the runner
ROLE_TAGGER = 0x02   # player wants to be the tagger

# ── Game modes ────────────────────────────────────────────────────────────────

GAME_MODE_CHASE      = 0x00   # runner vs tagger, win by tag count
GAME_MODE_CHASE_BITS = 0x01   # runner collects bits, tagger tries to tag

# ── Node movement modes ───────────────────────────────────────────────────────

NODE_PROTOCOL_VERSION = 1  # Version of the 24-byte NodePacket wire format; bump only for breaking packet-layout changes.
MAX_USERNAME_BYTES = 32

MOVEMENT_MODE_POSE = 0x00  # Node sends a raw pose update; server treats x/y/angle as the movement payload for this tick.
MOVEMENT_MODE_INTENT_ONLY = 0x01  # Node is only declaring intent/inputs; server should ignore predicted x/y/angle and advance movement itself.
MOVEMENT_MODE_INTENT_WITH_PREDICTION = 0x02  # Node sends inputs plus its locally predicted pose; server validates/corrects that prediction instead of trusting it blindly.

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

# PKT_GAME_STATE extension header (precedes player entries): 4 bytes
#   game_mode (B) + player_count (B) + bits_mask (H)

GAME_STATE_EXT_FMT  = '<BBH'
GAME_STATE_EXT_SIZE = struct.calcsize(GAME_STATE_EXT_FMT)
assert GAME_STATE_EXT_SIZE == 4, f"GameStateExt must be 4 bytes, got {GAME_STATE_EXT_SIZE}"

# BitEntry (in PKT_BITS_INIT): bit_id (B) + x (f) + y (f) = 9 bytes

BIT_ENTRY_FMT  = '<Bff'
BIT_ENTRY_SIZE = struct.calcsize(BIT_ENTRY_FMT)
assert BIT_ENTRY_SIZE == 9, f"BitEntry must be 9 bytes, got {BIT_ENTRY_SIZE}"

# ── Pack helpers (build outgoing packets) ─────────────────────────────────────

# Build PKT_BITS_INIT — header + count + N × BitEntry
def pack_bits_init_packet(seq, bits):
    timestamp = int(time.time() * 1000) & 0xFFFFFFFF
    header    = struct.pack(HEADER_FMT, PKT_BITS_INIT, seq & 0xFFFF, timestamp)
    payload   = struct.pack('<B', len(bits) & 0xFF)
    for i, (x, y) in enumerate(bits):
        payload += struct.pack(BIT_ENTRY_FMT, i, float(x), float(y))
    return header + payload

# Unpack PKT_BITS_INIT — returns list of (bit_id, x, y)
def unpack_bits_init_packet(data):
    if len(data) < HEADER_SIZE + 1:
        raise ValueError(f"PKT_BITS_INIT too short: {len(data)} bytes")
    count  = struct.unpack_from('<B', data, HEADER_SIZE)[0]
    bits   = []
    offset = HEADER_SIZE + 1
    for _ in range(count):
        bit_id, x, y = struct.unpack_from(BIT_ENTRY_FMT, data, offset)
        bits.append((bit_id, x, y))
        offset += BIT_ENTRY_SIZE
    return bits

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


def pack_register_packet(seq, x, y, angle, *,
                         preferred_role=ROLE_ANY,
                         username="",
                         flags=0,
                         movement_mode=MOVEMENT_MODE_INTENT_WITH_PREDICTION,
                         protocol_version=NODE_PROTOCOL_VERSION):
    username_bytes = (username or "").encode("utf-8")[:MAX_USERNAME_BYTES]
    base = pack_node_packet(
        PKT_REGISTER,
        seq,
        x,
        y,
        angle,
        flags=flags,
        movement_mode=movement_mode,
        protocol_version=protocol_version,
        reserved=preferred_role,
    )
    return base + struct.pack("<B", len(username_bytes)) + username_bytes


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


def unpack_register_packet(data):
    pkt = unpack_node_packet(data)
    if pkt["pkt_type"] != PKT_REGISTER:
        raise ValueError(f"expected PKT_REGISTER, got 0x{pkt['pkt_type']:04x}")

    username = ""
    if len(data) > NODE_SIZE:
        username_len = data[NODE_SIZE]
        available = len(data) - (NODE_SIZE + 1)
        if username_len > available:
            raise ValueError(
                f"PKT_REGISTER username truncated: wanted {username_len} bytes, only {available} available"
            )
        username_bytes = data[NODE_SIZE + 1 : NODE_SIZE + 1 + username_len]
        username = username_bytes.decode("utf-8", errors="replace").strip()

    pkt["preferred_role"] = pkt["reserved"]
    pkt["username"] = username
    return pkt

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

# Unpack PKT_GAME_STATE — returns (pkt_type, seq, timestamp, game_mode, players, bits_mask)
# Falls back gracefully to legacy format for older servers.
def unpack_server_packet(data):
    pkt_type, seq, timestamp = unpack_header(data)
    payload = data[HEADER_SIZE:]
    if pkt_type == PKT_GAME_STATE and len(payload) >= GAME_STATE_EXT_SIZE:
        game_mode, player_count, bits_mask = struct.unpack_from(GAME_STATE_EXT_FMT, payload, 0)
        players = unpack_player_entries(payload[GAME_STATE_EXT_SIZE : GAME_STATE_EXT_SIZE + player_count * PLAYER_SIZE])
        return pkt_type, seq, timestamp, game_mode, players, bits_mask
    players = unpack_player_entries(payload)
    return pkt_type, seq, timestamp, GAME_MODE_CHASE, players, 0xFFFF
