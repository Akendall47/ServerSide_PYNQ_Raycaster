import * as THREE from 'three';

export function buildRunnerModel(group, pColor) {
  const body = new THREE.MeshStandardMaterial({ color: pColor, metalness: 0.25, roughness: 0.5, emissive: pColor.clone().multiplyScalar(0.12) });
  const dark = new THREE.MeshStandardMaterial({ color: pColor.clone().multiplyScalar(0.35), metalness: 0.4, roughness: 0.35 });
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 });
  const visor = new THREE.MeshStandardMaterial({ color: 0x001122, metalness: 0.9, roughness: 0.08, emissive: pColor, emissiveIntensity: 0.25 });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.72), body);
  head.position.y = 2.0;
  group.add(head);
  const visorBand = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.2, 0.12), visor);
  visorBand.position.set(0, 1.96, 0.34);
  group.add(visorBand);
  for (const sx of [-0.14, 0.14]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.06), white);
    eye.position.set(sx, 2.0, 0.38);
    group.add(eye);
  }
  const antenna = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), body);
  antenna.position.set(0, 2.58, 0);
  group.add(antenna);
  const tip = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.14, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: pColor, emissiveIntensity: 1.2 }),
  );
  tip.position.set(0, 2.86, 0);
  group.add(tip);
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.88, 0.52), dark);
  torso.position.y = 1.18;
  group.add(torso);
  for (const sy of [1.3, 1.05]) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.08, 0.54), body);
    stripe.position.y = sy;
    group.add(stripe);
  }
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.65, 0.22), body);
    arm.position.set(sx * 0.52, 1.28, 0);
    group.add(arm);
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), dark);
    hand.position.set(sx * 0.52, 0.86, 0);
    group.add(hand);
  }
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.28), dark);
    leg.position.set(sx * 0.2, 0.42, 0);
    group.add(leg);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.42), body);
    boot.position.set(sx * 0.2, 0.08, 0.06);
    group.add(boot);
  }
}

export function buildTaggerModel(group, pColor) {
  const body = new THREE.MeshStandardMaterial({ color: pColor, metalness: 0.35, roughness: 0.4, emissive: pColor.clone().multiplyScalar(0.15) });
  const dark = new THREE.MeshStandardMaterial({ color: pColor.clone().multiplyScalar(0.3), metalness: 0.5, roughness: 0.3 });
  const angry = new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 0.6 });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.68, 0.72), body);
  head.position.y = 2.0;
  group.add(head);
  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.14), dark);
  brow.position.set(0, 2.12, 0.34);
  group.add(brow);
  for (const sx of [-0.16, 0.16]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.06), angry);
    eye.position.set(sx, 2.02, 0.38);
    group.add(eye);
  }
  for (let index = 0; index < 3; index += 1) {
    const spike = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22 + index * 0.06, 0.1), body);
    spike.position.set(-0.22 + index * 0.22, 2.5 + index * 0.04, 0);
    group.add(spike);
  }
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.95, 0.58), dark);
  torso.position.y = 1.16;
  group.add(torso);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.12), body);
  plate.position.set(0, 1.3, 0.3);
  group.add(plate);
  const xbar1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.04), angry);
  xbar1.position.set(0, 1.3, 0.37);
  xbar1.rotation.z = 0.7;
  group.add(xbar1);
  const xbar2 = xbar1.clone();
  xbar2.rotation.z = -0.7;
  group.add(xbar2);
  for (const sx of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.7, 0.28), body);
    arm.position.set(sx * 0.6, 1.25, 0);
    group.add(arm);
    const fist = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), dark);
    fist.position.set(sx * 0.6, 0.8, 0);
    group.add(fist);
  }
  for (const sx of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.6, 0.32), dark);
    leg.position.set(sx * 0.22, 0.38, 0);
    group.add(leg);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.46), body);
    boot.position.set(sx * 0.22, 0.06, 0.06);
    group.add(boot);
  }
}

export function buildGhostModel(group, pColor) {
  const ghostMat = (opacity = 0.7, emInt = 0.3) => new THREE.MeshStandardMaterial({
    color: pColor,
    metalness: 0.1,
    roughness: 0.6,
    emissive: pColor,
    emissiveIntensity: emInt,
    transparent: true,
    opacity,
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
    mesh.position.y = slice.y;
    group.add(mesh);
  });

  const core = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.45, 0.35),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: pColor,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.35,
    }),
  );
  core.position.y = 1.7;
  group.add(core);

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
    eyeWhiteMesh.position.set(sx, 2.12, 0.42);
    group.add(eyeWhiteMesh);
    const pupilMesh = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.06), pupil);
    pupilMesh.position.set(sx + 0.04, 2.1, 0.5);
    group.add(pupilMesh);
  }
}
