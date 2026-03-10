import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const ABOUT_LOGO_PATH = '/BNW_LOGO.png';

function createTightLogoTexture(sourceImage) {
  const width = sourceImage.naturalWidth || sourceImage.videoWidth || sourceImage.width;
  const height = sourceImage.naturalHeight || sourceImage.videoHeight || sourceImage.height;

  if (!width || !height) {
    return new THREE.Texture(sourceImage);
  }

  const scanCanvas = document.createElement('canvas');
  scanCanvas.width = width;
  scanCanvas.height = height;
  const scanCtx = scanCanvas.getContext('2d', { willReadFrequently: true });
  if (!scanCtx) {
    return new THREE.Texture(sourceImage);
  }

  scanCtx.drawImage(sourceImage, 0, 0, width, height);
  const imageData = scanCtx.getImageData(0, 0, width, height);
  const { data } = imageData;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const alpha = data[offset + 3];
      const brightness = Math.max(data[offset], data[offset + 1], data[offset + 2]);
      if (alpha > 8 && brightness > 12) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    minX = 0;
    minY = 0;
    maxX = width - 1;
    maxY = height - 1;
  }

  const boundsWidth = maxX - minX + 1;
  const boundsHeight = maxY - minY + 1;
  const padding = Math.max(4, Math.round(Math.max(boundsWidth, boundsHeight) * 0.02));
  const cropSize = Math.min(
    Math.max(width, height),
    Math.max(boundsWidth, boundsHeight) + padding * 2,
  );

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  let cropX = Math.round(centerX - cropSize / 2);
  let cropY = Math.round(centerY - cropSize / 2);

  cropX = Math.max(0, Math.min(width - cropSize, cropX));
  cropY = Math.max(0, Math.min(height - cropSize, cropY));

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = cropSize;
  outputCanvas.height = cropSize;
  const outputCtx = outputCanvas.getContext('2d');
  if (!outputCtx) {
    return new THREE.Texture(sourceImage);
  }

  outputCtx.clearRect(0, 0, cropSize, cropSize);
  outputCtx.drawImage(
    sourceImage,
    cropX,
    cropY,
    cropSize,
    cropSize,
    0,
    0,
    cropSize,
    cropSize,
  );

  return new THREE.CanvasTexture(outputCanvas);
}

