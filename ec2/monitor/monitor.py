# ec2/monitor/monitor.py
#
# Live monitor server — runs on EC2 alongside the SEDA stack.
#
# Serves index.html over HTTP on port 8080, and pushes live game state
# to the browser over WebSocket on the same port (/ws).
#
# Data sources:
#   Redis (local):   HGET player:1/2, INFO stats/memory/clients, LRANGE game:seda-events
#   DynamoDB:        scan last 5 matches (polled every 5s, not every tick)
#
# No changes to T1/T2/T3/T4 required.
#
# Run on EC2:
#   source ~/venv/bin/activate
#   pip install aiohttp
#   python3 ec2/monitor/monitor.py
#
# Access from laptop (via SSH tunnel set up by dev.sh):
#   http://localhost:8080

import asyncio
import json
import os
import time
import redis as redislib
import boto3
from aiohttp import web

REDIS_HOST   = "127.0.0.1"
REDIS_PORT   = 6379
HTTP_PORT    = 8080
PUSH_RATE_HZ = 10   # push to browser at 10 Hz

DYNAMO_TABLE = "pynq-raycaster-seda-matches"
AWS_REGION   = "eu-west-2"

# ── Connections ────────────────────────────────────────────────────────────────

r     = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
dyndb = boto3.resource("dynamodb", region_name=AWS_REGION).Table(DYNAMO_TABLE)

# ── DynamoDB poll (slow — every 5s) ───────────────────────────────────────────

_ddb_cache      = []
_ddb_last_fetch = 0.0

def poll_dynamodb():
    global _ddb_cache, _ddb_last_fetch
    now = time.monotonic()
    if now - _ddb_last_fetch < 5.0:
        return _ddb_cache
    try:
        # Limit applies per page before filtering, so use a large value to ensure
        # we get enough META records back after the FilterExpression is applied.
        resp = dyndb.scan(
            FilterExpression="record_type = :rt",
            ExpressionAttributeValues={":rt": "META"},
            ProjectionExpression="match_id, #s, #ts",
            ExpressionAttributeNames={"#s": "status", "#ts": "timestamp"},
            Limit=100,
        )
        items = sorted(resp.get("Items", []),
                       key=lambda x: x.get("timestamp", ""), reverse=True)[:5]
        _ddb_cache = [
            {"match_id": i["match_id"],
             "status":   i.get("status", "?"),
             "timestamp": i.get("timestamp", "")[:19].replace("T", " ")}
            for i in items
        ]
        _ddb_last_fetch = now
    except Exception as e:
        print(f"[monitor] DynamoDB poll error: {e}")
    return _ddb_cache

# ── Event accumulator (append-only, survives BRPOP draining the Redis list) ───
#
# BRPOP in sidecar.py removes events from game:seda-events as it reads them,
# so LLEN shrinks and index-based "new event" detection breaks.
# Instead: monitor reads whatever events are currently in the list each tick,
# and deduplicates by content hash into a local append-only log.

_event_log  = []          # [{event, ts, ...}, ...] newest first
_event_seen = set()       # set of json strings already logged

def accumulate_events(raw_events: list):
    """Merge raw_events (from LRANGE, may be partial) into _event_log."""
    added = 0
    for e in raw_events:
        key = json.dumps(e, sort_keys=True)
        if key not in _event_seen:
            _event_seen.add(key)
            _event_log.insert(0, e)
            added += 1
    # Cap log at 200 entries
    del _event_log[200:]
    return added

# ── Redis state collection ─────────────────────────────────────────────────────

def collect_state():
    players = []
    for pid in range(1, 10):
        raw = r.hgetall(f"player:{pid}")
        if not raw:
            break
        players.append({
            "id":    pid,
            "x":     float(raw.get("x", 0)),
            "y":     float(raw.get("y", 0)),
            "angle": float(raw.get("angle", 0)),
            "flags": int(raw.get("flags", 0)),
        })

    info    = r.info("stats")
    mem     = r.info("memory")
    clients = r.info("clients")
    persist = r.info("persistence")

    # game:monitor-events is written by T4 alongside game:seda-events but
    # never drained by the sidecar — so every event is visible here.
    events_raw = r.lrange("game:monitor-events", 0, 49)
    parsed     = [json.loads(e) for e in events_raw if e]
    accumulate_events(parsed)
    events_in_list = r.llen("game:seda-events")

    n_clients = clients.get("connected_clients", 0)
    blocked   = clients.get("blocked_clients", 0)
    player_count = len(players)
    probe_misses = 1 if player_count < 9 else 0
    monitor_reads_per_push = player_count + probe_misses
    baseline_clients = 3  # T4 RedisWriter + sidecar + monitor process

    return {
        "players": players,
        "redis": {
            "ops_per_sec":       info.get("instantaneous_ops_per_sec", 0),
            "mem_used":          mem.get("used_memory_human", "?"),
            "connected_clients": n_clients,
            "blocked_clients":   blocked,
            "keyspace_hits":     info.get("keyspace_hits", 0),
            "keyspace_misses":   info.get("keyspace_misses", 0),
            "active_clients":    max(0, n_clients - blocked),
            "extra_clients":     max(0, n_clients - baseline_clients),
            "baseline_clients":  baseline_clients,
            "monitor_reads_per_push": monitor_reads_per_push,
            "monitor_probe_misses_per_push": probe_misses,
            "hit_rate":          (
                round(
                    (100.0 * info.get("keyspace_hits", 0)) /
                    max(1, info.get("keyspace_hits", 0) + info.get("keyspace_misses", 0)),
                    1,
                )
            ),
        },
        "pipeline": {
            "players_online":  player_count,
            "events_in_list":  events_in_list,
            "sidecar_blocked": blocked,
            "ops_per_sec":     info.get("instantaneous_ops_per_sec", 0),
            "ddb_matches":     len(_ddb_cache),
        },
        "events":  _event_log[:20],   # send newest 20 to browser
        "matches": poll_dynamodb(),
    }

# ── WebSocket handler ──────────────────────────────────────────────────────────

async def ws_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    print(f"[monitor] browser connected from {request.remote}")
    try:
        while not ws.closed:
            # Push state to browser
            try:
                state = collect_state()
                await ws.send_str(json.dumps(state))
            except Exception as e:
                print(f"[monitor] collect error: {e}")

            # Check for incoming browser commands (non-blocking, timeout = one push interval)
            try:
                msg = await asyncio.wait_for(ws.receive(), timeout=1 / PUSH_RATE_HZ)
                if msg.type == web.WSMsgType.TEXT:
                    data = json.loads(msg.data)
                    if data.get("cmd") == "restart":
                        payload = json.dumps({"cmd": "restart"})
                        r.publish("game:control", payload)
                        print(f"[monitor] restart signal → Redis game:control (pub/sub)")
            except asyncio.TimeoutError:
                pass  # normal — no message from browser this tick
            except Exception:
                pass
    finally:
        print(f"[monitor] browser disconnected")
    return ws

# ── Static file handler ────────────────────────────────────────────────────────

async def index_handler(request):
    here = os.path.dirname(__file__)
    return web.FileResponse(os.path.join(here, "index.html"))

# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    app = web.Application()
    app.router.add_get("/",   index_handler)
    app.router.add_get("/ws", ws_handler)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", HTTP_PORT)
    await site.start()
    print(f"[monitor] http://localhost:{HTTP_PORT}  (WebSocket: ws://localhost:{HTTP_PORT}/ws)")
    await asyncio.sleep(float("inf"))

if __name__ == "__main__":
    asyncio.run(main())
