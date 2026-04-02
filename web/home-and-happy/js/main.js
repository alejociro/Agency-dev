/* ============================================
   MAIN JS — Home & Happy
   Alpine.js stores + 4-layer animation system
   ============================================ */

/* ---- Alpine.js Components ---- */
document.addEventListener('alpine:init', () => {

  /* Mobile navigation */
  Alpine.store('nav', {
    open: false,
    toggle() { this.open = !this.open; },
    close()  { this.open = false; }
  });

  /* FAQ accordion */
  Alpine.data('faq', () => ({
    active: null,
    toggle(index) {
      this.active = this.active === index ? null : index;
    }
  }));

  /* Gallery carousel — duplicate slides for infinite loop */
  Alpine.data('gallery', () => ({}));

});

/* ============================================
   LAYER 2 — Scroll Reveal (Intersection Observer)
   Supports: data-reveal, data-reveal="left|right|scale"
             data-reveal-stagger (for grids)
   ============================================ */
function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    /* Show everything immediately if reduced motion */
    document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   LAYER 4 — Animated Counters
   Usage: <span data-counter="150"></span>
   ============================================ */
function initCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (prefersReduced) {
    counters.forEach(el => {
      el.textContent = parseInt(el.dataset.counter).toLocaleString();
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => {
    el.textContent = '0';
    observer.observe(el);
  });
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1500;
  const start = performance.now();

  function update(time) {
    const progress = Math.min((time - start) / duration, 1);
    /* Ease-out cubic */
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
   Navbar — background on scroll
   ============================================ */
function initNavScroll() {
  const nav = document.querySelector('[data-nav]');
  if (!nav) return;

  const sentinel = document.querySelector('[data-nav-sentinel]');
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );

  observer.observe(sentinel);
}

/* ============================================
   Smooth scroll for anchor links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Close mobile nav if open */
        if (typeof Alpine !== 'undefined') {
          Alpine.store('nav').close();
        }
      }
    });
  });
}

/* ============================================
   Reading progress bar (JS fallback for
   browsers without scroll-timeline)
   ============================================ */
function initReadingProgress() {
  /* Only if CSS scroll-timeline is NOT supported */
  if (CSS.supports && CSS.supports('animation-timeline', 'scroll()')) return;

  const bar = document.querySelector('.reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.scale = `${progress} 1`;
  }, { passive: true });
}

/* ============================================
   Testimonial arrows
   ============================================ */
function initTestimonialNav() {
  const track = document.querySelector('[data-testimonials-track]');
  const prevBtn = document.querySelector('[data-testimonial-prev]');
  const nextBtn = document.querySelector('[data-testimonial-next]');
  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 400;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* ============================================
   Gallery Carousel — duplicate slides for
   seamless infinite scroll
   ============================================ */
function initGalleryCarousel() {
  const track = document.querySelector('.gallery-carousel__track');
  if (!track) return;

  const slides = track.querySelectorAll('.gallery-carousel__slide');
  /* Clone all slides and append for seamless loop */
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });
}

/* ============================================
   Init everything on DOM ready
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initNavScroll();
  initSmoothScroll();
  initReadingProgress();
  initGalleryCarousel();
  initTestimonialNav();
});
