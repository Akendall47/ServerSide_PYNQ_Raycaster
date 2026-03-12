#!/usr/bin/env python3
"""
Server latency + network analytics for the PYNQ Raycaster.

Two sections:
  1. Server (always runs) — in-process e2e tick benchmark: packet-in → drain
     → core logic → broadcast-out. Measures budget headroom and jitter.
  2. Network (auto-detected) — live UDP RTT probe + Redis tunnel RTT.
     Only runs when pynq_dev.sh is active (EC2 UDP reachable / Redis tunnel up).

Run standalone:  python3 tests/test_server_latency.py
Run via pytest:  pytest tests/test_server_latency.py
"""

import asyncio
import copy
import importlib
import os
import queue
import socket
import sys
import time
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

ROOT             = Path(__file__).resolve().parents[1]
PYNQ_EC2         = ROOT / "pynq_full" / "ec2"
PYNQ_SERVER      = PYNQ_EC2 / "server"
PYNQ_INTERFACING = ROOT / "pynq_full" / "interfacing"
CHASE_MAP_PATH   = PYNQ_EC2 / "maps" / "chase.txt"

TICK_BUDGET_MS      = 50.0   # 20 Hz authoritative loop
EC2_IP              = "18.175.238.148"
EC2_UDP_PORT        = 9000
REDIS_TUNNEL_HOST   = "localhost"
REDIS_TUNNEL_PORT   = 6380
RTT_ITERATIONS      = 60
RTT_SEND_INTERVAL_S = 0.055
REDIS_ITERATIONS    = 40


# ── Import helpers ─────────────────────────────────────────────────────────────

@contextmanager
def pynq_server_import_context():
    original_path = list(sys.path)
    sys.path[:0] = [str(PYNQ_INTERFACING), str(PYNQ_SERVER), str(PYNQ_EC2)]
    _purge = {"protocol", "t2_constants", "t2_map_loader", "t2_packet_handler", "t2_redis_io"}
    for name in list(sys.modules):
        if name in _purge or name.startswith("game_logic"):
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name in _purge or name.startswith("game_logic"):
                sys.modules.pop(name, None)


def _load_protocol():
    with pynq_server_import_context():
        return importlib.import_module("protocol")


# ── Stats dataclasses ──────────────────────────────────────────────────────────

@dataclass
class BenchmarkStats:
    name: str
    iterations: int
    samples_ms: tuple
    avg_ms: float
    p50_ms: float
    p95_ms: float
    max_ms: float


@dataclass
class NetStats:
    name: str
    samples_ms: tuple
    avg_ms: float
    p50_ms: float
    p95_ms: float
    max_ms: float
    loss_pct: float = 0.0
    rate_hz: float  = 0.0


@dataclass
class TickReport:
    e2e: BenchmarkStats
    tick_budget_ms: float
    packets_per_tick: int


@dataclass
class FullReport:
    tick: TickReport
    stack: dict
    rtt: Optional[NetStats] = None
    redis: Optional[NetStats] = None


# ── Stats helpers ──────────────────────────────────────────────────────────────

def _pct(samples, p):
    s = sorted(samples)
    return s[max(0, min(len(s) - 1, int(len(s) * p) - 1))]


def _summarise(name, samples_ms) -> BenchmarkStats:
    t = tuple(samples_ms)
    return BenchmarkStats(name=name, iterations=len(t), samples_ms=t,
                          avg_ms=sum(t)/len(t), p50_ms=_pct(t, 0.5),
                          p95_ms=_pct(t, 0.95), max_ms=max(t))


def _summarise_net(name, samples_ms, loss_pct=0.0, rate_hz=0.0) -> NetStats:
    t = tuple(samples_ms)
    return NetStats(name=name, samples_ms=t, avg_ms=sum(t)/len(t),
                    p50_ms=_pct(t, 0.5), p95_ms=_pct(t, 0.95), max_ms=max(t),
                    loss_pct=loss_pct, rate_hz=rate_hz)


def _print_stats(stats):
    print(f"{stats.name:<24} avg={stats.avg_ms:7.3f} ms  "
          f"p50={stats.p50_ms:7.3f} ms  p95={stats.p95_ms:7.3f} ms  "
          f"max={stats.max_ms:7.3f} ms  iters={stats.iterations}")


# ── In-process server benchmark ────────────────────────────────────────────────

class _NullUDPTransport:
    def sendto(self, data, addr): pass


async def _async_noop(event=None): pass


