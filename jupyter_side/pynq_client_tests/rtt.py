#!/usr/bin/env python3
"""Board-side UDP diagnostics for the run_pynq board client.

Measures:
  - register -> ACK RTT
  - ACK -> first game-state latency
  - game-state inter-arrival gap stats (avg/p50/p95/max)
  - effective server update rate

This is designed to run on the PYNQ board with only stdlib + protocol.py.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import socket
import statistics
import sys
import time
from dataclasses import asdict, dataclass
from typing import Optional

try:
    import protocol
except ModuleNotFoundError:
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    JUPYTER_SIDE_DIR = os.path.dirname(SCRIPT_DIR)
    if JUPYTER_SIDE_DIR not in sys.path:
        sys.path.insert(0, JUPYTER_SIDE_DIR)
    import protocol

try:
    import run_pynq as pynq_runtime
except Exception:
    pynq_runtime = None


DEFAULT_SERVER = "3.9.71.204"
DEFAULT_PORT = 9000
DEFAULT_SAMPLES = 120
DEFAULT_TIMEOUT_S = 8.0
SOCKET_TIMEOUT_S = 0.25


@dataclass
class MetricStats:
    count: int
    avg_ms: float
    p50_ms: float
    p95_ms: float
    max_ms: float
    min_ms: float
    stddev_ms: float


@dataclass
class RTTReport:
    label: str
    server: str
    port: int
    username: str
    role: str
    samples_target: int
    expected_server_tick_hz: float
    expected_client_tick_hz: float
    expected_client_send_hz: float
    ack_rtt_ms: float
    first_state_after_ack_ms: Optional[float]
    game_state_gaps: Optional[MetricStats]
    game_state_gap_samples_ms: list[float]
    game_state_rate_hz: Optional[float]
    game_state_jitter_p95_p50_ms: Optional[float]
    packets_received: int
    player_id: Optional[int]
    started_at_unix_ms: int


def _percentile(values: list[float], p: float) -> float:
    ordered = sorted(values)
    index = max(0, min(len(ordered) - 1, int(math.ceil(len(ordered) * p)) - 1))
    return ordered[index]


def _summarise_ms(values: list[float]) -> MetricStats:
    return MetricStats(
        count=len(values),
        avg_ms=sum(values) / len(values),
        p50_ms=_percentile(values, 0.50),
        p95_ms=_percentile(values, 0.95),
        max_ms=max(values),
        min_ms=min(values),
        stddev_ms=statistics.pstdev(values) if len(values) > 1 else 0.0,
    )


def _decode_role(name: str) -> int:
    mapping = {
        "any": protocol.ROLE_ANY,
        "runner": protocol.ROLE_RUNNER,
        "tagger": protocol.ROLE_TAGGER,
    }
    return mapping.get(str(name).lower(), protocol.ROLE_ANY)


def _print_report(report: RTTReport):
    print("\nPYNQ Client RTT Report")
    print(f"server: {report.server}:{report.port}")
    print(f"username: {report.username or '<anon>'}")
    print(f"role: {report.role}")
    print(f"label: {report.label or 'default'}")
    print(
        "configured_rates_hz: "
        f"server={report.expected_server_tick_hz:.1f}, "
        f"client_tick={report.expected_client_tick_hz:.1f}, "
        f"client_send={report.expected_client_send_hz:.1f}"
    )
    print(f"ack_rtt_ms: {report.ack_rtt_ms:.2f}")
    if report.first_state_after_ack_ms is not None:
        print(f"first_state_after_ack_ms: {report.first_state_after_ack_ms:.2f}")
    else:
        print("first_state_after_ack_ms: n/a")

    if report.game_state_gaps is not None:
        gaps = report.game_state_gaps
        print(f"game_state_packets: {report.packets_received}")
        print(f"game_state_avg_gap_ms: {gaps.avg_ms:.2f}")
        print(f"game_state_p50_gap_ms: {gaps.p50_ms:.2f}")
        print(f"game_state_p95_gap_ms: {gaps.p95_ms:.2f}")
        print(f"game_state_max_gap_ms: {gaps.max_ms:.2f}")
        print(f"game_state_stddev_ms: {gaps.stddev_ms:.2f}")
        print(f"game_state_rate_hz: {report.game_state_rate_hz:.2f}")
        print(f"game_state_jitter_p95_p50_ms: {report.game_state_jitter_p95_p50_ms:.2f}")
    else:
        print(f"game_state_packets: {report.packets_received}")
        print("game_state_stats: insufficient samples")


def _write_json(path: str, report: RTTReport):
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(asdict(report), handle, indent=2)
        handle.write("\n")


def run_rtt_probe(
    server: str,
    port: int,
    username: str,
    role: str,
    label: str,
    samples: int,
    timeout_s: float,
) -> RTTReport:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(SOCKET_TIMEOUT_S)

    started_at_unix_ms = int(time.time() * 1000)
    ack_rtt_ms: Optional[float] = None
    first_state_after_ack_ms: Optional[float] = None
    ack_received_ns: Optional[int] = None
    player_id: Optional[int] = None
    packet_times_ns: list[int] = []
    packets_received = 0

    register_seq = 1
    register_packet = protocol.pack_register_packet(
        seq=register_seq,
        x=0.0,
        y=0.0,
        angle=0.0,
        preferred_role=_decode_role(role),
        username=username,
        movement_mode=protocol.MOVEMENT_MODE_POSE,
    )

    deadline = time.monotonic() + timeout_s
    sent_at_ns = time.perf_counter_ns()
    sock.sendto(register_packet, (server, port))

    try:
        while time.monotonic() < deadline:
            try:
                data, _addr = sock.recvfrom(4096)
            except socket.timeout:
                continue

            recv_ns = time.perf_counter_ns()
            if len(data) < protocol.HEADER_SIZE:
                continue
            pkt_type, _seq, _ts = protocol.unpack_header(data)

            if pkt_type == protocol.PKT_ACK and ack_received_ns is None:
                ack_received_ns = recv_ns
                ack_rtt_ms = (recv_ns - sent_at_ns) / 1_000_000.0
                if len(data) >= protocol.HEADER_SIZE + 1:
                    player_id = data[protocol.HEADER_SIZE]
                continue

            if pkt_type == protocol.PKT_GAME_STATE:
                packets_received += 1
                packet_times_ns.append(recv_ns)
                if ack_received_ns is not None and first_state_after_ack_ms is None:
                    first_state_after_ack_ms = (recv_ns - ack_received_ns) / 1_000_000.0
                if ack_received_ns is not None and len(packet_times_ns) >= samples:
                    break
    finally:
        sock.close()

    if ack_rtt_ms is None:
        raise RuntimeError(
            f"No ACK received from {server}:{port} within {timeout_s:.1f}s. "
            "Check the server IP, UDP reachability, and whether the stack is running."
        )

    gap_stats = None
    gaps_ms: list[float] = []
    rate_hz = None
    jitter_ms = None
    if len(packet_times_ns) >= 2:
        gaps_ms = [
            (packet_times_ns[index] - packet_times_ns[index - 1]) / 1_000_000.0
            for index in range(1, len(packet_times_ns))
        ]
        gap_stats = _summarise_ms(gaps_ms)
        rate_hz = 1000.0 / gap_stats.avg_ms if gap_stats.avg_ms > 0 else 0.0
        jitter_ms = gap_stats.p95_ms - gap_stats.p50_ms

    expected_server_tick_hz = 60.0
    expected_client_tick_hz = float(getattr(pynq_runtime, "TICK_RATE", 60.0)) if pynq_runtime else 60.0
    expected_client_send_hz = float(getattr(pynq_runtime, "SEND_RATE", 60.0)) if pynq_runtime else 60.0

    return RTTReport(
        label=label,
        server=server,
        port=port,
        username=username,
        role=role,
        samples_target=samples,
        expected_server_tick_hz=expected_server_tick_hz,
        expected_client_tick_hz=expected_client_tick_hz,
        expected_client_send_hz=expected_client_send_hz,
        ack_rtt_ms=ack_rtt_ms,
        first_state_after_ack_ms=first_state_after_ack_ms,
        game_state_gaps=gap_stats,
        game_state_gap_samples_ms=gaps_ms,
        game_state_rate_hz=rate_hz,
        game_state_jitter_p95_p50_ms=jitter_ms,
        packets_received=packets_received,
        player_id=player_id,
        started_at_unix_ms=started_at_unix_ms,
    )


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run board-side PYNQ UDP RTT/state-stream diagnostics")
    parser.add_argument("--server", default=DEFAULT_SERVER, help="EC2/server IP or hostname")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="server UDP port")
    parser.add_argument("--username", default="rtt-probe", help="username sent in PKT_REGISTER")
    parser.add_argument(
        "--role",
        choices=["any", "runner", "tagger"],
        default="any",
        help="preferred role used during registration",
    )
    parser.add_argument(
        "--label",
        default="default",
        help="load label for the run, e.g. idle, monitor-open, replay, dual-board",
    )
    parser.add_argument(
        "--samples",
        type=int,
        default=DEFAULT_SAMPLES,
        help="target number of game-state packets to sample after ACK",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=DEFAULT_TIMEOUT_S,
        help="overall timeout in seconds",
    )
    parser.add_argument("--json-out", default="", help="optional path to write JSON results")
    return parser


def main(argv: Optional[list[str]] = None) -> int:
    parser = build_arg_parser()
    args = parser.parse_args(argv)

    try:
        report = run_rtt_probe(
            server=args.server,
            port=args.port,
            username=args.username,
            role=args.role,
            label=args.label,
            samples=max(2, int(args.samples)),
            timeout_s=max(1.0, float(args.timeout)),
        )
    except Exception as exc:
        print(f"RTT probe failed: {exc}")
        return 1

    _print_report(report)
    if args.json_out:
        _write_json(args.json_out, report)
        print(f"json_out: {args.json_out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
