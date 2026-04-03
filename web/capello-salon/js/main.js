/* ============================================
   MAIN JS — Capello Salon and Suites
   Animaciones, scroll, navegación, interacciones
   ============================================ */

(function () {
  'use strict';

  /* ── Respeta prefers-reduced-motion ── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. SCROLL REVEAL (Intersection Observer) ── */
  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('is-visible');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }

  /* ── 2. ANIMATED COUNTERS ── */
  function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = prefersReducedMotion ? 0 : 1500;

    if (duration === 0) {
      el.textContent = prefix + target.toLocaleString() + suffix;
      return;
    }

    const start = performance.now();
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };
    requestAnimationFrame(update);
  }

  /* ── 3. SCROLL PROGRESS BAR ── */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ── 4. NAVBAR SCROLL EFFECT ── */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;

    function onScroll() {
      const currentScroll = window.scrollY;

      if (currentScroll > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 5. MOBILE MENU ── */
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileMenu = document.querySelector('.nav__mobile');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 6. SMOOTH SCROLL FOR ANCHOR LINKS ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });
  }

  /* ── 7. PARALLAX (hero background) ── */
  function initParallax() {
    if (prefersReducedMotion) return;

    const parallaxEls = document.querySelectorAll('.hero-parallax');
    if (!parallaxEls.length) return;

    function updateParallax() {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  /* ── 8. RIBBON SVG ANIMATION ── */
  function initRibbonAnimation() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.ribbon-svg').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const ribbonObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          ribbonObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.ribbon-svg').forEach(el => ribbonObserver.observe(el));
  }

  /* ── INIT ── */
  function init() {
    initScrollReveal();
    initCounters();
    initScrollProgress();
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
    initParallax();
    initRibbonAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
