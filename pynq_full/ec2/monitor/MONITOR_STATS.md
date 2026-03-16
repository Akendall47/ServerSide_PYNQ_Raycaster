# Monitor HUD & Stats Reference

## HUD Cards (top bar)

### WS Push Rate (`#fps`)
- **What it is**: The rate at which the EC2 server pushes WebSocket state messages to the browser, in Hz.
- **Data source**: Browser counts received WS messages per second (`wsUpdateCount / elapsed`).
- **Target**: 30 Hz (controlled by `STATE_PUSH_HZ` in `monitor.py`).
- **Not** the browser render rate — the canvas renders at up to 60 fps via `requestAnimationFrame` regardless of this value.

### Frame Time (`#hud-frame-ms`)
- **What it is**: Average browser `requestAnimationFrame` interval in ms, plus actual canvas render rate in fps.
- **Data source**: Rolling average of the last N `rAF` deltas (`pushFrameSample` / `averageFrameMs` in `monitor-app.js`).
- **Target**: ~16.7 ms / 60 fps. Drops indicate browser rendering pressure (large canvas, slow machine).

### WS Latency (`#hud-latency`)
- **What it is**: WebSocket transit time — how long each state message took to travel from EC2 to the browser.
- **Data source**: `Date.now()` stamped by the browser at message receipt (`window._lastStateReceivedWallMs`) minus `server_sent_at` injected by `monitor.py` using `time.time() * 1000` (UTC epoch ms).
- **Limitation**: Both clocks are wall-clock UTC, so any skew between the EC2 system clock and the browser machine clock is included. On LAN/same-machine dev this is negligible; over the internet add ~0–5 ms NTP jitter.
- **Typical range**: 1–15 ms on LAN, 20–80 ms over internet.

---

## Pipeline Chart (`#stacked-frame-chart`)

Stacked bar chart — one bar per incoming WS message, showing how each inter-message interval was spent.

| Legend label       | Field            | Meaning |
|--------------------|------------------|---------|
| **Server cadence** | `dispatch_ms`    | Idle time between consecutive WS messages arriving at the browser. Equals the inter-message gap minus transit and parse time. Represents server scheduling + network idle time. |
| **FPGA (reserved)**| `compute_ms`     | Reserved slot for future FPGA pipeline telemetry. Always 0 until FPGA timing is plumbed through the server push. |
| **WS transit**     | `network_ms`     | Same measurement as WS Latency card — `Date.now()` receive minus `server_sent_at`. |
| **JS parse**       | `composite_ms`   | Time from WS message receipt to completion of JSON parse + state update in `ws.onmessage` (`performance.now()` delta). |

**Note**: the bars are updated in real-time only during a live session. During replay, the chart freezes (no new WS messages arrive while replaying).

---

## Player Table

- **Data source**: Redis `player:{id}` hashes, updated each server tick and included in the `game:state` WS push payload.
- **Columns**: Player ID, role (runner/tagger/ghost/queued), position (x, y), flags bitmask.
- **Flag bits**: `FLAG_TAGGED=0x01`, `FLAG_MATCH_END=0x04`, `FLAG_GHOST=0x08`.

---

## Bits Panel (Game View)

- **Data source**: `bits_mask` from `game:state` Redis hash (per-tick bitmask of active/collected bits); bit positions from the `match_start` event or `game:state.bits` field.
- **Active bit**: yellow dot on canvas, lit indicator in panel.
- **Collected bit**: grey dot on canvas, dim indicator in panel.
- **During replay**: the panel is frozen to the current replay frame's `bits_mask` and is not updated by live WS pushes.
- **Only present** in `GAME_MODE_CHASE_BITS` maps (maps with `B` tiles — currently level2, level3).
