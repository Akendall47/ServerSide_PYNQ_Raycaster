# FPGA Raycaster : Game Server

Server-side repository for a multiplayer FPGA raycaster tag game. PYNQ-Z2 nodes run a hardware raycaster on FPGA; this server handles game logic, state synchronisation, and persistence.

---

## What the system does

Two PYNQ boards connect over UDP to a Python game server running on EC2. Each board renders a first-person raycasted view of a 32×32 tile map using dedicated FPGA IP. One player is the **runner**, the other is the **tagger**. The server tracks positions, enforces tag proximity, manages match lifecycle, and broadcasts authoritative state at 60 Hz. A browser-based monitor provides live oversight.

---

## Architecture

```
PYNQ Node (runner)  ──┐
                       ├──UDP:9000──► EC2 SEDA Server ──► Redis ──► Sidecar ──► DynamoDB / S3
PYNQ Node (tagger)  ──┘                    │                             ▲
                                           │                      watches game:events
                                      game_logic/
                                   (anticheat, core_logic,
                                    match_state — pure Python)
                                           │
                                    T4 RedisWriter
                                   (background thread)
                                           │
                                       Redis keys
                                       (game:state,
                                        game:events,
                                        game:control)
                                           │
                               Browser Monitor (WebSocket/SSE)
```

**SEDA pipeline** — four stages, three queues:

| Stage | Thread model | Role |
|-------|-------------|------|
| T1 UDPReceiver | asyncio coroutine | Receive node packets, parse headers, enqueue |
| T2 GameTick | asyncio coroutine | Run game logic tick at 60 Hz, produce broadcasts + Redis writes |
| T3 Broadcaster | asyncio coroutine | Send PKT\_GAME\_STATE to all registered nodes via shared UDP socket |
| T4 RedisWriter | OS thread | Blocking Redis writes (never stalls the event loop) |

T1 and T3 share the same UDP socket bound to port 9000. This ensures broadcasts come from `EC2:9000`, which matches the NAT mapping created by the node's outbound `sendto(EC2:9000)` — essential for WSL/NAT environments.

---

## Game modes

| Mode | Description |
|------|-------------|
| `GAME_MODE_CHASE` | Runner vs tagger. First to `TAGS_TO_WIN` tags wins. |
| `GAME_MODE_CHASE_BITS` | Runner collects bit pickups (B tiles in map). Tagger must tag before all bits are collected. |

The mode is detected automatically from the loaded map — maps with `B` tiles enter chase-bits mode. The server sends a `PKT_BITS_INIT` packet once at match start with all bit positions; per-tick `PKT_GAME_STATE` carries a bitmask of remaining bits.

**Ghost taggers** — when both humans pick runner, the server spawns up to 3 AI ghosts that path straight toward the runner each tick. Ghosts are visible on the monitor canvas and on the PYNQ sprite BRAM.

---

## Repo structure

```
ServerSide_PYNQ_Raycaster/
│
├── pynq_full/                    # Primary stack — real PYNQ hardware
│   ├── ec2/                      # EC2 server side
│   │   ├── server/               # SEDA pipeline: server.py, t1–t4 modules
│   │   ├── game_logic/           # Pure game rules (anticheat, core_logic, match_state)
│   │   ├── maps/                 # 32×32 .txt map files (chase, ghost_chase, lobby, …)
│   │   ├── monitor/              # Browser monitor: monitor.py (FastAPI SSE), JS, CSS
│   │   ├── player_profiles.py    # Per-player stat tracking
│   │   └── replay_store.py       # S3 replay upload
│   └── interfacing/              # Shared protocol.py for PYNQ ↔ server
│
├── sim_full/                     # Simulator stack — PC node simulation
│   ├── ec2/                      # Mirror of pynq_full/ec2 (simpler role assignment)
│   └── interfacing_+_sim/        # node_simulator.py, protocol.py, PYNQ guides
│
├── jupyter_side/                 # PYNQ board client code (runs on Xilinx PYNQ-Z2)
│   ├── test_package_v4.py        # Main board client: hardware BRAM, auto/manual/replay modes
│   └── launch.py                 # TUI launcher with saved config
│
├── monitor_ui/                   # Monitor front-end build system
│   ├── build.mjs                 # esbuild pipeline — bundles JS + templates → dist/
│   ├── templates/                # pynq-template.html, sim-template.html
│   └── dist/                     # Built output (monitor-ui.js + .gz) — synced to EC2
│
├── datastore/                    # AWS infrastructure
│   ├── dynamodb/                 # Table design, match metadata
│   ├── s3/                       # Replay storage
│   ├── lambda/                   # Post-game stats processor
│   ├── redis/                    # Key schema reference
│   └── infra/                    # EC2 / Redis / DynamoDB setup guides
│
├── tests/                        # pytest suite
│   ├── test_game_logic.py        # Core rules: tagging, match lifecycle, ghosts
│   ├── test_match_modes.py       # Chase and chase-bits mode coverage
│   ├── test_protocol.py          # Packet encode/decode
│   ├── test_pynq_hardware_contract.py  # BRAM format, coordinate system
│   └── …
│
├── docs/                         # Architecture docs and design notes
├── basic/                        # Minimal single-file POC (reference only)
├── sidecar/                      # Standalone sidecar prototype (archived)
├── ref_files/                    # Hardware reference: .hwh, drivers
├── manim_vid/                    # Animated architecture explainer (Manim)
│
├── pynq_dev.sh                   # Dev launcher: pynq_full on EC2 (4-pane tmux)
├── sim_dev2.sh                   # Dev launcher: sim_full on EC2 (6-pane tmux)
├── sshec2.sh                     # Quick SSH to EC2
├── monitor_map_store.py          # Local map library store (used by monitor)
└── raycastpair.pem               # EC2 SSH key (not committed)
```

