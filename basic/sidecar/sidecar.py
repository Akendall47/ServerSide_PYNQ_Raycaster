# basic/sidecar/sidecar.py
#
# Minimal Python sidecar : single file.
#
# Purpose: show how the sidecar pattern works end to end.
# server.py writes to Redis. This sidecar reads from Redis
# and writes to DynamoDB. The two processes never talk directly.
#
# What it does:
#   1. Connects to Redis and DynamoDB
#   2. Blocks on BRPOP "game:events" : wakes up only when server.py pushes an event
#   3. On match_start: reads all player positions from Redis, writes to DynamoDB
#   4. Goes back to sleep waiting for the next event
#
# Run on EC2 alongside server.py:
#   pip install redis boto3
#   python sidecar.py
#
# AWS credentials must be available (IAM Role on EC2, or ~/.aws/credentials locally).

import json
import time
import redis
import boto3
from decimal import Decimal
from datetime import datetime, timezone

current_match_id = None

# ── Config ────────────────────────────────────────────────────────────────────

REDIS_HOST      = "127.0.0.1"   # change to ElastiCache endpoint on EC2
REDIS_PORT      = 6379
REDIS_EVENT_KEY = "game:events"

DYNAMO_TABLE    = "pynq-raycaster-matches"   # must exist in DynamoDB already
AWS_REGION      = "eu-west-2"

# ── Connections ───────────────────────────────────────────────────────────────

print(f"Connecting to Redis at {REDIS_HOST}:{REDIS_PORT}...")
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

print(f"Connecting to DynamoDB table '{DYNAMO_TABLE}' in {AWS_REGION}...")
dynamo = boto3.resource("dynamodb", region_name=AWS_REGION)
table  = dynamo.Table(DYNAMO_TABLE)

# ── Handlers ──────────────────────────────────────────────────────────────────

def handle_match_start(event: dict):
    """
    Called when server.py pushes {"event": "match_start", "players": 2}.
    Reads all player positions from Redis and writes a match record to DynamoDB.
    """
    global current_match_id
    match_id  = datetime.now(timezone.utc).strftime("match-%Y%m%d-%H%M%S")
    current_match_id = match_id
    timestamp = datetime.now(timezone.utc).isoformat()

    # Read player positions from Redis (set by server.py each packet)
    players = []
    for player_id in range(event.get("players", 0)):
        pos = r.hgetall(f"player:{player_id}")   # {"x": "1.0", "y": "2.0", ...}
        players.append({
            "player_id": player_id,
            "x":     Decimal(pos.get("x", "0")),
            "y":     Decimal(pos.get("y", "0")),
            "angle": Decimal(pos.get("angle", "0")),
        })

    item = {
        "match_id":    match_id,
        "record_type": "META",
        "timestamp":   timestamp,
        "players":     players,
        "status":      "in_progress",
    }

    table.put_item(Item=item)
    print(f"DynamoDB: wrote match record {match_id} with {len(players)} player(s)")

def handle_match_end(event: dict):
    """
    Called when server.py pushes {"event": "match_end", "players": N} on Ctrl+C.
    Updates the DynamoDB match record status from in_progress to completed.

    # TODO: this handler will become a Lambda function.
    # How it will work:
    #   1. server.py pushes match_end to Redis as it does now
    #   2. sidecar pushes the event to an SNS topic instead of handling it directly
    #   3. SNS triggers a Lambda function with the event payload
    #   4. Lambda updates DynamoDB : same update_item call as below, but serverless
    # Benefit: no sidecar process needed for end-of-match writes, Lambda scales
    # automatically and costs nothing when idle.
    """
    global current_match_id
    if not current_match_id:
        print("match_end received but no current match ID : ignoring")
        return

    timestamp = datetime.now(timezone.utc).isoformat()
    table.update_item(
        Key={"match_id": current_match_id, "record_type": "META"},
        UpdateExpression="SET #s = :s, end_time = :t",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={":s": "completed", ":t": timestamp},
    )
    print(f"DynamoDB: match {current_match_id} marked as completed")
    current_match_id = None

# ── Event dispatch ────────────────────────────────────────────────────────────

HANDLERS = {
    "match_start": handle_match_start,
    "match_end":   handle_match_end,
    # "match_start" is one event type for the tag game demo.
    # Any event server.py pushes to Redis can be handled here.
    # Examples: "match_end", "player_tagged", "item_picked_up", "round_won", etc.
}

# ── Main loop ─────────────────────────────────────────────────────────────────

print(f"Waiting for events on Redis key '{REDIS_EVENT_KEY}'...")
print("(Sidecar sleeps here until server.py pushes an event : BRPOP blocks)")

while True:
    # BRPOP blocks until server.py pushes something : 0 = wait forever
    # Returns (key, value) tuple or None on timeout
    result = r.brpop(REDIS_EVENT_KEY, timeout=0)
    if result is None:
        continue

    _, raw = result
    try:
        event = json.loads(raw)
    except json.JSONDecodeError:
        print(f"Bad event payload: {raw}")
        continue

    event_type = event.get("event")
    print(f"Received event: {event_type}")

    handler = HANDLERS.get(event_type)
    if handler:
        try:
            handler(event)
        except Exception as e:
            print(f"Handler error for '{event_type}': {e}")
    else:
        print(f"No handler for event type: {event_type}")
