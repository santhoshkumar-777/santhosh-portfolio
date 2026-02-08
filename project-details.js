document.addEventListener('DOMContentLoaded', () => {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId || !projectsData[projectId]) {
        showError();
        return;
    }

    const project = projectsData[projectId];
    populateProjectDetails(project);
    loadMoreProjects(projectId);

    // Reveal existing elements
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});

function loadMoreProjects(currentId) {
    const moreProjectsContainer = document.getElementById('more-projects-grid');
    if (!moreProjectsContainer) return;

    const projectKeys = Object.keys(projectsData).filter(key => key !== currentId);

    // Pick 3 random projects or the first 3
    const shuffled = projectKeys.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    moreProjectsContainer.innerHTML = '';

    selected.forEach(id => {
        const p = projectsData[id];
        const article = document.createElement('article');
        article.className = 'project-card reveal visible';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';

        article.innerHTML = `
            <div class="project-content">
                <div class="project-tags">
                    ${p.stack.slice(0, 2).map(s => `<span class="tag">${s}</span>`).join('')}
                </div>
                <h3>${p.title}</h3>
                <p>${p.tagline}</p>
                <div class="links">
                    <a href="project-details.html?id=${id}" class="btn small ghost">Details</a>
                </div>
            </div>
        `;

        article.addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            window.location.href = `project-details.html?id=${id}`;
        });

        moreProjectsContainer.appendChild(article);
    });
}

function populateProjectDetails(project) {
    // Set Title and Meta
    document.title = `${project.title} | Project Details`;

    // Header section
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-tagline').textContent = project.tagline;

    // Add "NEW" badge if project is new
    const headerDiv = document.getElementById('project-header');
    if (project.isNew) {
        const newBadge = document.createElement('span');
        newBadge.className = 'new-project-badge';
        newBadge.textContent = 'NEW';
        newBadge.style.cssText = `
            display: inline-block;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: #000;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(110, 231, 255, 0.4);
        `;
        headerDiv.insertBefore(newBadge, headerDiv.firstChild);
    }

    // Main Content
    document.getElementById('project-description').textContent = project.description;

    // Features List
    const featuresList = document.getElementById('project-features');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Add Highlights section if available
    if (project.highlights && project.highlights.length > 0) {
        const highlightsCard = document.createElement('div');
        highlightsCard.className = 'info-card highlights-card';
        highlightsCard.innerHTML = `
            <h3>🌟 New Configurations & Models</h3>
            <div class="highlights-list">
                ${project.highlights.map(h => `
                    <span class="highlight-badge">${h}</span>
                `).join('')}
            </div>
        `;
        const mainContent = document.querySelector('.project-main-content');
        mainContent.appendChild(highlightsCard);
    }

    // Tech Stack Badges
    const stackContainer = document.getElementById('project-stack');
    stackContainer.innerHTML = '';
    project.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'badge';
        span.textContent = tech;
        stackContainer.appendChild(span);
    });

    // Links
    const liveLink = document.getElementById('live-link');
    const githubLink = document.getElementById('github-link');

    if (project.liveLink && project.liveLink !== '#') {
        liveLink.href = project.liveLink;
        liveLink.style.display = 'inline-flex';
    } else {
        liveLink.style.display = 'none';
    }

    if (project.githubLink && project.githubLink !== '#') {
        githubLink.href = project.githubLink;
        githubLink.style.display = 'inline-flex';
    } else {
        githubLink.style.display = 'none';
    }

    // Add "Coming Soon" if both links are hidden
    if (liveLink.style.display === 'none' && githubLink.style.display === 'none') {
        const linksContainer = document.querySelector('.project-links');
        const p = document.createElement('p');
        p.textContent = "Links coming soon!";
        p.style.color = "var(--muted)";
        p.style.fontStyle = "italic";
        linksContainer.appendChild(p);
    }
}

function showError() {
    const main = document.querySelector('main');
    main.innerHTML = `
    <div class="container section-pad" style="text-align: center;">
      <h1 class="headline">Project Not Found</h1>
      <p>The project you are looking for doesn't exist or has been moved.</p>
      <a href="index.html#projects" class="btn primary" style="margin-top: 20px;">Back to Projects</a>
    </div>
  `;
}
