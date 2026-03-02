# Lambda

The post-match Lambda is now wired as the final step after `match_end`.

The structure is intentionally split into:
- generic AWS plumbing
- game-specific summary hooks

That keeps it closer to a game-dev workflow: the transport and storage path stays stable, while the match logic can be swapped out.

```
T2 / T4
  → LPUSH game:seda-events
    → ec2/sidecar/sidecar.py
      → updates DynamoDB META row
      → uploads replay to S3
      → publishes SNS message
        → Lambda wakes up
          → reads replay from S3
          → computes summary counts
          → writes summary fields back to DynamoDB
```

## Files

```
lambda/
  stats_processor/
    handler.py
    requirements.txt
  deploy.sh
```

`lambda/stats_processor/handler.py` expects an SNS message shaped like:

```json
{
  "match_id": "match-20260302-142055",
  "table": "pynq-raycaster-seda-matches",
  "region": "eu-west-2",
  "ended_at": "2026-03-02T14:21:01.234567+00:00",
  "event_count": 4,
  "tag_count": 2,
  "winner": "tagger",
  "s3_bucket": "fpga-raycaster-data",
  "replay_key": "replays/year=2026/month=03/match-20260302-142055.ndjson.gz",
  "duration_ms": 12840
}
```

The handler:
- loads the replay file from S3
- counts gameplay events, state-snapshot frames, and tag events
- recomputes duration from the replay timestamps when available
- updates the `META` row with:
  - `summary_processed_at`
  - `summary_event_count`
  - `summary_snapshot_frames`
  - `summary_tag_events`
  - `summary_winner`
  - `summary_duration_ms`

## Plug-In Points

In [handler.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/lambda/stats_processor/handler.py), the split is:

- `Generic Helpers`
  - S3 read
  - DynamoDB update
  - SNS record handling
- `Game Hooks: Current Tag Game`
  - `game_compute_summary(events, message)`

If you change game mode later, this is the main function you swap first. The rest of the Lambda can usually stay unchanged.

## Deploy

Create the zip locally:

```bash
bash lambda/deploy.sh
```

Then either:
- upload the zip in the AWS Lambda console, or
- run the printed `aws lambda update-function-code ...` command

## AWS Console Settings

- Function name: `fpga-raycaster-stats-processor`
- Runtime: `Python 3.12`
- Handler: `handler.handler`
- Timeout: `30 seconds`
- Memory: `128 MB`

## Lambda Environment Variables

Set these in the Lambda console:

```text
AWS_REGION      eu-west-2
DYNAMODB_TABLE  pynq-raycaster-seda-matches
```

`boto3` is preinstalled on Lambda, so no extra dependency packaging is needed for the current handler.

## Setup Notes

See `infra/setup/setup_sns_lambda.md`.
