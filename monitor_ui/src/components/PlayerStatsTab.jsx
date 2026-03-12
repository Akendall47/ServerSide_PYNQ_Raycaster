import React, { startTransition, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const FLAG_GHOST = 0x08;
const PLAYER_PALETTE = [
  '#00ff88',
  '#00d4ff',
  '#ffaa00',
  '#ff6688',
  '#a855f7',
  '#7cfffa',
  '#ffd700',
  '#f05252',
];

function asNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normaliseProfile(profile = {}) {
  return {
    player_key: String(profile.player_key || ''),
    display_name: String(profile.display_name || profile.username || profile.player_key || 'unknown player'),
    username: String(profile.username || ''),
    controller_key: String(profile.controller_key || ''),
    identity_source: String(profile.identity_source || ''),
    first_seen_at: String(profile.first_seen_at || ''),
    last_seen_at: String(profile.last_seen_at || ''),
    last_match_id: String(profile.last_match_id || ''),
    match_count: asNumber(profile.match_count),
    matches_as_runner: asNumber(profile.matches_as_runner),
    matches_as_tagger: asNumber(profile.matches_as_tagger),
    wins_as_runner: asNumber(profile.wins_as_runner),
    wins_as_tagger: asNumber(profile.wins_as_tagger),
    total_wins: asNumber(profile.total_wins),
    total_tags_landed: asNumber(profile.total_tags_landed),
    times_tagged: asNumber(profile.times_tagged),
    total_bits_collected: asNumber(profile.total_bits_collected),
  };
}

function normaliseMatch(match = {}) {
  return {
    timestamp: String(match.timestamp || ''),
    match_id: String(match.match_id || ''),
    status: String(match.status || ''),
    role: String(match.role || ''),
    won: asNumber(match.won),
    map_name: String(match.map_name || ''),
    game_mode: asNumber(match.game_mode),
    duration_ms: asNumber(match.duration_ms),
    tag_count: asNumber(match.tag_count),
    bits_collected: asNumber(match.bits_collected),
    bits_total: asNumber(match.bits_total),
    winner: String(match.winner || ''),
  };
}

function roleLabel(role) {
  if (role === 'runner') return 'Runner';
  if (role === 'tagger') return 'Tagger';
  if (role === 'ghost') return 'Ghost';
  return 'Offline';
}

function gameModeLabel(mode) {
  return asNumber(mode) === 1 ? 'Chase Bits' : 'Chase';
}

function formatPercent(numerator, denominator) {
  if (!denominator) return '0%';
  return `${Math.round((numerator / denominator) * 100)}%`;
}

function formatTimestamp(value) {
  return value ? value.replace('T', ' ') : '—';
}

function formatDuration(durationMs) {
  if (!durationMs) return '—';
  if (durationMs >= 60000) return `${(durationMs / 60000).toFixed(1)} min`;
  return `${(durationMs / 1000).toFixed(1)} s`;
}

function formatCoordinate(value) {
  return Number.isFinite(value) ? value.toFixed(1) : '—';
}

function formatAngle(value) {
  return Number.isFinite(value) ? `${Math.round(value)}°` : '—';
}

function isGhostPlayer(player) {
  return Boolean(asNumber(player?.flags) & FLAG_GHOST) || Boolean(player?.is_ghost);
}

function currentRoleForPlayer(player) {
  if (!player) return null;
  if (isGhostPlayer(player)) return 'ghost';
  if (asNumber(player.id) === 1) return 'runner';
  if (asNumber(player.id) === 2) return 'tagger';
  return null;
}

function stableColourForKey(key) {
  const text = String(key || 'player');
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }
  return PLAYER_PALETTE[Math.abs(hash) % PLAYER_PALETTE.length];
}

