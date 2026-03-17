// ── Canvas ─────────────────────────────────────────────────────────────────
const interpolatedLivePoses = {};
let lastInterpolatedStateVersion = -1;
const INTERPOLATION_SNAP_DISTANCE = 18.0;
const INTERPOLATION_MIN_MS = 25;
const INTERPOLATION_MAX_MS = 140;

function wrapAngleDelta(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function interpolateAngle(fromAngle, toAngle, t) {
  return fromAngle + wrapAngleDelta(toAngle - fromAngle) * t;
}

function resetMonitorInterpolationState() {
  for (const key of Object.keys(interpolatedLivePoses)) delete interpolatedLivePoses[key];
  lastInterpolatedStateVersion = -1;
}

window.resetMonitorInterpolationState = resetMonitorInterpolationState;

function updateInterpolatedLivePlayers(players, now) {
  const stateVersion = Number(window.latestStateVersion || 0);
  const receivedAt = Number(window.latestStateReceivedAt || now);
  const pushHz = Number(latestState?.redis?.monitor_push_hz || 30);
  const durationMs = Math.max(
    INTERPOLATION_MIN_MS,
    Math.min(INTERPOLATION_MAX_MS, Math.round(1000 / Math.max(1, pushHz))),
  );

  if (stateVersion !== lastInterpolatedStateVersion) {
    const seenKeys = new Set();
    players.forEach((player) => {
      const key = player.entityKey;
      seenKeys.add(key);
      const existing = interpolatedLivePoses[key];
      const flagsChanged = existing && Number(existing.flags) !== Number(player.flags);
      const movedTooFar = existing && Math.hypot(player.x - existing.toX, player.y - existing.toY) >= INTERPOLATION_SNAP_DISTANCE;
      const shouldSnap = !existing || player.queued || flagsChanged || movedTooFar;
      const startX = shouldSnap ? player.x : existing.currentX;
      const startY = shouldSnap ? player.y : existing.currentY;
      const startAngle = shouldSnap ? player.angle : existing.currentAngle;
      interpolatedLivePoses[key] = {
        currentX: startX,
        currentY: startY,
        currentAngle: startAngle,
        fromX: startX,
        fromY: startY,
        fromAngle: startAngle,
        toX: player.x,
        toY: player.y,
        toAngle: player.angle,
        startedAt: receivedAt,
        durationMs,
        flags: player.flags,
      };
    });
    Object.keys(interpolatedLivePoses).forEach((key) => {
      if (!seenKeys.has(key)) delete interpolatedLivePoses[key];
    });
    lastInterpolatedStateVersion = stateVersion;
  }

  return players.map((player) => {
    const pose = interpolatedLivePoses[player.entityKey];
    if (!pose || player.queued) return player;
    const t = Math.max(0, Math.min(1, (now - pose.startedAt) / Math.max(1, pose.durationMs)));
    pose.currentX = pose.fromX + (pose.toX - pose.fromX) * t;
    pose.currentY = pose.fromY + (pose.toY - pose.fromY) * t;
    pose.currentAngle = interpolateAngle(pose.fromAngle, pose.toAngle, t);
    return {
      ...player,
      x: pose.currentX,
      y: pose.currentY,
      angle: pose.currentAngle,
    };
  });
}

// ── Static map cache ────────────────────────────────────────────────────────
// Walls, grid lines, AO shadows, and vignette don't change during a match.
// Render them once to an OffscreenCanvas and blit each frame.

let _mapCacheCanvas = null;   // OffscreenCanvas or null
let _mapCacheKey    = '';     // invalidation key

function invalidateMapCache() {
  _mapCacheCanvas = null;
  _mapCacheKey = '';
}

window.invalidateMonitorMapCache = invalidateMapCache;

// ── Canvas resize ───────────────────────────────────────────────────────────
// Keep the canvas resolution matched to its CSS display size so it renders
// at full sharpness rather than being upscaled from 480×480.

function syncCanvasSize() {
  const wrap = canvas.parentElement;
  if (!wrap) return false;
  const rect = wrap.getBoundingClientRect();
  const side = Math.floor(Math.min(rect.width, rect.height) * 0.92);
  if (side < 64) return false;
  if (canvas.width === side && canvas.height === side) return false;
  canvas.width  = side;
  canvas.height = side;
  invalidateMapCache();
  return true;
}

// Observe the wrapper so we re-render the static layer whenever the canvas changes size.
const _arenaResizeObserver = new ResizeObserver(() => {
  syncCanvasSize();
});
_arenaResizeObserver.observe(canvas.parentElement || canvas);
syncCanvasSize();

function buildMapCache(cW, cH, isLight) {
  const oc  = new OffscreenCanvas(cW, cH);
  const octx = oc.getContext('2d');

  const FLOOR_DARK = isLight ? '#ede8e0' : '#0c0c14';
  const WALL_BASE  = isLight ? '#3a3550' : '#1e1e2e';
  const WALL_HI    = isLight ? '#4a4560' : '#2e2e42';
  const WALL_SH    = isLight ? '#2a2540' : '#12121e';
  const GRID_ALPHA = isLight ? 0.06      : 0.035;

  // 1. Floor fill
  octx.fillStyle = FLOOR_DARK;
  octx.fillRect(0, 0, cW, cH);

  if (!mapData || !mapData.tiles || !mapData.tiles.length) return oc;

  const mw      = mapData.width;
  const mh      = mapData.height;
  const tileWu  = mapData.tile_scale || TILE_SCALE;
  const mapMarginTiles = mapData?.name === 'lobby' ? 2 : 1;
  const limit   = ((mw / 2) + mapMarginTiles) * tileWu;
  const pad     = MAP_VIEW_PAD;
  const sc      = Math.min((cW - pad * 2) / (limit * 2), (cH - pad * 2) / (limit * 2));
  const ts      = tileWu * sc;
  const ox      = cW / 2;
  const oy      = cH / 2;
  const toCanX  = (wx) => ox + wx * sc;
  const toCanY  = (wy) => oy + wy * sc;
  const originPx = toCanX(-mw / 2 * tileWu);
  const originPy = toCanY(-mh / 2 * tileWu);

  // 2. Subtle grid lines
  octx.strokeStyle = `rgba(${isLight ? '0,0,0' : '255,255,255'},${GRID_ALPHA})`;
  octx.lineWidth = 0.5;
  for (let ci = 0; ci <= mw; ci++) {
    const x = Math.round(originPx + ci * ts) + 0.5;
    octx.beginPath(); octx.moveTo(x, originPy); octx.lineTo(x, originPy + mh * ts); octx.stroke();
  }
  for (let ri = 0; ri <= mh; ri++) {
    const y = Math.round(originPy + ri * ts) + 0.5;
    octx.beginPath(); octx.moveTo(originPx, y); octx.lineTo(originPx + mw * ts, y); octx.stroke();
  }

  // 3. Wall cells — bevelled fill + edge outline
  mapData.tiles.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (!cell) return;
      const px = Math.round(originPx + ci * ts);
      const py = Math.round(originPy + ri * ts);
      const tw = Math.round(originPx + (ci + 1) * ts) - px;
      const th = Math.round(originPy + (ri + 1) * ts) - py;

      // Bevel gradient: top-left lighter, bottom-right darker
      const grad = octx.createLinearGradient(px, py, px + tw, py + th);
      grad.addColorStop(0,   WALL_HI);
      grad.addColorStop(0.5, WALL_BASE);
      grad.addColorStop(1,   WALL_SH);
      octx.fillStyle = grad;
      octx.fillRect(px, py, tw, th);

      // Inset edge glow
      octx.strokeStyle = isLight
        ? 'rgba(68,102,170,0.18)'
        : 'rgba(80,120,200,0.22)';
      octx.lineWidth = 1;
      octx.strokeRect(px + 0.5, py + 0.5, tw - 1, th - 1);
    });
  });

  // 4. Ambient occlusion — soft shadow on floor cells adjacent to walls
  const AO_COLOR = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(0,0,0,0.28)';
  const AO_SIZE  = Math.max(2, ts * 0.35);
  mapData.tiles.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell) return; // skip walls
      const px = Math.round(originPx + ci * ts);
      const py = Math.round(originPy + ri * ts);
      const tw = Math.round(originPx + (ci + 1) * ts) - px;
      const th = Math.round(originPy + (ri + 1) * ts) - py;
      const hasN = ri > 0       && mapData.tiles[ri - 1]?.[ci];
      const hasS = ri < mh - 1  && mapData.tiles[ri + 1]?.[ci];
      const hasW = ci > 0       && mapData.tiles[ri]?.[ci - 1];
      const hasE = ci < mw - 1  && mapData.tiles[ri]?.[ci + 1];
      if (hasN) {
        const g = octx.createLinearGradient(0, py, 0, py + AO_SIZE);
        g.addColorStop(0, AO_COLOR); g.addColorStop(1, 'rgba(0,0,0,0)');
        octx.fillStyle = g; octx.fillRect(px, py, tw, AO_SIZE);
      }
      if (hasS) {
        const g = octx.createLinearGradient(0, py + th, 0, py + th - AO_SIZE);
        g.addColorStop(0, AO_COLOR); g.addColorStop(1, 'rgba(0,0,0,0)');
        octx.fillStyle = g; octx.fillRect(px, py + th - AO_SIZE, tw, AO_SIZE);
      }
      if (hasW) {
        const g = octx.createLinearGradient(px, 0, px + AO_SIZE, 0);
        g.addColorStop(0, AO_COLOR); g.addColorStop(1, 'rgba(0,0,0,0)');
        octx.fillStyle = g; octx.fillRect(px, py, AO_SIZE, th);
      }
      if (hasE) {
        const g = octx.createLinearGradient(px + tw, 0, px + tw - AO_SIZE, 0);
        g.addColorStop(0, AO_COLOR); g.addColorStop(1, 'rgba(0,0,0,0)');
        octx.fillStyle = g; octx.fillRect(px + tw - AO_SIZE, py, AO_SIZE, th);
      }
    });
  });

  // 5. Vignette — focuses attention on centre
  if (!isLight) {
    const vig = octx.createRadialGradient(
      cW / 2, cH / 2, cW * 0.22,
      cW / 2, cH / 2, cW * 0.60,
    );
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.48)');
    octx.fillStyle = vig;
    octx.fillRect(0, 0, cW, cH);
  }

  return oc;
}

