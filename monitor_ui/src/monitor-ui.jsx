import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import PYNQBoard from './components/PYNQBoard.jsx';
import PlayerStatsTab from './components/PlayerStatsTab.jsx';

// Swap this import back in if we want the legacy coin centerpiece again.
// import PYNQCASTCoin from './components/PYNQCASTCoin.jsx';

import { monitorMarkup } from './templates.generated.js';

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

function MonitorRoot({ mode }) {
  const rootRef = useRef(null);
  const [aboutSlot, setAboutSlot] = useState(null);
  const [playerSlot, setPlayerSlot] = useState(null);

  useEffect(() => {
    loadLegacyScripts();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return () => {};

    let rafId = 0;
    const syncSlots = () => {
      setAboutSlot(root.querySelector('.about-react-board-slot') || null);
      setPlayerSlot(root.querySelector('#player-stats-react-slot') || null);
    };

    syncSlots();
    rafId = requestAnimationFrame(syncSlots);

    const observer = new MutationObserver(syncSlots);
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [mode]);

  return (
    <>
      <div
        ref={rootRef}
        className="react-monitor-root"
        dangerouslySetInnerHTML={{ __html: monitorMarkup[mode] || monitorMarkup.pynq }}
      />
      <PYNQBoard portalTarget={aboutSlot} />
      {playerSlot ? createPortal(<PlayerStatsTab />, playerSlot) : null}
    </>
  );
}

const mode = window.__MONITOR_MODE__ === 'sim' ? 'sim' : 'pynq';
const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing #root for monitor React mount');
}

createRoot(container).render(<MonitorRoot mode={mode} />);
