const canvas = document.getElementById('arena');
const ctx    = canvas.getContext('2d');
const frameChartCanvas = document.getElementById('frame-chart');
const frameChartCtx = frameChartCanvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const TAG_RADIUS     = 16.0;   // must match t2_constants.py TAG_RADIUS
const WORLD_LIMIT    = 80.0;   // fallback half-extent when no map is loaded
const TILE_SCALE     = 8;      // world units per tile — must match MAP_TILE_SCALE
const PLAYER_COLLISION_RADIUS = 2.0;
const FLAG_TAGGED    = 0x02;
const FLAG_MATCH_END = 0x04;
const MAP_VIEW_PAD  = 24;
const PLAYER_COLOURS = ['#00ff88', '#00d4ff', '#ffaa00', '#ff6688'];
const FLAG_GHOST     = 0x08;
const LOBBY_MAP_NAME = 'lobby';

// ── Map state ──────────────────────────────────────────────────────────────
let mapData = null;   // { width, height, tile_scale, tiles: [[0|1, ...], ...] }
let _availableMaps = [];
let _activeMapName = LOBBY_MAP_NAME;
let _selectedMapName = LOBBY_MAP_NAME;
let _pendingMapName = '';
let _pendingMapRequestedAt = 0;
let _mapFilterText = '';
let _lastMapButtonsSignature = '';
const _mapPayloadCache = new Map();
const _mapLoadPromises = new Map();
let _mapLoadRequestId = 0;
let _mapListPromise = null;
let _mapListRefreshTimer = 0;
let _activePage = 'game';
let _archiveDrawerOpen = false;
const frameTimeHistory = [];
const BOARD_HZ_BUFFER_SIZE = 60;   // ~2 min at one sample per 2s
const boardHzHistory = [];         // board tick Hz samples from PKT_PERF
let _lastLatencyRender = 0;
let lastRenderSampleAt = performance.now();
const MAP_SELECT_GRACE_MS = 1500;

