# PYNQ Client Tests

Board-side diagnostics for report-ready latency numbers.

Run from the `jupyter_side/` directory on the PYNQ board:

```bash
python3 -m pynq_client_tests --server 3.9.71.204 --label idle --samples 120
```

Optional JSON export:

```bash
python3 -m pynq_client_tests --server 3.9.71.204 --label idle --samples 120 --json-out rtt_idle.json
```

Example load labels for your report:

- `idle`
- `monitor-open`
- `replay-active`
- `dual-board`
- `monitor-plus-dual-board`

Key outputs:

- `ack_rtt_ms`: time from register packet to server ACK
- `first_state_after_ack_ms`: time from ACK to first `PKT_GAME_STATE`
- `game_state_avg_gap_ms`: average time between live state packets
- `game_state_p95_gap_ms`: main stability metric for packet cadence
- `game_state_rate_hz`: effective update rate seen by the board
- `game_state_jitter_p95_p50_ms`: simple jitter figure for the report
- `expected_server_tick_hz`: configured server target rate
- `expected_client_tick_hz`: configured `run_pynq.py` main-loop rate
- `expected_client_send_hz`: configured `run_pynq.py` send/update rate
- `game_state_gap_samples_ms`: raw per-packet gap samples for trace plots

Copy to board alongside `protocol.py`:

```bash
scp -r jupyter_side/pynq_client_tests jupyter_side/protocol.py \
    xilinx@<PYNQ_IP>:/home/xilinx/jupyter_notebooks/Final_project_test/
```

Basic plotting workflow:

```bash
python3 -m pynq_client_tests --label idle --json-out rtt_idle.json
python3 -m pynq_client_tests --label monitor-open --json-out rtt_monitor.json
python3 pynq_client_tests/plot_rtt_report.py rtt_idle.json rtt_monitor.json --out-dir rtt_plots
```

This writes:

- `latency_comparison.png`
- `gap_comparison.png`
- `hz_comparison.png`
- `gap_trace.png`

Input-latency CSV capture for monitor plots:

```bash
python3 pynq_client_tests/input_latency_csv.py \
  --monitor http://3.9.71.204:8080 \
  --label idle \
  --samples 40 \
  --csv-out input_latency_idle.csv
```

Recommended CSV plot fields:

- `input_to_server_ms`
- `input_to_broadcast_ms`
- `seq`
- `label`

Useful report wording:

- `input_to_server_ms`: board input packet reaching the server
- `input_to_broadcast_ms`: board input packet reaching the next server broadcast

That CSV is the most stable source for plots. The live monitor card also shows an approximate input-to-monitor figure, but the CSV keeps to server-timestamped values so you do not have to rely on browser clock alignment.

Jupyter plotting from those CSV files:

```python
from pynq_client_tests.plot_input_latency_csv import load_latency_rows, plot_latency_rows, summarise_by_label

rows = load_latency_rows([
    "input_latency_idle.csv",
    "input_latency_dual_board.csv",
])

summarise_by_label(rows)
plot_latency_rows(rows)
```

That renders inline in a notebook if `matplotlib` is available.

PNG export from the command line:

```bash
python3 pynq_client_tests/plot_input_latency_csv.py \
  input_latency_idle.csv input_latency_dual_board.csv \
  --out-dir input_latency_plots
```

This writes:

- `input_latency_comparison.png`
- `input_latency_max.png`
- `input_latency_trace.png`

If you want a notebook-first workflow, open:

- [Input_Latency_Report.ipynb](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/jupyter_side/pynq_client_tests/Input_Latency_Report.ipynb)

That notebook lets you:

- set the monitor URL and load label
- capture a CSV run from inside Jupyter
- compare multiple CSV runs
- render the report plots inline

Direct UDP RTT workflow:

```bash
python3 pynq_client_tests/udp_rtt.py \
  --server 3.9.71.204 \
  --samples 100 \
  --label idle \
  --csv-out udp_rtt_idle.csv \
  --json-out udp_rtt_idle.json
```

That path talks straight to the EC2 UDP server on port `9000`, so it works with the same `./pynq_dev.sh` stack and does not depend on the monitor tunnel.

Notebook-first option:

- [UDP_RTT_Benchmark.ipynb](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/jupyter_side/pynq_client_tests/UDP_RTT_Benchmark.ipynb)

Jupyter plotting from those CSV files:

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
