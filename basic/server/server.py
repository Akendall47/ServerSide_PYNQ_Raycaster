# basic/server/server.py
#
# Minimal Python UDP game server : single file, no classes, no framework.
#
# Purpose: prove that a PYNQ node can send a position packet to EC2,
# receive game state back, and that match events reach Redis so the
# Python sidecar can write them to DynamoDB.
#
# What it does:
#   1. Binds UDP on port 9000
#   2. Receives NodePackets from PYNQ nodes / simulator
#   3. Merges player state, echoes back to all clients
#   4. Writes player state to Redis (HSET) each packet
#   5. Pushes a match-start event to Redis when 2 players connect
#
# Run on EC2:
#   python server.py
#
# Requires: pip install redis
# Make sure EC2 security group allows inbound UDP on port 9000.
# Packet format: see ../protocol/protocol.py

import socket
import sys
import os
import time
import signal
import json

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'protocol'))
from protocol import (
    NODE_FMT, NODE_SIZE, HEADER_FMT, HEADER_SIZE,
    PLAYER_FMT, PLAYER_SIZE,
    PKT_STATE_UPDATE, PKT_REGISTER, PKT_GAME_STATE,
)
import struct

# ── Config ────────────────────────────────────────────────────────────────────

PORT       = 9000
MAX_NODES  = 4
REDIS_HOST = "127.0.0.1"   # change to ElastiCache endpoint on real EC2
REDIS_PORT = 6379

# ── Redis (optional : server runs without it if Redis unavailable) ────────────
# Tries to connect and ping Redis. If it fails, r=None is set and every Redis
# helper returns early ("if not r: return") : the UDP game loop keeps running,
# only persistence (sidecar → DynamoDB) is lost.

try:
    import redis as redislib
    r = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    r.ping()
    print(f"Connected to Redis at {REDIS_HOST}:{REDIS_PORT}")
except Exception as e:
    print(f"Redis not available ({e}) : continuing without it")
    r = None

def redis_write_player(player_id, x, y, angle):
    if not r: return
    try:
        r.hset(f"player:{player_id}", mapping={"x": x, "y": y, "angle": angle})
    except Exception: pass

def redis_push_event(payload: str):
    if not r: return
    try:
        r.lpush("game:events", payload)
        print(f"Redis event: {payload}")
    except Exception: pass

# ── State ─────────────────────────────────────────────────────────────────────

# nodes: addr → {player_id, x, y, angle, flags}
nodes        = {}
next_id      = 0
server_seq   = 0

def find_or_add(addr):
    global next_id
    if addr not in nodes:
        if len(nodes) >= MAX_NODES:
            return None
        nodes[addr] = {"player_id": next_id, "x": 0.0, "y": 0.0, "angle": 0.0, "flags": 0}
        print(f"New player {next_id} from {addr} (total: {len(nodes)})")
        if len(nodes) == 2:
            redis_push_event('{"event":"match_start","players":2}')
        next_id += 1
    return nodes[addr]

# ── Broadcast ─────────────────────────────────────────────────────────────────

def build_game_state():
    global server_seq
    header  = struct.pack(HEADER_FMT, PKT_GAME_STATE, server_seq,
                          int(time.time() * 1000) & 0xFFFFFFFF)
    server_seq += 1
    entries = b""
    for p in nodes.values():
        entries += struct.pack(PLAYER_FMT,
                               p["player_id"], p["x"], p["y"], p["angle"], p["flags"])
    return header + entries

def broadcast(sock):
    pkt = build_game_state()
    for addr in nodes:
        sock.sendto(pkt, addr)

# ── Shutdown ──────────────────────────────────────────────────────────────────

def handle_sigint(sig, frame):
    print("\nShutting down: pushing match_end event...")
    redis_push_event(json.dumps({"event": "match_end", "players": len(nodes)}))
    sys.exit(0)

signal.signal(signal.SIGINT, handle_sigint)

# ── Main loop ─────────────────────────────────────────────────────────────────

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", PORT))
print(f"Basic game server listening on UDP port {PORT}")

while True:
    data, addr = sock.recvfrom(512)

    if len(data) < NODE_SIZE:
        continue

    pkt_type, seq, timestamp, x, y, angle, flags = struct.unpack_from('<HHIfffB', data)

    player = find_or_add(addr)
    if player is None:
        print("Server full")
        continue

    player["x"]     = x
    player["y"]     = y
    player["angle"] = angle
    player["flags"] = flags

    print(f"Player {player['player_id']}  x={x:.2f}  y={y:.2f}  angle={angle:.2f}")

    redis_write_player(player["player_id"], x, y, angle)
    broadcast(sock)
