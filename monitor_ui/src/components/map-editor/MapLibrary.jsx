import React from 'react';
import { formatMapTimestamp } from './utils.js';

function MapCard({ entry, activeMapId, selectedMapId, deletingId, onLoadToEditor, onApplyMap, onDeleteMap }) {
  const isActive = entry.map_id === activeMapId;
  const isSelected = entry.map_id === selectedMapId;

  return (
    <article className="panel-inset map-library-card">
      <div className="map-library-head">
        <div>
          <div className="map-library-title-row">
            <h3>{entry.map_name}</h3>
            <span className={`micro-chip ${entry.source === 'editor' ? 'editor' : ''}`}>
              {entry.source === 'editor' ? 'editor' : 'system'}
            </span>
          </div>
          <div className="map-library-subtitle">{entry.map_id}</div>
        </div>
        <div className="map-library-badges">
          {isActive ? <span className="micro-chip active">live</span> : null}
          {!isActive && isSelected ? <span className="micro-chip">selected</span> : null}
        </div>
      </div>

      <div className="metric-row"><span>walls</span><span>{entry.wall_count}</span></div>
      <div className="metric-row"><span>open cells</span><span>{entry.open_count}</span></div>
      <div className="metric-row"><span>spawns</span><span>{entry.spawns.length}</span></div>
      <div className="metric-row"><span>markers</span><span>{entry.marker_count}</span></div>
      <div className="metric-row"><span>modes</span><span>{entry.supported_modes.join(', ')}</span></div>
      <div className="metric-note">updated {formatMapTimestamp(entry.updated_at || entry.created_at)}</div>
      {entry.notes ? <div className="metric-note">{entry.notes}</div> : null}

      <div className="map-library-actions">
        <button className="control-btn" type="button" onClick={() => onLoadToEditor(entry.map_id)}>Load</button>
        <button className="control-btn start" type="button" onClick={() => onApplyMap(entry.map_id)}>Push Live</button>
        <button
          className="control-btn stop"
          type="button"
          disabled={!entry.deletable || deletingId === entry.map_id}
          onClick={() => onDeleteMap(entry)}
        >
          {deletingId === entry.map_id ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </article>
  );
}

export default function MapLibrary({
  entries,
  activeMapId,
  selectedMapId,
  deletingId,
  loading,
  onLoadToEditor,
  onApplyMap,
  onDeleteMap,
}) {
  if (loading) {
    return (
      <div className="panel-raised map-library-panel scroll-panel">
        <div className="panel-head">
          <h2>Saved Maps</h2>
          <span className="micro-chip">loading</span>
        </div>
        <div className="scroll-panel-body">
          <div className="metric-note">scanning runtime map catalog...</div>
        </div>
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="panel-raised map-library-panel scroll-panel">
        <div className="panel-head">
          <h2>Saved Maps</h2>
          <span className="micro-chip">empty</span>
        </div>
        <div className="scroll-panel-body">
          <div className="metric-note">no runtime-safe maps have been saved yet.</div>
        </div>
      </div>
    );
  }

  const editorMaps = entries.filter((entry) => entry.source === 'editor');
  const systemMaps = entries.filter((entry) => entry.source !== 'editor');
  const sections = [
    { title: 'Editor Drafts', rows: editorMaps, chip: `${editorMaps.length}` },
    { title: 'System Maps', rows: systemMaps, chip: `${systemMaps.length}` },
  ].filter((section) => section.rows.length);

  return (
    <div className="panel-raised map-library-panel scroll-panel">
      <div className="panel-head">
        <h2>Saved Maps</h2>
        <span className="micro-chip">{entries.length} total</span>
      </div>
      <div className="scroll-panel-body">
        <div className="metric-note">
          Editor drafts are deletable sidecar-backed maps. System maps stay protected so the monitor cannot delete the shipped runtime set.
        </div>
        <div className="map-library-section-stack">
          {sections.map((section) => (
            <section key={section.title} className="map-library-section">
              <div className="panel-head">
                <h3>{section.title}</h3>
                <span className="micro-chip">{section.chip}</span>
              </div>
              <div className="map-library-grid">
                {section.rows.map((entry) => (
                  <MapCard
                    key={entry.map_id}
                    entry={entry}
                    activeMapId={activeMapId}
                    selectedMapId={selectedMapId}
                    deletingId={deletingId}
                    onLoadToEditor={onLoadToEditor}
                    onApplyMap={onApplyMap}
                    onDeleteMap={onDeleteMap}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
