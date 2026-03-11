import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';

const WHITE_LOGO_TEXTURE = '/assets/pynqcast-white.png';

class RoomEnvironment extends THREE.Scene {
  constructor() {
    super();
    const geo = new THREE.BoxGeometry();
    geo.deleteAttribute('uv');
    const room = new THREE.Mesh(geo, [
      new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.BackSide }),
      new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.BackSide }),
      new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.BackSide }),
      new THREE.MeshStandardMaterial({ color: 0x444444, side: THREE.BackSide }),
      new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.BackSide }),
      new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.BackSide }),
    ]);
    room.scale.setScalar(10);
    this.add(room);
    const l1 = new THREE.PointLight(0xff4400, 2, 20); l1.position.set(5, 5, 5);   this.add(l1);
    const l2 = new THREE.PointLight(0x0044ff, 1, 20); l2.position.set(-5, 5, -5); this.add(l2);
    const l3 = new THREE.PointLight(0xffffff, 1, 20); l3.position.set(0, 10, 0);  this.add(l3);
  }
}

function BoardStage({ hostSlot }) {
  const stageRef = useRef(null);
  const mountRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const mount = mountRef.current;
    const shadow = shadowRef.current;
    const wrap = hostSlot?.closest('.about-sprite-wrap');
    if (!stage || !mount || !shadow || !wrap) return () => {};

    wrap.classList.add('board-ready');

    const W = Math.max(420, Math.round(stage.clientWidth || 620));
    const H = Math.max(420, Math.round(stage.clientHeight || 420));

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(Math.floor(W / 4), Math.floor(H / 4));
    renderer.domElement.style.width = `${W}px`;
    renderer.domElement.style.height = `${H}px`;
    renderer.domElement.style.imageRendering = 'pixelated';
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Environment map ──
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromScene(new RoomEnvironment()).texture;
    pmrem.dispose();

    const scene = new THREE.Scene();
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0.2, 6.2);
    camera.lookAt(0, 0, 0);

    // ── Lights — scaled for Three.js r183 physical units ──
    scene.add(new THREE.AmbientLight(0x330000, 8));

    const redKey   = new THREE.PointLight(0xbb1500, 600, 16);
    const glint1   = new THREE.PointLight(0xffffff, 400,  7);
    const glint2   = new THREE.PointLight(0xffeedd, 300,  6);
    const rimLight = new THREE.PointLight(0x1133aa, 150, 10);

    redKey.position.set(2.5, 1.8, 3);
    glint1.position.set(1, 1.5, 2.5);
    glint2.position.set(-1.6, 1.1, 2.0);
    rimLight.position.set(-2.4, 1.6, -2.8);

    scene.add(redKey);
    scene.add(glint1);
    scene.add(glint2);
    scene.add(rimLight);

    // ── Materials ──
    const pcbFaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x450406,
      metalness: 0.85,
      roughness: 0.08,
      emissive: new THREE.Color('#120002'),
      emissiveIntensity: 0.38,
      envMapIntensity: 1.8,
    });
    const pcbEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a0002,
      metalness: 0.8,
      roughness: 0.15,
      envMapIntensity: 1.2,
    });
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFB800,
      metalness: 1.0,
      roughness: 0.04,
      emissive: new THREE.Color('#221100'),
      emissiveIntensity: 0.15,
      envMapIntensity: 2.5,
    });
    const ledMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff44,
      emissive: new THREE.Color('#00ff44'),
      emissiveIntensity: 0.8,
      metalness: 0.0,
      roughness: 0.5,
    });

    // ── Board geometry ──
    const board = new THREE.Group();
    board.scale.setScalar(1.22);
    scene.add(board);

    const boardBase = new THREE.Mesh(new THREE.BoxGeometry(3.55, 2.3, 0.16), pcbEdgeMaterial);
    board.add(boardBase);

    const boardCore = new THREE.Mesh(new THREE.BoxGeometry(3.35, 2.1, 0.11), pcbFaceMaterial);
    boardCore.position.z = 0.03;
    board.add(boardCore);

    const boardBack = new THREE.Mesh(new THREE.BoxGeometry(3.35, 2.1, 0.11), pcbFaceMaterial);
    boardBack.position.z = -0.03;
    board.add(boardBack);

    // ── Traces ──
    const addTrace = (x, y, width, height, depth = 0.012) => {
      const trace = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), goldMaterial);
      trace.position.set(x, y, 0.09);
      board.add(trace);
    };
    addTrace(-0.12,  0.56, 0.64, 0.03);
    addTrace( 0.42,  0.56, 0.46, 0.03);
    addTrace( 0.72,  0.48, 0.03, 0.18);
    addTrace( 0.98,  0.48, 0.22, 0.03);
    addTrace(-0.78,  0.10, 0.36, 0.03);
    addTrace(-0.94,  0.02, 0.03, 0.46);
    addTrace(-0.84, -0.18, 0.20, 0.03);
    addTrace( 0.12,  0.10, 0.72, 0.03);
    addTrace( 0.82,  0.02, 0.03, 0.70);
    addTrace( 0.60, -0.24, 0.42, 0.03);
    addTrace(-0.30, -0.22, 0.03, 0.48);
    addTrace(-0.08, -0.56, 1.08, 0.03);
    addTrace(-1.18, -0.64, 0.03, 0.20);
    addTrace(-1.04, -0.72, 0.24, 0.03);
    addTrace( 0.92, -0.74, 0.03, 0.28);
    addTrace( 1.08, -0.60, 0.28, 0.03);
    addTrace(-0.82,  0.84, 1.22, 0.026);
    addTrace(-0.14,  0.94, 0.026, 0.12);
    addTrace(-1.34,  0.32, 0.03, 0.86);
    addTrace( 1.30,  0.26, 0.03, 0.74);

    // ── Large Zynq SoC and supporting components ──
    const fpga = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.12), pcbEdgeMaterial);
    fpga.position.set(-0.3, 0.1, 0.14);
    board.add(fpga);

    const fpgaInset = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.03), pcbFaceMaterial);
    fpgaInset.position.set(-0.3, 0.1, 0.21);
    board.add(fpgaInset);

    const ddr = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.38, 0.08), pcbEdgeMaterial);
    ddr.position.set(0.95, 0.55, 0.12);
    board.add(ddr);

    for (let i = 0; i < 3; i++) {
      const vreg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.10), pcbEdgeMaterial);
      vreg.position.set(-1.2 + i * 0.26, -0.7, 0.13);
      board.add(vreg);
    }

    const usb = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.20), pcbEdgeMaterial);
    usb.position.set(1.6, 0.2, 0.14);
    board.add(usb);

    const hdmi = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.18), pcbEdgeMaterial);
    hdmi.position.set(1.6, -0.15, 0.14);
    board.add(hdmi);

    const eth = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.22), pcbEdgeMaterial);
    eth.position.set(1.6, 0.6, 0.14);
    board.add(eth);

    for (let i = 0; i < 2; i++) {
      const pmod = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.48, 0.10), pcbEdgeMaterial);
      pmod.position.set(-1.6, 0.3 - i * 0.6, 0.12);
      board.add(pmod);
    }

    const ardu = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.10, 0.08), pcbEdgeMaterial);
    ardu.position.set(0.1, 1.08, 0.12);
    board.add(ardu);

    const pwrJack = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.24), pcbEdgeMaterial);
    pwrJack.position.set(-1.45, -0.95, 0.16);
    board.add(pwrJack);

    const sd = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.10), goldMaterial);
    sd.position.set(0.9, -1.02, 0.10);
    board.add(sd);

    for (let i = 0; i < 4; i++) {
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.05), ledMaterial);
      led.position.set(0.3 + i * 0.12, 0.75, 0.18);
      board.add(led);
    }

    for (let i = 0; i < 2; i++) {
      const btn = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, 0.08), pcbEdgeMaterial);
      btn.position.set(0.55 + i * 0.18, -0.55, 0.14);
      board.add(btn);
    }

    // ── Headers and connectors ──
    for (let i = 0; i < 14; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.12), goldMaterial);
      pin.position.set(-1.1 + i * 0.18, 1.1, 0.1);
      board.add(pin);
      const pin2 = pin.clone();
      pin2.position.y = 1.18;
      board.add(pin2);
    }

    for (let i = 0; i < 18; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.18, 0.04), goldMaterial);
      pin.position.set(-1.28 + i * 0.145, -1.08, 0.06);
      board.add(pin);
    }

    // ── Logo texture ──
    const loader = new THREE.TextureLoader();
    const tex = loader.load(WHITE_LOGO_TEXTURE, () => {
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.generateMipmaps = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
    });

    const logoMaterial = new THREE.MeshStandardMaterial({
      map: tex,
      color: 0xffffff,
      metalness: 0.18,
      roughness: 0.36,
      emissive: new THREE.Color('#220000'),
      emissiveIntensity: 0.2,
      transparent: true,
      alphaTest: 0.08,
    });

    // Back logo — flipped outward
    const logoPlaneBack = new THREE.Mesh(new THREE.PlaneGeometry(3.28, 2.0), logoMaterial);
    logoPlaneBack.position.set(0.04, 0.04, -0.106);
    logoPlaneBack.rotation.y = Math.PI;
    board.add(logoPlaneBack);

    // ── Cleanup arrays ──
    const materials = [pcbFaceMaterial, pcbEdgeMaterial, goldMaterial, ledMaterial, logoMaterial];
    const geometries = [
      boardBase.geometry, boardCore.geometry, boardBack.geometry,
      logoPlaneBack.geometry,
    ];
    const staticMeshes = [boardBase, boardCore, boardBack, logoPlaneBack];
    board.children.forEach((child) => {
      if (!staticMeshes.includes(child)) {
        geometries.push(child.geometry);
      }
    });

    // ── Animation ──
    let rafId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      const t = clock.getElapsedTime();
      const bob = Math.sin(t * 1.4);
      const bobPhase = (bob + 1) / 2;

      board.rotation.y = t * 1.1;
      board.rotation.x = 0.25 + Math.sin(t * 0.5) * 0.08;
      board.rotation.z = Math.sin(t * 0.7) * 0.06;
      board.position.y = 0.22 + bob * 0.18;

      redKey.position.x = Math.cos(t * 0.6) * 4;
      redKey.position.z = Math.sin(t * 0.6) * 4 + 2;
      glint1.position.x = Math.cos(t * 2.2) * 2.5;
      glint1.position.y = Math.sin(t * 1.6) * 2.0;
      glint1.position.z = 2.5;
      glint2.position.x = Math.cos(t * 1.8 + Math.PI) * 2.0;
      glint2.position.y = Math.sin(t * 2.1 + Math.PI) * 1.5;
      glint2.position.z = 2.0;

      shadow.style.transform =
        `translateX(-50%) scaleX(${(0.88 + bobPhase * 0.28).toFixed(3)}) scaleY(${(0.7 + bobPhase * 0.3).toFixed(3)})`;
      shadow.style.opacity = (0.4 + bobPhase * 0.45).toFixed(3);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      wrap.classList.remove('board-ready');
      cancelAnimationFrame(rafId);
      tex.dispose();
      envMap.dispose();
      materials.forEach((m) => m.dispose());
      geometries.forEach((g) => g?.dispose());
      renderer.dispose();
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [hostSlot]);

  return (
    <div ref={stageRef} style={{ width: '100%', height: 420, position: 'relative', overflow: 'visible' }}>
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'visible',
          transform: 'translateY(-88px)',
        }}
      />
      <div
        ref={shadowRef}
        style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          width: 240,
          height: 22,
          background: 'radial-gradient(ellipse at center, rgba(180,20,20,0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}

export default function PYNQBoard({ hostRef }) {
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    const target = hostRef?.current?.querySelector('.about-react-board-slot');
    setPortalTarget(target || null);
  }, [hostRef]);

  if (!portalTarget) return null;

  return createPortal(<BoardStage hostSlot={portalTarget} />, portalTarget);
}
