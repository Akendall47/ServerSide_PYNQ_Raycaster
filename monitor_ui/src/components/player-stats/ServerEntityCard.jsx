import React, { useEffect, useState } from 'react';
import PlayerTrophy from './PlayerTrophy.jsx';
import {
  asNumber,
  formatAngle,
  formatCoordinate,
  formatFlags,
} from './utils.js';

function formatTraitNumber(value, digits = 2) {
  return asNumber(value, 0).toFixed(digits);
}

async function postControl(command) {
  const response = await fetch('/api/control', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `request failed (${response.status})`);
  }
  return response.json();
}

export default function ServerEntityCard({ slot, pageVisible, onProfileSaved }) {
  const [speedDraft, setSpeedDraft] = useState(formatTraitNumber(slot.profile?.speed, 2));
  const [tagRadiusDraft, setTagRadiusDraft] = useState(formatTraitNumber(slot.profile?.tag_radius, 1));
  const [saving, setSaving] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [statusKind, setStatusKind] = useState('');

  useEffect(() => {
    setSpeedDraft(formatTraitNumber(slot.profile?.speed, 2));
    setTagRadiusDraft(formatTraitNumber(slot.profile?.tag_radius, 1));
    setStatusText('');
    setStatusKind('');
  }, [slot.slotNumber, slot.profile?.speed, slot.profile?.tag_radius]);

  const traitsDirty = (
    Math.abs(asNumber(speedDraft, slot.profile?.speed) - asNumber(slot.profile?.speed, 0)) > 0.0001
    || Math.abs(asNumber(tagRadiusDraft, slot.profile?.tag_radius) - asNumber(slot.profile?.tag_radius, 0)) > 0.0001
  );

  async function saveTraits(nextSpeed = speedDraft, nextTagRadius = tagRadiusDraft) {
    setSaving(true);
    setStatusKind('');
    setStatusText('');
    try {
      const speed = asNumber(nextSpeed, slot.profile?.speed);
      const tagRadius = asNumber(nextTagRadius, slot.profile?.tag_radius);
      const payload = await postControl({
        cmd: 'set_ghost_profile',
        slot: slot.slotNumber,
        speed,
        tag_radius: tagRadius,
      });
      onProfileSaved?.({
        slot: slot.slotNumber,
        speed,
        tag_radius: tagRadius,
      });
      setSpeedDraft(formatTraitNumber(speed, 2));
      setTagRadiusDraft(formatTraitNumber(tagRadius, 1));
      setStatusKind('success');
      setStatusText(payload.message || `Ghost ${slot.slotNumber} traits updated.`);
    } catch (error) {
      setStatusKind('error');
      setStatusText(error.message || 'Failed to update ghost traits.');
    } finally {
      setSaving(false);
    }
  }

  function resetTraitsToDefault() {
    const defaultSpeed = formatTraitNumber(slot.defaultProfile?.speed, 2);
    const defaultTagRadius = formatTraitNumber(slot.defaultProfile?.tag_radius, 1);
    setSpeedDraft(defaultSpeed);
    setTagRadiusDraft(defaultTagRadius);
    saveTraits(defaultSpeed, defaultTagRadius);
  }

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
          <div className="metric-row"><span>trait bank</span><span>{slot.ghost ? 'ghost core' : 'saved standby traits'}</span></div>
          <div className="metric-row"><span>move speed</span><span>{formatTraitNumber(slot.profile?.speed, 2)}</span></div>
          <div className="metric-row"><span>tag radius</span><span>{formatTraitNumber(slot.profile?.tag_radius, 1)}</span></div>
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
              : 'No live ghost is occupying this lane right now, but the saved traits below will apply on the next spawn.'}
          </div>
          <div className="entity-trait-editor">
            <div className="entity-trait-grid">
              <label className="entity-trait-field">
                <span>Speed</span>
                <input
                  type="number"
                  min="0.02"
                  max="1.00"
                  step="0.01"
                  value={speedDraft}
                  onChange={(event) => setSpeedDraft(event.target.value)}
                  disabled={saving}
                />
              </label>
              <label className="entity-trait-field">
                <span>Tag Radius</span>
                <input
                  type="number"
                  min="2"
                  max="64"
                  step="0.5"
                  value={tagRadiusDraft}
                  onChange={(event) => setTagRadiusDraft(event.target.value)}
                  disabled={saving}
                />
              </label>
            </div>
            <div className="entity-trait-actions">
              <button
                className="control-btn start"
                type="button"
                onClick={() => saveTraits()}
                disabled={saving || !traitsDirty}
              >
                {saving ? 'Saving...' : 'Save Traits'}
              </button>
              <button
                className="control-btn restart"
                type="button"
                onClick={resetTraitsToDefault}
                disabled={saving}
              >
                Reset Default
              </button>
            </div>
            {statusText ? (
              <div className={`entity-trait-status ${statusKind || 'info'}`}>{statusText}</div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="player-card-footer">
        <div className="micro-chip">{slot.ghost ? `ghost ${slot.ghost.id || slot.slotNumber}` : 'open slot'}</div>
        <div className="micro-chip">{slot.ghost ? 'websocket live' : 'server profile standby'}</div>
        <div className="micro-chip">server trait profile</div>
      </div>
    </article>
  );
}
