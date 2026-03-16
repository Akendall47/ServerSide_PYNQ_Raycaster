#!/usr/bin/env python3
# test_package_v4.py — PYNQ board client, derived from test_package_basic.py
#
# Adds over basic:
#   - Sprite BRAM: remote entities (other players/ghosts) + collectible bits
#   - Auto mode: server-driven steering — position comes from server in auto,
#     local buttons own position in manual. No fighting, no blending.
#   - Anticheat-aware: FLAG_TAGGED triggers a spawn snap; FLAG_MATCH_END halts
#     movement and sends heartbeats until next match.
#   - PKT_BITS_INIT handled: bit positions cached, bitmask updated each tick.
#   - PKT_NODE_MODE honoured: server can switch manual ↔ auto at runtime.
#
# Design principle: manual mode = 100% local authority.
#                   auto mode   = 100% server authority on position/angle.
#                   Both modes  = local collision + BRAM writes every tick.
#
# Hardware note (design_1_wrapper.bit / design_1.hwh):
#   ray_caster_0 uses COORD_FRAC_BITS=16 (Q6.16 fixed-point) and has both
#   v_sprite_* and v_r_sprite_* port groups, confirming at least two sprite
#   slots are active in the raycaster pipeline. All MAX_ENTITIES slots (up to 4)
#   are written to BRAM; the hardware renders as many as its pipeline supports.
#   axi_gpio_0 is 4-bit wide (C_GPIO_WIDTH=4), matching BTN_LEFT/RIGHT/FWD/BACK.
#
# Copy to board:
#   scp jupyter_side/test_package_v4.py pynq_full/interfacing/protocol.py \
#       xilinx@<PYNQ_IP>:/home/xilinx/jupyter_notebooks/Final_project_test/
#
# Run:
#   python3 test_package_v4.py [--mode auto] [--username NAME] [--no-hw]

import argparse
import errno
import math
import os
import socket
import struct
import time

try:
    from pynq import Overlay
    from pynq.ps import Clocks
except ImportError:
    Overlay = None
    Clocks = None

import protocol

# ── config ────────────────────────────────────────────────────────────────────
SERVER_IP    = "3.9.71.204"
SERVER_PORT  = 9000
OVERLAY_PATH = "/home/xilinx/jupyter_notebooks/Final_project_test/design_1_wrapper.bit"
CLOCK_MHZ    = 50.0
TICK_RATE    = 50        # Hz — main loop rate
SEND_RATE    = 40        # Hz — state update rate to server
REGISTER_RETRY_S = 2.0
SERVER_SILENCE_S = 5.0
LOG_PERIOD_S     = 1.0

# ── BRAM memory map ───────────────────────────────────────────────────────────
# Words 0–31   : map rows (one 32-bit word per row, bit N = tile N)
# Word  32     : player position  (x[31:16] | y[15:0])  Q6.10 fixed-point
# Word  33     : player angle     (12-bit raw angle)
# Word  34     : sprite 0 xy position   (x[31:16] | y[15:0])  — hardcoded by HDL
# Word  35     : sprite 0 metadata      valid[31] | id[30:24] | flags[23:16] | angle[11:0]
# Word  36     : sprite 1 xy position   (v_r_sprite_* pipeline, second slot)
# Word  37     : sprite 1 metadata
# ... (further slots may be read if HDL supports them)
MAP_ROWS = MAP_COLS = 32
PLAYER_POS_OFFSET     = 32 * 4
PLAYER_ANGLE_OFFSET   = 33 * 4
ENTITY_BASE_OFFSET    = 34 * 4   # HDL reads sprite xy directly from word 34 — no count word
ENTITY_STRIDE         = 2          # words per entity slot (xy + meta)
MAX_ENTITIES          = 4
BITS_COUNT_OFFSET     = (34 + ENTITY_STRIDE * MAX_ENTITIES) * 4
BITS_MASK_OFFSET      = BITS_COUNT_OFFSET + 4
BITS_BASE_OFFSET      = BITS_MASK_OFFSET  + 4
MAX_BITS              = 16
COORD_FRAC_BITS       = 10
ANGLE_STEPS           = 1 << 12
ANGLE_MASK            = ANGLE_STEPS - 1

