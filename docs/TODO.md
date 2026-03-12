# TODO / Continuation Priorities
_2026-03-03_ · updated 2026-03-11

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
  - post-match I/O (DynamoDB update, SNS, retention sweep) runs in a daemon thread
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

### ~~1. Add packet sequence validation at UDP ingress~~ ✅ Done (2026-03-11)

~~Why:~~
~~Protect the game from stale, replayed, or out-of-order packets.~~

~~How:~~
~~- Track the last accepted `seq_num` per player~~
~~- Reject packets that are not newer than the last accepted packet~~
~~- Reset that sequence baseline when the player re-registers~~

Completed:
- `validate_seq()` added to `game_logic/anticheat.py` — 16-bit wraparound arithmetic
- `t2_packet_handler.py` calls `validate_seq` upfront for **all** movement modes
- Previously `MOVEMENT_MODE_INTENT_ONLY` packets bypassed sequence checks entirely — now fixed
- Regression tests in `tests/test_bottleneck_fixes.py` (6 seq-validation tests + 3 packet-handler tests)

---

### ~~2. Cache recent match summaries in Redis~~ ✅ Done (already implemented)

Completed:
- `monitor.py` checks `game:recent-matches` in Redis first; DynamoDB scan is only a cold-start fallback
- No additional work required

---

### ~~3. Offload sidecar replay compression to a background worker~~ ✅ Done (2026-03-11)

~~Why:~~
~~Replay NDJSON compression is currently synchronous during `match_end` handling.~~
~~As replay files grow, that can delay the sidecar from returning to Redis queue~~
~~consumption.~~

Completed:
- `sidecar/_finalise_match` captures needed data into locals, calls `reset_match_state()` immediately
- Slow I/O (DynamoDB `update_meta_record`, SNS publish, `enforce_warm_retention`) runs in a `daemon=True` thread
- Next match can start before previous match's I/O thread completes
- Threading invariant tests in `tests/test_bottleneck_fixes.py` (3 threading tests)

---

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

1. ~~Do packet sequence validation first~~ ✅
2. ~~Then clean up the monitor read path with Redis-backed recent matches~~ ✅
3. ~~Then harden sidecar scalability with background replay compression~~ ✅
4. Add CloudWatch metrics once the main runtime path is stable
