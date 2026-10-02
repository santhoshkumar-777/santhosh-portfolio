/**
 * SANTHOSH KUMAR - Main Application Logic & Interactivity
 * Includes: SFX, Typewriter, Projects, Modals, HR Menu,
 *           EmailJS Contact, Toast, Reveal, Back-to-Top,
 *           Scroll Progress, Active Nav
 */

// ─── EmailJS Initialization ───────────────────────────────────────────────────
if (typeof emailjs !== 'undefined') {
  emailjs.init("Oh607FW11K0ukZKuA");
}

// ─── 1. Web Audio API SFX ─────────────────────────────────────────────────────
class SoundFX {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  initContext() {}

  playClick() {
    // Sound disabled
  }

  toggle() {
    this.enabled = false;
    return false;
  }
}

const sfx = new SoundFX();

// ─── 2. Typewriter Effect ─────────────────────────────────────────────────────
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const roles = [
    'Forward Deployed Engineer (FDE)',
    'Enterprise RAG & Agent Engineer',
    'AI Solutions Deployment Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeStep() {
    const current = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      el.textContent = current.substring(0, charIdx);
    } else {
      charIdx++;
      el.textContent = current.substring(0, charIdx);
    }

    let delay = isDeleting ? 35 : 70;

    if (!isDeleting && charIdx === current.length) {
      delay = 2000; // Pause when complete
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400; // Pause before typing next role
    }

    setTimeout(typeStep, delay);
  }

  typeStep();
}

// ─── 3. Project Gallery Rendering & Filtering ─────────────────────────────────
function initProjectGallery() {
  const container = document.getElementById('projects-container');
  if (!container || typeof PROJECTS_DATA === 'undefined') return;

  function renderProjects(filter) {
    container.innerHTML = '';
    const filtered = filter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.category === filter);

    filtered.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-category', p.category);
      card.style.animationDelay = idx * 0.08 + 's';

      const tagsHtml = p.techStack.slice(0, 4)
        .map(t => '<span class="project-tag">' + t + '</span>').join('');

      card.innerHTML =
        '<div class="project-card-image">' +
          '<img src="' + p.heroImage + '" alt="' + p.title + '" loading="lazy" />' +
          '<span class="project-badge-pill">' + p.badge + '</span>' +
        '</div>' +
        '<div class="project-card-content">' +
          '<div class="project-card-tagline">' + p.categoryLabel + '</div>' +
          '<h3 class="project-card-title">' + p.title + '</h3>' +
          '<p class="project-card-desc">' + p.shortDesc + '</p>' +
          '<div class="project-tech-tags">' + tagsHtml + '</div>' +
          '<div class="project-card-footer">' +
            '<a href="project-details.html?id=' + p.id + '" class="btn btn-primary btn-sm sfx-btn" style="flex:1;"><span>Deep Dive</span> \u2794</a>' +
            '<a href="' + p.githubUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm sfx-btn" title="View Source on GitHub"><span>GitHub</span></a>' +
          '</div>' +
        '</div>';

      container.appendChild(card);
    });
    attachSFXListeners();
  }

  document.querySelectorAll('.filter-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      sfx.playClick(800, 0.05);
      renderProjects(tab.getAttribute('data-filter'));
    });
  });

  renderProjects('all');
}

// ─── 4. Modal System ──────────────────────────────────────────────────────────
function setupModals() {
  document.querySelectorAll('[data-modal-target]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var modal = document.getElementById(btn.getAttribute('data-modal-target'));
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        sfx.playClick(700, 0.06);
      }
    });
  });

  document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (e.target === btn || btn.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.modal-overlay.active').forEach(function(m) { m.classList.remove('active'); });
        document.body.style.overflow = '';
        sfx.playClick(400, 0.04);
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(function(m) { m.classList.remove('active'); });
      document.body.style.overflow = '';
    }
  });
}

// ─── 5. HR Quick Menu ────────────────────────────────────────────────────────
function initHRMenu() {
  var trigger  = document.getElementById('hr-menu-trigger');
  var dropdown = document.getElementById('hr-dropdown');
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    sfx.playClick(900, 0.05);
  });
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target) && e.target !== trigger)
      dropdown.classList.remove('open');
  });
}

// ─── 6. SFX Hover Listeners ───────────────────────────────────────────────────
function attachSFXListeners() {
  document.querySelectorAll('a, button, .sfx-btn, .filter-tab').forEach(function(el) {
    el.addEventListener('mouseenter', function() { sfx.playClick(1200, 0.015); });
  });
}

