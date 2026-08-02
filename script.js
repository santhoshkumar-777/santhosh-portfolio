
// EmailJS initialization - only initialise when library is loaded
if (typeof emailjs !== 'undefined') {
  emailjs.init("Oh607FW11K0ukZKuA");
}

// IIFE wrapper start
(function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  // Only nav icons that are hash links
  const navIcons = document.querySelectorAll('.nav-icon[href^="#"]');

  // Handle both nav links and nav icons (hash links only)
  const allNavElements = [...navLinks, ...navIcons];

  allNavElements.forEach(element => {
    element.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Check if it's an external page or hash link
      const isExternalPage = targetId && (targetId.endsWith('.html') || targetId.includes('.html#'));
      const isHashLink = targetId && targetId.startsWith('#') && !isExternalPage;

      // Only intercept pure hash links (not external pages)
      if (!isHashLink) return;

      e.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate the target position with precise offset
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 30; // 30px extra for perfect positioning

        // Add creative scroll effect with easing
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // Reduced to 0.8 seconds for faster navigation
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function for smooth animation
        function easeInOutCubic(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t * t + b;
          t -= 2;
          return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);

        // Close mobile menu if open
        const navLinksContainer = document.querySelector('.nav-links');
        const navToggle = document.querySelector('.nav-toggle');
        if (navLinksContainer && navLinksContainer.classList.contains('show')) {
          navLinksContainer.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }

        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);

        // Update active states for both nav links and icons
        updateActiveStates(targetId);
      }
    });
  });

  // Function to update active states
  function updateActiveStates(targetId) {
    // Remove active class from all nav elements
    navLinks.forEach(link => link.classList.remove('active'));
    navIcons.forEach(icon => icon.classList.remove('active'));

    // Add active class to current elements
    const activeNavLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
    const activeNavIcon = document.querySelector(`.nav-icon[href="${targetId}"]`);

    if (activeNavLink) activeNavLink.classList.add('active');
    if (activeNavIcon) activeNavIcon.classList.add('active');
  }
}
)();

// Initialize smooth scrolling - function removed as functionality is handled elsewhere