function buildRunnerModel(group, pColor) {
  const body = new THREE.MeshStandardMaterial({ color: pColor, metalness: 0.25, roughness: 0.5, emissive: pColor.clone().multiplyScalar(0.12) });
  const dark = new THREE.MeshStandardMaterial({ color: pColor.clone().multiplyScalar(0.35), metalness: 0.4, roughness: 0.35 });
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 });
  const visor = new THREE.MeshStandardMaterial({ color: 0x001122, metalness: 0.9, roughness: 0.08, emissive: pColor, emissiveIntensity: 0.25 });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.72), body);
  head.position.y = 2.0; group.add(head);
  const visorBand = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.2, 0.12), visor);
  visorBand.position.set(0, 1.96, 0.34); group.add(visorBand);
  for (const sx of [-0.14, 0.14]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.06), white);
    eye.position.set(sx, 2.0, 0.38); group.add(eye);
  }
  const antenna = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), body);
  antenna.position.set(0, 2.58, 0); group.add(antenna);
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: pColor, emissiveIntensity: 1.2 }));
  tip.position.set(0, 2.86, 0); group.add(tip);
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.88, 0.52), dark);
  torso.position.y = 1.18; group.add(torso);
  for (const sy of [1.3, 1.05]) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.08, 0.54), body);
    stripe.position.y = sy; group.add(stripe);
  }
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), body);
    arm.position.set(sx * 0.52, 1.28, 0); group.add(arm);
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), dark);
    hand.position.set(sx * 0.52, 0.86, 0); group.add(hand);
  }
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.28), dark);
    leg.position.set(sx * 0.2, 0.42, 0); group.add(leg);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.42), body);
    boot.position.set(sx * 0.2, 0.08, 0.06); group.add(boot);
  }
}

function buildTaggerModel(group, pColor) {
  const body = new THREE.MeshStandardMaterial({ color: pColor, metalness: 0.35, roughness: 0.4, emissive: pColor.clone().multiplyScalar(0.15) });
  const dark = new THREE.MeshStandardMaterial({ color: pColor.clone().multiplyScalar(0.3), metalness: 0.5, roughness: 0.3 });
  const angry = new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 0.6 });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.68, 0.72), body);
  head.position.y = 2.0; group.add(head);
  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.14), dark);
  brow.position.set(0, 2.12, 0.34); group.add(brow);
  for (const sx of [-0.16, 0.16]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.06), angry);
    eye.position.set(sx, 2.02, 0.38); group.add(eye);
  }
  for (let index = 0; index < 3; index += 1) {
    const spike = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22 + index * 0.06, 0.1), body);
    spike.position.set(-0.22 + index * 0.22, 2.5 + index * 0.04, 0); group.add(spike);
  }
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.95, 0.58), dark);
  torso.position.y = 1.16; group.add(torso);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.12), body);
  plate.position.set(0, 1.3, 0.3); group.add(plate);
  const xbar1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.04), angry);
  xbar1.position.set(0, 1.3, 0.37); xbar1.rotation.z = 0.7; group.add(xbar1);
  const xbar2 = xbar1.clone(); xbar2.rotation.z = -0.7; group.add(xbar2);
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.7, 0.28), body);
    arm.position.set(sx * 0.6, 1.25, 0); group.add(arm);
    const fist = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), dark);
    fist.position.set(sx * 0.6, 0.8, 0); group.add(fist);
  }
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.6, 0.32), dark);
    leg.position.set(sx * 0.22, 0.38, 0); group.add(leg);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.46), body);
    boot.position.set(sx * 0.22, 0.06, 0.06); group.add(boot);
  }
}