# ── movement config ───────────────────────────────────────────────────────────
MOVE_SPEED   = 0.25    # world units per tick at 50 Hz, manual
TURN_STEP    = 26      # angle units per tick at 50 Hz, manual
COLLISION_R  = 2.0
AUTO_SPEED   = 0.10    # world units per tick for auto steering
AUTO_TURN    = 80      # angle units per tick for auto steering
BTN_RIGHT    = 1 << 0  # axi_gpio_0 C_GPIO_WIDTH=4 → 4-bit button input
BTN_BACK     = 1 << 1
BTN_FWD      = 1 << 2
BTN_LEFT     = 1 << 3

# ── sprite slot config ─────────────────────────────────────────────────────────
# design_1_wrapper.bit exposes v_sprite_* (slot 0) and v_r_sprite_* (slot 1)
# ports in ray_caster_0, confirming at least 2 sprite slots are rendered.
# All MAX_ENTITIES slots are staged in BRAM; hardware renders up to HW_SPRITE_SLOTS.
HW_SPRITE_SLOTS = 2   # confirmed active in current bitstream (v_sprite + v_r_sprite)

# ── hw stubs ──────────────────────────────────────────────────────────────────
class _NullBram:
    def write(self, offset, value): pass

class _NullButtons:
    def read(self): return 0

# ── hw helpers ────────────────────────────────────────────────────────────────
def _load_overlay(path):
    if Overlay is None:
        raise SystemExit("pynq package not found — use --no-hw for PC testing")
    overlay = Overlay(path)
    bram    = overlay.axi_bram_ctrl_0
    buttons = overlay.axi_gpio_0.channel1
    Clocks.fclk0_mhz = CLOCK_MHZ
    time.sleep(0.1)
    print(f"[HW] overlay ready, fclk0={CLOCK_MHZ:.0f}MHz")
    return overlay, bram, buttons

def _q6_10(v, tile_scale, dim):
    raw = int(round(((v / tile_scale) + dim / 2.0) * (1 << COORD_FRAC_BITS)))
    return max(0, min((dim << COORD_FRAC_BITS) - 1, raw))

def _hw_angle(a):
    return int(round((a % (2 * math.pi)) * ANGLE_STEPS / (2 * math.pi))) & ANGLE_MASK

def _xy_word(x, y, ts, w, h):
    return ((_q6_10(x, ts, w) & 0xFFFF) << 16) | (_q6_10(y, ts, h) & 0xFFFF)

# ── BRAM writes ───────────────────────────────────────────────────────────────
def _write_map(bram, tiles, w, h):
    for row in range(h):
        word = 0
        for col in range(w):
            if tiles[row * w + col]:
                word |= 1 << (w - 1 - col)
        bram.write(row * 4, word & 0xFFFFFFFF)
    print(f"[HW] map written ({w}x{h})")

def _write_pose(bram, state):
    ts = state["tile_scale"]
    w, h = state["map_w"], state["map_h"]
    bram.write(PLAYER_POS_OFFSET,   _xy_word(state["x"], state["y"], ts, w, h))
    bram.write(PLAYER_ANGLE_OFFSET, state["angle_raw"] & ANGLE_MASK)

