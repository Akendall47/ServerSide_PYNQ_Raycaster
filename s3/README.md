# S3

S3 is now the replay archive for completed matches.

This path is also split conceptually:
- generic sidecar pipeline writes the archive
- game-specific hooks decide what replay events go into that archive

```
ec2/sidecar/sidecar.py
  → collects match_start / player_tagged / match_end events
  → writes META + TAG rows to DynamoDB
  → on match_end uploads the in-memory replay log to S3
```

## What Gets Stored

The current sidecar uploads one compressed NDJSON replay file per completed match:

```text
s3://fpga-raycaster-data/replays/year=YYYY/month=MM/{match_id}.ndjson.gz
```

Each line is one JSON event with a `recorded_at` timestamp. For the current game this now includes:
- `match_start`
- `state_snapshot`
- `player_tagged`
- `match_end`

`state_snapshot` rows are the authoritative server view of each player at that moment, so the replay file can now drive actual world-state playback instead of only high-level event playback.

## Plug-In Points

In [sidecar.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/ec2/sidecar/sidecar.py), the split is:

- `Generic Pipeline`
  - Redis consume
  - DynamoDB writes
  - S3 upload
  - SNS publish
- `Game Hooks: Current Tag Game`
  - `game_on_match_start(...)`
  - `game_on_player_tagged(...)`
  - `game_on_match_end(...)`

So if you switch to a different game mode, the S3 path itself usually stays the same; you mainly change the hook functions that shape the replay payload.

## Files

- `s3/create_bucket.py`
  Creates the bucket if needed and applies "block all public access".

## Manual Test

After creating the bucket:

1. Run a full match.
2. Wait for the sidecar to receive `match_end`.
3. Check the S3 console for a new object under `replays/year=.../month=.../`.

## Optional CLI Setup

```bash
python3 s3/create_bucket.py
```

Defaults:

```text
AWS_REGION  eu-west-2
S3_BUCKET   fpga-raycaster-data
```

Override either with environment variables if needed.

## Setup Notes

See `infra/setup/setup_s3.md`.