function buildGhostModel(group, pColor) {
  const ghostMat = (opacity = 0.7, emInt = 0.3) => new THREE.MeshStandardMaterial({
    color: pColor, metalness: 0.1, roughness: 0.6,
    emissive: pColor, emissiveIntensity: emInt,
    transparent: true, opacity,
  });
  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.8 });
  const pupil = new THREE.MeshStandardMaterial({ color: 0x111133, emissive: pColor, emissiveIntensity: 0.2 });

  const slices = [
    { w: 0.5, h: 0.2, d: 0.45, y: 2.72 },
    { w: 0.8, h: 0.3, d: 0.7, y: 2.5 },
    { w: 1.0, h: 0.6, d: 0.9, y: 2.1 },
    { w: 1.1, h: 0.7, d: 1.0, y: 1.55 },
    { w: 1.15, h: 0.5, d: 1.0, y: 1.0 },
  ];
  slices.forEach((slice) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(slice.w, slice.h, slice.d), ghostMat());
    mesh.position.y = slice.y; group.add(mesh);
  });

  const core = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.35),
    new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: pColor, emissiveIntensity: 0.4,
      transparent: true, opacity: 0.35,
    }));
  core.position.y = 1.7; group.add(core);

  for (let index = 0; index < 5; index += 1) {
    const tentacle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.22), ghostMat(0.55, 0.25));
    tentacle.position.set(-0.44 + index * 0.22, 0.6, 0);
    group.add(tentacle);
    const dangling = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.18), ghostMat(0.4, 0.2));
    dangling.position.set(-0.44 + index * 0.22, 0.35 - (index % 2) * 0.15, 0);
    dangling.userData.tentacleIndex = index;
    group.add(dangling);
  }

  for (const sx of [-0.24, 0.24]) {
    const eyeWhiteMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.32, 0.14), eyeWhite);
    eyeWhiteMesh.position.set(sx, 2.12, 0.42); group.add(eyeWhiteMesh);
    const pupilMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.06), pupil);
    pupilMesh.position.set(sx + 0.04, 2.1, 0.5); group.add(pupilMesh);
  }
}

