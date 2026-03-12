# Monitor UI Performance Notes

This document records the recent monitor UI changes around the React/Three.js layer, why they were needed, and what the current performance improvements are.

## Summary

The monitor had three separate classes of problems:

1. The 3D React portals for the About tab and Player Stats tab were fragile and could fail to mount.
2. The monitor shipped a large initial JS payload that always included the Three.js scenes, even when those tabs were never opened.
3. The Player Stats tab could animate too many WebGL scenes at once, which is expensive and hurts browser frame time.

The fixes below address all three.

## Functional fixes

### 1. Stable portal mounting

Files:

- `monitor_ui/src/monitor-ui.jsx`
- `monitor_ui/src/components/PYNQBoard.jsx`

What changed:

- Portal target discovery was moved into a dedicated `MonitorPortals` child.
- The code now resolves `.about-react-board-slot` and `#player-stats-react-slot` after the template HTML is injected, with a `requestAnimationFrame` retry and a `MutationObserver`.

Why this is better:

- The component that owns `dangerouslySetInnerHTML` no longer also owns the long-lived portal target state.
- This avoids stale or invalid DOM node references when React rerenders the wrapper.
- It fixed the case where both the About 3D board and Player Stats 3D models appeared blank.

### 2. Restored real Player Stats component export

File:

- `monitor_ui/src/components/PlayerStatsTab.jsx`

What changed:

- The accidental stub export was removed.
- The real `PlayerStatsTab` component is now the exported component again.

Why this is better:

- The Player Stats tab now renders the real UI instead of a placeholder.
- The 3D trophy logic can actually mount and run.

### 3. Updated deprecated Three.js timer usage

Files:

- `monitor_ui/src/components/PYNQBoard.jsx`
- `monitor_ui/src/components/PlayerStatsTab.jsx`
- `monitor_ui/src/PYNQCASTCoin.js`

What changed:

- Replaced `THREE.Clock` with `THREE.Timer`.

Why this is better:

- Removes repeated console deprecation warnings.
- Keeps the code aligned with current Three.js APIs.

## Performance improvements

### 1. Lazy-loaded 3D code

Files:

- `monitor_ui/src/monitor-ui.jsx`
- `monitor_ui/build.mjs`
- `pynq_full/ec2/monitor/index.html`
- `sim_full/ec2/monitor/index.html`

What changed:

- `PYNQBoard` and `PlayerStatsTab` are now loaded with `React.lazy`.
- The build now emits an ES module entry plus split chunk files under `monitor_ui/dist/chunks/`.
- The monitor HTML now loads the UI with `<script type="module" src="/monitor-ui.js"></script>`.

Why this is better:

- The initial monitor load no longer pays the full cost of the Three.js-heavy tabs.
- Users who only use the main game and server tabs do not immediately download and execute all 3D code.
- The app now also prefetches the 3D chunks during browser idle time, so the first open of the About or Player Stats tab feels less abrupt than a pure on-demand fetch.

Measured result from the current build:

- Old monolithic entry: about `778,725` bytes raw, about `201,847` bytes gzipped.
- New entry module: `229,421` bytes raw, `62,684` bytes gzipped.

The heavy 3D code now lives in separate chunk files such as:

- `monitor_ui/dist/chunks/PYNQBoard-*.js`
- `monitor_ui/dist/chunks/PlayerStatsTab-*.js`

### 2. Precompressed asset serving

Files:

- `monitor_ui/build.mjs`
- `pynq_full/ec2/monitor/monitor.py`
- `sim_full/ec2/monitor/monitor.py`

What changed:

- The build now writes `.gz` files for JS assets in `monitor_ui/dist/`.
- The monitor servers now:
  - serve split chunk files from `monitor_ui/dist/`
  - prefer `.gz` responses when the browser sends `Accept-Encoding: gzip`
  - set `Vary: Accept-Encoding`
  - mark chunk files as long-cache immutable

Why this is better:

- Faster network transfer for the largest monitor assets.
- Better browser caching for content-hashed chunk files.
- Reduced startup cost, especially over slower SSH-tunneled or remote connections.

### 3. Cheaper player trophy rendering

File:

- `monitor_ui/src/components/PlayerStatsTab.jsx`

What changed:

- Player trophy WebGL renderers only initialize when:
  - the Player Stats page is visible
  - the card is near the viewport
- Live players stay animated, and the selected/expanded player also stays animated.
- Offline non-selected cards render a static 3D snapshot instead of running their own animation loop.
- The Player Stats live polling loop only runs while the Player Stats page is visible.

Why this is better:

- Much lower CPU/GPU cost when the player grid is open.
- Fewer simultaneous `requestAnimationFrame` loops.
- Lower chance of hitting browser WebGL context limits.
- Better overall frame pacing while still keeping the selected player visually highlighted and animated.

## Current behavior

### About tab

- The About tab loads the 3D PYNQ board only after the tab has been activated.

### Player Stats tab

- The tab loads on demand.
- The 3D code is prefetched during browser idle time after the main monitor becomes interactive.
- Player cards show a 3D trophy model.
- Live player cards remain animated.
- The selected card also remains animated when expanded/highlighted.
- Offline non-selected cards stay rendered as static 3D snapshots.

## UX tuning note

After the first optimisation pass, the UI felt too lazy because all 3D behavior was deferred too aggressively.

The current compromise is:

- keep code-splitting and gzip for the real load-time savings
- prefetch the About/Player Stats 3D chunks during idle time so the first tab open feels faster
- keep live players animated so the Player Stats tab still feels active
- only reduce work for offline/non-selected cards

This keeps most of the performance win without making the monitor feel visually dead.

## Why this should improve frame timing

The main browser-side savings come from:

1. Less JS work on first load.
2. Less parsing and execution before the monitor becomes interactive.
3. Fewer live WebGL scenes animating at the same time.
4. Fewer background polling updates when the player tab is hidden.

That combination improves both:

- time-to-interactive for the monitor UI
- steady-state frame timing when browsing the Player Stats tab

## Remaining opportunities

The next sensible optimisations, if needed, are:

1. Move the large template HTML strings out of the JS bundle entirely.
2. Reuse shared Three.js geometries/materials across player trophies instead of rebuilding them per card.
3. Reduce lighting/material complexity in the About board if browser GPU time is still high.
