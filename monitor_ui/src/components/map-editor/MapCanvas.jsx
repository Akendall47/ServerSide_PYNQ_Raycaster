import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  copyGrid,
  floodFill,
  gridIndex,
  isInsideGrid,
  sanitiseDraft,
} from './utils.js';

const MIN_CANVAS_SIZE = 384;
const MAX_CANVAS_SIZE = 768;
const BIT_MARKER = Object.freeze({ marker: 'B', type: 'bit_spawn' });
const SPAWN_COLORS = ['#19ff84', '#ff7b3d', '#51b5ff', '#ffd166', '#d38dff'];

function cellFromPointer(event, canvasSize) {
  const rect = event.currentTarget.getBoundingClientRect();
  const relativeX = event.clientX - rect.left;
  const relativeY = event.clientY - rect.top;
  const cellSize = canvasSize / GRID_WIDTH;
  return {
    x: Math.max(0, Math.min(GRID_WIDTH - 1, Math.floor(relativeX / cellSize))),
    y: Math.max(0, Math.min(GRID_HEIGHT - 1, Math.floor(relativeY / cellSize))),
  };
}

export default function MapCanvas({
  gridRef,
  spawns,
  markers,
  tool,
  revision,
  onSpawnsChange,
  onMarkersChange,
  pushUndo,
  onDirty,
}) {
  const shellRef = useRef(null);
  const baseCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const dragRef = useRef({ active: false, value: 1, undoTaken: false, lastKey: '' });
  const hoverCellRef = useRef(null);
  const spawnCursorRef = useRef(0);
  const [canvasSize, setCanvasSize] = useState(512);

  const cellSize = useMemo(() => canvasSize / GRID_WIDTH, [canvasSize]);

  function redrawCell(ctx, x, y, isWall) {
    const px = x * cellSize;
    const py = y * cellSize;
    ctx.fillStyle = isWall ? '#5f739d' : '#111a2d';
    ctx.fillRect(px, py, cellSize, cellSize);
    ctx.strokeStyle = isWall ? 'rgba(147, 179, 235, 0.22)' : 'rgba(78, 96, 132, 0.58)';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 0.5, py + 0.5, cellSize - 1, cellSize - 1);
  }

  function redrawBase() {
    const canvas = baseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const grid = gridRef.current;
    for (let y = 0; y < GRID_HEIGHT; y += 1) {
      for (let x = 0; x < GRID_WIDTH; x += 1) {
        redrawCell(ctx, x, y, grid[gridIndex(x, y)] === 1);
      }
    }
  }

  function redrawOverlay(nextSpawns = spawns, nextMarkers = markers) {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    (nextMarkers || []).forEach((marker) => {
      const x = marker.x * cellSize;
      const y = marker.y * cellSize;
      const cx = x + (cellSize * 0.5);
      const cy = y + (cellSize * 0.5);
      const radius = Math.max(8, cellSize * 0.26);
      const markerLabel = String(marker.marker || 'B').slice(0, 1).toUpperCase();
      ctx.fillStyle = 'rgba(255, 209, 102, 0.92)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff0c2';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = '#22170a';
      ctx.font = `${Math.max(10, cellSize * 0.3)}px "Press Start 2P"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(markerLabel, cx, cy + 1);
    });

    (nextSpawns || []).slice(0, 5).forEach((spawn, index) => {
      const cx = (spawn.x + 0.5) * cellSize;
      const cy = (spawn.y + 0.5) * cellSize;
      const radius = Math.max(10, cellSize * 0.32);
      const fill = SPAWN_COLORS[index] || SPAWN_COLORS[SPAWN_COLORS.length - 1];
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0b1020';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#07111d';
      ctx.font = `${Math.max(11, cellSize * 0.36)}px "Press Start 2P"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`P${index + 1}`, cx, cy + 1);
    });

    const hover = hoverCellRef.current;
    if (hover) {
      const x = hover.x * cellSize;
      const y = hover.y * cellSize;
      ctx.strokeStyle = tool === 'spawn'
        ? '#ffcf6c'
        : tool === 'bits'
          ? '#ffd166'
        : tool === 'fill'
          ? '#9bffbc'
          : '#00d4ff';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
    }
  }

  function commitBulkGrid(nextGrid, nextSpawns = spawns, nextMarkers = markers) {
    if (!nextGrid) return false;
    const { spawns: safeSpawns, markers: safeMarkers } = sanitiseDraft(nextGrid, nextSpawns, nextMarkers);
    gridRef.current = nextGrid;
    onSpawnsChange(safeSpawns);
    onMarkersChange(safeMarkers);
    redrawBase();
    redrawOverlay(safeSpawns, safeMarkers);
    onDirty();
    return true;
  }

  function applyDrawAt(x, y, nextValue) {
    if (!isInsideGrid(x, y)) return false;
    const index = gridIndex(x, y);
    if (gridRef.current[index] === nextValue) return false;
    if (!dragRef.current.undoTaken) {
      pushUndo();
      dragRef.current.undoTaken = true;
    }
    gridRef.current[index] = nextValue;
    redrawCell(baseCanvasRef.current.getContext('2d'), x, y, nextValue === 1);
    const { spawns: safeSpawns, markers: safeMarkers } = sanitiseDraft(gridRef.current, spawns, markers);
    if (safeSpawns.length !== spawns.length) onSpawnsChange(safeSpawns);
    if (safeMarkers.length !== markers.length) onMarkersChange(safeMarkers);
    redrawOverlay(safeSpawns, safeMarkers);
    onDirty();
    return true;
  }

  function handleSpawnPlacement(x, y) {
    if (gridRef.current[gridIndex(x, y)] === 1) return;
    const existingIndex = spawns.findIndex((spawn) => spawn.x === x && spawn.y === y);
    pushUndo();
    if (existingIndex >= 0) {
      const nextSpawns = spawns.filter((_, index) => index !== existingIndex);
      onSpawnsChange(nextSpawns);
      redrawOverlay(nextSpawns, markers);
      onDirty();
      return;
    }
    const nextSpawns = spawns.slice(0, 5);
    const nextIndex = nextSpawns.length < 5 ? nextSpawns.length : (spawnCursorRef.current % 5);
    spawnCursorRef.current = nextIndex + 1;
    nextSpawns[nextIndex] = { x, y };
    const { spawns: safeSpawns, markers: safeMarkers } = sanitiseDraft(gridRef.current, nextSpawns, markers);
    onSpawnsChange(safeSpawns);
    onMarkersChange(safeMarkers);
    redrawOverlay(safeSpawns, safeMarkers);
    onDirty();
  }

  function handleFill(x, y, nextValue) {
    const filledGrid = floodFill(gridRef.current, x, y, nextValue);
    if (!filledGrid) return;
    pushUndo();
    commitBulkGrid(filledGrid);
  }

  function handleBitPlacement(x, y) {
    if (gridRef.current[gridIndex(x, y)] === 1) return;
    if (spawns.some((spawn) => spawn.x === x && spawn.y === y)) return;

    const existingIndex = markers.findIndex((marker) => marker.x === x && marker.y === y);
    pushUndo();

    if (existingIndex >= 0) {
      const nextMarkers = markers.filter((_, index) => index !== existingIndex);
      onMarkersChange(nextMarkers);
      redrawOverlay(spawns, nextMarkers);
      onDirty();
      return;
    }

    const nextMarkers = [...markers, { ...BIT_MARKER, x, y }];
    const { spawns: safeSpawns, markers: safeMarkers } = sanitiseDraft(gridRef.current, spawns, nextMarkers);
    onSpawnsChange(safeSpawns);
    onMarkersChange(safeMarkers);
    redrawOverlay(safeSpawns, safeMarkers);
    onDirty();
  }

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return () => {};

    const resize = () => {
      const boundedWidth = Math.max(
        MIN_CANVAS_SIZE,
        Math.min(MAX_CANVAS_SIZE, Math.floor(shell.clientWidth || 512)),
      );
      const next = Math.max(32, Math.floor(boundedWidth / GRID_WIDTH)) * GRID_WIDTH;
      setCanvasSize((current) => (current === next ? current : next));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    [baseCanvasRef.current, overlayCanvasRef.current].forEach((canvas) => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = `${canvasSize}px`;
      canvas.style.height = `${canvasSize}px`;
    });
    redrawBase();
    redrawOverlay();
  }, [canvasSize]);

  useEffect(() => {
    redrawBase();
    redrawOverlay();
  }, [revision]);

  useEffect(() => {
    redrawOverlay();
  }, [spawns, markers, tool, cellSize]);

  return (
    <div
      ref={shellRef}
      className="map-editor-canvas-shell panel-raised"
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="map-editor-canvas-stage" style={{ width: `${canvasSize}px`, height: `${canvasSize}px` }}>
        <canvas ref={baseCanvasRef} className="map-editor-canvas-layer base" />
        <canvas
          ref={overlayCanvasRef}
          className="map-editor-canvas-layer overlay"
          onPointerDown={(event) => {
            const { x, y } = cellFromPointer(event, canvasSize);
            hoverCellRef.current = { x, y };
            redrawOverlay();
            if (tool === 'spawn') {
              handleSpawnPlacement(x, y);
              return;
            }
            if (tool === 'bits') {
              handleBitPlacement(x, y);
              return;
            }
            if (tool === 'fill') {
              handleFill(x, y, event.button === 2 ? 0 : 1);
              return;
            }
            dragRef.current = {
              active: true,
              value: event.button === 2 ? 0 : 1,
              undoTaken: false,
              lastKey: `${x}:${y}`,
            };
            event.currentTarget.setPointerCapture?.(event.pointerId);
            applyDrawAt(x, y, dragRef.current.value);
          }}
          onPointerMove={(event) => {
            const { x, y } = cellFromPointer(event, canvasSize);
            hoverCellRef.current = { x, y };
            if (!dragRef.current.active || tool !== 'draw') {
              redrawOverlay();
              return;
            }
            const nextKey = `${x}:${y}`;
            if (nextKey === dragRef.current.lastKey) {
              redrawOverlay();
              return;
            }
            dragRef.current.lastKey = nextKey;
            applyDrawAt(x, y, dragRef.current.value);
          }}
          onPointerLeave={() => {
            hoverCellRef.current = null;
            redrawOverlay();
          }}
          onPointerUp={(event) => {
            dragRef.current.active = false;
            dragRef.current.undoTaken = false;
            event.currentTarget.releasePointerCapture?.(event.pointerId);
          }}
          onPointerCancel={() => {
            dragRef.current.active = false;
            dragRef.current.undoTaken = false;
          }}
        />
      </div>
      <div className="map-editor-canvas-meta">
        <span>{
          tool === 'spawn'
            ? 'Spawn Placement'
            : tool === 'bits'
              ? 'Bit Placement'
              : tool === 'fill'
                ? 'Flood Fill'
                : 'Brush'
        }</span>
        <span>{GRID_WIDTH}x{GRID_HEIGHT} runtime-safe arena grid</span>
      </div>
    </div>
  );
}
