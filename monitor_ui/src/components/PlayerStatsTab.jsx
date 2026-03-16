import React, { startTransition, useEffect, useRef, useState } from 'react';
import HumanPlayerCard from './player-stats/HumanPlayerCard.jsx';
import ServerEntityCard from './player-stats/ServerEntityCard.jsx';
import {
  asNumber,
  currentRoleForPlayer,
  inferSimSlotFromProfile,
  isGhostPlayer,
  normaliseIdentityText,
  normaliseMatch,
  normaliseProfile,
  simSlotForValue,
} from './player-stats/utils.js';

const MONITOR_STATE_EVENT = 'monitor:state';
const MAX_VISIBLE_PROFILES = 4;

function buildGhostSlots(ghosts) {
  return Array.from({ length: 3 }, (_, index) => {
    const slotNumber = index + 1;
    const ghost = ghosts[index] || null;
    const entitySeed = String(
      ghost?.entity_key
      || ghost?.profile_key
      || ghost?.display_name
      || ghost?.username
      || ghost?.id
      || `ghost-slot-${slotNumber}`,
    );
    return {
      slotNumber,
      ghost,
      key: ghost ? `live-${entitySeed}` : `empty-${slotNumber}`,
      trophyPlayer: {
        player_key: `entity:${entitySeed}`,
        profile_key: entitySeed,
        currentRole: 'ghost',
        isOnline: Boolean(ghost),
      },
      displayName: ghost
        ? String(ghost.display_name || ghost.username || `Ghost ${ghost.id || slotNumber}`)
        : `Ghost Slot ${slotNumber}`,
      subtitle: ghost
        ? `slot ${slotNumber} · ${entitySeed}`
        : `slot ${slotNumber} · reserved server lane`,
    };
  });
}

function preferLiveCandidate(current, next) {
  if (!current) return next;
  if (current.queued && !next.queued) return next;
  if (current.sim_slot == null && next.sim_slot != null) return next;
  return current;
}

