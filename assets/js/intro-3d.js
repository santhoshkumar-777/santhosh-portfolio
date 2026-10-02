/**
 * SANTHOSH KUMAR - Minimal 3D Intro Animation
 * Powered by Three.js WebGL Engine
 * Features: Geometric Dual-Core 3D Wireframe, Orbiting Ring, Particle Vertices,
 *           Fluid Mouse Parallax & Smooth Camera Warp Transition into Portfolio
 */

(function () {
  'use strict';

  var container = document.getElementById('intro-3d-canvas-wrap');
  var loaderOverlay = document.getElementById('page-intro-loader');
  if (!container || !loaderOverlay || typeof THREE === 'undefined') return;

  var scene, camera, renderer, animFrameId;
  var introGroup, outerWire, innerCore, orbitRing, vertexPoints, starDust;
  var mouseX = 0, mouseY = 0;
  var targetX = 0, targetY = 0;
  var isDismissing = false;
  var isCompleted = false;
  var startTime = Date.now();

  // Prevent scroll during 3D intro
  document.body.style.overflow = 'hidden';

  function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 3000);
    camera.position.z = 480;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root 3D Object Group
    introGroup = new THREE.Group();
    scene.add(introGroup);

    // ── 1. Outer Polyhedron Wireframe (Cyan Geometric Matrix) ──
    var outerGeo = new THREE.IcosahedronGeometry(110, 1);
    var outerMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    outerWire = new THREE.Mesh(outerGeo, outerMat);
    introGroup.add(outerWire);

    // ── 2. Crystalline Inner Core (Electric Violet Octahedron) ──
    var innerGeo = new THREE.OctahedronGeometry(58, 0);
    var innerMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    innerCore = new THREE.Mesh(innerGeo, innerMat);
    introGroup.add(innerCore);

    // ── 3. High-Speed Orbit Ring ──
    var ringGeo = new THREE.TorusGeometry(150, 1.4, 16, 100);
    var ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55
    });
    orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.6;
    introGroup.add(orbitRing);

    // ── 4. Glowing Vertices at Key Nodes ──
    var vertexGeo = new THREE.IcosahedronGeometry(110, 1);
    var vertexMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 5,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    vertexPoints = new THREE.Points(vertexGeo, vertexMat);
    introGroup.add(vertexPoints);

    // ── 5. Minimal 3D Floating Particle Constellation ──
    var dustGeo = new THREE.BufferGeometry();
    var dustCount = 140;
    var dustPos = new Float32Array(dustCount * 3);
    for (var i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 800;
      dustPos[i + 1] = (Math.random() - 0.5) * 600;
      dustPos[i + 2] = (Math.random() - 0.5) * 600;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    var dustMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2.2,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    starDust = new THREE.Points(dustGeo, dustMat);
    scene.add(starDust);

    // Mouse Parallax Listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onWindowResize, false);

    // Update Status Messages
    updateStatusText();

    // Start 3D Render Loop
    animate();

    // Auto-launch warp zoom after 1.8s
    setTimeout(function () {
      triggerDismissal();
    }, 1800);
  }

  function onMouseMove(e) {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function updateStatusText() {
    var statusEl = document.getElementById('intro-3d-status-text');
    if (!statusEl) return;

    var steps = [
      { delay: 400, text: 'GENERATING 3D ENVIRONMENT...' },
      { delay: 1100, text: 'CALIBRATING FDE WORKFLOWS...' },
      { delay: 1700, text: 'SYSTEM READY // ENTERING' }
    ];

    steps.forEach(function (step) {
      setTimeout(function () {
        if (!isCompleted && statusEl) {
          statusEl.textContent = step.text;
        }
      }, step.delay);
    });
  }

  function triggerDismissal() {
    if (isDismissing || isCompleted) return;
    isDismissing = true;

    // Smoothly fade out overlay text
    var contentEl = loaderOverlay.querySelector('.intro-3d-content');
    if (contentEl) contentEl.style.transition = 'opacity 0.4s ease';
    if (contentEl) contentEl.style.opacity = '0';

    // After camera zooms into the 3D core, fade out loader
    setTimeout(function () {
      completeDismissal();
    }, 550);
  }

  function completeDismissal() {
    if (isCompleted) return;
    isCompleted = true;

    loaderOverlay.classList.add('loader-dismissed');
    document.body.style.overflow = '';

    // Trigger hero entrance
    var hero = document.getElementById('hero');
    if (hero) hero.classList.add('hero-revealed');

    // Clean up Three.js intro resources
    setTimeout(function () {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      if (loaderOverlay && loaderOverlay.parentNode) {
        loaderOverlay.style.display = 'none';
      }
    }, 850);
  }

  // Global dismiss hook (Skip button / manual click)
  window.dismiss3DIntro = function () {
    triggerDismissal();
  };

  function animate() {
    if (isCompleted) return;
    animFrameId = requestAnimationFrame(animate);

    // Parallax damping
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Normal ambient 3D rotation
    if (!isDismissing) {
      introGroup.rotation.y += 0.012;
      introGroup.rotation.x += 0.007;

      innerCore.rotation.y -= 0.022;
      innerCore.rotation.x += 0.014;

      orbitRing.rotation.z += 0.016;

      if (starDust) starDust.rotation.y += 0.0015;

      camera.position.x += (targetX * 250 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 250 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    } else {
      // ── WARP TRANSITION: Zoom through 3D object into the site ──
      camera.position.z -= (camera.position.z - 20) * 0.14;
      introGroup.scale.x += 0.05;
      introGroup.scale.y += 0.05;
      introGroup.scale.z += 0.05;
      introGroup.rotation.y += 0.035;
      introGroup.rotation.x += 0.02;

      if (outerWire.material.opacity > 0) {
        outerWire.material.opacity = Math.max(0, outerWire.material.opacity - 0.04);
        innerCore.material.opacity = Math.max(0, innerCore.material.opacity - 0.04);
        orbitRing.material.opacity = Math.max(0, orbitRing.material.opacity - 0.04);
      }
    }

    renderer.render(scene, camera);
  }

  // Run on DOM ready or immediate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
