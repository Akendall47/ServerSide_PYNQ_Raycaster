# basic/client/sender.py
#
# Minimal PYNQ node simulator : single file, no classes, no threading.
#
# Purpose: prove that a client can send position packets to the EC2 server
# and receive game state back. Stand-in for the real PYNQ node.
#
# Run on your laptop (not EC2):
#   python sender.py
#
# Change SERVER_IP to your EC2 elastic IP before running against EC2.
# Packet format lives in protocol/protocol.py : edit there, not here.

import sys
import os
import socket
import time
import tty
import termios
import threading

# Allow importing from basic/protocol/
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'protocol'))
from protocol import (
    pack_node_packet, unpack_server_packet,
    PKT_STATE_UPDATE, PKT_GAME_STATE,
    HEADER_SIZE,
)

SERVER_IP   = "3.9.71.204"  # EC2 elastic IP
SERVER_PORT = 9000

MOVE_SPEED  = 0.1   # units per keypress
TURN_SPEED  = 0.05  # radians per keypress

# ── Player state ──────────────────────────────────────────────────────────────
x     = 1.0
y     = 2.0
angle = 0.0
seq   = 0

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.settimeout(0.01)

# ── Keyboard input (non-blocking, runs in background thread) ──────────────────
import math

def read_keys():
    """Background thread: reads arrow keys and updates x, y, angle."""
    global x, y, angle
    fd = sys.stdin.fileno()
    old = termios.tcgetattr(fd)
    try:
        tty.setraw(fd)
        while True:
            ch = sys.stdin.read(1)
            if ch == '\x1b':          # escape sequence start
                ch2 = sys.stdin.read(1)
                ch3 = sys.stdin.read(1)
                if ch2 == '[':
                    if ch3 == 'A':    # up arrow: move forward
                        x += math.cos(angle) * MOVE_SPEED
                        y += math.sin(angle) * MOVE_SPEED
                    elif ch3 == 'B':  # down arrow: move backward
                        x -= math.cos(angle) * MOVE_SPEED
                        y -= math.sin(angle) * MOVE_SPEED
                    elif ch3 == 'C':  # right arrow: turn right
                        angle -= TURN_SPEED
                    elif ch3 == 'D':  # left arrow: turn left
                        angle += TURN_SPEED
            elif ch in ('q', '\x03'): # q or Ctrl+C: quit
                os._exit(0)
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old)

threading.Thread(target=read_keys, daemon=True).start()

# ── Send / receive ─────────────────────────────────────────────────────────────
def send_packet():
    global seq
    pkt = pack_node_packet(PKT_STATE_UPDATE, seq, x, y, angle)
    sock.sendto(pkt, (SERVER_IP, SERVER_PORT))
    seq += 1

def receive():
    try:
        data, _ = sock.recvfrom(512)
    except socket.timeout:
        return

    if len(data) < HEADER_SIZE:
        return

    pkt_type, _, _, players = unpack_server_packet(data)
    if pkt_type != PKT_GAME_STATE:
        return

    print(f"\r  Game state : {len(players)} player(s):")
    for p in players:
        print(f"    player {p['player_id']}  x={p['x']:.2f}  y={p['y']:.2f}  angle={p['angle']:.2f}")

print(f"Sending to {SERVER_IP}:{SERVER_PORT} at 20 Hz.")
print("Arrow keys: move/turn  |  Q: quit")
interval = 1.0 / 20  # 20 Hz

while True:
    send_packet()
    receive()
    time.sleep(interval)
