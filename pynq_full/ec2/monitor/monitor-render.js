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

function worldToCanvas(wx, wy) {
  const pad = MAP_VIEW_PAD;
  const mapMarginTiles = mapData?.name === 'lobby' ? 2 : 1;
  const limit = (mapData && mapData.width > 0)
    ? ((mapData.width / 2) + mapMarginTiles) * (mapData.tile_scale || TILE_SCALE)
    : WORLD_LIMIT;
  const minX = -limit, maxX = limit;
  const minY = -limit, maxY = limit;
  const rx  = maxX - minX;
  const ry  = maxY - minY;
  const sc  = Math.min((W - pad*2) / rx, (H - pad*2) / ry);
  return [(pad + (wx - minX) * sc), (pad + (maxY - wy) * sc), sc];
}

function drawArena(players, bits, bitsMask) {
  ctx.clearRect(0, 0, W, H);

  // Origin axes
  const [ox, oy] = worldToCanvas(0, 0);
  ctx.strokeStyle = '#1e1e1e'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox,0); ctx.lineTo(ox,H); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,oy); ctx.lineTo(W,oy); ctx.stroke();

  const [,,sc] = worldToCanvas(0,0);
  const tagPx  = TAG_RADIUS * sc;
  const tilePx = (mapData?.tile_scale || TILE_SCALE) * sc;
  const bodyBase = Math.max(3.0, Math.min(PLAYER_COLLISION_RADIUS * sc * 0.85, tilePx * 0.28));
  const arrowLen = Math.max(bodyBase + 6, 12);

  // Tile map
  if (mapData && mapData.tiles && mapData.tiles.length) {
    const mw = mapData.width, mh = mapData.height;
    const tileWu = mapData.tile_scale || TILE_SCALE;
    const ts = tileWu * sc;   // tile size in canvas px
    // Anchor the entire grid from the map's top-left corner in world space.
    // All tile positions are integer multiples of ts from this anchor — no per-tile
    // floating-point drift, so adjacent wall tiles share exact pixel edges (no corner gaps).
    const [originPx, originPy] = worldToCanvas(-mw / 2 * tileWu, mh / 2 * tileWu);
    ctx.fillStyle = '#1a1730';
    mapData.tiles.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (!cell) return;
        const px = Math.round(originPx + ci * ts);
        const py = Math.round(originPy + ri * ts);
        const tw = Math.round(originPx + (ci + 1) * ts) - px;
        const th = Math.round(originPy + (ri + 1) * ts) - py;
        ctx.fillRect(px, py, tw, th);
      });
    });
  }

  // Bit collectibles — yellow dot if active, grey if collected
  if (bits && bits.length) {
    bits.forEach((b, i) => {
      const active = (bitsMask & (1 << i)) !== 0;
      const [bx, by] = worldToCanvas(b[0], b[1]);
      ctx.beginPath(); ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fillStyle = active ? '#ffdd00' : '#333344';
      ctx.fill();
      if (active) {
        ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,220,0,0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
  }

  const now = performance.now();
  const activePlayers = players.filter((p) => !p.queued);
  // Expire finished animations even if a player key disappears briefly.
  for (const playerId of Object.keys(tagFlash)) {
    if ((now - tagFlash[playerId]) >= TAG_ANIM_MS) {
      delete tagFlash[playerId];
      delete tagPos[playerId];
    }
  }

  // Server can set FLAG_TAGGED and reset to spawn in the same tick.
  // Latch everyone at their previous live pose so the freeze shows the actual tag point.
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

  // Distance line follows frozen draw poses, so it stays in sync with flash hold.
  if (activePlayers.length >= 2) {
    const a = drawPoseById[activePlayers[0].entityKey];
    const b = drawPoseById[activePlayers[1].entityKey];
    const [ax,ay] = worldToCanvas(a.x, a.y);
    const [bx,by] = worldToCanvas(b.x, b.y);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const close = dist <= TAG_RADIUS;
    ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by);
    ctx.strokeStyle = close ? 'rgba(255,68,68,0.7)' : 'rgba(255,255,255,0.08)';
    ctx.setLineDash([4,4]); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
    const mx = (ax+bx)/2, my = (ay+by)/2;
    ctx.fillStyle = close ? '#ff6666' : '#444';
    ctx.font = '11px Courier New';
    ctx.fillText(`${dist.toFixed(1)}u`, mx+4, my-4);
  }

  players.forEach((p, i) => {
    const isGhost = (p.flags & FLAG_GHOST) !== 0;
    const isQueued = Boolean(p.queued);
    const colour  = isQueued ? '#4da3ff' : (isGhost ? '#555566' : PLAYER_COLOURS[i % PLAYER_COLOURS.length]);
    const tagged  = (p.flags & FLAG_TAGGED) !== 0;
    const matchEnded = (p.flags & FLAG_MATCH_END) !== 0;

    prevFlags[p.entityKey] = tagged;

    const pose = drawPoseById[p.entityKey] || { x: p.x, y: p.y, angle: p.angle, t: null, isAnimating: false };
    const { x: drawX, y: drawY, angle: drawAngle, t, isAnimating } = pose;
    const [cx,cy] = worldToCanvas(drawX, drawY);

    // Hitbox ring — pulses red while tagged
    ctx.beginPath(); ctx.arc(cx, cy, tagPx, 0, Math.PI*2);
    ctx.strokeStyle = tagged
      ? `rgba(255,68,68,${0.3 + 0.25 * Math.sin(now / 120)})`
      : matchEnded ? 'rgba(255,180,64,0.35)' : 'rgba(255,255,255,0.07)';
    ctx.lineWidth = tagged ? 2 : (matchEnded ? 1.5 : 1);
    ctx.stroke();

    // Expanding shockwave ring on tag
    if (isAnimating) {
      const wave   = tagPx * (1 + t * 1.6);        // expands outward
      const alpha  = (1 - t) * 0.9;                 // fades out
      ctx.beginPath(); ctx.arc(cx, cy, wave, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(255,100,100,${alpha})`;
      ctx.lineWidth = 2.5 * (1 - t);
      ctx.stroke();
    }

    // Direction arrow
    ctx.strokeStyle = colour; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(drawAngle) * arrowLen, cy - Math.sin(drawAngle) * arrowLen); // Y-up: -sin
    ctx.stroke();

    // Player dot — smoothly scales up on tag
    const dotR = isAnimating
      ? bodyBase + (bodyBase * 0.45 * Math.sin(t * Math.PI))
      : tagged ? bodyBase + 1.5 : bodyBase;
    const animT = t ?? 0;
    ctx.beginPath(); ctx.arc(cx, cy, dotR, 0, Math.PI*2);
    ctx.fillStyle = tagged
      ? `rgb(${200 + Math.round(55*(1-animT))},${Math.round(34*(1-animT))},${Math.round(34*(1-animT))})`
      : matchEnded ? '#c89845' : colour;
    ctx.fill();

    // Label
    const role = isQueued ? 'lobby' : (isGhost ? 'ghost' : (p.id === 1) ? 'runner' : 'tagger');
    const label = isQueued
      ? `${p.displayName || `Q${p.queueSlot ?? '?'}`} ${role}`
      : `P${p.id} ${role}`;
    ctx.fillStyle = isQueued ? '#9bd2ff' : (isGhost ? '#888' : '#fff'); ctx.font = 'bold 11px Courier New';
    ctx.fillText(label, cx + arrowLen + 4, cy - bodyBase);

    // Cache the latest live server pose for edge-triggered freeze latching.
    lastLivePos[p.entityKey] = { x: p.x, y: p.y, angle: p.angle };
  });
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
    // "Render Rate" card: WS push rate from server (wsHz) + browser frame time
    document.getElementById('fps').textContent = String(wsHz);
    document.getElementById('hud-frame-ms').textContent = `${averageFrameMs().toFixed(1)} ms/frame · ${renderCount} fps`;
    // Latency card: WS transport time = browser receive time − server send time.
    // server_sent_at is monotonic ms on the server; latestStateReceivedAt is
    // performance.now() on the browser — clocks differ, so this measures the
    // WS message transit time only (not full pipeline RTT).
    // Latency: server embeds wall-clock ms at send time; browser compares to Date.now()
    // at receive time. Both use UTC epoch ms so the difference is real WS transit time
    // (plus any server/browser wall-clock skew, which is small on the same LAN).
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