---

## Dev workflow

### PYNQ hardware (`pynq_dev.sh`)

```bash
./pynq_dev.sh
```

Opens a 4-pane tmux session:

```
┌──────────────┬──────────────┬──────────────┐
│  pynq server │   sidecar    │   monitor    │
├──────────────┴──────────────┴──────────────┤
│              redis stats                   │
└────────────────────────────────────────────┘
```

- Kills any running EC2 processes, `git pull` on EC2, syncs the monitor bundle, launches everything.
- Monitor available at `http://localhost:8080` via SSH tunnel.
- PYNQ nodes connect directly to `EC2:9000` — no simulator panes needed.

### PC simulator (`sim_dev2.sh`)

```bash
./sim_dev2.sh
# Optional: set node usernames
SIM1_USERNAME=alice SIM2_USERNAME=bob ./sim_dev2.sh
```

Opens a 6-pane tmux session:

```
┌────────────────┬────────────┬────────────┐
│   seda server  │  sidecar   │  monitor   │
├────────────────┼────────────┼────────────┤
│   node sim 1   │  node sim 2  │  redis   │
└────────────────┴─────────────┴───────────┘
```

Node simulator panes are pre-loaded — just press `Enter` to connect. Redis tunnel forwarded to `localhost:6380`.

### Monitor front-end

The monitor JS/CSS lives in the source files under `pynq_full/ec2/monitor/` and `sim_full/ec2/monitor/`. After editing:

```bash
cd monitor_ui && node build.mjs
```

The dev scripts rebuild and rsync `monitor_ui/dist/` to EC2 automatically on each launch.

### PYNQ board client

```bash
# Copy to board
scp jupyter_side/test_package_v4.py \
    pynq_full/interfacing/protocol.py \
    jupyter_side/launch.py \
    xilinx@<PYNQ_IP>:/home/xilinx/jupyter_notebooks/Final_project_test/

# Run (on board)
python3 launch.py              # interactive TUI
python3 test_package_v4.py --mode auto --username alice
```

---

## Protocol overview

All packets are UDP to/from `EC2:9000`.

| Packet | Direction | Purpose |
|--------|-----------|---------|
| `PKT_REGISTER (0x20)` | node → server | First contact; carries username and preferred role |
| `PKT_ACK (0x30)` | server → node | Confirms registration; returns assigned player ID |
| `PKT_MAP (0x40)` | server → node | 32×32 map tile BRAM data; sent once after ACK |
| `PKT_BITS_INIT (0x50)` | server → node | Bit pickup positions; sent once at match start |
| `PKT_STATE_UPDATE (0x01)` | node → server | Player position + angle + flags each tick |
| `PKT_GAME_STATE (0x02)` | server → node | All player entries + game mode + bits bitmask |
| `PKT_HEARTBEAT (0x10)` | node → server | Keepalive when not moving |
| `PKT_NODE_MODE (0x60)` | server → node | Switch node between manual / auto / replay modes |
| `PKT_PERF (0x70)` | node → server | Board telemetry (FPS, tick time) every ~2 s |

**Player flags** in `PKT_GAME_STATE`:

| Flag | Meaning |
|------|---------|
| `FLAG_TAGGED (0x02)` | Tagged this tick — triggers spawn snap on node |
| `FLAG_MATCH_END (0x04)` | Match is over |
| `FLAG_GHOST (0x08)` | Server-controlled AI ghost |

**Roles** in `PKT_REGISTER`:

| Value | Role |
|-------|------|
| `ROLE_ANY (0x00)` | No preference — assigned by join order |
| `ROLE_RUNNER (0x01)` | Wants to be runner |
| `ROLE_TAGGER (0x02)` | Wants to be tagger |

---

## Map format

Maps are plain text, exactly 32 columns × 32 rows. Tile characters:

| Char | Meaning |
|------|---------|
| `#` | Wall |
| `.` | Floor |
| `B` | Bit pickup (floor tile, also defines bit positions for `GAME_MODE_CHASE_BITS`) |
| `1` | Player 1 spawn |
| `2` | Player 2 spawn |

Maps are stored in `pynq_full/ec2/maps/`. The monitor's map editor validates the 32×32 constraint and can hot-swap a map onto the live server (takes effect at next match reset via Redis `game:control`).

**BRAM encoding**: columns packed as `word |= 1 << col` (LSB = col 0, matching the HDL). Coordinates use Q6.10 fixed-point (`COORD_FRAC_BITS = 10`).

---

## Monitor

The monitor is a FastAPI server (`monitor.py`) serving a single-page app to the browser via Server-Sent Events. It connects to Redis on localhost and pushes live state to the browser every ~33 ms.

**Tabs:**

| Tab | Purpose |
|-----|---------|
| Game View | Live arena canvas with players, ghosts, bits, spawn markers |
| Server Monitoring | SEDA pipeline health, Redis metrics, event feed |
| Controls & Config | Start/end match, kick players, set ghost count, restart nodes |
| Player Stats | Per-player tag counts and session stats |
| Map Editor | Draw maps in-browser, validate, hot-swap onto live server |
| About | Project info |

The arena canvas uses an OffscreenCanvas-cached static layer (walls, grid, AO, vignette) blitted each frame, with dynamic player glow/pulse, name label pills, and bit collectible animations on top.

---

## Data persistence

| Tier | Store | Contents |
|------|-------|----------|
| Hot | Redis (EC2 localhost:6379) | Live game state, player registry, event stream, match control |
| Warm | DynamoDB (`pynq-raycaster-seda-matches`, eu-west-2) | Match metadata, per-player stats, recent match list |
| Cold | S3 | Compressed NDJSON replay files, archived match data |

The **sidecar** (`replay_store.py` + sidecar process) watches `game:events` in Redis and writes to DynamoDB/S3 on match end. It is fully decoupled from the game loop — AWS latency never blocks T2.

Match IDs follow the format `match-YYYYMMDD-HHMMSS`.

---

## Tests

```bash
python -m pytest tests/
```

Key test files:

| File | Covers |
|------|--------|
| `test_game_logic.py` | Tagging, match end, ghost spawning, bit collection |
| `test_match_modes.py` | Chase vs chase-bits mode detection and rules |
| `test_protocol.py` | Packet encode/decode round-trips |
| `test_pynq_hardware_contract.py` | BRAM column encoding, coordinate Q6.10 format |
| `test_server_latency.py` | T2 tick timing under load |
| `test_bottleneck_fixes.py` | Anti-cheat, speed cap, sequence validation |

---

## Infrastructure

- **EC2:** `ubuntu@3.9.71.204`, SSH key `raycastpair.pem` at repo root
- **UDP game server:** port 9000
- **Monitor:** port 8080 (tunnelled to localhost:8080 by dev scripts)
- **Redis:** EC2 localhost:6379, tunnelled to local port 6380 via dev scripts
- **DynamoDB table:** `pynq-raycaster-seda-matches`, region `eu-west-2`

---

## Reference

- `docs/architecture_full.md` — detailed SEDA pipeline design
- `docs/threading_model.md` — asyncio + thread boundary rationale
- `docs/storage_design.md` — hot/warm/cold tier design
- `pynq_full/ec2/maps/README.md` — map authoring guide
- `pynq_full/interfacing/INTERFACING_NOTES.md` — node ↔ server protocol details
- `sim_full/interfacing_+_sim/PYNQ_TO_EC2.md` — porting sim code to real PYNQ board
- `ref_files/hardware/` — `.hwh` bitstream descriptor, IP block parameters
