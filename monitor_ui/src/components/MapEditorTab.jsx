import React, { startTransition, useEffect, useRef, useState } from 'react';
import MapCanvas from './map-editor/MapCanvas.jsx';
import MapLibrary from './map-editor/MapLibrary.jsx';
import MapToolbar from './map-editor/MapToolbar.jsx';
import {
  DEFAULT_MAP_NAME,
  DEFAULT_SEED,
  GRID_CELLS,
  MAX_UNDO,
  applyBorderToGrid,
  buildBramSnippet,
  copyGrid,
  createEmptyGrid,
  createSnapshot,
  downloadText,
  fileSafeName,
  generateTemplate,
  hasSolidBorder,
  normaliseMapEntry,
  parseImportedMapText,
  sanitiseDraft,
  serialiseEditorJson,
  serialiseGridText,
  serialiseRuntimeText,
} from './map-editor/utils.js';

const MONITOR_STATE_EVENT = 'monitor:state';

function describeValidation(grid, spawns, markers) {
  if (!hasSolidBorder(grid)) {
    return {
      canPush: false,
      message: 'Hardware-safe maps need a solid wall border. Use Border or close the outer ring manually.',
    };
  }
  if (spawns.length < 2) {
    return {
      canPush: false,
      message: 'Push Live is blocked until both player spawn points are placed.',
    };
  }
  if (markers.length) {
    return {
      canPush: true,
      message: `Ready. ${markers.length} bit marker${markers.length === 1 ? '' : 's'} will be preserved on save.`,
    };
  }
  return {
    canPush: true,
    message: 'Ready. Save Draft stores the map; Save + Push Live writes it and hot-swaps the active runtime map.',
  };
}

async function fetchJson(path, options) {
  const response = await fetch(path, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `request failed (${response.status})`);
  }
  return response.json();
}

function sortEntries(entries, activeMapId) {
  return entries.slice().sort((left, right) => (
    Number(right.map_id === activeMapId) - Number(left.map_id === activeMapId)
    || Number(right.source === 'editor') - Number(left.source === 'editor')
    || String(right.updated_at || right.created_at).localeCompare(String(left.updated_at || left.created_at))
  ));
}

async function copyTextToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);

  const selection = document.getSelection();
  const previousRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (selection) {
    selection.removeAllRanges();
    if (previousRange) selection.addRange(previousRange);
  }

  if (!copied) {
    throw new Error('clipboard API unavailable');
  }
}

