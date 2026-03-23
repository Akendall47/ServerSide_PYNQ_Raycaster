# server/

Reactor game server (SEDA-inspired pipeline) for the PYNQ raycaster. Runs on EC2, listens on UDP port 9000.

## Files

| File | Role |
|------|------|
| `server.py` | Entry point. Wires up queues, starts T1–T4 as asyncio tasks + OS thread. |
| `t1_udp_receiver.py` | T1: UDP recv loop. Owns the port-9000 socket; enqueues packets for T2. |
| `t2_game_tick.py` | T2: 60 Hz game loop. Thin orchestrator; drains packets, ticks logic, pushes broadcasts. |
| `t2_packet_handler.py` | T2 sub: packet ingestion, player registration, board slots, ghost/replay control. |
| `t2_game_tick.py` | T2 sub: board replay streamer, Redis pubsub control subscriber. |
| `t2_redis_io.py` | T2 sub: builds UDP broadcast packets and enqueues Redis writes each tick. |
| `t2_map_loader.py` | Parses `.txt` map files into the shared `map_state` dict. |
| `t2_constants.py` | All tunable constants (tick rate, timeouts, spawn angles, Redis keys). |
| `t3_broadcaster.py` | T3: fans each broadcast message out to all connected node addresses. |
| `t4_redis_writer.py` | T4: OS thread; drains the write queue to Redis (HSET / LPUSH / DEL). |

## Pipeline

```
UDP in --> T1 (packet_queue) --> T2 (game loop) --> T3 (broadcast_queue) --> UDP out
                                      |
                                      v
                              T4 (write_queue) --> Redis
```

T1 and T3 share the same port-9000 socket so outgoing broadcasts have the correct source port for WSL NAT traversal.
