/* ========================================
   MAIN JS — Nail Salon Greenville
   Animation system + Alpine.js components
   ======================================== */

/* --- CAPA 2: Scroll Reveal (Intersection Observer) --- */
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

/* --- CAPA 4: Counter Animation --- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  };

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

/* --- CAPA 4: Custom Cursor (luxury) --- */
function initCursor() {
  if (window.matchMedia('(pointer: fine)').matches === false) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  }, { passive: true });

  function followRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
    rafId = requestAnimationFrame(followRing);
  }
  followRing();

  const hoverTargets = 'a, button, .btn, .salon-card, .service-card, .blog-card, .faq-item__question, input, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    }
  });
}

/* --- Init on DOM ready --- */
document.addEventListener('DOMContentLoaded', () => {
  /* Scroll reveal */
  document.querySelectorAll('[data-animate]').forEach((el) => {
    scrollObserver.observe(el);
  });

  /* Counters */
  document.querySelectorAll('[data-counter]').forEach((el) => {
    counterObserver.observe(el);
  });

  /* Text split reveal */
  initSplitText();

  /* Custom cursor */
  initCursor();

  /* Magnetic buttons */
  initMagnetic();

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

/* --- Text Split Reveal --- */
function initSplitText() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  document.querySelectorAll('[data-split]').forEach((el) => {
    const text = el.textContent;
    el.innerHTML = '';
    let charIndex = 0;
    for (const char of text) {
      if (char === ' ' || char === '\n') {
        const space = document.createElement('span');
        space.className = 'char-space';
        el.appendChild(space);
      } else {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        span.style.transitionDelay = `${charIndex * 0.03}s`;
        el.appendChild(span);
        charIndex++;
      }
    }
    scrollObserver.observe(el);
  });
}

/* --- Magnetic Button --- */
function initMagnetic() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* --- Alpine.js Components --- */
document.addEventListener('alpine:init', () => {

  /* Navigation */
  Alpine.data('navigation', () => ({
    open: false,
    scrolled: false,

    init() {
      this.handleScroll();
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    },

    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },

    toggle() {
      this.open = !this.open;
      document.body.style.overflow = this.open ? 'hidden' : '';
    },

    close() {
      this.open = false;
      document.body.style.overflow = '';
    }
  }));

  /* FAQ Accordion */
  Alpine.data('faqAccordion', () => ({
    activeIndex: null,

    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },

    isOpen(index) {
      return this.activeIndex === index;
    }
  }));

  /* Newsletter Form */
  Alpine.data('newsletterForm', () => ({
    email: '',
    subscribed: false,

    submit() {
      if (this.email.trim() && this.email.includes('@')) {
        this.subscribed = true;
      }
    }
  }));

  /* Contact Form */
  Alpine.data('contactForm', () => ({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    error: '',

    validate() {
      if (!this.name.trim()) {
        this.error = 'Please enter your name';
        return false;
      }
      if (!this.email.trim() || !this.email.includes('@')) {
        this.error = 'Please enter a valid email';
        return false;
      }
      if (!this.message.trim()) {
        this.error = 'Please enter your message';
        return false;
      }
      this.error = '';
      return true;
    },

    submit() {
      if (this.validate()) {
        this.submitted = true;
      }
    }
  }));
});
