/* ===================================
   MAIN JS — SERVI TAXES LLC
   Scroll reveal, header, FAQ, counters, mobile menu
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeader();
  initFAQ();
  initCountUp();
  initMobileMenu();
  initSmoothScroll();
});

/* ---- Scroll Reveal (IntersectionObserver) ---- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('is-visible'));
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---- Sticky Header ---- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });
}

/* ---- FAQ Accordion ---- */
function initFAQ() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all
      items.forEach(other => {
        other.classList.remove('is-open');
        const otherAnswer = other.querySelector('.faq__answer');
        if (otherAnswer) otherAnswer.style.maxHeight = '0';
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ---- Counter Animation ---- */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';

        if (prefersReducedMotion) {
          el.textContent = prefix + target.toLocaleString() + suffix;
        } else {
          animateCount(el, 0, target, 1800, prefix, suffix);
        }

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCount(el, start, end, duration, prefix, suffix) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + (end - start) * eased);

    el.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const toggle = document.querySelector('.header__toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = menu ? menu.querySelectorAll('a') : [];

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    menu.classList.toggle('is-open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Smooth Scroll for anchor links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