def _write_sprites(bram, state):
    """Write remote entities and bit markers to BRAM sprite region.

    Entity slot layout (2 words per slot, starting at ENTITY_BASE_OFFSET):
      Word+0: xy position  — x_q6_10[31:16] | y_q6_10[15:0]
      Word+1: metadata     — valid[31] | entity_id[30:24] | flags[23:16] | angle_raw[11:0]

    Ghosts (FLAG_GHOST in flags byte) are included as normal remote entities.
    Hardware renders up to HW_SPRITE_SLOTS (2 confirmed active in current bitstream);
    remaining slots are staged in BRAM for future hardware upgrades.
    """
    ts = state["tile_scale"]
    w, h = state["map_w"], state["map_h"]
    pid = state["player_id"]

    # Remote entities: all players except self and unregistered (id=0).
    # Ghosts (id >= 3, FLAG_GHOST set) are included — they appear as regular sprites.
    # Human opponent first (lowest id), then ghosts — slot 0 = most important target.
    humans  = sorted(
        [p for p in state["players"] if p["player_id"] not in (0, pid) and not (int(p["flags"]) & protocol.FLAG_GHOST)],
        key=lambda p: p["player_id"],
    )
    ghosts  = sorted(
        [p for p in state["players"] if p["player_id"] not in (0, pid) and (int(p["flags"]) & protocol.FLAG_GHOST)],
        key=lambda p: p["player_id"],
    )
    entities = (humans + ghosts)[:MAX_ENTITIES]

    # No count word — HDL reads sprite xy directly from ENTITY_BASE_OFFSET (word 34).
    for slot in range(MAX_ENTITIES):
        base = ENTITY_BASE_OFFSET + slot * ENTITY_STRIDE * 4
        if slot < len(entities):
            e = entities[slot]
            angle_raw = _hw_angle(float(e["angle"]))
            eid   = int(e["player_id"]) & 0x7F
            flags = int(e["flags"])     & 0xFF
            meta  = (1 << 31) | (eid << 24) | (flags << 16) | (angle_raw & 0x0FFF)
            bram.write(base,     _xy_word(float(e["x"]), float(e["y"]), ts, w, h))
            bram.write(base + 4, meta)
        else:
            bram.write(base,     0)
            bram.write(base + 4, 0)

    # collectible bits
    bits      = state["bits"]          # list of (x,y) or None, indexed by bit_id
    bits_mask = state["bits_mask"]
    count     = min(len(bits), MAX_BITS)
    bram.write(BITS_COUNT_OFFSET, count & 0xFFFFFFFF)
    bram.write(BITS_MASK_OFFSET,  bits_mask & 0xFFFF)
    for slot in range(MAX_BITS):
        offset = BITS_BASE_OFFSET + slot * 4
        if slot < count and bits[slot] is not None:
            bx, by = bits[slot]
            bram.write(offset, _xy_word(float(bx), float(by), ts, w, h))
        else:
            bram.write(offset, 0)

# ── collision ─────────────────────────────────────────────────────────────────
def _walkable(state, x, y):
    tiles = state["tiles"]
    w, h, s = state["map_w"], state["map_h"], state["tile_scale"]
    if not tiles or w <= 0 or h <= 0:
        return True
    for dx, dy in [(0,0),(COLLISION_R,0),(-COLLISION_R,0),(0,COLLISION_R),(0,-COLLISION_R)]:
        col = int(math.floor((x + dx) / s + w / 2.0))
        row = int(math.floor((y + dy) / s + h / 2.0))
        if not (0 <= col < w and 0 <= row < h):
            return False
        if tiles[row * w + col]:
            return False
    return True

def _resolve_move(state, nx, ny):
    if _walkable(state, nx, ny):          return nx, ny
    if _walkable(state, nx, state["y"]):  return nx, state["y"]
    if _walkable(state, state["x"], ny):  return state["x"], ny
    return state["x"], state["y"]

# ── fallback map ──────────────────────────────────────────────────────────────
def _fallback_map():
    tiles = bytearray(MAP_ROWS * MAP_COLS)
    for c in range(MAP_COLS):
        tiles[c] = tiles[(MAP_ROWS-1)*MAP_COLS+c] = 1
    for r in range(MAP_ROWS):
        tiles[r*MAP_COLS] = tiles[r*MAP_COLS+MAP_COLS-1] = 1
    return tiles

# ── network helpers ───────────────────────────────────────────────────────────
def _send(sock, pkt, addr):
    try:
        sock.sendto(pkt, addr)
        return True
    except OSError as e:
        if e.errno not in {errno.EAGAIN, errno.EWOULDBLOCK, errno.ENOBUFS}:
            raise
        return False

def _send_register(sock, addr, state):
    pkt = protocol.pack_register_packet(
        seq=state["seq"], x=state["x"], y=state["y"], angle=state["angle"],
        preferred_role=state["preferred_role"], username=state["username"],
        movement_mode=protocol.MOVEMENT_MODE_POSE,
    )
    if _send(sock, pkt, addr):
        print(f"[TX] REGISTER seq={state['seq']} username={state['username'] or '<none>'}")
        state["seq"]        = (state["seq"] + 1) & 0xFFFF
        state["last_reg_tx"] = time.monotonic()

