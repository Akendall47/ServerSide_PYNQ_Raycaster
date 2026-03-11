# Repo Structure

```
ServerSide_PYNQ_Raycaster/
│
├── dev.sh              # Sim dev session (6-pane tmux) — runs sim_full stack on EC2
├── pynq_dev.sh         # PYNQ dev session (4-pane tmux) — runs pynq_full stack on EC2
├── raycastpair.pem     # SSH key for EC2 (gitignored)
│
├── sim_full/           # Simulator-based full implementation (tested, working)
│   ├── ec2/            # EC2 server stack used by dev.sh
│   │   ├── server/     # SEDA server: t1 UDP rx, t2 game tick, t3 broadcast, t4 Redis
│   │   ├── sidecar/    # Redis → DynamoDB match recorder
│   │   └── monitor/    # Web dashboard (port 8080), index.html
│   └── interfacing_+_sim/
│       ├── protocol.py     # Packet format (sim source of truth)
│       └── node_simulator.py  # Laptop-side node simulator (2 instances per game)
│
├── pynq_full/          # PYNQ board implementation — active development target
│   ├── ec2/            # EC2 server stack used by pynq_dev.sh (diverges from sim over time)
│   │   ├── server/     # SEDA server (same structure as sim, will gain PYNQ-specific logic)
│   │   ├── sidecar/    # Redis → DynamoDB
│   │   ├── monitor/    # Web dashboard (port 8080)
│   │   └── game_logic/ # C++ server-side game logic (anticheat, raycaster, node manager)
│   └── interfacing/
│       └── protocol.py     # Packet format (pynq source of truth — edit this one)
│
├── basic/              # Minimal proof-of-concept UDP echo stack (reference only)
│   ├── protocol/
│   ├── server/
│   ├── client/
│   └── sidecar/
│
├── datastore/          # Shared cloud infrastructure (used by both sim and pynq)
│   ├── dynamodb/       # Table schemas
│   ├── redis/          # Redis config
│   ├── s3/             # S3 bucket config
│   ├── lambda/         # Lambda functions
│   ├── sidecar/        # Standalone sidecar scripts
│   └── infra/          # Deploy scripts
│
├── dashboard/          # Standalone dashboard assets (root-level, future use)
├── docs/               # Architecture notes, diagrams
└── tests/              # Protocol and integration tests
```

## Dev workflows

| Command        | What it does                                                      |
|----------------|-------------------------------------------------------------------|
| `./sim_dev.sh` | Kills EC2 procs, git-resets EC2, launches 6-pane tmux for sim    |
| `./pynq_dev.sh`| Same but for pynq_full — no node sim panes (PYNQ boards connect) |

## EC2
- Host: `ubuntu@3.9.71.204`
- UDP game server: port 9000
- Monitor dashboard: port 8080 (SSH-tunnelled to localhost)
- Redis: EC2 localhost:6379, tunnelled to local 6380 via `dev.sh`

## Protocol source of truth
- **Sim**: `sim_full/interfacing_+_sim/protocol.py`
- **PYNQ**: `pynq_full/interfacing/protocol.py` ← edit this for PYNQ development
