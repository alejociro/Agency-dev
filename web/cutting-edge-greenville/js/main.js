/* ============================================
   MAIN JS — Cutting Edge Greenville
   4-layer animation system + interactions
   ============================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════
     CAPA 2 — Scroll Reveal (IntersectionObserver)
     ═══════════════════════════════════════════ */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if (animatedEls.length && !prefersReducedMotion) {
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

    animatedEls.forEach((el) => observer.observe(el));
  } else {
    // Reduced motion: show everything immediately
    animatedEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ═══════════════════════════════════════════
     CAPA 4 — Animated Counters
     ═══════════════════════════════════════════ */
  const counters = document.querySelectorAll('[data-counter]');

  if (counters.length && !prefersReducedMotion) {
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

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1500;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };

    requestAnimationFrame(update);
  }

  /* ═══════════════════════════════════════════
     NAVIGATION — scroll + mobile menu
     ═══════════════════════════════════════════ */
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ═══════════════════════════════════════════
     FAQ ACCORDION
     ═══════════════════════════════════════════ */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        document.querySelectorAll('.faq-item.active').forEach((open) => {
          open.classList.remove('active');
          open.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ═══════════════════════════════════════════
     SMOOTH SCROLL for anchor links
     ═══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ═══════════════════════════════════════════
     CONTACT FORM — submit + dialog
     ═══════════════════════════════════════════ */
  const form = document.querySelector('.contact-form');
  const dialog = document.getElementById('formDialog');

  if (form && dialog) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // In production, replace with actual form submission (Formspree, etc.)
      // For now, show success dialog
      dialog.showModal();
      form.reset();
    });

    // Close dialog on click outside
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }
});
