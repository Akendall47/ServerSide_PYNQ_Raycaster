# ec2/monitor/monitor.py — live monitor, HTTP+WebSocket on port 8080.
# Reads player state from Redis, match history from DynamoDB.
# Access via SSH tunnel set up by pynq_dev.sh: http://localhost:8080

import asyncio
import gzip
import json
import mimetypes
import os
from pathlib import Path
import signal
import subprocess
import sys
import time
import redis as redislib
import boto3
from aiohttp import web
from boto3.dynamodb.conditions import Key
from decimal import Decimal

REDIS_HOST   = "127.0.0.1"
REDIS_PORT   = 6379
HTTP_PORT    = 8080
PUSH_RATE_HZ = 20   # push to browser at 20 Hz (match game tick rate)
DDB_POLL_INTERVAL_S = 2.0
SERVICE_POLL_INTERVAL_S = 1.0
REDIS_STATS_POLL_INTERVAL_S = 1.0

DYNAMO_TABLE = "pynq-raycaster-seda-matches"
PLAYER_TABLE = "pynq-raycaster-players"
AWS_REGION   = "eu-west-2"
REPO_ROOT    = Path(__file__).resolve().parents[3]
MAPS_DIR     = REPO_ROOT / "pynq_full" / "ec2" / "maps"
MONITOR_DIR  = Path(__file__).resolve().parent
LOGO_ASSET_PATHS = {
    "PNG_LOGO.png": REPO_ROOT / "PNG_LOGO.png",
    "BNW_LOGO.png": REPO_ROOT / "BNW_LOGO.png",
    "assets/pynqcast-white.png": REPO_ROOT / "BNW_LOGO.png",
}
LOGO_ASSET_NAMES = tuple(LOGO_ASSET_PATHS.keys())
MONITOR_UI_ASSET_NAME = "monitor-ui.js"
MONITOR_UI_DIST_DIR = REPO_ROOT / "monitor_ui" / "dist"
MONITOR_ASSETS = {
    "monitor.css",
    "monitor-state.js",
    "monitor-render.js",
    "monitor-app.js",
    MONITOR_UI_ASSET_NAME,
    *LOGO_ASSET_NAMES,
}

SERVICE_SPECS = {
    "server": {
        "script": REPO_ROOT / "pynq_full" / "ec2" / "server" / "server.py",
        "pattern": "server.py",
        "log": Path("/tmp/pynq-server.log"),
    },
    "sidecar": {
        "script": REPO_ROOT / "sidecar" / "sidecar.py",
        "pattern": "sidecar.py",
        "log": Path("/tmp/pynq-sidecar.log"),
    },
}

# ── Connections ────────────────────────────────────────────────────────────────

r     = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
dyndb = boto3.resource("dynamodb", region_name=AWS_REGION).Table(DYNAMO_TABLE)
player_dyndb = boto3.resource("dynamodb", region_name=AWS_REGION).Table(PLAYER_TABLE)
s3    = boto3.client("s3", region_name=AWS_REGION)

# ── DynamoDB poll (slow — every 5s) ───────────────────────────────────────────

_ddb_cache      = []
_ddb_last_fetch = 0.0
_service_cache  = {}
_service_last_fetch = 0.0
_service_message = "controls run on EC2 only; FPGA boards stay connected over UDP"
_replay_cache = {}
_active_map = "chase"    # tracks which map the server is using
_redis_stats_cache = {}
_redis_stats_last_fetch = 0.0
_state_cache = {}
_state_cache_json = "{}"

def _as_int(value, default=0):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default

