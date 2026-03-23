# PYNQcast: Server-Side

> Multiplayer FPGA raycasting game engine. PYNQ-Z1 nodes render via hardware DDA; this repo holds the **authoritative EC2 game server**, **browser monitor / game-dev environment** and **persistence layer**

![Python 3.9+](https://img.shields.io/badge/Python-3.9+-blue)
![Server](https://img.shields.io/badge/Server-EC2_asyncio-orange)
![Board](https://img.shields.io/badge/Board-PYNQ--Z1-green)
![Tests](https://img.shields.io/badge/Tests-~120_pytest_&_isolated_sim_mode-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

<!-- TODO: add screenshot / GIF of gameplay + monitor dashboard -->

---

## Quick Start

> **`raycastpair.pem`** (EC2 SSH key) is required for full access to launch scripts and will be provided to the assessor separately. Place it at the repo root. However, server will be running so ClietnSide should still work. 
> Future plan is too design a full tutorial on how to setup your own server using our tools.

### Three launch modes - from repo root

| Script | What it does | When to use |
|--------|-------------|-------------|
| `./pynq_dev.sh` | 4-pane tmux: server + sidecar + auto-launch monitor + Redis stats | Full dev with physical PYNQ boards |
| `./sim_dev2.sh` | 6-pane tmux: server + sidecar + auto-launch monitor + 2 sim nodes + Redis | Server dev without hardware |
| `./monitor_view.sh` | SSH tunnel, opens dashboard at `localhost:8080` | Assessor / quick demo view |

Each script SSHes into EC2, pulls latest, rebuilds the monitor bundle, and launches everything. PYNQ nodes connect to `EC2:9000` over UDP.


**Real hardware: - will still work without boards - game-dev environment most up-to-date**

```bash
./pynq_dev.sh
```
> [!TIP] #### Running this + `python3 launch.py` on the pynq board terminal is the full stack. 

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

<!-- Attach: top-level architecture diagram (Figure 19 from report) -->

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

```bash
pip install -r requirements.txt
```

```bash
python -m pytest tests/ -v
```

Covers game rules, protocol encode/decode, BRAM hardware contract, tick timing under load, anti-cheat, and sim/pynq parity.

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

## License

MIT
