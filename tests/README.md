# Tests

Use `pytest` from the repo root:

```bash
pytest tests
```

Run a single file when you only want one area:

```bash
pytest tests/test_pynq_hardware_contract.py
pytest tests/test_match_modes.py
pytest tests/test_server_latency.py -s
```

## What matters

- Most files in this folder are regression tests. The important output is simple: all tests should pass with no failures.
- `test_server_latency.py` is the main performance/assessment script. The useful numbers are:
  - `avg_ms`: average server tick or RTT latency
  - `p95_ms`: the main stability metric; this is usually the number to quote
  - `max_ms`: worst observed spike
  - `loss_pct`: UDP packet loss during the live RTT probe
  - `rate_hz`: observed live server update rate
  - For the built-in server benchmark, the key guardrail is `p95 < 35 ms`
- `test_protocol.py` is a smoke/perf script. The useful outputs are:
  - packet round-trip correctness
  - pack/unpack time in microseconds

## Recommended runs

```bash
pytest tests
pytest tests/test_server_latency.py -s
python3 tests/test_protocol.py
```

## File guide

- `test_pynq_hardware_contract.py`, `test_pynq_runtime_fixes.py`: PYNQ client/runtime behavior and packet contracts
- `test_pynq_client_tests.py`: RTT metric percentile computation and input latency tooling from `jupyter_side/`
- `test_match_modes.py`, `test_game_logic.py`, `test_bottleneck_fixes.py`, `test_sim_identity.py`: server/gameplay/regression coverage
- `test_monitor_map_store.py`: dashboard map editor storage behavior
- `test_server_latency.py`: latency and live network diagnostics
- `test_protocol.py`: protocol round-trip and micro-benchmark output
- `conftest.py`: shared pytest fixtures
