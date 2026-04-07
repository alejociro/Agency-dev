/* ============================================
   After Hours Plumbing — Main JS
   Alpine.js components + 4-layer animation system
   ============================================ */

/* ============================
   ALPINE.JS COMPONENTS
   ============================ */
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
    },
    isOpen(index) {
      return this.active === index;
    }
  }));

  /* Contact form */
  Alpine.data('contactForm', () => ({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    submitted: false,
    errors: {},

    validate() {
      this.errors = {};
      if (!this.fullName.trim()) this.errors.fullName = 'Name is required';
      if (!this.phone.trim())    this.errors.phone = 'Phone is required';
      if (!this.service)         this.errors.service = 'Please select a service';
      return Object.keys(this.errors).length === 0;
    },

    submit() {
      if (this.validate()) {
        this.submitted = true;
        document.getElementById('successDialog').showModal();
        /* Reset form */
        this.fullName = '';
        this.phone = '';
        this.email = '';
        this.service = '';
        this.message = '';
        this.submitted = false;
      }
    }
  }));
});

/* ============================
   CAPA 2 — SCROLL REVEAL (IntersectionObserver)
   ============================ */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      scrollReveal.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

/* ============================
   CAPA 4 — COUNTER ANIMATION
   ============================ */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  if (reducedMotion) {
    el.textContent = target + suffix;
    return;
  }

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    /* Ease-out quartic */
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }

  requestAnimationFrame(update);
}

/* ============================
   INIT — wire up all observers on DOMContentLoaded
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  /* Scroll reveal */
  document.querySelectorAll('[data-animate]').forEach(el => {
    scrollReveal.observe(el);
  });

  /* Counters */
  document.querySelectorAll('[data-counter]').forEach(el => {
    counterObserver.observe(el);
  });

  /* Header scroll state — add background opacity on scroll */
  const header = document.querySelector('.header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('header--scrolled', window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* Testimonials — CSS-driven infinite carousel (no JS needed for scroll) */
});
