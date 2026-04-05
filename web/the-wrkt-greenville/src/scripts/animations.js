/**
 * THE WRKT GREENVILLE — Animation Engine
 * Scroll reveal (IntersectionObserver) + Counter + FAQ accordion
 * Respects prefers-reduced-motion
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(el => {
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
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  // ===== COUNTER ANIMATION =====
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1600;
    const start = performance.now();

    function update(time) {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (prefersReducedMotion) {
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        el.textContent = prefix + target.toLocaleString() + suffix;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
  }

  // ===== FAQ ACCORDION =====
  function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');
    if (!triggers.length) return;

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const content = trigger.nextElementSibling;

        // Close all others
        triggers.forEach(other => {
          if (other !== trigger) {
            other.setAttribute('aria-expanded', 'false');
            const otherContent = other.nextElementSibling;
            if (otherContent) {
              otherContent.style.maxHeight = '0';
              otherContent.style.opacity = '0';
            }
          }
        });

        // Toggle current
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (content) {
          if (!expanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
          } else {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
          }
        }
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  // ===== MOBILE NAV TOGGLE =====
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== NAVBAR SCROLL BEHAVIOR =====
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 80) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }

      if (currentScroll > lastScroll && currentScroll > 300) {
        navbar.classList.add('is-hidden');
      } else {
        navbar.classList.remove('is-hidden');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ===== MAGNETIC BUTTON (premium CTA feel) =====
  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    if (!matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const bound = 80;

      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);

        if (dist < bound) {
          const pull = 1 - dist / bound;
          btn.style.transform = `translate(${x * pull * 0.3}px, ${y * pull * 0.3}px)`;
        }
      });

      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 400ms cubic-bezier(0.16,1,0.3,1)';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });
    });
  }

  // ===== TEXT SPLIT REVEAL =====
  function initSplitReveal() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('[data-split]').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w, i) =>
        `<span class="word" style="--i:${i}"><span class="word-inner">${w}</span></span>`
      ).join(' ');
      el.setAttribute('data-animate', 'split');
    });
  }

  // ===== SECTION PROGRESS DOTS =====
  function initSectionDots() {
    const sections = document.querySelectorAll('section[id]');
    const dotsContainer = document.querySelector('.section-dots');
    if (!dotsContainer || !sections.length) return;

    dotsContainer.innerHTML = [...sections].map(s =>
      `<a href="#${s.id}" class="dot" data-section="${s.id}" aria-label="${s.dataset.label || s.id}"></a>`
    ).join('');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const dot = dotsContainer.querySelector(`[data-section="${e.target.id}"]`);
        if (dot) dot.classList.toggle('active', e.isIntersecting);
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  // ===== STUDIO TOUR GALLERY =====
  function initStudioTour() {
    const galleries = document.querySelectorAll('.studio-tour');
    if (!galleries.length) return;

    galleries.forEach(gallery => {
      const slides = gallery.querySelectorAll('.tour-slide');
      const dots = gallery.querySelectorAll('.tour-dot');
      const prevBtn = gallery.querySelector('.tour-prev');
      const nextBtn = gallery.querySelector('.tour-next');
      let current = 0;

      function goTo(index) {
        slides.forEach((s, i) => {
          s.classList.toggle('is-active', i === index);
          s.setAttribute('aria-hidden', String(i !== index));
        });
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === index);
          d.setAttribute('aria-current', String(i === index));
        });
        current = index;
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          goTo(current > 0 ? current - 1 : slides.length - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          goTo(current < slides.length - 1 ? current + 1 : 0);
        });
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
      });

      // Touch/swipe support
      let startX = 0;
      gallery.addEventListener('pointerdown', (e) => { startX = e.clientX; });
      gallery.addEventListener('pointerup', (e) => {
        const diff = e.clientX - startX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) goTo(current > 0 ? current - 1 : slides.length - 1);
          else goTo(current < slides.length - 1 ? current + 1 : 0);
        }
      });

      // Keyboard
      gallery.setAttribute('tabindex', '0');
      gallery.setAttribute('role', 'region');
      gallery.setAttribute('aria-label', 'Studio tour gallery');
      gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(current > 0 ? current - 1 : slides.length - 1);
        if (e.key === 'ArrowRight') goTo(current < slides.length - 1 ? current + 1 : 0);
      });

      // Auto-advance every 5s (pauses on hover)
      let autoplay = setInterval(() => {
        goTo(current < slides.length - 1 ? current + 1 : 0);
      }, 5000);

      gallery.addEventListener('pointerenter', () => clearInterval(autoplay));
      gallery.addEventListener('pointerleave', () => {
        autoplay = setInterval(() => {
          goTo(current < slides.length - 1 ? current + 1 : 0);
        }, 5000);
      });

      goTo(0);
    });
  }

  // ===== CONTACT FORM SUBMISSION =====
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    const dialog = document.getElementById('confirm-dialog');
    if (!form || !dialog) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const interest = form.querySelector('#interest');

      if (!name.value.trim() || !email.value.trim() || !interest.value) {
        // Let native validation handle it
        form.reportValidity();
        return;
      }

      // Show confirmation dialog
      dialog.showModal();

      // Reset form
      form.reset();
    });
  }

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounters();
    initFaqAccordion();
    initSmoothScroll();
    initMobileNav();
    initNavbarScroll();
    initMagneticButtons();
    initSplitReveal();
    initSectionDots();
    initStudioTour();
    initContactForm();
  });
})();