// Advanced particle system for hero section
function initParticleSystem() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create particle container
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  particleContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    `;
  hero.appendChild(particleContainer);

  // Create particles
  for (let i = 0; i < 20; i++) {
    createParticle(particleContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, var(--primary), var(--accent));
      border-radius: 50%;
      opacity: 0.6;
      animation: floatParticle 8s infinite linear;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 8}s;
    `;
  container.appendChild(particle);
}

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0px) translateX(0px); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
    }
  `;
document.head.appendChild(style);

// Initialize particle system
initParticleSystem();

// Simple hover effect for cards
function initSimpleHover() {
  const cards = document.querySelectorAll('.card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.25)';
    });
  });
}

// Initialize simple hover
initSimpleHover();

// Enhanced typing effect with more dynamic behavior
function initEnhancedTyping() {
  const words = [
    'AI Full Stack Engineer',
    'AI Developer',
    'Full Stack Developer',
    'Tech Innovator',
    'Problem Solver',
    'Freelancer'
  ];

  const typedEl = document.getElementById('typed-words');
  const caret = document.querySelector('.caret');

  if (!typedEl) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let typingSpeed = 80;
  let pauseTime = 1200;

  function type() {
    const full = words[wordIndex];

    if (!deleting) {
      typedEl.textContent = full.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === full.length) {
        deleting = true;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      typedEl.textContent = full.slice(0, Math.max(0, charIndex - 1));
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, deleting ? 45 : typingSpeed);
  }

  type();
}

// Initialize enhanced typing
initEnhancedTyping();

// Scroll progress indicator
function initScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress');

  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      scrollProgress.style.width = scrollPercent + '%';
    });
  }
}

// Initialize scroll progress
initScrollProgress();

// Creative scroll indicator functionality
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const scrollDots = document.querySelectorAll('.scroll-dot');
  const sections = document.querySelectorAll('section[id]');

  if (!scrollIndicator) return;

  // Show scroll indicator after scrolling
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
      scrollIndicator.classList.add('visible');
    } else {
      scrollIndicator.classList.remove('visible');
    }

    // Update active dot based on current section
    let currentSection = '';
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    scrollDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-section') === currentSection) {
        dot.classList.add('active');
      }
    });
  });

  // Click functionality for scroll dots
  scrollDots.forEach(dot => {
    dot.addEventListener('click', function () {
      const targetSection = this.getAttribute('data-section');
      const targetElement = document.getElementById(targetSection);

      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 30;

        // Creative scroll animation
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function scrollAnimation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
        }

        function easeInOutQuart(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t * t * t + b;
          t -= 2;
          return -c / 2 * (t * t * t * t - 2) + b;
        }

        requestAnimationFrame(scrollAnimation);

        // Add click effect
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
          this.style.transform = 'scale(1.3)';
        }, 100);
      }
    });
  });
}

// Initialize scroll indicator
initScrollIndicator();

// Enhanced section reveal with creative effects
function initEnhancedReveal() {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('in-view');

        // Add staggered animation for grid items
        if (entry.target.parentElement && entry.target.parentElement.classList.contains('skills-grid')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }

        // Add creative entrance effect
        entry.target.style.animation = 'sectionInView 0.8s ease-out';

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

// Initialize enhanced reveal
initEnhancedReveal();

// Enhanced navigation with active state
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize active navigation
initActiveNavigation();

// Enhanced form interactions
function initEnhancedForm() {
  const formFields = document.querySelectorAll('.form-field input, .form-field textarea');

  formFields.forEach(field => {
    field.addEventListener('focus', function () {
      this.parentElement.classList.add('focused');
    });

    field.addEventListener('blur', function () {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });

    // Auto-resize textarea
    if (field.tagName === 'TEXTAREA') {
      field.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      });
    }
  });
}

// Initialize enhanced form
initEnhancedForm();

// Mobile nav toggle
var navToggle = document.querySelector('.nav-toggle');
var navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('show');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Simple hover effect for social buttons
document.querySelectorAll('.tilt-mini').forEach(function (btn) {
  btn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-3px) scale(1.05)';
    this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
  });
  btn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
  });
});


// logo feature removed

// Contact form: validate, send via EmailJS, clear, toast
var form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    // Reset errors
    ['err-firstName', 'err-lastName', 'err-email', 'err-message'].forEach(function (id) { var el = document.getElementById(id); if (el) el.textContent = ''; });

    var hasError = false;
    if (!firstName.value.trim()) { document.getElementById('err-firstName').textContent = 'First name is required.'; hasError = true; }
    if (!lastName.value.trim()) { document.getElementById('err-lastName').textContent = 'Last name is required.'; hasError = true; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { document.getElementById('err-email').textContent = 'Valid email is required.'; hasError = true; }
    if (!message.value.trim()) { document.getElementById('err-message').textContent = 'Please enter a message.'; hasError = true; }
    if (hasError) return;

    // Send via EmailJS (primary)
    sendemail();
  });
}

function showToast(text) {
  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(function () { t.remove(); }, 3500);
}

// Simple hover on contact card
var contactCard = document.getElementById('contact-card');
if (contactCard) {
  contactCard.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
  });
  contactCard.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
  });
}

// Typewriter modal functionality for About Me section
function initTypewriterModal() {
  const aboutSection = document.getElementById('about');
  const typewriterModal = document.getElementById('typewriterModal');
  const typewriterText = document.getElementById('typewriterText');
  const typewriterCursor = document.getElementById('typewriterCursor');
  const closeBtn = document.querySelector('.typewriter-close');

  if (!aboutSection || !typewriterModal || !typewriterText) return;

  const aboutContent = "🚀 I am an AI-Powered Full Stack Engineer specializing in building intelligent, scalable digital solutions from concept to deployment.\n\n🧠 My core expertise combines full-stack web architectures (React, Next.js, Node.js) with state-of-the-art AI systems (OpenAI API, LangChain, n8n automation, and RAG pipelines).\n\n⚡ I build production-ready applications that don't just process data—they reason, automate workflows, and deliver sleek, futuristic user experiences.\n\n✨ Driven by continuous innovation, I bridge the gap between creative UI design, robust backend engineering, and cutting-edge artificial intelligence.";

  let isTyping = false;

  // Create and add a dedicated "Read More" button inside the About section bio box
  const bioBox = aboutSection.querySelector('.bio-box');
  if (bioBox && !bioBox.querySelector('.about-readmore-btn')) {
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'btn ghost about-readmore-btn';
    readMoreBtn.style.cssText = 'margin-top:14px;font-size:0.85rem;padding:8px 16px;';
    readMoreBtn.textContent = '✦ Read More About Me';
    readMoreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      openTypewriterModal();
    });
    bioBox.appendChild(readMoreBtn);
  }

  // Close modal functionality
  if (closeBtn) closeBtn.addEventListener('click', closeTypewriterModal);
  const backdrop = typewriterModal.querySelector('.modal-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeTypewriterModal);

  function openTypewriterModal() {
    typewriterModal.classList.add('show');
    typewriterModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    startTypewriter();
  }

  function closeTypewriterModal() {
    typewriterModal.classList.remove('show');
    typewriterModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    isTyping = false;
    typewriterText.textContent = '';
    if (typewriterCursor) typewriterCursor.style.opacity = '1';
  }

  function startTypewriter() {
    if (isTyping) return;

    isTyping = true;
    typewriterText.textContent = '';
    if (typewriterCursor) typewriterCursor.style.opacity = '1';

    let charIndex = 0;

    function typeChar() {
      if (!isTyping) return;

      if (charIndex < aboutContent.length) {
        typewriterText.textContent += aboutContent.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 30);
      } else {
        if (typewriterCursor) setTimeout(() => { typewriterCursor.style.opacity = '0'; }, 500);
      }
    }

    typeChar();
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && typewriterModal.classList.contains('show')) {
      closeTypewriterModal();
    }
  });
}

// Initialize typewriter modal
initTypewriterModal();

// Enhanced success/error display
function showFormMessage(message, type = 'success') {
  // Remove existing message
  const existingMsg = document.getElementById('form-message');
  if (existingMsg) existingMsg.remove();

  // Create new message element
  const msgDiv = document.createElement('div');
  msgDiv.id = 'form-message';
  msgDiv.textContent = message;
  msgDiv.style.cssText = `
      margin-top: 15px;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;

  // Insert after the form
  const form = document.getElementById('contact-form');
  if (form) form.appendChild(msgDiv);

  // Auto-hide after 5 seconds
  setTimeout(() => { if (msgDiv) msgDiv.remove(); }, 5000);
}


