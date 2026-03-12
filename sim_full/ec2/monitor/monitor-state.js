const canvas = document.getElementById('arena');
const ctx    = canvas.getContext('2d');
const frameChartCanvas = document.getElementById('frame-chart');
const frameChartCtx = frameChartCanvas.getContext('2d');
const stackedFrameChart = document.getElementById('stacked-frame-chart');
const W = canvas.width, H = canvas.height;
const TAG_RADIUS     = 20.0;   // must match t2_game_tick.py TAG_RADIUS
const ORBIT_RADIUS   = 50.0;   // must match t2_game_tick.py ORBIT_RADIUS
const WORLD_LIMIT    = ORBIT_RADIUS + TAG_RADIUS + 10.0;  // 80u total safe view
const TILE_SCALE     = 8;      // world units per tile — must match MAP_TILE_SCALE
const PLAYER_COLLISION_RADIUS = 2.5;
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
let _showMap = true;  // map play is the default; orbit view is a sim-only test tool
let _viewMode = 'map';
const requestedNodeModes = { 1: 'manual', 2: 'manual' };
let _mapManualSyncPending = true;
let _activePage = 'game';
let _archiveDrawerOpen = false;
const frameTimeHistory = [];
const STACKED_BUFFER_SIZE = 120;
const STACKED_MAX_MS = 50;
const STACKED_CHART_HEIGHT = 160;
const stackedFrameBuffer = [];
let stackedFrameId = 0;
let lastRenderSampleAt = performance.now();
const MAP_SELECT_GRACE_MS = 1500;

function hasSelectedMap(name) {
  return Boolean(String(name || '').trim());
}

async function loadMap(name = _activeMapName) {
  if (!name) {
    mapData = null;
    updateCanvasLabel();
    return;
  }
  try {
    const resp = await fetch(`/api/map/${encodeURIComponent(name)}`);
    if (!resp.ok) return;
    mapData = await resp.json();
    mapData.name = name;
    updateCanvasLabel();
  } catch (e) {
    console.warn('[monitor] map load failed:', e);
  }
}

