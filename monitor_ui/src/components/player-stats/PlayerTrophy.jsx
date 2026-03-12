import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { buildGhostModel, buildRunnerModel, buildTaggerModel } from './models.js';
import { roleLabel, stableColourForKey } from './utils.js';

export default function PlayerTrophy({ player, pageVisible, animated }) {
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

    const platform = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.1, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a18,
        metalness: 0.85,
        roughness: 0.15,
        emissive: pColor.clone().multiplyScalar(0.04),
      }),
    );
    platform.position.y = -0.05;
    scene.add(platform);

    if (role === 'tagger') buildTaggerModel(charGroup, pColor);
    else if (role === 'ghost') buildGhostModel(charGroup, pColor);
    else buildRunnerModel(charGroup, pColor);

    const ringGeo = new THREE.BoxGeometry(0.07, 0.04, 0.07);
    const ringMat = new THREE.MeshStandardMaterial({
      color: pColor,
      emissive: pColor,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.55,
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
