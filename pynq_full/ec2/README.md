# ec2/

This is the live server-side runtime.

## Core runtime

- [server.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/server.py)
  - starts the SEDA pipeline
- [t1_udp_receiver.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/t1_udp_receiver.py)
  - UDP ingress on port `9000`
- [t2_game_tick.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/t2_game_tick.py)
  - 20 Hz authoritative game tick
- [t3_broadcaster.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/t3_broadcaster.py)
  - UDP fan-out to clients
- [t4_redis_writer.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/t4_redis_writer.py)
  - writes live state and events to Redis

## Support services

- [monitor/monitor.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/monitor/monitor.py)
  - live monitor backend, replay API, EC2 control actions
- [monitor/index.html](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/monitor/index.html)
  - browser UI for live state and replay playback
- [sidecar/sidecar.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/sidecar/sidecar.py)
  - persistence, replay upload, SNS trigger, warm-tier retention

## Game logic

`game_logic/` contains the C++ helpers used for compute-heavy primitives:

- ray casting
- line-of-sight
- anti-cheat / movement validation
- node registry helpers

## Runtime shape

```text
UDP -> T1 -> T2 -> T3 -> clients
             |
             +-> T4 -> Redis -> sidecar -> DynamoDB / S3 / SNS
```

## Notes

- the Python runtime path is live
- the monitor is live
- replay capture and S3 playback are live
- Lambda post-match processing is live

---

## Tick Rate / Latency Optimisations

Tick rate (`TICK_RATE` in `server.py`) is a one-line change. The server loop has plenty of
headroom (~0.02ms per tick). The real bottleneck is **network latency**, not Hz.

PYNQ boards on physical ethernet to the same router skip WSL NAT entirely — that's where
60 Hz becomes genuinely felt vs the current WSL simulator setup.

**Optimisations worth implementing:**

- **Client-side prediction** — node moves locally each tick without waiting for server
  confirmation; server corrects only if it disagrees. Eliminates perceived lag. Standard in
  all modern multiplayer (Quake, Source engine). Highest impact improvement available.
- **Interpolation** — FPGA renders smoothly between the last two server positions instead of
  snapping on each update. Costs one tick of added latency, removes visual jitter entirely.
- **Decouple Redis writes from tick rate** — T4 currently writes every tick. At 128+ Hz
  that's 256+ writes/sec. Write every N ticks or on state-change only to keep Redis load flat.