def _load_modules():
    with pynq_server_import_context():
        return {
            "protocol":      importlib.import_module("protocol"),
            "map_loader":    importlib.import_module("t2_map_loader"),
            "packet_handler":importlib.import_module("t2_packet_handler"),
            "redis_io":      importlib.import_module("t2_redis_io"),
            "match_state":   importlib.import_module("game_logic.match_state"),
            "core_logic":    importlib.import_module("game_logic.core_logic"),
        }


def _seed_state(mods, map_state, *, include_ghosts=True):
    protocol = mods["protocol"]
    state = mods["match_state"].MatchState()
    state.set_spawn_positions(map_state.get("spawn_positions", []))
    state.match_started = True
    state.match_tick = 24
    state.game_mode = protocol.GAME_MODE_CHASE_BITS
    state.bits = [[-40.0, -40.0, True], [40.0, 40.0, True], [0.0, 56.0, True]]
    state.bits_mask = 0x0007
    state.players = {
        ("runner", 1): {"player_id": 1, "x": -56.0, "y": -56.0, "angle": 0.0,
                        "flags": 0, "last_seen": 0.0, "last_seq": 100,
                        "movement_mode": protocol.MOVEMENT_MODE_POSE,
                        "protocol_version": protocol.NODE_PROTOCOL_VERSION, "timed_out": False},
        ("tagger", 2): {"player_id": 2, "x": 56.0,  "y": 56.0,  "angle": 3.14159,
                        "flags": 0, "last_seen": 0.0, "last_seq": 100,
                        "movement_mode": protocol.MOVEMENT_MODE_POSE,
                        "protocol_version": protocol.NODE_PROTOCOL_VERSION, "timed_out": False},
    }
    if include_ghosts:
        for gkey, gid, gx, gy, ga in [("ghost:1", 3, -56.0, 56.0, 1.5708),
                                        ("ghost:2", 4, 56.0, -56.0, -1.5708)]:
            state.players[gkey] = {"player_id": gid, "x": gx, "y": gy, "angle": ga,
                                   "flags": protocol.FLAG_GHOST, "last_seen": 0.0,
                                   "last_seq": None, "movement_mode": 0,
                                   "protocol_version": protocol.NODE_PROTOCOL_VERSION,
                                   "timed_out": False}
    return state


def _queue_state_updates(mods, state, packet_queue, packets_per_tick):
    protocol = mods["protocol"]
    tracking = {addr: {"x": p["x"], "y": p["y"], "angle": p["angle"], "seq": p["last_seq"]}
                for addr, p in state.players.items() if not str(addr).startswith("ghost:")}
    human_addrs = list(tracking.keys())
    for index in range(packets_per_tick):
        addr = human_addrs[index % len(human_addrs)]
        t = tracking[addr]
        t["seq"] += 1
        t["angle"] += 0.01 if addr == ("runner", 1) else -0.01
        t["x"] += 1.0 if addr == ("runner", 1) else -1.0
        packet_queue.put_nowait({"data": protocol.pack_node_packet(
            protocol.PKT_STATE_UPDATE, t["seq"], t["x"], t["y"], t["angle"],
            movement_mode=protocol.MOVEMENT_MODE_POSE), "addr": addr})


async def _benchmark_e2e_tick(mods, base_map_state, iterations=120, packets_per_tick=4):
    samples_ms = []
    for tick_count in range(iterations):
        map_state = copy.deepcopy(base_map_state)
        state = _seed_state(mods, map_state)
        pq = asyncio.Queue()
        bq = asyncio.Queue()
        wq = queue.SimpleQueue()
        _queue_state_updates(mods, state, pq, packets_per_tick)
        handler = mods["packet_handler"].PacketHandler(
            state, pq, wq, udp_transport=_NullUDPTransport(), map_state=map_state,
            on_match_start=lambda: None, on_match_abort=lambda event=None: None,
            on_match_pause=lambda event=None: None, on_match_resume=lambda event=None: None,
            on_event=lambda event=None: None)
        logic = mods["core_logic"].CoreLogic(
            state, wq, on_event=_async_noop, on_force_end_consumed=lambda: None,
            map_state=map_state)
        redis_io = mods["redis_io"].RedisIO(state, map_state, bq, wq)
        start_ns = time.perf_counter_ns()
        await handler.drain()
        await logic.tick()
        await redis_io.push_broadcast(tick_count)
        redis_io.push_redis_writes(tick_count, state.match_tick)
        samples_ms.append((time.perf_counter_ns() - start_ns) / 1_000_000.0)
    return _summarise("e2e_tick_latency", samples_ms)


