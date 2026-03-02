#
# SEDA sidecar: BRPOP game:seda-events → generic post-match pipeline.
#
# Architecture:
#   1. Generic pipeline:
#      - reads events from Redis
#      - writes match rows to DynamoDB
#      - uploads replay files to S3
#      - publishes match_end to SNS
#   2. Game hooks:
#      - define what a match_start / mid-match event / match_end means
#      - shape the DynamoDB rows and SNS payload extras for this game mode
#
# The idea is "plug and play": keep the pipeline stable, swap the game hooks.
#
# Run on EC2: python3 ec2/sidecar/sidecar.py

import gzip
import json
import os
from datetime import datetime, timezone
from decimal import Decimal

import boto3
import redis

# ── Config ────────────────────────────────────────────────────────────────────

REDIS_HOST = os.environ.get("REDIS_HOST", "127.0.0.1")
REDIS_PORT = int(os.environ.get("REDIS_PORT", "6379"))
EVENT_KEY = os.environ.get("EVENT_KEY", "game:seda-events")
REPLAY_KEY = os.environ.get("REPLAY_KEY", "game:seda-replay")

DYNAMO_TABLE = os.environ.get("DYNAMO_TABLE", "pynq-raycaster-seda-matches")
AWS_REGION = os.environ.get("AWS_REGION", "eu-west-2")

S3_BUCKET = os.environ.get("S3_BUCKET", "fpga-raycaster-data").strip()
S3_REPLAY_PREFIX = os.environ.get("S3_REPLAY_PREFIX", "replays").strip("/")
SNS_TOPIC_ARN = os.environ.get("SNS_TOPIC_ARN", "").strip()
SNS_TOPIC_NAME = os.environ.get("SNS_TOPIC_NAME", "fpga-raycaster-game-end").strip()

# ── Connections ───────────────────────────────────────────────────────────────

print(f"Connecting to Redis at {REDIS_HOST}:{REDIS_PORT}...")
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

print(f"Connecting to DynamoDB table '{DYNAMO_TABLE}' in {AWS_REGION}...")
dynamo = boto3.resource("dynamodb", region_name=AWS_REGION)
table = dynamo.Table(DYNAMO_TABLE)

s3 = boto3.client("s3", region_name=AWS_REGION) if S3_BUCKET else None
sns = boto3.client("sns", region_name=AWS_REGION) if (SNS_TOPIC_ARN or SNS_TOPIC_NAME) else None

# ── Generic Pipeline State ────────────────────────────────────────────────────

current_match_id = None
current_match_started_at = None
current_match_events = []

# ── Generic Helpers ───────────────────────────────────────────────────────────


def utc_now():
    return datetime.now(timezone.utc)


def utc_now_iso():
    return utc_now().isoformat()


def parse_iso(value: str):
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        return None


def duration_ms(started_at: str, ended_at: str):
    start_dt = parse_iso(started_at)
    end_dt = parse_iso(ended_at)
    if start_dt is None or end_dt is None:
        return None
    return max(0, int((end_dt - start_dt).total_seconds() * 1000))


def make_match_id():
    return datetime.now(timezone.utc).strftime("match-%Y%m%d-%H%M%S")


def has_active_match():
    return current_match_id is not None


def begin_match():
    global current_match_id, current_match_started_at, current_match_events
    current_match_id = make_match_id()
    current_match_started_at = utc_now_iso()
    current_match_events = []


def record_match_event(event: dict, recorded_at: str):
    global current_match_events
    if not has_active_match():
        return

    payload = dict(event)
    payload["match_id"] = current_match_id
    payload["recorded_at"] = recorded_at
    current_match_events.append(payload)


def count_state_snapshots(events=None):
    rows = current_match_events if events is None else events
    return sum(1 for event in rows if event.get("event") == "state_snapshot")


def count_match_events(events=None):
    rows = current_match_events if events is None else events
    return len(rows) - count_state_snapshots(rows)


def replay_key_for(match_id: str, started_at: str):
    prefix = S3_REPLAY_PREFIX or "replays"
    started_dt = parse_iso(started_at) or utc_now()
    return (
        f"{prefix}/year={started_dt:%Y}/month={started_dt:%m}/"
        f"{match_id}.ndjson.gz"
    )


