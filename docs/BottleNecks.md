# Current Bottlenecks
_2026-03-03_ · updated 2026-03-11

## Main architectural pressure points

### ~~1. No sequence validation on UDP packets~~ ✅ Fixed (2026-03-11)

~~Risk:~~
~~The server still trusts client packet order too much. Stale or replayed packets can~~
~~be accepted if they arrived late enough to look valid at the movement layer.~~

~~Why it matters:~~
~~- weakens protocol correctness~~
~~- makes weird movement bugs harder to reason about~~
~~- leaves an obvious hardening gap before real PYNQ testing expands~~

Resolution:
- `validate_seq()` added to `game_logic/anticheat.py` — 16-bit wraparound arithmetic
- `t2_packet_handler._process_packet` calls it upfront for all movement modes
- `MOVEMENT_MODE_INTENT_ONLY` previously bypassed this check entirely — now fixed
- Tests: `tests/test_bottleneck_fixes.py` (9 tests covering seq validation and packet-handler rejection)

---

### ~~2. Monitor recent-match list still uses a full DynamoDB scan~~ ✅ Already fixed

~~Risk:~~
~~The monitor polls every 2 seconds and builds the recent-match list from a full~~
~~`META` scan.~~

~~Why it matters:~~
~~- unnecessary warm-tier reads~~
~~- avoidable monitor cost~~
~~- becomes harder to justify as the table grows~~

Resolution:
- `monitor.py` reads `game:recent-matches` from Redis first
- DynamoDB scan only runs as a cold-start fallback when Redis has no data
- No additional changes required

---

### ~~3. Sidecar replay compression is synchronous~~ ✅ Fixed (2026-03-11)

~~Risk:~~
~~Replay compression and upload currently happen inline during `match_end`.~~

~~Why it matters:~~
~~- longer matches mean larger replay files~~
~~- larger replay files mean the sidecar spends longer blocked in post-match work~~
~~- this reduces headroom before the sidecar becomes the next scaling bottleneck~~

Resolution:
- `sidecar/_finalise_match` flushes the S3 tail and caches the Redis summary synchronously, then calls `reset_match_state()` immediately
- DynamoDB update, SNS publish, and `enforce_warm_retention` run in a `daemon=True` thread
- The sidecar's BRPOP loop unblocks as soon as state resets; next match can start before previous I/O completes
- Tests: `tests/test_bottleneck_fixes.py` (3 threading invariant tests)

---

### 4. Observability is still mostly manual

Risk:
The browser monitor is good for live debugging, but it is not a replacement for
durable metrics, alarms, or historical latency tracking.

Why it matters:
- harder to prove where time is being spent
- harder to compare runs or demonstrate improvements
- harder to catch regressions outside active manual testing

## Recommended order

1. ~~Add packet sequence validation~~ ✅
2. ~~Move recent-match UI reads toward Redis~~ ✅
3. ~~Offload replay compression from the sidecar main loop~~ ✅
4. Add CloudWatch metrics after the runtime path is stable
