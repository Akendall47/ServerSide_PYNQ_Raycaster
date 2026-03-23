# ec2/

This is the live server-side runtime.

## Core runtime

- [server.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/server.py)
  - starts the reactor pipeline (SEDA-inspired)
- [t1_udp_receiver.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/t1_udp_receiver.py)
  - UDP ingress on port `9000`
- [t2_game_tick.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/server/t2_game_tick.py)
  - 60 Hz authoritative game tick
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
