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
        udp_rtt = importlib.import_module("pynq_client_tests.udp_rtt")

        stats = udp_rtt._summarise_ms([10.0, 20.0, 30.0, 40.0, 50.0])

        assert stats.count == 5
        assert stats.avg_ms == 30.0
        assert stats.p50_ms == 30.0
        assert stats.p95_ms == 50.0
        assert stats.max_ms == 50.0
        assert stats.min_ms == 10.0


def test_udp_rtt_report_prints_key_fields():
    with jupyter_import_context():
        udp_rtt = importlib.import_module("pynq_client_tests.udp_rtt")

        report = udp_rtt.UdpRTTReport(
            label="idle",
            server="3.9.71.204",
            port=9000,
            samples_target=10,
            expected_client_tick_hz=60.0,
            expected_client_send_hz=60.0,
            samples_ok=9,
            samples_lost=1,
            loss_pct=10.0,
            rtt_stats=udp_rtt.MetricStats(
                count=9,
                avg_ms=16.7,
                p50_ms=16.5,
                p95_ms=18.2,
                max_ms=19.1,
                min_ms=15.9,
                stddev_ms=0.8,
            ),
            rtt_samples_ms=[16.2, 16.5, 16.8],
            started_at_unix_ms=0,
        )

        buffer = io.StringIO()
        with redirect_stdout(buffer):
            udp_rtt._print_report(report)
        output = buffer.getvalue()

        assert "samples_ok: 9" in output
        assert "loss_pct: 10.00" in output
        assert "rtt_p95_ms: 18.20" in output


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