function isValidMapName(name) {
  return Boolean(name) && name !== 'none';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normaliseMapEntry(entry) {
  const mapId = String(entry?.map_id || entry?.name || entry || '').trim();
  if (!mapId) return null;
  return {
    map_id: mapId,
    map_name: String(entry?.map_name || mapId).trim() || mapId,
    source: String(entry?.source || 'system').trim() || 'system',
    deletable: Boolean(entry?.deletable),
  };
}

function cloneCachedMapPayload(name, payload) {
  return { ...payload, name };
}

function invalidateMapCache(name) {
  if (name) {
    const targetName = String(name);
    _mapPayloadCache.delete(targetName);
    if (mapData?.name === targetName) {
      mapData = null;
    }
    return;
  }
  _mapPayloadCache.clear();
  mapData = null;
}

async function loadMap(name = _activeMapName, options = {}) {
  const { force = false } = options;
  if (!name || name === 'none') return;
  const requestId = ++_mapLoadRequestId;
  const cachedPayload = !force ? _mapPayloadCache.get(name) : null;
  if (cachedPayload) {
    if (requestId !== _mapLoadRequestId) return;
    mapData = cloneCachedMapPayload(name, cachedPayload);
    updateCanvasLabel();
    return;
  }
  try {
    let payloadPromise = _mapLoadPromises.get(name);
    if (!payloadPromise || force) {
      payloadPromise = fetch(`/api/map/${encodeURIComponent(name)}`)
        .then(async (resp) => {
          if (!resp.ok) throw new Error(`map load failed (${resp.status})`);
          const payload = await resp.json();
          _mapPayloadCache.set(name, payload);
          return payload;
        })
        .finally(() => {
          _mapLoadPromises.delete(name);
        });
      _mapLoadPromises.set(name, payloadPromise);
    }
    const payload = await payloadPromise;
    if (requestId !== _mapLoadRequestId) return;
    mapData = cloneCachedMapPayload(name, payload);
    updateCanvasLabel();
  } catch (e) {
    console.warn('[monitor] map load failed:', e);
  }
}

async function loadMapList() {
  if (_mapListPromise) return _mapListPromise;
  _mapListPromise = (async () => {
  try {
    const resp = await fetch('/api/maps');
    if (!resp.ok) return;
    const data = await resp.json();
    const rawEntries = Array.isArray(data.entries) && data.entries.length
      ? data.entries
      : (data.maps || []);
    _availableMaps = rawEntries.map(normaliseMapEntry).filter(Boolean);
    renderMapButtons();
    updateMapSelector(
      data.active_map,
      Object.prototype.hasOwnProperty.call(data, 'selected_map')
        ? data.selected_map
        : data.active_map,
    );
  } catch (e) {
    console.warn('[monitor] map list load failed:', e);
  }
  })().finally(() => {
    _mapListPromise = null;
  });
  return _mapListPromise;
}

function requestMapListRefresh(delayMs = 0) {
  if (_mapListRefreshTimer) {
    window.clearTimeout(_mapListRefreshTimer);
    _mapListRefreshTimer = 0;
  }
  return new Promise((resolve) => {
    _mapListRefreshTimer = window.setTimeout(() => {
      _mapListRefreshTimer = 0;
      loadMapList().finally(resolve);
    }, Math.max(0, delayMs));
  });
}

function renderMapButtons() {
  const el = document.getElementById('map-btn-list');
  if (!el) return;
  if (!_availableMaps.length) {
    const emptySignature = 'empty:no-maps';
    if (_lastMapButtonsSignature === emptySignature) return;
    el.innerHTML = '<span style="color:#333">no maps found</span>';
    _lastMapButtonsSignature = emptySignature;
    return;
  }

  const filteredMaps = _availableMaps.filter((entry) => (
    !_mapFilterText
    || String(entry.map_name || '').toLowerCase().includes(_mapFilterText)
    || String(entry.map_id || '').toLowerCase().includes(_mapFilterText)
  ));

  if (!filteredMaps.length) {
    const emptySignature = `empty:no-filter-match:${_mapFilterText}`;
    if (_lastMapButtonsSignature === emptySignature) return;
    el.innerHTML = '<span style="color:#90a3c4">no maps match that filter</span>';
    _lastMapButtonsSignature = emptySignature;
    return;
  }

  const renderedButtons = filteredMaps.map((entry) => {
    const mapId = entry.map_id;
    const subtitle = `${entry.map_id} · ${entry.source === 'editor' ? 'editor' : 'system'}`;
    const deleteAction = entry.deletable
      ? `<button class="control-btn stop controls-map-delete" type="button" onclick="deleteMapFromControls('${mapId}')">Delete</button>`
      : `<button class="control-btn controls-map-protected" type="button" disabled>System</button>`;
    return `
      <div class="controls-map-entry">
        <button id="mapbtn-${mapId}"
          class="control-btn controls-map-select${
            mapId === _activeMapName
              ? ' start'
              : (mapId === _pendingMapName || mapId === _selectedMapName ? ' active-view' : '')
          }"
          type="button"
          onclick="selectMap('${mapId}')">
          <span class="controls-map-label">${escapeHtml(entry.map_name)}</span>
          <span class="controls-map-subtitle">${escapeHtml(subtitle)}</span>
        </button>
        ${deleteAction}
      </div>
    `;
  }).join('');
  const nextSignature = [
    _mapFilterText,
    _activeMapName,
    _selectedMapName,
    _pendingMapName,
    filteredMaps.map((entry) => `${entry.map_id}:${entry.map_name}:${entry.deletable ? 1 : 0}:${entry.source}`).join('|'),
  ].join('::');
  if (_lastMapButtonsSignature === nextSignature) return;
  el.innerHTML = renderedButtons;
  _lastMapButtonsSignature = nextSignature;
}

function setMapFilterText(value) {
  _mapFilterText = String(value || '').trim().toLowerCase();
  renderMapButtons();
}

function updateCanvasLabel() {
  const el = document.getElementById('canvas-label');
  const replayMapName = replayState?.mapName || _activeMapName;
  const replayFrame = replayState?.active && replayState.frames.length
    ? replayState.frames[Math.min(replayState.frameIndex, replayState.frames.length - 1)]
    : null;
  if (mapData) {
    const totalBits = replayFrame ? (replayFrame.bits?.length || 0) : (latestState?.bits?.length || 0);
    const remainingBits = replayFrame
      ? countActiveBits(replayFrame.bits_mask ?? 0, totalBits)
      : countActiveBits(latestState?.bits_mask ?? 0, totalBits);
    const bitText = totalBits ? ` · bits ${remainingBits}/${totalBits}` : '';
    if (replayState?.active) {
      el.textContent = `monitor replay · ${replayMapName} · ${mapData.width}×${mapData.height} tiles${bitText}`;
    } else {
      el.textContent = `fpga live · ${_activeMapName} · ${mapData.width}×${mapData.height} tiles${bitText}`;
    }
  } else {
    if (replayState?.active) {
      el.textContent = `monitor replay · ${replayMapName} · loading map…`;
    } else {
      el.textContent = `fpga live · ${_activeMapName} · loading map…`;
    }
  }
}

function setActiveTab(tab) {
  const target = (tab === 'server' || tab === 'controls' || tab === 'about' || tab === 'players' || tab === 'editor') ? tab : 'game';
  _activePage = target;
  ['game', 'server', 'controls', 'about', 'players', 'editor'].forEach((page) => {
    const panel = document.getElementById(`page-${page}`);
    const tabBtn = document.getElementById(`tab-${page}`);
    if (panel) panel.hidden = page !== target;
    if (tabBtn) tabBtn.classList.toggle('active', page === target);
  });
  const nextHash = target === 'game' ? '' : `#${target}`;
  history.replaceState(null, '', `${location.pathname}${location.search}${nextHash}`);
}

function setArchiveDrawer(open) {
  const target = Boolean(open);
  _archiveDrawerOpen = target;
  const drawer = document.getElementById('archive-drawer');
  const toggle = document.getElementById('archive-toggle');
  if (drawer) drawer.hidden = !target;
  if (toggle) {
    toggle.classList.toggle('active', target);
    toggle.setAttribute('aria-expanded', target ? 'true' : 'false');
  }
}

function toggleArchiveDrawer(force) {
  const next = typeof force === 'boolean' ? force : !_archiveDrawerOpen;
  setArchiveDrawer(next);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && _archiveDrawerOpen) {
    setArchiveDrawer(false);
  }
});