def upload_replay(match_id: str, events: list, started_at: str):
    if not s3 or not S3_BUCKET:
        print("S3 disabled: set S3_BUCKET to enable replay uploads")
        return None

    replay_key = replay_key_for(match_id, started_at)
    try:
        lines = [json.dumps(item, separators=(",", ":"), sort_keys=True) for item in events]
        body = "\n".join(lines).encode("utf-8")
        if body:
            body += b"\n"

        s3.put_object(
            Bucket=S3_BUCKET,
            Key=replay_key,
            Body=gzip.compress(body),
            ContentType="application/x-ndjson",
            ContentEncoding="gzip",
        )
        print(f"S3: uploaded s3://{S3_BUCKET}/{replay_key} ({len(events)} events)")
        return replay_key
    except Exception as exc:
        print(f"S3 upload failed for {match_id}: {exc}")
        return None


def resolve_sns_topic_arn():
    if not sns:
        return None
    if SNS_TOPIC_ARN:
        return SNS_TOPIC_ARN
    if not SNS_TOPIC_NAME:
        return None

    try:
        response = sns.create_topic(Name=SNS_TOPIC_NAME)
        arn = response.get("TopicArn")
        if arn:
            print(f"SNS: using topic {arn}")
        return arn
    except Exception as exc:
        print(f"SNS topic resolve failed for '{SNS_TOPIC_NAME}': {exc}")
        return None


SNS_TOPIC = resolve_sns_topic_arn()


def publish_match_end(match_id: str, ended_at: str, replay_key: str, extra_payload: dict):
    if not sns or not SNS_TOPIC:
        print("SNS disabled: set SNS_TOPIC_ARN or SNS_TOPIC_NAME to enable Lambda trigger")
        return None

    message = {
        "match_id": match_id,
        "table": DYNAMO_TABLE,
        "region": AWS_REGION,
        "ended_at": ended_at,
        "event_count": count_match_events(),
        "replay_frame_count": count_state_snapshots(),
        "s3_bucket": S3_BUCKET or None,
        "replay_key": replay_key,
    }
    message.update(extra_payload)

    try:
        response = sns.publish(
            TopicArn=SNS_TOPIC,
            Subject="fpga-raycaster match_end",
            Message=json.dumps(message, separators=(",", ":")),
        )
        message_id = response.get("MessageId")
        print(f"SNS: published match_end for {match_id} ({message_id})")
        return message_id
    except Exception as exc:
        print(f"SNS publish failed for {match_id}: {exc}")
        return None


def update_meta_record(match_id: str, fields: dict):
    update_parts = []
    names = {}
    values = {}

    for idx, (field, value) in enumerate(fields.items(), start=1):
        name_token = f"#f{idx}"
        value_token = f":v{idx}"
        update_parts.append(f"{name_token} = {value_token}")
        names[name_token] = field
        values[value_token] = value

    table.update_item(
        Key={"match_id": match_id, "record_type": "META"},
        UpdateExpression="SET " + ", ".join(update_parts),
        ExpressionAttributeNames=names,
        ExpressionAttributeValues=values,
    )


def reset_match_state():
    global current_match_id, current_match_started_at, current_match_events
    current_match_id = None
    current_match_started_at = None
    current_match_events = []
    game_reset_state()


# ── Game Hooks: Current Tag Game ─────────────────────────────────────────────

game_tag_count = 0


def game_reset_state():
    global game_tag_count
    game_tag_count = 0


def game_build_player_snapshot(player_total: int):
    """Read the current players from Redis in a game-specific shape."""
    ddb_players = []
    replay_players = []

    for pid in range(1, player_total + 1):
        pos = r.hgetall(f"player:{pid}")
        x = float(pos.get("x", "0"))
        y = float(pos.get("y", "0"))
        angle = float(pos.get("angle", "0"))
        flags = int(pos.get("flags", 0))

        ddb_players.append({
            "player_id": pid,
            "x": Decimal(str(x)),
            "y": Decimal(str(y)),
            "angle": Decimal(str(angle)),
            "flags": flags,
        })
        replay_players.append({
            "player_id": pid,
            "x": x,
            "y": y,
            "angle": angle,
            "flags": flags,
        })

    return ddb_players, replay_players


def game_on_match_start(event: dict):
    """Hook: define the META row and replay start payload for this game."""
    player_total = int(event.get("players", 0))
    ddb_players, replay_players = game_build_player_snapshot(player_total)

    replay_event = dict(event)
    replay_event["player_snapshot"] = replay_players

    return {
        "meta_fields": {
            "start_time": current_match_started_at,
            "players": ddb_players,
            "player_count": len(ddb_players),
            "tag_count": 0,
            "status": "in_progress",
        },
        "replay_event": replay_event,
    }


