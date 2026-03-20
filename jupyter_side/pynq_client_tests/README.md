# PYNQ Client Tests

Board-side direct UDP RTT benchmarking for report-ready numbers.

Copy to the board alongside `protocol.py` and `run_pynq.py`:

```bash
scp -r jupyter_side/pynq_client_tests jupyter_side/protocol.py jupyter_side/run_pynq.py \
    xilinx@<PYNQ_IP>:/home/xilinx/jupyter_notebooks/Final_project_test/
```

Run from the `jupyter_side/` directory on the PYNQ board:

```bash
python3 -m pynq_client_tests --server 3.9.71.204 --samples 100 --label idle
```

Optional CSV + JSON export:

```bash
python3 -m pynq_client_tests \
  --server 3.9.71.204 \
  --samples 100 \
  --label idle \
  --csv-out udp_rtt_idle.csv \
  --json-out udp_rtt_idle.json
```

Key outputs:

- `avg_rtt_ms`
- `p50_rtt_ms`
- `p95_rtt_ms`
- `max_rtt_ms`
- `loss_pct`
- `samples_ok`
- `samples_lost`

Notebook workflow:

- [UDP_RTT_Benchmark.ipynb](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/jupyter_side/pynq_client_tests/UDP_RTT_Benchmark.ipynb)

Jupyter plotting:

```python
from pynq_client_tests.plot_udp_rtt_csv import load_rtt_rows, plot_rtt_rows, summarise_by_label

rows = load_rtt_rows([
    "udp_rtt_idle.csv",
    "udp_rtt_dual-board.csv",
])

summarise_by_label(rows)
plot_rtt_rows(rows)
```

This writes:

- `udp_rtt_comparison.png`
- `udp_rtt_loss.png`
- `udp_rtt_trace.png`