function pushFrameSample(frameMs) {
  if (!Number.isFinite(frameMs) || frameMs <= 0 || frameMs > 100) return;
  frameTimeHistory.push(frameMs);
  if (frameTimeHistory.length > 64) {
    frameTimeHistory.shift();
  }
}

function averageFrameMs() {
  if (!frameTimeHistory.length) return 0.0;
  return frameTimeHistory.reduce((sum, value) => sum + value, 0) / frameTimeHistory.length;
}

function drawFrameChart() {
  const width = frameChartCanvas.width;
  const height = frameChartCanvas.height;
  frameChartCtx.clearRect(0, 0, width, height);

  frameChartCtx.fillStyle = '#07101e';
  frameChartCtx.fillRect(0, 0, width, height);

  frameChartCtx.strokeStyle = 'rgba(0, 212, 255, 0.18)';
  frameChartCtx.lineWidth = 1;
  for (let y = 1; y < 4; y += 1) {
    const row = Math.floor((height / 4) * y);
    frameChartCtx.beginPath();
    frameChartCtx.moveTo(0, row);
    frameChartCtx.lineTo(width, row);
    frameChartCtx.stroke();
  }

  if (!frameTimeHistory.length) {
    frameChartCtx.fillStyle = '#7aa3d1';
    frameChartCtx.font = '18px VT323';
    frameChartCtx.fillText('waiting for frame samples...', 12, 28);
    return;
  }

  const maxMs = Math.max(20, ...frameTimeHistory);
  const barWidth = Math.max(2, Math.floor(width / frameTimeHistory.length));
  frameTimeHistory.forEach((value, index) => {
    const barHeight = Math.max(3, Math.round((value / maxMs) * (height - 14)));
    const x = index * barWidth;
    const y = height - barHeight - 4;
    frameChartCtx.fillStyle = value > 20 ? '#f05252' : value > 14 ? '#ffd700' : '#00d4ff';
    frameChartCtx.fillRect(x, y, Math.max(1, barWidth - 1), barHeight);
  });
}