def _send_state(sock, addr, state):
    ptype = protocol.PKT_HEARTBEAT if state["match_ended"] else protocol.PKT_STATE_UPDATE
    pkt = protocol.pack_node_packet(
        pkt_type=ptype, seq=state["seq"],
        x=state["x"], y=state["y"], angle=state["angle"],
        flags=state["input_flags"], movement_mode=protocol.MOVEMENT_MODE_POSE,
    )
    if _send(sock, pkt, addr):
        state["seq"]           = (state["seq"] + 1) & 0xFFFF
        state["last_state_tx"] = time.monotonic()
        state["input_flags"]   = 0   # consume shoot flag after sending

# ── packet handling ───────────────────────────────────────────────────────────
def _handle(data, state, bram):
    if len(data) < protocol.HEADER_SIZE:
        return
    pkt_type, seq, ts = protocol.unpack_header(data)
    state["last_rx"] = time.monotonic()

    if pkt_type == protocol.PKT_ACK:
        if len(data) < protocol.HEADER_SIZE + 1:
            return
        pid = struct.unpack_from("<B", data, protocol.HEADER_SIZE)[0]
        changed = pid != state["player_id"]
        state["registered"]  = True
        state["player_id"]   = pid
        state["match_ended"] = False
        state["bits"]        = []
        state["bits_mask"]   = 0
        state["players"]     = []
        state["input_flags"] = 0
        # hard snap to origin on (re)registration
        state["x"] = state["y"] = 0.0
        state["angle"] = 0.0; state["angle_raw"] = 0
        _write_pose(bram, state)
        _write_sprites(bram, state)
        role = {0:"LOBBY",1:"RUNNER",2:"TAGGER"}.get(pid, f"P{pid}")
        if changed:
            print(f"[ACK] player_id={pid} role={role} mode={state['mode']} ts={ts}")
        else:
            print(f"[ACK] re-ack player_id={pid} role={role} mode={state['mode']}")

    elif pkt_type == protocol.PKT_MAP:
        w, h, tile_scale, tiles = protocol.unpack_map_packet(data)
        state["map_w"] = w; state["map_h"] = h
        state["tile_scale"] = tile_scale
        state["tiles"]      = tiles
        state["match_ended"] = False
        state["bits"]        = []
        state["bits_mask"]   = 0
        _write_map(bram, tiles, w, h)
        if not _walkable(state, state["x"], state["y"]):
            state["x"] = state["y"] = 0.0
            state["angle"] = 0.0; state["angle_raw"] = 0
            print("[HW] snapped to origin — inside wall after map change")
        _write_pose(bram, state)
        _write_sprites(bram, state)

    elif pkt_type == protocol.PKT_BITS_INIT:
        raw_bits = protocol.unpack_bits_init_packet(data)
        if raw_bits:
            max_id = max(b[0] for b in raw_bits)
            bits = [None] * (max_id + 1)
            for bit_id, bx, by in raw_bits:
                bits[bit_id] = (bx, by)
            state["bits"] = bits
        else:
            state["bits"] = []
        state["bits_mask"] = 0xFFFF
        state["sprites_dirty"] = True
        print(f"[BITS_INIT] count={len(raw_bits)}")

    elif pkt_type == protocol.PKT_NODE_MODE:
        mode_byte = protocol.unpack_node_mode_packet(data)
        new_mode  = "auto" if mode_byte == protocol.NODE_CONTROL_MODE_AUTO else "manual"
        if new_mode != state["mode"]:
            print(f"[CTRL] mode {state['mode']} -> {new_mode} (server request)")
            state["mode"] = new_mode
        else:
            print(f"[CTRL] mode confirmed: {state['mode']}")

    elif pkt_type == protocol.PKT_GAME_STATE:
        _, rx_seq, rx_ts, game_mode, players, bits_mask = protocol.unpack_server_packet(data)
        state["game_mode"]  = game_mode
        state["bits_mask"]  = bits_mask
        state["players"]    = players
        state["sprites_dirty"] = True  # entity positions + bits_mask changed

        # anticheat: detect FLAG_TAGGED on self → server will move us to spawn
        # trust that snap; do not fight it.
        for p in players:
            if p["player_id"] != state["player_id"]:
                continue
            was_ended = state["match_ended"]
            state["match_ended"] = bool(p["flags"] & protocol.FLAG_MATCH_END)
            if state["match_ended"] and not was_ended:
                print("[MATCH_END] halting movement")
            elif was_ended and not state["match_ended"]:
                # Match restarted mid-session (replay) — re-enable movement
                print("[MATCH_RESET] movement re-enabled for new match")
            if p["flags"] & protocol.FLAG_TAGGED:
                # Server has authority on tagged position — accept regardless of mode
                state["x"]         = float(p["x"])
                state["y"]         = float(p["y"])
                state["angle"]     = float(p["angle"])
                state["angle_raw"] = _hw_angle(state["angle"])
                print(f"[TAGGED] snapped to spawn ({state['x']:.1f},{state['y']:.1f})")
            elif state["mode"] == "auto":
                # Auto mode: accept server position every tick (server is authoritative)
                state["x"]         = float(p["x"])
                state["y"]         = float(p["y"])
                state["angle"]     = float(p["angle"])
                state["angle_raw"] = _hw_angle(state["angle"])
            break

        now = time.monotonic()
        if now - state["last_log"] >= LOG_PERIOD_S:
            print(f"[STATE] tick={rx_seq} mode={state['mode']} players={len(players)} "
                  f"self_id={state['player_id']} "
                  f"pose=({state['x']:.2f},{state['y']:.2f},{math.degrees(state['angle']):.0f}°)")
            state["last_log"] = now