def _run_server_benchmark() -> TickReport:
    PACKETS_PER_TICK = 4
    mods = _load_modules()
    base_map_state = mods["map_loader"].load_map(str(CHASE_MAP_PATH))
    e2e = asyncio.run(_benchmark_e2e_tick(mods, base_map_state, packets_per_tick=PACKETS_PER_TICK))
    return TickReport(e2e=e2e, tick_budget_ms=TICK_BUDGET_MS, packets_per_tick=PACKETS_PER_TICK)


# ── Network detection + probes ─────────────────────────────────────────────────

def _detect_stack() -> dict:
    def _tcp_up(host, port):
        try:
            socket.create_connection((host, port), timeout=1.0).close()
            return True
        except OSError:
            return False

    def _udp_up(host, port):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.settimeout(1.5)
            s.connect((host, port))
            s.send(b"\x00" * 4)
            try: s.recv(64)
            except socket.timeout: pass
            s.close()
            return True
        except OSError:
            return False

    redis_up = _tcp_up(REDIS_TUNNEL_HOST, REDIS_TUNNEL_PORT)
    udp_up   = _udp_up(EC2_IP, EC2_UDP_PORT)
    return {"redis_tunnel": redis_up, "ec2_udp": udp_up, "live": udp_up}


class _RTTProtocol(asyncio.DatagramProtocol):
    def __init__(self, proto):
        self.transport = None
        self._proto = proto
        self._pending: dict = {}
        self.rtt_samples_ms: list = []
        self.broadcast_gaps_s: list = []
        self._last_ns: Optional[int] = None

    def connection_made(self, transport):
        self.transport = transport

    def datagram_received(self, data, addr):
        recv_ns = time.perf_counter_ns()
        if len(data) < self._proto.HEADER_SIZE:
            return
        pkt_type, seq, _ = self._proto.unpack_header(data)
        if pkt_type == self._proto.PKT_GAME_STATE:
            if seq in self._pending:
                self.rtt_samples_ms.append((recv_ns - self._pending.pop(seq)) / 1e6)
            if self._last_ns is not None:
                gap = (recv_ns - self._last_ns) / 1e9
                if 0.01 < gap < 1.0:
                    self.broadcast_gaps_s.append(gap)
            self._last_ns = recv_ns

    def error_received(self, exc): pass


async def _run_rtt_probe() -> Optional[NetStats]:
    proto = _load_protocol()
    loop  = asyncio.get_running_loop()
    handler = _RTTProtocol(proto)
    try:
        transport, _ = await loop.create_datagram_endpoint(
            lambda: handler, remote_addr=(EC2_IP, EC2_UDP_PORT))
    except OSError:
        return None
    try:
        transport.sendto(proto.pack_node_packet(
            proto.PKT_REGISTER, 0, 0.0, 0.0, 0.0, movement_mode=proto.MOVEMENT_MODE_POSE))
        await asyncio.sleep(3.0)
        sent = 0
        for seq in range(1, RTT_ITERATIONS + 1):
            pkt = proto.pack_node_packet(
                proto.PKT_HEARTBEAT, seq, 0.0, 0.0, 0.0, movement_mode=proto.MOVEMENT_MODE_POSE)
            handler._pending[seq] = time.perf_counter_ns()
            transport.sendto(pkt)
            sent += 1
            await asyncio.sleep(RTT_SEND_INTERVAL_S)
        await asyncio.sleep(0.5)
    finally:
        transport.close()
    samples = handler.rtt_samples_ms
    if not samples:
        return None
    loss_pct = max(0.0, (sent - len(samples)) / max(sent, 1) * 100)
    rate_hz = 0.0
    if handler.broadcast_gaps_s:
        avg_gap = sum(handler.broadcast_gaps_s) / len(handler.broadcast_gaps_s)
        rate_hz = 1.0 / avg_gap if avg_gap > 0 else 0.0
    return _summarise_net("rtt_udp", samples, loss_pct=loss_pct, rate_hz=rate_hz)


def _run_redis_probe() -> Optional[NetStats]:
    samples_ms = []
    try:
        for _ in range(REDIS_ITERATIONS):
            s = socket.create_connection((REDIS_TUNNEL_HOST, REDIS_TUNNEL_PORT), timeout=2.0)
            s.settimeout(2.0)
            start_ns = time.perf_counter_ns()
            s.sendall(b"*1\r\n$4\r\nPING\r\n")
            resp = s.recv(64)
            elapsed_ms = (time.perf_counter_ns() - start_ns) / 1e6
            s.close()
            if resp.startswith(b"+PONG") or resp.startswith(b"$4"):
                samples_ms.append(elapsed_ms)
    except OSError:
        pass
    return _summarise_net("redis_tunnel_rtt", samples_ms) if samples_ms else None