function sendemail() {
  var email = document.getElementById("email").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var from_name = firstName + ' ' + lastName;
  var message = document.getElementById("message").value;

  var templateParams = {
    email: email,
    from_name: from_name,
    message: message
  };

  emailjs.send('service_fim7h74', 'template_kmwoyta', templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      showFormMessage("Sent successfully!", 'success');
    }, function (error) {
      console.log('FAILED...', error);
      showFormMessage("Failed to send. Please try again.", 'error');
    });
}

// Footer year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Resume Modal Functionality
function initResumeModal() {
  const resumeBtn = document.getElementById('resumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  if (!resumeBtn || !resumeModal) return;

  function openModal() {
    resumeModal.classList.add('resume-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    resumeModal.classList.remove('resume-modal-open');
    document.body.style.overflow = '';
  }

  resumeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeModal);
  }

  // Close on click outside
  resumeModal.addEventListener('click', function (e) {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && resumeModal.classList.contains('resume-modal-open')) {
      closeModal();
    }
  });
}

// Initialize Resume Modal
initResumeModal();

// Project Filtering & View More Toggle
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
  const viewMoreText = document.getElementById('viewMoreText');
  const viewMoreIcon = document.getElementById('viewMoreIcon');

  if (projectCards.length === 0) return;

  const INITIAL_LIMIT = 6;
  let isExpanded = false;
  let currentFilter = 'all';

  function updateVisibility() {
    // Filter matching cards
    const matchingCards = projectCards.filter(card => {
      const categories = card.getAttribute('data-category');
      return currentFilter === 'all' || (categories && categories.includes(currentFilter));
    });

    const nonMatchingCards = projectCards.filter(card => !matchingCards.includes(card));

    // Hide non-matching cards
    nonMatchingCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.display = 'none';
      card.classList.remove('visible');
    });

    // Handle matching cards visibility based on INITIAL_LIMIT & isExpanded
    matchingCards.forEach((card, index) => {
      if (isExpanded || index < INITIAL_LIMIT) {
        card.style.display = 'block';
        setTimeout(() => {
          card.classList.add('visible');
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
          card.classList.remove('visible');
        }, 200);
      }
    });

    // Handle View More button visibility & text
    if (viewMoreBtn) {
      if (matchingCards.length <= INITIAL_LIMIT) {
        viewMoreBtn.style.display = 'none';
      } else {
        viewMoreBtn.style.display = 'inline-flex';
        if (isExpanded) {
          if (viewMoreText) viewMoreText.textContent = 'Show Less';
          if (viewMoreIcon) viewMoreIcon.style.transform = 'rotate(180deg)';
        } else {
          if (viewMoreText) viewMoreText.textContent = `View All Projects (${matchingCards.length})`;
          if (viewMoreIcon) viewMoreIcon.style.transform = 'rotate(0deg)';
        }
      }
    }
  }

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      isExpanded = false; // Reset expand state on filter change
      updateVisibility();
    });
  });

  // View More button click
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      updateVisibility();

      if (!isExpanded) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Initial calculation
  updateVisibility();
}