function PlayerTrophy({ player, pageVisible, animated }) {
  const shellRef = useRef(null);
  const mountRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [renderError, setRenderError] = useState('');
  const role = player.currentRole || 'runner';
  const isGhost = role === 'ghost';

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell || !pageVisible) {
      setInView(false);
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setInView(entries.some((entry) => entry.isIntersecting));
      },
      { root: null, rootMargin: '220px 0px', threshold: 0.01 },
    );
    observer.observe(shell);
    return () => observer.disconnect();
  }, [pageVisible, player.player_key]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !pageVisible || !inView) return () => {};

    const W = 200;
    const H = 220;
    const pColor = new THREE.Color(stableColourForKey(player.player_key || player.profile_key));
    let renderer = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    } catch (error) {
      setRenderError('WEBGL UNAVAILABLE');
      return () => {};
    }
    setRenderError('');
    renderer.setSize(W / 3, H / 3);
    renderer.domElement.style.width = `${W}px`;
    renderer.domElement.style.height = `${H}px`;
    renderer.domElement.style.imageRendering = 'pixelated';
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100);
    camera.position.set(0, 1.8, 6.0);
    camera.lookAt(0, 1.0, 0);

    scene.add(new THREE.AmbientLight(0x181020, 4));
    const keyLight = new THREE.PointLight(pColor.getHex(), 180, 14);
    keyLight.position.set(2.5, 3.5, 3);
    const rim = new THREE.PointLight(0x2244aa, 60, 10);
    rim.position.set(-3, 2, -2);
    const top = new THREE.PointLight(0xffffff, 50, 10);
    top.position.set(0, 6, 1);
    scene.add(keyLight);
    scene.add(rim);
    scene.add(top);

    const charGroup = new THREE.Group();
    scene.add(charGroup);

    const platform = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a18, metalness: 0.85, roughness: 0.15,
        emissive: pColor.clone().multiplyScalar(0.04),
      }));
    platform.position.y = -0.05;
    scene.add(platform);

    if (role === 'tagger') buildTaggerModel(charGroup, pColor);
    else if (role === 'ghost') buildGhostModel(charGroup, pColor);
    else buildRunnerModel(charGroup, pColor);

    const ringGeo = new THREE.BoxGeometry(0.07, 0.04, 0.07);
    const ringMat = new THREE.MeshStandardMaterial({
      color: pColor, emissive: pColor, emissiveIntensity: 0.9,
      transparent: true, opacity: 0.55,
    });
    const particles = [];
    for (let index = 0; index < 10; index += 1) {
      const particle = new THREE.Mesh(ringGeo, ringMat);
      const angle = (index / 10) * Math.PI * 2;
      particle.position.set(Math.cos(angle) * 1.0, 0.0, Math.sin(angle) * 1.0);
      charGroup.add(particle);
      particles.push({ mesh: particle, baseAngle: angle });
    }

    const timer = new THREE.Timer();
    let rafId = 0;

    const renderFrame = (t) => {
      timer.update();
      const elapsed = t ?? timer.getElapsed();
      charGroup.rotation.y = animated ? Math.sin(elapsed * 0.7) * 0.45 : 0.32;

      if (isGhost) {
        charGroup.position.y = animated ? 0.15 + Math.sin(elapsed * 1.2) * 0.22 : 0.18;
        charGroup.children.forEach((child) => {
          if (child.userData.tentacleIndex !== undefined) {
            child.position.y = 0.35 - (child.userData.tentacleIndex % 2) * 0.15 +
              (animated ? Math.sin(elapsed * 3 + child.userData.tentacleIndex * 1.5) * 0.1 : 0);
          }
        });
      } else {
        charGroup.position.y = animated ? Math.sin(elapsed * 1.5) * 0.08 : 0.03;
      }

      keyLight.intensity = animated ? 140 + Math.sin(elapsed * 2.2) * 40 : 160;

      particles.forEach((particle, index) => {
        const angle = particle.baseAngle + (animated ? elapsed * (isGhost ? 0.8 : 1.3) : 0);
        const radius = 1.0 + (animated ? Math.sin(elapsed * 2.5 + index) * 0.12 : 0);
        particle.mesh.position.x = Math.cos(angle) * radius;
        particle.mesh.position.z = Math.sin(angle) * radius;
        particle.mesh.position.y = animated ? Math.sin(elapsed * 3.5 + index * 0.7) * 0.06 : 0;
      });

      renderer.render(scene, camera);
    };

    if (animated) {
      const animate = () => {
        renderFrame();
        rafId = requestAnimationFrame(animate);
      };
      animate();
    } else {
      renderFrame(0.75);
    }

    return () => {
      cancelAnimationFrame(rafId);
      const geometries = new Set();
      const materials = new Set();
      scene.traverse((child) => {
        if (child.geometry) geometries.add(child.geometry);
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => materials.add(material));
        } else {
          materials.add(child.material);
        }
      });
      geometries.forEach((geometry) => geometry?.dispose?.());
      materials.forEach((material) => material?.dispose?.());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [animated, inView, pageVisible, player.player_key, player.profile_key, player.currentRole]);

  return (
    <div ref={shellRef} className={`player-trophy-shell${player.isOnline ? '' : ' offline'}`}>
      <div ref={mountRef} className="player-trophy-canvas" />
      {!pageVisible || !inView ? <div className="player-trophy-overlay">STAND BY</div> : null}
      {renderError ? <div className="player-trophy-overlay">{renderError}</div> : null}
      {!renderError && player.isOnline ? null : !pageVisible || !inView ? null : !player.isOnline ? <div className="player-trophy-overlay">OFFLINE</div> : null}
      <div className="player-trophy-role">{roleLabel(role)}</div>
    </div>
  );
}