function pushBoardHzSample(hz, now) {
  // PKT_PERF arrives every ~2s; gate pushes to avoid duplicate samples per WS message
  if (now - _lastBoardHzPushedAt < 1500) return;
  _lastBoardHzPushedAt = now;
  boardHzHistory.push(hz);
  if (boardHzHistory.length > BOARD_HZ_BUFFER_SIZE) boardHzHistory.shift();
  _lastLatencyRender = 0; // force chart redraw on next render loop tick
}

function maybeRenderLatencyChart() {
  const now = performance.now();
  if (now - _lastLatencyRender < 500) return;
  _lastLatencyRender = now;

  const canvas = document.getElementById('latency-chart');
  if (!canvas) return;
  const ctx2 = canvas.getContext('2d');
  const W2 = canvas.width, H2 = canvas.height;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  ctx2.clearRect(0, 0, W2, H2);
  ctx2.fillStyle = isLight ? '#f0ece4' : '#07101e';
  ctx2.fillRect(0, 0, W2, H2);

  if (!boardHzHistory.length) {
    ctx2.fillStyle = isLight ? '#666666' : '#7aa3d1';
    ctx2.font = '12px Courier New';
    ctx2.fillText('no board connected', 10, H2 / 2);
    const currentEl = document.getElementById('board-hz-current');
    const avgEl = document.getElementById('latency-chart-avg');
    if (currentEl) currentEl.textContent = '— Hz';
    if (avgEl) avgEl.textContent = 'avg — Hz';
    return;
  }

  const dataMin = Math.min(...boardHzHistory);
  const dataMax = Math.max(...boardHzHistory);
  const spread = Math.max(dataMax - dataMin, 4);
  const minY = Math.max(0, dataMin - spread * 0.5);
  const maxY = dataMax + spread * 0.5;
  // Grid at 50 and 60 Hz
  [50, 60].forEach((hz) => {
    const y = H2 - ((hz - minY) / (maxY - minY)) * (H2 - 4) - 2;
    ctx2.strokeStyle = hz === 60
      ? (isLight ? 'rgba(10,122,10,0.3)' : 'rgba(0,255,136,0.25)')
      : (isLight ? 'rgba(180,83,0,0.25)' : 'rgba(255,215,0,0.2)');
    ctx2.lineWidth = 1;
    ctx2.beginPath(); ctx2.moveTo(0, y); ctx2.lineTo(W2, y); ctx2.stroke();
    ctx2.fillStyle = hz === 60
      ? (isLight ? 'rgba(10,122,10,0.7)' : 'rgba(0,255,136,0.5)')
      : (isLight ? 'rgba(180,83,0,0.7)' : 'rgba(255,215,0,0.4)');
    ctx2.font = '9px Courier New';
    ctx2.fillText(`${hz}Hz`, 2, y - 2);
  });

  // Fixed pixel spacing — newest sample pinned to right edge, older ones step left.
  // This gives a scrolling effect: each new sample shifts everything left by STEP_PX.
  const STEP_PX = 8;
  const toY = (hz) => H2 - ((hz - minY) / (maxY - minY)) * (H2 - 4) - 2;
  // Map index 0=oldest → left, last=newest → right edge
  const n = boardHzHistory.length;
  const xOf = (i) => W2 - (n - 1 - i) * STEP_PX;

  ctx2.beginPath();
  boardHzHistory.forEach((hz, i) => {
    const x = xOf(i);
    if (x < 0) return; // clip older samples that scroll off left edge
    const y = toY(hz);
    if (i === 0 || xOf(i - 1) < 0) ctx2.moveTo(x, y); else ctx2.lineTo(x, y);
  });
  ctx2.strokeStyle = isLight ? '#1a5caa' : '#00d4ff';
  ctx2.lineWidth = 1.5;
  ctx2.stroke();

  boardHzHistory.forEach((hz, i) => {
    const x = xOf(i);
    if (x < 0) return;
    const y = toY(hz);
    ctx2.beginPath();
    ctx2.arc(x, y, 3, 0, Math.PI * 2);
    ctx2.fillStyle = isLight
      ? (hz >= 58 ? '#0a7a0a' : hz >= 50 ? '#b45300' : '#c41e3a')
      : (hz >= 58 ? '#00ff88' : hz >= 50 ? '#ffd700' : '#ff4444');
    ctx2.fill();
  });

  const avg = boardHzHistory.reduce((s, v) => s + v, 0) / boardHzHistory.length;
  const current = boardHzHistory[boardHzHistory.length - 1];
  const currentEl = document.getElementById('board-hz-current');
  const avgEl = document.getElementById('latency-chart-avg');
  if (currentEl) {
    currentEl.textContent = `${Math.round(current)} Hz`;
    currentEl.style.color = isLight
      ? (current >= 58 ? '#0a7a0a' : current >= 50 ? '#b45300' : '#c41e3a')
      : (current >= 58 ? '#00ff88' : current >= 50 ? '#ffd700' : '#ff4444');
  }
  if (avgEl) avgEl.textContent = `avg ${avg.toFixed(1)} Hz`;
}

