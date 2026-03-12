import React from 'react';

export default function MapToolbar({
  mapName,
  seed,
  tool,
  canUndo,
  saving,
  validation,
  activeMapId,
  loadedMap,
  draftDirty,
  onMapNameChange,
  onSeedChange,
  onToolChange,
  onGenerateTemplate,
  onRandomTemplate,
  onApplyBorder,
  onClear,
  onUndo,
  onImport,
  onDownloadGrid,
  onDownloadRuntime,
  onDownloadJson,
  onCopyBram,
  onSaveDraft,
  onPushLive,
}) {
  return (
    <div className="map-editor-toolbar panel-raised">
      <div className="panel-head">
        <h2>Arena Draft</h2>
        <span className="micro-chip">{draftDirty ? 'unsaved edits' : 'clean'}</span>
      </div>
      <div className="map-editor-toolbar-body">
        <label className="map-editor-field">
          <span className="map-editor-label">Map Name</span>
          <input
            className="map-editor-input"
            type="text"
            value={mapName}
            onChange={(event) => onMapNameChange(event.target.value)}
            spellCheck="false"
            placeholder="custom_arena_001"
          />
        </label>

        <div className="map-editor-field-row">
          <label className="map-editor-field">
            <span className="map-editor-label">Template Seed</span>
            <input
              className="map-editor-input"
              type="number"
              value={seed}
              onChange={(event) => onSeedChange(event.target.value)}
              spellCheck="false"
            />
          </label>
          <div className="map-editor-button-stack compact">
            <button className="control-btn start" type="button" onClick={onGenerateTemplate}>Generate</button>
            <button className="control-btn restart" type="button" onClick={onRandomTemplate}>Random</button>
          </div>
        </div>

        <div className="map-editor-field">
          <span className="map-editor-label">Tools</span>
          <div className="map-editor-tool-row">
            <button
              className={`control-btn${tool === 'draw' ? ' start' : ''}`}
              type="button"
              onClick={() => onToolChange('draw')}
            >
              Brush
            </button>
            <button
              className={`control-btn${tool === 'fill' ? ' start' : ''}`}
              type="button"
              onClick={() => onToolChange('fill')}
            >
              Fill
            </button>
            <button
              className={`control-btn${tool === 'spawn' ? ' start' : ''}`}
              type="button"
              onClick={() => onToolChange('spawn')}
            >
              Spawns
            </button>
          </div>
          <div className="metric-note">
            Brush uses left-drag for walls and right-drag for erase. Spawns place P1 then P2 on empty tiles only.
          </div>
        </div>

        <div className="map-editor-button-stack">
          <button className="control-btn" type="button" onClick={onApplyBorder}>Border</button>
          <button className="control-btn stop" type="button" onClick={onClear}>Clear</button>
          <button className="control-btn restart" type="button" onClick={onUndo} disabled={!canUndo}>Undo</button>
        </div>

        <div className="map-editor-button-stack">
          <button className="control-btn" type="button" onClick={onImport}>Import File</button>
          <button className="control-btn" type="button" onClick={onDownloadGrid}>Download Grid TXT</button>
          <button className="control-btn" type="button" onClick={onDownloadRuntime}>Download Runtime TXT</button>
          <button className="control-btn" type="button" onClick={onDownloadJson}>Download JSON</button>
          <button className="control-btn" type="button" onClick={onCopyBram}>Copy BRAM Python</button>
        </div>

        <div className="map-editor-save-row">
          <button className="control-btn restart" type="button" onClick={onSaveDraft} disabled={saving}>
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button className="control-btn start" type="button" onClick={onPushLive} disabled={saving}>
            {saving ? 'Saving...' : 'Save + Push Live'}
          </button>
        </div>

        <div className="map-editor-status-grid">
          <div className="panel-inset">
            <span className="map-editor-stat-label">Loaded Draft</span>
            <span>{loadedMap?.map_id || 'new unsaved draft'}</span>
          </div>
          <div className="panel-inset">
            <span className="map-editor-stat-label">Live Map</span>
            <span>{activeMapId || 'unknown'}</span>
          </div>
          <div className="panel-inset">
            <span className="map-editor-stat-label">Push Ready</span>
            <span>{validation.canPush ? 'yes' : 'no'}</span>
          </div>
        </div>

        <div className={`map-editor-validation ${validation.canPush ? 'ready' : 'blocked'}`}>
          {validation.message}
        </div>
      </div>
    </div>
  );
}
