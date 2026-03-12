// ── Side-panel updates ─────────────────────────────────────────────────────
function updatePlayers(players) {
  players = normalisePlayers(players);
  const tbody = document.getElementById('player-tbody');
  tbody.innerHTML = '';
  let dist = '—';
  const activePlayers = players.filter((p) => !p.queued);
  const firstActiveKey = activePlayers.length ? activePlayers[0].entityKey : null;
  if (activePlayers.length >= 2) {
    const dx = activePlayers[1].x - activePlayers[0].x;
    const dy = activePlayers[1].y - activePlayers[0].y;
    dist = Math.sqrt(dx*dx + dy*dy).toFixed(1) + 'u';
  }
  players.forEach((p, i) => {
    const tagged  = (p.flags & FLAG_TAGGED) !== 0;
    const matchEnded = (p.flags & FLAG_MATCH_END) !== 0;
    const isGhost = (p.flags & FLAG_GHOST) !== 0;
    const isQueued = Boolean(p.queued);
    const colour  = isQueued ? '#4da3ff' : (isGhost ? '#555566' : PLAYER_COLOURS[i % PLAYER_COLOURS.length]);
    const tr = document.createElement('tr');
    const role      = isQueued ? 'lobby' : (isGhost ? 'ghost' : (p.id === 1) ? 'runner' : 'tagger');
    const roleDetail = isQueued && p.displayName ? ` · ${p.displayName}` : '';
    const roleColour = isQueued ? '#7dc3ff' : (isGhost ? '#666' : (p.id === 1) ? '#888' : '#ffaa00');
    const statusText = isQueued ? 'CONNECTED' : (tagged ? '★ TAGGED' : (matchEnded ? 'MATCH END' : '—'));
    const idLabel = isQueued ? `Q${p.queueSlot ?? 0}` : `P${p.id}`;
    tr.innerHTML = `
      <td class="pid" style="color:${colour}">${idLabel}</td>
      <td style="color:${roleColour};font-size:10px">${role}${roleDetail}</td>
      <td>${p.x.toFixed(1)}</td>
      <td>${p.y.toFixed(1)}</td>
      <td>${(p.angle * 180/Math.PI).toFixed(0)}°</td>
      <td>${!isQueued && p.entityKey === firstActiveKey ? dist : ''}</td>
      <td class="${tagged ? 'tagged' : ''}">${statusText}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateNodeLinks(players) {
  const normalised = normalisePlayers(players);
  [1, 2].forEach((nodeId) => {
    const el = document.getElementById(`node${nodeId}-link`);
    const activePlayer = normalised.find((player) => player.id === nodeId);
    const queuedPlayer = normalised.find((player) => player.queued && player.queueSlot === nodeId);
    const statusText = activePlayer ? 'connected' : queuedPlayer ? 'lobby' : 'offline';
    const statusColour = activePlayer ? '#baffd8' : queuedPlayer ? '#7dc3ff' : '#665a8a';
    el.textContent = `${statusText} · fpga`;
    el.style.color = statusColour;
  });
}

function updateBitsPanel(state) {
  const bits = state?.bits || [];
  const total = bits.length;
  const mode = gameModeLabel(state?.game_mode ?? 0);
  const active = total ? countActiveBits(state?.bits_mask ?? 0, total) : 0;
  const collected = total - active;
  const progress = total ? Math.round((collected / total) * 100) : 0;

  document.getElementById('bits-mode').textContent = total ? mode : 'inactive';
  document.getElementById('bits-remaining').textContent = total ? `${active} / ${total}` : '—';
  document.getElementById('bits-collected').textContent = total ? `${collected}` : '—';
  document.getElementById('bits-progress').textContent = total ? `${progress}%` : '—';
  document.getElementById('bits-fill').style.width = `${progress}%`;
  document.getElementById('bits-note').textContent = total
    ? `runner wins after clearing all ${total} bits. grey markers are already collected.`
    : 'this map has no bit objective; it is pure chase/tag.';
}

function setReplayStatus(text) {
  document.getElementById('replay-status').textContent = text;
}

function stopReplay() {
  if (replayState.timer) {
    clearInterval(replayState.timer);
    replayState.timer = null;
  }
  const wasActive = replayState.active;
  replayState.active = false;
  replayState.frames = [];
  replayState.frameIndex = 0;
  replayState.matchId = null;
  if (wasActive) {
    setReplayStatus('replay stopped');
    if (latestState) {
      updatePlayers(latestState.players);
    }
  }
}

function startReplayPlayback(matchId, events) {
  stopReplay();
  const frames = events.filter((ev) => ev.event === 'state_snapshot');
  if (!frames.length) {
    setReplayStatus(`match ${matchId.replace(/^match-/, '')} has no state frames`);
    return;
  }

  replayState.active = true;
  replayState.frames = frames;
  replayState.frameIndex = 0;
  replayState.matchId = matchId;
  setReplayStatus(`playing ${matchId.replace(/^match-/, '')} from S3 (${frames.length} frames)`);
  updatePlayers(frames[0].players);

  replayState.timer = setInterval(() => {
    replayState.frameIndex += 1;
    if (replayState.frameIndex >= replayState.frames.length) {
      stopReplay();
      setReplayStatus(`replay complete for ${matchId.replace(/^match-/, '')}`);
      return;
    }
    const frame = replayState.frames[replayState.frameIndex];
    updatePlayers(frame.players);
  }, 1000 / 20);
}

async function loadReplay(matchId) {
  if (replayLoading) {
    return;
  }
  replayLoading = true;
  setReplayStatus(`loading ${matchId.replace(/^match-/, '')} from S3...`);
  try {
    const resp = await fetch(`/api/replay/${encodeURIComponent(matchId)}`);
    if (!resp.ok) {
      const msg = await resp.text();
      throw new Error(msg || `HTTP ${resp.status}`);
    }
    const payload = await resp.json();
    startReplayPlayback(matchId, payload.events || []);
  } catch (err) {
    setReplayStatus(`replay load failed: ${err.message}`);
  } finally {
    replayLoading = false;
  }
}

function updateRedis(redis) {
  document.getElementById('r-ops').textContent     = redis.ops_per_sec;
  document.getElementById('r-mem').textContent     = redis.mem_used;
  document.getElementById('r-clients').textContent = redis.connected_clients;
  document.getElementById('r-blocked').textContent = redis.blocked_clients;
  document.getElementById('r-pubsub').textContent  = redis.pubsub_clients;
  document.getElementById('r-poll').textContent    = `${redis.monitor_cmds_per_sec}/s`;

  const parts = [];
  if (redis.blocked_clients > 0) parts.push(`${redis.blocked_clients} blocked`);
  if (redis.pubsub_clients > 0) parts.push(`${redis.pubsub_clients} pub/sub`);
  if (redis.direct_clients > 0) parts.push(`${redis.direct_clients} direct`);
  const breakdown = parts.length ? parts.join(' + ') : 'no active connections';

  let note = `monitor polls Redis at ${redis.monitor_push_hz} Hz (~${redis.monitor_cmds_per_sec} commands/sec from this page). `;
  note += `Clients ${redis.connected_clients} = ${breakdown}. `;
  note += `Blocked is usually the sidecar on BRPOP; pub/sub is usually the live control subscriber in T2.`;
  document.getElementById('redis-note').textContent = note;
}

function updatePipeline(pipeline) {
  if (!pipeline) return;
  document.getElementById('pp-players').textContent = pipeline.players_online;
  document.getElementById('pp-ops').textContent     = pipeline.ops_per_sec;
  document.getElementById('pp-blocked').textContent = pipeline.sidecar_blocked;
  document.getElementById('pp-events').textContent  = pipeline.match_events;
  document.getElementById('pp-ddb').textContent     = pipeline.ddb_matches;
}

function setServiceNote(text) {
  const el = document.getElementById('svc-note');
  if (el) el.textContent = text;
}

function updateServices(services) {
  if (!services) return;

  const applyState = (id, svc) => {
    const el = document.getElementById(id);
    if (!svc) {
      el.textContent = '—';
      el.style.color = '#888';
      return;
    }
    el.textContent = svc.running ? `running (${svc.pid_count})` : 'stopped';
    el.style.color = svc.running ? '#00ff88' : '#ff6666';
  };

  applyState('svc-server', services.server);
  applyState('svc-sidecar', services.sidecar);
  applyState('svc-monitor', services.monitor);
  setServiceNote(services.last_action || 'controls run on EC2 only; FPGA boards stay connected over UDP');
}

function describePausedPlayers(playerIds) {
  if (!Array.isArray(playerIds) || playerIds.length === 0) return 'player reconnect';
  return playerIds.map((id) => `P${id}`).join(', ');
}

function updateMatchState(match) {
  const banner = document.getElementById('pause-banner');
  if (!match || !match.paused) {
    banner.hidden = true;
    banner.textContent = '';
    return;
  }

  const who = describePausedPlayers(match.paused_player_ids);
  const remaining = Number.isFinite(match.pause_remaining_s)
    ? Math.max(0, Math.ceil(match.pause_remaining_s))
    : 0;
  const tail = remaining > 0 ? ` · abort in ${remaining}s if they do not return` : '';
  banner.hidden = false;
  banner.innerHTML = `<strong>match paused</strong> · waiting for ${who}${tail}`;
}

function updateMatches(matches) {
  const el = document.getElementById('match-list');
  const replayEl = document.getElementById('replay-list');
  const chip = document.getElementById('game-chip');
  if (!matches || matches.length === 0) {
    if (lastMatchListSignature !== 'empty') {
      el.innerHTML = '<span style="color:#333">no matches yet</span>';
      lastMatchListSignature = 'empty';
    }
    if (lastReplayListSignature !== 'empty') {
      replayEl.innerHTML = '<button class="replay-btn empty" disabled>no recent matches</button>';
      lastReplayListSignature = 'empty';
    }
    chip.textContent = 'no game';
    chip.className = '';
    return;
  }
  const active = matches.find(m => m.status === 'paused' || m.status === 'in_progress');
  const activeMap = latestState?.active_map || active?.map_name || _activeMapName;
  const modeLabel = gameModeLabel(latestState?.game_mode ?? active?.game_mode ?? 0);
  if (active) {
    const liveLabel = active.match_id === 'live-now' ? 'live' : active.match_id.replace(/^match-/, '');
    chip.textContent = `${modeLabel} · ${activeMap} · ${liveLabel}`;
    chip.className = active.status === 'paused' ? 'paused' : 'active';
  } else {
    const lastLabel = matches[0].match_id === 'live-now' ? 'live' : matches[0].match_id.replace(/^match-/, '');
    chip.textContent = `${modeLabel} · ${activeMap} · ${lastLabel}`;
    chip.className = '';
  }
  const matchSignature = JSON.stringify(matches.map(m => [m.match_id, m.status, m.timestamp]));
  if (matchSignature !== lastMatchListSignature) {
    el.innerHTML = matches.map(m => `
      <div class="match-row">
        <span class="match-id">${m.match_id === 'live-now' ? 'live' : m.match_id.replace(/^match-/, '')}</span>
        <span class="match-status ${m.status}">${m.status.replace('_', ' ')}</span>
        <span class="match-time">${m.timestamp.slice(11)}</span>
      </div>
    `).join('');
    lastMatchListSignature = matchSignature;
  }

  const replayable = matches.filter(m => m.has_state_replay);
  if (!replayable.length) {
    if (lastReplayListSignature !== 'none') {
      replayEl.innerHTML = '<button class="replay-btn empty" disabled>no recent state replays in S3</button>';
      lastReplayListSignature = 'none';
    }
    return;
  }

  const replaySignature = JSON.stringify(replayable.map(m => [m.match_id, m.replay_frames]));
  if (replaySignature !== lastReplayListSignature) {
    replayEl.innerHTML = replayable.map(m => `
      <button class="replay-btn" onclick="loadReplay('${m.match_id}')">
        replay ${m.match_id.replace(/^match-/, '')} (${m.replay_frames}f)
      </button>
    `).join('');
    lastReplayListSignature = replaySignature;
  }
}

// ── Event log ──────────────────────────────────────────────────────────────
// monitor.py now sends the current match's event sequence only (newest first).
// We re-render the small list each update so a new match clears old history.
function describeEventText(ev) {
  const type = ev.event || 'unknown';
  if (type === 'player_tagged') return `P${ev.player_id} tagged  (dist ${ev.dist != null ? (+ev.dist).toFixed(1) : '?'}u)`;
  if (type === 'bit_collected') {
    const totalBits = latestState?.bits?.length || 0;
    const remaining = totalBits ? countActiveBits(ev.bits_mask ?? 0, totalBits) : '?';
    return `bit ${ev.bit_id ?? '?'} collected  (${remaining} left)`;
  }
  if (type === 'match_start') {
    const humans = ev.human_players ?? ev.players ?? '?';
    const ghosts = ev.ghost_count ?? 0;
    return ghosts ? `match started  (${humans} human, ${ghosts} ghost)` : `match started  (${humans} players)`;
  }
  if (type === 'match_end') return `match ended  (winner: ${ev.winner ?? '?'})`;
  if (type === 'match_aborted') return `match aborted  (${ev.reason ?? 'unknown_reason'})`;
  if (type === 'match_paused') {
    const who = describePausedPlayers(ev.timed_out_player_ids);
    const tail = ev.pause_abort_s != null ? `, abort in ${Math.round(+ev.pause_abort_s)}s` : '';
    return `match paused  (${who}${tail})`;
  }
  if (type === 'match_resumed') return 'match resumed  (all players back)';
  return type;
}

function renderGameEvents(events) {
  const list = document.getElementById('game-event-list');
  const count = document.getElementById('hud-event-count');

  if (!events || events.length === 0) {
    list.innerHTML = '<div class="hud-feed-empty">waiting for first match event...</div>';
    count.textContent = 'idle';
    return;
  }

  const latest = events.slice(0, 4);
  list.innerHTML = latest.map((ev) => {
    const type = ev.event || 'unknown';
    return `<div class="game-event-row ${type}"><span class="game-event-text">${describeEventText(ev)}</span><span class="event-time">${ev.display_time || ''}</span></div>`;
  }).join('');
  count.textContent = `${events.length} this match`;
}

function updateEvents(events) {
  renderGameEvents(events);
}

// ── WebSocket ──────────────────────────────────────────────────────────────
const statusEl = document.getElementById('status');
let ws = null;

function scheduleMapRefresh(cmd) {
  if (!String(cmd || '').startsWith('set_map:')) return;
  const mapName = String(cmd).split(':', 2)[1] || '';
  if (mapName) {
    updateMapSelector(mapName, mapName);
  }
  window.setTimeout(() => { loadMapList(); }, 150);
  window.setTimeout(() => { loadMapList(); }, 500);
}

async function sendControl(cmd, label) {
  if (cmd === 'start_match' && !(latestState?.selected_map || _selectedMapName)) {
    setServiceNote('select a map before starting the match');
    return;
  }
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({cmd}));
    setServiceNote(`${label} requested...`);
    scheduleMapRefresh(cmd);
    return;
  }
  setServiceNote(`${label} requested via HTTP...`);
  try {
    const resp = await fetch('/api/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cmd }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(text || `HTTP ${resp.status}`);
    }
    scheduleMapRefresh(cmd);
  } catch (error) {
    setServiceNote(`control failed: ${error.message || 'request error'}`);
  }
}
function connect() {
  const wsProto = location.protocol === 'https:' ? 'wss' : 'ws';
  ws = new WebSocket(`${wsProto}://${location.host}/ws`);
  ws.onopen = () => {
    statusEl.textContent = '● LIVE';
    statusEl.className   = 'connected';
    if (!mapData) loadMap(_activeMapName);
    loadMapList();
  };
  ws.onmessage = (evt) => {
    const state = JSON.parse(evt.data);
    // New match boundary: drop any previous round's tag/match-end visual state.
    if (state.events && state.events.length > 0 && state.events[0].event === 'match_start') {
      for (const k of Object.keys(prevFlags)) delete prevFlags[k];
      for (const k of Object.keys(tagFlash)) delete tagFlash[k];
      for (const k of Object.keys(tagPos)) delete tagPos[k];
      for (const k of Object.keys(lastLivePos)) delete lastLivePos[k];
    }
    if (!state.players || state.players.length === 0) {
      for (const k of Object.keys(prevFlags)) delete prevFlags[k];
      for (const k of Object.keys(tagFlash)) delete tagFlash[k];
      for (const k of Object.keys(tagPos)) delete tagPos[k];
      for (const k of Object.keys(lastLivePos)) delete lastLivePos[k];
    }
    latestState = state;
    window.latestState = state;
    updateGameHud(state);
    if (!replayState.active) updatePlayers(state.players);
    updateNodeLinks(state.players);
    updateBitsPanel(state);
    updateRedis(state.redis);
    updateServices(state.services);
    updatePipeline(state.pipeline);
    updateMatches(state.matches);
    updateMatchState(state.match);
    updateEvents(state.events);
    updateMapSelector(
      state.active_map,
      Object.prototype.hasOwnProperty.call(state, 'selected_map')
        ? state.selected_map
        : state.active_map,
    );
    wsUpdateCount++;
    const now = performance.now();
    if (now - wsLastTime >= 1000) {
      wsHz = wsUpdateCount;
      wsUpdateCount = 0; wsLastTime = now;
    }
  };
  ws.onclose = () => {
    statusEl.textContent = '● DISCONNECTED';
    statusEl.className   = 'disconnected';
    setTimeout(connect, 2000);
  };
  ws.onerror = () => ws.close();
}

// ── Theme toggle ────────────────────────────────────────────────────────────
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Load saved theme or use system preference
  const savedTheme = localStorage.getItem('monitor-theme');
  let currentTheme = savedTheme;
  
  if (!currentTheme) {
    // Use system preference if no saved theme
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    currentTheme = prefersLight ? 'light' : 'dark';
  }
  
  // Apply initial theme
  html.setAttribute('data-theme', currentTheme);
  updateThemeButton(toggle, currentTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('monitor-theme')) {
      const newTheme = e.matches ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      updateThemeButton(toggle, newTheme);
    }
  });
  
  // Toggle button click handler
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('monitor-theme', next);
      updateThemeButton(toggle, next);
    });
  }
}

function updateThemeButton(button, theme) {
  if (!button) return;
  button.textContent = theme === 'light' ? '☀️ Light' : '🌙 Dark';
  button.setAttribute('aria-pressed', theme === 'light' ? 'false' : 'true');
}

updateGameHud(null);
drawFrameChart();
if (stackedFrameChart) {
  seedStackedFrameChart();
  setInterval(() => pushStackedFrame(generateDummyPipelineFrame()), 100);
}
// Expose functions needed by inline onclick handlers in the template HTML.
window.stopReplay = stopReplay;
window.sendControl = sendControl;

setActiveTab(window.location.hash.replace('#', ''));
initThemeToggle();
connect();