def run_all() -> FullReport:
    print("Running server benchmark...")
    tick = _run_server_benchmark()
    _print_stats(tick.e2e)

    print("\nDetecting live stack...")
    stack = _detect_stack()
    print(f"  Redis tunnel: {'UP' if stack['redis_tunnel'] else 'DOWN'}")
    print(f"  EC2 UDP:      {'UP' if stack['ec2_udp'] else 'DOWN'}")

    report = FullReport(tick=tick, stack=stack)

    if stack["redis_tunnel"]:
        print(f"\nRunning Redis RTT probe ({REDIS_ITERATIONS} pings)...")
        report.redis = _run_redis_probe()
        if report.redis:
            print(f"  avg={report.redis.avg_ms:.1f} ms  p95={report.redis.p95_ms:.1f} ms")

    if stack["ec2_udp"]:
        print(f"\nRunning UDP RTT probe ({RTT_ITERATIONS} packets)...")
        report.rtt = asyncio.run(_run_rtt_probe())
        if report.rtt:
            print(f"  avg={report.rtt.avg_ms:.1f} ms  p95={report.rtt.p95_ms:.1f} ms  "
                  f"loss={report.rtt.loss_pct:.1f}%  server={report.rtt.rate_hz:.1f} Hz")
        else:
            print("  No RTT samples — server may have no active match")
    else:
        print("\nEC2 UDP not reachable — start pynq_dev.sh for live network metrics")

    return report


# ── Popup ──────────────────────────────────────────────────────────────────────