function PlayerDetail({ matches, loading, error }) {
  const recent = matches.slice(0, 10);
  const recentForm = matches.slice(0, 5);
  const roleBreakdown = matches.reduce((acc, match) => {
    const bucket = match.role === 'tagger' ? 'tagger' : 'runner';
    acc[bucket].matches += 1;
    acc[bucket].wins += match.won ? 1 : 0;
    acc[bucket].tags += match.tag_count;
    acc[bucket].bits += match.bits_collected;
    return acc;
  }, {
    runner: { matches: 0, wins: 0, tags: 0, bits: 0 },
    tagger: { matches: 0, wins: 0, tags: 0, bits: 0 },
  });

  return (
    <div className="player-detail-panel">
      <div className="player-detail-head">
        <div>
          <div className="panel-head-note">expanded match tape</div>
          <h3>Recent Match History</h3>
        </div>
        <div className="player-form-strip">
          {recentForm.length ? recentForm.map((match) => (
            <span
              key={`${match.match_id}:${match.timestamp}`}
              className={`player-form-chip ${match.won ? 'win' : 'loss'}`}
              title={`${roleLabel(match.role)} · ${match.map_name || 'unknown map'}`}
            >
              {match.won ? 'W' : 'L'}
            </span>
          )) : <span className="metric-note">no completed matches yet</span>}
        </div>
      </div>

      <div className="player-role-breakdown">
        <div className="panel-inset">
          <span className="player-breakdown-label">Runner career</span>
          <span>{roleBreakdown.runner.wins}/{roleBreakdown.runner.matches} wins</span>
          <span>{roleBreakdown.runner.tags} times tagged</span>
        </div>
        <div className="panel-inset">
          <span className="player-breakdown-label">Tagger career</span>
          <span>{roleBreakdown.tagger.wins}/{roleBreakdown.tagger.matches} wins</span>
          <span>{roleBreakdown.tagger.tags} tags landed</span>
        </div>
      </div>

      {loading ? (
        <div className="player-detail-status">
          <span className="player-spinner" />
          <span>LOADING MATCH TAPE...</span>
        </div>
      ) : null}
      {!loading && error ? <div className="player-detail-status error">{error}</div> : null}
      {!loading && !error && !recent.length ? <div className="player-detail-status">NO MATCH HISTORY FOR THIS PLAYER YET.</div> : null}

      {!loading && !error && recent.length ? (
        <div className="player-history-table-wrap">
          <table className="player-history-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Role</th>
                <th>Result</th>
                <th>Map</th>
                <th>Mode</th>
                <th>Duration</th>
                <th>Tags</th>
                <th>Bits</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((match) => (
                <tr key={`${match.match_id}:${match.timestamp}`}>
                  <td>{formatTimestamp(match.timestamp)}</td>
                  <td>{roleLabel(match.role)}</td>
                  <td className={match.won ? 'result-win' : 'result-loss'}>{match.won ? 'Won' : 'Lost'}</td>
                  <td>{match.map_name || '—'}</td>
                  <td>{gameModeLabel(match.game_mode)}</td>
                  <td>{formatDuration(match.duration_ms)}</td>
                  <td>{match.tag_count}</td>
                  <td>{match.bits_collected}/{match.bits_total || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

export default function PlayerStatsTab() {
  const [profiles, setProfiles] = useState([]);
  const [livePlayers, setLivePlayers] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [detailProfile, setDetailProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [detailError, setDetailError] = useState('');
  const [pageVisible, setPageVisible] = useState(false);
  const detailCacheRef = useRef(new Map());
  const selectedKeyRef = useRef(null);

  async function fetchProfiles({ silent = false } = {}) {
    if (!silent) setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/players');
      if (!response.ok) throw new Error(`PLAYER PROFILE SCAN FAILED (${response.status})`);
      const payload = await response.json();
      const items = Array.isArray(payload.players) ? payload.players.map(normaliseProfile) : [];
      startTransition(() => setProfiles(items));
    } catch (fetchError) {
      setError(fetchError.message || 'PLAYER PROFILE SCAN FAILED');
    } finally {
      setLoading(false);
    }
  }

  async function fetchPlayerDetail(playerKey) {
    selectedKeyRef.current = playerKey;
    setDetailLoading(true);
    setDetailError('');
    try {
      const response = await fetch(`/api/players/${encodeURIComponent(playerKey)}`);
      if (!response.ok) throw new Error(`MATCH HISTORY FETCH FAILED (${response.status})`);
      const payload = await response.json();
      const nextProfile = payload.profile ? normaliseProfile(payload.profile) : null;
      const nextMatches = Array.isArray(payload.matches) ? payload.matches.map(normaliseMatch) : [];
      detailCacheRef.current.set(playerKey, { profile: nextProfile, matches: nextMatches });
      if (selectedKeyRef.current !== playerKey) return;
      setDetailProfile(nextProfile);
      setMatchHistory(nextMatches);
    } catch (fetchError) {
      if (selectedKeyRef.current !== playerKey) return;
      setDetailError(fetchError.message || 'MATCH HISTORY FETCH FAILED');
      setMatchHistory([]);
    } finally {
      if (selectedKeyRef.current === playerKey) {
        setDetailLoading(false);
      }
    }
  }

  function togglePlayer(playerKey) {
    if (selectedKey === playerKey) {
      selectedKeyRef.current = null;
      setSelectedKey(null);
      setDetailProfile(null);
      setMatchHistory([]);
      setDetailError('');
      setDetailLoading(false);
      return;
    }

    setSelectedKey(playerKey);
    setDetailError('');
    const cached = detailCacheRef.current.get(playerKey);
    if (cached) {
      selectedKeyRef.current = playerKey;
      setDetailProfile(cached.profile);
      setMatchHistory(cached.matches);
      setDetailLoading(false);
      return;
    }

    setDetailProfile(null);
    setMatchHistory([]);
    fetchPlayerDetail(playerKey);
  }

  useEffect(() => {
    fetchProfiles();

    const section = document.getElementById('page-players');
    if (!section) return () => {};
    setPageVisible(!section.hidden);

    const observer = new MutationObserver(() => {
      const visible = !section.hidden;
      setPageVisible(visible);
      if (visible) fetchProfiles({ silent: true });
    });
    observer.observe(section, { attributes: true, attributeFilter: ['hidden'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pageVisible) return () => {};
    const syncLivePlayers = () => {
      const snapshot = Array.isArray(window.latestState?.players) ? window.latestState.players.slice() : [];
      startTransition(() => setLivePlayers(snapshot));
    };

    syncLivePlayers();
    const intervalId = setInterval(syncLivePlayers, 500);
    return () => clearInterval(intervalId);
  }, [pageVisible]);

  const liveByProfileKey = new Map();
  livePlayers.forEach((player) => {
    if (!player?.profile_key || isGhostPlayer(player)) return;
    const existing = liveByProfileKey.get(player.profile_key);
    if (!existing || (existing.queued && !player.queued)) {
      liveByProfileKey.set(player.profile_key, player);
    }
  });

  const ghosts = livePlayers.filter((player) => isGhostPlayer(player));
  const enrichedProfiles = profiles
    .map((profile) => {
      const live = liveByProfileKey.get(profile.player_key) || null;
      return {
        ...profile,
        live,
        currentRole: currentRoleForPlayer(live),
        isOnline: Boolean(live && !live.queued),
        isQueued: Boolean(live?.queued),
      };
    })
    .sort((left, right) => (
      Number(right.isOnline) - Number(left.isOnline)
      || String(right.last_seen_at).localeCompare(String(left.last_seen_at))
    ));

  const totals = enrichedProfiles.reduce((acc, profile) => {
    acc.totalWins += profile.total_wins;
    acc.totalBits += profile.total_bits_collected;
    acc.onlinePlayers += profile.isOnline ? 1 : 0;
    return acc;
  }, { totalWins: 0, totalBits: 0, onlinePlayers: 0 });

  return (
    <div className="player-stats-shell">
      <div className="player-stats-overview">
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Registered Humans</div>
          <div className="player-overview-value">{profiles.length}</div>
          <div className="hud-sub">career profiles in DynamoDB</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Live Humans</div>
          <div className="player-overview-value">{totals.onlinePlayers}</div>
          <div className="hud-sub">joined from websocket feed</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Career Wins</div>
          <div className="player-overview-value">{totals.totalWins}</div>
          <div className="hud-sub">all recorded matches</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Bits Banked</div>
          <div className="player-overview-value">{totals.totalBits}</div>
          <div className="hud-sub">summed from player profiles</div>
        </div>
        <div className="panel-raised player-overview-card">
          <div className="hud-label">Live Ghosts</div>
          <div className="player-overview-value">{ghosts.length}</div>
          <div className="hud-sub">websocket-only entities</div>
        </div>
        <div className="panel-raised player-overview-card player-overview-action">
          <div className="hud-label">Database Scan</div>
          <button className="control-btn start" type="button" onClick={() => fetchProfiles()}>
            Refresh Profiles
          </button>
          <div className="hud-sub">re-pulls career aggregates</div>
        </div>
      </div>

      <div className="panel-raised ghost-summary-panel">
        <div className="panel-head">
          <h2>Ghost Patrol</h2>
          <span className="micro-chip">live feed</span>
        </div>
        {ghosts.length ? (
          <div className="ghost-summary-grid">
            {ghosts.map((ghost) => (
              <div key={`${ghost.entity_key || ghost.profile_key || ghost.id}`} className="panel-inset ghost-summary-card">
                <div className="ghost-summary-name">{ghost.display_name || ghost.username || `Ghost ${ghost.id || '?'}`}</div>
                <div className="ghost-summary-meta">
                  <span>{formatCoordinate(asNumber(ghost.x))}, {formatCoordinate(asNumber(ghost.y))}</span>
                  <span>{formatAngle(asNumber(ghost.angle))}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="metric-note">No ghosts are active in the live websocket feed right now.</div>
        )}
      </div>

      {loading ? (
        <div className="panel-raised player-status-panel">
          <div className="player-detail-status">
            <span className="player-spinner" />
            <span>SCANNING PLAYER DATABASE...</span>
          </div>
        </div>
      ) : null}

      {!loading && error ? (
        <div className="panel-raised player-status-panel">
          <div className="player-detail-status error">{error}</div>
          <button className="control-btn restart" type="button" onClick={() => fetchProfiles()}>
            Retry Scan
          </button>
        </div>
      ) : null}

      {!loading && !error && !enrichedProfiles.length ? (
        <div className="panel-raised player-status-panel">
          <div className="player-detail-status">NO PLAYERS RECORDED YET.</div>
        </div>
      ) : null}

      {!loading && !error && enrichedProfiles.length ? (
        <div className="player-stats-grid">
          {enrichedProfiles.map((player) => {
            const totalMatches = player.match_count;
            const selected = selectedKey === player.player_key;
            const liveStatus = player.isOnline ? 'online' : player.isQueued ? 'queued' : 'offline';
            const detailMatches = selected ? matchHistory : [];
            const displayProfile = selected && detailProfile?.player_key === player.player_key ? detailProfile : player;

            return (
              <article key={player.player_key} className={`panel-raised player-stat-card${selected ? ' expanded' : ''}`}>
                <button className="player-card-head" type="button" onClick={() => togglePlayer(player.player_key)}>
                  <div>
                    <div className="player-card-title">{player.display_name}</div>
                    <div className="player-card-subtitle">{player.player_key}</div>
                  </div>
                  <span className={`player-live-pill ${liveStatus}`}>
                    {player.isOnline ? `${roleLabel(player.currentRole)} live` : player.isQueued ? 'queued' : 'offline'}
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
                      {player.isOnline && player.live
                        ? `Live @ (${formatCoordinate(asNumber(player.live.x))}, ${formatCoordinate(asNumber(player.live.y))}) · ${formatAngle(asNumber(player.live.angle))}`
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
          })}
        </div>
      ) : null}
    </div>
  );
}
