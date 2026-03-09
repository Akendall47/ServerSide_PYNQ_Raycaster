#
# Lambda stats processor: generic SNS entrypoint + game-specific summary hooks.
#
# Keep the AWS plumbing stable:
#   - read SNS messages
#   - load replay from S3
#   - write summary back to DynamoDB
#
# Then swap the game hooks below if the match rules change.

import gzip
import json
import os
from datetime import datetime, timezone

import boto3

AWS_REGION = os.environ.get("AWS_REGION", "eu-west-2")
DYNAMODB_TABLE = os.environ.get("DYNAMODB_TABLE", "pynq-raycaster-seda-matches")

s3 = boto3.client("s3", region_name=AWS_REGION)
dynamo = boto3.resource("dynamodb", region_name=AWS_REGION)
table = dynamo.Table(DYNAMODB_TABLE)

# ── Generic Helpers ───────────────────────────────────────────────────────────


def utc_now_iso():
    return datetime.now(timezone.utc).isoformat()


def parse_iso(value: str):
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        return None


def load_replay_events(bucket: str, key: str):
    if not bucket or not key:
        return []

    obj = s3.get_object(Bucket=bucket, Key=key)
    payload = obj["Body"].read()
    if key.endswith(".gz"):
        payload = gzip.decompress(payload)

    events = []
    for line in payload.decode("utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        events.append(json.loads(line))
    return events


def update_meta_record(match_id: str, fields: dict):
    update_parts = []
    values = {}
    names = {}

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


# ── Game Hooks: Current Tag Game ─────────────────────────────────────────────


def game_compute_summary(events: list, message: dict):
    """Hook: derive the game-specific summary from the replay stream."""
    snapshot_frames = sum(1 for event in events if event.get("event") == "state_snapshot")
    match_events = [event for event in events if event.get("event") != "state_snapshot"]
    bit_events = sum(1 for event in match_events if event.get("event") == "bit_collected")
    game_mode = message.get("game_mode")
    if game_mode is None:
        for event in match_events:
            if event.get("game_mode") is not None:
                game_mode = event.get("game_mode")
                break
    summary = {
        "summary_event_count": len(match_events) or int(message.get("event_count", 0) or 0),
        "summary_snapshot_frames": snapshot_frames or int(message.get("replay_frame_count", 0) or 0),
        "summary_tag_events": sum(1 for event in match_events if event.get("event") == "player_tagged"),
        "summary_bit_events": bit_events or int(message.get("bits_collected", 0) or 0),
        "summary_bits_total": int(message.get("bits_total", 0) or 0),
        "summary_game_mode": int(game_mode or 0),
        "summary_winner": message.get("winner") or "unknown",
    }

    if summary["summary_tag_events"] == 0:
        summary["summary_tag_events"] = int(message.get("tag_count", 0) or 0)

    for event in reversed(match_events):
        if event.get("event") == "match_end" and event.get("winner"):
            summary["summary_winner"] = event["winner"]
            break

    if events:
        start_dt = parse_iso(events[0].get("recorded_at"))
        end_dt = parse_iso(events[-1].get("recorded_at"))
        if start_dt and end_dt:
            summary["summary_duration_ms"] = max(
                0,
                int((end_dt - start_dt).total_seconds() * 1000),
            )
    elif message.get("duration_ms") is not None:
        summary["summary_duration_ms"] = int(message["duration_ms"])

    return summary


# ── Generic SNS Processing ───────────────────────────────────────────────────


def handle_sns_message(message: dict):
    match_id = message["match_id"]
    bucket = message.get("s3_bucket")
    replay_key = message.get("replay_key")

    events = load_replay_events(bucket, replay_key)
    summary_fields = game_compute_summary(events, message)
    summary_fields["summary_processed_at"] = utc_now_iso()

    if bucket:
        summary_fields["replay_s3_bucket"] = bucket
    if replay_key:
        summary_fields["replay_s3_key"] = replay_key

    update_meta_record(match_id, summary_fields)

    return {
        "match_id": match_id,
        "event_count": summary_fields["summary_event_count"],
        "tag_events": summary_fields["summary_tag_events"],
        "winner": summary_fields["summary_winner"],
    }


def handler(event, context):
    results = []

    for record in event.get("Records", []):
        if record.get("EventSource") != "aws:sns":
            continue

        message = json.loads(record["Sns"]["Message"])
        results.append(handle_sns_message(message))

    return {
        "processed": len(results),
        "results": results,
    }
