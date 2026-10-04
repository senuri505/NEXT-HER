/**
 * Main Interactive Logic & Visual Effects
 * Leo Club of University of Sri Jayewardenepura - NEXT HER
 * Palette: Lavender, Lilac, Mauve, Amethyst, Violet, Plum, Indigo
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initHeroCanvas();
  initScrollReveal();
  initCounterObserver();
  initTimelineProgress();
  initTimelineTabs();
  initFAQAccordion();
  initSmoothScroll();
  initSectionParticles();
});

/* --------------------------------------------------------------------------
   1. Interactive Mouse Spotlight Engine
   -------------------------------------------------------------------------- */
function initMouseSpotlight() {
  let spotlight = document.getElementById('mouse-spotlight');
  if (!spotlight) {
    spotlight = document.createElement('div');
    spotlight.id = 'mouse-spotlight';
    document.body.appendChild(spotlight);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderSpotlight() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(renderSpotlight);
  }

  renderSpotlight();
}

/* --------------------------------------------------------------------------
   2. Navbar Glass & Active Section Highlight
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  const mobileMenuQuery = window.matchMedia('(max-width: 1024px)');

  function setMenuOpen(isOpen) {
    navLinks.classList.toggle('active', isOpen);
    navLinks.setAttribute('aria-hidden', String(mobileMenuQuery.matches && !isOpen));
    navLinks.inert = mobileMenuQuery.matches && !isOpen;
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    toggleBtn.textContent = isOpen ? '✕' : '☰';
  }

  setMenuOpen(false);

  toggleBtn.addEventListener('click', () => {
    setMenuOpen(!navLinks.classList.contains('active'));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
      setMenuOpen(false);
      toggleBtn.focus();
    }
  });

  mobileMenuQuery.addEventListener('change', () => setMenuOpen(false));
}

/* --------------------------------------------------------------------------
   4. Elegant Aurora Silk Wave Light Stream Canvas
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let time = 0;

  function resizeCanvas() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Soft ambient floating light specks
  class LightSpeck {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.6 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.25 + 0.08;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#6D1F64';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#4B0082';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const specks = Array.from({ length: 28 }, () => new LightSpeck());

  // Flowing Silk Animation Waves (matched to user reference)
  const waves = [
    { y: 0.38, length: 0.0028, amplitude: 38, speed: 0.007, color1: 'rgba(75, 0, 130, 0.16)', color2: 'rgba(60, 0, 100, 0.04)' },
    { y: 0.48, length: 0.002, amplitude: 48, speed: 0.005, color1: 'rgba(109, 31, 100, 0.15)', color2: 'rgba(75, 0, 130, 0.03)' },
    { y: 0.58, length: 0.0032, amplitude: 32, speed: 0.009, color1: 'rgba(60, 0, 100, 0.12)', color2: 'rgba(23, 2, 40, 0.04)' },
    { y: 0.68, length: 0.0024, amplitude: 42, speed: 0.006, color1: 'rgba(23, 2, 40, 0.14)', color2: 'rgba(75, 0, 130, 0.03)' }
  ];

  function drawWaves() {
    waves.forEach(w => {
      ctx.save();
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, w.color1);
      gradient.addColorStop(1, w.color2);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, height * w.y);

      for (let x = 0; x <= width; x += 6) {
        const y = Math.sin(x * w.length + time * w.speed * 100) * w.amplitude + height * w.y;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    time += 0.012;

    drawWaves();
    specks.forEach(s => {
      s.update();
      s.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. Count-up Stats Observer
   -------------------------------------------------------------------------- */
function initCounterObserver() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const attrVal = target.getAttribute('data-target');
        const targetNum = parseInt(attrVal, 10);
        const suffix = target.getAttribute('data-suffix') || '';
        if (!isNaN(targetNum) && targetNum > 0) {
          animateCountUp(target, targetNum, suffix);
        }
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => observer.observe(num));
}

function animateCountUp(element, targetNum, suffix) {
  let currentNum = 0;
  const duration = 1800;
  const stepTime = 30;
  const totalSteps = duration / stepTime;
  const increment = targetNum / totalSteps;

  const timer = setInterval(() => {
    currentNum += increment;
    if (currentNum >= targetNum) {
      element.textContent = targetNum + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(currentNum) + suffix;
    }
  }, stepTime);
}

/* --------------------------------------------------------------------------
   7. Interactive Timeline Fill Progress
   -------------------------------------------------------------------------- */
