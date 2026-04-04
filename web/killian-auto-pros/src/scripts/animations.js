/**
 * KILLIAN AUTO PROS — Animation & Experience Controller
 * Scroll reveals, counters, nav, mobile menu,
 * magnetic buttons, text split reveal, section dots,
 * appointment stepper, service filter tabs
 */

(function () {
  'use strict';

  /* Guard: reduced motion */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const isFineMouse = window.matchMedia('(pointer: fine)').matches;

  /* ================================================
     SCROLL REVEAL — Intersection Observer
     ================================================ */
  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-animate]').forEach((el) => {
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

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });
  }

  /* ================================================
     ANIMATED COUNTERS
     ================================================ */
  function animateCounter(el) {
    if (prefersReducedMotion) {
      el.textContent = parseInt(el.dataset.target, 10).toLocaleString();
      return;
    }

    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function update(time) {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (!counterEls.length) return;

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

    counterEls.forEach((el) => observer.observe(el));
  }

  /* ================================================
     NAVBAR SCROLL STATE
     ================================================ */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 80) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ================================================
     MOBILE MENU TOGGLE
     ================================================ */
  function initMobileMenu() {
    const trigger = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('.mobile-menu');
    const body = document.body;
    if (!trigger || !menu) return;

    let isOpen = false;

    function open() {
      isOpen = true;
      menu.classList.remove('is-closing');
      menu.classList.add('is-open');
      trigger.classList.add('is-open');
      body.style.overflow = 'hidden';
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      isOpen = false;
      menu.classList.add('is-closing');
      menu.classList.remove('is-open');
      trigger.classList.remove('is-open');
      body.style.overflow = '';
      trigger.setAttribute('aria-expanded', 'false');

      menu.addEventListener(
        'animationend',
        () => {
          if (!isOpen) menu.classList.remove('is-closing');
        },
        { once: true }
      );
    }

    trigger.addEventListener('click', () => {
      if (isOpen) close();
      else open();
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) close();
    });
  }

  /* ================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    });
  }

  /* ================================================
     EXPERIENCE: MAGNETIC BUTTON
     Subtle attraction toward cursor on CTA buttons.
     Only on fine-pointer (desktop) devices.
     ================================================ */
  function initMagneticButtons() {
    if (!isFineMouse || prefersReducedMotion) return;

    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const bound = 80;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);

        if (dist < bound) {
          const pull = 1 - dist / bound;
          btn.style.transform = `translate(${x * pull * 0.3}px, ${y * pull * 0.3}px)`;
          btn.style.transition = 'transform 100ms ease';
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition =
          'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          btn.style.transition = '';
        }, 400);
      });
    });
  }

  /* ================================================
     EXPERIENCE: TEXT SPLIT REVEAL
     Headings reveal word by word on scroll.
     Attribute: data-split on the element.
     ================================================ */
  function initTextSplitReveal() {
    document.querySelectorAll('[data-split]').forEach((el) => {
      const text = el.textContent.trim();
      if (!text) return;

      const words = text.split(/\s+/);
      el.innerHTML = words
        .map(
          (w, i) =>
            `<span class="word" style="--i:${i}"><span class="word-inner">${w}</span></span>`
        )
        .join(' ');

      el.setAttribute('data-animate', 'split');
    });
  }

  /* ================================================
     EXPERIENCE: SECTION PROGRESS DOTS
     Fixed dots on the right showing current section.
     ================================================ */
  function initSectionDots() {
    const sections = document.querySelectorAll('section[id]');
    const dotsContainer = document.querySelector('.section-dots');
    if (!dotsContainer || !sections.length) return;

    dotsContainer.innerHTML = [...sections]
      .map(
        (s) =>
          `<a href="#${s.id}" class="dot" data-section="${s.id}" aria-label="${s.dataset.label || s.id}"></a>`
      )
      .join('');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dot = dotsContainer.querySelector(
            `[data-section="${entry.target.id}"]`
          );
          if (dot) {
            dot.classList.toggle('active', entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ================================================
     EXPERIENCE: SERVICE FILTER TABS
     Filters service cards by category with FLIP anim.
     Attribute: data-service-filter on filter buttons,
                data-service-category on service cards.
     ================================================ */
  function initServiceFilter() {
    const filterBtns = document.querySelectorAll('[data-service-filter]');
    const container = document.querySelector('[data-service-grid]');
    if (!filterBtns.length || !container) return;

    const allCards = [...container.querySelectorAll('[data-service-category]')];

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.serviceFilter;

        /* Update active state on buttons */
        filterBtns.forEach((b) => b.classList.remove('filter-active'));
        btn.classList.add('filter-active');

        /* Capture first positions */
        const firstMap = new Map();
        allCards.forEach((card) => {
          firstMap.set(card, card.getBoundingClientRect());
        });

        /* Apply filter */
        allCards.forEach((card) => {
          if (category === 'all' || card.dataset.serviceCategory === category) {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = '';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.85)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });

        /* FLIP: animate visible cards to new position */
        if (!prefersReducedMotion) {
          requestAnimationFrame(() => {
            allCards.forEach((card) => {
              if (card.style.display === 'none') return;
              const first = firstMap.get(card);
              if (!first) return;
              const last = card.getBoundingClientRect();
              const dx = first.left - last.left;
              const dy = first.top - last.top;
              if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

              card.style.transform = `translate(${dx}px, ${dy}px)`;
              card.style.transition = 'none';
              requestAnimationFrame(() => {
                card.style.transition =
                  'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
                card.style.transform = '';
              });
            });
          });
        }
      });
    });
  }

  /* ================================================
     EXPERIENCE: APPOINTMENT STEPPER
     Multi-step form: Vehicle > Service > Location > Confirm
     ================================================ */
  function initAppointmentStepper() {
    const stepper = document.querySelector('[data-stepper]');
    if (!stepper) return;

    const steps = stepper.querySelectorAll('[data-step]');
    const nextBtns = stepper.querySelectorAll('[data-step-next]');
    const prevBtns = stepper.querySelectorAll('[data-step-prev]');
    const indicators = stepper.querySelectorAll('[data-step-indicator]');
    const progressBar = stepper.querySelector('[data-step-progress]');
    let currentStep = 0;

    function goToStep(index) {
      if (index < 0 || index >= steps.length) return;

      /* Hide current step */
      steps[currentStep].classList.remove('step-active');
      steps[currentStep].classList.add(
        index > currentStep ? 'step-exit-left' : 'step-exit-right'
      );

      /* Show target step */
      steps[index].classList.remove(
        'step-exit-left',
        'step-exit-right',
        'step-enter-left',
        'step-enter-right'
      );
      steps[index].classList.add(
        'step-active',
        index > currentStep ? 'step-enter-right' : 'step-enter-left'
      );

      /* Clean exit classes after animation */
      setTimeout(() => {
        steps[currentStep].classList.remove('step-exit-left', 'step-exit-right');
        steps[index].classList.remove('step-enter-left', 'step-enter-right');
        currentStep = index;
      }, 400);

      /* Update indicators */
      indicators.forEach((ind, i) => {
        ind.classList.toggle('indicator-active', i === index);
        ind.classList.toggle('indicator-done', i < index);
      });

      /* Update progress bar */
      if (progressBar) {
        const pct = ((index) / (steps.length - 1)) * 100;
        progressBar.style.width = `${pct}%`;
      }

      currentStep = index;
    }

    nextBtns.forEach((btn) => {
      btn.addEventListener('click', () => goToStep(currentStep + 1));
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener('click', () => goToStep(currentStep - 1));
    });

    /* Initialize: show first step */
    if (steps.length) {
      steps[0].classList.add('step-active');
      if (indicators.length) indicators[0].classList.add('indicator-active');
    }
  }

  /* ================================================
     INIT ALL
     ================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounters();
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
    initMagneticButtons();
    initTextSplitReveal();
    initSectionDots();
    initServiceFilter();
    initAppointmentStepper();
  });
})();