async function loadMapList() {
  try {
    const resp = await fetch('/api/maps');
    if (!resp.ok) return;
    const data = await resp.json();
    _availableMaps = data.maps || [];
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
}

function renderMapButtons() {
  const el = document.getElementById('map-btn-list');
  if (!el) return;
  if (!_availableMaps.length) {
    el.innerHTML = '<span style="color:#333">no maps found</span>';
    return;
  }

  const filteredMaps = _availableMaps.filter((name) => (
    !_mapFilterText || String(name).toLowerCase().includes(_mapFilterText)
  ));

  if (!filteredMaps.length) {
    el.innerHTML = '<span style="color:#90a3c4">no maps match that filter</span>';
    return;
  }

  el.innerHTML = filteredMaps.map(name => `
    <button id="mapbtn-${name}"
      class="control-btn${
        name === _activeMapName
          ? ' start'
          : (name === _pendingMapName || name === _selectedMapName ? ' active-view' : '')
      }"
      onclick="selectMap('${name}')">${name}</button>
  `).join('');
}

function setMapFilterText(value) {
  _mapFilterText = String(value || '').trim().toLowerCase();
  renderMapButtons();
}

function renderViewModeButtons() {
  const el = document.getElementById('view-mode-btns');
  if (!el.dataset.initialized) {
    el.innerHTML = `
      <button id="viewmode-map" class="control-btn active-view" type="button" onclick="setViewMode('map')">Map Play</button>
    `;
    el.dataset.initialized = '1';
  }
  const mapBtn = document.getElementById('viewmode-map');
  if (mapBtn) {
    mapBtn.classList.add('active-view');
  }
}

function syncViewMode(mode) {
  const changed = _viewMode !== 'map' || !_showMap;
  _viewMode = 'map';
  _showMap = true;
  if (changed) {
    _mapManualSyncPending = true;
  }
  renderViewModeButtons();
  updateOrbitModeControls();
  if (_activeMapName && (changed || !mapData || mapData.name !== _activeMapName)) {
    loadMap(_activeMapName);
  } else {
    if (!_activeMapName) {
      mapData = null;
    }
    updateCanvasLabel();
  }
  updateGameHud(latestState);
}

function setViewMode(mode) {
  syncViewMode('map');
  _mapManualSyncPending = true;
  enforceMapManualModes();
}

function requestNodeMode(nodeId, mode, force = false) {
  if (!force && requestedNodeModes[nodeId] === mode) {
    updateNodeLinks(latestState?.players || []);
    return;
  }
  requestedNodeModes[nodeId] = mode;
  sendControl(`node${nodeId}_${mode}`, `node ${nodeId} ${mode} mode`);
  updateNodeLinks(latestState?.players || []);
}

function requestNodeConnection(nodeId, action) {
  const verb = action === 'disconnect' ? 'disconnect' : 'reconnect';
  sendControl(`node${nodeId}_${verb}`, `node ${nodeId} ${verb}`);
}

function enforceMapManualModes() {
  requestNodeMode(1, 'manual', true);
  requestNodeMode(2, 'manual', true);
}

function maybeEnforceMapManual(players) {
  if (_viewMode !== 'map' || !_mapManualSyncPending) return;
  if (!players || players.length === 0) return;
  _mapManualSyncPending = false;
  enforceMapManualModes();
}

function updateOrbitModeControls() {
  const orbitControls = document.getElementById('orbit-mode-controls');
  const mapPlayControls = document.getElementById('map-play-controls');
  const note = document.getElementById('view-mode-note');
  if (orbitControls) orbitControls.hidden = true;
  if (mapPlayControls) mapPlayControls.hidden = false;
  if (note) {
    note.textContent = 'Map play is the default and forces both simulator nodes back to manual control.';
  }
}

function updateCanvasLabel() {
  const el = document.getElementById('canvas-label');
  if (_showMap && mapData) {
    const totalBits = latestState?.bits?.length || 0;
    const remainingBits = countActiveBits(latestState?.bits_mask ?? 0, totalBits);
    const bitText = totalBits ? ` · bits ${remainingBits}/${totalBits}` : '';
    el.textContent = `map play · ${_activeMapName} · ${mapData.width}×${mapData.height} tiles · manual only${bitText}`;
  } else if (_showMap) {
    el.textContent = `map play · ${_activeMapName} · loading map…`;
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

function renderStackedFrameChart() {
  if (!stackedFrameChart) return;

  stackedFrameChart.innerHTML = '';
  if (!stackedFrameBuffer.length) {
    stackedFrameChart.innerHTML = '<div class="stacked-bars-empty">collecting frame timings...</div>';
    return;
  }

  const fragment = document.createDocumentFragment();
  stackedFrameBuffer.forEach((frame) => {
    const col = document.createElement('div');
    col.className = 'stacked-col';
    col.setAttribute('data-total', frame.total_ms.toFixed(1));

    let remainingMs = STACKED_MAX_MS;
    const segments = [
      { ms: frame.stages.dispatch_ms, cls: 'seg-dispatch' },
      { ms: frame.stages.compute_ms, cls: 'seg-compute' },
      { ms: frame.stages.network_ms, cls: 'seg-network' },
      { ms: frame.stages.composite_ms, cls: 'seg-composite' },
    ];

    segments.forEach((segment) => {
      const visibleMs = Math.max(0, Math.min(segment.ms, remainingMs));
      remainingMs -= visibleMs;
      if (visibleMs <= 0) return;

      const seg = document.createElement('div');
      seg.className = `seg ${segment.cls}`;
      seg.style.height = `${(visibleMs / STACKED_MAX_MS) * STACKED_CHART_HEIGHT}px`;
      col.appendChild(seg);
    });

    fragment.appendChild(col);
  });

  stackedFrameChart.appendChild(fragment);
}

function pushStackedFrame(frame) {
  if (!frame || !frame.stages) return;
  stackedFrameBuffer.push(frame);
  if (stackedFrameBuffer.length > STACKED_BUFFER_SIZE) {
    stackedFrameBuffer.shift();
  }
  renderStackedFrameChart();
}

function generateDummyPipelineFrame() {
  stackedFrameId += 1;
  const wave = (Math.sin(stackedFrameId / 8) + 1) * 0.5;
  const burst = stackedFrameId % 37 === 0 ? 5 + Math.random() * 5 : 0;
  const dispatch = 0.8 + Math.random() * 0.8;
  const compute = 6.2 + wave * 4.8 + Math.random() * 2.4 + burst;
  const network = 1.4 + Math.random() * 1.6 + (stackedFrameId % 19 === 0 ? 1.2 : 0);
  const composite = 1.0 + Math.random() * 1.2;
  const total = dispatch + compute + network + composite;

  return {
    frame_id: stackedFrameId,
    total_ms: total,
    stages: {
      dispatch_ms: dispatch,
      compute_ms: compute,
      network_ms: network,
      composite_ms: composite,
    },
  };
}

function seedStackedFrameChart() {
  if (!stackedFrameChart) return;
  while (stackedFrameBuffer.length < STACKED_BUFFER_SIZE) {
    stackedFrameBuffer.push(generateDummyPipelineFrame());
  }
  renderStackedFrameChart();
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
  const liveMap = state?.active_map || _activeMapName || 'lobby';

  setTextIfPresent('hud-view-mode', 'Map Play');
  setTextIfPresent('hud-map-name', liveMap);
  setTextIfPresent('hud-match-state', deriveMatchStateLabel(state));
  setTextIfPresent('hud-player-count', `${playerCount} entities online`);
  setTextIfPresent('hud-ws-rate', `${wsHz} / s`);
  setTextIfPresent('hud-latency', estimateStateAgeText());
  setTextIfPresent('server-view-card', `map play · ${liveMap}`);
}

function updateMapSelector(activeMap, selectedMap = activeMap) {
  const incomingActiveMap = String(activeMap || '').trim();
  const incomingSelectedMap = String(selectedMap || '').trim();
  const pendingAlive = Boolean(
    _pendingMapName && (performance.now() - _pendingMapRequestedAt) < MAP_SELECT_GRACE_MS,
  );
  const nextActiveMap = (
    incomingActiveMap
    || (pendingAlive ? _pendingMapName : '')
    || _activeMapName
    || LOBBY_MAP_NAME
  );
  const nextSelectedMap = (
    incomingSelectedMap
    || (pendingAlive ? _pendingMapName : '')
    || _selectedMapName
    || nextActiveMap
  );
  const changed = nextActiveMap !== _activeMapName || nextSelectedMap !== _selectedMapName;
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
  if (_showMap && (!mapData || mapData.name !== _activeMapName || changed)) {
    loadMap(_activeMapName);
  } else {
    updateCanvasLabel();
  }
}

function selectMap(name) {
  if (_viewMode !== 'map') {
    setViewMode('map');
  }
  _pendingMapName = name;
  _pendingMapRequestedAt = performance.now();
  sendControl(`set_map:${name}`, `map → ${name}`);
  _selectedMapName = name;
  _activeMapName = name;
  renderMapButtons();
  loadMap(name);
}

// ── State ──────────────────────────────────────────────────────────────────
let latestState    = null;
window.latestState = latestState;
let wsHz = 0, wsUpdateCount = 0, wsLastTime = performance.now();
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
};

function normalisePlayers(players) {
  return (players || []).map((p) => ({
    id: p.id ?? p.player_id,
    entityKey: p.entity_key ?? p.entityKey ?? `player:${p.id ?? p.player_id ?? 0}`,
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