// ── Scanline cache ──────────────────────────────────────────────────────────
let _scanlineCacheCanvas = null;
let _scanlineCacheSize   = '';

function getScanlineOverlay(cW, cH) {
  const key = `${cW}x${cH}`;
  if (_scanlineCacheCanvas && _scanlineCacheSize === key) return _scanlineCacheCanvas;
  const oc  = new OffscreenCanvas(cW, cH);
  const octx = oc.getContext('2d');
  octx.fillStyle = 'rgba(0,0,0,0.055)';
  for (let y = 0; y < cH; y += 3) octx.fillRect(0, y, cW, 1);
  _scanlineCacheCanvas = oc;
  _scanlineCacheSize   = key;
  return oc;
}

// ── World→Canvas helpers ────────────────────────────────────────────────────
// These mirror the coordinate transform used in buildMapCache so players land
// on top of the pre-rendered static layer correctly.

function worldToCanvas(wx, wy) {
  const cW = canvas.width, cH = canvas.height;
  const mapMarginTiles = mapData?.name === 'lobby' ? 2 : 1;
  const limit = (mapData && mapData.width > 0)
    ? ((mapData.width / 2) + mapMarginTiles) * (mapData.tile_scale || TILE_SCALE)
    : WORLD_LIMIT;
  const pad = MAP_VIEW_PAD;
  const sc  = Math.min((cW - pad * 2) / (limit * 2), (cH - pad * 2) / (limit * 2));
  const cx  = cW / 2 + wx * sc;
  const cy  = cH / 2 + wy * sc;
  return [cx, cy, sc];
}

