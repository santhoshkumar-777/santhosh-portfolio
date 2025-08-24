(function () {
  'use strict';

  // Enhanced smooth scrolling for navigation links
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Calculate the target position with precise offset
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight - 30; // 30px extra for perfect positioning
          
          // Add creative scroll effect with easing
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1200; // 1.2 seconds for smooth animation
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
          const navLinks = document.querySelector('.nav-links');
          const navToggle = document.querySelector('.nav-toggle');
          if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
          }
          
          // Add visual feedback
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            this.style.transform = 'scale(1)';
          }, 150);
        }
      });
    });
  }

  // Initialize smooth scrolling
  initSmoothScrolling();

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

  // Enhanced 3D tilt effect for cards
  function init3DTilt() {
    const cards = document.querySelectorAll('.card, .project-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });
  }

  // Initialize 3D tilt
  init3DTilt();

  // Enhanced typing effect with more dynamic behavior
  function initEnhancedTyping() {
    const words = [
      'AI Enthusiast',
      'Web Developer',
      'Full Stack Developer',
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
      const current = words[wordIndex];
      
      if (!deleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, pauseTime);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
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
      dot.addEventListener('click', function() {
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
      field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      field.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
      
      // Auto-resize textarea
      if (field.tagName === 'TEXTAREA') {
        field.addEventListener('input', function() {
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

  // Mini tilt for social buttons
  document.querySelectorAll('.tilt-mini').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left; var y = e.clientY - r.top;
      var rotY = ((x / r.width) - 0.5) * 12;
      var rotX = -((y / r.height) - 0.5) * 12;
      btn.style.transform = 'perspective(600px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // logo feature removed

  // Contact form: validate, send, clear, toast
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstName = document.getElementById('firstName');
      var lastName = document.getElementById('lastName');
      var email = document.getElementById('email');
      var message = document.getElementById('message');

      // Reset errors
      ['err-firstName','err-lastName','err-email','err-message'].forEach(function(id){ var el=document.getElementById(id); if (el) el.textContent=''; });

      var hasError = false;
      if (!firstName.value.trim()) { document.getElementById('err-firstName').textContent = 'First name is required.'; hasError = true; }
      if (!lastName.value.trim()) { document.getElementById('err-lastName').textContent = 'Last name is required.'; hasError = true; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { document.getElementById('err-email').textContent = 'Valid email is required.'; hasError = true; }
      if (!message.value.trim()) { document.getElementById('err-message').textContent = 'Please enter a message.'; hasError = true; }
      if (hasError) return;

      var subject = encodeURIComponent('New message from ' + firstName.value + ' ' + lastName.value);
      var body = encodeURIComponent(
        'Name: ' + firstName.value + ' ' + lastName.value + '\n' +
        'Email: ' + email.value + '\n\n' +
        message.value
      );
      var mailto = 'mailto:santhoshkumar143143@gmail.com?subject=' + subject + '&body=' + body;
      window.location.href = mailto;

      // Clear fields and show toast
      [firstName, lastName, email, message].forEach(function (el) { el.value = ''; });
      showToast('Thanks! Your message is ready to send via your email app.');
    });
  }

  function showToast(text) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3500);
  }

  // 3D tilt on contact card
  var tilt = document.getElementById('contact-card');
  if (tilt) {
    tilt.addEventListener('mousemove', function (e) {
      var rect = tilt.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var rotateY = ((x / rect.width) - 0.5) * 10; // -5 to 5
      var rotateX = -((y / rect.height) - 0.5) * 10; // -5 to 5
      tilt.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });
    tilt.addEventListener('mouseleave', function () {
      tilt.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();