// Initialize Project Filter
initProjectFilter();

// Project Card Click Interaction
function initProjectCardClick() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('click', function (e) {
      // If the user clicked a link inside the card, don't trigger the card click
      if (e.target.closest('a')) return;

      const detailsLink = this.querySelector('a[href*="project-details.html"]');
      if (detailsLink) {
        window.location.href = detailsLink.getAttribute('href');
      }
    });
  });
}

// Initialize Project Card Click
initProjectCardClick();

// Modern Bento Services Hub V2 - Unique Interactive Logic
function initBentoServices() {
  const bentoCards = document.querySelectorAll('.bento-service-card');

  bentoCards.forEach(card => {
    // 1. Interactive Mouse Move Effects (Scanner & Subtle feedback)
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update scan laser position
      const percentX = (x / rect.width) * 100;
      card.style.setProperty('--scan-x', `${percentX}%`);

      // We removed the 3D rotate logic here as requested
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';

      setTimeout(() => {
        if (!card.matches(':hover')) {
          card.style.transition = 'all 0.2s linear';
        }
      }, 400);
    });

    // 2. Workflow Explorer Logic
    const exploreBtn = card.querySelector('.explore-btn');
    const closeBtn = card.querySelector('.close-workflow');

    if (exploreBtn) {
      exploreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.add('active-workflow');
        // Disable tilt while viewing workflow for better readability
        card.style.transform = 'none';
        card.style.pointerEvents = 'none';
        // Re-enable pointer events for the overlay items
        const overlay = card.querySelector('.workflow-overlay');
        if (overlay) overlay.style.pointerEvents = 'auto';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('active-workflow');
        card.style.pointerEvents = 'auto';
      });
    }
  });
}

// Initialize Bento Hub
initBentoServices();