export default function MapEditorTab() {
  const gridRef = useRef(applyBorderToGrid(createEmptyGrid()));
  const undoStackRef = useRef([]);
  const fileInputRef = useRef(null);
  const [spawns, setSpawns] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [mapName, setMapName] = useState(DEFAULT_MAP_NAME);
  const [seed, setSeed] = useState(DEFAULT_SEED);
  const [tool, setTool] = useState('draw');
  const [revision, setRevision] = useState(0);
  const [draftDirty, setDraftDirty] = useState(false);
  const [loadedMap, setLoadedMap] = useState(null);
  const [entries, setEntries] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [pageVisible, setPageVisible] = useState(false);
  const [activeMapId, setActiveMapId] = useState('');
  const [selectedMapId, setSelectedMapId] = useState('');
  const [notice, setNotice] = useState({ kind: 'info', text: 'Binary grid editor online. Brush on the canvas or load an existing arena.' });

  function pushUndo() {
    undoStackRef.current.push(createSnapshot(gridRef.current, spawns, markers));
    if (undoStackRef.current.length > MAX_UNDO) {
      undoStackRef.current.shift();
    }
  }

  function applyDraft(nextGrid, nextSpawns = spawns, nextMarkers = markers, options = {}) {
    const { markDirty = true, nextLoadedMap = loadedMap, nextMapName = mapName } = options;
    const { spawns: safeSpawns, markers: safeMarkers } = sanitiseDraft(nextGrid, nextSpawns, nextMarkers);
    gridRef.current = nextGrid;
    setSpawns(safeSpawns);
    setMarkers(safeMarkers);
    setMapName(nextMapName);
    setLoadedMap(nextLoadedMap);
    setRevision((value) => value + 1);
    if (markDirty) setDraftDirty(true);
  }

  async function refreshCatalog({ silent = false } = {}) {
    if (!silent) setCatalogLoading(true);
    try {
      const payload = await fetchJson('/api/maps');
      const nextEntries = Array.isArray(payload.entries)
        ? payload.entries.map(normaliseMapEntry)
        : [];
      startTransition(() => setEntries(sortEntries(nextEntries, payload.active_map || activeMapId)));
      setActiveMapId(String(payload.active_map || ''));
      setSelectedMapId(String(payload.selected_map || payload.active_map || ''));
    } catch (error) {
      setNotice({ kind: 'error', text: `Map catalog refresh failed: ${error.message}` });
    } finally {
      setCatalogLoading(false);
    }
  }

  async function loadIntoEditor(mapId) {
    try {
      const payload = await fetchJson(`/api/map/${encodeURIComponent(mapId)}`);
      const nextGrid = Uint8Array.from(payload.grid || []);
      if (nextGrid.length !== GRID_CELLS) {
        throw new Error('server returned an invalid grid');
      }
      applyDraft(nextGrid, payload.spawns || [], payload.markers || [], {
        markDirty: false,
        nextLoadedMap: normaliseMapEntry(payload),
        nextMapName: payload.map_name || payload.map_id || mapId,
      });
      undoStackRef.current = [];
      setDraftDirty(false);
      setTool('draw');
      setNotice({ kind: 'info', text: `Loaded '${payload.map_id}' into the editor.` });
    } catch (error) {
      setNotice({ kind: 'error', text: `Map load failed: ${error.message}` });
    }
  }

  async function applyExistingMap(mapId) {
    try {
      const payload = await fetchJson('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cmd: `set_map:${mapId}` }),
      });
      setActiveMapId(mapId);
      setSelectedMapId(mapId);
      setNotice({ kind: 'success', text: payload.message || `Map '${mapId}' pushed live.` });
      refreshCatalog({ silent: true });
      window.requestMapListRefresh?.(0);
    } catch (error) {
      setNotice({ kind: 'error', text: `Push live failed: ${error.message}` });
    }
  }

  async function persistDraft(apply) {
    const validation = describeValidation(gridRef.current, spawns, markers);
    if (apply && !validation.canPush) {
      setNotice({ kind: 'error', text: validation.message });
      return;
    }

    setSaving(true);
    try {
      const requestedId = fileSafeName(mapName);
      const updateExistingEditor = loadedMap?.source === 'editor' && loadedMap.map_id === requestedId;
      const payload = await fetchJson('/api/maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          map_name: mapName,
          map_id: updateExistingEditor ? loadedMap.map_id : undefined,
          grid: Array.from(gridRef.current),
          spawns,
          markers,
          apply,
        }),
      });
      const savedMap = normaliseMapEntry(payload.map || {});
      setLoadedMap(savedMap);
      setMapName(payload.map?.map_name || mapName);
      setDraftDirty(false);
      setNotice({ kind: 'success', text: payload.message || `Saved '${savedMap.map_id}'.` });
      if (apply) {
        setActiveMapId(savedMap.map_id);
        setSelectedMapId(savedMap.map_id);
      }
      window.invalidateMonitorMapCache?.(savedMap.map_id);
      await refreshCatalog({ silent: true });
      window.requestMapListRefresh?.(0);
    } catch (error) {
      setNotice({ kind: 'error', text: `Map save failed: ${error.message}` });
    } finally {
      setSaving(false);
    }
  }

  async function deleteMap(entry) {
    if (!entry?.map_id) return;
    const confirmed = window.confirm(`Delete '${entry.map_name}' (${entry.map_id})?`);
    if (!confirmed) return;
    setDeletingId(entry.map_id);
    try {
      await fetchJson(`/api/maps/${encodeURIComponent(entry.map_id)}`, { method: 'DELETE' });
      if (loadedMap?.map_id === entry.map_id) {
        setLoadedMap(null);
      }
      setNotice({ kind: 'success', text: `Deleted '${entry.map_id}'.` });
      window.invalidateMonitorMapCache?.(entry.map_id);
      await refreshCatalog({ silent: true });
      window.requestMapListRefresh?.(0);
    } catch (error) {
      setNotice({ kind: 'error', text: `Delete failed: ${error.message}` });
    } finally {
      setDeletingId('');
    }
  }

  useEffect(() => {
    refreshCatalog();

    const section = document.getElementById('page-editor');
    if (!section) return () => {};
    setPageVisible(!section.hidden);
    const observer = new MutationObserver(() => {
      const visible = !section.hidden;
      setPageVisible(visible);
      if (visible) refreshCatalog({ silent: true });
    });
    observer.observe(section, { attributes: true, attributeFilter: ['hidden'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pageVisible) return () => {};
    const syncLiveState = (state = window.latestState) => {
      const activeMap = state?.active_map;
      const selectedMap = state?.selected_map;
      if (activeMap) setActiveMapId(String(activeMap));
      if (selectedMap || activeMap) setSelectedMapId(String(selectedMap || activeMap));
    };
    const handleState = (event) => {
      syncLiveState(event.detail);
    };

    syncLiveState();
    window.addEventListener(MONITOR_STATE_EVENT, handleState);
    return () => window.removeEventListener(MONITOR_STATE_EVENT, handleState);
  }, [pageVisible]);

  const validation = describeValidation(gridRef.current, spawns, markers);

  const overview = {
    wallCount: Array.from(gridRef.current).reduce((sum, value) => sum + value, 0),
    spawnCount: spawns.length,
    markerCount: markers.length,
    activeMap: activeMapId || 'unknown',
  };

  const canUndo = undoStackRef.current.length > 0;

  return (
    <div className="map-editor-shell">
      <input
        ref={fileInputRef}
        className="map-editor-file-input"
        type="file"
        accept=".txt,.json"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          try {
            const payload = parseImportedMapText(await file.text(), file.name.replace(/\.[^.]+$/, '') || DEFAULT_MAP_NAME);
            if (!payload.grid || payload.grid.length !== GRID_CELLS) {
              throw new Error('imported file is not a 32x32 map');
            }
            pushUndo();
            applyDraft(payload.grid, payload.spawns, payload.markers, {
              markDirty: true,
              nextLoadedMap: null,
              nextMapName: payload.mapName || DEFAULT_MAP_NAME,
            });
            setNotice({ kind: 'success', text: `Imported '${file.name}' into the draft editor.` });
          } catch (error) {
            setNotice({ kind: 'error', text: `Import failed: ${error.message}` });
          } finally {
            event.target.value = '';
          }
        }}
      />

      <div className="map-editor-overview">
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Wall Cells</div>
          <div className="player-overview-value">{overview.wallCount}</div>
          <div className="hud-sub">binary walls in the current draft</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Spawn Points</div>
          <div className="player-overview-value">{overview.spawnCount}/2</div>
          <div className="hud-sub">required before push live</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Bit Markers</div>
          <div className="player-overview-value">{overview.markerCount}</div>
          <div className="hud-sub">collectible anchors in the current draft</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Live Map</div>
          <div className="player-overview-value">{overview.activeMap}</div>
          <div className="hud-sub">current server-selected arena</div>
        </div>
      </div>

      <div className={`panel-raised map-editor-notice ${notice.kind}`}>
        {notice.text}
      </div>

      <div className="map-editor-layout">
        <MapCanvas
          gridRef={gridRef}
          spawns={spawns}
          markers={markers}
          tool={tool}
          revision={revision}
          pushUndo={pushUndo}
          onSpawnsChange={setSpawns}
          onMarkersChange={setMarkers}
          onDirty={() => setDraftDirty(true)}
        />

        <div className="map-editor-sidebar">
          <MapToolbar
            mapName={mapName}
            seed={seed}
            tool={tool}
            canUndo={canUndo}
            saving={saving}
            validation={validation}
            activeMapId={activeMapId}
            loadedMap={loadedMap}
            draftDirty={draftDirty}
            onMapNameChange={setMapName}
            onSeedChange={setSeed}
            onToolChange={setTool}
            onGenerateTemplate={() => {
              pushUndo();
              applyDraft(generateTemplate(seed), spawns, markers, { markDirty: true, nextLoadedMap: null });
              setNotice({ kind: 'info', text: `Generated arena template from seed ${seed || 0}.` });
            }}
            onRandomTemplate={() => {
              const nextSeed = String(Math.floor(Math.random() * 100000));
              setSeed(nextSeed);
              pushUndo();
              applyDraft(generateTemplate(nextSeed), spawns, markers, { markDirty: true, nextLoadedMap: null });
              setNotice({ kind: 'info', text: `Generated random arena seed ${nextSeed}.` });
            }}
            onApplyBorder={() => {
              pushUndo();
              applyDraft(applyBorderToGrid(gridRef.current), spawns, markers, { markDirty: true });
              setNotice({ kind: 'info', text: 'Applied a solid outer border to the draft.' });
            }}
            onClear={() => {
              if (!window.confirm('Clear the current draft grid and remove spawns?')) return;
              pushUndo();
              applyDraft(createEmptyGrid(), [], [], { markDirty: true, nextLoadedMap: null });
              setNotice({ kind: 'info', text: 'Cleared the draft arena.' });
            }}
            onUndo={() => {
              const snapshot = undoStackRef.current.pop();
              if (!snapshot) return;
              applyDraft(copyGrid(snapshot.grid), snapshot.spawns, snapshot.markers, { markDirty: true });
              setNotice({ kind: 'info', text: 'Restored the previous editor snapshot.' });
            }}
            onImport={() => fileInputRef.current?.click()}
            onDownloadGrid={() => {
              const safeName = fileSafeName(mapName);
              downloadText(`${safeName}.grid.txt`, serialiseGridText(gridRef.current, spawns));
            }}
            onDownloadRuntime={() => {
              const safeName = fileSafeName(mapName);
              downloadText(`${safeName}.txt`, serialiseRuntimeText(gridRef.current, spawns, markers));
            }}
            onDownloadJson={() => {
              const safeName = fileSafeName(mapName);
              downloadText(`${safeName}.json`, serialiseEditorJson(mapName, gridRef.current, spawns, markers), 'application/json');
            }}
            onCopyBram={async () => {
              try {
                await copyTextToClipboard(buildBramSnippet(mapName, gridRef.current, spawns));
                setNotice({ kind: 'success', text: 'Copied BRAM write snippet to the clipboard.' });
              } catch (error) {
                setNotice({ kind: 'error', text: `Clipboard copy failed: ${error.message}` });
              }
            }}
            onSaveDraft={() => persistDraft(false)}
            onPushLive={() => persistDraft(true)}
          />

          <MapLibrary
            entries={entries}
            activeMapId={activeMapId}
            selectedMapId={selectedMapId}
            deletingId={deletingId}
            loading={catalogLoading}
            onLoadToEditor={loadIntoEditor}
            onApplyMap={applyExistingMap}
            onDeleteMap={deleteMap}
          />
        </div>
      </div>
    </div>
  );
}
