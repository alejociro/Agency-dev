/* ── Handyman Greenville SC — Main JS ──────────────── */
/* 4-layer animation system + UI interactions           */
/* Alpine.js handles menu toggle & FAQ accordion        */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────── */
  /* CAPA 2 — Scroll Reveal (Intersection Observer)     */
  /* ─────────────────────────────────────────────────── */
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    animatedEls.forEach((el) => revealObserver.observe(el));
  }

  /* ─────────────────────────────────────────────────── */
  /* CAPA 4 — Animated Counters                         */
  /* ─────────────────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
      const target = parseInt(el.dataset.counter, 10);
      if (prefersReduced) {
        el.textContent = target.toLocaleString();
        return;
      }
      const duration = 1500;
      const start = performance.now();
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';

      function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = prefix + target.toLocaleString() + suffix;
      }
      requestAnimationFrame(update);
    }

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
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ─────────────────────────────────────────────────── */
  /* Navigation — scroll shrink                         */
  /* ─────────────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    const hero = document.querySelector('.hero');
    if (hero) navObserver.observe(hero);
  }

  /* ─────────────────────────────────────────────────── */
  /* Sticky CTA — mobile only                           */
  /* ─────────────────────────────────────────────────── */
  const stickyCta = document.querySelector('.sticky-cta');
  if (stickyCta) {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const stickyObserver = new IntersectionObserver(
        ([entry]) => {
          stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
        },
        { threshold: 0 }
      );
      stickyObserver.observe(heroSection);
    }
  }

  /* ─────────────────────────────────────────────────── */
  /* Before/After slider                                */
  /* ─────────────────────────────────────────────────── */
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const afterImg = slider.querySelector('.ba-slider__after');
    const handle = slider.querySelector('.ba-slider__handle');
    let isDragging = false;

    function updatePosition(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(5, Math.min(95, percent));
      afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = `${percent}%`;
    }

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updatePosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      updatePosition(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchend', () => {
      isDragging = false;
    });
  });

  /* ─────────────────────────────────────────────────── */
  /* CAPA 4 — Parallax on hero background               */
  /* ─────────────────────────────────────────────────── */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────── */
  /* Form submission → native dialog                    */
  /* ─────────────────────────────────────────────────── */
  const quoteForm = document.querySelector('.quote-form');
  const successDialog = document.getElementById('success-dialog');
  if (quoteForm && successDialog) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      successDialog.showModal();
      quoteForm.reset();
    });
  }
});
