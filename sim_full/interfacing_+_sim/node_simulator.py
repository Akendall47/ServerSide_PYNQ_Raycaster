#!/usr/bin/env python3
"""
node_simulator.py — fake PYNQ node for testing without hardware.

State machine: PLAYING (send position @ 20 Hz) ↔ WAITING (on FLAG_TAGGED, wait for restart).
Usage: python3 node_simulator.py <server_ip> [port] --nodes N --node-index I
"""

import socket
import time
import math
import argparse
import threading
import json
import sys
import select
try:
    import redis as redislib
except ImportError:
    redislib = None
try:
    import termios
    import tty
except ImportError:
    termios = None
    tty = None

from protocol import (
    pack_node_packet,
    unpack_server_packet,
    PKT_GAME_STATE,
    PKT_REGISTER,
    FLAG_SHOOTING,
    FLAG_TAGGED,
    FLAG_MATCH_END,
)

# How long to wait after restart signal before re-registering.
# Must exceed server's MATCH_END_HOLD_S (0.5s) + LOCKOUT_S (0.5s).
RESTART_DELAY_S = 1.5

TICK_HZ      = 20
TICK_INTERVAL = 1.0 / TICK_HZ
ARENA_RADIUS = 50.0
MANUAL_TURN_STEP = 0.2
MANUAL_MOVE_STEP = 4.0


class ManualController:
    """Non-blocking arrow-key reader for one simulator process."""

    def __init__(self):
        if termios is None or tty is None or not sys.stdin.isatty():
            raise RuntimeError("manual mode requires a real TTY on a Unix-like terminal")
        self.fd = sys.stdin.fileno()
        self._old_attrs = None

    def enable(self):
        if self._old_attrs is None:
            self._old_attrs = termios.tcgetattr(self.fd)
            tty.setcbreak(self.fd)
        return self

    def disable(self):
        if self._old_attrs is not None:
            termios.tcsetattr(self.fd, termios.TCSADRAIN, self._old_attrs)
            self._old_attrs = None

    def read_actions(self):
        actions = []
        while True:
            ready, _, _ = select.select([sys.stdin], [], [], 0)
            if not ready:
                break
            ch = sys.stdin.read(1)
            if ch == "\x1b":
                seq = ch + sys.stdin.read(1) + sys.stdin.read(1)
                mapping = {
                    "\x1b[A": "forward",
                    "\x1b[B": "backward",
                    "\x1b[C": "turn_right",
                    "\x1b[D": "turn_left",
                }
                action = mapping.get(seq)
                if action:
                    actions.append(action)
            elif ch == " ":
                actions.append("shoot")
        return actions


def clamp_to_arena(x, y, radius=ARENA_RADIUS):
    dist = math.hypot(x, y)
    if dist <= radius or dist == 0.0:
        return x, y
    scale = radius / dist
    return x * scale, y * scale


def apply_manual_actions(x, y, angle, actions):
    shoot_now = False
    for action in actions:
        if action == "turn_left":
            angle -= MANUAL_TURN_STEP
        elif action == "turn_right":
            angle += MANUAL_TURN_STEP
        elif action == "forward":
            x += MANUAL_MOVE_STEP * math.cos(angle)
            y += MANUAL_MOVE_STEP * math.sin(angle)
            x, y = clamp_to_arena(x, y)
        elif action == "backward":
            x -= MANUAL_MOVE_STEP * math.cos(angle)
            y -= MANUAL_MOVE_STEP * math.sin(angle)
            x, y = clamp_to_arena(x, y)
        elif action == "shoot":
            shoot_now = True
    return x, y, angle, shoot_now


def normalize_mode(mode: str):
    return "auto" if mode == "scripted" else mode


def apply_control_command(tag: str, command: dict, current_mode: str, node_index: int):
    target_index = command.get("node_index")
    if target_index is not None:
        try:
            if int(target_index) != node_index:
                return current_mode, False
        except (TypeError, ValueError):
            return current_mode, False

    cmd = command.get("cmd")
    if cmd == "set_mode":
        requested = normalize_mode(str(command.get("mode", "")).lower())
        if requested in ("auto", "manual") and requested != current_mode:
            print(f"{tag} mode switch requested: {current_mode} -> {requested}")
            return requested, False
    elif cmd == "restart":
        return current_mode, True
    return current_mode, False


