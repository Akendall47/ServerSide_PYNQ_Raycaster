# FPGA-Accelerated Raycasting Game Engine SDK — Proposition

## What it is

A Python SDK for building multiplayer games where the raycasting computation runs on FPGA hardware (PYNQ boards), with the game server hosted on EC2.

The SDK handles the hard infrastructure parts — network pipeline, packet protocol, FPGA acceleration, persistence — so the user only writes their game logic.

---

## The pitch

> "Bring your own AWS account. The SDK gives you a production-ready multiplayer game server with FPGA-accelerated raycasting out of the box. Write your game logic, not your infrastructure."

---

## What the SDK provides

| Component | What it does |
|---|---|
| SEDA server pipeline | T1→T2→T3→T4 asyncio architecture, fixed tick loop, queue wiring |
| Binary UDP protocol | Packet format, pack/unpack helpers, versioning |
| FPGA raycaster | C++ compiled extension for PYNQ; CPU fallback on standard hardware |
| Sidecar | Redis → DynamoDB persistence, pluggable event handlers |
| Client library | Node simulator and PYNQ client — what runs on the edge device |

## What the user provides

| Component | What it is |
|---|---|
| Game logic | On-tick rules, win conditions, player interactions |
| Map | Wall layout passed to the raycaster |
| AWS config | ElastiCache endpoint, DynamoDB table, EC2 IAM role |

---

## How it would be used

### 1. One-time AWS setup (documented, not automated)

```
1. Create DynamoDB table: your-game-matches
   - Partition key: match_id  (String)
   - Sort key:      record_type (String)

2. Launch EC2 instance with IAM role:
   - AmazonDynamoDBFullAccess
   - AmazonElastiCacheFullAccess

3. Copy config.example.yaml → config.yaml and fill in your endpoints
```

### 2. Write your game

```python
from raycaster_sdk import GameServer
from raycaster_sdk.protocol import FLAG_SHOOTING

def my_rules(players, tick):
    for p in players:
        if p.flags & FLAG_SHOOTING:
            # handle shot — user defines what this means
            pass

server = GameServer.from_config("config.yaml")
server.on_tick(my_rules)
server.run()
```

### 3. Run on PYNQ node

```python
from raycaster_sdk.client import Node

node = Node(server="ec2-ip", port=9000)
node.run()   # sends position at 20 Hz, receives game state back
```

FPGA acceleration is transparent — the SDK detects PYNQ hardware automatically and falls back to CPU otherwise. A developer without a PYNQ board can build and test their game entirely in software.

---

## What makes it novel

There are hundreds of game server SDKs. There are no FPGA-accelerated ones.

Raycasting is the expensive per-frame computation in this class of game. Offloading it to FPGA fabric on PYNQ is a genuine research and performance differentiator — not just a software architecture choice.

---

## Target audience

| Audience | Value |
|---|---|
| Academic / FPGA researchers | Novel — no comparable open SDK exists |
| Embedded / IoT game prototyping | Real low-latency multiplayer on constrained hardware |
| Portfolio / research publication | Demonstrates full-stack hardware-software co-design |

Game jam developers are not the target — they won't have PYNQ hardware. The audience is people who already work with FPGAs and want a complete game engine stack to build on.

---

## Architecture overview

```
PYNQ Node (client SDK)
      │  UDP 24-byte packet
      ▼
EC2 SEDA Server (server SDK)
  T1 UDPReceiver  → packet_queue   → T2 GameTick
  T2 GameTick     → broadcast_queue → T3 Broadcaster  → UDP back to nodes
  T2 GameTick     → write_queue    → T4 RedisWriter   → ElastiCache Redis
                                                             │
                                                       sidecar (SDK)
                                                             │
                                                        DynamoDB
```

C++ raycaster runs inside T2 as a compiled Python extension (`.so`), called via `ctypes` or `pybind11`. On non-PYNQ hardware it compiles to a standard x86 binary — same interface, CPU execution.

---

## SDK vs this repo

This repo is the **reference implementation** — one specific game (tag) using the full stack.

The SDK fork would:
1. Strip out game-specific logic (tag rules, shoot/tagged flags)
2. Expose clean interfaces (`on_tick`, `on_event`, pluggable flags)
3. Add `pyproject.toml` for `pip install`
4. Replace hardcoded AWS config with `config.yaml`
5. Publish to PyPI or distribute via GitHub

The core architecture does not change — the SDK is this repo with the game-specific bits made configurable.

---

## FPGA hardware packaging

The FPGA acceleration has two layers that need distributing:

| Layer | What it is | How distributed |
|---|---|---|
| Python/C++ code | Raycaster logic | pip / GitHub — straightforward |
| Bitstream (`.bit` file) | Hardware configuration that programs the FPGA fabric | Bundled in pip package or downloaded from GitHub Releases on first run |

The bitstream is compiled once in Vivado HLS and targets a specific board. It cannot be shared across board types — a PYNQ-Z2 bitstream will not run on a ZCU104.

**v0.1 targets one board only.** This is the sensible approach and is exactly what Xilinx's own PYNQ overlays do. The Python API does not change if more boards are added later — it's just a recompile and an additional `.bit` file in the release.

On the PYNQ node the overlay loads transparently:

```python
from raycaster_sdk.fpga import RaycasterOverlay

ol = RaycasterOverlay.load()   # loads the .bit for your board automatically
```

On non-PYNQ hardware the overlay load is skipped and the C++ CPU fallback runs instead — same API, no code changes required from the user.

**Supported hardware: PYNQ-Z2 (v0.1)**

Adding a new board in future = recompile HLS in Vivado, add `.bit` to release. The SDK and user code are unaffected.

---

## When to do this

**Finish the pipeline first.**

The SDK story only holds once:
- The full SEDA server is running (T1→T4 complete)
- Real PYNQ nodes are sending packets (not just simulator)
- The C++ raycaster is implemented and benchmarked vs CPU

Once those are done, the API boundaries will be obvious from how the code is already being used. The fork and packaging work is then straightforward.

Current status: `basic/` reference stack proven end-to-end. `ec2/` SEDA server skeleton in place — T1 complete, T2–T4 to implement.