// ─── 7. Navbar Scroll State ───────────────────────────────────────────────────
function initNavbar() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  var menuBtn  = document.getElementById('mobile-menu-btn');
  var navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.toggle('show-mobile');
      menuBtn.textContent = isOpen ? '✕' : '☰';
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      sfx.playClick(750, 0.04);
    });

    // Auto-close when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show-mobile');
        menuBtn.textContent = '☰';
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Auto-close when clicking outside navbar
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('show-mobile');
        menuBtn.textContent = '☰';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Auto-close on viewport resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('show-mobile');
        menuBtn.textContent = '☰';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// ─── 8. Active Nav Highlight on Scroll ────────────────────────────────────────
function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', function() {
    var current = '';
    sections.forEach(function(section) {
      if (window.scrollY + 120 >= section.offsetTop) current = section.getAttribute('id');
    });
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }, { passive: true });
}

// ─── 9. Scroll Progress Bar ───────────────────────────────────────────────────
function initScrollProgress() {
  var bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ─── 10. Section Reveal Animation (IntersectionObserver) ──────────────────────
function initReveal() {
  if (!document.getElementById('reveal-style')) {
    var s = document.createElement('style');
    s.id = 'reveal-style';
    s.textContent =
      '.reveal-ready{opacity:0;transform:translateY(22px);transition:opacity 0.55s ease,transform 0.55s ease;}' +
      '.reveal-ready.revealed{opacity:1;transform:translateY(0);}';
    document.head.appendChild(s);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.glass-card, .stat-box, .bento-grid > div').forEach(function(el) {
    el.classList.add('reveal-ready');
    observer.observe(el);
  });
}

// ─── 11. Back to Top Button ───────────────────────────────────────────────────
function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '&#8593;';
    btn.setAttribute('title', 'Back to top');
    btn.setAttribute('aria-label', 'Back to top');
    btn.style.cssText =
      'position:fixed;bottom:5.5rem;right:2rem;z-index:998;' +
      'width:44px;height:44px;border-radius:50%;' +
      'background:rgba(255,255,255,0.92);backdrop-filter:blur(10px);' +
      'border:1px solid rgba(15,23,42,0.15);color:#0f172a;' +
      'font-size:1.2rem;cursor:pointer;display:none;' +
      'align-items:center;justify-content:center;' +
      'box-shadow:0 4px 15px rgba(15,23,42,0.1);' +
      'transition:all 0.25s ease;font-weight:700;';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', function() {
    btn.style.display = window.scrollY > 350 ? 'flex' : 'none';
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sfx.playClick(500, 0.05);
  });
  btn.addEventListener('mouseenter', function() {
    btn.style.background = '#0f172a';
    btn.style.color = '#ffffff';
    btn.style.borderColor = '#0f172a';
    btn.style.transform = 'translateY(-3px)';
  });
  btn.addEventListener('mouseleave', function() {
    btn.style.background = 'rgba(255,255,255,0.92)';
    btn.style.color = '#0f172a';
    btn.style.borderColor = 'rgba(15,23,42,0.15)';
    btn.style.transform = 'translateY(0)';
  });
}

// ─── 12. Toast Notification ───────────────────────────────────────────────────
function showToast(text, type) {
  var isSuccess = (type !== 'error');
  var toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(0);' +
    'background:' + (isSuccess ? '#0f172a' : '#991b1b') + ';' +
    'border:1px solid ' + (isSuccess ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)') + ';' +
    'color:#ffffff;padding:0.85rem 1.6rem;border-radius:50px;' +
    'font-size:0.92rem;font-weight:600;z-index:9999;' +
    'backdrop-filter:blur(12px);box-shadow:0 10px 30px rgba(15,23,42,0.25);' +
    'animation:toastIn 0.3s ease;';
  toast.textContent = text;

  if (!document.getElementById('toast-anim-style')) {
    var s = document.createElement('style');
    s.id = 'toast-anim-style';
    s.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(12px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}';
    document.head.appendChild(s);
  }

  document.body.appendChild(toast);
  setTimeout(function() { if (toast.parentNode) toast.remove(); }, 3500);
}

