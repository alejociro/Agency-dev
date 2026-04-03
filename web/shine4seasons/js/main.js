/* ── Main JS — Shine 4 Seasons Salon ─────────── */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll Reveal (Layer 2) ─────────────────── */
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    if (prefersReducedMotion) {
      el.classList.add('is-visible');
    } else {
      scrollObserver.observe(el);
    }
  });

  /* ── Nav Scroll Behavior ─────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastScroll = 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      nav.classList.toggle('nav--scrolled', scrollY > 60);
      lastScroll = scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Menu Toggle ──────────────────────── */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Progress Bar (Layer 4) ───────────── */
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.inlineSize = `${progress}%`;
    }, { passive: true });
  }

  /* ── Scroll-to-Top Button ────────────────────── */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Animated Counters (Layer 4) ─────────────── */
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

  document.querySelectorAll('[data-counter]').forEach((el) => {
    if (prefersReducedMotion) {
      el.textContent = parseInt(el.dataset.counter, 10).toLocaleString();
    } else {
      counterObserver.observe(el);
    }
  });

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString() + suffix;
    };

    requestAnimationFrame(update);
  }

  /* ── Custom Cursor (Layer 4 — pointer devices) ── */
  if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
    const cursor = document.querySelector('.cursor');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursor && cursorRing) {
      let mouseX = 0;
      let mouseY = 0;
      let ringX = 0;
      let ringY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      });

      // Smooth ring follow
      const followRing = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        requestAnimationFrame(followRing);
      };
      requestAnimationFrame(followRing);

      // Expand on interactive elements
      const hoverTargets = document.querySelectorAll('a, button, .btn, .service-card, .gallery-item, .hero__panel');
      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
      });

      // Click effect
      document.addEventListener('mousedown', () => cursorRing.classList.add('clicking'));
      document.addEventListener('mouseup', () => cursorRing.classList.remove('clicking'));
    }
  }

  /* ── Hero Panel Touch Support (mobile) ───────── */
  document.querySelectorAll('.hero__panel').forEach((panel) => {
    panel.addEventListener('touchstart', () => {
      // Remove active from siblings
      panel.parentElement.querySelectorAll('.hero__panel').forEach((p) => p.classList.remove('active'));
      panel.classList.add('active');
    }, { passive: true });
  });

  /* ── Smooth scroll for anchor links ──────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
