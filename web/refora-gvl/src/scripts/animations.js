/**
 * REFORA GVL — Animation Scripts
 * Intersection Observer reveal + Counter animation + Mobile menu
 */

(function () {
  'use strict';

  /* ── Respect reduced motion ── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════════════
     SCROLL REVEAL — Intersection Observer
     ═══════════════════════════════════════════════════ */

  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    /* If reduced motion, make everything visible immediately */
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  /* ═══════════════════════════════════════════════════
     COUNTER ANIMATION
     ═══════════════════════════════════════════════════ */

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1500;
    const start = performance.now();

    function update(time) {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      const current = Math.floor(ease * target);
      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (prefersReducedMotion) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            el.textContent = prefix + target.toLocaleString() + suffix;
          } else {
            animateCounter(entry.target);
          }
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach((el) => {
    counterObserver.observe(el);
  });

  /* ═══════════════════════════════════════════════════
     MOBILE MENU TOGGLE
     ═══════════════════════════════════════════════════ */

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const body = document.body;

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.toggle('menu-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      body.classList.toggle('menu-active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    /* Close on link click */
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('menu-open');
        mobileMenu.classList.remove('is-open');
        body.classList.remove('menu-active');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close on Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        menuBtn.classList.remove('menu-open');
        mobileMenu.classList.remove('is-open');
        body.classList.remove('menu-active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     NAVBAR SCROLL BEHAVIOR
     ═══════════════════════════════════════════════════ */

  const header = document.querySelector('[data-header]');

  if (header) {
    let lastScrollY = 0;

    window.addEventListener(
      'scroll',
      () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }

        /* Hide/show on scroll direction */
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          header.classList.add('header--hidden');
        } else {
          header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
      },
      { passive: true }
    );
  }

  /* ═══════════════════════════════════════════════════
     SMOOTH SCROLL FOR ANCHOR LINKS
     ═══════════════════════════════════════════════════ */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  });
})();