export default function PlayerStatsTab() {
  const [profiles, setProfiles] = useState([]);
  const [livePlayers, setLivePlayers] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [detailProfile, setDetailProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [detailError, setDetailError] = useState('');
  const [pageVisible, setPageVisible] = useState(false);
  const detailCacheRef = useRef(new Map());
  const selectedKeyRef = useRef(null);

  async function fetchProfiles({ silent = false } = {}) {
    if (!silent) setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/players');
      if (!response.ok) throw new Error(`PLAYER PROFILE SCAN FAILED (${response.status})`);
      const payload = await response.json();
      const items = Array.isArray(payload.players) ? payload.players.map(normaliseProfile) : [];
      startTransition(() => setProfiles(items));
    } catch (fetchError) {
      setError(fetchError.message || 'PLAYER PROFILE SCAN FAILED');
    } finally {
      setLoading(false);
    }
  }

  async function fetchLiveState() {
    try {
      const response = await fetch('/api/state');
      if (!response.ok) throw new Error(`LIVE STATE FETCH FAILED (${response.status})`);
      const payload = await response.json();
      const items = Array.isArray(payload.players) ? payload.players.slice() : [];
      startTransition(() => setLivePlayers(items));
    } catch (_fetchError) {
      // Preserve the last good live snapshot if this refresh fails.
    }
  }

  async function fetchPlayerDetail(playerKey) {
    selectedKeyRef.current = playerKey;
    setDetailLoading(true);
    setDetailError('');
    try {
      const response = await fetch(`/api/players/${encodeURIComponent(playerKey)}`);
      if (!response.ok) throw new Error(`MATCH HISTORY FETCH FAILED (${response.status})`);
      const payload = await response.json();
      const nextProfile = payload.profile ? normaliseProfile(payload.profile) : null;
      const nextMatches = Array.isArray(payload.matches) ? payload.matches.map(normaliseMatch) : [];
      detailCacheRef.current.set(playerKey, { profile: nextProfile, matches: nextMatches });
      if (selectedKeyRef.current !== playerKey) return;
      setDetailProfile(nextProfile);
      setMatchHistory(nextMatches);
    } catch (fetchError) {
      if (selectedKeyRef.current !== playerKey) return;
      setDetailError(fetchError.message || 'MATCH HISTORY FETCH FAILED');
      setMatchHistory([]);
    } finally {
      if (selectedKeyRef.current === playerKey) {
        setDetailLoading(false);
      }
    }
  }

  function togglePlayer(playerKey) {
    if (selectedKey === playerKey) {
      selectedKeyRef.current = null;
      setSelectedKey(null);
      setDetailProfile(null);
      setMatchHistory([]);
      setDetailError('');
      setDetailLoading(false);
      return;
    }

    setSelectedKey(playerKey);
    setDetailError('');
    const cached = detailCacheRef.current.get(playerKey);
    if (cached) {
      selectedKeyRef.current = playerKey;
      setDetailProfile(cached.profile);
      setMatchHistory(cached.matches);
      setDetailLoading(false);
      return;
    }

    setDetailProfile(null);
    setMatchHistory([]);
    fetchPlayerDetail(playerKey);
  }

  useEffect(() => {
    fetchProfiles();
    fetchLiveState();

    const section = document.getElementById('page-players');
    if (!section) return () => {};
    setPageVisible(!section.hidden);

    const observer = new MutationObserver(() => {
      const visible = !section.hidden;
      setPageVisible(visible);
      if (visible) {
        fetchProfiles({ silent: true });
        fetchLiveState();
      }
    });
    observer.observe(section, { attributes: true, attributeFilter: ['hidden'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pageVisible) return () => {};
    fetchLiveState();
    const syncLivePlayers = (state = window.latestState) => {
      const snapshot = Array.isArray(state?.players) ? state.players.slice() : [];
      startTransition(() => setLivePlayers(snapshot));
    };
    const handleState = (event) => {
      syncLivePlayers(event.detail);
    };
    const intervalId = window.setInterval(() => {
      fetchLiveState();
    }, 2000);

    syncLivePlayers();
    window.addEventListener(MONITOR_STATE_EVENT, handleState);
    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(MONITOR_STATE_EVENT, handleState);
    };
  }, [pageVisible]);

  const liveByProfileKey = new Map();
  const liveByUsername = new Map();
  const liveByDisplayName = new Map();
  const liveByControllerKey = new Map();
  const liveBySimSlot = new Map();
  livePlayers.forEach((player) => {
    if (isGhostPlayer(player)) return;
    const profileKey = normaliseIdentityText(player.profile_key);
    const username = normaliseIdentityText(player.username);
    const displayName = normaliseIdentityText(player.display_name);
    const controllerKey = normaliseIdentityText(player.controller_key);
    const simSlot = simSlotForValue(player.sim_slot);

    if (profileKey) liveByProfileKey.set(profileKey, preferLiveCandidate(liveByProfileKey.get(profileKey), player));
    if (username) liveByUsername.set(username, preferLiveCandidate(liveByUsername.get(username), player));
    if (displayName) liveByDisplayName.set(displayName, preferLiveCandidate(liveByDisplayName.get(displayName), player));
    if (controllerKey) liveByControllerKey.set(controllerKey, preferLiveCandidate(liveByControllerKey.get(controllerKey), player));
    if (simSlot !== null) liveBySimSlot.set(simSlot, preferLiveCandidate(liveBySimSlot.get(simSlot), player));
  });

  const ghosts = livePlayers
    .filter((player) => isGhostPlayer(player))
    .sort((left, right) => (
      asNumber(left.id, 999) - asNumber(right.id, 999)
      || String(left.display_name || left.username || left.entity_key || '')
        .localeCompare(String(right.display_name || right.username || right.entity_key || ''))
    ));

  const enrichedProfiles = profiles
    .map((profile) => {
      const profileKey = normaliseIdentityText(profile.player_key);
      const username = normaliseIdentityText(profile.username);
      const displayName = normaliseIdentityText(profile.display_name);
      const controllerKey = normaliseIdentityText(profile.controller_key);
      const inferredSimSlot = inferSimSlotFromProfile(profile);
      const canMatchByControllerKey = profile.identity_source === 'controller';
      const live = liveByProfileKey.get(profileKey)
        || liveByUsername.get(username)
        || liveByDisplayName.get(displayName)
        || (canMatchByControllerKey ? liveByControllerKey.get(controllerKey) : null)
        || (inferredSimSlot !== null ? liveBySimSlot.get(inferredSimSlot) : null)
        || null;
      return {
        ...profile,
        live,
        currentRole: currentRoleForPlayer(live),
        isOnline: Boolean(live),
        isInMatch: Boolean(live && !live.queued),
        isQueued: Boolean(live?.queued),
      };
    })
    .sort((left, right) => (
      Number(right.isOnline) - Number(left.isOnline)
      || Number(right.isInMatch) - Number(left.isInMatch)
      || String(right.last_seen_at).localeCompare(String(left.last_seen_at))
    ));

  const totals = enrichedProfiles.reduce((acc, profile) => {
    acc.totalWins += profile.total_wins;
    acc.totalBits += profile.total_bits_collected;
    acc.onlinePlayers += profile.isOnline ? 1 : 0;
    acc.livePlayers += profile.isInMatch ? 1 : 0;
    acc.queuedPlayers += profile.isQueued ? 1 : 0;
    return acc;
  }, { totalWins: 0, totalBits: 0, onlinePlayers: 0, livePlayers: 0, queuedPlayers: 0 });

  const visibleProfiles = enrichedProfiles.slice(0, MAX_VISIBLE_PROFILES);
  const hiddenProfileCount = Math.max(0, enrichedProfiles.length - visibleProfiles.length);
  const ghostSlots = buildGhostSlots(ghosts);
  const hiddenGhostCount = Math.max(0, ghosts.length - ghostSlots.filter((slot) => slot.ghost).length);

  return (
    <div className="player-stats-shell">
      <div className="player-stats-overview">
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Registered Humans</div>
          <div className="player-overview-value">{profiles.length}</div>
          <div className="hud-sub">career profiles in DynamoDB</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Online Humans</div>
          <div className="player-overview-value">{totals.onlinePlayers}</div>
          <div className="hud-sub">{`${totals.livePlayers} in match · ${totals.queuedPlayers} lobby`}</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Career Wins</div>
          <div className="player-overview-value">{totals.totalWins}</div>
          <div className="hud-sub">all recorded matches</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Bits Banked</div>
          <div className="player-overview-value">{totals.totalBits}</div>
          <div className="hud-sub">summed from player profiles</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Live Ghosts</div>
          <div className="player-overview-value">{ghosts.length}</div>
          <div className="hud-sub">websocket-only entities</div>
        </div>
        <div className="panel-raised player-overview-card player-overview-action">
          <div className="hud-label">Database Scan</div>
          <button className="control-btn start" type="button" onClick={() => fetchProfiles()}>
            Refresh Profiles
          </button>
          <div className="hud-sub">re-pulls career aggregates</div>
        </div>
      </div>

      {loading ? (
        <div className="panel-raised player-status-panel">
          <div className="player-detail-status">
            <span className="player-spinner" />
            <span>SCANNING PLAYER DATABASE...</span>
          </div>
        </div>
      ) : null}

      {!loading && error ? (
        <div className="panel-raised player-status-panel">
          <div className="player-detail-status error">{error}</div>
          <button className="control-btn restart" type="button" onClick={() => fetchProfiles()}>
            Retry Scan
          </button>
        </div>
      ) : null}

      {!loading && !error && !enrichedProfiles.length ? (
        <div className="panel-raised player-status-panel">
          <div className="player-detail-status">NO PLAYERS RECORDED YET.</div>
        </div>
      ) : null}

      {!loading && !error && enrichedProfiles.length ? (
        <>
          {hiddenProfileCount ? (
            <div className="panel-raised player-status-panel">
              <div className="player-detail-status">
                SHOWING {visibleProfiles.length} MOST RECENT HUMAN PROFILES. {hiddenProfileCount} OLDER
                PLAYER{hiddenProfileCount === 1 ? '' : 'S'} HIDDEN TO KEEP THE PANEL CLEAR.
              </div>
            </div>
          ) : null}
          <div className="player-stats-grid">
            {visibleProfiles.map((player) => {
            const selected = selectedKey === player.player_key;
            const detailMatches = selected ? matchHistory : [];
            const displayProfile = selected && detailProfile?.player_key === player.player_key ? detailProfile : player;

            return (
              <HumanPlayerCard
                key={player.player_key}
                player={player}
                pageVisible={pageVisible}
                selected={selected}
                detailMatches={detailMatches}
                displayProfile={displayProfile}
                detailLoading={detailLoading}
                detailError={detailError}
                onToggle={togglePlayer}
              />
            );
            })}
          </div>
        </>
      ) : null}

      <div className="panel-raised entity-section-panel">
        <div className="panel-head">
          <div>
            <div className="panel-head-note">server-side live entities</div>
            <h2>Server Entities</h2>
          </div>
          <span className="micro-chip">{`${Math.min(ghosts.length, 3)}/3 ghost lanes active`}</span>
        </div>
        <div className="metric-note entity-section-note">
          Ghosts are live websocket-only server actors today. These three lanes stay reserved so we can add future
          server-side traits and non-human entity types without mixing them into the human career cards.
        </div>
        <div className="entity-stats-grid">
          {ghostSlots.map((slot) => (
            <ServerEntityCard key={slot.key} slot={slot} pageVisible={pageVisible} />
          ))}
        </div>
        {hiddenGhostCount ? (
          <div className="metric-note entity-section-note">
            {hiddenGhostCount} additional live ghost{hiddenGhostCount === 1 ? '' : 's'} exist beyond the visible
            three-slot entity bank.
          </div>
        ) : null}
      </div>
    </div>
  );
}