// Preloader Logic
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    // A slight delay as requested ("light ahh mattum gap erutha pothum")
    setTimeout(() => {
      preloader.classList.add('fade-out');
      // Hide completely after the fade transition (500ms)
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 800); 
  }
};

// Use load for proper resource loading, but add fallback for hanging resources/live server
window.addEventListener('load', hidePreloader);
document.addEventListener('DOMContentLoaded', hidePreloader);
setTimeout(hidePreloader, 3000); // 3-second failsafe

// =======================================================================
// New Enhancements: Back-to-Top & Interactive Project Links
// =======================================================================

function initEnhancements() {
  // 1. Back to Top Button Logic
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Interactive Live Links in Project Cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    // Select the "Live" button which is typically the first .btn.small in .links
    const liveBtn = card.querySelector('.links .btn.small:not(.ghost)');
    if (liveBtn) {
      liveBtn.addEventListener('click', (e) => {
        const href = liveBtn.getAttribute('href');
        // If it's a dummy link, show a cool toast notification instead of jumping up!
        if (href === '#' || href === '') {
          e.preventDefault();
          e.stopPropagation(); // prevent card click event
          
          if (typeof showToast === 'function') {
            showToast("🚀 Live preview launching soon! Check source code for now.");
          } else {
            // Fallback if showToast isn't available
            alert("🚀 Live preview launching soon! Check source code for now.");
          }
        }
      });
    }
  });
}

// Initialize enhancements
initEnhancements();

