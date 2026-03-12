// ── Canvas ─────────────────────────────────────────────────────────────────
function worldToCanvas(wx, wy) {
  const pad = (_showMap && mapData && mapData.width > 0) ? MAP_VIEW_PAD : ORBIT_VIEW_PAD;
  // In map mode use the actual map extent; fall back to orbit view extent
  const limit = (_showMap && mapData && mapData.width > 0)
    ? (mapData.width / 2) * (mapData.tile_scale || TILE_SCALE)
    : WORLD_LIMIT;
  const minX = -limit, maxX = limit;
  const minY = -limit, maxY = limit;
  const rx  = maxX - minX;
  const ry  = maxY - minY;
  const sc  = Math.min((W - pad*2) / rx, (H - pad*2) / ry);
  return [(pad + (wx - minX) * sc), (pad + (wy - minY) * sc), sc];
}

function drawArena(players, bits, bitsMask) {
  ctx.clearRect(0, 0, W, H);

  if (!_showMap) {
    // Grid only helps in orbit view; it makes map mode feel busier than it is.
    ctx.strokeStyle = '#141414'; ctx.lineWidth = 1;
    for (let i = 0; i <= 8; i++) {
      const x = W/8*i, y = H/8*i;
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
    }
  }

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

  // Tile map (when map data available and map view is on)
  if (_showMap && mapData && mapData.tiles && mapData.tiles.length) {
    const mw = mapData.width, mh = mapData.height;
    const ts = (mapData.tile_scale || TILE_SCALE) * sc;   // tile size in canvas px
    // Map origin: top-left tile's world centre is (-(mw/2)+0.5, -(mh/2)+0.5) * tile_scale
    mapData.tiles.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        if (!cell) return;
        const wx = (ci - mw / 2) * (mapData.tile_scale || TILE_SCALE);
        const wy = (ri - mh / 2) * (mapData.tile_scale || TILE_SCALE);
        const [px, py] = worldToCanvas(wx, wy);
        ctx.fillStyle = '#1a1730';
        ctx.fillRect(px, py, ts, ts);
        ctx.strokeStyle = '#2a2448';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(px, py, ts, ts);
      });
    });
  } else {
    // Legacy orbit guide when no map / in orbit view
    ctx.beginPath(); ctx.arc(ox, oy, ORBIT_RADIUS * sc, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(0,212,255,0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();
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
    ctx.lineTo(cx + Math.cos(drawAngle) * arrowLen, cy + Math.sin(drawAngle) * arrowLen);
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

  if (replayState.active && replayState.frames.length) {
    const frame = replayState.frames[Math.min(replayState.frameIndex, replayState.frames.length - 1)];
    drawArena(normalisePlayers(frame.players), frame.bits || [], frame.bits_mask ?? 0xFFFF);
  } else if (latestState) {
    drawArena(normalisePlayers(latestState.players), latestState.bits || [], latestState.bits_mask ?? 0xFFFF);
  }
  renderCount++;
  if (now - renderLastTime >= 1000) {
    document.getElementById('fps').textContent = String(wsHz);
    document.getElementById('hud-frame-ms').textContent = `${averageFrameMs().toFixed(1)} ms/frame`;
    let latencyText = '— ms';
    if (latestState?.timestamp) {
      const stateAge = (now - latestState.timestamp) * 1000;
      latencyText = `${Math.round(stateAge)} ms`;
    }
    document.getElementById('hud-latency').textContent = latencyText;
    renderCount = 0; renderLastTime = now;
  }
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
