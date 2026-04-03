/* ============================================
   MAIN JS — Spotless Magic World
   4-layer animation system + interactions
   ============================================ */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {

  initNavigation();
  initScrollReveal();
  initSmoothAnchors();
  initSparkles();
  initCounters();
  initScrollProgress();
  initParallax();
  initFooterYear();

});

/* =============================================
   NAVIGATION
   ============================================= */
function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  /* Scroll state */
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  const overlay = document.querySelector('.nav__overlay');

  if (!toggle || !mobileMenu || !overlay) return;

  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('menu-open');
    mobileMenu.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('menu-open');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

/* =============================================
   CAPA 2 — SCROLL REVEAL (Intersection Observer)
   ============================================= */
function initScrollReveal() {
  /* data-animate system (primary) */
  const animateEls = document.querySelectorAll('[data-animate]');

  if (animateEls.length > 0) {
    if (REDUCED_MOTION) {
      animateEls.forEach(el => {
        el.classList.add('is-visible');
        /* Also reveal stagger children */
        if (el.dataset.animate === 'stagger') {
          el.querySelectorAll(':scope > *').forEach(child => {
            child.style.opacity = '1';
            child.style.transform = 'none';
          });
        }
      });
    } else {
      const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.animateDelay || 0;
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, Number(delay));
            animateObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
      });

      animateEls.forEach(el => animateObserver.observe(el));
    }
  }

  /* data-reveal system (legacy/secondary) */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length > 0) {
    if (REDUCED_MOTION) {
      revealEls.forEach(el => el.classList.add('revealed'));
    } else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, Number(delay));
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      revealEls.forEach(el => revealObserver.observe(el));
    }
  }
}

/* =============================================
   SMOOTH ANCHOR SCROLLING
   ============================================= */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
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

/* =============================================
   CAPA 4 — SPARKLE PARTICLES (hero)
   ============================================= */
function initSparkles() {
  const container = document.querySelector('.hero__sparkles');
  if (!container || REDUCED_MOTION) return;

  const count = 20;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.style.setProperty('--x', `${Math.random() * 100}%`);
    sparkle.style.setProperty('--y', `${Math.random() * 100}%`);
    sparkle.style.setProperty('--size', `${2 + Math.random() * 4}px`);
    sparkle.style.setProperty('--duration', `${3 + Math.random() * 5}s`);
    sparkle.style.setProperty('--delay', `${Math.random() * 5}s`);
    sparkle.style.setProperty('--color',
      Math.random() > 0.5 ? 'var(--color-accent)' : 'var(--color-primary-light)'
    );
    container.appendChild(sparkle);
  }
}

/* =============================================
   CAPA 4 — COUNTER ANIMATION
   ============================================= */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  if (REDUCED_MOTION) {
    counters.forEach(el => {
      el.textContent = Number(el.dataset.counter).toLocaleString();
    });
    return;
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => counterObserver.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.counterSuffix || '';
  const prefix = el.dataset.counterPrefix || '';
  const duration = 1800;
  const start = performance.now();

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    /* Ease-out cubic */
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

/* =============================================
   CAPA 4 — SCROLL PROGRESS BAR
   ============================================= */
function initScrollProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar || REDUCED_MOTION) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.transform = `scaleX(${progress})`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* =============================================
   CAPA 4 — PARALLAX (hero background)
   ============================================= */
function initParallax() {
  const layer = document.querySelector('.hero__bg-layer');
  if (!layer || REDUCED_MOTION) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    if (scrollY <= heroHeight) {
      const offset = scrollY * 0.3;
      layer.style.transform = `translateY(${offset}px)`;
    }
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
}

/* =============================================
   FOOTER YEAR
   ============================================= */
function initFooterYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