// ─── 13. Contact Form — EmailJS + mailto fallback ─────────────────────────────
function handleContactSubmit(e) {
  e.preventDefault();

  var nameEl    = document.getElementById('sender-name');
  var emailEl   = document.getElementById('sender-email');
  var subjectEl = document.getElementById('sender-subject');
  var msgEl     = document.getElementById('sender-message');

  var name    = nameEl    ? nameEl.value.trim()    : '';
  var email   = emailEl   ? emailEl.value.trim()   : '';
  var subject = subjectEl ? subjectEl.value.trim() : '';
  var message = msgEl     ? msgEl.value.trim()     : '';

  if (!subject) subject = 'Portfolio Inquiry';

  // Validation
  if (!name || !email || !message) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  var submitBtn = e.target.querySelector('[type="submit"]');
  if (submitBtn) { submitBtn.textContent = 'Sending\u2026'; submitBtn.disabled = true; }

  function resetBtn() {
    if (submitBtn) { submitBtn.textContent = 'Send Message Directly'; submitBtn.disabled = false; }
  }

  if (typeof emailjs !== 'undefined') {
    emailjs.send('service_fim7h74', 'template_kmwoyta', {
      from_name: name,
      email:     email,
      subject:   subject,
      message:   message
    }).then(function() {
      showToast('\u2713 Message sent! I\'ll reply within 2 hours.', 'success');
      e.target.reset();
      var box = document.getElementById('form-success-msg');
      if (box) box.style.display = 'block';
      resetBtn();
    }).catch(function(err) {
      console.warn('EmailJS failed, using mailto fallback:', err);
      _mailtoFallback(name, email, subject, message);
      resetBtn();
    });
  } else {
    _mailtoFallback(name, email, subject, message);
    resetBtn();
  }
}

function _mailtoFallback(name, email, subject, message) {
  var box = document.getElementById('form-success-msg');
  if (box) box.style.display = 'block';
  showToast('\u2713 Opening your email client\u2026', 'success');
  var mailto =
    'mailto:santhoshkumar76670@gmail.com?subject=' +
    encodeURIComponent(subject + ' - from ' + name) +
    '&body=' +
    encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);
  setTimeout(function() { window.location.href = mailto; }, 600);
}

function sendViaWhatsApp() {
  var name    = document.getElementById('sender-name')    ? document.getElementById('sender-name').value    : 'Visitor';
  var message = document.getElementById('sender-message') ? document.getElementById('sender-message').value : 'Hello Santhosh, I visited your portfolio and would like to connect.';
  var text    = encodeURIComponent('Hi Santhosh, my name is ' + name + '. ' + message);
  window.open('https://wa.me/917667080466?text=' + text, '_blank');
}