function configureLogoTexture(texture) {
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  if ('colorSpace' in texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  texture.center.set(0.5, 0.5);
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
}

export function mountPYNQCASTCoin(rootEl) {
  const wrap = rootEl?.querySelector('.about-sprite-wrap');
  const img = wrap?.querySelector('.about-logo-sprite');
  const stage = rootEl?.querySelector('.about-stage');
  const lightCone = stage?.querySelector('.about-light-cone');

  if (!wrap || !img || wrap.dataset.threeMounted === '1') {
    return () => {};
  }

  wrap.dataset.threeMounted = '1';
  wrap.classList.add('three-ready');
  stage?.classList.add('three-ready');

  const coinStage = document.createElement('div');
  coinStage.className = 'about-coin-stage';
  wrap.appendChild(coinStage);

  const host = document.createElement('div');
  host.className = 'about-3d-host';
  coinStage.appendChild(host);
  const groundShadow = document.createElement('div');
  groundShadow.id = 'ground-shadow';
  coinStage.appendChild(groundShadow);

  let destroyed = false;
  let rafId = 0;
  let observer = null;
  let renderer = null;
  let scene = null;
  let camera = null;
  let envTarget = null;
  let coinGroup = null;
  let edge = null;
  let frontFill = null;
  let backFill = null;
  let front = null;
  let back = null;
  let frontTexture = null;
  let backTexture = null;
  let edgeGeo = null;
  let frontFillGeo = null;
  let backFillGeo = null;
  let frontGeo = null;
  let backGeo = null;
  let materials = [];

  const renderFrame = () => {
    if (!renderer || !scene || !camera) return;
    renderer.render(scene, camera);
  };

  const resize = () => {
    if (!renderer || !camera) return;
    const width = Math.max(280, Math.round(host.clientWidth || 480));
    const height = Math.max(280, Math.round(host.clientHeight || width));
    const renderWidth = Math.max(1, Math.floor(width / 6));
    const renderHeight = Math.max(1, Math.floor(height / 6));
    renderer.setSize(renderWidth, renderHeight, false);
    renderer.domElement.style.width = `${width}px`;
    renderer.domElement.style.height = `${height}px`;
    renderer.domElement.style.imageRendering = 'pixelated';
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
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;
  } catch (error) {
    console.error('[monitor-ui] failed to create WebGL renderer:', error);
    wrap.dataset.threeMounted = '0';
    wrap.classList.remove('three-ready');
    stage?.classList.remove('three-ready');
    coinStage.remove();
    host.remove();
    groundShadow.remove();
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

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  envTarget = pmremGenerator.fromScene(new RoomEnvironment());
  scene.environment = envTarget.texture;
  scene.background = null;
  pmremGenerator.dispose();

  const ambient = new THREE.AmbientLight(0xffeedd, 1.2);
  scene.add(ambient);

  const keyLight = new THREE.PointLight(0xF05A50, 80, 14);
  keyLight.position.set(2.5, 3, 3);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x4466cc, 20, 12);
  fillLight.position.set(-3, -1, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xFF7766, 50, 10);
  rimLight.position.set(0, -2.5, -3);
  scene.add(rimLight);

  const glintLight = new THREE.PointLight(0xffffff, 120, 6);
  glintLight.position.set(1, 1.5, 2);
  scene.add(glintLight);

  edgeGeo = new THREE.CylinderGeometry(1.14, 1.14, 0.14, 32, 1, true);
  frontFillGeo = new THREE.CircleGeometry(1.13, 32);
  backFillGeo = new THREE.CircleGeometry(1.13, 32);
  frontGeo = new THREE.CircleGeometry(1.14, 32);
  backGeo = new THREE.CircleGeometry(1.14, 32);

  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x7d2429,
    metalness: 0.95,
    roughness: 0.05,
    emissive: new THREE.Color('#260709'),
    emissiveIntensity: 0.22,
    transparent: false,
    depthWrite: true,
  });
  const faceMaterial = new THREE.MeshStandardMaterial({
    map: null,
    metalness: 0.85,
    roughness: 0.08,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.25,
    transparent: true,
    alphaTest: 0.1,
    depthWrite: true,
    side: THREE.FrontSide,
  });
  const backFaceMaterial = new THREE.MeshStandardMaterial({
    map: null,
    metalness: 0.85,
    roughness: 0.08,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.25,
    transparent: true,
    alphaTest: 0.1,
    depthWrite: true,
    side: THREE.FrontSide,
  });
  const fillMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a0508,
    metalness: 0.9,
    roughness: 0.05,
    emissive: new THREE.Color('#000000'),
    emissiveIntensity: 0.0,
    transparent: false,
    depthWrite: true,
  });
  materials = [edgeMaterial, faceMaterial, backFaceMaterial, fillMaterial];

  coinGroup = new THREE.Group();
  coinGroup.rotation.z = 0.05;
  scene.add(coinGroup);

  edge = new THREE.Mesh(edgeGeo, edgeMaterial);
  edge.rotation.x = Math.PI / 2;
  coinGroup.add(edge);

  frontFill = new THREE.Mesh(frontFillGeo, fillMaterial);
  frontFill.position.z = 0.065;
  coinGroup.add(frontFill);

  backFill = new THREE.Mesh(backFillGeo, fillMaterial);
  backFill.position.z = -0.065;
  backFill.rotation.y = Math.PI;
  coinGroup.add(backFill);

  front = new THREE.Mesh(frontGeo, faceMaterial);
  front.position.z = 0.07;
  coinGroup.add(front);

  back = new THREE.Mesh(backGeo, backFaceMaterial);
  back.position.z = -0.07;
  back.rotation.y = Math.PI;
  coinGroup.add(back);

  const textureLoader = new THREE.TextureLoader();
  frontTexture = textureLoader.load(ABOUT_LOGO_PATH, () => {
    const croppedFrontTexture = createTightLogoTexture(frontTexture.image);
    frontTexture.dispose();
    frontTexture = croppedFrontTexture;
    configureLogoTexture(frontTexture);

    backTexture = frontTexture.clone();
    configureLogoTexture(backTexture);
    backTexture.repeat.set(-1, 1);
    backTexture.offset.set(1, 0);
    backTexture.needsUpdate = true;

    faceMaterial.map = frontTexture;
    faceMaterial.needsUpdate = true;
    backFaceMaterial.map = backTexture;
    backFaceMaterial.needsUpdate = true;
    renderFrame();
  });

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

    keyLight.position.x = Math.cos(t * 0.6) * 3;
    keyLight.position.z = Math.sin(t * 0.6) * 3 + 1;
    glintLight.position.x = Math.cos(t * 2.5) * 2;
    glintLight.position.y = Math.sin(t * 1.8) * 1.5;
    glintLight.position.z = 2;

    if (groundShadow) {
      const bobPhase = (Math.sin(t * 1.55) + 1) / 2;
      document.getElementById('ground-shadow').style.transform =
        `translateX(-50%) scaleX(${(0.88 + bobPhase * 0.28).toFixed(3)}) scaleY(${(0.7 + bobPhase * 0.3).toFixed(3)})`;
      document.getElementById('ground-shadow').style.opacity =
        (0.4 + bobPhase * 0.45).toFixed(3);
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
    edge?.removeFromParent();
    frontFill?.removeFromParent();
    backFill?.removeFromParent();
    front?.removeFromParent();
    back?.removeFromParent();
    coinGroup?.removeFromParent();
    edgeGeo?.dispose();
    frontFillGeo?.dispose();
    backFillGeo?.dispose();
    frontGeo?.dispose();
    backGeo?.dispose();
    frontTexture?.dispose();
    backTexture?.dispose();
    envTarget?.dispose();
    materials.forEach((material) => material.dispose());
    renderer?.dispose();
    coinStage.remove();
    wrap.classList.remove('three-ready');
    stage?.classList.remove('three-ready');
    if (lightCone) {
      lightCone.style.removeProperty('transform');
      lightCone.style.removeProperty('opacity');
    }
    delete wrap.dataset.threeMounted;
  };
}
