# Tests

```bash
python -m pytest tests/ -v          # full suite
python -m pytest tests/ -v -s       # with live benchmark output
python3 tests/test_protocol.py      # standalone protocol micro-benchmark
```

> [!NOTE]
> No EC2, Redis, or PYNQ hardware required. The entire suite runs in-process on a laptop.

---

## Key design principle: no external dependencies

The server modules are imported directly into the test process using path-manipulation import contexts (`pynq_server_import_context`, `sim_server_import_context`). This means:

- `PacketHandler`, `CoreLogic`, `MatchState`, `MapLoader` are all instantiated as plain Python objects
- A `_NullUDPTransport` stub absorbs outgoing UDP — no real socket
- Redis calls are either mocked or not called at all (pure logic tests)
- The FPGA BRAM contract is verified by asserting on integer encoding outputs, not by running on hardware

This makes the suite fast, deterministic, and runnable without any infrastructure.

---

## What each file tests

### Game rules and server logic

**`test_game_logic.py`** — anticheat, sequence validation, flag semantics

- `validate_seq` accepts/rejects based on 16-bit circular arithmetic including wraparound
- Anticheat rejects stale seq, out-of-bounds positions, speed cap violations
- Flag names are validated for directional clarity in the protocol

**`test_match_modes.py`** — full match lifecycle, chase and chase-bits modes

- 50+ tests exercising: lobby queuing, match start, tagging, grace ticks, match end, lobby return
- Chase-bits: runner collects bits, bit mask updates, runner wins when all collected
- Ghost spawning, ghost speed/tag-radius overrides, ghost wall steering
- Timeout/pause/resume: a player going silent pauses the match; reconnecting resumes it
- Map hot-swap blocked during live match; `set_map` takes effect on next match start
- Board replay: `start_board_replay` streams frames; `stop_board_replay` restores live mode
- Spawn positions preserved across lobby return; role assignment by board slot order

**`test_bottleneck_fixes.py`** — regression tests for specific bottleneck fixes

- `validate_seq` applied to all movement modes including `INTENT_ONLY` (not just `POSE`)
- 16-bit rollover: `(0 - 65535) & 0xFFFF = 1` reads as a forward step of 1
- Sidecar post-match I/O runs in a background thread: new match can start before previous I/O finishes, thread is daemon

**`test_sim_identity.py`** — simulator-stack username and identity

- `PKT_REGISTER` username trailer survives pack/unpack round-trip
- Player identity falls back to controller key when no username provided
- Packet handler registers profile metadata correctly

**`test_monitor_map_store.py`** — map editor and storage

- Save/load editor maps to filesystem
- System maps are protected from deletion
- Spawn order loaded from runtime marker numbers
- Table entries appear alongside system maps; delete removes both table entry and runtime mirror

### PYNQ hardware contract

**`test_pynq_hardware_contract.py`** — pins the exact BRAM encoding the HDL expects

- `word |= 1 << col` for wall tiles (LSB = col 0); verifies a known map row produces the correct 32-bit word
- Q6.10 coordinate encoding: known world positions map to exact expected integer values
- Remote entity BRAM slots written correctly including ghosts
- Entity count capped at `MAX_ENTITIES`
- Button GPIO bit decoding matches AXI GPIO peripheral mapping
- Auto runner/tagger A* navigation through gaps, bit preference, evasion
- Runtime mode packet (`PKT_NODE_MODE`) switches live mode correctly
- Replay mode: snaps to server pose each frame, sends heartbeat with `INTENT_ONLY`

> [!IMPORTANT]
> These tests are the contract between the PS Python client and the PL raycasting hardware. If they pass, the board will render correctly. If any encoding changes, these tests break first.

**`test_pynq_runtime_fixes.py`** — PYNQ-stack specific fixes

- Map loader uses explicit spawn markers; rejects non-32×32 maps
- BRAM map write clears stale rows before a short update
- Stale map packets ignored
- Redis I/O sanitises `None` values before HSET
- Single-player match start allowed
- Stale sequence rejection in PYNQ packet handler

**`test_pynq_client_tests.py`** — RTT metric tooling from `jupyter_side/`

- RTT percentile computation (p50, p95, p99) from raw sample arrays
- RTT report prints all expected fields
- Input latency CSV extraction produces plot-ready rows
- Latency plotter summarises CSV by label

### Protocol

**`test_protocol.py`** — standalone script (not pytest)

Runs pack/unpack round-trips for every packet type and prints microsecond timings. Shows correctness and cost of struct encoding in a single run.

```
python3 tests/test_protocol.py
```

### Latency and performance

**`test_server_latency.py`** — in-process tick benchmark + optional live network probe

**In-process benchmark** (always runs, no EC2 needed):

- Instantiates the full server pipeline (`PacketHandler` + `CoreLogic` + `RedisIO`) with a `_NullUDPTransport`
- Seeds a live match state: 2 humans + 2 ghosts + 3 active bits, chase-bits mode
- Runs 120 tick iterations, measures wall-clock time per tick
- Asserts `avg < 25 ms` and `p95 < 35 ms`

**Live network probe** (skipped if EC2 unreachable):

- Sends bare UDP echo packets to `EC2:9000`, measures RTT
- Reports `avg_ms`, `p95_ms`, `max_ms`, `loss_pct`, `rate_hz`
- p95 is the number to quote for stability

Key benchmark metrics:

| Metric | Description | Guardrail |
|--------|-------------|-----------|
| `avg_ms` | Mean tick time | < 25 ms |
| `p95_ms` | 95th percentile tick time | < 35 ms |
| `max_ms` | Worst spike observed | informational |
| `loss_pct` | UDP packet loss (live probe) | informational |
| `rate_hz` | Observed server update rate (live probe) | informational |

```bash
python -m pytest tests/test_server_latency.py -v -s   # shows benchmark table
```

---

## conftest.py

Collects `record_property` calls tagged `benchmark.*` from any test and prints a **Benchmark Summary** section at the end of the pytest run. This is how `test_server_latency.py` surfaces timing results in the pytest output without a separate benchmarking framework.

---

## Dual test matrices: sim vs pynq

Several concerns are tested twice — once against the sim stack (`sim_full/ec2/`) and once against the pynq stack (`pynq_full/ec2/`). The two stacks share logic but are intentionally separate codebases that will diverge. Running both matrices catches regressions introduced in one stack that haven't yet been ported to the other.

Files that form parallel pairs:

| Sim | PYNQ |
|-----|------|
| `test_match_modes.py` (`sim_*` tests) | `test_pynq_hardware_contract.py` (`pynq_packet_handler_*` tests) |
| `test_sim_identity.py` | `test_pynq_hardware_contract.py` (`register_*`, `identity_*` tests) |
| `test_pynq_runtime_fixes.py` | `test_pynq_runtime_fixes.py` (pynq-only fixes) |
