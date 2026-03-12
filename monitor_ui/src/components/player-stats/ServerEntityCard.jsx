import React from 'react';
import PlayerTrophy from './PlayerTrophy.jsx';
import {
  asNumber,
  formatAngle,
  formatCoordinate,
  formatFlags,
} from './utils.js';

export default function ServerEntityCard({ slot, pageVisible }) {
  return (
    <article className={`panel-inset entity-stat-card${slot.ghost ? '' : ' is-empty'}`}>
      <div className="player-card-head entity-card-head">
        <div>
          <div className="player-card-title">{slot.displayName}</div>
          <div className="player-card-subtitle">{slot.subtitle}</div>
        </div>
        <span className={`player-live-pill ${slot.ghost ? 'online' : 'offline'}`}>
          {slot.ghost ? 'live ghost' : 'standby'}
        </span>
      </div>

      <div className="player-card-summary">
        <PlayerTrophy player={slot.trophyPlayer} pageVisible={pageVisible} animated={Boolean(slot.ghost)} />

        <div className="player-card-metrics">
          <div className="metric-row"><span>entity slot</span><span>{slot.slotNumber}/3</span></div>
          <div className="metric-row"><span>entity type</span><span>{slot.ghost ? 'ghost' : 'reserved'}</span></div>
          <div className="metric-row"><span>live status</span><span>{slot.ghost ? 'online' : 'offline'}</span></div>
          <div className="metric-row"><span>trait bank</span><span>{slot.ghost ? 'ghost core' : 'future trait hook'}</span></div>
          <div className="metric-row">
            <span>position</span>
            <span>
              {slot.ghost
                ? `${formatCoordinate(asNumber(slot.ghost.x))}, ${formatCoordinate(asNumber(slot.ghost.y))}`
                : '—'}
            </span>
          </div>
          <div className="metric-row">
            <span>heading</span>
            <span>{slot.ghost ? formatAngle(asNumber(slot.ghost.angle)) : '—'}</span>
          </div>
          <div className="metric-row">
            <span>entity flags</span>
            <span>{slot.ghost ? formatFlags(asNumber(slot.ghost.flags)) : '—'}</span>
          </div>
          <div className="metric-note">
            {slot.ghost
              ? `Live ghost tracked at (${formatCoordinate(asNumber(slot.ghost.x))}, ${formatCoordinate(asNumber(slot.ghost.y))}) with heading ${formatAngle(asNumber(slot.ghost.angle))}.`
              : 'Waiting for a live ghost or future server-side entity to claim this lane.'}
          </div>
        </div>
      </div>

      <div className="player-card-footer">
        <div className="micro-chip">{slot.ghost ? `ghost ${slot.ghost.id || slot.slotNumber}` : 'open slot'}</div>
        <div className="micro-chip">{slot.ghost ? 'websocket live' : 'server entity reserve'}</div>
        <div className="micro-chip">{slot.ghost ? 'trait slot reserved' : 'future ai trait hook'}</div>
      </div>
    </article>
  );
}
