# TODO / Architecture Weaknesses
_2026-03-01_

## What is currently proven

- **SEDA pipeline working end-to-end:** T1 receives UDP, T2 runs 20Hz game loop, T3 broadcasts state back to nodes, T4 writes to Redis (pipelined, threaded)
- **Hybrid concurrency:** T1/T2/T3 asyncio event loop + T4 OS thread with SimpleQueue boundary — correct and running
- **Tag detection:** proximity check fires, FLAG_TAGGED set server-side, broadcast to clients
- **Redis integration:** HSET player positions every tick, LPUSH match events on tag/match_start
- **Sidecar pattern:** sidecar.py BRPOP-blocks on Redis, writes match records to DynamoDB on events
- **DynamoDB persistence:** META record on match_start, TAG#N records on player_tagged, status update on match_end
- **node_simulator:** two simulated nodes orbit, intersect, trigger tags automatically
- **dev.sh:** one-command tmux session (5 panes: server, sidecar, 2x node sims, redis stats)

## NOT yet done (no Lambda, no S3)

- No Lambda functions — DynamoDB writes done directly from sidecar process
- No S3 — no object storage, no replay files, no match history exports
- No ElastiCache — Redis still on localhost
- No match_end trigger — only fires on server Ctrl+C

---

## Next: Monitor (priority 1) — DONE

- **`ec2/monitor/monitor.py`:** aiohttp server on port 8080 — reads Redis every 100ms, pushes JSON via WebSocket `/ws`
- **`ec2/monitor/index.html`:** 2D canvas — player dots, TAG_RADIUS ring, direction arrow, distance line; Redis metrics panel; match event log
- **dev.sh pane 5:** SSH tunnel `-L 8080:localhost:8080` + launches monitor.py — open `http://localhost:8080` in browser
- **Still to do:** pip install aiohttp on EC2 venv if not already present

## Known weaknesses

- **No player timeout:** players never removed from `self.players` on disconnect; ghost state persists
- **No match lifecycle reset:** `match_started` never clears; rematches broken
- **Unbounded write_queue:** no cap on SimpleQueue; Redis outage fills it silently
- **Single event loop = single core:** T1/T2/T3 share one CPU; raycasting at scale would starve T1/T3
- **BRPOP is LIFO:** use `RPUSH` + `BLPOP` to fix event ordering under burst

## Infrastructure TODOs

- **Redis localhost:** swap to ElastiCache endpoint before multi-instance deployment
- **match_end trigger:** implement win condition in T2 `_check_match_end()` stub
- **Player auth / rate limiting:** T1 accepts any UDP packet; no flood protection
- **C++ game logic:** `_check_shooting()` stub in T2 needs raycaster `is_visible()` wired in
- **Lambda candidate:** match_end DynamoDB update — T4 pushes to SNS, Lambda does update_item
- **S3 candidate:** match replay export — sidecar writes full match JSON to S3 on match_end

---

## Why Redis is on localhost

`REDIS_HOST = "127.0.0.1"` is intentional for the EC2 dev prototype — loopback Redis gives sub-millisecond latency and zero cost. Swap to ElastiCache endpoint in one line when scaling to multiple instances.
