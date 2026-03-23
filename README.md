# PYNQcast: Server-Side

> Multiplayer FPGA raycasting game engine. PYNQ-Z1 nodes render via hardware DDA; this repo holds the **authoritative EC2 game server**, **browser monitor / game-dev environment** and **persistence layer**

![Python 3.12](https://img.shields.io/badge/Python-3.12-blue)
![Server](https://img.shields.io/badge/Server-EC2_asyncio-orange)
![Board](https://img.shields.io/badge/Board-PYNQ--Z1-green)
![Tests](https://img.shields.io/badge/Tests-~120_pytest_%26_isolated_sim_mode-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)


---

## Quick Start

> [!IMPORTANT]
> **`raycastpair.pem`** (EC2 SSH key) is required for full access to launch scripts and will be provided to the assessor separately. Place it at the repo root. However, server will be running so Client Side (PYNQ board) will still work. 
> Future plan is too design a full tutorial on how to setup your own server using our tools.

### Three launch modes - from repo root

| Script | What it does | When to use |
|--------|-------------|-------------|
| `./pynq_dev.sh` | 4-pane tmux: server + sidecar + auto-launch monitor + Redis stats | Full dev with physical PYNQ boards |
| `./sim_dev2.sh` | 6-pane tmux: server + sidecar + auto-launch monitor + 2 sim nodes + Redis | Server dev without hardware |
| `./monitor_view.sh` | SSH tunnel, opens dashboard at `localhost:8080` | Assessor / quick demo view |

Each script SSHes into EC2, pulls latest, rebuilds the monitor bundle, and launches everything. PYNQ nodes connect to `EC2:9000` over UDP. Dev scripts are written for WSL/Ubuntu on Windows but run unmodified on native Linux.


**Real hardware: - will still work without boards - game-dev environment most up-to-date**

```bash
./pynq_dev.sh
```
> [!TIP]
> #### Running this + `python3 launch.py` on the pynq board terminal is the full stack.


https://github.com/user-attachments/assets/8d100d5a-41ee-4512-ad4e-756c20289bab



**Simulated (no boards needed - legacy):**

```bash
./sim_dev2.sh
```

**With custom usernames:**

```bash
SIM1_USERNAME=alice SIM2_USERNAME=bob ./sim_dev2.sh
```

**Dashboard only:**

```bash
./monitor_view.sh          # start
./monitor_view.sh --stop   # teardown tunnel
```

---

## Architecture

<img width="800" alt="Main_architecture" src="https://github.com/user-attachments/assets/08cb9643-6a3b-4cdc-bb89-3df9768f2f58" />

**Reactor Server with SEDA inspired pipeline:** four stages, lock-free queues, single asyncio event loop (T4 on its own OS thread).

| Stage | Role |
|-------|------|
| **T1** `t1_udp_receiver.py` | `DatagramProtocol` callback → `packet_queue` |
| **T2** `t2_game_tick.py` | Authoritative game logic @ 60 Hz → `broadcast_queue` + `write_queue` |
| **T3** `t3_broadcaster.py` | Fan-out `PKT_GAME_STATE` to all nodes via UDP |
| **T4** `t4_redis_writer.py` | Batched `HSET` pipeline to Redis (daemon thread, never blocks event loop) |

**Storage tiers:** Redis (live, <1 ms) → DynamoDB (match history, atomic career counters) → S3 (compressed NDJSON replays). The **sidecar** bridges tiers via `BRPOP`, fully decoupled from the game loop.

---

## Monitor: Game Development Environment

The browser dashboard (`localhost:8080`) distinguishes PYNQcast as a **game-dev environment**, not just a game. Custom maps, configurable AI entities, and S3 replays are all operator-controllable from any connected node.

| Tab | Capability |
|-----|-----------|
| **Game View** | Live top-down arena canvas: players, ghosts, bit collectibles, spawn markers |
| **Map Editor** | Draw 32×32 arenas in-browser (brush, fill, line, rect, spawns), validate, hot-swap live |
| **Map Library** | Save / load / hot-swap stored maps mid-session |
| **Controls** | Start/end match, ghost AI count, kick players, switch node modes |
| **Match Replay** | Stream recorded matches from S3 directly to a PYNQ screen |
| **Server Monitoring** | SEDA queue health, Redis metrics, live event feed |
| **Player Stats** | Per-player tag counts, career stats |


https://github.com/user-attachments/assets/4d9b6678-f908-41b8-9264-f60a8735c5f3

---
---

## Wire Protocol

Fixed-size `struct`-packed UDP datagrams: zero-copy unpack on ARM Cortex-A9 and x86-64, no framing overhead.

| Packet | Dir | Bytes | Purpose |
|--------|-----|-------|---------|
| `PKT_REGISTER (0x20)` | node → srv | — | First contact: username + preferred role |
| `PKT_ACK (0x30)` | srv → node | — | Confirms registration, returns player ID |
| `PKT_MAP (0x40)` | srv → node | 1032 | 32×32 BRAM tile data (once at match start) |
| `PKT_STATE_UPDATE (0x01)` | node → srv | 24 | Position + angle + flags each tick |
| `PKT_GAME_STATE (0x02)` | srv → node | 68 | All players + game mode + bits bitmask |
| `PKT_NODE_MODE (0x60)` | srv → node | — | Switch node: manual / auto / replay |

**NodePacket (24 B):** `<HHIfffB3x>` : `u16 node_id`, `u16 seq`, `u32 tick`, `f32×3 (x,y,angle)`, `u8 flags`, 3-byte pad.

---

## Game Modes

| Mode | Trigger | Rules |
|------|---------|-------|
| **Chase** | Default map | Runner vs tagger: first to `TAGS_TO_WIN` wins |
| **Chase Bits** | Map contains `B` tiles | Runner collects pickups; tagger must tag before all bits collected |

When both humans pick runner, up to 3 **ghost AI taggers** spawn automatically.

**Map format:** plain text, 32×32. `#` wall, `.` floor, `B` bit pickup, `1`/`2` spawns. BRAM encoding: `word |= 1 << col` (LSB = col 0, matching HDL). Coordinates: Q6.10 fixed-point.

---

## Tests

The server was validated in two distinct phases before any PYNQ hardware was involved:

1. **In-process unit/integration suite** (`tests/`): server modules imported directly into pytest, no EC2 or Redis needed. A `_NullUDPTransport` absorbs outgoing UDP; FPGA BRAM encoding is verified by asserting on integer outputs, not by running on hardware.
2. **Live simulation** (`./sim_dev2.sh`): full EC2 stack running against software node simulators (`node_simulator.py`) on the laptop. Confirmed correct game flow, match lifecycle, monitor, sidecar, and persistence end-to-end before a single PYNQ board connected.

This meant every server behaviour was exercised and confirmed correct before plugging in hardware, so board could focus purely on the PS/PL interface.

```bash
pip install -r requirements.txt
python -m pytest tests/ -v                        # full suite
python -m pytest tests/test_server_latency.py -s  # with live benchmark output
python3 tests/test_protocol.py                    # protocol micro-benchmark
./sim_dev2.sh                                     # full live sim; no boards needed
```

| Area | File | What it covers |
|------|------|----------------|
| Game rules | `test_game_logic.py`, `test_match_modes.py` | Tag detection, match lifecycle, grace ticks, timeouts, ghost AI, chase-bits mode, lobby return |
| Regression | `test_bottleneck_fixes.py` | Sequence validation across all movement modes, 16-bit rollover, sidecar background thread |
| FPGA contract | `test_pynq_hardware_contract.py` | BRAM map encoding (`word |= 1 << col`), Q6.10 coordinate format, entity slot layout; pins the PS/PL boundary |
| Protocol | `test_protocol.py` | Pack/unpack round-trips + µs timings for every packet type |
| Performance | `test_server_latency.py` | In-process tick benchmark: asserts `avg < 25 ms`, `p95 < 35 ms`; optional live UDP RTT probe |
| Monitor | `test_monitor_map_store.py` | Map editor save/load, system map protection, spawn ordering |
| Identity | `test_sim_identity.py`, `test_pynq_client_tests.py` | Username registration, RTT metric percentile tooling |

See [`tests/README.md`](tests/README.md) for the full breakdown including the dual sim/pynq test matrix and how the in-process benchmark works.

---

## Infrastructure

| Resource | Detail |
|----------|--------|
| **EC2** | `ubuntu@3.9.71.204` : SSH key `raycastpair.pem` (provided to assessor) |
| **UDP server** | Port `9000` |
| **Monitor** | Port `8080` (SSH-tunnelled by dev scripts) |
| **Redis** | EC2 `localhost:6379` (tunnelled to local `6380`) |
| **DynamoDB** | `pynq-raycaster-seda-matches`, `eu-west-2` |
| **S3** | Compressed NDJSON replays + DDB archives |

---

> See [`docs/`](docs/) for architecture, protocol, performance, and concurrency deep-dives.

---

## License

MIT
