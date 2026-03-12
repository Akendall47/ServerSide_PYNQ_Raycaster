import React from 'react';
import PlayerDetail from './PlayerDetail.jsx';
import PlayerTrophy from './PlayerTrophy.jsx';
import {
  asNumber,
  formatAngle,
  formatCoordinate,
  formatPercent,
  formatTimestamp,
  roleLabel,
} from './utils.js';

export default function HumanPlayerCard({
  player,
  pageVisible,
  selected,
  detailMatches,
  displayProfile,
  detailLoading,
  detailError,
  onToggle,
}) {
  const totalMatches = player.match_count;
  const liveStatus = player.isQueued ? 'queued' : player.isOnline ? 'online' : 'offline';

  return (
    <article className={`panel-raised player-stat-card${selected ? ' expanded' : ''}`}>
      <button className="player-card-head" type="button" onClick={() => onToggle(player.player_key)}>
        <div>
          <div className="player-card-title">{player.display_name}</div>
          <div className="player-card-subtitle">{player.player_key}</div>
        </div>
        <span className={`player-live-pill ${liveStatus}`}>
          {player.isQueued ? 'lobby' : player.isInMatch ? `${roleLabel(player.currentRole)} live` : player.isOnline ? 'online' : 'offline'}
        </span>
      </button>

      <div className="player-card-summary">
        <PlayerTrophy player={player} pageVisible={pageVisible} animated={player.isOnline || selected} />

        <div className="player-card-metrics">
          <div className="metric-row"><span>career win rate</span><span>{formatPercent(player.total_wins, totalMatches)}</span></div>
          <div className="metric-row"><span>runner record</span><span>{player.wins_as_runner}/{player.matches_as_runner}</span></div>
          <div className="metric-row"><span>tagger record</span><span>{player.wins_as_tagger}/{player.matches_as_tagger}</span></div>
          <div className="metric-row"><span>tags landed</span><span>{player.total_tags_landed}</span></div>
          <div className="metric-row"><span>times tagged</span><span>{player.times_tagged}</span></div>
          <div className="metric-row"><span>bits collected</span><span>{player.total_bits_collected}</span></div>
          <div className="metric-row"><span>first seen</span><span>{formatTimestamp(displayProfile.first_seen_at)}</span></div>
          <div className="metric-row"><span>last seen</span><span>{formatTimestamp(displayProfile.last_seen_at)}</span></div>
          <div className="metric-note">
            {player.isInMatch && player.live
              ? `Live @ (${formatCoordinate(asNumber(player.live.x))}, ${formatCoordinate(asNumber(player.live.y))}) · ${formatAngle(asNumber(player.live.angle))}`
              : player.isQueued
                ? 'Connected in lobby · waiting for match start.'
                : player.isOnline
                  ? 'Connected via websocket feed.'
                  : 'No live websocket position for this player right now.'}
          </div>
        </div>
      </div>

      <div className="player-card-footer">
        <div className="micro-chip">{totalMatches} matches</div>
        <div className="micro-chip">{player.username || player.controller_key || 'anonymous controller'}</div>
        <div className="micro-chip">{displayProfile.identity_source || 'unknown identity source'}</div>
      </div>

      {selected ? <PlayerDetail matches={detailMatches} loading={detailLoading} error={detailError} /> : null}
    </article>
  );
}
