import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';

// Swap this import back in if we want the legacy coin centerpiece again.
// import PYNQCASTCoin from './components/PYNQCASTCoin.jsx';

import { monitorMarkup } from './templates.generated.js';

const loadPYNQBoard = () => import('./components/PYNQBoard.jsx');
const loadPlayerStatsTab = () => import('./components/PlayerStatsTab.jsx');
const PYNQBoard = lazy(loadPYNQBoard);
const PlayerStatsTab = lazy(loadPlayerStatsTab);

const LEGACY_SCRIPTS = ['/monitor-state.js', '/monitor-render.js', '/monitor-app.js'];

function loadLegacyScripts() {
  if (window.__monitorLegacyBootstrapped) return;
  window.__monitorLegacyBootstrapped = true;

  const loadAt = (index) => {
    if (index >= LEGACY_SCRIPTS.length) {
      window.dispatchEvent(new Event('monitor:legacy-ready'));
      return;
    }

    const script = document.createElement('script');
    script.src = LEGACY_SCRIPTS[index];
    script.async = false;
    script.onload = () => loadAt(index + 1);
    script.onerror = () => {
      console.error(`[monitor-ui] failed to load legacy script: ${LEGACY_SCRIPTS[index]}`);
    };
    document.body.appendChild(script);
  };

  loadAt(0);
}

function MonitorPortals({ hostRef, mode }) {
  const [aboutSlot, setAboutSlot] = useState(null);
  const [playerSlot, setPlayerSlot] = useState(null);
  const [aboutActivated, setAboutActivated] = useState(false);
  const [playersActivated, setPlayersActivated] = useState(false);

  useLayoutEffect(() => {
    const root = hostRef.current;
    if (!root) return () => {};

    let rafId = 0;
    const syncSlots = () => {
      const aboutPage = root.querySelector('#page-about');
      const playersPage = root.querySelector('#page-players');
      const aboutVisible = Boolean(aboutPage && !aboutPage.hidden);
      const playersVisible = Boolean(playersPage && !playersPage.hidden);

      setAboutSlot(root.querySelector('.about-react-board-slot') || null);
      setPlayerSlot(root.querySelector('#player-stats-react-slot') || null);
      if (aboutVisible) setAboutActivated(true);
      if (playersVisible) setPlayersActivated(true);
    };

    syncSlots();
    rafId = requestAnimationFrame(syncSlots);

    const observer = new MutationObserver(syncSlots);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [hostRef, mode]);

  if (!aboutSlot && !playerSlot) return null;

  return (
    <>
      <Suspense fallback={null}>
        {aboutSlot && aboutActivated ? <PYNQBoard portalTarget={aboutSlot} /> : null}
      </Suspense>
      {playerSlot && playersActivated ? createPortal(
        <Suspense fallback={null}>
          <PlayerStatsTab />
        </Suspense>,
        playerSlot,
      ) : null}
    </>
  );
}

function MonitorRoot({ mode }) {
  const rootRef = useRef(null);

  useEffect(() => {
    loadLegacyScripts();
  }, []);

  useEffect(() => {
    const preload3D = () => {
      loadPYNQBoard();
      loadPlayerStatsTab();
    };

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(preload3D, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(preload3D, 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        className="react-monitor-root"
        dangerouslySetInnerHTML={{ __html: monitorMarkup[mode] || monitorMarkup.pynq }}
      />
      <MonitorPortals hostRef={rootRef} mode={mode} />
    </>
  );
}

const mode = window.__MONITOR_MODE__ === 'sim' ? 'sim' : 'pynq';
const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing #root for monitor React mount');
}

createRoot(container).render(<MonitorRoot mode={mode} />);
