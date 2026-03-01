# ec2/sidecar/sidecar.py
#
# SEDA sidecar: BRPOP game:seda-events → write to DynamoDB.
#
# Why a sidecar? DynamoDB writes take 10-50ms;  doing them inside the server
# would stall the 50ms tick. T4 pushes events to Redis and returns immediately.
# This process wakes up, does the slow write, then goes back to sleep.
#
# Events handled:
#   match_start   → PUT  META record (player positions snapshot)
#   player_tagged → PUT  TAG#N record (one per tag)
#   match_end     → UPDATE META status → "completed"
#
# DynamoDB table: pynq-raycaster-seda-matches
#   PK: match_id (e.g. "match-20260301-142055")
#   SK: record_type ("META", "TAG#0", "TAG#1", ...)
#
# Run on EC2: python3 ec2/sidecar/sidecar.py

import json
import redis
import boto3
from decimal import Decimal
from datetime import datetime, timezone

# ── Config ────────────────────────────────────────────────────────────────────

REDIS_HOST   = "127.0.0.1"
REDIS_PORT   = 6379
EVENT_KEY    = "game:seda-events"
DYNAMO_TABLE = "pynq-raycaster-seda-matches"
AWS_REGION   = "eu-west-2"

# ── Connections ───────────────────────────────────────────────────────────────

print(f"Connecting to Redis at {REDIS_HOST}:{REDIS_PORT}...")
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

print(f"Connecting to DynamoDB table '{DYNAMO_TABLE}' in {AWS_REGION}...")
table = boto3.resource("dynamodb", region_name=AWS_REGION).Table(DYNAMO_TABLE)

# ── State ─────────────────────────────────────────────────────────────────────

current_match_id = None  # set on match_start, cleared on match_end
tag_count        = 0     # sort key suffix: TAG#0, TAG#1, ...

# ── Handlers ──────────────────────────────────────────────────────────────────

def handle_match_start(event: dict):
    """PUT META record. Reads player positions from Redis HSET player:<id>."""
    global current_match_id, tag_count
    current_match_id = datetime.now(timezone.utc).strftime("match-%Y%m%d-%H%M%S")
    tag_count        = 0

    players = []
    for pid in range(1, event.get("players", 0) + 1):   # IDs start at 1
        pos = r.hgetall(f"player:{pid}")  # {"x": "1.0", "y": "2.0", ...}
        players.append({
            "player_id": pid,
            "x": Decimal(pos.get("x", "0")), "y": Decimal(pos.get("y", "0")),
            "angle": Decimal(pos.get("angle", "0")), "flags": int(pos.get("flags", 0)),
        })

    table.put_item(Item={
        "match_id": current_match_id, "record_type": "META",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "players": players, "status": "in_progress",
    })
    print(f"DynamoDB: opened {current_match_id} ({len(players)} players)")


def handle_player_tagged(event: dict):
    """PUT TAG#N record. N increments each tag so all tags are queryable per match."""
    global tag_count
    if not current_match_id:
        print("player_tagged: no active match, ignoring")
        return

    record_type = f"TAG#{tag_count}"
    tag_count  += 1

    table.put_item(Item={
        "match_id": current_match_id, "record_type": record_type,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "player_id": event.get("player_id"),
        "dist": Decimal(str(event.get("dist", 0))),
    })
    print(f"DynamoDB: {record_type} player {event.get('player_id')} tagged")


def handle_match_end(event: dict):
    """UPDATE META status → completed.
    TODO: candidate for Lambda — T4 pushes to SNS, Lambda does update_item.
    """
    global current_match_id
    if not current_match_id:
        print("match_end: no active match, ignoring")
        return

    table.update_item(
        Key={"match_id": current_match_id, "record_type": "META"},
        UpdateExpression="SET #s = :s, end_time = :t",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={":s": "completed",
                                   ":t": datetime.now(timezone.utc).isoformat()},
    )
    print(f"DynamoDB: {current_match_id} completed")
    current_match_id = None

# ── Event dispatch ────────────────────────────────────────────────────────────
# Add entries here for any new event T4 pushes to game:seda-events.

HANDLERS = {
    "match_start":   handle_match_start,
    "player_tagged": handle_player_tagged,
    "match_end":     handle_match_end,
}

# ── Main loop ─────────────────────────────────────────────────────────────────

print(f"Waiting on '{EVENT_KEY}' (BRPOP — zero CPU until event arrives)...")

while True:
    result = r.brpop(EVENT_KEY, timeout=0)
    if result is None:
        continue

    _, raw = result
    try:
        event = json.loads(raw)
    except json.JSONDecodeError:
        print(f"Bad payload: {raw}")
        continue

    event_type = event.get("event")
    print(f"Event: {event_type} — {event}")

    handler = HANDLERS.get(event_type)
    if handler:
        try:
            handler(event)
        except Exception as e:
            print(f"Handler error '{event_type}': {e}")
    else:
        print(f"No handler for '{event_type}'")
