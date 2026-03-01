# TODO / Architecture Weaknesses
_2026-03-01_

## Known weaknesses

- **No player timeout:** players never removed from `self.players` on disconnect; ghost state persists, Redis/broadcast keeps running for dead nodes
- **No match lifecycle reset:** `match_started` never clears; rematches and 3rd-player joins are broken
- **Unbounded write_queue:** `SimpleQueue` has no cap; Redis outage → T2 silently fills queue at 20Hz×N players
- **Single event loop = single core:** T1/T2/T3 share one CPU thread; expensive game logic (raycasting, many players) starves T1/T3
- **BRPOP is LIFO:** `LPUSH` + `BRPOP` processes events newest-first; under burst `match_end` can arrive before `player_tagged`; fix: use `RPUSH` + `BLPOP`

## Dashboard (next feature)

- **Game visualiser:** localhost web page showing live player positions as dots on a 2D canvas, tag events as flashes — driven by T3 broadcast state via WebSocket
- **Server metrics panel:** queue depths (pkt_q, bcast_q, write_q), tick_ms, player count — polled from T2's existing metrics via a small HTTP endpoint
- **Redis monitor panel:** `redis-cli --stat` equivalent in browser — ops/sec, memory, connected clients
- **Match event log:** stream of `match_start`, `player_tagged`, `match_end` events from the sidecar/DynamoDB
- **Transport:** T3 already has a `_send_websocket` stub — add a `websockets` server there, push the same game state JSON the UDP clients get

## Infrastructure TODOs

- **Redis localhost:** currently `127.0.0.1:6379` (see below); should point to ElastiCache for production
- **match_end trigger:** no explicit end condition yet; currently only fires on server Ctrl+C (SIGINT handler)
- **Player auth / rate limiting:** T1 accepts any UDP packet; no source validation or flood protection
- **C++ game logic:** `_check_shooting()` and `_check_match_end()` stubs in T2; need raycaster `is_visible()` wired in

---

## Why Redis is on localhost

`REDIS_HOST = "127.0.0.1"` in both `t4_redis_writer.py` and `sidecar.py` is **intentional for the EC2 dev prototype** — Redis runs as a local process on the same instance, which gives sub-millisecond latency and zero network cost.

For production the swap is one line in each file → ElastiCache endpoint. The `t4_redis_writer.py` comment already flags this:
```
REDIS_HOST = "127.0.0.1"   # change to ElastiCache endpoint on real EC2
```

**It's naive only if left there in production.** For a 2-player demo on one EC2 instance it's the right default — ElastiCache adds ~0.5ms RTT and a monthly cost for no benefit at this scale.
