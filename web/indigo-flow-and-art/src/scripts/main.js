/* ============================================
   INDIGO FLOW AND ART — Main JS
   Scroll Observer, Nav, Lightbox, Counters, Mobile Menu,
   + Interactive Experiences: Gallery Tour, Booking Stepper,
     Process Timeline, Magnetic Buttons, Text Split Reveal
   ============================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================
     CORE: Scroll Reveal (Intersection Observer)
     ============================================ */
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

  /* ============================================
     CORE: Nav Scroll Effect
     ============================================ */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    function updateNav() {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================
     CORE: Mobile Menu
     ============================================ */
  function initMobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.nav__mobile');
    if (!toggle || !mobileMenu) return;

    const toggleBars = toggle.querySelectorAll('span');

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
      if (toggleBars.length >= 3) {
        toggleBars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        toggleBars[1].style.opacity = '0';
        toggleBars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      }
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
      if (toggleBars.length >= 3) {
        toggleBars[0].style.transform = 'none';
        toggleBars[1].style.opacity = '1';
        toggleBars[2].style.transform = 'none';
      }
    }

    toggle.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ============================================
     CORE: Animated Counters
     ============================================ */
  function initCounters() {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-counter]').forEach(el => {
        el.textContent = parseInt(el.dataset.counter).toLocaleString();
      });
      return;
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

    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
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

  /* ============================================
     CORE: Lightbox (Art Gallery)
     ============================================ */
  function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const src = trigger.dataset.lightbox || trigger.querySelector('img')?.src;
        const alt = trigger.dataset.lightboxAlt || trigger.querySelector('img')?.alt || '';
        if (src && lightboxImg) {
          lightboxImg.src = src;
          lightboxImg.alt = alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ============================================
     CORE: Smooth Scroll for Anchor Links
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ============================================
     EXPERIENCE 1: Gallery Tour (Fine Art page)
     Swipeable gallery with dots, crossfade, keyboard nav
     ============================================ */
  function initGalleryTour() {
    const galleries = document.querySelectorAll('.gallery-tour');
    if (!galleries.length) return;

    galleries.forEach(gallery => {
      const slides = gallery.querySelectorAll('.gallery-tour__slide');
      const dotsContainer = gallery.querySelector('.gallery-tour__dots');
      const prevBtn = gallery.querySelector('.gallery-tour__prev');
      const nextBtn = gallery.querySelector('.gallery-tour__next');
      if (slides.length < 2) return;

      let current = 0;

      // Build dots
      if (dotsContainer) {
        slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = 'gallery-tour__dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('aria-label', `View artwork ${i + 1}`);
          dot.addEventListener('click', () => goTo(i));
          dotsContainer.appendChild(dot);
        });
      }

      function goTo(index) {
        slides[current].classList.remove('active');
        if (dotsContainer) {
          dotsContainer.children[current]?.classList.remove('active');
        }

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('active');
        if (dotsContainer) {
          dotsContainer.children[current]?.classList.add('active');
        }
      }

      if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

      // Keyboard nav
      gallery.setAttribute('tabindex', '0');
      gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
      });

      // Touch/swipe support with pointer events
      let startX = 0;
      let deltaX = 0;

      gallery.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
        deltaX = 0;
      });

      gallery.addEventListener('pointermove', (e) => {
        deltaX = e.clientX - startX;
      });

      gallery.addEventListener('pointerup', () => {
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) goTo(current - 1);
          else goTo(current + 1);
        }
        deltaX = 0;
      });

      // Auto-advance every 5s (pause on hover)
      let autoTimer = setInterval(() => goTo(current + 1), 5000);
      gallery.addEventListener('pointerenter', () => clearInterval(autoTimer));
      gallery.addEventListener('pointerleave', () => {
        autoTimer = setInterval(() => goTo(current + 1), 5000);
      });
    });
  }

  /* ============================================
     EXPERIENCE 2: Booking Stepper (Pilates page)
     Step-by-step visual booking flow
     ============================================ */
  function initBookingStepper() {
    const steppers = document.querySelectorAll('.booking-stepper');
    if (!steppers.length) return;

    steppers.forEach(stepper => {
      const steps = stepper.querySelectorAll('.stepper__step');
      const panels = stepper.querySelectorAll('.stepper__panel');
      const progressBar = stepper.querySelector('.stepper__progress-fill');
      const prevBtn = stepper.querySelector('.stepper__prev');
      const nextBtn = stepper.querySelector('.stepper__next');
      if (steps.length < 2) return;

      let current = 0;
      const total = steps.length;

      function updateStep(index) {
        // Update step indicators
        steps.forEach((step, i) => {
          step.classList.toggle('active', i === index);
          step.classList.toggle('completed', i < index);
        });

        // Update panels with slide transition
        panels.forEach((panel, i) => {
          panel.classList.toggle('active', i === index);
          if (!prefersReducedMotion) {
            if (i === index) {
              panel.style.animation = 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            } else {
              panel.style.animation = 'none';
            }
          }
        });

        // Update progress bar
        if (progressBar) {
          const pct = ((index) / (total - 1)) * 100;
          progressBar.style.width = `${pct}%`;
        }

        // Update button states
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) {
          nextBtn.textContent = index === total - 1 ? 'Book Now' : 'Next';
        }

        current = index;
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (current > 0) updateStep(current - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (current < total - 1) {
            updateStep(current + 1);
          } else {
            // Final step: trigger booking action
            const bookingLink = stepper.dataset.bookingUrl;
            if (bookingLink) {
              window.open(bookingLink, '_blank');
            }
          }
        });
      }

      // Allow clicking step indicators to navigate
      steps.forEach((step, i) => {
        step.addEventListener('click', () => {
          if (i <= current + 1) updateStep(i);
        });
      });

      // Initialize
      updateStep(0);
    });
  }

  /* ============================================
     EXPERIENCE 3: Process Timeline (How to Begin)
     SVG line draws progressively on scroll
     ============================================ */
  function initProcessTimeline() {
    const timelines = document.querySelectorAll('.process-timeline');
    if (!timelines.length || prefersReducedMotion) return;

    timelines.forEach(timeline => {
      const line = timeline.querySelector('.timeline__line-progress');
      const items = timeline.querySelectorAll('.timeline__item');
      if (!line || !items.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const rect = timeline.getBoundingClientRect();
              const viewportH = window.innerHeight;
              const scrollPct = Math.min(1, Math.max(0,
                (viewportH - rect.top) / (rect.height + viewportH * 0.5)
              ));

              line.style.transform = `scaleY(${scrollPct})`;

              items.forEach((item, i) => {
                const itemRect = item.getBoundingClientRect();
                const itemVisible = itemRect.top < viewportH * 0.75;
                if (itemVisible) {
                  item.classList.add('is-visible');
                }
              });
            }
          });
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      );

      // Also listen to scroll for smooth line progress
      function updateTimeline() {
        const rect = timeline.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const scrollPct = Math.min(1, Math.max(0,
          (viewportH - rect.top) / (rect.height + viewportH * 0.3)
        ));

        line.style.transform = `scaleY(${scrollPct})`;

        items.forEach(item => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < viewportH * 0.75) {
            item.classList.add('is-visible');
          }
        });
      }

      let scrollTicking = false;
      window.addEventListener('scroll', () => {
        if (!scrollTicking) {
          requestAnimationFrame(() => {
            updateTimeline();
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      }, { passive: true });

      observer.observe(timeline);
    });
  }

  /* ============================================
     EXPERIENCE 4 (Universal): Magnetic Buttons
     CTA buttons that subtly attract toward cursor
     ============================================ */
  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    if (!matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const bound = 80;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);

        if (dist < bound) {
          const pull = 1 - dist / bound;
          btn.style.transform = `translate(${x * pull * 0.3}px, ${y * pull * 0.3}px)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)';
        btn.style.transform = '';
        setTimeout(() => {
          btn.style.transition = '';
        }, 400);
      });
    });
  }

  /* ============================================
     EXPERIENCE 5 (Universal): Text Split Reveal
     Titles reveal word-by-word on scroll
     ============================================ */
  function initTextSplitReveal() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('[data-split]').forEach(el => {
      const text = el.textContent.trim();
      const words = text.split(/\s+/);
      el.innerHTML = words.map((w, i) =>
        `<span class="word" style="--i:${i}"><span class="word-inner">${w}</span></span>`
      ).join(' ');
      el.setAttribute('data-animate', 'split');
      el.classList.add('split-ready');
    });
  }

  /* ============================================
     INIT ALL
     ============================================ */
  function init() {
    // Core
    initScrollReveal();
    initNavScroll();
    initMobileMenu();
    initCounters();
    initLightbox();
    initSmoothScroll();

    // Experiences
    initGalleryTour();
    initBookingStepper();
    initProcessTimeline();
    initMagneticButtons();
    initTextSplitReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
