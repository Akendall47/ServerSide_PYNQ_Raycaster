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
    const perf = p.perf;
    const perfText = perf
      ? `${perf.cpu_temp_c}°C ${perf.tick_rate_hz}Hz${perf.worst_overrun_us > 0 ? ` +${perf.worst_overrun_us}μs` : ''}`
      : (p.boardSlot ? '—' : '');
    const perfColour = perf && perf.worst_overrun_us > 500 ? '#ff6666' : perf && perf.cpu_temp_c > 70 ? '#ffaa00' : '#558899';
    tr.innerHTML = `
      <td class="pid" style="color:${colour}">${idLabel}</td>
      <td style="color:${roleColour};font-size:10px">${role}${roleDetail}</td>
      <td>${p.x.toFixed(1)}</td>
      <td>${p.y.toFixed(1)}</td>
      <td>${(p.angle * 180/Math.PI).toFixed(0)}°</td>
      <td>${!isQueued && p.entityKey === firstActiveKey ? dist : ''}</td>
      <td class="${tagged ? 'tagged' : ''}">${statusText}</td>
      <td style="color:${perfColour};font-size:10px">${perfText}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateNodeLinks(stateOrPlayers) {
  const state = Array.isArray(stateOrPlayers)
    ? {
      players: stateOrPlayers,
      slot_modes: latestState?.slot_modes || { 1: 'manual', 2: 'manual' },
      board_replays: latestState?.board_replays || [],
    }
    : (stateOrPlayers || { players: [], slot_modes: { 1: 'manual', 2: 'manual' }, board_replays: [] });
  const normalised = normalisePlayers(state.players);
  const slotModes = state.slot_modes || { 1: 'manual', 2: 'manual' };
  [1, 2].forEach((nodeId) => {
    const el = document.getElementById(`node${nodeId}-link`);
    const replay = Array.isArray(state.board_replays)
      ? state.board_replays.find((entry) => Number(entry.board_slot) === nodeId)
      : null;
    if (replay && replay.status === 'playing') {
      const progress = replay.frame_count ? `${replay.frame_index}/${replay.frame_count}` : 'streaming';
      el.textContent = `replay · ${progress}`;
      el.style.color = '#ffd166';
      return;
    }
    if (replay && replay.status === 'loading') {
      el.textContent = 'replay · loading';
      el.style.color = '#ffd166';
      return;
    }
    if (replay && replay.status === 'error') {
      el.textContent = 'replay · error';
      el.style.color = '#ff6666';
      return;
    }
    const activePlayer = normalised.find((player) => !player.queued && player.boardSlot === nodeId);
    const queuedPlayer = normalised.find((player) => player.queued && player.boardSlot === nodeId);
    const statusText = activePlayer ? 'connected' : queuedPlayer ? 'lobby' : 'offline';
    const statusColour = activePlayer ? '#baffd8' : queuedPlayer ? '#7dc3ff' : '#665a8a';
    const modeText = String((activePlayer || queuedPlayer)?.controlMode || slotModes[nodeId] || 'manual').toLowerCase();
    el.textContent = `${statusText} · ${modeText}`;
    el.style.color = statusColour;
  });
}

function updateBoardStats(players) {
  const normalised = normalisePlayers(players || []);
  [1, 2].forEach((slot) => {
    const p = normalised.find((pl) => pl.boardSlot === slot);
    const perf = p?.perf;
    const rowsEl = document.getElementById(`node${slot}-perf-rows`);
    if (!rowsEl) return;

    const tempEl    = document.getElementById(`bs-p${slot}-temp-inline`);
    const hzEl      = document.getElementById(`bs-p${slot}-hz-inline`);
    const bramEl    = document.getElementById(`bs-p${slot}-bram-inline`);
    const overrunEl = document.getElementById(`bs-p${slot}-overrun-inline`);

    if (!perf) {
      rowsEl.hidden = true;
      return;
    }
    rowsEl.hidden = false;

    const temp = perf.cpu_temp_c > 0 ? `${perf.cpu_temp_c}°C` : 'N/A';
    const tempColor = perf.cpu_temp_c > 80 ? '#ff6666' : perf.cpu_temp_c > 70 ? '#ffaa00' : '#aabbcc';
    tempEl.textContent = temp;
    tempEl.style.color = tempColor;

    const hz = `${perf.tick_rate_hz}Hz`;
    const hzColor = perf.tick_rate_hz < 55 ? '#ffaa00' : '#aabbcc';
    hzEl.textContent = hz;
    hzEl.style.color = hzColor;

    const bram = `${perf.bram_write_us}µs`;
    const bramColor = perf.bram_write_us > 500 ? '#ffaa00' : '#aabbcc';
    bramEl.textContent = bram;
    bramEl.style.color = bramColor;

    const overrun = perf.worst_overrun_us;
    overrunEl.textContent = overrun > 0 ? `+${overrun}µs` : 'ok';
    overrunEl.style.color = overrun > 1000 ? '#ff6666' : overrun > 200 ? '#ffaa00' : '#00ff88';
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

function setArenaReplayOverlay(active, matchId = null) {
  const el = document.getElementById('arena-replay-overlay');
  if (!el) return;
  if (!active) {
    el.hidden = true;
    el.textContent = 'IN REPLAY MODE';
    return;
  }
  const suffix = matchId ? ` · ${String(matchId).replace(/^match-/, '')}` : '';
  el.textContent = `IN REPLAY MODE${suffix}`;
  el.hidden = false;
}

function setBoardReplayStatus(text) {
  const el = document.getElementById('board-replay-status');
  if (el) el.textContent = text;
}

const REPLAY_FPS = 60;  // server records at 60 Hz — match for real-time playback

function stopReplay(statusText = 'replay stopped') {
  if (replayState.timer) {
    clearInterval(replayState.timer);
    replayState.timer = null;
  }
  const wasActive = replayState.active;
  replayState.active = false;
  replayState.frames = [];
  replayState.frameIndex = 0;
  replayState.matchId = null;
  replayState.mapName = null;
  setArenaReplayOverlay(false);
  if (wasActive) {
    window.resetTransientArenaState?.();
    setReplayStatus(statusText);
    updateCanvasLabel?.();
    if (_activeMapName) {
      loadMap(_activeMapName, { force: true });
    }
    if (latestState) {
      updatePlayers(latestState.players);
      updateNodeLinks(latestState);
      updateBitsPanel(latestState);
    }
  }
}

function replayMapNameFromEvents(events) {
  const eventWithMap = (events || []).find((ev) => ev?.map);
  return eventWithMap?.map || null;
}

function startReplayPlayback(matchId, events, mapName = null) {
  stopReplay();
  window.resetTransientArenaState?.();
  const frames = events.filter((ev) => ev.event === 'state_snapshot');
  if (!frames.length) {
    setReplayStatus(`match ${matchId.replace(/^match-/, '')} has no state frames`);
    return;
  }

  replayState.active = true;
  replayState.frames = frames;
  replayState.frameIndex = 0;
  replayState.matchId = matchId;
  replayState.mapName = mapName || replayMapNameFromEvents(events);
  setArenaReplayOverlay(true, matchId);
  setReplayStatus(`playing ${matchId.replace(/^match-/, '')} from S3 (${frames.length} frames)`);
  updateCanvasLabel?.();
  updatePlayers(frames[0].players);
  updateBitsPanel({ bits: frames[0].bits || [], bits_mask: frames[0].bits_mask ?? 0xFFFF, game_mode: frames[0].game_mode ?? 0 });

  replayState.timer = setInterval(() => {
    replayState.frameIndex += 1;
    if (replayState.frameIndex >= replayState.frames.length) {
      stopReplay(`replay complete for ${matchId.replace(/^match-/, '')}`);
      return;
    }
    const frame = replayState.frames[replayState.frameIndex];
    updateCanvasLabel?.();
    updatePlayers(frame.players);
    // Keep the bits panel in sync with each replay frame so it shows correct collection state.
    updateBitsPanel({ bits: frame.bits || [], bits_mask: frame.bits_mask ?? 0xFFFF, game_mode: frame.game_mode ?? 0 });
  }, 1000 / REPLAY_FPS);
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
    const replayMapName = replayMapNameFromEvents(payload.events || []);
    if (replayMapName) {
      await loadMap(replayMapName, { force: true });
    }
    startReplayPlayback(matchId, payload.events || [], replayMapName);
  } catch (err) {
    setReplayStatus(`replay load failed: ${err.message}`);
  } finally {
    replayLoading = false;
  }
}

async function startBoardReplay(boardSlot, matchId) {
  setBoardReplayStatus(`requesting ${matchId.replace(/^match-/, '')} on P${boardSlot}...`);
  await sendControl('start_board_replay', `start board ${boardSlot} replay`, {
    payload: { board_slot: boardSlot, match_id: matchId },
    preserveReplay: true,
  });
}

async function stopBoardReplayStream(boardSlot) {
  setBoardReplayStatus(`stopping board replay on P${boardSlot}...`);
  await sendControl('stop_board_replay', `stop board ${boardSlot} replay`, {
    payload: { board_slot: boardSlot },
    preserveReplay: true,
  });
}

function updateBoardReplayStatus(state) {
  const replays = Array.isArray(state?.board_replays) ? state.board_replays : [];
  if (!replays.length) {
    setBoardReplayStatus('no board replay active');
    return;
  }
  const summary = replays.map((replay) => {
    const slot = Number(replay.board_slot || 0);
    const matchLabel = String(replay.match_id || '').replace(/^match-/, '') || 'unknown';
    if (replay.status === 'playing') {
      const progress = replay.frame_count ? ` ${replay.frame_index}/${replay.frame_count}` : '';
      return `P${slot}: ${matchLabel}${progress}`;
    }
    if (replay.status === 'loading') {
      return `P${slot}: loading ${matchLabel}`;
    }
    const tail = replay.message ? ` (${replay.message})` : '';
    return `P${slot}: error${tail}`;
  }).join(' · ');
  setBoardReplayStatus(summary);
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
      <div class="replay-entry">
        <button class="replay-btn" onclick="loadReplay('${m.match_id}')">
          mini map ${m.match_id.replace(/^match-/, '')} (${m.replay_frames}f)
        </button>
        <div class="replay-actions">
          <button class="replay-btn secondary" onclick="startBoardReplay(1, '${m.match_id}')">
            P1 screen
          </button>
          <button class="replay-btn secondary" onclick="startBoardReplay(2, '${m.match_id}')">
            P2 screen
          </button>
        </div>
      </div>
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
const MONITOR_STATE_EVENT = 'monitor:state';
let lastLiveMatchEnded = false;
let lastActiveMapSeen = null;
let lastActivePlayerCount = 0;

function scheduleMapRefresh(cmd) {
  if (!String(cmd || '').startsWith('set_map:')) return;
  const mapName = String(cmd).split(':', 2)[1] || '';
  if (mapName) {
    window.invalidateMonitorMapCache?.(mapName);
    updateMapSelector(mapName, mapName);
  }
  if (typeof window.requestMapListRefresh === 'function') {
    window.requestMapListRefresh(250).then(() => {
      if (mapName) {
        loadMap(mapName, { force: true });
      }
    });
    return;
  }
  window.setTimeout(() => {
    loadMapList();
    if (mapName) {
      loadMap(mapName, { force: true });
    }
  }, 250);
}

async function sendControl(cmd, label, options = {}) {
  if (replayState.active && !options.preserveReplay) {
    stopReplay('replay stopped — returning to live control');
  }
  if (cmd === 'start_match' && !isValidMapName(latestState?.selected_map || _selectedMapName)) {
    setServiceNote('select a map before starting the match');
    return false;
  }
  const payload = { ...(options.payload || {}), cmd };
  const forceHttp = Boolean(options.forceHttp) || String(cmd || '').startsWith('set_map:');
  if (!forceHttp && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
    setServiceNote(`${label} requested...`);
    scheduleMapRefresh(cmd);
    return true;
  }
  setServiceNote(`${label} requested via HTTP...`);
  try {
    const resp = await fetch('/api/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(text || `HTTP ${resp.status}`);
    }
    scheduleMapRefresh(cmd);
    return true;
  } catch (error) {
    setServiceNote(`control failed: ${error.message || 'request error'}`);
    return false;
  }
}
function connect() {
  const wsProto = location.protocol === 'https:' ? 'wss' : 'ws';
  ws = new WebSocket(`${wsProto}://${location.host}/ws`);
  ws.onopen = () => {
    statusEl.textContent = '● LIVE';
    statusEl.className   = 'connected';
    if (!mapData) loadMap(_activeMapName);
    if (typeof window.requestMapListRefresh === 'function') {
      window.requestMapListRefresh(0);
    } else {
      loadMapList();
    }
  };
  ws.onmessage = (evt) => {
    window._lastStateReceivedWallMs = Date.now();
    const state = JSON.parse(evt.data);
    const normalisedPlayers = normalisePlayers(state.players || []);
    const activePlayerCount = normalisedPlayers.filter((player) => !player.queued).length;
    const matchEnded = Boolean(state.match?.ended);
    const activeMapChanged = lastActiveMapSeen !== null && state.active_map !== lastActiveMapSeen;
    const returnedToLobby = lastActivePlayerCount > 0 && activePlayerCount === 0;
    const exitedEndHold = lastLiveMatchEnded && !matchEnded;
    if (activeMapChanged && state.active_map) {
      window.invalidateMonitorMapCache?.(state.active_map);
    }
    if (activeMapChanged || returnedToLobby || exitedEndHold) {
      window.resetTransientArenaState?.();
    }
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
    lastLiveMatchEnded = matchEnded;
    lastActiveMapSeen = state.active_map || null;
    lastActivePlayerCount = activePlayerCount;
    latestState = state;
    window.latestState = state;
    latestStateVersion += 1;
    latestStateReceivedAt = performance.now();
    window.latestStateVersion = latestStateVersion;
    window.latestStateReceivedAt = latestStateReceivedAt;
    window.dispatchEvent(new CustomEvent(MONITOR_STATE_EVENT, { detail: state }));
    updateGameHud(state);
    if (!replayState.active) updatePlayers(state.players);
    updateNodeLinks(state);
    updateBoardStats(state.players);
    if (!replayState.active) updateBitsPanel(state);
    updateRedis(state.redis);
    updateServices(state.services);
    updatePipeline(state.pipeline);
    updateBoardReplayStatus(state);
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
    const boardHz = normalisedPlayers.reduce(
      (max, p) => (p.perf?.tick_rate_hz ? Math.max(max, p.perf.tick_rate_hz) : max), 0
    );
    if (boardHz > 0) pushBoardHzSample(boardHz, now);
    wsLastMsgAt = now;
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
// Expose functions needed by inline onclick handlers in the template HTML.
window.stopReplay = stopReplay;
window.startBoardReplay = startBoardReplay;
window.stopBoardReplayStream = stopBoardReplayStream;
window.sendControl = sendControl;
window.setServiceNote = setServiceNote;

setActiveTab(window.location.hash.replace('#', ''));
initThemeToggle();
connect();
