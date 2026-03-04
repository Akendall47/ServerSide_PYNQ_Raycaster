# ec2/monitor/monitor.py — live monitor, HTTP+WebSocket on port 8080.
# Reads player state from Redis, match history from DynamoDB.
# Access via SSH tunnel set up by pynq_dev.sh: http://localhost:8080

import asyncio
import gzip
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import time
import redis as redislib
import boto3
from aiohttp import web

REDIS_HOST   = "127.0.0.1"
REDIS_PORT   = 6379
HTTP_PORT    = 8080
PUSH_RATE_HZ = 20   # push to browser at 20 Hz (match game tick rate)
DDB_POLL_INTERVAL_S = 2.0
SERVICE_POLL_INTERVAL_S = 1.0

DYNAMO_TABLE = "pynq-raycaster-seda-matches"
AWS_REGION   = "eu-west-2"
REPO_ROOT    = Path(__file__).resolve().parents[3]
MAPS_DIR     = REPO_ROOT / "pynq_full" / "ec2" / "maps"

SERVICE_SPECS = {
    "server": {
        "script": REPO_ROOT / "pynq_full" / "ec2" / "server" / "server.py",
        "pattern": "server.py",
        "log": Path("/tmp/pynq-server.log"),
    },
    "sidecar": {
        "script": REPO_ROOT / "pynq_full" / "ec2" / "sidecar" / "sidecar.py",
        "pattern": "sidecar.py",
        "log": Path("/tmp/pynq-sidecar.log"),
    },
}

# ── Connections ────────────────────────────────────────────────────────────────

r     = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
dyndb = boto3.resource("dynamodb", region_name=AWS_REGION).Table(DYNAMO_TABLE)
s3    = boto3.client("s3", region_name=AWS_REGION)

# ── DynamoDB poll (slow — every 5s) ───────────────────────────────────────────

_ddb_cache      = []
_ddb_last_fetch = 0.0
_service_cache  = {}
_service_last_fetch = 0.0
_service_message = "controls run on EC2 only; node simulators still start locally"
_replay_cache = {}
_active_map = "level1"   # tracks which map the server is using

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

    # Redis cache: written by sidecar on match_end — O(1), no AWS cost.
    # Fall through to DynamoDB scan only on a fresh instance with no cached matches.
    try:
        cached = r.lrange("game:recent-matches", 0, 4)
        if cached:
            _ddb_cache = [json.loads(entry) for entry in cached]
            _ddb_last_fetch = now
            return _ddb_cache
    except Exception as e:
        print(f"[monitor] Redis recent-matches read error: {e}")

    try:
        # Without a GSI on timestamp, the only correct "recent matches" view is
        # to scan all META rows, then sort locally. The table is still small.
        items = []
        last_evaluated_key = None
        while True:
            kwargs = {
                "FilterExpression": "record_type = :rt",
                "ExpressionAttributeValues": {":rt": "META"},
                "ProjectionExpression": "match_id, #s, #ts, replay_s3_key, replay_frame_count, summary_snapshot_frames",
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
             "timestamp": i.get("timestamp", "")[:19].replace("T", " "),
             "has_replay": bool(i.get("replay_s3_key")),
             "replay_frames": _as_int(i.get("summary_snapshot_frames", i.get("replay_frame_count", 0)), 0),
             "has_state_replay": _as_int(i.get("summary_snapshot_frames", i.get("replay_frame_count", 0)), 0) > 0}
            for i in items
        ]
        _ddb_last_fetch = now
    except Exception as e:
        print(f"[monitor] DynamoDB poll error: {e}")
    return _ddb_cache

def _service_pids(name: str):
    spec = SERVICE_SPECS[name]
    try:
        result = subprocess.run(
            ["ps", "-eo", "pid=,args="],
            capture_output=True, text=True, check=False,
        )
    except FileNotFoundError:
        return []

    if result.returncode != 0:
        print(f"[monitor] ps failed for {name}: {result.stderr.strip()}")
        return []

    pids = []
    for line in result.stdout.splitlines():
        try:
            pid_text, cmd = line.strip().split(None, 1)
            pid = int(pid_text)
        except ValueError:
            continue
        except IndexError:
            continue
        if pid != os.getpid() and spec["pattern"] in cmd:
            pids.append(pid)
    return pids

