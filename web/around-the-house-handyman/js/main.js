/* ============================================================
   MAIN.JS — Around The House Home Services
   Vanilla JS — no framework dependencies
   Features: nav scroll, mobile menu, IO fallback for scroll
   animations, FAQ accordion, counters, magnetic buttons
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initScrollRevealFallback();
  initFAQ();
  initSmoothScroll();
  initCounters();
  initMagneticButtons();
  initBeforeAfter();
  initGalleryFilters();
  initBusinessStatus();
  initSectionDots();
});

/* ── Nav scroll effect ── */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('nav-scrolled', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );

  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

/* ── Mobile menu toggle ── */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isActive = menu.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', isActive);
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Scroll Reveal Fallback (IO for browsers without scroll-driven) ── */
function initScrollRevealFallback() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // If browser supports scroll-driven animations, CSS handles it
  if (CSS.supports && CSS.supports('animation-timeline', 'view()')) return;

  const elements = document.querySelectorAll('[data-scroll]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ── FAQ accordion ── */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!wasOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── Smooth scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Animated Counters ── */
function initCounters() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-counter]').forEach(el => {
      el.textContent = parseInt(el.dataset.counter).toLocaleString();
    });
    return;
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(ease * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target.toLocaleString() + suffix;
    }
  };

  requestAnimationFrame(update);
}

/* ── Magnetic Buttons (desktop only, pointer fine) ── */
function initMagneticButtons() {
  if (!matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    const strength = 0.25;
    const radius = 70;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      if (dist < radius) {
        const pull = 1 - dist / radius;
        btn.style.transform = `translate(${x * pull * strength}px, ${y * pull * strength}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      btn.style.transform = '';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });
}

/* ── Before/After Slider ── */
function initBeforeAfter() {
  document.querySelectorAll('.before-after').forEach(container => {
    const handle = container.querySelector('.ba-handle');
    const overlay = container.querySelector('.ba-overlay');
    if (!handle || !overlay) return;

    let dragging = false;

    function update(x) {
      const rect = container.getBoundingClientRect();
      const pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
      overlay.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }

    container.addEventListener('pointerdown', (e) => {
      dragging = true;
      container.setPointerCapture(e.pointerId);
      update(e.clientX);
    });
    container.addEventListener('pointermove', (e) => {
      if (dragging) update(e.clientX);
    });
    container.addEventListener('pointerup', () => { dragging = false; });

    // Keyboard accessibility
    handle.setAttribute('role', 'slider');
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('aria-label', 'Compare before and after');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '50');

    handle.addEventListener('keydown', (e) => {
      const rect = container.getBoundingClientRect();
      const current = parseFloat(handle.style.left) || 50;
      if (e.key === 'ArrowLeft') { e.preventDefault(); update(rect.left + rect.width * (current - 3) / 100); }
      if (e.key === 'ArrowRight') { e.preventDefault(); update(rect.left + rect.width * (current + 3) / 100); }
    });
  });
}

/* ── Gallery Category Filters ── */
function initGalleryFilters() {
  const buttons = document.querySelectorAll('.gallery-filter-btn');
  const grid = document.querySelector('.gallery-grid');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!buttons.length || !items.length || !grid) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle filtered class for uniform grid layout
      grid.classList.toggle('gallery-filtered', filter !== 'all');

      // Filter items — supports space-separated multi-category
      items.forEach(item => {
        const categories = item.dataset.category.split(' ');
        const matches = filter === 'all' || categories.includes(filter);
        if (matches) {
          item.classList.remove('hidden');
          item.style.position = '';
        } else {
          item.classList.add('hidden');
          // Remove from flow after transition
          setTimeout(() => {
            if (item.classList.contains('hidden')) {
              item.style.position = 'absolute';
            }
          }, 400);
        }
      });
    });
  });
}

/* ── Business Open/Closed Status ── */
function initBusinessStatus() {
  const badge = document.querySelector('.status-badge');
  if (!badge) return;

  const now = new Date();
  const day = now.getDay(); // 0=Sun, 6=Sat
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  // Mon-Fri 9:00-17:00
  const isWeekday = day >= 1 && day <= 5;
  const isOpen = isWeekday && currentTime >= 540 && currentTime < 1020;

  const text = badge.querySelector('.status-text');

  if (isOpen) {
    badge.classList.add('status-open');
    badge.classList.remove('status-closed');
    const minsLeft = 1020 - currentTime;
    const hoursLeft = Math.floor(minsLeft / 60);
    const minsRemain = minsLeft % 60;
    text.textContent = hoursLeft > 0
      ? `Open now \u00b7 Closes in ${hoursLeft}h ${minsRemain}m`
      : `Open now \u00b7 Closes in ${minsRemain}m`;
  } else {
    badge.classList.add('status-closed');
    badge.classList.remove('status-open');
    text.textContent = 'Closed \u00b7 Opens Mon 9:00 AM';

    // More specific message
    if (isWeekday && currentTime < 540) {
      const minsUntil = 540 - currentTime;
      const hoursUntil = Math.floor(minsUntil / 60);
      text.textContent = hoursUntil > 0
        ? `Closed \u00b7 Opens in ${hoursUntil}h`
        : `Closed \u00b7 Opens soon`;
    }
  }
}

/* ── Section Dot Navigation ── */
function initSectionDots() {
  const dots = document.querySelector('.section-dots');
  const sections = document.querySelectorAll('section[id]');
  if (!dots || !sections.length) return;

  // Build dots
  dots.innerHTML = [...sections].map(s =>
    `<a href="#${s.id}" class="dot" data-section="${s.id}" aria-label="${s.dataset.label || s.id}"></a>`
  ).join('');

  // Observe sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const dot = dots.querySelector(`[data-section="${e.target.id}"]`);
      if (dot) dot.classList.toggle('active', e.isIntersecting);
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}
