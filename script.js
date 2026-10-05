/**
 * Om Sonawane — Advanced Student Developer Portfolio
 * Vanilla JavaScript Implementation
 * 
 * Features:
 * 1. Theme Management (Dark/Light with localStorage persistence)
 * 2. Sticky Navbar & Active Section Spy
 * 3. Mobile Navigation Drawer
 * 4. Desktop Custom Cursor with Hover Scaling
 * 5. Subtle Interactive Canvas Particle Mesh (Reduced-Motion aware)
 * 6. 3D Card Tilt Micro-interaction (Desktop only)
 * 7. Project Showcase Filtering & Detailed Modal
 * 8. Certificate Preview Modal
 * 9. Interactive Developer Terminal Shell
 * 10. Command Palette (Ctrl + K / Cmd + K) with keyboard navigation
 * 11. Safe GitHub API Fetch with Polished Fallback
 * 12. Contact Form Client-side Validation & Mailto Action
 * 13. Resume Download Existence Verification & Toast System
 * 14. Scroll Reveal Intersection Observer
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Toast Notification Utility
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info', duration = 3800) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    
    let iconClass = 'fa-solid fa-circle-info';
    if (type === 'success') iconClass = 'fa-solid fa-circle-check';
    if (type === 'warning') iconClass = 'fa-solid fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="${iconClass} toast-icon" aria-hidden="true"></i>
      <span class="toast-msg">${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation in next frame
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }


  /* ==========================================================================
     2. Theme Management (Dark / Light Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const htmlElement = document.documentElement;
  const themeMetaTag = document.querySelector('meta[name="theme-color"]');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('om_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('om_portfolio_theme', theme);
    if (themeMetaTag) {
      themeMetaTag.setAttribute('content', theme === 'dark' ? '#070b14' : '#f8fafc');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info', 2200);
    });
  }


  /* ==========================================================================
     3. Sticky Navbar & Active Section Observer
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // IntersectionObserver for active section highlight
  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let id = entry.target.getAttribute('id');
        // Graceful mapping for sub-sections
        if (id === 'terminal' || id === 'coding-journey') {
          id = 'achievements';
        }
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));


  /* ==========================================================================
     4. Mobile Navigation Drawer
     ========================================================================== */
  const mobileToggleBtn = document.getElementById('btn-mobile-toggle');
  const mobileCloseBtn = document.getElementById('btn-mobile-close');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileDrawer?.classList.add('open');
    mobileBackdrop?.classList.add('open');
    mobileToggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileDrawer?.classList.remove('open');
    mobileBackdrop?.classList.remove('open');
    mobileToggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileNav);
  mobileCloseBtn?.addEventListener('click', closeMobileNav);
  mobileBackdrop?.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileDrawer?.classList.contains('open')) {
      closeMobileNav();
    }
  }, { passive: true });


  /* ==========================================================================
     5. Futuristic Cyber Arrow Cursor (10-Second Mixed Color Gradient Shift)
     ========================================================================== */
  const cyberArrow = document.getElementById('cyber-arrow-cursor');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

  if (!isTouchDevice && cyberArrow) {
    let mouseX = -100, mouseY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cyberArrow.style.opacity = '1';
      cyberArrow.style.left = `${mouseX}px`;
      cyberArrow.style.top = `${mouseY}px`;
    }, { passive: true });

    // Active click state
    window.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    }, { passive: true });

    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    }, { passive: true });

    // Hover effect on clickable elements
    const hoverTargets = 'a, button, input, textarea, .glass-card, .term-chip, .filter-btn, [data-tilt]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mouseleave', () => {
      cyberArrow.style.opacity = '0';
    });

    // Mixed Gradient Themes - Cycles smoothly every 10 seconds!
    const mixedThemes = [
      { stop1: '#00f0ff', stop2: '#4f8cff', stop3: '#8b5cf6', glow: '#4f8cff' }, // Electric Cyan -> Royal Blue -> Ultraviolet
      { stop1: '#10b981', stop2: '#06b6d4', stop3: '#84cc16', glow: '#10b981' }, // Neon Emerald -> Aqua -> Electric Lime
      { stop1: '#ec4899', stop2: '#f97316', stop3: '#f43f5e', glow: '#ec4899' }, // Cyber Pink -> Sunset Orange -> Rose
      { stop1: '#a855f7', stop2: '#d946ef', stop3: '#6366f1', glow: '#a855f7' }, // Radiant Purple -> Vibrant Fuchsia -> Indigo
      { stop1: '#f59e0b', stop2: '#eab308', stop3: '#14b8a6', glow: '#f59e0b' }  // Golden Amber -> Cyber Yellow -> Turquoise
    ];
    let currentThemeIdx = 0;

    function cycleArrowGradient() {
      currentThemeIdx = (currentThemeIdx + 1) % mixedThemes.length;
      const theme = mixedThemes[currentThemeIdx];

      const s1 = document.getElementById('gradStop1');
      const s2 = document.getElementById('gradStop2');
      const s3 = document.getElementById('gradStop3');
      const glow = document.getElementById('glowShadow');
      const ambient = document.getElementById('arrow-ambient-glow');

      if (s1) s1.setAttribute('stop-color', theme.stop1);
      if (s2) s2.setAttribute('stop-color', theme.stop2);
      if (s3) s3.setAttribute('stop-color', theme.stop3);
      if (glow) glow.setAttribute('flood-color', theme.glow);
      if (ambient) {
        ambient.style.background = `radial-gradient(circle, ${theme.stop1}55 0%, ${theme.stop3}25 45%, transparent 70%)`;
      }
    }

    // Shift every 10 seconds (10000ms)
    setInterval(cycleArrowGradient, 10000);
  }


  /* ==========================================================================
     6. Subtle Interactive Canvas Particle Background
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 24000), 55);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79, 140, 255, 0.45)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      particles.forEach(p => {
        if (!prefersReducedMotion) p.update();
        p.draw();
      });

      if (!prefersReducedMotion) {
        requestAnimationFrame(animateParticles);
      }
    }

    animateParticles();
  }


  /* ==========================================================================
     7. Card 3D Tilt Effect (Desktop & Non-touch only)
     ========================================================================== */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (!isTouchDevice && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  /* ==========================================================================
     8. Projects Data, Filtering & Interactive Modal
     ========================================================================== */
  const projectsData = {
    pawcare: {
      title: "PawCare",
      category: "Full Stack",
      image: "Images/pawcare-preview.png",
      description: "PawCare is a full-stack pet-care web application designed to help pet owners access essential pet-care information and services. It provides a responsive and user-friendly platform for managing pet-related information, exploring care resources, and connecting with pet-care services.",
      features: [
        "Comprehensive Pet Profiles: Maintain complete health, vaccination, and dietary records for multiple pets.",
        "Care Service Appointments: Interactive interface for discovering and booking verified local veterinary care services.",
        "RESTful API Architecture: Structured Node.js and Express backend handling secure user data and service schedules.",
        "MongoDB Document Store: Mongoose schemas optimized for flexible pet health histories and appointment states.",
        "Fluid Responsive Design: Adaptive layout ensuring effortless navigation on mobile phones, tablets, and desktop workstations."
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs"],
      githubUrl: "https://github.com/omsonawane0250",
      liveDemo: null
    },
    spotify: {
      title: "Spotify Clone",
      category: "Frontend",
      image: "Images/spotify-preview.png",
      description: "Spotify Clone is a responsive frontend music streaming website inspired by Spotify. It features a modern music-player interface where users can browse songs, explore playlists, and control music playback through an interactive and user-friendly UI.",
      features: [
        "Interactive Music Player: Fully functional audio playback bar with play/pause, seek track scrubbing, and volume adjustment.",
        "Playlist Explorer: Sidebar navigation with curated playlists, custom tracklist layouts, and album artwork showcase.",
        "Dark Glassmorphism Interface: Authentic Spotify dark aesthetic with neon green accents and smooth hover micro-interactions.",
        "Dynamic UI State Management: Built using modular vanilla JavaScript for responsive DOM updates without external frontend frameworks.",
        "Version Controlled: Systematically tracked and published on GitHub with clean repository structure."
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Font Awesome", "Git", "GitHub", "Audio API"],
      githubUrl: "https://github.com/omsonawane0250",
      liveDemo: null
    },
    newstimes: {
      title: "News Times AI",
      category: "AI / Frontend",
      image: "Images/newstimes-preview.png",
      description: "News Times AI is a frontend news web application that provides users with the latest news across categories such as India, World, Sports, Education, and Live News. It integrates a News API to fetch articles and uses the OpenAI API to generate short AI-powered news summaries.",
      features: [
        "Multi-Category News Aggregation: Real-time news feed across India, World, Sports, Education, and Live News categories.",
        "AI-Powered Summarization: Automated generation of concise 3-bullet executive summaries using OpenAI API integrations.",
        "LocalStorage Offline Bookmarks: Save, curate, and review favorite stories locally in the browser with zero backend requirement.",
        "Clean Asynchronous Fetching: Robust error handling, loading skeleton states, and graceful fallback when API limits are reached.",
        "Modern Responsive Layout: High-contrast typography and readable layout inspired by premier digital editorial publications."
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "News API", "OpenAI API", "LocalStorage", "Async/Await"],
      githubUrl: "https://github.com/omsonawane0250",
      liveDemo: null
    }
  };

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('is-hidden');
          card.classList.add('revealed');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // Project Modal Logic
  const projectModal = document.getElementById('project-modal');
  const projectModalCloseBtn = document.getElementById('btn-project-modal-close');
  const modalImg = document.getElementById('modal-project-img');
  const modalCat = document.getElementById('modal-project-cat');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalFeatures = document.getElementById('modal-project-features');
  const modalTech = document.getElementById('modal-project-tech');
  const modalGhLink = document.getElementById('modal-gh-link');
  const modalDemoBtn = document.getElementById('modal-demo-btn');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = `${data.title} UI Preview`;
    modalCat.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    // Features
    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeatures.appendChild(li);
    });

    // Tech Tags
    modalTech.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      modalTech.appendChild(span);
    });

    // Links
    if (modalGhLink) modalGhLink.href = data.githubUrl;

    if (modalDemoBtn) {
      if (data.liveDemo) {
        modalDemoBtn.disabled = false;
        modalDemoBtn.className = 'btn btn-primary';
        modalDemoBtn.onclick = () => window.open(data.liveDemo, '_blank');
      } else {
        modalDemoBtn.disabled = true;
        modalDemoBtn.className = 'btn btn-disabled';
        modalDemoBtn.onclick = null;
      }
    }

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  projectModalCloseBtn?.addEventListener('click', closeProjectModal);
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });


  /* ==========================================================================
     9. Certificate Preview Modal
     ========================================================================== */
  const certModal = document.getElementById('cert-modal');
  const certModalCloseBtn = document.getElementById('btn-cert-modal-close');
  const certModalOkBtn = document.getElementById('btn-cert-ok');
  const certImg = document.getElementById('modal-cert-img');
  const certTitle = document.getElementById('modal-cert-title');
  const certDesc = document.getElementById('modal-cert-desc');
  const certBadge = document.getElementById('modal-cert-badge');

  const certData = {
    'google-cloud-genai': {
      title: "Google Cloud Generative AI Virtual Internship Completion Certificate",
      badge: "Completed Credential • VIP-AI-2025-26574",
      img: "assets/certificates/google-cloud-genai-preview.png",
      desc: "Awarded by SmartBridge & SmartInternz for successfully completing the Google Cloud Generative AI Virtual Internship (15 September 2025 – 31 October 2025). Certificate ID: VIP-AI-2025-26574, Issued: November 24, 2025. Verified credential covering generative AI architectures, prompt design, and foundational models."
    },
    'oasis-offer': {
      title: "Oasis Infobyte Internship Offer Letter",
      badge: "Official Offer Letter • OIB/R2/IP985",
      img: "assets/certificates/oasis-offer-preview.png",
      desc: "Official selection and internship offer letter from Oasis Infobyte for candidate Om Hari Sonawane for the 1-Month Web Development and Designing Internship beginning September 2026. Reference No: OIB/R2/IP985."
    }
  };

  function openCertModal(certKey) {
    const data = certData[certKey];
    if (!data) return;

    certTitle.textContent = data.title;
    certBadge.textContent = data.badge;
    certImg.src = data.img;
    certImg.alt = data.title;
    certDesc.textContent = data.desc;

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-view-cert').forEach(btn => {
    btn.addEventListener('click', () => {
      const certKey = btn.getAttribute('data-cert');
      openCertModal(certKey);
    });
  });

  certModalCloseBtn?.addEventListener('click', closeCertModal);
  certModalOkBtn?.addEventListener('click', closeCertModal);
  certModal?.addEventListener('click', (e) => {
    if (e.target === certModal) closeCertModal();
  });


  /* ==========================================================================
     10. Interactive Developer Terminal
     ========================================================================== */
  const terminalBody = document.getElementById('terminal-body');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalClearBtn = document.getElementById('btn-term-clear');
  const termChips = document.querySelectorAll('.term-chip');

  const terminalCommands = {
    whoami: "Om Sonawane — B.Tech IT Student at Indira College of Engineering & Management, Pune.",
    role: "B.Tech IT Student | Web Developer | Aspiring Full Stack Developer",
    focus: "Full Stack Web Development + Generative AI + Data Structures & Algorithms",
    currently_learning: "DSA (LeetCode) + Full Stack System Architecture + Cloud AI APIs",
    goal: "To become a skilled Full Stack Software Engineer, work on innovative software products, build AI-powered web applications, and eventually create technology products of my own.",
    skills: "Frontend: HTML5, CSS3, JavaScript, React\nBackend: Node.js, Express.js\nDatabase: SQL, MongoDB\nAI: Google Cloud GenAI, Generative AI",
    projects: "1. PawCare (Full Stack Pet-care Application)\n2. Spotify Clone (Frontend Music Player)\n3. News Times AI (News Feed with OpenAI Summaries)",
    experience: "1. SmartBridge & SmartInternz — Google Cloud Generative AI Virtual Intern (Completed 2025)\n2. Oasis Infobyte — Web Development and Designing Intern (Selected 2026)",
    education: "B.Tech in Information Technology\nIndira College of Engineering and Management, Pune\n3rd Year — 5th Semester (Parandwadi, Pune)",
    contact: "Email: omsonawane0250@gmail.com | Phone: +91 8080559353 | Location: Parandwadi, Pune",
    socials: "GitHub: https://github.com/omsonawane0250\nLinkedIn: https://www.linkedin.com/in/om-sonawane-aa323b340\nLeetCode: https://leetcode.com/u/om_sonawane_7/",
    date: () => new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' }),
    help: "Available commands:\n• whoami, role, focus, currently_learning, goal\n• skills, projects, experience, education\n• contact, socials, date, theme, clear"
  };

  function appendTerminalOutput(cmd, output) {
    if (!terminalBody) return;

    const cmdRow = document.createElement('div');
    cmdRow.className = 'term-line term-cmd-row';
    cmdRow.innerHTML = `<span class="term-prompt">om@sonawane:~$</span> <span>${escapeHtml(cmd)}</span>`;
    terminalBody.appendChild(cmdRow);

    if (output) {
      const respRow = document.createElement('div');
      respRow.className = 'term-line term-response';
      respRow.innerHTML = output.replace(/\n/g, '<br>');
      terminalBody.appendChild(respRow);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeTerminalCommand(rawInput) {
    const trimmed = rawInput.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      clearTerminal();
      return;
    }

    if (trimmed === 'theme') {
      themeToggleBtn?.click();
      appendTerminalOutput(rawInput, "Theme toggled successfully.");
      return;
    }

    const handler = terminalCommands[trimmed];
    if (handler) {
      const response = typeof handler === 'function' ? handler() : handler;
      appendTerminalOutput(rawInput, response);
    } else {
      appendTerminalOutput(rawInput, `command not found: ${trimmed}. Type 'help' to see valid commands.`);
    }
  }

  const autoTypeTimeouts = [];
  function cancelPendingAutoType() {
    while (autoTypeTimeouts.length) {
      clearTimeout(autoTypeTimeouts.pop());
    }
  }

  function clearTerminal() {
    cancelPendingAutoType();
    if (!terminalBody) return;
    terminalBody.innerHTML = `
      <div class="term-line output-text term-welcome">
        Terminal cleared.<br>
        Type <span class="term-highlight">help</span> for a list of available commands.
      </div>
    `;
  }

  terminalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    cancelPendingAutoType();
    const val = terminalInput.value;
    executeTerminalCommand(val);
    terminalInput.value = '';
  });

  terminalClearBtn?.addEventListener('click', clearTerminal);

  termChips.forEach(chip => {
    chip.addEventListener('click', () => {
      cancelPendingAutoType();
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeTerminalCommand(cmd);
    });
  });

  // Initial typing animation on scroll
  let terminalTyped = false;
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !terminalTyped) {
        terminalTyped = true;
        // Simulate initial run safely
        autoTypeTimeouts.push(setTimeout(() => executeTerminalCommand('whoami'), 400));
        autoTypeTimeouts.push(setTimeout(() => executeTerminalCommand('role'), 900));
        autoTypeTimeouts.push(setTimeout(() => executeTerminalCommand('focus'), 1400));
        autoTypeTimeouts.push(setTimeout(() => executeTerminalCommand('goal'), 1900));
      }
    });
  }, { threshold: 0.3 });

  const terminalWindow = document.getElementById('terminal-window');
  if (terminalWindow) terminalObserver.observe(terminalWindow);


  /* ==========================================================================
     11. Command Palette (Ctrl + K / Cmd + K)
     ========================================================================== */
  const paletteBackdrop = document.getElementById('command-palette');
  const paletteSearchInput = document.getElementById('palette-search');
  const paletteResults = document.getElementById('palette-results');
  const openPaletteBtn = document.getElementById('btn-open-palette');

  const paletteCommands = [
    { title: "Go to Home", icon: "fa-solid fa-house", action: () => scrollToSection('#hero') },
    { title: "Go to About Me", icon: "fa-solid fa-user", action: () => scrollToSection('#about') },
    { title: "Go to Technical Skills", icon: "fa-solid fa-layer-group", action: () => scrollToSection('#skills') },
    { title: "Go to Featured Projects", icon: "fa-solid fa-laptop-code", action: () => scrollToSection('#projects') },
    { title: "Go to Experience & Internships", icon: "fa-solid fa-briefcase", action: () => scrollToSection('#experience') },
    { title: "Go to Education", icon: "fa-solid fa-graduation-cap", action: () => scrollToSection('#education') },
    { title: "Go to Certifications", icon: "fa-solid fa-certificate", action: () => scrollToSection('#certifications') },
    { title: "Go to Key Achievements", icon: "fa-solid fa-trophy", action: () => scrollToSection('#achievements') },
    { title: "Go to Contact", icon: "fa-solid fa-paper-plane", action: () => scrollToSection('#contact') },
    { title: "Toggle Theme (Dark / Light)", icon: "fa-solid fa-circle-half-stroke", action: () => themeToggleBtn?.click() },
    { title: "Open GitHub Profile (@omsonawane0250)", icon: "fa-brands fa-github", action: () => window.open('https://github.com/omsonawane0250', '_blank') },
    { title: "Open LinkedIn Profile (Om Sonawane)", icon: "fa-brands fa-linkedin", action: () => window.open('https://www.linkedin.com/in/om-sonawane-aa323b340', '_blank') },
    { title: "Open LeetCode Profile (@om_sonawane_7)", icon: "fa-solid fa-code", action: () => window.open('https://leetcode.com/u/om_sonawane_7/', '_blank') },
    { title: "Download Resume", icon: "fa-solid fa-file-arrow-down", action: () => triggerResumeDownload() }
  ];

  let selectedPaletteIndex = 0;
  let filteredCommands = [...paletteCommands];

  function openPalette() {
    paletteBackdrop.classList.add('open');
    paletteBackdrop.setAttribute('aria-hidden', 'false');
    paletteSearchInput.value = '';
    renderPaletteItems(paletteCommands);
    setTimeout(() => paletteSearchInput.focus(), 50);
    document.body.style.overflow = 'hidden';
  }

  function closePalette() {
    paletteBackdrop.classList.remove('open');
    paletteBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderPaletteItems(items) {
    filteredCommands = items;
    selectedPaletteIndex = 0;
    paletteResults.innerHTML = '';

    if (items.length === 0) {
      paletteResults.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching commands found.</div>';
      return;
    }

    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = `palette-item ${index === 0 ? 'active' : ''}`;
      div.setAttribute('role', 'option');
      div.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      div.innerHTML = `
        <div class="palette-item-left">
          <i class="${item.icon} palette-item-icon"></i>
          <span>${escapeHtml(item.title)}</span>
        </div>
        <span class="palette-item-badge">Select ↵</span>
      `;

      div.addEventListener('click', () => {
        closePalette();
        item.action();
      });

      paletteResults.appendChild(div);
    });
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  openPaletteBtn?.addEventListener('click', openPalette);

  // Keyboard shortcut listener (Ctrl+K / Cmd+K / Escape)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (paletteBackdrop.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape') {
      if (paletteBackdrop.classList.contains('open')) closePalette();
      if (projectModal?.classList.contains('open')) closeProjectModal();
      if (certModal?.classList.contains('open')) closeCertModal();
      if (mobileDrawer?.classList.contains('open')) closeMobileNav();
    }
  });

  paletteSearchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const results = paletteCommands.filter(cmd => cmd.title.toLowerCase().includes(query));
    renderPaletteItems(results);
  });

  paletteSearchInput?.addEventListener('keydown', (e) => {
    const items = paletteResults.querySelectorAll('.palette-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[selectedPaletteIndex]?.classList.remove('active');
      selectedPaletteIndex = (selectedPaletteIndex + 1) % items.length;
      items[selectedPaletteIndex]?.classList.add('active');
      items[selectedPaletteIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[selectedPaletteIndex]?.classList.remove('active');
      selectedPaletteIndex = (selectedPaletteIndex - 1 + items.length) % items.length;
      items[selectedPaletteIndex]?.classList.add('active');
      items[selectedPaletteIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedPaletteIndex]) {
        closePalette();
        filteredCommands[selectedPaletteIndex].action();
      }
    }
  });

  paletteBackdrop?.addEventListener('click', (e) => {
    if (e.target === paletteBackdrop) closePalette();
  });


  /* ==========================================================================
     12. Safe GitHub API Fetch with Polished Fallback
     ========================================================================== */
  async function fetchGitHubData() {
    const username = 'omsonawane0250';
    const reposCountElem = document.getElementById('gh-repos-count');
    const bioTextElem = document.getElementById('gh-bio-text');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`https://api.github.com/users/${username}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (reposCountElem && data.public_repos !== undefined) {
          reposCountElem.textContent = `${data.public_repos}`;
        }
        if (bioTextElem && data.bio) {
          bioTextElem.textContent = data.bio;
        }
      }
      // If rate limited (status 403) or other HTTP code, simply retain the polished fallback UI without showing errors!
    } catch {
      // Graceful fallback - no errors logged or shown to user
    }
  }
  fetchGitHubData();


  /* ==========================================================================
     13. Resume Download Handling
     ========================================================================== */
  const resumeBtn = document.getElementById('btn-download-resume');

  async function triggerResumeDownload() {
    const resumePath = 'assets/Om_Sonawane_Resume.pdf';

    try {
      const response = await fetch(resumePath, { method: 'HEAD' });
      if (response.ok) {
        const a = document.createElement('a');
        a.href = resumePath;
        a.download = 'Om_Sonawane_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("Resume download started.", "success");
      } else {
        showToast("Resume will be available soon.", "warning");
      }
    } catch {
      showToast("Resume will be available soon.", "warning");
    }
  }

  resumeBtn?.addEventListener('click', triggerResumeDownload);


  /* ==========================================================================
     14. Contact Form Validation & Mailto Action
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset error states
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';
    nameInput?.classList.remove('invalid');
    emailInput?.classList.remove('invalid');
    messageInput?.classList.remove('invalid');

    // Name Validation
    const nameVal = nameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      if (nameError) nameError.textContent = 'Please enter your full name (minimum 2 characters).';
      nameInput.classList.add('invalid');
      isValid = false;
    }

    // Email Validation
    const emailVal = emailInput.value.trim();
    if (!emailVal || !validateEmail(emailVal)) {
      if (emailError) emailError.textContent = 'Please provide a valid email address.';
      emailInput.classList.add('invalid');
      isValid = false;
    }

    // Message Validation
    const messageVal = messageInput.value.trim();
    if (!messageVal || messageVal.length < 10) {
      if (messageError) messageError.textContent = 'Please provide a descriptive message (at least 10 characters).';
      messageInput.classList.add('invalid');
      isValid = false;
    }

    if (!isValid) {
      showToast("Please review the highlighted fields in the form.", "warning");
      return;
    }

    // Prepare direct mailto
    const subjectVal = subjectInput.value.trim() || `Portfolio Inquiry from ${nameVal}`;
    const bodyContent = `Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`;
    const mailtoLink = `mailto:omsonawane0250@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(bodyContent)}`;

    showToast("Opening default email client with your message...", "success");
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      contactForm.reset();
    }, 600);
  });

  // Real-time error dismissal on input
  nameInput?.addEventListener('input', () => {
    if (nameInput.classList.contains('invalid') && nameInput.value.trim().length >= 2) {
      nameInput.classList.remove('invalid');
      if (nameError) nameError.textContent = '';
    }
  });

  emailInput?.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid') && validateEmail(emailInput.value.trim())) {
      emailInput.classList.remove('invalid');
      if (emailError) emailError.textContent = '';
    }
  });

  messageInput?.addEventListener('input', () => {
    if (messageInput.classList.contains('invalid') && messageInput.value.trim().length >= 10) {
      messageInput.classList.remove('invalid');
      if (messageError) messageError.textContent = '';
    }
  });


  /* ==========================================================================
     15. Back to Top Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('btn-back-to-top');
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ==========================================================================
     16. Scroll Reveal Observer
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==========================================================================
     17. Helper Utility Functions
     ========================================================================== */
  function escapeHtml(string) {
    if (!string) return '';
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

});
