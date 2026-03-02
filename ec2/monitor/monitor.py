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
PUSH_RATE_HZ = 20   # push to browser at 20 Hz (match game tick rate)
DDB_POLL_INTERVAL_S = 2.0

DYNAMO_TABLE = "pynq-raycaster-seda-matches"
AWS_REGION   = "eu-west-2"

# ── Connections ────────────────────────────────────────────────────────────────

r     = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
dyndb = boto3.resource("dynamodb", region_name=AWS_REGION).Table(DYNAMO_TABLE)

# ── DynamoDB poll (slow — every 5s) ───────────────────────────────────────────

_ddb_cache      = []
_ddb_last_fetch = 0.0

def _as_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default

def poll_dynamodb():
    global _ddb_cache, _ddb_last_fetch
    now = time.monotonic()
    if now - _ddb_last_fetch < DDB_POLL_INTERVAL_S:
        return _ddb_cache
    try:
        # Without a GSI on timestamp, the only correct "recent matches" view is
        # to scan all META rows, then sort locally. The table is still small.
        items = []
        last_evaluated_key = None
        while True:
            kwargs = {
                "FilterExpression": "record_type = :rt",
                "ExpressionAttributeValues": {":rt": "META"},
                "ProjectionExpression": "match_id, #s, #ts",
                "ExpressionAttributeNames": {"#s": "status", "#ts": "timestamp"},
            }
            if last_evaluated_key:
                kwargs["ExclusiveStartKey"] = last_evaluated_key

            resp = dyndb.scan(**kwargs)
            items.extend(resp.get("Items", []))
            last_evaluated_key = resp.get("LastEvaluatedKey")
            if not last_evaluated_key:
                break

        items = sorted(items, key=lambda x: x.get("timestamp", ""), reverse=True)[:5]
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

# ── Current-match event tracking ───────────────────────────────────────────────
#
# game:monitor-events is append-only (trimmed to the last 100 entries).
# The monitor only wants the latest match's sequence:
#   match_start -> player_tagged -> ... -> match_end
# We keep a tiny local cache only to preserve stable display timestamps while
# new events are prepended to the Redis list.

_match_event_log  = []   # newest first, each event includes display_time
_match_event_keys = []   # newest first json keys matching _match_event_log

def _event_key(event: dict) -> str:
    return json.dumps(event, sort_keys=True)

def current_match_events(raw_events: list):
    """Return the newest match's events only, newest first, with stable times."""
    global _match_event_log, _match_event_keys

    current = []
    found_start = False
    for event in raw_events:
        current.append(event)
        if event.get("event") == "match_start":
            found_start = True
            break

    if not current:
        _match_event_log = []
        _match_event_keys = []
        return []

    # If the newest event is match_start, this is a fresh match boundary.
    # Reset immediately even though the payload is identical every match.
    if current[0].get("event") == "match_start":
        stamp = time.strftime("%H:%M:%S")
        _match_event_log = [{**current[0], "display_time": stamp}]
        _match_event_keys = [_event_key(current[0])]
        return _match_event_log

    # In normal flow the latest match always fits in the last 50 events.
    # If we somehow don't have a full boundary yet, keep the last complete view.
    if not found_start:
        return _match_event_log

    current_keys = [_event_key(event) for event in current]
    old_keys     = _match_event_keys
    old_events   = _match_event_log

    common_suffix = 0
    while common_suffix < len(current_keys) and common_suffix < len(old_keys):
        if current_keys[-1 - common_suffix] != old_keys[-1 - common_suffix]:
            break
        common_suffix += 1

    prefix_len = len(current) - common_suffix
    stamp = time.strftime("%H:%M:%S")
    rebuilt = []

    for idx in range(prefix_len):
        rebuilt.append({**current[idx], "display_time": stamp})

    if common_suffix:
        rebuilt.extend(old_events[-common_suffix:])

    _match_event_log = rebuilt
    _match_event_keys = current_keys
    return _match_event_log

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
    client_rows = r.client_list()

    # game:monitor-events is written by T4 alongside game:seda-events but
    # never drained by the sidecar — so every event is visible here.
    events_raw = r.lrange("game:monitor-events", 0, 49)
    parsed     = [json.loads(e) for e in events_raw if e]
    match_events = current_match_events(parsed)
    events_in_list = r.llen("game:seda-events")
    matches = poll_dynamodb()

    n_clients = _as_int(clients.get("connected_clients", 0))
    blocked   = _as_int(clients.get("blocked_clients", 0))
    pubsub_clients = sum(
        1 for row in client_rows
        if _as_int(row.get("sub", 0)) > 0 or _as_int(row.get("psub", 0)) > 0
    )
    direct_clients = max(0, n_clients - blocked - pubsub_clients)

    player_probe_reads = min(9, len(players) + 1)
    monitor_cmds_per_push = player_probe_reads + 6  # 3x INFO + CLIENT LIST + LRANGE + LLEN

    return {
        "players": players,
        "redis": {
            "ops_per_sec":       info.get("instantaneous_ops_per_sec", 0),
            "mem_used":          mem.get("used_memory_human", "?"),
            # clients breakdown: server(T4) + sidecar + monitor + redis-cli = 4
            "connected_clients": n_clients,
            "blocked_clients":   blocked,
            # blocked=1 is normal: sidecar sleeping on BRPOP waiting for next event
            "keyspace_hits":     info.get("keyspace_hits", 0),
            "keyspace_misses":   info.get("keyspace_misses", 0),
            "pubsub_clients":    pubsub_clients,
            "direct_clients":    direct_clients,
            "monitor_push_hz":   PUSH_RATE_HZ,
            "monitor_cmds_per_push": monitor_cmds_per_push,
            "monitor_cmds_per_sec": monitor_cmds_per_push * PUSH_RATE_HZ,
        },
        "pipeline": {
            "players_online":  len(players),
            "events_in_list":  events_in_list,
            "sidecar_blocked": blocked,
            "ops_per_sec":     info.get("instantaneous_ops_per_sec", 0),
            "ddb_matches":     len(matches),
        },
        "events":  match_events[:20],   # newest-first, current match only
        "matches": matches,
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
