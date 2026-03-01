# ec2/monitor/monitor.py
#
# Live monitor server — runs on EC2 alongside the SEDA stack.
#
# Serves index.html over HTTP on port 8080, and pushes live game state
# to the browser over WebSocket on the same port (/ws).
#
# Data sources (all local Redis reads — zero coupling to server internals):
#   HGET player:1 / player:2  → x, y, angle, flags  (set by T4 every tick)
#   INFO server / stats        → redis ops/sec, memory, clients
#   GET  game:seda-events      → last match event (via LRANGE)
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
import redis as redislib
from aiohttp import web

REDIS_HOST   = "127.0.0.1"
REDIS_PORT   = 6379
HTTP_PORT    = 8080
PUSH_RATE_HZ = 10   # push to browser at 10 Hz (no need to match server's 20 Hz)

# ── Redis connection ───────────────────────────────────────────────────────────

r = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

# ── Data collection ───────────────────────────────────────────────────────────

def collect_state():
    """Read all dashboard data from Redis in one go."""
    players = []
    for pid in range(1, 10):   # scan player:1 .. player:9
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

    # Redis INFO — ops/sec, memory, connected clients
    info = r.info("stats")
    mem  = r.info("memory")
    clients = r.info("clients")

    # Last 5 match events
    events = r.lrange("game:seda-events", 0, 4)

    return {
        "players": players,
        "redis": {
            "ops_per_sec":      info.get("instantaneous_ops_per_sec", 0),
            "mem_used":         mem.get("used_memory_human", "?"),
            "connected_clients": clients.get("connected_clients", 0),
            "blocked_clients":  clients.get("blocked_clients", 0),
        },
        "events": [json.loads(e) for e in events if e],
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
                print(f"[monitor] Redis read error: {e}")
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
    app.router.add_get("/",    index_handler)
    app.router.add_get("/ws",  ws_handler)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", HTTP_PORT)
    await site.start()
    print(f"[monitor] http://localhost:{HTTP_PORT}  (WebSocket: ws://localhost:{HTTP_PORT}/ws)")
    await asyncio.sleep(float("inf"))

if __name__ == "__main__":
    asyncio.run(main())