function deriveMatchStateLabel(state) {
  if (!state || !state.match) return 'Idle';
  if (state.match.paused) return 'Paused';
  if (state.match.ended) return 'Ended';
  if (state.match.started) return 'Live';
  return 'Lobby';
}

function setTextIfPresent(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function estimateStateAgeText() {
  if (wsHz <= 0) return '— ms';
  return `~${Math.max(1, Math.round(1000 / wsHz))} ms`;
}

function updateGameHud(state) {
  const players = state?.players || [];
  const playerCount = players.length;
  const liveMap = state?.active_map || _activeMapName;

  setTextIfPresent('hud-view-mode', gameModeLabel(state?.game_mode ?? 0));
  setTextIfPresent('hud-map-name', liveMap);
  setTextIfPresent('hud-match-state', deriveMatchStateLabel(state));
  setTextIfPresent('hud-player-count', `${playerCount} entities online`);
  setTextIfPresent('hud-ws-rate', `${wsHz} / s`);
  setTextIfPresent('hud-latency', estimateStateAgeText());
  setTextIfPresent('server-view-card', `fpga live · ${liveMap}`);
}

function updateMapSelector(activeMap, selectedMap = activeMap) {
  const incomingActiveMap = String(activeMap || '').trim();
  const _rawSelectedMap = String(selectedMap || '').trim();
  const incomingSelectedMap = isValidMapName(_rawSelectedMap) ? _rawSelectedMap : '';
  const pendingAlive = Boolean(
    _pendingMapName && (performance.now() - _pendingMapRequestedAt) < MAP_SELECT_GRACE_MS,
  );
  const nextActiveMap = (
    (pendingAlive ? _pendingMapName : '')
    || incomingActiveMap
    || _activeMapName
    || LOBBY_MAP_NAME
  );
  const nextSelectedMap = (
    (pendingAlive ? _pendingMapName : '')
    || incomingSelectedMap
    || _selectedMapName
    || nextActiveMap
  );
  const activeChanged = nextActiveMap !== _activeMapName;
  _activeMapName = nextActiveMap;
  _selectedMapName = nextSelectedMap;
  if (_pendingMapName) {
    const serverAcceptedPending = incomingActiveMap === _pendingMapName || incomingSelectedMap === _pendingMapName;
    const pendingExpired = !pendingAlive;
    if (serverAcceptedPending || pendingExpired) {
      _pendingMapName = '';
      _pendingMapRequestedAt = 0;
    }
  }
  renderMapButtons();
  if (!replayState.active && (!mapData || mapData.name !== _activeMapName || activeChanged)) {
    loadMap(_activeMapName);
  }
}

function selectMap(name) {
  _pendingMapName = name;
  _pendingMapRequestedAt = performance.now();
  sendControl(`set_map:${name}`, `map → ${name}`);
  _selectedMapName = name;
  renderMapButtons();
}

async function deleteMapFromControls(mapId) {
  const entry = _availableMaps.find((candidate) => candidate.map_id === mapId);
  if (!entry) return;
  if (!entry.deletable) {
    window.setServiceNote?.(`map '${mapId}' is protected`);
    return;
  }
  const confirmed = window.confirm(`Delete '${entry.map_name}' (${entry.map_id})?`);
  if (!confirmed) return;
  window.setServiceNote?.(`deleting map '${entry.map_id}'...`);
  try {
    const response = await fetch(`/api/maps/${encodeURIComponent(entry.map_id)}`, { method: 'DELETE' });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }
    window.invalidateMonitorMapCache?.(entry.map_id);
    await window.requestMapListRefresh?.(0);
    window.setServiceNote?.(`deleted map '${entry.map_id}'`);
  } catch (error) {
    window.setServiceNote?.(`delete failed: ${error.message || 'request error'}`);
  }
}