def _drain(sock, state, bram):
    while True:
        try:
            data, _ = sock.recvfrom(4096)
            _handle(data, state, bram)
        except BlockingIOError:
            return
        except Exception as e:
            print(f"[RX_ERR] {e}")

# ── manual input ──────────────────────────────────────────────────────────────
def _apply_manual_input(state, buttons):
    """Buttons own angle and position entirely — server never overrides this."""
    raw = buttons.read() & 0xF
    if raw & BTN_LEFT:
        state["angle_raw"] = (state["angle_raw"] + state["turn_step"]) % ANGLE_STEPS
    if raw & BTN_RIGHT:
        state["angle_raw"] = (state["angle_raw"] - state["turn_step"]) % ANGLE_STEPS
    state["angle"] = (state["angle_raw"] * 2.0 * math.pi / ANGLE_STEPS) % (2.0 * math.pi)

    move = 0.0
    if raw & BTN_FWD:  move += state["move_speed"]
    if raw & BTN_BACK: move -= state["move_speed"]
    if move:
        nx = state["x"] + move * math.cos(state["angle"])
        ny = state["y"] + move * math.sin(state["angle"])
        state["x"], state["y"] = _resolve_move(state, nx, ny)

# ── auto steering ─────────────────────────────────────────────────────────────
def _wrap(a):
    """Wrap angle to [-pi, pi]."""
    return (a + math.pi) % (2 * math.pi) - math.pi

def _apply_auto_input(state):
    """
    In auto mode the server sends us our own position each tick (accepted in
    _handle above). This function just computes the shoot flag if we are the
    tagger and the runner is in range/arc. Position steering is server-driven.
    """
    state["input_flags"] = 0
    if state["match_ended"] or state["player_id"] not in (1, 2):
        return

    pid = state["player_id"]
    players = state["players"]

    if pid == 2:   # TAGGER — shoot if runner is in arc
        runner = next((p for p in players if p["player_id"] == 1), None)
        if runner:
            dx = float(runner["x"]) - state["x"]
            dy = float(runner["y"]) - state["y"]
            dist = math.hypot(dx, dy)
            if dist < 30.0:
                desired = math.atan2(dy, dx)
                arc_err = abs(_wrap(desired - state["angle"]))
                if arc_err < 0.5:
                    state["input_flags"] = protocol.FLAG_INPUT_SHOOT