def _as_float(value, default=0.0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default

def _valid_map_name(value):
    return isinstance(value, str) and bool(value) and value != "none"


def _plain_number(value: Decimal):
    if value == value.to_integral_value():
        return int(value)
    return float(value)


def _plain_json(value):
    if isinstance(value, Decimal):
        return _plain_number(value)
    if isinstance(value, dict):
        return {key: _plain_json(inner) for key, inner in value.items()}
    if isinstance(value, list):
        return [_plain_json(inner) for inner in value]
    return value

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


def poll_redis_stats():
    global _redis_stats_cache, _redis_stats_last_fetch
    now = time.monotonic()
    if _redis_stats_cache and now - _redis_stats_last_fetch < REDIS_STATS_POLL_INTERVAL_S:
        return _redis_stats_cache

    info = r.info("stats")
    mem = r.info("memory")
    clients = r.info("clients")
    client_rows = r.client_list()

    n_clients = _as_int(clients.get("connected_clients", 0))
    blocked = _as_int(clients.get("blocked_clients", 0))
    pubsub_clients = sum(
        1 for row in client_rows
        if _as_int(row.get("sub", 0)) > 0 or _as_int(row.get("psub", 0)) > 0
    )
    direct_clients = max(0, n_clients - blocked - pubsub_clients)

    shared_refresh_cmds_per_sec = PUSH_RATE_HZ
    stats_cmds_per_sec = 4 / REDIS_STATS_POLL_INTERVAL_S
    recent_matches_cmds_per_sec = 1 / DDB_POLL_INTERVAL_S
    monitor_cmds_per_sec = shared_refresh_cmds_per_sec + stats_cmds_per_sec + recent_matches_cmds_per_sec

    _redis_stats_cache = {
        "ops_per_sec":       info.get("instantaneous_ops_per_sec", 0),
        "mem_used":          mem.get("used_memory_human", "?"),
        "connected_clients": n_clients,
        "blocked_clients":   blocked,
        "keyspace_hits":     info.get("keyspace_hits", 0),
        "keyspace_misses":   info.get("keyspace_misses", 0),
        "pubsub_clients":    pubsub_clients,
        "direct_clients":    direct_clients,
        "monitor_push_hz":   PUSH_RATE_HZ,
        "monitor_cmds_per_push": round(monitor_cmds_per_sec / PUSH_RATE_HZ, 2),
        "monitor_cmds_per_sec": round(monitor_cmds_per_sec, 1),
        "monitor_shared_cache": True,
    }
    _redis_stats_last_fetch = now
    return _redis_stats_cache

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

    if cmd == "force_end":
        r.publish("game:control", json.dumps({"cmd": "force_end"}))
        _service_message = "force_end sent — session will return to the lobby after the end hold"
    elif cmd == "start_match":
        r.publish("game:control", json.dumps({"cmd": "start_match"}))
        _service_message = "start_match sent — queued lobby players will be promoted if enough participants exist"
    elif cmd == "restart":
        payload = json.dumps({"cmd": "restart"})
        r.publish("game:control", payload)
        _service_message = "restart signal sent to the live server"
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
            _service_message = f"map set to {map_name} — active players are returned to the lobby on the new map"
    elif cmd.startswith("set_ghosts_"):
        count = int(cmd.split("_")[-1])
        r.publish("game:control", json.dumps({"cmd": "set_ghost_count", "count": count}))
        _service_message = f"ghost count → {count} sent"
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

def _clear_match_events():
    global _match_event_log, _match_event_keys
    _match_event_log = []
    _match_event_keys = []

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


def _live_match_summary(match_events: list, active_map: str, game_mode: int,
                        paused: bool = False, pause_reason: str | None = None,
                        paused_player_ids=None):
    if not match_events:
        return None

    if any(ev.get("event") in {"match_end", "match_aborted"} for ev in match_events):
        return None

    start_event = next((ev for ev in reversed(match_events) if ev.get("event") == "match_start"), None)
    if start_event is None:
        return None

    player_total = start_event.get("human_players", start_event.get("players", 0))
    ghost_count = start_event.get("ghost_count", 0)
    return {
        "match_id": "live-now",
        "status": "paused" if paused else "in_progress",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "has_replay": False,
        "replay_frames": 0,
        "has_state_replay": False,
        "player_count": player_total,
        "ghost_count": ghost_count,
        "game_mode": game_mode,
        "map_name": active_map,
        "pause_reason": pause_reason,
        "paused_player_ids": list(paused_player_ids or []),
    }

# ── Redis state collection ─────────────────────────────────────────────────────

def collect_state():
    pipe = r.pipeline(transaction=False)
    for pid in range(1, 10):
        pipe.hgetall(f"player:{pid}")
    pipe.hgetall("game:state")
    pipe.lrange("game:monitor-events", 0, 49)
    redis_rows = pipe.execute()

    players = []
    for pid, raw in enumerate(redis_rows[:9], start=1):
        if not raw:
            continue
        players.append({
            "id":              pid,
            "entity_key":      f"player:{pid}",
            "x":               float(raw.get("x", 0)),
            "y":               float(raw.get("y", 0)),
            "angle":           float(raw.get("angle", 0)),
            "flags":           int(raw.get("flags", 0)),
            "username":        raw.get("username", ""),
            "display_name":    raw.get("display_name", ""),
            "profile_key":     raw.get("profile_key", ""),
            "controller_key":  raw.get("controller_key", ""),
            "identity_source": raw.get("identity_source", ""),
            "is_ghost":        bool(_as_int(raw.get("is_ghost", 0), 0)),
            "queued":          False,
            "queue_slot":      None,
        })

    game_raw  = redis_rows[9]
    game_mode = int(game_raw.get("game_mode", 0)) if game_raw else 0
    bits_mask = int(game_raw.get("bits_mask", 0xFFFF)) if game_raw else 0xFFFF
    match_started = bool(_as_int(game_raw.get("match_started", 0), 0)) if game_raw else False
    match_ended = bool(_as_int(game_raw.get("match_ended", 0), 0)) if game_raw else False
    match_paused = bool(_as_int(game_raw.get("match_paused", 0), 0)) if game_raw else False
    pause_reason = (game_raw.get("pause_reason") or None) if game_raw else None
    pause_remaining_s = _as_float(game_raw.get("pause_remaining_s"), 0.0) if game_raw else 0.0
    paused_player_ids = []
    if game_raw and game_raw.get("paused_player_ids"):
        try:
            paused_player_ids = json.loads(game_raw["paused_player_ids"])
        except Exception:
            paused_player_ids = []
    queued_players = []
    if game_raw and game_raw.get("queued_players"):
        try:
            queued_players = json.loads(game_raw["queued_players"])
        except Exception:
            queued_players = []
    for index, raw in enumerate(queued_players, start=1):
        queue_slot = _as_int(raw.get("queue_slot", index), index)
        entity_key_seed = (
            raw.get("profile_key")
            or raw.get("display_name")
            or raw.get("controller_key")
            or "unknown"
        )
        players.append({
            "id":              0,
            "entity_key":      f"queued:{queue_slot}:{entity_key_seed}",
            "x":               _as_float(raw.get("x"), 0.0),
            "y":               _as_float(raw.get("y"), 0.0),
            "angle":           _as_float(raw.get("angle"), 0.0),
            "flags":           _as_int(raw.get("flags", 0), 0),
            "username":        raw.get("username", ""),
            "display_name":    raw.get("display_name", ""),
            "profile_key":     raw.get("profile_key", ""),
            "controller_key":  raw.get("controller_key", ""),
            "identity_source": raw.get("identity_source", ""),
            "is_ghost":        False,
            "queued":          True,
            "queue_slot":      queue_slot,
        })

    events_raw = redis_rows[10]
    parsed     = [json.loads(e) for e in events_raw if e]
    match_events = current_match_events(parsed)
    match_is_live = match_started and not match_ended
    if not match_is_live:
        _clear_match_events()
        match_events = []
    matches = poll_dynamodb()
    redis_stats = poll_redis_stats()

    # Bit positions: prefer live game:state hash (written each tick once bits are set),
    # fall back to match_start event in case of a Redis flush mid-match.
    bits_positions = []
    if game_raw and game_raw.get("bits"):
        try:
            bits_positions = json.loads(game_raw["bits"])
        except Exception:
            pass
    if not bits_positions:
        for ev in match_events:
            if ev.get("event") == "match_start" and ev.get("bits"):
                bits_positions = ev["bits"]
                break

    active_map = _active_map
    if game_raw and _valid_map_name(game_raw.get("map")):
        active_map = game_raw["map"]
    else:
        for ev in match_events:
            event_map = ev.get("map")
            if ev.get("event") == "match_start" and _valid_map_name(event_map):
                active_map = event_map
                break

    live_match = _live_match_summary(
        match_events,
        active_map,
        game_mode,
        paused=match_paused,
        pause_reason=pause_reason,
        paused_player_ids=paused_player_ids,
    )
    if live_match is not None:
        matches = [
            live_match,
            *[
                match for match in matches
                if match.get("status") not in {"in_progress", "paused"}
            ],
        ]

    return {
        "players": players,
        "redis": redis_stats,
        "services": poll_services(),
        "pipeline": {
            "players_online":  len(players),
            "match_events":    len(match_events),
            "sidecar_blocked": redis_stats.get("blocked_clients", 0),
            "ops_per_sec":     redis_stats.get("ops_per_sec", 0),
            "ddb_matches":     len(matches),
        },
        "events":     match_events[:20],   # newest-first, current match only
        "matches":    matches,
        "game_mode":  game_mode,
        "bits":       bits_positions,      # [[world_x, world_y], ...] from match_start
        "bits_mask":  bits_mask,           # bitmask of active bits this tick
        "active_map": active_map,
        "match": {
            "started": match_started,
            "ended": match_ended,
            "paused": match_paused,
            "pause_reason": pause_reason,
            "paused_player_ids": paused_player_ids,
            "pause_remaining_s": pause_remaining_s if match_paused else 0.0,
        },
    }


def refresh_state_cache():
    global _state_cache, _state_cache_json
    state = collect_state()
    _state_cache = state
    _state_cache_json = json.dumps(state)
    return state


async def state_cache_loop():
    interval = 1 / PUSH_RATE_HZ
    while True:
        started_at = time.monotonic()
        try:
            await asyncio.to_thread(refresh_state_cache)
        except Exception as e:
            print(f"[monitor] state refresh error: {e}")
        elapsed = time.monotonic() - started_at
        await asyncio.sleep(max(0.0, interval - elapsed))


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


def fetch_players():
    items = []
    last_evaluated_key = None
    while True:
        kwargs = {
            "FilterExpression": "#rt = :rt",
            "ExpressionAttributeNames": {"#rt": "record_type"},
            "ExpressionAttributeValues": {":rt": "PROFILE"},
        }
        if last_evaluated_key:
            kwargs["ExclusiveStartKey"] = last_evaluated_key
        response = player_dyndb.scan(**kwargs)
        items.extend(response.get("Items", []))
        last_evaluated_key = response.get("LastEvaluatedKey")
        if not last_evaluated_key:
            break
    items.sort(key=lambda item: item.get("last_seen_at", ""), reverse=True)
    return {"players": _plain_json(items)}


def fetch_player_profile(player_key: str):
    response = player_dyndb.query(
        KeyConditionExpression=Key("player_key").eq(player_key)
    )
    items = response.get("Items", [])
    if not items:
        raise web.HTTPNotFound(text=f"unknown player_key: {player_key}")

    profile = next((item for item in items if item.get("record_type") == "PROFILE"), None)
    matches = sorted(
        (item for item in items if str(item.get("record_type", "")).startswith("MATCH#")),
        key=lambda item: item.get("timestamp", ""),
        reverse=True,
    )
    return {
        "player_key": player_key,
        "profile": _plain_json(profile),
        "matches": _plain_json(matches),
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
                await ws.send_str(_state_cache_json)
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
    return web.FileResponse(MONITOR_DIR / "index.html")


def _resolve_monitor_ui_asset(name: str):
    candidate = (MONITOR_UI_DIST_DIR / name).resolve()
    try:
      candidate.relative_to(MONITOR_UI_DIST_DIR.resolve())
    except ValueError:
      return None
    if not candidate.is_file():
      return None
    return candidate


def _asset_response(request, path: Path, public_name: str):
    headers = {
        "Vary": "Accept-Encoding",
        "Cache-Control": "public, max-age=31536000, immutable" if public_name.startswith("chunks/") else "no-cache",
    }
    gzip_path = Path(f"{path}.gz")
    if "gzip" in request.headers.get("Accept-Encoding", "") and gzip_path.is_file():
        content_type = mimetypes.guess_type(public_name)[0] or "application/octet-stream"
        headers["Content-Encoding"] = "gzip"
        headers["Content-Type"] = content_type
        return web.FileResponse(gzip_path, headers=headers)
    return web.FileResponse(path, headers=headers)


async def asset_handler(request):
    name = request.path.lstrip("/")
    dist_asset = _resolve_monitor_ui_asset(name)
    if dist_asset is not None:
        return _asset_response(request, dist_asset, name)
    if name not in MONITOR_ASSETS:
        raise web.HTTPNotFound(text=f"unknown asset: {name}")
    if name in LOGO_ASSET_PATHS:
        return _asset_response(request, LOGO_ASSET_PATHS[name], name)
    return _asset_response(request, MONITOR_DIR / name, name)


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


async def players_handler(request):
    try:
        payload = await asyncio.to_thread(fetch_players)
    except Exception as e:
        print(f"[monitor] players fetch error: {e}")
        raise web.HTTPInternalServerError(text="failed to load players")
    return web.json_response(payload)


async def player_handler(request):
    player_key = request.match_info["player_key"]
    try:
        payload = await asyncio.to_thread(fetch_player_profile, player_key)
    except web.HTTPException:
        raise
    except Exception as e:
        print(f"[monitor] player fetch error for {player_key}: {e}")
        raise web.HTTPInternalServerError(text="failed to load player history")
    return web.json_response(payload)


async def control_handler(request):
    try:
        data = await request.json()
    except Exception:
        raise web.HTTPBadRequest(text="invalid control payload")

    cmd = str(data.get("cmd", "") or "").strip()
    if not cmd:
        raise web.HTTPBadRequest(text="missing cmd")

    try:
        await asyncio.to_thread(handle_control_command, cmd)
    except Exception as exc:
        print(f"[monitor] control error for {cmd}: {exc}")
        raise web.HTTPInternalServerError(text="failed to apply control")
    return web.json_response({"ok": True, "cmd": cmd})


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

    return web.json_response({
        "name": name,
        "width": len(rows[0]) if rows else 0,
        "height": len(rows),
        "tile_scale": 8,
        "tiles": rows,
    })

# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    app = web.Application()
    app.router.add_get("/",   index_handler)
    app.router.add_get("/monitor.css", asset_handler)
    app.router.add_get("/monitor-state.js", asset_handler)
    app.router.add_get("/monitor-render.js", asset_handler)
    app.router.add_get("/monitor-app.js", asset_handler)
    app.router.add_get(f"/{MONITOR_UI_ASSET_NAME}", asset_handler)
    app.router.add_get("/chunks/{chunk_path:.+}", asset_handler)
    for logo_asset_name in LOGO_ASSET_NAMES:
        app.router.add_get(f"/{logo_asset_name}", asset_handler)
    app.router.add_get("/ws", ws_handler)
    app.router.add_get("/api/replay/{match_id}", replay_handler)
    app.router.add_get("/api/players", players_handler)
    app.router.add_get("/api/players/{player_key}", player_handler)
    app.router.add_post("/api/control", control_handler)
    app.router.add_get("/api/maps", maps_list_handler)
    app.router.add_get("/api/map/{name}", map_handler)
    await asyncio.to_thread(refresh_state_cache)
    app["state_cache_task"] = asyncio.create_task(state_cache_loop())

    runner = web.AppRunner(app)
    try:
        await runner.setup()
        site = web.TCPSite(runner, "0.0.0.0", HTTP_PORT)
        await site.start()
        print(f"[monitor] http://localhost:{HTTP_PORT}  (WebSocket: ws://localhost:{HTTP_PORT}/ws)")
        await asyncio.sleep(float("inf"))
    finally:
        app["state_cache_task"].cancel()
        try:
            await app["state_cache_task"]
        except asyncio.CancelledError:
            pass

if __name__ == "__main__":
    asyncio.run(main())
