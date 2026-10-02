/**
 * SANTHOSH KUMAR - 3D Three.js Background
 * Clean: White starfield + 3 subtle colour accents at fixed world spots
 */

(function () {
  const container = document.getElementById('webgl-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  let scene, camera, renderer;
  let particlesMesh, ringMesh, coreIcosahedron;
  let colorOrbs = [];
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  let time = 0;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 600;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles removed per user request (Clean Background)
    particlesMesh = null;

    // ── 2. CORE WIREFRAME (Indigo, subtle floating geometric wireframe) ──
    const coreGeo = new THREE.IcosahedronGeometry(110, 2);
    coreIcosahedron = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    }));
    coreIcosahedron.position.set(180, 40, -120);
    scene.add(coreIcosahedron);

    // ── 3. TORUS RING (Cyan, subtle floating ring) ──
    const ringGeo = new THREE.TorusGeometry(170, 1.2, 16, 100);
    ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.16,
    }));
    ringMesh.position.copy(coreIcosahedron.position);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // ── 4. SOFT PASTEL LIGHT ORBS — floating light accents for white theme ──
    const spots = [
      { pos: [-340, 210, -320], color: 0x6366f1, size: 110, opacity: 0.12 }, // Indigo — top-left
      { pos: [ 380, -160, -260], color: 0xec4899, size: 90,  opacity: 0.10 }, // Rose Pink — right
      { pos: [ 80,  -250, -380], color: 0x0284c7, size: 95,  opacity: 0.12 }, // Cyan — bottom center
    ];

    spots.forEach((spot, idx) => {
      // Outer glow
      const outer = new THREE.Mesh(
        new THREE.SphereGeometry(spot.size * 1.7, 12, 12),
        new THREE.MeshBasicMaterial({
          color: spot.color,
          transparent: true,
          opacity: spot.opacity * 0.4,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      outer.position.set(...spot.pos);
      scene.add(outer);

      // Inner core
      const inner = new THREE.Mesh(
        new THREE.SphereGeometry(spot.size * 0.45, 12, 12),
        new THREE.MeshBasicMaterial({
          color: spot.color,
          transparent: true,
          opacity: spot.opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      inner.position.set(...spot.pos);
      scene.add(inner);

      colorOrbs.push({
        outer, inner,
        basePos: [...spot.pos],
        baseOpaOuter: spot.opacity * 0.4,
        baseOpaInner: spot.opacity,
        phase: idx * 1.1,
      });
    });

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, false);
    window.addEventListener('scroll', onScroll, { passive: true });

    animate();
  }

  function onMouseMove(e) {
    mouseX = (e.clientX - windowHalfX) * 0.25;
    mouseY = (e.clientY - windowHalfY) * 0.25;
  }

  function onScroll() {
    const sy = window.scrollY;
    if (coreIcosahedron) {
      coreIcosahedron.position.y = 40 - sy * 0.15;
      ringMesh.position.y        = 40 - sy * 0.15;
    }
    colorOrbs.forEach((orb, i) => {
      const drift = sy * (0.05 + i * 0.02);
      if (orb.outer) orb.outer.position.y = orb.basePos[1] - drift;
      if (orb.inner) orb.inner.position.y = orb.basePos[1] - drift;
    });
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    time += 0.008;

    // Detect scroll position relative to FDE section
    const fdeEl = document.getElementById('fde-section') || document.getElementById('about');
    let fdeScrollRatio = 0;
    if (fdeEl) {
      const rect = fdeEl.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        // Section is in view! Calculate ratio 0 to 1
        const centerOffset = Math.abs((rect.top + rect.height / 2) - windowH / 2);
        fdeScrollRatio = 1 - (centerOffset / (windowH * 0.8));
        fdeScrollRatio = Math.max(0, Math.min(1, fdeScrollRatio));
      }
    }

    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (-targetY - camera.position.y) * 0.025;
    camera.lookAt(scene.position);

    const speedBoost = 1 + fdeScrollRatio * 2.5;

    if (particlesMesh) {
      particlesMesh.rotation.y += 0.0004 * speedBoost;
      particlesMesh.rotation.x += 0.0002 * speedBoost;
      particlesMesh.scale.z = 1 + fdeScrollRatio * 0.35;
    }
    if (coreIcosahedron) {
      coreIcosahedron.rotation.x += 0.0025 * speedBoost;
      coreIcosahedron.rotation.y += 0.003 * speedBoost;
      coreIcosahedron.material.opacity = 0.09 + fdeScrollRatio * 0.16;
      coreIcosahedron.scale.setScalar(1 + fdeScrollRatio * 0.3);
    }
    if (ringMesh) {
      ringMesh.rotation.z += 0.004 * speedBoost;
      ringMesh.rotation.y -= 0.002 * speedBoost;
      ringMesh.material.opacity = 0.13 + fdeScrollRatio * 0.20;
      ringMesh.scale.setScalar(1 + fdeScrollRatio * 0.25);
    }

    // Dynamic section scroll background atmosphere shift
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

    // Interpolate target hues per section slide (Hero -> FDE -> About -> Services -> Projects)
    let targetHue = 0.55; // Default Cyan
    if (scrollProgress < 0.18) {
      targetHue = 0.55; // Hero: Electric Cyan
    } else if (scrollProgress < 0.38) {
      targetHue = 0.76; // FDE: Electric Violet / Purple
    } else if (scrollProgress < 0.58) {
      targetHue = 0.92; // About: Magenta / Deep Pink
    } else if (scrollProgress < 0.78) {
      targetHue = 0.45; // Services: Emerald / Teal
    } else {
      targetHue = 0.62; // Projects: Sapphire Blue
    }

    // Dynamic color orb reaction & smooth HSL color lerp on scroll
    colorOrbs.forEach((orb, i) => {
      const pulse = Math.sin(time * 1.5 * speedBoost + orb.phase) * 0.5 + 0.5;
      const float = Math.sin(time * 0.8 + orb.phase) * 12;

      const orbHue = (targetHue + i * 0.14) % 1.0;
      const targetColor = new THREE.Color().setHSL(orbHue, 0.85, 0.55);

      const boostOpaOuter = orb.baseOpaOuter * (1 + fdeScrollRatio * 1.5);
      const boostOpaInner = orb.baseOpaInner * (1 + fdeScrollRatio * 1.5);

      if (orb.outer) {
        orb.outer.material.color.lerp(targetColor, 0.035);
        orb.outer.material.opacity = boostOpaOuter * (0.6 + 0.4 * pulse);
        orb.outer.position.y = orb.basePos[1] + float - window.scrollY * 0.05;
        orb.outer.scale.setScalar(0.94 + 0.35 * fdeScrollRatio + 0.06 * pulse);
      }
      if (orb.inner) {
        orb.inner.material.color.lerp(targetColor, 0.035);
        orb.inner.material.opacity = boostOpaInner * (0.75 + 0.25 * pulse);
        orb.inner.position.y = orb.basePos[1] + float * 0.5 - window.scrollY * 0.05;
        orb.inner.scale.setScalar(1 + fdeScrollRatio * 0.4);
      }
    });

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