// --- Skills Roadmap & Modern Skill Card Modal ---
const skillsRoadmap = {
  'Python': {
    category: 'AI & Backend Core',
    perks: ['Core language for AI, Data Science & Automation', 'Fast prototyping with extensive AI packages', 'High-concurrency backend API integration'],
    steps: [
      { num: '01', title: 'Syntax & OOP', desc: 'Variables, Functions, Classes & Asyncio' },
      { num: '02', title: 'Data Engines', desc: 'NumPy & Pandas data manipulation' },
      { num: '03', title: 'AI Ecosystem', desc: 'LangChain, OpenAI API & RAG Pipelines' },
      { num: '04', title: 'Production', desc: 'FastAPI backends, Docker & Async scaling' }
    ],
    tip: 'Build RAG pipelines to master end-to-end Python AI deployment.'
  },
  'OpenAI API': {
    category: 'LLM & Multimodal AI',
    perks: ['Access GPT-4o, DALL-E 3 & Whisper models', 'Structured JSON outputs & function calling', 'Vector embeddings for semantic search'],
    steps: [
      { num: '01', title: 'Auth & SDK', desc: 'API keys, client initialization & limits' },
      { num: '02', title: 'Prompts & JSON', desc: 'System prompts & structured output mode' },
      { num: '03', title: 'Tool Calling', desc: 'Connecting LLMs to external APIs & DBs' },
      { num: '04', title: 'Embeddings', desc: 'Dense vectors for RAG knowledge search' }
    ],
    tip: 'Combine Function Calling with external web APIs to create autonomous actions.'
  },
  'LangChain': {
    category: 'AI Orchestration',
    perks: ['Standard framework to connect LLMs with custom data', 'Modular prompt templates, chains & memory', 'Built-in document loaders & vector retrievers'],
    steps: [
      { num: '01', title: 'Core Chains', desc: 'LLMs, PromptTemplates & OutputParsers' },
      { num: '02', title: 'Memory', desc: 'Conversation state & session buffer' },
      { num: '03', title: 'RAG Pipeline', desc: 'Document loaders & vector store search' },
      { num: '04', title: 'Autonomous Agents', desc: 'Tools & ReAct decision-making loops' }
    ],
    tip: 'Use LCEL (LangChain Expression Language) for clean, composable AI chains.'
  },
  'RAG Systems': {
    category: 'Knowledge Retrieval AI',
    perks: ['Grounds AI in private enterprise data', 'Eliminates hallucinations without LLM retraining', 'Real-time vector search across documents'],
    steps: [
      { num: '01', title: 'Chunking', desc: 'Parsing PDFs & SQL into clean text chunks' },
      { num: '02', title: 'Embedding', desc: 'Vectorizing text with OpenAI/HuggingFace' },
      { num: '03', title: 'Vector Store', desc: 'Indexing vectors in Pinecone or Supabase' },
      { num: '04', title: 'Generation', desc: 'Injecting top-K context into LLM prompts' }
    ],
    tip: 'Hybrid search (Keyword + Vector similarity) produces the highest retrieval accuracy.'
  },
  'Agentic AI': {
    category: 'Autonomous Systems',
    perks: ['Self-directed agents that execute complex workflows', 'Built-in self-correction & evaluation loops', 'Multi-agent collaboration for enterprise scale'],
    steps: [
      { num: '01', title: 'ReAct Loop', desc: 'Reasoning -> Action -> Observation cycle' },
      { num: '02', title: 'Tool Binding', desc: 'Connecting web search, code runners & DBs' },
      { num: '03', title: 'Multi-Agent', desc: 'Supervisor & worker agent hierarchy' },
      { num: '04', title: 'Guardrails', desc: 'Safety checks & human-in-the-loop limits' }
    ],
    tip: 'Stateful graph agents (LangGraph/CrewAI) handle complex business logic best.'
  },
  'Next.js 14': {
    category: 'Full-Stack React',
    perks: ['Full-stack React framework with App Router', 'Server Components for zero-bundle-size speed', 'Built-in API routes & Server Actions'],
    steps: [
      { num: '01', title: 'App Router', desc: 'Layouts, Pages, Loading UI & Routing' },
      { num: '02', title: 'Server Components', desc: 'RSC data fetching & Server Actions' },
      { num: '03', title: 'Caching', desc: 'Revalidation & dynamic rendering' },
      { num: '04', title: 'Edge Deploy', desc: 'Vercel deployment & Edge Middleware' }
    ],
    tip: 'Fetch data directly in React Server Components to eliminate client-side state boilerplate.'
  },
  'React.js': {
    category: 'Modern UI Frontend',
    perks: ['Component-based UI architecture', 'Virtual DOM for blazing fast rendering', 'Ecosystem of thousands of UI libraries'],
    steps: [
      { num: '01', title: 'JSX & Props', desc: 'Component structure & data passing' },
      { num: '02', title: 'Hooks', desc: 'useState, useEffect & custom hooks' },
      { num: '03', title: 'State Mgmt', desc: 'Context API, Zustand or Redux' },
      { num: '04', title: 'Performance', desc: 'React.memo & lazy loading components' }
    ],
    tip: 'Keep component state local to minimize unnecessary re-renders.'
  },
  'FastAPI': {
    category: 'Python Web Backend',
    perks: ['High-speed Python framework built on Pydantic', 'Auto-generated Swagger/OpenAPI docs', 'Native async/await for AI concurrency'],
    steps: [
      { num: '01', title: 'Routes & Query', desc: 'Path operations & request parameters' },
      { num: '02', title: 'Pydantic', desc: 'Data validation schemas & type safety' },
      { num: '03', title: 'Async DB', desc: 'Asynchronous ORM & database queries' },
      { num: '04', title: 'Deployment', desc: 'Uvicorn, Gunicorn & Docker containers' }
    ],
    tip: 'Use Pydantic models for both request validation and response filtering.'
  },
  'Node.js': {
    category: 'Backend Runtime',
    perks: ['Non-blocking asynchronous event-driven I/O', 'Single language (JS/TS) full-stack development', 'Massive NPM package ecosystem'],
    steps: [
      { num: '01', title: 'Core Modules', desc: 'Event loop, FS, HTTP & Path' },
      { num: '02', title: 'Async Patterns', desc: 'Promises, Async/Await & Streams' },
      { title: '03', desc: 'API Frameworks', desc: 'Express / Fastify REST API architecture' },
      { num: '04', title: 'Production', desc: 'PM2 process manager & clustering' }
    ],
    tip: 'Avoid blocking the event loop with synchronous operations.'
  },
  'n8n': {
    category: 'Workflow Automation',
    perks: ['Fair-code workflow engine with 300+ nodes', 'Self-hostable for complete privacy', 'Drag-and-drop AI agent & LangChain nodes'],
    steps: [
      { num: '01', title: 'Triggers', desc: 'Webhooks, Schedules & Event triggers' },
      { num: '02', title: 'Transform', desc: 'Code nodes, Expressions & JSON mapping' },
      { num: '03', title: 'AI Integration', desc: 'LangChain AI Agent & Vector nodes' },
      { num: '04', title: 'Self-Host', desc: 'Docker deployment & Postgres backend' }
    ],
    tip: 'Use sub-workflows to modularize complex enterprise automations.'
  },
  'Pinecone': {
    category: 'Cloud Vector DB',
    perks: ['Cloud-native vector database for massive scale', 'Sub-millisecond similarity search latency', 'Metadata filtering for RAG accuracy'],
    steps: [
      { num: '01', title: 'Indexes', desc: 'Serverless vector index creation' },
      { num: '02', title: 'Vector Upsert', desc: 'Inserting embedding vectors with metadata' },
      { num: '03', title: 'Query & Filter', desc: 'Top-K cosine similarity search' },
      { num: '04', title: 'RAG Connect', desc: 'LangChain & OpenAI integration' }
    ],
    tip: 'Add rich metadata tags (category, author, date) to enable precise filtered retrieval.'
  },
  'PostgreSQL': {
    category: 'Relational Database',
    perks: ['Enterprise-grade SQL relational database', 'ACID compliance & JSONB support', 'pgvector extension for AI embeddings'],
    steps: [
      { num: '01', title: 'SQL & Queries', desc: 'SELECT, JOINs, Grouping & Aggregations' },
      { num: '02', title: 'Schema Design', desc: 'Indexing, Foreign Keys & Normalization' },
      { num: '03', title: 'Advanced SQL', desc: 'CTEs, Window functions & Transactions' },
      { num: '04', title: 'pgvector', desc: 'Vector similarity search setup' }
    ],
    tip: 'Add B-tree indexes on foreign keys to optimize complex query JOIN performance.'
  },
  'AWS': {
    category: 'Cloud Infrastructure',
    perks: ['Global cloud platform for computing & storage', 'Scalable serverless (Lambda) & container (ECS) hosting', 'Enterprise security & IAM policies'],
    steps: [
      { num: '01', title: 'Core Storage', desc: 'EC2 servers, S3 buckets & IAM roles' },
      { num: '02', title: 'Serverless', desc: 'AWS Lambda, API Gateway & DynamoDB' },
      { num: '03', title: 'Networking', desc: 'VPC subnets, Route 53 & CloudFront CDN' },
      { num: '04', title: 'CI/CD', desc: 'Elastic Beanstalk & CloudWatch monitoring' }
    ],
    tip: 'Use S3 with CloudFront CDN for ultra-fast global static asset distribution.'
  },
  'Docker': {
    category: 'Containerization',
    perks: ['Ensures consistent runtime environments anywhere', 'Isolated containers for microservices & AI models', 'Lightweight, reproducible image builds'],
    steps: [
      { num: '01', title: 'Images', desc: 'Dockerfile creation, base images & run commands' },
      { num: '02', title: 'Containers', desc: 'Port mapping, environment variables & logs' },
      { num: '03', title: 'Compose', desc: 'docker-compose.yml multi-container orchestration' },
      { num: '04', title: 'Optimization', desc: 'Multi-stage builds & minimal image size' }
    ],
    tip: 'Use multi-stage Docker builds to keep production images tiny and secure.'
  }
};

