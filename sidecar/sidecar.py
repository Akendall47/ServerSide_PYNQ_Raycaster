# ec2/sidecar/sidecar.py — BRPOP game:seda-events → DynamoDB / S3 / SNS pipeline.
# Game hooks (game_on_*) define match-specific behaviour; pipeline logic stays fixed.

import gzip
import json
import os
import threading
from datetime import datetime, timezone
from decimal import Decimal

import boto3
import redis
from boto3.dynamodb.conditions import Key

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
S3_ARCHIVE_PREFIX = os.environ.get("S3_ARCHIVE_PREFIX", "ddb-archive").strip("/")
DDB_WARM_MATCH_LIMIT = max(0, int(os.environ.get("DDB_WARM_MATCH_LIMIT", "25")))
ENABLE_DDB_RETENTION = os.environ.get("ENABLE_DDB_RETENTION", "1").strip().lower() not in {
    "0", "false", "no", "off"
}

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
snapshot_counter = 0          # counts state_snapshot events; used for keyframe marking
KEYFRAME_INTERVAL = 60        # emit a full keyframe every N snapshots (1s at 60 Hz)

# ── S3 Multipart Upload State ─────────────────────────────────────────────────
# Replay lines stream to S3 during the match instead of buffering in memory.
# S3 multipart requires each part (except the last) to be >= 5 MB.
# We accumulate uncompressed NDJSON lines until the buffer hits MULTIPART_CHUNK_SIZE,
# then flush a gzip-compressed part. match_end closes the upload.

S3_MULTIPART_MIN_BYTES = 5 * 1024 * 1024   # 5 MB — S3 minimum part size
_mp_upload_id   = None    # active multipart upload ID
_mp_replay_key  = None    # S3 key for the current upload
_mp_parts       = []      # list of {"PartNumber": n, "ETag": "..."} dicts
_mp_part_number = 0       # next part number (1-indexed)
_mp_line_buffer = []      # NDJSON lines not yet flushed to a part

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
    global current_match_id, current_match_started_at, current_match_events, snapshot_counter
    current_match_id = make_match_id()
    current_match_started_at = utc_now_iso()
    current_match_events = []
    snapshot_counter = 0


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


