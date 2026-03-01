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
        resp = dyndb.scan(
            FilterExpression="record_type = :rt",
            ExpressionAttributeValues={":rt": "META"},
            ProjectionExpression="match_id, #s, #ts",
            ExpressionAttributeNames={"#s": "status", "#ts": "timestamp"},
            Limit=10,
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

    # ops/sec breakdown: T4 does ~5 HSETs + occasional LPUSHes per tick at 20Hz
    # = ~100 ops/sec for 2 players. Formula: 2 players × 20Hz × ~2-3 cmds each.
    events_raw   = r.lrange("game:seda-events", 0, 9)   # last 10 events
    events_total = r.llen("game:seda-events")            # total events ever pushed

    return {
        "players": players,
        "redis": {
            "ops_per_sec":       info.get("instantaneous_ops_per_sec", 0),
            "mem_used":          mem.get("used_memory_human", "?"),
            "connected_clients": clients.get("connected_clients", 0),
            "blocked_clients":   clients.get("blocked_clients", 0),
            "total_commands":    info.get("total_commands_processed", 0),
            "keyspace_hits":     info.get("keyspace_hits", 0),
            "keyspace_misses":   info.get("keyspace_misses", 0),
            "rdb_last_save":     persist.get("rdb_last_bgsave_status", "?"),
        },
        "pipeline": {
            # In-process queue depths not visible from outside; server logs them.
            # We expose what we CAN measure from Redis.
            "players_online":  len(players),
            "events_in_list":  events_total,   # game:seda-events LLEN
            "sidecar_blocked": clients.get("blocked_clients", 0),  # BRPOP waiting
            "ops_per_sec":     info.get("instantaneous_ops_per_sec", 0),
            "ddb_matches":     len(_ddb_cache),
        },
        "events":  [json.loads(e) for e in events_raw if e],
        "matches": poll_dynamodb(),
    }

# ── WebSocket handler ──────────────────────────────────────────────────────────

async def ws_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    print(f"[monitor] browser connected from {request.remote}")
    try:
        while not ws.closed:
            try:
                state = collect_state()
                await ws.send_str(json.dumps(state))
            except Exception as e:
                print(f"[monitor] collect error: {e}")
            await asyncio.sleep(1 / PUSH_RATE_HZ)
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