def poll_services(force: bool = False):
    global _service_cache, _service_last_fetch
    now = time.monotonic()
    if not force and now - _service_last_fetch < SERVICE_POLL_INTERVAL_S:
        return _service_cache

    server_pids = _service_pids("server")
    sidecar_pids = _service_pids("sidecar")
    _service_cache = {
        "server": {
            "running": bool(server_pids),
            "pid_count": len(server_pids),
        },
        "sidecar": {
            "running": bool(sidecar_pids),
            "pid_count": len(sidecar_pids),
        },
        "monitor": {
            "running": True,
            "pid_count": 1,
        },
        "last_action": _service_message,
    }
    _service_last_fetch = now
    return _service_cache

def _start_service(name: str):
    spec = SERVICE_SPECS[name]
    pids = _service_pids(name)
    if pids:
        return f"{name} already running"

    log_handle = open(spec["log"], "ab")
    try:
        subprocess.Popen(
            [sys.executable, str(spec["script"])],
            cwd=str(REPO_ROOT),
            stdout=log_handle,
            stderr=subprocess.STDOUT,
            start_new_session=True,
        )
    finally:
        log_handle.close()

    time.sleep(0.2)
    return f"{name} started"

def _stop_service(name: str):
    pids = _service_pids(name)
    if not pids:
        return f"{name} already stopped"

    for pid in pids:
        try:
            os.kill(pid, signal.SIGTERM)
        except ProcessLookupError:
            pass

    deadline = time.monotonic() + 1.0
    while time.monotonic() < deadline:
        if not _service_pids(name):
            return f"{name} stopped"
        time.sleep(0.05)

    for pid in _service_pids(name):
        try:
            os.kill(pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
    return f"{name} killed"

def handle_control_command(cmd: str):
    global _service_message

    def publish_node_mode(node_index: int, mode: str):
        payload = json.dumps({"cmd": "set_mode", "mode": mode, "node_index": node_index})
        r.publish("game:control", payload)
        return f"node {node_index + 1} switched to {mode} mode"

    if cmd == "force_end":
        r.publish("game:control", json.dumps({"cmd": "force_end"}))
        _service_message = "force_end sent — match will end this tick"
    elif cmd == "restart":
        payload = json.dumps({"cmd": "restart"})
        r.publish("game:control", payload)
        _service_message = "restart signal sent to node simulators"
    elif cmd == "node1_auto":
        _service_message = publish_node_mode(0, "auto")
    elif cmd == "node1_manual":
        _service_message = publish_node_mode(0, "manual")
    elif cmd == "node2_auto":
        _service_message = publish_node_mode(1, "auto")
    elif cmd == "node2_manual":
        _service_message = publish_node_mode(1, "manual")
    elif cmd == "start_server":
        _service_message = _start_service("server")
    elif cmd == "stop_server":
        _service_message = _stop_service("server")
    elif cmd == "start_sidecar":
        _service_message = _start_service("sidecar")
    elif cmd == "stop_sidecar":
        _service_message = _stop_service("sidecar")
    elif cmd.startswith("set_map:"):
        global _active_map
        map_name = cmd.split(":", 1)[1]
        map_path = MAPS_DIR / f"{map_name}.txt"
        if not map_path.exists():
            _service_message = f"unknown map: {map_name}"
        else:
            payload = json.dumps({"cmd": "set_map", "map": map_name})
            r.publish("game:control", payload)
            _active_map = map_name
            _service_message = f"map set to {map_name} (takes effect next match)"
    elif cmd == "restart_stack":
        _stop_service("sidecar")
        _stop_service("server")
        time.sleep(0.2)
        _start_service("server")
        time.sleep(0.2)
        _start_service("sidecar")
        _service_message = "stack restarted"
    else:
        _service_message = f"unknown command: {cmd}"

    poll_services(force=True)
    return _service_message

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

    events_raw = r.lrange("game:monitor-events", 0, 49)
    parsed     = [json.loads(e) for e in events_raw if e]
    match_events = current_match_events(parsed)
    matches = poll_dynamodb()

    n_clients = _as_int(clients.get("connected_clients", 0))
    blocked   = _as_int(clients.get("blocked_clients", 0))
    pubsub_clients = sum(
        1 for row in client_rows
        if _as_int(row.get("sub", 0)) > 0 or _as_int(row.get("psub", 0)) > 0
    )
    direct_clients = max(0, n_clients - blocked - pubsub_clients)

    player_probe_reads = min(9, len(players) + 1)
    monitor_cmds_per_push = player_probe_reads + 5  # 3x INFO + CLIENT LIST + LRANGE

    return {
        "players": players,
        "redis": {
            "ops_per_sec":       info.get("instantaneous_ops_per_sec", 0),
            "mem_used":          mem.get("used_memory_human", "?"),
            "connected_clients": n_clients,
            "blocked_clients":   blocked,   # 1 is normal: sidecar on BRPOP
            "keyspace_hits":     info.get("keyspace_hits", 0),
            "keyspace_misses":   info.get("keyspace_misses", 0),
            "pubsub_clients":    pubsub_clients,
            "direct_clients":    direct_clients,
            "monitor_push_hz":   PUSH_RATE_HZ,
            "monitor_cmds_per_push": monitor_cmds_per_push,
            "monitor_cmds_per_sec": monitor_cmds_per_push * PUSH_RATE_HZ,
        },
        "services": poll_services(),
        "pipeline": {
            "players_online":  len(players),
            "match_events":    len(match_events),
            "sidecar_blocked": blocked,
            "ops_per_sec":     info.get("instantaneous_ops_per_sec", 0),
            "ddb_matches":     len(matches),
        },
        "events":  match_events[:20],   # newest-first, current match only
        "matches": matches,
        "active_map": _active_map,
    }


def fetch_replay(match_id: str):
    if match_id in _replay_cache:
        return _replay_cache[match_id]

    resp = dyndb.get_item(Key={"match_id": match_id, "record_type": "META"})
    item = resp.get("Item")
    if not item:
        raise web.HTTPNotFound(text=f"unknown match_id: {match_id}")

    bucket = item.get("replay_s3_bucket")
    key = item.get("replay_s3_key")
    if not bucket or not key:
        raise web.HTTPNotFound(text=f"no replay stored for {match_id}")

    obj = s3.get_object(Bucket=bucket, Key=key)
    body = obj["Body"].read()
    if key.endswith(".gz"):
        body = gzip.decompress(body)

    events = []
    for line in body.decode("utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        events.append(json.loads(line))

    payload = {
        "match_id": match_id,
        "bucket": bucket,
        "key": key,
        "events": events,
    }
    _replay_cache[match_id] = payload
    if len(_replay_cache) > 8:
        oldest = next(iter(_replay_cache))
        if oldest != match_id:
            _replay_cache.pop(oldest, None)
    return payload

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
                    cmd = data.get("cmd")
                    if cmd:
                        result = await asyncio.to_thread(handle_control_command, cmd)
                        print(f"[monitor] command {cmd}: {result}")
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


async def replay_handler(request):
    match_id = request.match_info["match_id"]
    try:
        payload = await asyncio.to_thread(fetch_replay, match_id)
    except web.HTTPException:
        raise
    except Exception as e:
        print(f"[monitor] replay fetch error for {match_id}: {e}")
        raise web.HTTPInternalServerError(text="failed to load replay")
    return web.json_response(payload)


async def maps_list_handler(request):
    """GET /api/maps — list all available map names."""
    names = sorted(p.stem for p in MAPS_DIR.glob("*.txt"))
    return web.json_response({"maps": names})


async def map_handler(request):
    """Return the requested map as a JSON tile grid.
    GET /api/map/level1  → loads maps/level1.txt
    """
    name = request.match_info["name"]
    # Sanitise: only allow [a-zA-Z0-9_-]
    if not name.replace("-", "").replace("_", "").isalnum():
        raise web.HTTPBadRequest(text="invalid map name")
    path = MAPS_DIR / f"{name}.txt"
    if not path.exists():
        raise web.HTTPNotFound(text=f"map not found: {name}")

    rows = []
    for line in path.read_text().splitlines():
        line = line.rstrip("\r")
        if not line:
            continue
        rows.append([1 if c == "#" else 0 for c in line])

    return web.json_response({"name": name, "width": len(rows[0]) if rows else 0,
                               "height": len(rows), "tiles": rows})

# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    app = web.Application()
    app.router.add_get("/",   index_handler)
    app.router.add_get("/ws", ws_handler)
    app.router.add_get("/api/replay/{match_id}", replay_handler)
    app.router.add_get("/api/maps", maps_list_handler)
    app.router.add_get("/api/map/{name}", map_handler)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "0.0.0.0", HTTP_PORT)
    await site.start()
    print(f"[monitor] http://localhost:{HTTP_PORT}  (WebSocket: ws://localhost:{HTTP_PORT}/ws)")
    await asyncio.sleep(float("inf"))

if __name__ == "__main__":
    asyncio.run(main())