// ─── 14. Roadmap Modal ────────────────────────────────────────────────────────
function openRoadmapModal(skillKey) {
  var modal   = document.getElementById('roadmap-modal');
  var titleEl = document.getElementById('roadmap-modal-title');
  var bodyEl  = document.getElementById('roadmap-modal-body');
  if (!modal || !titleEl || !bodyEl) return;

  var ROADMAP_DATA = {
    ai: {
      title: 'AI & Autonomous Agent Architecture Breakdown',
      subtitle: 'Sequential Step-by-Step Production Roadmap',
      steps: [
        { num: '01', title: 'Knowledge Ingestion & Chunking', desc: 'Recursive character splitting, metadata enrichment, OCR for unstructured PDFs, and semantic boundary preservation.' },
        { num: '02', title: 'Vector Indexing & Hybrid Search', desc: 'ChromaDB / Qdrant dense embeddings with BM25 sparse keyword queries and Cohere cross-encoder reranking.' },
        { num: '03', title: 'Agentic Evaluation & Guardrails', desc: 'Zero-hallucination verification loops, multi-agent debates, and structured JSON output schema validation.' },
        { num: '04', title: 'Production Microservice Deployment', desc: 'FastAPI python containers, streaming token WebSockets, and Redis semantic query caching.' }
      ]
    },
    web: {
      title: 'Modern Full Stack Systems Architecture Breakdown',
      subtitle: 'Sequential Development & Optimization Roadmap',
      steps: [
        { num: '01', title: 'Frontend Spatial Architecture', desc: 'React 18 / Next.js 14 App Router, Web Audio API, and Three.js 3D WebGL spatial rendering.' },
        { num: '02', title: 'Backend & Distributed Services', desc: 'Node.js / Express microservices, FastAPI python services, and WebSocket bidirectional feeds.' },
        { num: '03', title: 'Data Hydration & Caching', desc: 'Redis in-memory token locks, session management, and serverless edge data caching.' },
        { num: '04', title: 'Lighthouse Performance Optimization', desc: '99+ score benchmarks, code splitting, dynamic asset compression, and SEO SSR.' }
      ]
    },
    database: {
      title: 'Database & Cloud Infrastructure Breakdown',
      subtitle: 'Relational & Vector Hybrid Roadmap',
      steps: [
        { num: '01', title: 'Relational & Vector Hybrid Schema', desc: 'PostgreSQL + pgvector for entity relationships and high-dimensional semantic search.' },
        { num: '02', title: 'High-Speed In-Memory Sync', desc: 'Redis Pub/Sub, session token verification, and distributed mutex locks for concurrent carts.' },
        { num: '03', title: 'Document & Knowledge Store', desc: 'MongoDB document aggregation pipelines combined with ChromaDB vector embedding spaces.' }
      ]
    }
  };

  var data = ROADMAP_DATA[skillKey] || ROADMAP_DATA['ai'];
  titleEl.innerHTML = data.title;

  var stepsHtml = '<div class="mono" style="color:var(--cyan);margin-bottom:1rem;font-weight:600;">// ' + data.subtitle + '</div>' +
    '<div style="display:flex;flex-direction:column;gap:1rem;">';

  data.steps.forEach(function(step, idx) {
    var delay = (idx * 0.12).toFixed(2) + 's';
    stepsHtml +=
      '<div class="glass-card" style="padding:1.2rem;border-left:3px solid var(--cyan);animation:stepRevealIn 0.45s cubic-bezier(0.16,1,0.3,1) ' + delay + ' both;">' +
        '<div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.4rem;">' +
          '<span class="mono" style="background:rgba(2,132,199,0.1);color:var(--cyan);padding:0.2rem 0.55rem;border-radius:4px;font-weight:700;font-size:0.78rem;">STEP ' + step.num + '</span>' +
          '<h4 style="color:var(--text-main);font-size:1.1rem;margin:0;font-weight:700;">' + step.title + '</h4>' +
        '</div>' +
        '<p style="font-size:0.92rem;color:var(--text-muted);margin:0;line-height:1.6;">' + step.desc + '</p>' +
      '</div>';
  });
  stepsHtml += '</div>';

  bodyEl.innerHTML = stepsHtml;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ─── Interactive Touch Portrait Hero Card Controller ────────────────────────
var currentCapIdx = 0;
var touchCapTimer = null;

var touchCapabilities = [
  {
    title: '▶ ACTIVE: Multi-Agent AI & LangGraph Autonomous Swarms',
    stat: '[99.4% ACC]',
    color: 'var(--cyan)'
  },
  {
    title: '▶ ACTIVE: Rapid 48–72h Zero-to-Production FDE Delivery',
    stat: '[RAPID ROI]',
    color: 'var(--purple)'
  },
  {
    title: '▶ ACTIVE: Hybrid Vector Embeddings + Neo4j Graph Retrieval',
    stat: '[<180ms LAT]',
    color: 'var(--emerald)'
  },
  {
    title: '▶ ACTIVE: Interactive 3D WebGL Shaders & Next.js Scale',
    stat: '[60 FPS]',
    color: 'var(--amber)'
  }
];

function touchCapSelect(idx) {
  currentCapIdx = idx;
  
  // Update button active state
  for (var i = 0; i < 4; i++) {
    var btn = document.getElementById('cap-btn-' + i);
    if (btn) btn.classList.toggle('active', i === idx);
  }

  // Update HUD text & stats
  var hudText = document.getElementById('touch-hud-text');
  var hudStat = document.getElementById('touch-hud-stat');
  var data = touchCapabilities[idx];

  if (hudText && data) {
    hudText.style.opacity = '0';
    setTimeout(function() {
      hudText.textContent = data.title;
      hudText.style.opacity = '1';
    }, 150);
  }

  if (hudStat && data) {
    hudStat.textContent = data.stat;
    hudStat.style.color = data.color;
  }

  sfx.playClick();
  resetTouchTimer();
}
window.touchCapSelect = touchCapSelect;

function triggerPortraitPulse() {
  var frame = document.getElementById('hero-portrait-frame');
  if (frame) {
    frame.style.transform = 'scale(0.98)';
    setTimeout(function() {
      frame.style.transform = '';
    }, 200);
  }
  // Advance capability on photo touch
  touchCapSelect((currentCapIdx + 1) % touchCapabilities.length);
}
window.triggerPortraitPulse = triggerPortraitPulse;

function resetTouchTimer() {
  if (touchCapTimer) clearInterval(touchCapTimer);
  touchCapTimer = setInterval(function() {
    touchCapSelect((currentCapIdx + 1) % touchCapabilities.length);
  }, 5000);
}

function initTouchPortrait() {
  var deck = document.getElementById('hero-portrait-deck');
  if (!deck) return;

  resetTouchTimer();

  // Mouse tilt effect
  deck.addEventListener('mousemove', function(e) {
    var rect = deck.getBoundingClientRect();
    var x = e.clientX - rect.left - rect.width / 2;
    var y = e.clientY - rect.top - rect.height / 2;
    var tiltX = (y / (rect.height / 2)) * -5;
    var tiltY = (x / (rect.width / 2)) * 5;
    deck.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-4px)';
  });

  deck.addEventListener('mouseleave', function() {
    deck.style.transform = '';
    resetTouchTimer();
  });

  deck.addEventListener('mouseenter', function() {
    if (touchCapTimer) clearInterval(touchCapTimer);
  });
}

