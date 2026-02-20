
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
    'AI Enthusiast',
    'Web Developer',
    'Chatbot Creator',
    'Freelancer',
    'Problem Solver',
    'Creative Thinker'
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

// Floating Contact button click -> navigate to Contact page
var contactFab = document.getElementById('contactBtn');
if (contactFab) {
  contactFab.addEventListener('click', function () {
    window.location.href = 'contact.html';
  });
}

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

  const aboutContent = "💡 I'm an AI Developer & Junior Web Developer, driven by a passion for building intelligent solutions and seamless digital experiences.\n\n🧠 My curiosity for AI programming pushes me to explore machine learning and automation, turning complex problems into smart, practical solutions.\n\n📱 On the web side, I focus on creating modern, responsive, and user-friendly applications that blend performance with design.\n\n✨ With a mindset of continuous learning, I aim to combine creativity and technology to craft impactful projects that truly make a difference.";

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

// Project Filtering
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');

        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          card.style.display = 'block';
          // Trigger reflow/animation
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
          }, 300);
        }
      });
    });
  });
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
