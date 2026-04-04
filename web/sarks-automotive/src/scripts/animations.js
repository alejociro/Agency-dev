/**
 * SARKS AUTOMOTIVE — Animation Controller
 * Handles: Scroll reveal, counters, sticky nav
 * Respects prefers-reduced-motion
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll Reveal (Intersection Observer) ──
  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }

  // ── Animated Counters ──
  function initCounters() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-counter]').forEach(el => {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    if (prefersReducedMotion) {
      el.textContent = prefix + target.toLocaleString() + suffix;
      return;
    }

    const duration = 1500;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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

  // ── Sticky Nav ──
  function initStickyNav() {
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;

    let lastScroll = 0;
    const threshold = 80;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > threshold) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ── Mobile Menu Toggle ──
  function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu]');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // ── Smooth scroll for anchor links ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  // ── Initialize ──
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    initScrollReveal();
    initCounters();
    initStickyNav();
    initMobileMenu();
    initSmoothScroll();
  });
})();