// ─── Luxury Page Intro Loader Animation ─────────────────────────────────────
var introLoaderDismissed = false;
var introLoaderProgress = 0;
var introLoaderInterval = null;

function initPageIntroLoader() {
  var loader = document.getElementById('page-intro-loader');
  if (!loader) return;

  var fillEl = document.getElementById('loader-progress-fill');
  var percentEl = document.getElementById('loader-percent-num');
  var statusEl = document.getElementById('loader-status-msg');

  // Prevent scrolling during intro
  document.body.style.overflow = 'hidden';

  var statusMessages = [
    { threshold: 18, msg: 'INITIALIZING NEURAL CORES...' },
    { threshold: 42, msg: 'COMPILING 3D WEBGL GRAPHICS...' },
    { threshold: 68, msg: 'SYNCHRONIZING ENTERPRISE PROJECTS...' },
    { threshold: 88, msg: 'CALIBRATING FDE WORKFLOWS...' },
    { threshold: 100, msg: 'SYSTEM ONLINE // WELCOME' }
  ];

  // Smoothly increment loader progress
  introLoaderInterval = setInterval(function() {
    if (introLoaderDismissed) {
      clearInterval(introLoaderInterval);
      return;
    }

    var increment = Math.floor(Math.random() * 4) + 2; // +2% to +5%
    introLoaderProgress = Math.min(100, introLoaderProgress + increment);

    if (fillEl) fillEl.style.width = introLoaderProgress + '%';
    if (percentEl) percentEl.textContent = introLoaderProgress + '%';

    if (statusEl) {
      for (var i = 0; i < statusMessages.length; i++) {
        if (introLoaderProgress <= statusMessages[i].threshold) {
          statusEl.textContent = statusMessages[i].msg;
          break;
        }
      }
    }

    if (introLoaderProgress >= 100) {
      clearInterval(introLoaderInterval);
      setTimeout(function() {
        dismissIntroLoader();
      }, 260);
    }
  }, 32);

  // Safety fallback: maximum 2.4s then dismiss
  setTimeout(function() {
    dismissIntroLoader();
  }, 2400);
}

function dismissIntroLoader() {
  if (introLoaderDismissed) return;
  introLoaderDismissed = true;
  if (introLoaderInterval) clearInterval(introLoaderInterval);

  var loader = document.getElementById('page-intro-loader');
  if (!loader) return;

  var fillEl = document.getElementById('loader-progress-fill');
  var percentEl = document.getElementById('loader-percent-num');
  var statusEl = document.getElementById('loader-status-msg');

  if (fillEl) fillEl.style.width = '100%';
  if (percentEl) percentEl.textContent = '100%';
  if (statusEl) statusEl.textContent = 'SYSTEM ONLINE // WELCOME';

  loader.classList.add('loader-dismissed');
  document.body.style.overflow = '';

  var heroSection = document.getElementById('hero');
  if (heroSection) heroSection.classList.add('hero-revealed');

  setTimeout(function() {
    if (loader && loader.parentNode) {
      loader.style.display = 'none';
    }
  }, 800);
}

// ─── Global Init ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initPageIntroLoader();
  initTouchPortrait();
  initTypewriter();
  initProjectGallery();
  setupModals();
  initHRMenu();
  initNavbar();
  initActiveNav();
  initScrollProgress();
  initReveal();
  initBackToTop();
  attachSFXListeners();

  // Sound toggle
  var soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) soundBtn.addEventListener('click', function() { sfx.toggle(); });

  // Roadmap triggers
  document.querySelectorAll('[data-roadmap]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      openRoadmapModal(el.getAttribute('data-roadmap'));
    });
  });

  // Auto-update footer year
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Re-init EmailJS if it loaded after this script
  if (typeof emailjs !== 'undefined') {
    emailjs.init("Oh607FW11K0ukZKuA");
  }
});

