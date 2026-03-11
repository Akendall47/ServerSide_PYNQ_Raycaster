# TODO / Continuation Priorities
_2026-03-03_

## What is currently live

- The EC2 Python SEDA pipeline is running:
  - `T1` UDP receive
  - `T2` 20 Hz game tick
  - `T3` UDP broadcast
  - `T4` Redis write path
- The monitor is live:
  - WebSocket UI
  - EC2 control actions
  - replay playback from S3
- The sidecar is live:
  - DynamoDB writes
  - S3 replay uploads
  - SNS publish on `match_end`
- Lambda post-match processing is live:
  - reads replay from S3
  - writes summary fields back to DynamoDB
- Storage is now tiered:
  - Redis = hot
  - DynamoDB = warm
  - S3 = cold
- Warm-tier retention is now enforced:
  - recent completed matches stay in DynamoDB
  - older completed match rows are archived to S3 and then removed from DynamoDB
- Node simulators support:
  - auto mode
  - manual mode
  - per-node mode switching from the monitor

## Pragmatic next improvements (ranked by impact)

### 1. Add packet sequence validation at UDP ingress

Why:
Protect the game from stale, replayed, or out-of-order packets.

How:
- Track the last accepted `seq_num` per player
- Reject packets that are not newer than the last accepted packet
- Reset that sequence baseline when the player re-registers

Implementation note:
This can be done at the T1/T2 boundary, but the cleanest place is where packet
state is first interpreted per player.

Effort:
1-2 hours

Impact:
High. Strong protocol hardening, low risk.

Fits:
Week 1 hardening

### 2. Cache recent match summaries in Redis

Why:
The monitor currently polls DynamoDB every 2 seconds and still relies on a full
`META` scan for the recent-match list. That is the weakest current read path.

How:
- On `match_end`, have the sidecar write a compact summary into
  `game:recent-matches`
- Let the monitor read Redis first for the recent-match panel
- Keep DynamoDB as the durable warm-tier source, but refresh from it less often

Effort:
2-3 hours

Impact:
Medium. Reduces DynamoDB scan pressure and makes the monitor path cleaner.

Fits:
Week 2 optimization

### 3. Offload sidecar replay compression to a background worker

Why:
Replay NDJSON compression is currently synchronous during `match_end` handling.
As replay files grow, that can delay the sidecar from returning to Redis queue
consumption.

How:
- Push replay compression + upload into a background thread or executor
- Let the main sidecar loop resume event consumption immediately
- Track replay upload status separately from gameplay completion

Effort:
3-4 hours

Impact:
Medium. Better scaling as match length and replay size grow.

Fits:
Week 2-3 load hardening

### 4. Add CloudWatch metrics and a simple dashboard

Why:
The current monitor is useful for live debugging, but there is still no durable
metrics trail for latency, throughput, or AWS-side errors.

How:
- Emit tick latency from T2
- Emit Redis write latency from T4
- Emit sidecar lag / queue age from the sidecar
- Emit monitor backend query / replay load latency from the monitor

Effort:
2-3 hours

Impact:
Medium. Makes performance work measurable and easier to present.

Fits:
Week 2 observability pass

## Suggested order for teammates

1. Do packet sequence validation first
2. Then clean up the monitor read path with Redis-backed recent matches
3. Then harden sidecar scalability with background replay compression
4. Then add CloudWatch metrics once the main runtime path is stable