def _show_popup(report: FullReport):
    try:
        import tkinter as tk
    except ImportError:
        print("tkinter not available — install with: sudo apt-get install python3-tk")
        return

    BG      = "#08111f"
    CARD_BG = "#0f1c31"
    FG      = "#e6eef8"
    MUTED   = "#8da1bc"
    GREEN   = "#48c78e"
    AMBER   = "#ffb74d"
    RED     = "#ff6363"
    TRACE   = "#4dd0e1"
    TILE_BG = "#0a1728"
    GRAY    = "#3a4a5a"
    PURPLE  = "#b084ff"

    L, T, RP, BP = 52, 16, 16, 28

    # colour helpers
    def _clr_budget(ratio):
        return RED if ratio > 1.0 else AMBER if ratio > 0.8 else GREEN
    def _clr_rtt(ms):
        return GREEN if ms < 50 else AMBER if ms < 100 else RED
    def _clr_loss(pct):
        return GREEN if pct < 1 else AMBER if pct < 5 else RED
    def _clr_hz(hz):
        return GREEN if hz >= 18 else AMBER if hz >= 15 else RED
    def _clr_redis(ms):
        return GREEN if ms < 60 else AMBER if ms < 120 else RED

    root = tk.Tk()
    root.title("Server Latency & Network Analytics — PYNQ Raycaster")
    root.configure(bg=BG)
    root.attributes("-zoomed", True)
    root.bind("<Escape>", lambda e: root.destroy())

    outer = tk.Frame(root, bg=BG)
    outer.pack(fill="both", expand=True)
    vsb = tk.Scrollbar(outer, orient="vertical")
    vsb.pack(side="right", fill="y")
    cs = tk.Canvas(outer, bg=BG, highlightthickness=0, yscrollcommand=vsb.set)
    cs.pack(side="left", fill="both", expand=True)
    vsb.config(command=cs.yview)
    inner = tk.Frame(cs, bg=BG)
    wid = cs.create_window((0, 0), window=inner, anchor="nw")
    inner.bind("<Configure>", lambda e: cs.configure(scrollregion=cs.bbox("all")))
    cs.bind("<Configure>", lambda e: cs.itemconfig(wid, width=e.width))
    root.bind_all("<MouseWheel>", lambda e: cs.yview_scroll(-1*(e.delta//120), "units"))
    root.bind_all("<Button-4>",   lambda e: cs.yview_scroll(-1, "units"))
    root.bind_all("<Button-5>",   lambda e: cs.yview_scroll(1, "units"))

    def _tile(parent, label, val_str, clr, sub=""):
        f = tk.Frame(parent, bg=TILE_BG)
        f.pack(side="left", padx=8, ipadx=18, ipady=12)
        tk.Label(f, text=label,   bg=TILE_BG, fg=MUTED, font=("Helvetica", 10)).pack()
        tk.Label(f, text=val_str, bg=TILE_BG, fg=clr,   font=("Helvetica", 20, "bold")).pack()
        if sub:
            tk.Label(f, text=sub, bg=TILE_BG, fg=MUTED, font=("Helvetica", 9)).pack()

    def _section_label(text, top_pad=24):
        tk.Label(inner, text=text, bg=BG, fg=FG,
                 font=("Helvetica", 16, "bold")).pack(anchor="w", padx=36, pady=(top_pad, 6))

    def _card_canvas(title, subtitle, chart_h):
        card = tk.Frame(inner, bg=CARD_BG)
        card.pack(fill="x", padx=36, pady=(4, 4), ipadx=16, ipady=10)
        tk.Label(card, text=title, bg=CARD_BG, fg=FG,
                 font=("Helvetica", 13, "bold")).pack(anchor="w", padx=12, pady=(10, 2))
        if subtitle:
            tk.Label(card, text=subtitle, bg=CARD_BG, fg=MUTED,
                     font=("Helvetica", 10)).pack(anchor="w", padx=12, pady=(0, 6))
        cv = tk.Canvas(card, height=chart_h, bg="#09101d", highlightthickness=0)
        cv.pack(fill="x", padx=12, pady=(0, 10))
        return cv

    def _draw_trace(cv, samples, ref_lines, chart_h, color=TRACE):
        def _go(cv=cv, samples=samples, ref_lines=ref_lines):
            cv.update_idletasks()
            w = cv.winfo_width() or 900
            pw, ph = w - L - RP, chart_h - T - BP
            if not samples:
                cv.create_text(w//2, chart_h//2, text="no data", fill=GRAY, font=("Helvetica", 14))
                return
            max_y = max(max(samples), max(v for v, _, _ in ref_lines), 0.001)
            def vy(v): return T + ph - (v / max_y) * ph
            for frac in (0.25, 0.5, 0.75, 1.0):
                gy = vy(max_y * frac)
                cv.create_line(L, gy, L + pw, gy, fill="#1a2d47", width=1)
                cv.create_text(L - 4, gy, text=f"{max_y*frac:.0f}",
                               fill=MUTED, font=("Helvetica", 8), anchor="e")
            used_y: list = []
            for val, clr, lbl in ref_lines:
                y = vy(val)
                cv.create_line(L, y, L + pw, y, fill=clr, dash=(6, 4), width=2)
                label_y = y - 7
                for prev in used_y:
                    if abs(label_y - prev) < 14:
                        label_y = prev + 14
                used_y.append(label_y)
                cv.create_text(L + 6, label_y, text=lbl, fill=clr,
                               font=("Helvetica", 9, "bold"), anchor="w")
            pts = []
            for i, s in enumerate(samples):
                pts += [L + (i / max(1, len(samples)-1)) * pw, vy(s)]
            if len(pts) >= 4:
                cv.create_line(*pts, fill=color, width=1)
            cv.create_line(L, T, L, T + ph, fill="#2a3d5a", width=1)
            cv.create_text(L,      T + ph + 14, text="sample 1",
                           fill=MUTED, font=("Helvetica", 8), anchor="w")
            cv.create_text(L + pw, T + ph + 14, text=f"sample {len(samples)}",
                           fill=MUTED, font=("Helvetica", 8), anchor="e")
        root.after(80, _go)

    def _draw_hist(cv, samples, ref_lines, chart_h, bar_clr_fn=None):
        def _go(cv=cv, samples=samples):
            cv.update_idletasks()
            w = cv.winfo_width() or 900
            pw, ph = w - L - RP, chart_h - T - BP
            if not samples:
                cv.create_text(w//2, chart_h//2, text="no data", fill=GRAY, font=("Helvetica", 14))
                return
            bins = 30
            lo, hi = min(samples), max(samples)
            if hi <= lo:
                return
            step = (hi - lo) / bins
            counts = [0] * bins
            for s in samples:
                counts[min(bins-1, int((s - lo) / step))] += 1
            max_c = max(counts) or 1
            bw = pw / bins
            for i, cnt in enumerate(counts):
                x0 = L + i * bw + 1
                bh = (cnt / max_c) * ph
                mid = lo + (i + 0.5) * step
                clr = bar_clr_fn(mid) if bar_clr_fn else TRACE
                cv.create_rectangle(x0, T + ph - bh, x0 + max(1, bw - 2), T + ph,
                                    fill=clr, outline="")
            for val, clr, lbl in ref_lines:
                if lo < val < hi:
                    rx = L + ((val - lo) / (hi - lo)) * pw
                    cv.create_line(rx, T, rx, T + ph, fill=clr, dash=(5, 3), width=2)
                    cv.create_text(rx + 3, T + 4, text=lbl, fill=clr,
                                   font=("Helvetica", 9), anchor="nw")
            cv.create_text(L,      T + ph + 14, text=f"{lo:.1f} ms",
                           fill=MUTED, font=("Helvetica", 9), anchor="w")
            cv.create_text(L + pw, T + ph + 14, text=f"{hi:.1f} ms",
                           fill=MUTED, font=("Helvetica", 9), anchor="e")
            cv.create_text(L - 4,  T,           text=str(max_c),
                           fill=MUTED, font=("Helvetica", 9), anchor="e")
        root.after(80, _go)

    # ═══════════════════════════════════════════════════════════════════════════
    # SECTION 1 — Server latency
    # ═══════════════════════════════════════════════════════════════════════════
    tk.Label(inner, text="Server Latency & Network Analytics",
             bg=BG, fg=FG, font=("Helvetica", 24, "bold")).pack(anchor="w", padx=36, pady=(28, 2))
    tk.Label(inner,
             text=f"In-process e2e tick benchmark · {report.tick.e2e.iterations} ticks · "
                  f"{report.tick.packets_per_tick} packets/tick · 20 Hz budget = {TICK_BUDGET_MS:.0f} ms",
             bg=BG, fg=MUTED, font=("Helvetica", 11)).pack(anchor="w", padx=36, pady=(0, 16))

    e2e    = report.tick.e2e
    budget = TICK_BUDGET_MS
    headroom_pct = max(0.0, (1.0 - e2e.avg_ms / budget) * 100)
    jitter_ms    = e2e.p95_ms - e2e.p50_ms
    throughput   = report.tick.packets_per_tick / (e2e.avg_ms / 1000.0) if e2e.avg_ms > 0 else 0

    # metric tiles
    tr = tk.Frame(inner, bg=BG)
    tr.pack(fill="x", padx=36, pady=(0, 8))
    _tile(tr, "avg latency",    f"{e2e.avg_ms:.2f} ms",   _clr_budget(e2e.avg_ms/budget), f"budget {budget:.0f} ms")
    _tile(tr, "p50",            f"{e2e.p50_ms:.2f} ms",   _clr_budget(e2e.p50_ms/budget))
    _tile(tr, "p95",            f"{e2e.p95_ms:.2f} ms",   _clr_budget(e2e.p95_ms/budget))
    _tile(tr, "max",            f"{e2e.max_ms:.2f} ms",   _clr_budget(e2e.max_ms/budget))
    _tile(tr, "jitter p95−p50", f"{jitter_ms:.2f} ms",    _clr_budget(jitter_ms/(budget*0.3)), "lower = more consistent")
    _tile(tr, "headroom",       f"{headroom_pct:.1f}%",
          RED if headroom_pct < 20 else AMBER if headroom_pct < 50 else GREEN,
          f"{budget-e2e.avg_ms:.1f} ms free")
    _tile(tr, "throughput",     f"{throughput:.0f} pkt/s", FG, "at avg latency")

    # budget gauge
    GAUGE_H = 36
    gauge_card = tk.Frame(inner, bg=CARD_BG)
    gauge_card.pack(fill="x", padx=36, pady=(6, 4), ipadx=16, ipady=8)
    tk.Label(gauge_card, text="Budget headroom — avg tick cost vs 50 ms tick window",
             bg=CARD_BG, fg=MUTED, font=("Helvetica", 10)).pack(anchor="w", padx=12, pady=(8, 4))
    gauge_cv = tk.Canvas(gauge_card, height=GAUGE_H, bg=TILE_BG, highlightthickness=0)
    gauge_cv.pack(fill="x", padx=12, pady=(0, 8))
    avg_clr = _clr_budget(e2e.avg_ms / budget)

    def _draw_gauge(cv=gauge_cv):
        cv.update_idletasks()
        w = cv.winfo_width() or 800
        fr  = min(e2e.avg_ms / budget, 1.0)
        p95r = min(e2e.p95_ms / budget, 1.0)
        cv.create_rectangle(0, 0, w * p95r, GAUGE_H, fill="#2a3d5a", outline="")
        cv.create_rectangle(0, 0, w * fr,   GAUGE_H, fill=avg_clr,   outline="")
        cv.create_line(w - 2, 0, w - 2, GAUGE_H, fill=RED, width=2)
        cv.create_text(8, GAUGE_H//2, text=f"avg {e2e.avg_ms:.2f} ms",
                       fill=BG if fr > 0.15 else FG, font=("Helvetica", 10, "bold"), anchor="w")
        cv.create_text(w - 6, GAUGE_H//2, text=f"{budget:.0f} ms",
                       fill=RED, font=("Helvetica", 10, "bold"), anchor="e")
        if p95r > fr + 0.05:
            cv.create_text(w * p95r - 4, GAUGE_H//2, text=f"p95 {e2e.p95_ms:.2f}",
                           fill=AMBER, font=("Helvetica", 9), anchor="e")
    root.after(80, _draw_gauge)

    # e2e trace
    e2e_refs = [(budget, RED, f"budget {budget:.0f} ms"),
                (e2e.avg_ms, GREEN, f"avg {e2e.avg_ms:.2f} ms"),
                (e2e.p95_ms, AMBER, f"p95 {e2e.p95_ms:.2f} ms")]
    cv_e2e = _card_canvas("End-to-end tick trace  (packet-in → drain → core logic → broadcast-out)",
                           "cyan = per-tick samples   green = avg   amber = p95   red = budget",
                           chart_h=280)
    _draw_trace(cv_e2e, list(e2e.samples_ms), e2e_refs, 280)

    # latency histogram
    cv_hist = _card_canvas("Latency distribution",
                            "bars coloured by proximity to budget: green = well within · amber = close · red = over",
                            chart_h=200)
    _draw_hist(cv_hist, list(e2e.samples_ms), e2e_refs, 200,
               bar_clr_fn=lambda ms: _clr_budget(ms / budget))

    # ═══════════════════════════════════════════════════════════════════════════
    # SECTION 2 — Network (live or placeholder)
    # ═══════════════════════════════════════════════════════════════════════════
    _section_label("Network Analytics", top_pad=28)

    # stack status
    status_row = tk.Frame(inner, bg=BG)
    status_row.pack(fill="x", padx=36, pady=(0, 14))
    for label, up in [(f"Redis tunnel  localhost:{REDIS_TUNNEL_PORT}", report.stack["redis_tunnel"]),
                      (f"EC2 UDP  {EC2_IP}:{EC2_UDP_PORT}",           report.stack["ec2_udp"])]:
        f = tk.Frame(status_row, bg=TILE_BG)
        f.pack(side="left", padx=(0, 12), ipadx=14, ipady=8)
        tk.Label(f, text=label,                         bg=TILE_BG, fg=MUTED, font=("Helvetica", 10)).pack(anchor="w")
        tk.Label(f, text="● LIVE" if up else "○ DOWN",  bg=TILE_BG,
                 fg=GREEN if up else GRAY, font=("Helvetica", 13, "bold")).pack(anchor="w")

    # UDP RTT
    if report.rtt:
        r = report.rtt
        jitter = r.p95_ms - r.p50_ms
        rr = tk.Frame(inner, bg=BG)
        rr.pack(fill="x", padx=36, pady=(0, 8))
        _tile(rr, "RTT avg",       f"{r.avg_ms:.1f} ms",   _clr_rtt(r.avg_ms),   "client→EC2→client")
        _tile(rr, "RTT p50",       f"{r.p50_ms:.1f} ms",   _clr_rtt(r.p50_ms))
        _tile(rr, "RTT p95",       f"{r.p95_ms:.1f} ms",   _clr_rtt(r.p95_ms))
        _tile(rr, "RTT max",       f"{r.max_ms:.1f} ms",   _clr_rtt(r.max_ms))
        _tile(rr, "jitter p95−p50",f"{jitter:.1f} ms",     _clr_rtt(jitter),     "lower = stable")
        _tile(rr, "packet loss",   f"{r.loss_pct:.1f}%",   _clr_loss(r.loss_pct))
        _tile(rr, "server Hz",     f"{r.rate_hz:.1f} Hz",  _clr_hz(r.rate_hz),   "measured broadcast")

        rtt_refs = [(r.avg_ms, GREEN, f"avg {r.avg_ms:.1f} ms"),
                    (r.p95_ms, AMBER, f"p95 {r.p95_ms:.1f} ms"),
                    (100.0,    RED,   "100 ms")]
        cv_rtt = _card_canvas("UDP Round-trip time",
                               "cyan = per-packet RTT   green = avg   amber = p95   red = 100 ms",
                               chart_h=280)
        _draw_trace(cv_rtt, list(r.samples_ms), rtt_refs, 280)

        cv_rtt_hist = _card_canvas("RTT distribution",
                                   "green <50 ms   amber <100 ms   red ≥100 ms",
                                   chart_h=200)
        _draw_hist(cv_rtt_hist, list(r.samples_ms), rtt_refs, 200, bar_clr_fn=_clr_rtt)
    else:
        card = tk.Frame(inner, bg=CARD_BG)
        card.pack(fill="x", padx=36, pady=(4, 4), ipadx=16, ipady=10)
        tk.Label(card, text="UDP Round-trip time", bg=CARD_BG, fg=MUTED,
                 font=("Helvetica", 13, "bold")).pack(anchor="w", padx=12, pady=(10, 4))
        for ln in ["EC2 server not reachable on port 9000.",
                   "Run ./pynq_dev.sh and re-run this script to enable live RTT measurement."]:
            tk.Label(card, text=ln, bg=CARD_BG, fg=MUTED,
                     font=("Helvetica", 11)).pack(anchor="w", padx=16, pady=2)
        tk.Label(card, text="", bg=CARD_BG).pack(pady=4)

    # Redis RTT
    if report.redis:
        r = report.redis
        jitter = r.p95_ms - r.p50_ms
        rr2 = tk.Frame(inner, bg=BG)
        rr2.pack(fill="x", padx=36, pady=(8, 8))
        _tile(rr2, "Redis avg",    f"{r.avg_ms:.1f} ms",  _clr_redis(r.avg_ms),  "PING→PONG via tunnel")
        _tile(rr2, "Redis p50",    f"{r.p50_ms:.1f} ms",  _clr_redis(r.p50_ms))
        _tile(rr2, "Redis p95",    f"{r.p95_ms:.1f} ms",  _clr_redis(r.p95_ms))
        _tile(rr2, "Redis max",    f"{r.max_ms:.1f} ms",  _clr_redis(r.max_ms))
        _tile(rr2, "Redis jitter", f"{jitter:.1f} ms",    _clr_redis(jitter),    "p95−p50")

        redis_refs = [(r.avg_ms, GREEN, f"avg {r.avg_ms:.1f} ms"),
                      (r.p95_ms, AMBER, f"p95 {r.p95_ms:.1f} ms"),
                      (120.0,    RED,   "120 ms")]
        cv_redis = _card_canvas(
            "Redis tunnel RTT — PING/PONG via SSH tunnel",
            f"localhost:{REDIS_TUNNEL_PORT} → EC2 Redis → back  "
            f"(~30–60 ms baseline over SSH is normal)   threshold: green <60 ms · amber <120 ms",
            chart_h=260)
        _draw_trace(cv_redis, list(r.samples_ms), redis_refs, 260, color=PURPLE)
    else:
        card = tk.Frame(inner, bg=CARD_BG)
        card.pack(fill="x", padx=36, pady=(4, 4), ipadx=16, ipady=10)
        tk.Label(card, text="Redis tunnel RTT", bg=CARD_BG, fg=MUTED,
                 font=("Helvetica", 13, "bold")).pack(anchor="w", padx=12, pady=(10, 4))
        tk.Label(card, text=f"Redis tunnel not detected on localhost:{REDIS_TUNNEL_PORT}.  "
                            "Start ./pynq_dev.sh to enable.",
                 bg=CARD_BG, fg=MUTED, font=("Helvetica", 11)).pack(anchor="w", padx=16, pady=(0, 12))

    tk.Button(inner, text="Close  (Esc)", command=root.destroy, bg="#1a2d47", fg=FG,
              relief="flat", padx=28, pady=10, font=("Helvetica", 12),
              cursor="hand2").pack(pady=24)
    root.mainloop()


# ── pytest tests ───────────────────────────────────────────────────────────────

def test_server_side_latency_benchmarks():
    tick = _run_server_benchmark()
    _print_stats(tick.e2e)
    assert tick.e2e.avg_ms < 25.0, f"e2e avg {tick.e2e.avg_ms:.2f} ms exceeds 25 ms"
    assert tick.e2e.p95_ms < 35.0, f"e2e p95 {tick.e2e.p95_ms:.2f} ms exceeds 35 ms"


def test_network_analytics_live():
    import pytest
    stack = _detect_stack()
    if not stack["live"]:
        pytest.skip("EC2 not reachable — start pynq_dev.sh to run network analytics")
    tick   = _run_server_benchmark()
    report = FullReport(tick=tick, stack=stack)
    if stack["redis_tunnel"]:
        report.redis = _run_redis_probe()
    report.rtt = asyncio.run(_run_rtt_probe())
    if report.rtt:
        if report.rtt.avg_ms > 150:
            print(f"\nWARNING: RTT avg {report.rtt.avg_ms:.1f} ms is high (>150 ms)")
        if report.rtt.loss_pct > 5:
            print(f"\nWARNING: packet loss {report.rtt.loss_pct:.1f}% is high (>5%)")


# ── Standalone entry point ─────────────────────────────────────────────────────

if __name__ == "__main__":
    _show_popup(run_all())