def run_node(server_ip, server_port, player_id, node_index,
             redis_host, redis_port, max_ticks=None, mode="auto"):
    server_addr = (server_ip, server_port)

    radius         = ARENA_RADIUS
    rotation_speed = 0.05 + node_index * 0.06  # runner=0.05, tagger=0.11 rad/tick
    shoot_freq     = 20  + node_index * 10
    angle          = node_index * math.pi * 2 / 4
    x              = radius * math.cos(angle)
    y              = radius * math.sin(angle)

    tag = f"[NODE {player_id}]"

    ps = None  # Redis pub/sub (optional)
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

    sock    = None
    playing = False   # start in WAITING; first game needs explicit RESTART
    seq               = 0
    tick              = 0
    normalized_mode = normalize_mode(mode)
    manual_controller = None
    if normalized_mode == "manual":
        manual_controller = ManualController()
        manual_controller.enable()

    def switch_mode(next_mode: str):
        nonlocal normalized_mode, manual_controller
        if next_mode == normalized_mode:
            return
        if next_mode == "manual":
            try:
                manual_controller = ManualController()
                manual_controller.enable()
                print(f"{tag} manual mode: arrows move/turn, space shoots")
                normalized_mode = "manual"
            except Exception as exc:
                print(f"{tag} manual mode unavailable: {exc}")
                normalized_mode = "auto"
                manual_controller = None
        else:
            if manual_controller:
                manual_controller.disable()
                manual_controller = None
            normalized_mode = "auto"

    try:
        if manual_controller:
            print(f"{tag} manual mode: arrows move/turn, space shoots")
        while True:
            # ── WAITING: block until dashboard sends restart ──────────────────
            if not playing:
                if ps:
                    while True:
                        msg = ps.get_message()
                        if not msg:
                            break
                        if msg["type"] != "message":
                            continue
                        try:
                            command = json.loads(msg["data"])
                        except Exception:
                            continue
                        next_mode, should_restart = apply_control_command(tag, command, normalized_mode, node_index)
                        switch_mode(next_mode)
                    print(f"{tag} ── GAME OVER — waiting for ▶ RESTART...")
                    while True:
                        msg = ps.get_message()
                        if msg and msg["type"] == "message":
                            try:
                                command = json.loads(msg["data"])
                            except Exception:
                                command = None
                            if command:
                                next_mode, should_restart = apply_control_command(tag, command, normalized_mode, node_index)
                                switch_mode(next_mode)
                                if should_restart:
                                    print(f"{tag} restart received — rejoining in {RESTART_DELAY_S}s...")
                                    time.sleep(RESTART_DELAY_S)
                                    break
                        time.sleep(0.1)
                else:
                    print(f"{tag} no Redis — Ctrl+C and re-run to restart")
                    while True:
                        time.sleep(1)

                if sock:
                    sock.close()
                sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                sock.settimeout(0.05)
                # Reset angle to spread starting position so nodes begin far apart,
                # not both at (0,0) which would trigger an instant tag.
                angle = node_index * math.pi * 2 / 4
                x = radius * math.cos(angle)
                y = radius * math.sin(angle)
                pkt = pack_node_packet(PKT_REGISTER, seq=0,
                                       x=x, y=y, angle=angle, flags=0)
                sock.sendto(pkt, server_addr)
                print(f"{tag} REGISTER sent at ({x:.1f},{y:.1f})")
                seq     = 1
                tick    = 0
                playing = True

            # ── PLAYING: one tick ─────────────────────────────────────────────
            tick_start = time.time()

            if ps:
                while True:
                    msg = ps.get_message()
                    if not msg:
                        break
                    if msg["type"] != "message":
                        continue
                    try:
                        command = json.loads(msg["data"])
                    except Exception:
                        continue
                    next_mode, should_restart = apply_control_command(tag, command, normalized_mode, node_index)
                    switch_mode(next_mode)
                    if should_restart:
                        playing = False
                        break

            # receive all queued broadcasts; stop playing if FLAG_TAGGED seen
            while playing:
                try:
                    data, _ = sock.recvfrom(1024)
                    pkt_type, _, _, players = unpack_server_packet(data)
                    if pkt_type == PKT_GAME_STATE:
                        for p in players:
                            if p["flags"] & FLAG_MATCH_END:
                                print(f"{tag} P{p['player_id']} TAGGED (final) — stopping")
                                playing = False
                            elif p["flags"] & FLAG_TAGGED:
                                print(f"{tag} P{p['player_id']} TAGGED (intermediate) — resetting position")
                                angle = node_index * math.pi * 2 / 4
                                x = radius * math.cos(angle)
                                y = radius * math.sin(angle)
                except socket.timeout:
                    break
                except Exception as e:
                    print(f"{tag} recv error: {e}")
                    break

            if not playing:
                sock.close()
                sock = None
                continue   # → WAITING

            # send position update
            if normalized_mode == "manual":
                actions = manual_controller.read_actions() if manual_controller else []
                x, y, angle, shoot_now = apply_manual_actions(x, y, angle, actions)
                flags = FLAG_SHOOTING if shoot_now else 0
            else:
                angle += rotation_speed
                x = radius * math.cos(angle)
                y = radius * math.sin(angle)
                flags = FLAG_SHOOTING if (tick % shoot_freq == 0) else 0

            pkt = pack_node_packet(0x0001, seq=seq, x=x, y=y, angle=angle, flags=flags)
            sock.sendto(pkt, server_addr)

            if tick % TICK_HZ == 0:
                print(f"{tag} tick={tick:4d} seq={seq:5d} "
                      f"pos=({x:7.2f},{y:7.2f}) angle={angle:7.3f} flags={flags} mode={normalized_mode}")

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
        if manual_controller:
            manual_controller.disable()
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
    parser.add_argument("--mode",             choices=["auto", "manual", "scripted"],
                        default="auto")
    args = parser.parse_args()

    if args.mode == "manual" and args.nodes != 1:
        parser.error("--mode manual requires --nodes 1 (one terminal controls one node)")

    if args.mode == "scripted":
        args.mode = "auto"

    print(f"server={args.server_ip}:{args.port}  nodes={args.nodes}  "
          f"redis={args.redis_host}:{args.redis_port}  "
          f"max_ticks={args.max_ticks or 'unlimited'}  "
          f"mode={args.mode}")

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
                mode        = args.mode,
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
