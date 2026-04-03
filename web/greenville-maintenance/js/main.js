/* ========================================
   MAIN JS — Greenville Maintenance
   4-layer animation system + Alpine.js
   ======================================== */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========================================
   ALPINE.JS INIT
   ======================================== */
document.addEventListener('alpine:init', () => {

  /* --- Mobile Navigation Store --- */
  Alpine.store('nav', {
    open: false,
    toggle() {
      this.open = !this.open;
      document.body.style.overflow = this.open ? 'hidden' : '';
    },
    close() {
      this.open = false;
      document.body.style.overflow = '';
    }
  });
});

/* ========================================
   DOM READY — all layers
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* --- CAPA 4: Counter animation (vanilla JS, no Alpine) --- */
  function animateCounter(el, target) {
    if (REDUCED_MOTION) {
      el.textContent = target.toLocaleString();
      return;
    }

    el.textContent = '0';
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(tick);
  }

  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    if (isNaN(target)) return;

    /* Set the real value immediately as fallback */
    el.textContent = target.toLocaleString();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        animateCounter(el, target);
      });
    }, { threshold: 0.1 });

    observer.observe(el);
  });

  /* --- CAPA 2: Scroll Reveal (data-animate) --- */
  if (!REDUCED_MOTION) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    /* Reduced motion: show everything immediately */
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* --- CAPA 3: Header scroll state --- */
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('is-scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* --- CAPA 3: Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });

        /* Close mobile nav if open */
        if (typeof Alpine !== 'undefined' && Alpine.store('nav').open) {
          Alpine.store('nav').close();
        }
      }
    });
  });

  /* --- CAPA 4: Charity logos duplication for infinite scroll --- */
  const logosTrack = document.querySelector('.logos-track');
  if (logosTrack && !REDUCED_MOTION) {
    const items = logosTrack.innerHTML;
    logosTrack.innerHTML = items + items; /* duplicate for seamless loop */
  }
  if (logosTrack && REDUCED_MOTION) {
    logosTrack.style.animation = 'none';
  }
});