# ── main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="PYNQ board client v4")
    parser.add_argument("--server",         default=SERVER_IP)
    parser.add_argument("--port",           type=int, default=SERVER_PORT)
    parser.add_argument("--overlay",        default=OVERLAY_PATH)
    parser.add_argument("--username",       default=os.environ.get("PYNQ_USERNAME", ""))
    parser.add_argument("--mode",           choices=["manual","auto"],
                        default=os.environ.get("PYNQ_MODE", "manual"),
                        help="Initial mode; server can override via PKT_NODE_MODE")
    parser.add_argument("--role",           choices=["any","runner","tagger"], default="any")
    parser.add_argument("--tick-rate",      type=int, default=TICK_RATE)
    parser.add_argument("--send-rate",      type=int, default=SEND_RATE)
    parser.add_argument("--move-speed",     type=float, default=None)
    parser.add_argument("--turn-step",      type=int,   default=None)
    parser.add_argument("--no-hw",          action="store_true")
    args = parser.parse_args()

    role_map = {"any": protocol.ROLE_ANY, "runner": protocol.ROLE_RUNNER,
                "tagger": protocol.ROLE_TAGGER}

    tick_rate     = max(1, args.tick_rate)
    tick_interval = 1.0 / tick_rate
    send_interval = 1.0 / max(1, args.send_rate)
    # scale movement defaults if tick rate differs from 50 Hz baseline
    scale = 50.0 / tick_rate
    move_speed = args.move_speed if args.move_speed is not None else MOVE_SPEED * scale
    turn_step  = args.turn_step  if args.turn_step  is not None else max(1, int(round(TURN_STEP * scale)))

    print(f"[NET] target {args.server}:{args.port}")
    print(f"[CFG] username={args.username or '<none>'} mode={args.mode} role={args.role} "
          f"tick={tick_rate}Hz send={args.send_rate}Hz "
          f"move={move_speed:.3f} turn={turn_step}")

    if args.no_hw:
        print("[HW] --no-hw: null stubs")
        bram, buttons = _NullBram(), _NullButtons()
    else:
        _, bram, buttons = _load_overlay(args.overlay)

    tiles = _fallback_map()
    _write_map(bram, tiles, MAP_COLS, MAP_ROWS)

    state = {
        "username":       args.username,
        "mode":           args.mode,
        "preferred_role": role_map[args.role],
        "registered":     False,
        "player_id":      None,
        "seq":            0,
        "x": 0.0, "y": 0.0,
        "angle": 0.0, "angle_raw": 0,
        "input_flags":    0,
        "match_ended":    False,
        "game_mode":      protocol.GAME_MODE_CHASE,
        "map_w": MAP_COLS, "map_h": MAP_ROWS,
        "tile_scale":     8,
        "tiles":          tiles,
        "players":        [],
        "bits":           [],
        "bits_mask":      0,
        "move_speed":     move_speed,
        "turn_step":      turn_step,
        "last_rx":        None,
        "last_reg_tx":    0.0,
        "last_state_tx":  0.0,
        "last_log":       0.0,
        "sprites_dirty":  True,  # flush once at startup, then on PKT_GAME_STATE / PKT_BITS_INIT
    }

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 262144)
    sock.setblocking(False)
    addr = (args.server, args.port)

    next_tick = time.monotonic()

    try:
        while True:
            next_tick += tick_interval
            now = time.monotonic()

            _drain(sock, state, bram)

            # silence timeout
            if state["registered"] and state["last_rx"] and \
                    now - state["last_rx"] > SERVER_SILENCE_S:
                print("[NET] server silent — re-registering")
                state["registered"]    = False
                state["player_id"]     = None
                state["players"]       = []
                state["sprites_dirty"] = True

            if state["match_ended"]:
                # halted — just keep the BRAM current and send heartbeats
                _write_pose(bram, state)
            elif state["mode"] == "auto":
                _apply_auto_input(state)
                # position already updated by server in _handle — just write it
                _write_pose(bram, state)
            else:
                _apply_manual_input(state, buttons)
                _write_pose(bram, state)

            # sprite BRAM — write only when something changed (dirty flag set in _handle).
            # PKT_GAME_STATE and PKT_BITS_INIT both set sprites_dirty; ACK/MAP flush inline.
            if state["sprites_dirty"]:
                _write_sprites(bram, state)
                state["sprites_dirty"] = False

            if not state["registered"]:
                if now - state["last_reg_tx"] >= REGISTER_RETRY_S:
                    _send_register(sock, addr, state)
            else:
                if now - state["last_state_tx"] >= send_interval:
                    _send_state(sock, addr, state)

            sleep = next_tick - time.monotonic()
            if sleep > 0:
                time.sleep(sleep)
            elif sleep < -tick_interval:
                next_tick = time.monotonic()  # fell behind — reset

    except KeyboardInterrupt:
        print("\n[NET] stopped")
    finally:
        sock.close()

if __name__ == "__main__":
    main()
