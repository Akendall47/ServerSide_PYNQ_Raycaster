import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { mountPYNQCASTCoin } from '../PYNQCASTCoin.js';

function CoinStage() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) {
      return () => {};
    }
    return mountPYNQCASTCoin(rootRef.current);
  }, []);

  return (
    <div ref={rootRef} className="about-coin-legacy">
      <div
        className="about-stage legacy-coin-stage"
        style={{
          minHeight: 'auto',
          padding: 0,
          overflow: 'visible',
          background: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="about-light-cone" aria-hidden="true" />
        <div className="about-sprite-wrap">
          <img
            className="about-logo-sprite"
            src="/PNG_LOGO.png"
            alt="PYNQCAST logo"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}

export default function PYNQCASTCoin({ hostRef }) {
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    const target = hostRef?.current?.querySelector('.about-react-board-slot');
    setPortalTarget(target || null);
  }, [hostRef]);

  if (!portalTarget) {
    return null;
  }

  return createPortal(<CoinStage />, portalTarget);
}
