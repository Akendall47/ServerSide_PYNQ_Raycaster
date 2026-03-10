import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { monitorMarkup } from './templates.generated.js';

const LEGACY_SCRIPTS = ['/monitor-state.js', '/monitor-render.js', '/monitor-app.js'];
const ABOUT_LOGO_PATH = '/PNG_LOGO.png';
const TAU = Math.PI * 2;

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

function mountAboutLogoScene(rootEl) {
  const wrap = rootEl?.querySelector('.about-sprite-wrap');
  const img = wrap?.querySelector('.about-logo-sprite');
  const stage = rootEl?.querySelector('.about-stage');
  const groundShadow = stage?.querySelector('.about-ground-shadow');
  const lightCone = stage?.querySelector('.about-light-cone');

  if (!wrap || !img || wrap.dataset.threeMounted === '1') {
    return () => {};
  }

  wrap.dataset.threeMounted = '1';
  wrap.classList.add('three-ready');
  stage?.classList.add('three-ready');

  const host = document.createElement('div');
  host.className = 'about-3d-host';
  wrap.appendChild(host);

  let destroyed = false;
  let rafId = 0;
  let observer = null;
  let renderer = null;
  let scene = null;
  let camera = null;
  let coinGroup = null;
  let barrel = null;
  let frontFace = null;
  let backFace = null;
  let sparks = null;
  let frontTexture = null;
  let backTexture = null;
  let barrelGeometry = null;
  let faceGeometry = null;
  let sparkGeometry = null;
  let materials = [];

  const renderFrame = () => {
    if (!renderer || !scene || !camera) return;
    renderer.render(scene, camera);
  };

  const resize = () => {
    if (!renderer || !camera) return;
    const width = Math.max(280, Math.round(host.clientWidth || 480));
    const height = Math.max(280, Math.round(host.clientHeight || width));
    const renderWidth = Math.max(1, Math.round(width / 3));
    const renderHeight = Math.max(1, Math.round(height / 3));
    renderer.setSize(renderWidth, renderHeight, false);
    renderer.domElement.style.width = `${width}px`;
    renderer.domElement.style.height = `${height}px`;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderFrame();
  };

  try {
    renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    console.error('[monitor-ui] failed to create WebGL renderer:', error);
    wrap.dataset.threeMounted = '0';
    wrap.classList.remove('three-ready');
    stage?.classList.remove('three-ready');
    host.remove();
    return () => {};
  }

  renderer.setPixelRatio(1);
  if ('outputColorSpace' in renderer) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  }
  renderer.domElement.style.imageRendering = 'pixelated';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.06, 4.9);

  const ambient = new THREE.AmbientLight(0xffeedd, 0.4);
  scene.add(ambient);

  const keyLight = new THREE.PointLight(0xF05A50, 3.5, 14);
  keyLight.position.set(2.5, 3, 3);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x4466cc, 0.9, 12);
  fillLight.position.set(-3, -1, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xFF7766, 2.2, 10);
  rimLight.position.set(0, -2.5, -3);
  scene.add(rimLight);

  barrelGeometry = new THREE.CylinderGeometry(1.14, 1.14, 0.34, 48, 1, true);
  faceGeometry = new THREE.CircleGeometry(1.14, 48);

  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x7d2429,
    metalness: 0.58,
    roughness: 0.32,
    emissive: new THREE.Color('#260709'),
    emissiveIntensity: 0.22,
    flatShading: true,
  });
  const faceMaterial = new THREE.MeshStandardMaterial({
    map: null,
    metalness: 0.28,
    roughness: 0.38,
    emissive: new THREE.Color('#1e090a'),
    emissiveIntensity: 0.18,
    flatShading: true,
    transparent: true,
    alphaTest: 0.1,
  });
  const backFaceMaterial = new THREE.MeshStandardMaterial({
    map: null,
    metalness: 0.26,
    roughness: 0.42,
    emissive: new THREE.Color('#160506'),
    emissiveIntensity: 0.12,
    flatShading: true,
    transparent: true,
    alphaTest: 0.1,
  });
  const sparkMaterial = new THREE.PointsMaterial({
    color: 0xff9488,
    size: 0.055,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.86,
  });

  materials = [
    edgeMaterial,
    faceMaterial,
    backFaceMaterial,
    sparkMaterial,
  ];

  coinGroup = new THREE.Group();
  coinGroup.rotation.z = 0.05;
  scene.add(coinGroup);

  barrel = new THREE.Mesh(barrelGeometry, edgeMaterial);
  barrel.rotation.x = Math.PI / 2;
  coinGroup.add(barrel);

  frontFace = new THREE.Mesh(faceGeometry, faceMaterial);
  frontFace.position.z = 0.171;
  coinGroup.add(frontFace);

  backFace = new THREE.Mesh(faceGeometry, backFaceMaterial);
  backFace.position.z = -0.171;
  backFace.rotation.y = Math.PI;
  coinGroup.add(backFace);

  const textureLoader = new THREE.TextureLoader();
  frontTexture = textureLoader.load(ABOUT_LOGO_PATH, () => {
    frontTexture.magFilter = THREE.NearestFilter;
    frontTexture.minFilter = THREE.NearestFilter;
    frontTexture.generateMipmaps = false;
    if ('colorSpace' in frontTexture) {
      frontTexture.colorSpace = THREE.SRGBColorSpace;
    }
    frontTexture.center.set(0.5, 0.5);
    frontTexture.repeat.set(1, 1);
    frontTexture.needsUpdate = true;

    backTexture = frontTexture.clone();
    backTexture.magFilter = THREE.NearestFilter;
    backTexture.minFilter = THREE.NearestFilter;
    backTexture.generateMipmaps = false;
    if ('colorSpace' in backTexture) {
      backTexture.colorSpace = THREE.SRGBColorSpace;
    }
    backTexture.center.set(0.5, 0.5);
    backTexture.repeat.set(-1, 1);
    backTexture.offset.set(1, 0);
    backTexture.needsUpdate = true;

    faceMaterial.map = frontTexture;
    faceMaterial.needsUpdate = true;
    backFaceMaterial.map = backTexture;
    backFaceMaterial.needsUpdate = true;
    renderFrame();
  });

  sparkGeometry = new THREE.BufferGeometry();
  const sparkCount = 28;
  const positions = new Float32Array(sparkCount * 3);
  for (let i = 0; i < sparkCount; i += 1) {
    const angle = (i / sparkCount) * TAU;
    const radius = 1.34 + (i % 3) * 0.06;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (i % 2 === 0 ? 0.15 : -0.12) + (i % 5) * 0.015;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }
  sparkGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  sparks = new THREE.Points(sparkGeometry, sparkMaterial);
  scene.add(sparks);

  const clock = new THREE.Clock();
  const animate = () => {
    if (destroyed) return;
    const t = clock.getElapsedTime();
    const bob = Math.sin(t * 1.55) * 0.18;
    const bobPhase = (Math.sin(t * 1.55) + 1) / 2;
    const spin = t * 2.02;

    if (coinGroup) {
      coinGroup.position.y = bob;
      coinGroup.rotation.y = spin;
      coinGroup.rotation.z = 0.05 + Math.sin(t * 0.7) * 0.025;
    }

    if (sparks) {
      sparks.position.y = bob * 0.85;
      sparks.rotation.y = -spin * 0.32;
    }

    keyLight.position.x = Math.cos(t * 0.6) * 3;
    keyLight.position.z = Math.sin(t * 0.6) * 3 + 1;

    if (groundShadow) {
      const scaleX = 1.12 - bobPhase * 0.24;
      const scaleY = 1.0 - bobPhase * 0.2;
      groundShadow.style.transform = `translateX(-50%) scaleX(${scaleX.toFixed(3)}) scaleY(${scaleY.toFixed(3)})`;
      groundShadow.style.opacity = `${(0.88 - bobPhase * 0.24).toFixed(3)}`;
      groundShadow.style.filter = `blur(${(6 + bobPhase * 4).toFixed(2)}px)`;
    }

    if (lightCone) {
      const lightScaleX = 0.94 + bobPhase * 0.08;
      const lightScaleY = 0.98 + bobPhase * 0.16;
      const lightY = -bobPhase * 16;
      lightCone.style.transform = `translateX(-50%) translateY(${lightY.toFixed(2)}px) scaleX(${lightScaleX.toFixed(3)}) scaleY(${lightScaleY.toFixed(3)})`;
      lightCone.style.opacity = `${(0.56 + bobPhase * 0.14).toFixed(3)}`;
    }

    renderFrame();
    rafId = window.requestAnimationFrame(animate);
  };

  resize();
  animate();

  if ('ResizeObserver' in window) {
    observer = new ResizeObserver(() => resize());
    observer.observe(host);
  } else {
    window.addEventListener('resize', resize);
  }

  return () => {
    destroyed = true;
    window.cancelAnimationFrame(rafId);
    if (observer) {
      observer.disconnect();
    } else {
      window.removeEventListener('resize', resize);
    }
    barrel?.removeFromParent();
    frontFace?.removeFromParent();
    backFace?.removeFromParent();
    sparks?.removeFromParent();
    coinGroup?.removeFromParent();
    barrelGeometry?.dispose();
    faceGeometry?.dispose();
    sparkGeometry?.dispose();
    frontTexture?.dispose();
    backTexture?.dispose();
    materials.forEach((material) => material.dispose());
    renderer?.dispose();
    host.remove();
    wrap.classList.remove('three-ready');
    stage?.classList.remove('three-ready');
    if (groundShadow) {
      groundShadow.style.removeProperty('transform');
      groundShadow.style.removeProperty('opacity');
      groundShadow.style.removeProperty('filter');
    }
    if (lightCone) {
      lightCone.style.removeProperty('transform');
      lightCone.style.removeProperty('opacity');
    }
    delete wrap.dataset.threeMounted;
  };
}

function MonitorRoot({ mode }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const cleanupAbout = mountAboutLogoScene(rootRef.current);
    loadLegacyScripts();
    return () => cleanupAbout();
  }, []);

  return (
    <div
      ref={rootRef}
      className="react-monitor-root"
      dangerouslySetInnerHTML={{ __html: monitorMarkup[mode] || monitorMarkup.pynq }}
    />
  );
}

const mode = window.__MONITOR_MODE__ === 'sim' ? 'sim' : 'pynq';
const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing #root for monitor React mount');
}

createRoot(container).render(<MonitorRoot mode={mode} />);