function initTimelineProgress() {
  const timelineSection = document.querySelector('.timeline-section');
  const progressFill = document.querySelector('.timeline-progress-fill');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (!timelineSection || !progressFill) return;

  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const sectionHeight = timelineSection.offsetHeight;
    const scrollPos = window.innerHeight - rect.top;

    if (scrollPos > 0 && rect.top < window.innerHeight) {
      const percentage = Math.min(100, Math.max(0, (scrollPos / (sectionHeight + window.innerHeight * 0.2)) * 100));
      progressFill.style.height = `${percentage}%`;

      timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight * 0.78) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   7B. Dual-Track Timeline Tab Switcher Logic
   -------------------------------------------------------------------------- */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.timeline-tab-btn');
  const trackBlocks = document.querySelectorAll('.timeline-track-block');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      trackBlocks.forEach(block => {
        const trackType = block.getAttribute('data-track-type');
        if (filter === 'all') {
          block.style.display = 'block';
        } else if (filter === 'uni' && trackType === 'uni') {
          block.style.display = 'block';
        } else if (filter === 'school' && trackType === 'school') {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. FAQ Accordion Toggle
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Smooth Anchor Scroll
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Section Plexus Network Animation Engine
   Premium floating-node + connecting-line + polygon-fill network animation
   for all non-hero sections. Matches reference image style.
   Hero section is intentionally excluded.
   -------------------------------------------------------------------------- */
function initSectionParticles() {

  const sectionSelectors = [
    '.about-section',
    '.target-section',
    '.poster-pillars-section',
    '.objectives-section',
    '.timeline-section',
    '.team-section',
    '.inpage-register-section',
    '.faq-section'
  ];

  // Node colour slots — Soft Dusty Lavender, Pale Mauve, Soft Periwinkle, Misty Violet, Deep Blue-Violet
  const NODE_COLORS = [
    { r: 223, g: 215, b: 236 }, // Soft dusty lavender
    { r: 213, g: 192, b: 205 }, // Pale mauve
    { r: 197, g: 163, b: 190 }, // Muted orchid
    { r: 197, g: 204, b: 235 }, // Soft periwinkle
    { r: 175, g: 162, b: 216 }, // Misty violet
    { r: 226, g: 187, b: 213 }, // Blush-purple
    { r: 78,  g: 45,  b: 130 }, // Deep blue-violet
    { r: 56,  g: 42,  b: 106 }  // Rich indigo-periwinkle
  ];

  sectionSelectors.forEach(selector => {
    const section = document.querySelector(selector);
    if (!section) return;

    /* ── Canvas setup ─────────────────────────────────────────────────── */
    const canvas = document.createElement('canvas');
    canvas.classList.add('section-bg-canvas');
    section.insertBefore(canvas, section.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H, animId, time = 0;
    let orbs = [];

    function resize() {
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
      // Re-position orb bases on resize
      orbs.forEach((o, i) => {
        o.baseX = (W / (orbs.length + 1)) * (i + 1);
        o.baseY = (H / (orbs.length + 1)) * (i + 1);
      });
    }

    const ro = new ResizeObserver(resize);
    ro.observe(section);

    /* ── Node / Particle ──────────────────────────────────────────────── */
    // Density: ~1 node per 6 000 px², capped 40–90
    const COUNT = Math.max(40, Math.min(90, Math.round((section.offsetWidth * section.offsetHeight) / 6000)));

    class Node {
      constructor() { this.respawn(true); }

      respawn(init = false) {
        this.x  = Math.random() * (W || section.offsetWidth);
        this.y  = init ? Math.random() * (H || section.offsetHeight) : (Math.random() < 0.5 ? -5 : (H || section.offsetHeight) + 5);
        const speed = 0.18 + Math.random() * 0.28;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        const c  = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
        this.r   = c.r; this.g = c.g; this.b = c.b;

        this.radius  = 1.4 + Math.random() * 2.0;     // dot radius
        this.glowR   = this.radius * (4 + Math.random() * 4); // glow halo
        this.baseAlpha = 0.55 + Math.random() * 0.35; // 0.55–0.90 — clearly visible
        this.phase   = Math.random() * Math.PI * 2;
        this.alpha   = this.baseAlpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Wrap edges
        if (this.x < -30) this.x = W + 30;
        if (this.x > W + 30) this.x = -30;
        if (this.y < -30) this.y = H + 30;
        if (this.y > H + 30) this.y = -30;
        // Pulse alpha
        this.alpha = this.baseAlpha * (0.78 + 0.22 * Math.sin(time * 1.1 + this.phase));
      }

      draw() {
        const { x, y, r, g, b, alpha, radius, glowR } = this;

        // Outer glow halo
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        grd.addColorStop(0,   `rgba(${r},${g},${b},${(alpha * 0.45).toFixed(3)})`);
        grd.addColorStop(0.4, `rgba(${r},${g},${b},${(alpha * 0.15).toFixed(3)})`);
        grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Inner bright core dot
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = `rgba(${r},${g},${b},0.6)`;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }
    }

    /* Initialise after W/H are set */
    resize();
    const nodes = Array.from({ length: COUNT }, () => new Node());

    /* ── Ambient gradient orbs (slow-moving background blobs) ─────────── */
    const ORB_DEFS = [
      { r: 223, g: 215, b: 236, phase: 0 },
      { r: 197, g: 204, b: 235, phase: 2.1 },
      { r: 175, g: 162, b: 216, phase: 4.2 }
    ];

    orbs = ORB_DEFS.map((def, i) => ({
      ...def,
      baseX: W / (ORB_DEFS.length + 1) * (i + 1),
      baseY: H / (ORB_DEFS.length + 1) * (i + 1),
      size:  160 + Math.random() * 120,
      speed: 0.018 + Math.random() * 0.012
    }));

    function drawOrbs() {
      orbs.forEach(o => {
        const ox = Math.sin(time * o.speed + o.phase)        * 60;
        const oy = Math.cos(time * o.speed + o.phase * 1.4)  * 40;
        const cx = o.baseX + ox, cy = o.baseY + oy;
        const op = 0.045 + 0.02 * Math.sin(time * 0.5 + o.phase);

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.size);
        grd.addColorStop(0,   `rgba(${o.r},${o.g},${o.b},${op.toFixed(3)})`);
        grd.addColorStop(0.5, `rgba(${o.r},${o.g},${o.b},${(op * 0.35).toFixed(3)})`);
        grd.addColorStop(1,   `rgba(${o.r},${o.g},${o.b},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, o.size, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
    }

    /* ── Plexus: lines + triangle fills ──────────────────────────────────
       LINE_DIST  — max distance for drawing a line between two nodes
       TRI_DIST   — max distance for checking a third node to fill a triangle
    ────────────────────────────────────────────────────────────────────── */
    const LINE_DIST = 140;
    const TRI_DIST  = 115;

    function drawPlexus() {
      // Build neighbour map once per frame for triangle detection
      const neighbours = nodes.map(() => []);

      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x, dy = ni.y - nj.y;
          const d  = Math.sqrt(dx * dx + dy * dy);

          if (d >= LINE_DIST) continue;

          // Proximity factor [0..1], 1 = very close
          const pct = 1 - d / LINE_DIST;

          // ── Connection line ────────────────────────────────────────────
          const lineAlpha = pct * 0.28; // 0–0.28 — clearly visible lines
          const lineR = Math.round(ni.r * 0.5 + nj.r * 0.5);
          const lineG = Math.round(ni.g * 0.5 + nj.g * 0.5);
          const lineB = Math.round(ni.b * 0.5 + nj.b * 0.5);

          ctx.beginPath();
          ctx.moveTo(ni.x, ni.y);
          ctx.lineTo(nj.x, nj.y);
          ctx.strokeStyle = `rgba(${lineR},${lineG},${lineB},${lineAlpha.toFixed(3)})`;
          ctx.lineWidth   = 0.7 + pct * 0.6; // thicker when closer
          ctx.stroke();

          // Store neighbours for triangle pass
          if (d < TRI_DIST) {
            neighbours[i].push(j);
            neighbours[j].push(i);
          }
        }
      }

      // ── Triangle polygon fills (3-node polygon like reference image) ───
      for (let i = 0; i < nodes.length; i++) {
        const nbs = neighbours[i];
        for (let a = 0; a < nbs.length; a++) {
          for (let b = a + 1; b < nbs.length; b++) {
            const j = nbs[a], k = nbs[b];
            if (j <= i || k <= i) continue; // avoid duplicates

            const nj = nodes[j], nk = nodes[k];
            const dx = nj.x - nk.x, dy = nj.y - nk.y;
            const djk = Math.sqrt(dx * dx + dy * dy);
            if (djk >= TRI_DIST) continue;

            // Fill triangle with very subtle palette colour
            const avgR = Math.round((nodes[i].r + nj.r + nk.r) / 3);
            const avgG = Math.round((nodes[i].g + nj.g + nk.g) / 3);
            const avgB = Math.round((nodes[i].b + nj.b + nk.b) / 3);

            const triAlpha = (1 - djk / TRI_DIST) * 0.055; // 0–0.055 — ghost fill

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nj.x, nj.y);
            ctx.lineTo(nk.x, nk.y);
            ctx.closePath();
            ctx.fillStyle = `rgba(${avgR},${avgG},${avgB},${triAlpha.toFixed(4)})`;
            ctx.fill();
          }
        }
      }
    }

    /* ── Main render loop ─────────────────────────────────────────────── */
    function animate() {
      ctx.clearRect(0, 0, W, H);
      time += 0.010;

      drawOrbs();    // ambient blobs furthest back
      drawPlexus();  // lines + triangle fills
      nodes.forEach(n => { n.update(); n.draw(); }); // nodes on top

      animId = requestAnimationFrame(animate);
    }

    /* Pause off-screen sections (performance) */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!animId) animate();
        } else {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { threshold: 0.01 });

    observer.observe(section);
  });
}

/* --------------------------------------------------------------------------
   10. Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }

      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Live Event Countdown Timer
   -------------------------------------------------------------------------- */
function initEventCountdown() {
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  if (!cdDays || !cdHours || !cdMinutes || !cdSeconds) return;

  // Target event date: October 10, 2026 00:00:00 (NEXT HER Ideathon & Launch)
  const now = new Date();
  let targetDate = new Date('2026-10-10T00:00:00');

  // If testing or target passed, fallback to 12 days 8 hours from now
  if (targetDate.getTime() <= now.getTime()) {
    targetDate = new Date(now.getTime() + (12 * 86400 + 8 * 3600 + 34 * 60 + 27) * 1000);
  }

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const distance = targetDate.getTime() - currentTime;

    if (distance <= 0) {
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMinutes.textContent = String(minutes).padStart(2, '0');
    cdSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEventCountdown);
} else {
  initEventCountdown();
}