def archive_key_for(match_id: str, started_at: str):
    prefix = S3_ARCHIVE_PREFIX or "ddb-archive"
    started_dt = parse_iso(started_at) or utc_now()
    return (
        f"{prefix}/year={started_dt:%Y}/month={started_dt:%m}/"
        f"{match_id}.json.gz"
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


def mp_open(match_id: str, started_at: str):
    """Open an S3 multipart upload for the current match replay."""
    global _mp_upload_id, _mp_replay_key, _mp_parts, _mp_part_number, _mp_line_buffer
    if not s3 or not S3_BUCKET:
        return
    _mp_replay_key  = replay_key_for(match_id, started_at)
    _mp_parts       = []
    _mp_part_number = 0
    _mp_line_buffer = []
    try:
        resp = s3.create_multipart_upload(
            Bucket=S3_BUCKET,
            Key=_mp_replay_key,
            ContentType="application/x-ndjson",
            ContentEncoding="gzip",
        )
        _mp_upload_id = resp["UploadId"]
        print(f"S3 multipart: opened {_mp_replay_key} ({_mp_upload_id})")
    except Exception as exc:
        print(f"S3 multipart open failed: {exc}")
        _mp_upload_id = None


def mp_append(event: dict):
    """Buffer one NDJSON line; flush a part if buffer exceeds 5 MB."""
    global _mp_line_buffer
    if _mp_upload_id is None:
        return
    _mp_line_buffer.append(json.dumps(event, separators=(",", ":"), sort_keys=True))
    raw_size = sum(len(l) + 1 for l in _mp_line_buffer)
    if raw_size >= S3_MULTIPART_MIN_BYTES:
        mp_flush()


def mp_flush():
    """Compress buffered lines and upload as the next multipart part."""
    global _mp_line_buffer, _mp_part_number, _mp_parts
    if _mp_upload_id is None or not _mp_line_buffer:
        return
    _mp_part_number += 1
    body = gzip.compress(("\n".join(_mp_line_buffer) + "\n").encode("utf-8"))
    try:
        resp = s3.upload_part(
            Bucket=S3_BUCKET,
            Key=_mp_replay_key,
            UploadId=_mp_upload_id,
            PartNumber=_mp_part_number,
            Body=body,
        )
        _mp_parts.append({"PartNumber": _mp_part_number, "ETag": resp["ETag"]})
        print(f"S3 multipart: flushed part {_mp_part_number} "
              f"({len(_mp_line_buffer)} lines, {len(body)} bytes compressed)")
        _mp_line_buffer = []
    except Exception as exc:
        print(f"S3 multipart flush failed (part {_mp_part_number}): {exc}")


def mp_close():
    """Flush remaining lines as the final part and complete the multipart upload."""
    global _mp_upload_id, _mp_replay_key, _mp_parts, _mp_part_number, _mp_line_buffer
    if _mp_upload_id is None:
        return None
    if _mp_line_buffer:
        mp_flush()
    if not _mp_parts:
        # Nothing was uploaded — abort and fall back to standard upload
        try:
            s3.abort_multipart_upload(Bucket=S3_BUCKET, Key=_mp_replay_key,
                                      UploadId=_mp_upload_id)
        except Exception:
            pass
        _mp_upload_id = None
        return None
    try:
        s3.complete_multipart_upload(
            Bucket=S3_BUCKET,
            Key=_mp_replay_key,
            UploadId=_mp_upload_id,
            MultipartUpload={"Parts": _mp_parts},
        )
        print(f"S3 multipart: completed {_mp_replay_key} "
              f"({len(_mp_parts)} parts)")
        key = _mp_replay_key
    except Exception as exc:
        print(f"S3 multipart complete failed: {exc}")
        key = None
    finally:
        _mp_upload_id  = None
        _mp_replay_key = None
        _mp_parts      = []
        _mp_part_number = 0
        _mp_line_buffer = []
    return key


def mp_abort():
    """Abort a multipart upload on error or reset."""
    global _mp_upload_id, _mp_replay_key, _mp_parts, _mp_part_number, _mp_line_buffer
    if _mp_upload_id and s3 and S3_BUCKET:
        try:
            s3.abort_multipart_upload(Bucket=S3_BUCKET, Key=_mp_replay_key,
                                      UploadId=_mp_upload_id)
            print(f"S3 multipart: aborted {_mp_replay_key}")
        except Exception:
            pass
    _mp_upload_id  = None
    _mp_replay_key = None
    _mp_parts      = []
    _mp_part_number = 0
    _mp_line_buffer = []


def _plain_number(value: Decimal):
    if value == value.to_integral_value():
        return int(value)
    return float(value)


def to_plain_json(value):
    if isinstance(value, Decimal):
        return _plain_number(value)
    if isinstance(value, dict):
        return {key: to_plain_json(inner) for key, inner in value.items()}
    if isinstance(value, list):
        return [to_plain_json(inner) for inner in value]
    return value


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


def list_completed_meta_rows():
    items = []
    last_evaluated_key = None

    while True:
        kwargs = {
            "FilterExpression": "record_type = :rt",
            "ExpressionAttributeValues": {":rt": "META"},
            "ProjectionExpression": "match_id, #ts, #st",
            "ExpressionAttributeNames": {"#ts": "timestamp", "#st": "status"},
        }
        if last_evaluated_key:
            kwargs["ExclusiveStartKey"] = last_evaluated_key

        response = table.scan(**kwargs)
        items.extend(response.get("Items", []))
        last_evaluated_key = response.get("LastEvaluatedKey")
        if not last_evaluated_key:
            break

    completed = [item for item in items if item.get("status") == "completed"]
    return sorted(completed, key=lambda item: item.get("timestamp", ""), reverse=True)


def load_match_rows(match_id: str):
    items = []
    last_evaluated_key = None

    while True:
        kwargs = {
            "KeyConditionExpression": Key("match_id").eq(match_id),
        }
        if last_evaluated_key:
            kwargs["ExclusiveStartKey"] = last_evaluated_key

        response = table.query(**kwargs)
        items.extend(response.get("Items", []))
        last_evaluated_key = response.get("LastEvaluatedKey")
        if not last_evaluated_key:
            break

    return items


def upload_ddb_archive(match_meta: dict, rows: list):
    if not s3 or not S3_BUCKET:
        print("DDB retention skipped: S3 disabled")
        return None

    match_id = match_meta["match_id"]
    timestamp = match_meta.get("timestamp", "")
    archive_key = archive_key_for(match_id, timestamp)
    archive_doc = {
        "match_id": match_id,
        "archived_at": utc_now_iso(),
        "source_table": DYNAMO_TABLE,
        "row_count": len(rows),
        "rows": [to_plain_json(row) for row in rows],
    }

    try:
        s3.put_object(
            Bucket=S3_BUCKET,
            Key=archive_key,
            Body=gzip.compress(
                json.dumps(archive_doc, separators=(",", ":"), sort_keys=True).encode("utf-8")
            ),
            ContentType="application/json",
            ContentEncoding="gzip",
        )
        print(f"S3: archived DynamoDB rows for {match_id} to s3://{S3_BUCKET}/{archive_key}")
        return archive_key
    except Exception as exc:
        print(f"DDB archive upload failed for {match_id}: {exc}")
        return None


def delete_match_rows(rows: list):
    if not rows:
        return 0

    deleted = 0
    with table.batch_writer() as batch:
        for row in rows:
            batch.delete_item(Key={
                "match_id": row["match_id"],
                "record_type": row["record_type"],
            })
            deleted += 1
    return deleted


def enforce_warm_retention():
    if not ENABLE_DDB_RETENTION:
        return
    if not s3 or not S3_BUCKET:
        print("DDB retention disabled: S3 bucket unavailable")
        return

    completed = list_completed_meta_rows()
    if len(completed) <= DDB_WARM_MATCH_LIMIT:
        return

    archive_candidates = completed[DDB_WARM_MATCH_LIMIT:]
    for match_meta in archive_candidates:
        match_id = match_meta["match_id"]
        try:
            rows = load_match_rows(match_id)
            if not rows:
                continue
            archive_key = upload_ddb_archive(match_meta, rows)
            if not archive_key:
                continue
            deleted = delete_match_rows(rows)
            print(
                f"DDB retention: archived {match_id} "
                f"({deleted} rows removed, warm limit {DDB_WARM_MATCH_LIMIT})"
            )
        except Exception as exc:
            print(f"DDB retention failed for {match_id}: {exc}")


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
    global current_match_id, current_match_started_at, current_match_events, snapshot_counter
    mp_abort()
    current_match_id = None
    current_match_started_at = None
    current_match_events = []
    snapshot_counter = 0
    game_reset_state()


# ── Game Hooks: Current Match Modes ──────────────────────────────────────────

GAME_MODE_CHASE = 0
GAME_MODE_CHASE_BITS = 1

game_tag_count = 0
game_bit_count = 0
game_bits_total = 0
game_mode = GAME_MODE_CHASE
game_human_players = 0
game_ghost_count = 0
game_map_name = None


def game_reset_state():
    global game_tag_count, game_bit_count, game_bits_total
    global game_mode, game_human_players, game_ghost_count, game_map_name
    game_tag_count = 0
    game_bit_count = 0
    game_bits_total = 0
    game_mode = GAME_MODE_CHASE
    game_human_players = 0
    game_ghost_count = 0
    game_map_name = None


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
    global game_mode, game_bits_total, game_human_players, game_ghost_count, game_map_name
    game_mode = int(event.get("game_mode", GAME_MODE_CHASE) or GAME_MODE_CHASE)
    game_bits_total = len(event.get("bits", []) or [])
    game_human_players = int(event.get("human_players", event.get("players", 0)) or 0)
    game_ghost_count = int(event.get("ghost_count", 0) or 0)
    game_map_name = event.get("map")

    player_total = int(event.get("players", 0))
    ddb_players, replay_players = game_build_player_snapshot(player_total)

    replay_event = dict(event)
    replay_event["player_snapshot"] = replay_players

    return {
        "meta_fields": {
            "start_time": current_match_started_at,
            "players": ddb_players,
            "player_count": len(ddb_players),
            "human_player_count": game_human_players,
            "ghost_count": game_ghost_count,
            "game_mode": game_mode,
            "map_name": game_map_name,
            "bits_total": game_bits_total,
            "bits_collected": 0,
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


def game_on_bit_collected(event: dict):
    """Hook: define the per-bit row and replay payload for bit mode."""
    global game_bit_count
    game_bit_count += 1

    replay_event = dict(event)
    replay_event["bit_count"] = game_bit_count
    replay_event["tag_count"] = game_tag_count

    return {
        "record_type": f"BIT#{game_bit_count}",
        "item_fields": {
            "bit_id": event.get("bit_id"),
            "runner_id": event.get("runner_id"),
            "bits_mask": int(event.get("bits_mask", 0xFFFF)),
        },
        "replay_event": replay_event,
    }


def game_on_match_end(event: dict):
    """Hook: define final META updates and extra SNS payload fields."""
    replay_event = dict(event)
    replay_event["tag_count"] = game_tag_count
    replay_event["bit_count"] = game_bit_count

    return {
        "meta_fields": {
            "game_mode": game_mode,
            "map_name": game_map_name,
            "tag_count": game_tag_count,
            "bits_total": game_bits_total,
            "bits_collected": game_bit_count,
            "winner": event.get("winner"),
            "end_reason": event.get("reason"),
        },
        "sns_fields": {
            "game_mode": game_mode,
            "map_name": game_map_name,
            "tag_count": game_tag_count,
            "bits_total": game_bits_total,
            "bits_collected": game_bit_count,
            "winner": event.get("winner"),
            "reason": event.get("reason"),
        },
        "replay_event": replay_event,
    }


def game_on_match_abort(event: dict):
    """Hook: define final META updates when a match is aborted mid-flight."""
    replay_event = dict(event)
    replay_event["tag_count"] = game_tag_count
    replay_event["bit_count"] = game_bit_count

    return {
        "meta_fields": {
            "game_mode": game_mode,
            "map_name": game_map_name,
            "tag_count": game_tag_count,
            "bits_total": game_bits_total,
            "bits_collected": game_bit_count,
            "end_reason": event.get("reason", "match_aborted"),
        },
        "replay_event": replay_event,
    }


def game_on_state_snapshot(event: dict):
    """Hook: authoritative world-state frame for replay playback.
    Every KEYFRAME_INTERVAL snapshots is marked keyframe=True so the dashboard
    can seek to any point in O(1) without replaying from frame 0.
    """
    global snapshot_counter
    snapshot_counter += 1
    replay_event = dict(event)
    replay_event["tag_count"] = game_tag_count
    replay_event["bit_count"] = game_bit_count
    replay_event["keyframe"] = (snapshot_counter % KEYFRAME_INTERVAL == 1)
    return {
        "replay_event": replay_event,
    }


# ── Pipeline Event Handlers ──────────────────────────────────────────────────

def handle_match_start(event: dict):
    if has_active_match():
        print(f"match_start: already tracking {current_match_id}, resetting")
        mp_abort()

    begin_match()
    game_reset_state()

    start_payload = game_on_match_start(event)
    record_match_event(start_payload["replay_event"], current_match_started_at)

    # Open streaming S3 multipart upload for this match's replay
    mp_open(current_match_id, current_match_started_at)
    # Stream the match_start event as the first replay line
    mp_append({**start_payload["replay_event"],
               "match_id": current_match_id,
               "recorded_at": current_match_started_at})

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
    mp_append({**tag_payload["replay_event"],
               "match_id": current_match_id,
               "recorded_at": recorded_at})

    table.put_item(Item={
        "match_id": current_match_id,
        "record_type": tag_payload["record_type"],
        "timestamp": recorded_at,
        **tag_payload["item_fields"],
    })
    print(f"DynamoDB: {tag_payload['record_type']} written")


def handle_bit_collected(event: dict):
    if not has_active_match():
        print("bit_collected: no active match, ignoring")
        return

    recorded_at = utc_now_iso()
    bit_payload = game_on_bit_collected(event)
    record_match_event(bit_payload["replay_event"], recorded_at)
    mp_append({**bit_payload["replay_event"],
               "match_id": current_match_id,
               "recorded_at": recorded_at})

    table.put_item(Item={
        "match_id": current_match_id,
        "record_type": bit_payload["record_type"],
        "timestamp": recorded_at,
        **bit_payload["item_fields"],
    })
    print(f"DynamoDB: {bit_payload['record_type']} written")


def _cache_recent_match(status: str, replay_key: str):
    try:
        summary = {
            "match_id": current_match_id,
            "status": status,
            "timestamp": current_match_started_at[:19].replace("T", " "),
            "has_replay": bool(replay_key),
            "replay_frames": count_state_snapshots(),
            "has_state_replay": count_state_snapshots() > 0,
        }
        r.lpush("game:recent-matches", json.dumps(summary, separators=(",", ":")))
        r.ltrim("game:recent-matches", 0, 4)
        print(f"Redis: cached summary for {current_match_id} in game:recent-matches")
    except Exception as exc:
        print(f"Redis recent-matches write failed: {exc}")


def _finalise_match(status: str, replay_event: dict, meta_fields: dict,
                    *, sns_fields=None):
    ended_at = utc_now_iso()
    record_match_event(replay_event, ended_at)
    mp_append({
        **replay_event,
        "match_id": current_match_id,
        "recorded_at": ended_at,
    })

    final_meta = {
        "status": status,
        "end_time": ended_at,
        "event_count": count_match_events(),
        "replay_frame_count": count_state_snapshots(),
        **meta_fields,
    }

    match_duration = duration_ms(current_match_started_at, ended_at)
    if match_duration is not None:
        final_meta["duration_ms"] = match_duration

    # Close the multipart upload synchronously — most data was already streamed
    # during the match, so this only flushes the tail buffer.
    replay_key = mp_close()
    if replay_key is None:
        replay_key = upload_replay(current_match_id, current_match_events, current_match_started_at)
    if replay_key:
        final_meta["replay_s3_bucket"] = S3_BUCKET
        final_meta["replay_s3_key"] = replay_key

    # Cache the summary in Redis immediately so the monitor updates without delay.
    _cache_recent_match(status, replay_key)

    # Capture everything the background thread needs before resetting global state.
    _match_id      = current_match_id
    _final_meta    = final_meta
    _match_duration = match_duration
    _sns_fields    = dict(sns_fields) if sns_fields is not None else None

    # Reset global state now so the sidecar can accept the next match immediately.
    reset_match_state()

    # DynamoDB update + SNS publish + warm retention run in a background thread
    # so the main BRPOP loop is not blocked by network I/O.
    def _post_match_io():
        try:
            update_meta_record(_match_id, _final_meta)
            print(f"DynamoDB: {_match_id} {status}")
        except Exception as exc:
            print(f"DynamoDB update failed for {_match_id}: {exc}")

        if _sns_fields is not None:
            outbound = dict(_sns_fields)
            if _match_duration is not None:
                outbound["duration_ms"] = _match_duration
            publish_match_end(_match_id, ended_at, replay_key, outbound)

        enforce_warm_retention()

    threading.Thread(target=_post_match_io, daemon=True).start()


def handle_match_end(event: dict):
    if not has_active_match():
        print("match_end: no active match, ignoring")
        return

    end_payload = game_on_match_end(event)
    _finalise_match(
        "completed",
        end_payload["replay_event"],
        end_payload["meta_fields"],
        sns_fields=end_payload["sns_fields"],
    )


def handle_match_abort(event: dict):
    if not has_active_match():
        print("match_aborted: no active match, ignoring")
        return

    abort_payload = game_on_match_abort(event)
    _finalise_match(
        "aborted",
        abort_payload["replay_event"],
        abort_payload["meta_fields"],
    )


def handle_state_snapshot(event: dict):
    if not has_active_match():
        return

    recorded_at = utc_now_iso()
    snapshot_payload = game_on_state_snapshot(event)
    record_match_event(snapshot_payload["replay_event"], recorded_at)
    mp_append({**snapshot_payload["replay_event"],
               "match_id": current_match_id,
               "recorded_at": recorded_at})


def handle_transient_match_event(event: dict):
    if not has_active_match():
        return

    recorded_at = utc_now_iso()
    replay_event = dict(event)
    record_match_event(replay_event, recorded_at)
    mp_append({**replay_event, "match_id": current_match_id, "recorded_at": recorded_at})


# ── Event Dispatch ────────────────────────────────────────────────────────────

HANDLERS = {
    "match_start": handle_match_start,
    "player_tagged": handle_player_tagged,
    "bit_collected": handle_bit_collected,
    "match_paused": handle_transient_match_event,
    "match_resumed": handle_transient_match_event,
    "match_end": handle_match_end,
    "match_aborted": handle_match_abort,
    "state_snapshot": handle_state_snapshot,
}

# ── Main Loop ─────────────────────────────────────────────────────────────────

print(f"Waiting on '{EVENT_KEY}' / '{REPLAY_KEY}' (BRPOP — zero CPU until event arrives)...")
enforce_warm_retention()

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