def game_on_player_tagged(event: dict):
    """Hook: define the per-tag row and replay payload for this game."""
    global game_tag_count
    game_tag_count += 1

    replay_event = dict(event)
    replay_event["tag_count"] = game_tag_count

    return {
        "record_type": f"TAG#{game_tag_count}",
        "item_fields": {
            "player_id": event.get("player_id"),
            "dist": Decimal(str(event.get("dist", 0))),
        },
        "replay_event": replay_event,
    }


def game_on_match_end(event: dict):
    """Hook: define final META updates and extra SNS payload fields."""
    replay_event = dict(event)
    replay_event["tag_count"] = game_tag_count

    return {
        "meta_fields": {
            "tag_count": game_tag_count,
            "winner": event.get("winner"),
        },
        "sns_fields": {
            "tag_count": game_tag_count,
            "winner": event.get("winner"),
        },
        "replay_event": replay_event,
    }


def game_on_state_snapshot(event: dict):
    """Hook: authoritative world-state frame for replay playback."""
    replay_event = dict(event)
    replay_event["tag_count"] = game_tag_count
    return {
        "replay_event": replay_event,
    }


# ── Pipeline Event Handlers ──────────────────────────────────────────────────

def handle_match_start(event: dict):
    if has_active_match():
        print(f"match_start: already tracking {current_match_id}, resetting")

    begin_match()
    game_reset_state()

    start_payload = game_on_match_start(event)
    record_match_event(start_payload["replay_event"], current_match_started_at)

    table.put_item(Item={
        "match_id": current_match_id,
        "record_type": "META",
        "timestamp": current_match_started_at,
        **start_payload["meta_fields"],
    })
    print(f"DynamoDB: opened {current_match_id}")


def handle_player_tagged(event: dict):
    if not has_active_match():
        print("player_tagged: no active match, ignoring")
        return

    recorded_at = utc_now_iso()
    tag_payload = game_on_player_tagged(event)
    record_match_event(tag_payload["replay_event"], recorded_at)

    table.put_item(Item={
        "match_id": current_match_id,
        "record_type": tag_payload["record_type"],
        "timestamp": recorded_at,
        **tag_payload["item_fields"],
    })
    print(f"DynamoDB: {tag_payload['record_type']} written")


def handle_match_end(event: dict):
    if not has_active_match():
        print("match_end: no active match, ignoring")
        return

    ended_at = utc_now_iso()
    end_payload = game_on_match_end(event)
    record_match_event(end_payload["replay_event"], ended_at)

    meta_fields = {
        "status": "completed",
        "end_time": ended_at,
        "event_count": count_match_events(),
        "replay_frame_count": count_state_snapshots(),
        **end_payload["meta_fields"],
    }

    match_duration = duration_ms(current_match_started_at, ended_at)
    if match_duration is not None:
        meta_fields["duration_ms"] = match_duration

    replay_key = upload_replay(current_match_id, current_match_events, current_match_started_at)
    if replay_key:
        meta_fields["replay_s3_bucket"] = S3_BUCKET
        meta_fields["replay_s3_key"] = replay_key

    try:
        update_meta_record(current_match_id, meta_fields)
        print(f"DynamoDB: {current_match_id} completed")
    except Exception as exc:
        print(f"DynamoDB update failed for {current_match_id}: {exc}")

    sns_fields = dict(end_payload["sns_fields"])
    if match_duration is not None:
        sns_fields["duration_ms"] = match_duration
    publish_match_end(current_match_id, ended_at, replay_key, sns_fields)
    reset_match_state()


def handle_state_snapshot(event: dict):
    if not has_active_match():
        return

    recorded_at = utc_now_iso()
    snapshot_payload = game_on_state_snapshot(event)
    record_match_event(snapshot_payload["replay_event"], recorded_at)


# ── Event Dispatch ────────────────────────────────────────────────────────────

HANDLERS = {
    "match_start": handle_match_start,
    "player_tagged": handle_player_tagged,
    "match_end": handle_match_end,
    "state_snapshot": handle_state_snapshot,
}

# ── Main Loop ─────────────────────────────────────────────────────────────────

print(f"Waiting on '{EVENT_KEY}' / '{REPLAY_KEY}' (BRPOP — zero CPU until event arrives)...")

while True:
    result = r.brpop([EVENT_KEY, REPLAY_KEY], timeout=0)
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
        except Exception as exc:
            print(f"Handler error '{event_type}': {exc}")
    else:
        print(f"No handler for '{event_type}'")
