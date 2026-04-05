/* ========================================
   MAIN JS — Boss Barber Studio
   Vanilla interactions + animation fallbacks
   ======================================== */

const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_SCROLL_DRIVEN = CSS.supports && CSS.supports('animation-timeline', 'view()');

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollFallback();
  initSmoothScroll();
  initGalleryLightbox();
  initLocationTabs();
  initCounterAnimation();
  initNavbarScroll();
  initKineticText();
  initMagneticButtons();
  initSectionDots();
  initBookingStepper();
});

/* ---- MOBILE MENU ---- */
function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const overlay = document.querySelector('[data-menu-overlay]');
  const links = menu?.querySelectorAll('a');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    overlay?.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);
  links?.forEach(link => link.addEventListener('click', closeMenu));
}

/* ---- SCROLL ANIMATIONS FALLBACK (IO for browsers without scroll-driven) ---- */
function initScrollFallback() {
  if (PREFERS_REDUCED) return;

  /* If browser supports scroll-driven CSS, no JS needed for [data-scroll] */
  if (HAS_SCROLL_DRIVEN) return;

  const elements = document.querySelectorAll('[data-scroll]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---- SMOOTH SCROLL ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('[data-navbar]')?.offsetHeight || 0;
      const top = target.offsetTop - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---- GALLERY LIGHTBOX ---- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('[data-gallery-item]');
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('[data-lightbox-close]');

  if (!galleryItems.length || !lightbox) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

/* ---- LOCATION TABS ---- */
function initLocationTabs() {
  const tabs = document.querySelectorAll('[data-location-tab]');
  const panels = document.querySelectorAll('[data-location-panel]');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.locationTab;
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      panels.forEach(panel => {
        panel.classList.toggle('is-active', panel.dataset.locationPanel === target);
      });
    });
  });
}

/* ---- COUNTER ANIMATION ---- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.counterSuffix || '';

        if (PREFERS_REDUCED) {
          el.textContent = target + suffix;
        } else {
          animateCounter(el, target, suffix);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ---- NAVBAR SCROLL ---- */
function initNavbarScroll() {
  const navbar = document.querySelector('[data-navbar]');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 500) {
      navbar.classList.add('is-hidden');
    } else {
      navbar.classList.remove('is-hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---- KINETIC TEXT (word-by-word reveal for hero) ---- */
function initKineticText() {
  if (PREFERS_REDUCED) return;

  document.querySelectorAll('[data-kinetic]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) =>
      `<span class="kw" style="--i:${i}"><span class="kw-inner">${w}</span></span>`
    ).join(' ');
    el.classList.add('kinetic-ready');

    /* For page-load hero kinetic, trigger immediately */
    if (el.closest('.hero')) {
      setTimeout(() => el.classList.add('is-visible'), 350);
    }
  });

  /* Fallback for non-hero kinetic text */
  if (!HAS_SCROLL_DRIVEN) {
    const kineticEls = document.querySelectorAll('[data-kinetic]:not(.hero [data-kinetic])');
    if (!kineticEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    kineticEls.forEach(el => observer.observe(el));
  }
}

/* ---- MAGNETIC BUTTONS (desktop only) ---- */
function initMagneticButtons() {
  if (!matchMedia('(pointer: fine)').matches) return;

  if (PREFERS_REDUCED) return;

  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    const strength = 0.25;
    const radius = 100;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      if (dist < radius) {
        const pull = 1 - dist / radius;
        btn.style.transform = `translate(${x * pull * strength}px, ${y * pull * strength}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = '';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });
}

/* ---- SECTION DOT NAVIGATION ---- */
function initSectionDots() {
  const sections = document.querySelectorAll('section[id]');
  const dotsContainer = document.querySelector('.section-dots');

  if (!dotsContainer || !sections.length) return;

  dotsContainer.innerHTML = [...sections].map(s =>
    `<button class="section-dot" data-dot="${s.id}" aria-label="Go to ${s.dataset.label || s.id}"></button>`
  ).join('');

  const dots = dotsContainer.querySelectorAll('.section-dot');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.dot);
      if (target) {
        const navHeight = document.querySelector('[data-navbar]')?.offsetHeight || 0;
        window.scrollTo({ top: target.offsetTop - navHeight - 20, behavior: 'smooth' });
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const dot = dotsContainer.querySelector(`[data-dot="${entry.target.id}"]`);
      if (dot) dot.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

/* ---- BOOKING STEPPER ANIMATION ---- */
function initBookingStepper() {
  const stepper = document.querySelector('.booking-stepper');
  if (!stepper) return;

  const steps = stepper.querySelectorAll('.booking-step');
  const connectors = stepper.querySelectorAll('.booking-connector');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        steps.forEach((step, i) => {
          setTimeout(() => {
            step.classList.add('is-highlighted');
            if (connectors[i]) connectors[i].classList.add('is-filled');
          }, i * 300);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(stepper);
}