const defaultSkillCardData = {
  category: 'Core Engineering',
  perks: ['Enhances developer efficiency and speed', 'Provides robust building blocks for production apps', 'Widely adopted tech stack across top teams'],
  steps: [
    { num: '01', title: 'Foundations', desc: 'Syntax, core concepts & environment setup' },
    { num: '02', title: 'Components', desc: 'Building modular parts & API routes' },
    { num: '03', title: 'Integration', desc: 'Database connections & state handling' },
    { num: '04', title: 'Mastery', desc: 'Production deployment & optimization' }
  ],
  tip: 'Mastering core principles allows rapid adoption of any technology.'
};

window.showRoadmap = function(skillName) {
  const modal = document.getElementById('roadmapModal');
  const skillNameEl = document.getElementById('roadmapSkillName');
  const stepsContainer = document.getElementById('roadmapStepsContainer');
  
  if (!modal || !skillNameEl || !stepsContainer) return;

  skillNameEl.textContent = skillName;
  stepsContainer.innerHTML = '';

  const info = skillsRoadmap[skillName] || defaultSkillCardData;

  // Build Sleek Modern Skill Card
  const card = document.createElement('div');
  card.className = 'modern-skill-modal-card';

  // Category Tag
  const categoryTag = document.createElement('div');
  categoryTag.className = 'skill-modal-category';
  categoryTag.innerHTML = `⚡ <span>${info.category}</span>`;
  card.appendChild(categoryTag);

  // Perks / Advantages (Short Chips)
  const perksDiv = document.createElement('div');
  perksDiv.className = 'skill-modal-perks';
  info.perks.forEach(perk => {
    const chip = document.createElement('div');
    chip.className = 'perk-chip';
    chip.innerHTML = `<span>✦</span> ${perk}`;
    perksDiv.appendChild(chip);
  });
  card.appendChild(perksDiv);

  // Stepper Roadmap (Sleek 4-Step Grid)
  const stepperTitle = document.createElement('h4');
  stepperTitle.className = 'skill-modal-subtitle';
  stepperTitle.innerHTML = `🗺️ Mastery Roadmap`;
  card.appendChild(stepperTitle);

  const stepsGrid = document.createElement('div');
  stepsGrid.className = 'modern-steps-grid';

  info.steps.forEach(step => {
    const stepCard = document.createElement('div');
    stepCard.className = 'modern-step-card';

    stepCard.innerHTML = `
      <div class="step-badge">${step.num || '0' + (index + 1)}</div>
      <div class="step-info">
        <h5>${step.title}</h5>
        <p>${step.desc}</p>
      </div>
    `;
    stepsGrid.appendChild(stepCard);
  });

  card.appendChild(stepsGrid);

  // Pro Tip Footer
  if (info.tip) {
    const tipDiv = document.createElement('div');
    tipDiv.className = 'skill-modal-tip';
    tipDiv.innerHTML = `💡 <strong>Pro Tip:</strong> ${info.tip}`;
    card.appendChild(tipDiv);
  }

  stepsContainer.appendChild(card);

  modal.classList.add('resume-modal-open');
  document.body.style.overflow = 'hidden';
};

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function initRoadmapModal() {
  const modal = document.getElementById('roadmapModal');
  const closeBtn = document.getElementById('closeRoadmapBtn');
  
  if (!modal || !closeBtn) return;
  
  const closeModal = () => {
    modal.classList.remove('resume-modal-open');
    document.body.style.overflow = '';
  };
  
  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('resume-modal-open')) {
      closeModal();
    }
  });

  // Init Skill Tab Filter on skills.html
  initSkillTabFilter();
}

// Skill Tab Filtering Logic
function initSkillTabFilter() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('[data-skill-category]');

  if (tabBtns.length === 0 || skillCards.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-skill-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// Ensure it binds correctly on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRoadmapModal);
} else {
  initRoadmapModal();
}