// ── Main draw ───────────────────────────────────────────────────────────────

function drawArena(players, bits, bitsMask) {
  const cW = canvas.width, cH = canvas.height;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const now = performance.now();

  // Sync canvas size to display size if needed
  syncCanvasSize();

  // ── Static layer (cached) ──────────────────────────────────────────────
  const mapKey = `${cW}x${cH}:${mapData?.name || ''}:${isLight}`;
  if (!_mapCacheCanvas || _mapCacheKey !== mapKey) {
    _mapCacheCanvas = buildMapCache(cW, cH, isLight);
    _mapCacheKey = mapKey;
  }
  ctx.drawImage(_mapCacheCanvas, 0, 0);

  // ── Geometry helpers ───────────────────────────────────────────────────
  const [,,sc] = worldToCanvas(0, 0);
  const tagPx   = TAG_RADIUS * sc;
  const tilePx  = (mapData?.tile_scale || TILE_SCALE) * sc;
  const bodyBase = Math.max(4.0, Math.min(PLAYER_COLLISION_RADIUS * sc * 1.0, tilePx * 0.32));
  const arrowLen = Math.max(bodyBase + 8, 16);

  // ── Bit collectibles ───────────────────────────────────────────────────
  if (bits && bits.length) {
    bits.forEach((b, i) => {
      const active = (bitsMask & (1 << i)) !== 0;
      const [bx, by] = worldToCanvas(b[0], b[1]);
      const bitR = Math.max(3, tilePx * 0.18);

      if (active) {
        // Pulsing outer ring
        const pulse = Math.sin(now / 400 + i) * 0.15 + 0.25;
        ctx.beginPath(); ctx.arc(bx, by, bitR * 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,220,0,${pulse})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Bright dot
        ctx.shadowBlur = 8; ctx.shadowColor = '#FFB800';
        ctx.beginPath(); ctx.arc(bx, by, bitR, 0, Math.PI * 2);
        ctx.fillStyle = '#ffdd00';
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.beginPath(); ctx.arc(bx, by, bitR, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#aaaaaa' : '#3a3a50';
        ctx.fill();
      }
    });
  }

  // ── Tag animation bookkeeping ──────────────────────────────────────────
  const activePlayers = players.filter((p) => !p.queued);
  for (const playerId of Object.keys(tagFlash)) {
    if ((now - tagFlash[playerId]) >= TAG_ANIM_MS) {
      delete tagFlash[playerId];
      delete tagPos[playerId];
    }
  }

  const tagStartedThisFrame = activePlayers.some((p) => {
    const tagged = (p.flags & FLAG_TAGGED) !== 0;
    return tagged && !prevFlags[p.entityKey];
  });
  if (tagStartedThisFrame) {
    activePlayers.forEach((p) => {
      const frozen = lastLivePos[p.entityKey] || p;
      tagFlash[p.entityKey] = now;
      tagPos[p.entityKey] = { x: frozen.x, y: frozen.y, angle: frozen.angle };
    });
  }

  const drawPoseById = {};
  players.forEach((p) => {
    const flashStart = tagFlash[p.entityKey];
    const t = (flashStart !== undefined) ? Math.min((now - flashStart) / TAG_ANIM_MS, 1.0) : null;
    const isAnimating = t !== null && t < 1.0;
    const frozenPose = (isAnimating && tagPos[p.entityKey]) ? tagPos[p.entityKey] : null;
    drawPoseById[p.entityKey] = {
      x: frozenPose ? frozenPose.x : p.x,
      y: frozenPose ? frozenPose.y : p.y,
      angle: frozenPose ? frozenPose.angle : p.angle,
      t,
      isAnimating,
    };
  });

  // ── Distance line between active players ───────────────────────────────
  if (activePlayers.length >= 2) {
    const a = drawPoseById[activePlayers[0].entityKey];
    const b = drawPoseById[activePlayers[1].entityKey];
    const [ax, ay] = worldToCanvas(a.x, a.y);
    const [bx, by] = worldToCanvas(b.x, b.y);
    const dx   = b.x - a.x;
    const dy   = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const close = dist <= TAG_RADIUS;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
    ctx.strokeStyle = close
      ? 'rgba(255,68,68,0.7)'
      : (isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)');
    ctx.setLineDash([4, 5]); ctx.lineWidth = 1.5; ctx.stroke(); ctx.setLineDash([]);
    // Distance label with bg pill
    const mx = (ax + bx) / 2, my = (ay + by) / 2;
    const distStr = `${dist.toFixed(1)}u`;
    ctx.font = 'bold 10px Courier New';
    const tw = ctx.measureText(distStr).width;
    ctx.fillStyle = isLight ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.55)';
    ctx.fillRect(mx + 5, my - 14, tw + 6, 14);
    ctx.fillStyle = close ? '#ff5555' : (isLight ? '#444' : '#aaa');
    ctx.fillText(distStr, mx + 8, my - 3);
  }

  // ── Players ────────────────────────────────────────────────────────────
  players.forEach((p, i) => {
    const isGhost   = (p.flags & FLAG_GHOST)     !== 0;
    const isQueued  = Boolean(p.queued);
    const tagged    = (p.flags & FLAG_TAGGED)     !== 0;
    const matchEnded = (p.flags & FLAG_MATCH_END) !== 0;

    prevFlags[p.entityKey] = tagged;

    // Role colour — runner red, tagger green, queued gold, ghost grey
    let colour;
    if (isQueued)       colour = '#FFB800';
    else if (isGhost)   colour = isLight ? '#888899' : '#6666aa';
    else if (p.id === 1) colour = '#f05252';   // runner — PYNQcast red
    else if (p.id === 2) colour = '#00ff44';   // tagger — terminal green
    else                colour = PLAYER_COLOURS[i % PLAYER_COLOURS.length];

    const pose = drawPoseById[p.entityKey] || { x: p.x, y: p.y, angle: p.angle, t: null, isAnimating: false };
    const { x: drawX, y: drawY, angle: drawAngle, t, isAnimating } = pose;
    const [cx, cy] = worldToCanvas(drawX, drawY);

    // Tag-radius ring — subtle unless tagged
    ctx.beginPath(); ctx.arc(cx, cy, tagPx, 0, Math.PI * 2);
    ctx.strokeStyle = tagged
      ? `rgba(255,68,68,${0.35 + 0.25 * Math.sin(now / 120)})`
      : matchEnded ? 'rgba(255,180,64,0.35)' : (isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.08)');
    ctx.lineWidth = tagged ? 2 : 1;
    ctx.stroke();

    // Shockwave ring on tag
    if (isAnimating) {
      const wave  = tagPx * (1 + t * 1.6);
      const alpha = (1 - t) * 0.85;
      ctx.beginPath(); ctx.arc(cx, cy, wave, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,100,100,${alpha})`;
      ctx.lineWidth = 2.5 * (1 - t);
      ctx.stroke();
    }

    // Direction line
    const dirColour = tagged ? '#ff4444' : matchEnded ? '#c89845' : colour;
    ctx.strokeStyle = dirColour; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(drawAngle) * arrowLen, cy + Math.sin(drawAngle) * arrowLen);
    ctx.stroke();

    // Player glow + dot
    const dotR = isAnimating
      ? bodyBase + (bodyBase * 0.45 * Math.sin(t * Math.PI))
      : tagged ? bodyBase + 2 : bodyBase;
    const animT = t ?? 0;
    const dotColour = tagged
      ? `rgb(${200 + Math.round(55 * (1 - animT))},${Math.round(34 * (1 - animT))},${Math.round(34 * (1 - animT))})`
      : matchEnded ? '#c89845' : colour;

    if (!isGhost && !isQueued) {
      const pulse = Math.sin(now / 280) * 4 + 10;
      ctx.shadowBlur  = tagged ? 18 : pulse;
      ctx.shadowColor = tagged ? '#ff4444' : colour;
    }
    ctx.beginPath(); ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    ctx.fillStyle = dotColour;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Ghost gets a smaller inner dot without glow
    if (isGhost) {
      ctx.beginPath(); ctx.arc(cx, cy, dotR * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();
    }

    // Name label with dark pill background
    const role  = isQueued ? 'lobby' : (isGhost ? 'ghost' : (p.id === 1) ? 'runner' : 'tagger');
    const label = isQueued
      ? `${p.displayName || `Q${p.queueSlot ?? '?'}`} ${role}`
      : `${p.displayName || `P${p.id}`} ${role}`;
    ctx.font = 'bold 10px Courier New';
    const lw = ctx.measureText(label).width;
    const lx = cx + arrowLen + 4;
    const ly = cy - dotR - 6;
    // Pill
    ctx.fillStyle = isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.62)';
    ctx.fillRect(lx - 3, ly - 11, lw + 6, 14);
    // Text
    ctx.fillStyle = isQueued
      ? (isLight ? '#7a5500' : '#FFB800')
      : (isGhost ? (isLight ? '#666' : '#9999bb') : (isLight ? '#1a1a1a' : colour));
    ctx.fillText(label, lx, ly);

    // Cache live pose
    lastLivePos[p.entityKey] = { x: p.x, y: p.y, angle: p.angle };
  });

  // ── Scanline overlay (CRT vibe, dark mode only) ────────────────────────
  if (!isLight) {
    ctx.drawImage(getScanlineOverlay(cW, cH), 0, 0);
  }
}

// ── 60 fps render loop ─────────────────────────────────────────────────────
function renderLoop() {
  const now = performance.now();
  const frameDelta = now - lastRenderSampleAt;
  lastRenderSampleAt = now;
  pushFrameSample(frameDelta);
  drawFrameChart();
  maybeRenderLatencyChart();

  if (replayState.active && replayState.frames.length) {
    const frame = replayState.frames[Math.min(replayState.frameIndex, replayState.frames.length - 1)];
    drawArena(normalisePlayers(frame.players), frame.bits || [], frame.bits_mask ?? 0xFFFF);
  } else if (latestState) {
    drawArena(
      updateInterpolatedLivePlayers(normalisePlayers(latestState.players), now),
      latestState.bits || [],
      latestState.bits_mask ?? 0xFFFF,
    );
  }
  renderCount++;
  if (now - renderLastTime >= 1000) {
    document.getElementById('fps').textContent = String(wsHz);
    document.getElementById('hud-frame-ms').textContent = `${averageFrameMs().toFixed(1)} ms/frame · ${renderCount} fps`;
    let latencyText = '— ms';
    if (latestState?.server_sent_at) {
      const transitMs = window._lastStateReceivedWallMs
        ? (window._lastStateReceivedWallMs - Number(latestState.server_sent_at))
        : null;
      if (transitMs !== null && transitMs >= 0 && transitMs < 2000) {
        latencyText = `${Math.round(transitMs)} ms`;
      }
    }
    document.getElementById('hud-latency').textContent = latencyText;
    renderCount = 0; renderLastTime = now;
  }
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
