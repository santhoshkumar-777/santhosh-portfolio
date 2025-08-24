// Simple gate: if not logged in (neither remembered nor session), send to login page
if (localStorage.getItem('loggedIn') !== 'true' && sessionStorage.getItem('loggedIn') !== 'true') {
  window.location.replace('login.html');
}

document.addEventListener('DOMContentLoaded', () => {
  const githubSection = document.getElementById('githubSection');
  if (githubSection) githubSection.classList.add('active');

  // Initialize saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  }
  // Initialize 3D background (if Three.js is available and container exists)
  try {
    const bgContainer = document.getElementById('bg3d');
    if (bgContainer && window.THREE) {
      initThreeBackground(bgContainer);
    }
  } catch (e) {
    // no-op; background is optional
  }

  // Theme toggle cycling through presets and back to default
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const themes = ['ocean', 'sunset', 'neon', ''];
      const current = document.body.getAttribute('data-theme') || '';
      const idx = themes.indexOf(current);
      const next = themes[(idx + 1) % themes.length];
      if (next) {
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      } else {
        document.body.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      }
    });
  }

  // Attach tilt to any elements already on the page
  applyTiltToSelector('.tilt');

  // Logout support
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      sessionStorage.removeItem('loggedIn');
      window.location.replace('login.html');
    });
  }
});
const askInput = document.getElementById('askInput');
const scanBtn = document.getElementById('scanBtn');
const profileContainer = document.getElementById('profileContainer');

scanBtn.addEventListener('click', async () => {
  const query = askInput.value.trim();
  if (!query) {
    alert('Please enter a GitHub username');
    return;
  }
  
  profileContainer.innerHTML = '<div class="loading">🔍 Scanning GitHub...</div>';
  try {
    const userRes = await fetch(`https://api.github.com/users/${query}`);
    if (!userRes.ok) throw new Error('User not found');
    
    const user = await userRes.json();
    const reposRes = await fetch(user.repos_url + '?per_page=5&sort=updated');
    const repos = await reposRes.json();
    
    profileContainer.innerHTML = `
      <div class="profile tilt">
        <img src="${user.avatar_url}" alt="${user.login} avatar" class="avatar" />
        <h2>${user.name || user.login}</h2>
        <p class="bio">${user.bio || 'No bio available'}</p>
        <div class="stats">
          <span>👥 ${user.followers} followers</span>
          <span>👤 ${user.following} following</span>
          <span>📦 ${user.public_repos} repos</span>
        </div>
        <p class="company">🏢 ${user.company || 'No company info'}</p>
        <p class="location">📍 ${user.location || 'No location info'}</p>
        <a href="${user.html_url}" target="_blank" class="github-link">View on GitHub</a>
      </div>
      <div class="repos">
        <h3>Latest Repositories</h3>
        ${repos.map(r => `
          <div class="repo-card tilt">
            <a href="${r.html_url}" target="_blank" class="repo-name">
              <strong>${r.name}</strong>
            </a>
            <p class="repo-desc">${r.description || 'No description available'}</p>
            <div class="repo-stats">
              <span>⭐ ${r.stargazers_count}</span>
              <span>🍴 ${r.forks_count}</span>
              <span>💻 ${r.language || 'N/A'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Activate tilt on newly created cards
    applyTiltToSelector('.tilt');
    
    showSuccessMessage(`Found profile for ${user.login}!`);
    
  } catch (error) {
    profileContainer.innerHTML = `
      <div class="error-message">
        <h3>❌ Error</h3>
        <p>${error.message}</p>
        <p>Please check the username and try again.</p>
      </div>
    `;
  }
});

function showSuccessMessage(message) {

  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(successDiv);
  

  setTimeout(() => {
    successDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 300);
  }, 3000);
}


const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: var(--accent);
  }
  
  .error-message {
    text-align: center;
    padding: 2rem;
    color: #ef4444;
  }
  
  .stats {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
    flex-wrap: wrap;
  }
  
  .stats span {
    background: #f3f4f6;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    color: #374151;
  }
  
  .github-link {
    display: inline-block;
    background: var(--button-bg);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    margin-top: 1rem;
    transition: background 0.3s ease;
  }
  
  .github-link:hover {
    background: var(--button-bg-hover);
  }
  
  .repo-name {
    color: var(--accent);
    text-decoration: none;
    font-size: 1.1rem;
  }
  
  .repo-desc {
    color: #666;
    margin: 0.5rem 0;
  }
  
  .repo-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #666;
  }
`;
document.head.appendChild(style);

// 3D tilt helpers
function applyTiltToSelector(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => attachTilt(el));
}

function attachTilt(element) {
  const maxTilt = 12; // degrees
  const perspective = 800; // px

  function handleMove(e) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    const rotateY = percentX * maxTilt;
    const rotateX = -percentY * maxTilt;
    element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function reset() {
    element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
  }

  element.addEventListener('mousemove', handleMove);
  element.addEventListener('mouseleave', reset);
}

// Three.js background
function initThreeBackground(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Star field
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 800;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3 + 0] = (Math.random() - 0.5) * 200;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, sizeAttenuation: true, opacity: 0.7, transparent: true });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Wireframe icosahedron
  const wireGeo = new THREE.IcosahedronGeometry(8, 1);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x8ab4ff, wireframe: true, transparent: true, opacity: 0.4 });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wire);

  // Glow ring
  const ringGeo = new THREE.TorusGeometry(12, 0.2, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x66ffcc, transparent: true, opacity: 0.25 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  function onResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onResize);

  function animate() {
    requestAnimationFrame(animate);
    wire.rotation.x += 0.0015;
    wire.rotation.y += 0.0020;
    ring.rotation.z += 0.0012;
    stars.rotation.y += 0.0006;
    renderer.render(scene, camera);
  }
  animate();
}
