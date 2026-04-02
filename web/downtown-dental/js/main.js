/* ═══════════════════════════════════════
   Downtown Dental — Main JS
   Scroll reveal, mobile nav, floating CTA, counters
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SCROLL REVEAL — Intersection Observer
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll('[data-animate]').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     MOBILE NAV
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-nav-menu]');
    var overlay = document.querySelector('[data-nav-overlay]');

    if (!toggle || !menu) return;

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     NAVBAR SCROLL — bg on scroll
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initNavbarScroll() {
    var navbar = document.querySelector('[data-navbar]');
    if (!navbar) return;

    var scrollThreshold = 80;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FLOATING CTA — aparece después del hero
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initFloatingCTA() {
    var cta = document.querySelector('.floating-cta');
    if (!cta) return;

    var trigger = document.querySelector('.hero') || document.querySelector('section');
    if (!trigger) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          cta.classList.add('is-visible');
        } else {
          cta.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(trigger);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ANIMATED COUNTERS
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1500;
    var start = performance.now();

    function update(time) {
      var progress = Math.min((time - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      var current = Math.floor(ease * target);
      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SMOOTH ANCHOR SCROLL
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        var offset = 80; // navbar height
        var top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FAQ ACCORDION
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function initFAQ() {
    document.querySelectorAll('[data-faq-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = this.closest('[data-faq-item]');
        var content = item.querySelector('[data-faq-content]');
        var isOpen = item.classList.contains('is-open');

        // Close all
        document.querySelectorAll('[data-faq-item].is-open').forEach(function (open) {
          open.classList.remove('is-open');
          var c = open.querySelector('[data-faq-content]');
          c.style.maxHeight = '0';
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     INIT ALL
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initMobileNav();
    initNavbarScroll();
    initFloatingCTA();
    initCounters();
    initSmoothAnchors();
    initFAQ();
  });
})();
