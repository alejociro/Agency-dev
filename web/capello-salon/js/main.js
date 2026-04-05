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

  /* ── 9. BEFORE/AFTER SLIDER ── */
  function initBeforeAfter() {
    document.querySelectorAll('[data-before-after]').forEach(card => {
      const afterEl = card.querySelector('.ba-card__after');
      const divider = card.querySelector('.ba-card__divider');
      const handle = card.querySelector('.ba-card__handle');
      if (!afterEl) return;

      let isDragging = false;

      function updatePosition(x) {
        const rect = card.getBoundingClientRect();
        let pct = ((x - rect.left) / rect.width) * 100;
        pct = Math.max(5, Math.min(95, pct));
        afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        if (divider) divider.style.left = pct + '%';
        if (handle) handle.style.left = pct + '%';
      }

      card.addEventListener('pointerdown', (e) => {
        isDragging = true;
        card.setPointerCapture(e.pointerId);
        updatePosition(e.clientX);
      });

      card.addEventListener('pointermove', (e) => {
        if (isDragging) updatePosition(e.clientX);
      });

      card.addEventListener('pointerup', () => { isDragging = false; });
      card.addEventListener('pointercancel', () => { isDragging = false; });
    });
  }

  /* ── 10. MAGNETIC BUTTON ── */
  function initMagnetic() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── 11. SECTION DOTS NAVIGATION ── */
  function initSectionDots() {
    const dots = document.querySelectorAll('.section-dots__dot');
    if (!dots.length) return;

    const sections = [];
    dots.forEach(dot => {
      const sectionId = dot.dataset.section;
      const el = document.getElementById(sectionId);
      if (el) sections.push({ el, dot });
    });

    /* Click to scroll */
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.section);
        if (target) {
          const navH = document.querySelector('.nav')?.offsetHeight || 0;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - navH - 20,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    });

    /* Update active dot on scroll */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dots.forEach(d => d.classList.remove('is-active'));
          const match = sections.find(s => s.el === entry.target);
          if (match) match.dot.classList.add('is-active');
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => { if (s.el) observer.observe(s.el); });
  }

  /* ── 12. SPLIT TEXT REVEAL ── */
  function initSplitReveal() {
    const splitEls = document.querySelectorAll('[data-split]');
    if (!splitEls.length) return;

    if (prefersReducedMotion) {
      splitEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    splitEls.forEach(el => observer.observe(el));
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
    initBeforeAfter();
    initMagnetic();
    initSectionDots();
    initSplitReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
