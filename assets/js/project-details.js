/**
 * SANTHOSH KUMAR - Project Details Dynamic Case Study Renderer
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PROJECTS_DATA === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'story-check-ai';

  const project = PROJECTS_DATA.find(p => p.id === projectId) || PROJECTS_DATA[0];

  renderProjectDetails(project);
});

function renderProjectDetails(p) {
  // Title & Header
  document.title = `${p.title} – Case Study & Architecture | Santhosh Kumar`;
  
  const titleEl = document.getElementById('pd-title');
  const taglineEl = document.getElementById('pd-tagline');
  const badgeEl = document.getElementById('pd-badge');
  const categoryEl = document.getElementById('pd-category');
  const heroImgEl = document.getElementById('pd-hero-img');
  const fullDescEl = document.getElementById('pd-full-desc');
  const featuresListEl = document.getElementById('pd-features-list');
  const architectureListEl = document.getElementById('pd-architecture-list');
  const metricsGridEl = document.getElementById('pd-metrics-grid');
  const techTagsEl = document.getElementById('pd-tech-tags');
  const demoBtn = document.getElementById('pd-demo-btn');
  const githubBtn = document.getElementById('pd-github-btn');
  const switcherContainer = document.getElementById('pd-project-switcher');

  if (titleEl) titleEl.innerHTML = `${p.icon} ${p.title}`;
  if (taglineEl) taglineEl.textContent = p.tagline;
  if (badgeEl) badgeEl.textContent = p.badge;
  if (categoryEl) categoryEl.textContent = p.categoryLabel;
  if (heroImgEl) {
    heroImgEl.src = p.heroImage;
    heroImgEl.alt = p.title;
  }
  if (fullDescEl) fullDescEl.textContent = p.fullDesc;

  // Features
  if (featuresListEl && p.features) {
    featuresListEl.innerHTML = p.features.map(f => `
      <li style="margin-bottom: 0.85rem; display: flex; align-items: flex-start; gap: 0.75rem;">
        <span style="color: var(--cyan); font-weight: bold;">⚡</span>
        <span style="color: var(--text-main); font-size: 0.98rem;">${f}</span>
      </li>
    `).join('');
  }

  // Architecture Pipeline
  if (architectureListEl && p.architecture) {
    architectureListEl.innerHTML = p.architecture.map((item, idx) => `
      <div class="glass-card" style="padding: 1.25rem; margin-bottom: 1rem; border-left: 4px solid var(--cyan);">
        <div style="font-size: 1.1rem; font-weight: 700; color: var(--cyan); margin-bottom: 0.3rem;">
          ${item.step}
        </div>
        <div style="color: var(--text-muted); font-size: 0.92rem;">${item.desc}</div>
      </div>
    `).join('');
  }

  // Skills & Concepts Learned
  const skillsLearnedEl = document.getElementById('pd-skills-learned-grid');
  if (skillsLearnedEl && p.skillsLearned) {
    skillsLearnedEl.innerHTML = p.skillsLearned.map((skill, idx) => `
      <div class="skill-learned-item">
        <div class="skill-learned-num">0${idx + 1}</div>
        <div class="skill-learned-text">${skill}</div>
      </div>
    `).join('');
  }

  // Metrics
  if (metricsGridEl && p.metrics) {
    metricsGridEl.innerHTML = p.metrics.map(m => `
      <div class="stat-box">
        <div class="stat-number" style="font-size: 1.8rem;">${m.value}</div>
        <div class="stat-label">${m.label}</div>
      </div>
    `).join('');
  }

  // Tech Tags
  if (techTagsEl && p.techStack) {
    techTagsEl.innerHTML = p.techStack.map(t => `
      <span class="tech-pill" style="font-size: 0.9rem; padding: 0.4rem 0.85rem; border-color: rgba(2, 132, 199, 0.25);">
        ${t}
      </span>
    `).join('');
  }

  // Action links
  if (demoBtn && p.demoUrl) {
    demoBtn.href = p.demoUrl;
  }
  if (githubBtn && p.githubUrl) {
    githubBtn.href = p.githubUrl;
  }

  // Other Projects Quick Switcher
  if (switcherContainer) {
    switcherContainer.innerHTML = PROJECTS_DATA.map(item => `
      <a href="project-details.html?id=${item.id}" 
         class="btn btn-secondary btn-sm sfx-btn ${item.id === p.id ? 'active-proj' : ''}" 
         style="margin: 0.3rem; ${item.id === p.id ? 'border-color: var(--cyan); background: rgba(2, 132, 199, 0.12); color: var(--cyan); font-weight: 700;' : ''}">
        <span>${item.icon} ${item.title}</span>
      </a>
    `).join('');
  }
}
