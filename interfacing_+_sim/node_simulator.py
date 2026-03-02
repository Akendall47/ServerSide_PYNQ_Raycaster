#!/usr/bin/env python3
"""
node_simulator.py

Fake PYNQ node for testing the server without hardware.

Runs on your laptop and sends UDP packets to the EC2 server, impersonating
a real PYNQ board.

State machine (per node):
  PLAYING  → sends position at 20 Hz, reads game state
           → on FLAG_TAGGED in any broadcast: print GAME OVER, → WAITING
  WAITING  → sends nothing, polls Redis pub/sub for restart signal
           → on game:control restart: sleep 4.5s (server lockout), → PLAYING

Usage:
    python3 node_simulator.py <server_ip> [port] --nodes N --node-index I
"""

import socket
import time
import math
import argparse
import threading
import json
try:
    import redis as redislib
except ImportError:
    redislib = None

from protocol import (
    pack_node_packet,
    unpack_server_packet,
    PKT_GAME_STATE,
    PKT_REGISTER,
    FLAG_SHOOTING,
    FLAG_TAGGED,
)

# How long to wait after restart signal before re-registering.
# Covers server's MATCH_END_HOLD_S (1s) + LOCKOUT_S (3s) with margin.
RESTART_DELAY_S = 4.5

TICK_HZ      = 20
TICK_INTERVAL = 1.0 / TICK_HZ


def run_node(server_ip, server_port, player_id, node_index,
             redis_host, redis_port, max_ticks=None):
    """
    Single node loop. Runs forever (or until max_ticks) in the calling thread.

    State machine:
      playing=True  → register + send position each tick
      playing=False → wait for pub/sub restart signal, then re-enter playing
    """
    server_addr = (server_ip, server_port)

    # ── movement params (vary by node_index) ──────────────────────────────────
    radius         = 50.0
    rotation_speed = 0.05 + node_index * 0.03
    shoot_freq     = 20  + node_index * 10
    angle          = node_index * math.pi * 2 / 4   # spread starting positions

    tag = f"[NODE {player_id}]"

    # ── Redis pub/sub (optional) ───────────────────────────────────────────────
    ps = None
    if redislib:
        try:
            rc = redislib.Redis(host=redis_host, port=redis_port,
                                decode_responses=True)
            rc.ping()
            ps = rc.pubsub(ignore_subscribe_messages=True)
            ps.subscribe("game:control")
            print(f"{tag} subscribed to game:control ({redis_host}:{redis_port})")
        except Exception as e:
            print(f"{tag} Redis unavailable ({e}) — restart requires Ctrl+C and re-run")
            ps = None

    # ── main loop ─────────────────────────────────────────────────────────────
    sock    = None
    playing = False   # start in WAITING so we register cleanly on first entry
    seq     = 0
    tick    = 0

    try:
        while True:
            # ── Enter PLAYING: open socket, register ──────────────────────────
            if not playing:
                if ps:
                    # drain stale messages from the match just ended
                    while ps.get_message():
                        pass
                    print(f"{tag} waiting for dashboard ▶ RESTART...")
                    # block-poll until restart signal
                    while True:
                        msg = ps.get_message()
                        if msg and msg["type"] == "message":
                            try:
                                if json.loads(msg["data"]).get("cmd") == "restart":
                                    print(f"{tag} restart received — rejoining in {RESTART_DELAY_S}s...")
                                    time.sleep(RESTART_DELAY_S)
                                    break
                            except Exception:
                                pass
                        time.sleep(0.1)
                else:
                    # no Redis — just wait here; user must Ctrl+C and re-run
                    print(f"{tag} no Redis — Ctrl+C and re-run to restart")
                    while True:
                        time.sleep(1)

                # open fresh socket for the new game
                if sock:
                    sock.close()
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                sock.settimeout(0.05)

                # register
                pkt = pack_node_packet(PKT_REGISTER, seq=0, x=0, y=0, angle=0, flags=0)
                sock.sendto(pkt, server_addr)
                print(f"{tag} REGISTER sent")
                seq     = 1
                tick    = 0
                playing = True

            # ── one PLAYING tick ──────────────────────────────────────────────
            tick_start = time.time()

            # read all queued game-state packets
            game_over = False
            while True:
                try:
                    data, _ = sock.recvfrom(1024)
                    pkt_type, _, _, players = unpack_server_packet(data)
                    if pkt_type == PKT_GAME_STATE:
                        for p in players:
                            if p["flags"] & FLAG_TAGGED:
                                print(f"{tag} P{p['player_id']} TAGGED — game over")
                                game_over = True
                except socket.timeout:
                    break
                except Exception as e:
                    print(f"{tag} recv error: {e}")
                    break

            if game_over:
                playing = False
                # close socket — server will clear the player after hold+lockout
                sock.close()
                sock = None
                print(f"{tag} ── GAME OVER ──")
                continue   # go back to top → WAITING state

            # send position update
            angle += rotation_speed
            x = radius * math.cos(angle)
            y = radius * math.sin(angle)
            flags = FLAG_SHOOTING if (tick % shoot_freq == 0) else 0

            pkt = pack_node_packet(0x0001, seq=seq, x=x, y=y, angle=angle, flags=flags)
            sock.sendto(pkt, server_addr)

            if tick % TICK_HZ == 0:
                print(f"{tag} tick={tick:4d} seq={seq:5d} "
                      f"pos=({x:7.2f},{y:7.2f}) angle={angle:7.3f} flags={flags}")

            seq  = (seq + 1) & 0xFFFF
            tick += 1

            if max_ticks and tick >= max_ticks:
                print(f"{tag} max_ticks {max_ticks} reached, stopping")
                break

            elapsed = time.time() - tick_start
            sleep   = max(0.0, TICK_INTERVAL - elapsed)
            if sleep:
                time.sleep(sleep)

    except KeyboardInterrupt:
        print(f"\n{tag} interrupted")
    finally:
        if sock:
            sock.close()
        if ps:
            ps.close()
        print(f"{tag} stopped at tick {tick}")


def main():
    parser = argparse.ArgumentParser(description="Simulate PYNQ nodes (UDP clients)")
    parser.add_argument("server_ip")
    parser.add_argument("port",       nargs="?", type=int, default=9000)
    parser.add_argument("max_ticks",  nargs="?", type=int, default=None)
    parser.add_argument("--nodes",      "-n", type=int, default=1)
    parser.add_argument("--node-index",       type=int, default=None,
                        help="Override node_index (default: 0,1,2... per node)")
    parser.add_argument("--player-id",  "-p", type=int, default=1,
                        help="Starting player_id label (local only)")
    parser.add_argument("--redis-host",       default="127.0.0.1")
    parser.add_argument("--redis-port",       type=int, default=6380)
    args = parser.parse_args()

    print(f"server={args.server_ip}:{args.port}  nodes={args.nodes}  "
          f"redis={args.redis_host}:{args.redis_port}  "
          f"max_ticks={args.max_ticks or 'unlimited'}")

    threads = []
    for i in range(args.nodes):
        t = threading.Thread(
            target=run_node,
            kwargs=dict(
                server_ip   = args.server_ip,
                server_port = args.port,
                player_id   = args.player_id + i,
                node_index  = args.node_index if args.node_index is not None else i,
                redis_host  = args.redis_host,
                redis_port  = args.redis_port,
                max_ticks   = args.max_ticks,
            ),
            daemon=False,
        )
        threads.append(t)
        t.start()

    try:
        for t in threads:
            t.join()
    except KeyboardInterrupt:
        print("\nshutting down...")


if __name__ == "__main__":
    main()
