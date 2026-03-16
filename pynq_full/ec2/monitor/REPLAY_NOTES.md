# Replay Notes

## Hardware Replay Removed

We intentionally removed the old "auto play" / hardware replay button from the
monitor and kept replay as a browser minimap feature only.

Why:

1. The stored replay data is authoritative and already contains per-frame
   `x`, `y`, and `angle` snapshots.
2. The old hardware path was **not** streaming those recorded frames back to the
   PYNQ boards.
3. Instead, it only read the replay's `match_start` metadata, set the map and
   ghost count, switched boards to auto, and started a brand new live match.
4. That meant the hardware "replay" could drift from the real recorded match,
   confuse debugging, and make playback look wrong even when the replay artifact
   itself was correct.

Until we build a true server-driven replay mode that streams recorded
`state_snapshot` frames over UDP, replay should stay monitor-only.

## Why Replay Was Flaky Before

The first replay implementation worked, but it was unreliable in practice for three specific reasons:

1. The replay buttons were being rebuilt on every WebSocket push.
   - The monitor updates at 20 Hz.
   - That meant the replay button DOM was being destroyed and recreated 20 times per second.
   - Result: clicks could feel hit-or-miss because the element under the cursor could change mid-click.

2. Replay loading was blocking the monitor server event loop.
   - The monitor fetched replay metadata from DynamoDB and replay files from S3 synchronously.
   - While that was happening, the aiohttp server could stall briefly.
   - Result: replay loads could feel inconsistent or fail under timing pressure.

3. The browser allowed overlapping replay loads.
   - Multiple rapid clicks could start multiple fetches for the same replay.
   - Result: race conditions and inconsistent UI state.

## Fixes Applied

### 1. Replay list only re-renders when match data changes

In `index.html`:
- Added `lastMatchListSignature`
- Added `lastReplayListSignature`

The match list and replay list now only re-render when the actual recent-match payload changes, not on every WebSocket tick.

Effect:
- replay buttons stay stable
- clicks register reliably
- less browser churn

### 2. Replay loading moved off the aiohttp event loop

In `monitor.py`:
- `replay_handler()` now uses:

```python
await asyncio.to_thread(fetch_replay, match_id)
```

This moves the blocking DynamoDB + S3 + decompression work onto a worker thread instead of the main async loop.

Effect:
- replay loads no longer block the monitor server
- better responsiveness while loading

### 3. Frontend replay load lock

In `index.html`:
- Added `replayLoading`

While one replay is loading, extra clicks are ignored until that request completes.

Effect:
- one click maps to one replay request
- fewer race conditions

## Performance Impact

These changes are monitor-only.

They do **not** affect:
- `T1` UDP receive
- `T2` game tick
- `T3` broadcaster
- `T4` Redis writer
- gameplay timing

If anything, they reduce unnecessary work in the monitor layer.

## Current Replay Architecture

The replay path now works like this:

1. `T2` emits authoritative `state_snapshot` frames during a match
2. The sidecar merges those frames into the replay artifact
3. The replay is stored in S3 as compressed NDJSON
4. DynamoDB `META` stores the replay key and frame counts
5. The monitor fetches the replay from S3 by `match_id`
6. The browser minimap plays back `state_snapshot` frames at the current monitor replay cadence

## Remaining Nice-to-Haves

If replay needs another polish pass later, the next useful improvements are:

1. Pause/play control
2. Replay scrub slider
3. Speed control (`0.5x`, `1x`, `2x`)
4. A dedicated replay mode that pauses more of the live UI while playback runs
