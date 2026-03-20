import importlib
import io
import sys
from contextlib import contextmanager, redirect_stdout
from pathlib import Path
from tempfile import TemporaryDirectory


ROOT = Path(__file__).resolve().parents[1]
JUPYTER_SIDE = ROOT / "jupyter_side"


@contextmanager
def jupyter_import_context():
    original_path = list(sys.path)
    sys.path[:0] = [str(JUPYTER_SIDE)]
    for name in list(sys.modules):
        if name == "protocol" or name.startswith("pynq_client_tests"):
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name == "protocol" or name.startswith("pynq_client_tests"):
                sys.modules.pop(name, None)


def test_rtt_metric_summary_computes_expected_percentiles():
    with jupyter_import_context():
        rtt = importlib.import_module("pynq_client_tests.rtt")

        stats = rtt._summarise_ms([10.0, 20.0, 30.0, 40.0, 50.0])

        assert stats.count == 5
        assert stats.avg_ms == 30.0
        assert stats.p50_ms == 30.0
        assert stats.p95_ms == 50.0
        assert stats.max_ms == 50.0
        assert stats.min_ms == 10.0


def test_rtt_report_prints_key_fields():
    with jupyter_import_context():
        rtt = importlib.import_module("pynq_client_tests.rtt")

        report = rtt.RTTReport(
            label="idle",
            server="3.9.71.204",
            port=9000,
            username="probe",
            role="any",
            samples_target=10,
            expected_server_tick_hz=60.0,
            expected_client_tick_hz=60.0,
            expected_client_send_hz=60.0,
            ack_rtt_ms=12.34,
            first_state_after_ack_ms=18.9,
            game_state_gaps=rtt.MetricStats(
                count=9,
                avg_ms=16.7,
                p50_ms=16.5,
                p95_ms=18.2,
                max_ms=19.1,
                min_ms=15.9,
                stddev_ms=0.8,
            ),
            game_state_gap_samples_ms=[16.2, 16.5, 16.8],
            game_state_rate_hz=59.9,
            game_state_jitter_p95_p50_ms=1.7,
            packets_received=10,
            player_id=1,
            started_at_unix_ms=0,
        )

        buffer = io.StringIO()
        with redirect_stdout(buffer):
            rtt._print_report(report)
        output = buffer.getvalue()

        assert "ack_rtt_ms: 12.34" in output
        assert "game_state_p95_gap_ms: 18.20" in output
        assert "game_state_rate_hz: 59.90" in output


def test_input_latency_csv_extracts_plot_ready_row():
    with jupyter_import_context():
        csv_probe = importlib.import_module("pynq_client_tests.input_latency_csv")

        state = {
            "input_latency": {
                "player_id": 1,
                "board_slot": 2,
                "display_name": "Board 2",
                "username": "pynq-b",
                "controller_key": "board:2",
                "seq": 77,
                "movement_mode": 3,
                "input_flags": 5,
                "client_sent_at_ms": 1000,
                "server_received_at_ms": 1012,
                "server_broadcast_at_ms": 1027,
                "input_to_server_ms": 12,
                "input_to_broadcast_ms": 27,
            }
        }

        row = csv_probe._extract_csv_row(state, "dual-board", 2000)

        assert row is not None
        assert row["label"] == "dual-board"
        assert row["sample_observed_at_ms"] == 2000
        assert row["seq"] == 77
        assert row["input_to_server_ms"] == 12
        assert row["input_to_broadcast_ms"] == 27
        assert csv_probe._sample_key(state["input_latency"]) == (1, 77, 1027)


def test_input_latency_plotter_summarises_csv_by_label():
    with TemporaryDirectory() as temp_dir:
        csv_path = Path(temp_dir) / "input_latency_idle.csv"
        csv_path.write_text(
            "\n".join([
                "label,sample_observed_at_ms,player_id,board_slot,display_name,username,controller_key,seq,movement_mode,input_flags,client_sent_at_ms,server_received_at_ms,server_broadcast_at_ms,input_to_server_ms,input_to_broadcast_ms",
                "idle,1000,1,1,Board 1,pynq-a,board:1,10,3,5,900,910,930,10,30",
                "idle,1100,1,1,Board 1,pynq-a,board:1,11,3,1,1000,1011,1036,11,36",
            ]),
            encoding="utf-8",
        )

        with jupyter_import_context():
            plotter = importlib.import_module("pynq_client_tests.plot_input_latency_csv")

            rows = plotter.load_latency_rows([str(csv_path)])
            summary = plotter.summarise_by_label(rows)

        assert len(rows) == 2
        assert summary == [{
            "label": "idle",
            "count": 2,
            "avg_input_to_server_ms": 10.5,
            "avg_input_to_broadcast_ms": 33.0,
            "max_input_to_broadcast_ms": 36.0,
        }]


def test_udp_rtt_metric_summary_computes_expected_percentiles():
    with jupyter_import_context():
        udp_rtt = importlib.import_module("pynq_client_tests.udp_rtt")

        stats = udp_rtt._summarise_ms([8.0, 10.0, 12.0, 14.0, 16.0])

        assert stats.count == 5
        assert stats.avg_ms == 12.0
        assert stats.p50_ms == 12.0
        assert stats.p95_ms == 16.0
        assert stats.max_ms == 16.0
        assert stats.min_ms == 8.0


def test_udp_rtt_plotter_summarises_csv_by_label():
    with TemporaryDirectory() as temp_dir:
        csv_path = Path(temp_dir) / "udp_rtt_idle.csv"
        csv_path.write_text(
            "\n".join([
                "label,sample_index,seq,status,rtt_ms",
                "idle,0,1,ok,12.5",
                "idle,1,2,ok,14.5",
                "idle,2,3,timeout,",
            ]),
            encoding="utf-8",
        )

        with jupyter_import_context():
            plotter = importlib.import_module("pynq_client_tests.plot_udp_rtt_csv")

            rows = plotter.load_rtt_rows([str(csv_path)])
            summary = plotter.summarise_by_label(rows)

        assert len(rows) == 3
        assert summary == [{
            "label": "idle",
            "count": 3,
            "samples_ok": 2,
            "samples_lost": 1,
            "loss_pct": (1 / 3) * 100.0,
            "avg_rtt_ms": 13.5,
            "p95_rtt_ms": 12.5,
            "max_rtt_ms": 14.5,
        }]