// ── State ──────────────────────────────────────────────────────────────────
let latestState    = null;
window.latestState = latestState;
let latestStateVersion = 0;
let latestStateReceivedAt = performance.now();
window.latestStateVersion = latestStateVersion;
window.latestStateReceivedAt = latestStateReceivedAt;
let wsHz = 0, wsUpdateCount = 0, wsLastTime = performance.now(), wsLastMsgAt = 0;
let _lastBoardHzPushedAt = 0;
let renderCount = 0, renderLastTime = performance.now();

// ── Tag animation state ─────────────────────────────────────────────────────
const tagFlash  = {};   // { playerId: DOMHighResTimeStamp } — when tag started
const tagPos    = {};   // { playerId: {x, y, angle} } — frozen pose during animation
const lastLivePos = {}; // { playerId: {x, y, angle} } — previous server pose
const prevFlags = {};   // { playerId: bool } — detect rising edge of FLAG_TAGGED
const TAG_ANIM_MS = 800;
let lastMatchListSignature = '';
let lastReplayListSignature = '';
let replayLoading = false;
let replayState = {
  active: false,
  frames: [],
  frameIndex: 0,
  timer: null,
  matchId: null,
  mapName: null,
};

function resetTransientArenaState() {
  for (const key of Object.keys(tagFlash)) delete tagFlash[key];
  for (const key of Object.keys(tagPos)) delete tagPos[key];
  for (const key of Object.keys(lastLivePos)) delete lastLivePos[key];
  for (const key of Object.keys(prevFlags)) delete prevFlags[key];
  if (window.resetMonitorInterpolationState) {
    window.resetMonitorInterpolationState();
  }
}

function normalisePlayers(players) {
  return (players || []).map((p) => ({
    id: p.id ?? p.player_id,
    entityKey: p.entity_key ?? p.entityKey ?? String(p.id ?? p.player_id ?? "unknown"),
    x: p.x,
    y: p.y,
    angle: p.angle,
    flags: p.flags ?? 0,
    queued: Boolean(p.queued),
    queueSlot: p.queue_slot ?? p.queueSlot ?? null,
    simSlot: p.sim_slot ?? p.simSlot ?? null,
    displayName: p.display_name ?? p.displayName ?? '',
    profileKey: p.profile_key ?? p.profileKey ?? '',
    username: p.username ?? '',
    controllerKey: p.controller_key ?? p.controllerKey ?? '',
    boardSlot: p.board_slot ?? p.boardSlot ?? null,
    controlMode: p.control_mode ?? p.controlMode ?? 'manual',
    perf: (() => { try { return p.perf ? (typeof p.perf === 'string' ? JSON.parse(p.perf) : p.perf) : null; } catch { return null; } })(),
  }));
}

function gameModeLabel(mode) {
  return Number(mode) === 1 ? 'chase_bits' : 'chase';
}

function countActiveBits(bitsMask, totalBits) {
  let active = 0;
  for (let i = 0; i < totalBits; i++) {
    if ((bitsMask & (1 << i)) !== 0) active += 1;
  }
  return active;
}

// Expose tab/UI functions needed by inline onclick handlers in the template HTML.
window.setActiveTab = setActiveTab;
window.setMapFilterText = setMapFilterText;
window.toggleArchiveDrawer = toggleArchiveDrawer;
window.deleteMapFromControls = deleteMapFromControls;
window.loadMapList = loadMapList;
window.requestMapListRefresh = requestMapListRefresh;
window.invalidateMonitorMapCache = invalidateMapCache;
window.resetTransientArenaState = resetTransientArenaState;
