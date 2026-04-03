/* ========================================
   MAIN JS — Around The House Service
   Nav, scroll, animations, FAQ, counters
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Navbar scroll effect ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ── */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      toggle.classList.toggle('nav__toggle--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        toggle.classList.remove('nav__toggle--open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Current year in footer ── */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Intersection Observer for scroll animations ── */
  if (!prefersReducedMotion) {
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

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  /* ── Animated counters ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    if (isNaN(target)) return;

    const duration = 1500;
    const start = performance.now();
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    function update(time) {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(ease * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    if (prefersReducedMotion) {
      el.textContent = prefix + target.toLocaleString() + suffix;
    } else {
      requestAnimationFrame(update);
    }
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Close all siblings
      item.parentElement.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  /* ── Form submission ── */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate — replace with real endpoint
      setTimeout(() => {
        btn.textContent = 'Sent! We\'ll call you soon.';
        btn.classList.remove('btn-primary');
        btn.style.backgroundColor = 'var(--color-secondary)';
        btn.style.borderColor = 'var(--color-secondary)';
        btn.style.color = 'var(--color-text-light)';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.add('btn-primary');
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  /* ── Click-to-call tracking (placeholder) ── */
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'click_to_call', {
          event_category: 'contact',
          event_label: link.textContent.trim()
        });
      }
    });
  });

  /* ── Testimonials auto-scroll ── */
  const track = document.getElementById('testimonials-track');
  if (track && !prefersReducedMotion) {
    const cards = Array.from(track.children);
    cards.forEach(card => {
      track.appendChild(card.cloneNode(true));
    });
  }
});
