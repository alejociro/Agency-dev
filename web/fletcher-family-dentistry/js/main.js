/* ═══════════════════════════════════════════════════════════════
   FLETCHER FAMILY DENTISTRY — Interactions & Animations
   Neo-orgánico: warm, organic, trustworthy
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────
   Reduced Motion Check
   ───────────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────
   NAVBAR — scroll state + mobile menu
   ───────────────────────────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (!navbar) return;

  // Scroll effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mobile menu toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', isActive);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

/* ─────────────────────────────────────
   SMOOTH SCROLL for anchor links
   ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

/* ─────────────────────────────────────
   SCROLL REVEAL — IO Fallback
   Only activates if scroll-driven not supported
   ───────────────────────────────────── */
if (!CSS.supports('animation-timeline', 'view()') && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('[data-scroll]').forEach(el => {
    revealObserver.observe(el);
  });

  // Also observe kinetic text elements
  document.querySelectorAll('[data-kinetic]').forEach(el => {
    revealObserver.observe(el);
  });

  // Team grid — observe for staggered avatar reveal fallback
  document.querySelectorAll('.team-grid').forEach(el => {
    revealObserver.observe(el);
  });
}

/* ─────────────────────────────────────
   KINETIC TEXT — word-by-word split
   ───────────────────────────────────── */
function initKineticText() {
  document.querySelectorAll('[data-kinetic]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((word, i) =>
      `<span class="kw" style="--i:${i}"><span class="kw-inner">${word}</span></span>`
    ).join(' ');
    el.classList.add('kinetic-ready');
  });
}
initKineticText();

/* ─────────────────────────────────────
   ANIMATED COUNTERS
   ───────────────────────────────────── */
function animateCounter(el) {
  if (prefersReducedMotion) {
    el.textContent = el.dataset.target;
    return;
  }

  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  function update(time) {
    const progress = Math.min((time - start) / duration, 1);
    // Ease out cubic — organic deceleration
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

// Trigger counters when they enter viewport
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
  el.dataset.target = el.textContent.replace(/[^0-9]/g, '');
  el.textContent = '0';
  counterObserver.observe(el);
});

/* ─────────────────────────────────────
   FAQ ACCORDION
   ───────────────────────────────────── */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(other => other.classList.remove('active'));

      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
})();

/* ─────────────────────────────────────
   MAGNETIC BUTTONS (desktop only)
   Organic pull toward cursor
   ───────────────────────────────────── */
if (matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    const strength = 0.25;
    const radius = 90;

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
      btn.style.transition = 'transform 0.5s cubic-bezier(0.22, 1.2, 0.36, 1)';
      btn.style.transform = '';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
  });
}

/* ─────────────────────────────────────
   HOURS TABLE — highlight today
   ───────────────────────────────────── */
(function highlightToday() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];

  document.querySelectorAll('.hours-row').forEach(row => {
    if (row.dataset.day === today) {
      row.classList.add('hours-row--today');
    }
  });
})();

/* ─────────────────────────────────────
   FORM VALIDATION (lightweight)
   ───────────────────────────────────── */
(function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll('[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#e74c3c';
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        }, { once: true });
      }
    });

    if (valid) {
      const btn = form.querySelector('.btn-primary');
      if (btn) {
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--color-secondary)';
        btn.style.color = 'var(--color-accent)';
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.style.color = '';
          form.reset();
        }, 3000);
      }
    }
  });
})();

/* ─────────────────────────────────────
   PHONE NUMBER FORMATTER (tel: link)
   ───────────────────────────────────── */
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.setAttribute('aria-label', `Call ${link.textContent.trim()}`);
});

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE EXPERIENCES
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────
   EXP: OPEN NOW / HOURS STATUS
   ───────────────────────────────────── */
(function initStatusBadge() {
  const badge = document.querySelector('.status-badge');
  if (!badge) return;

  const schedule = {
    1: { open: 8, close: 17 },  // Monday
    2: { open: 8, close: 17 },  // Tuesday
    3: null,                      // Wednesday — by appointment
    4: { open: 8, close: 17 },  // Thursday
    5: null,                      // Friday — by appointment
    6: null,                      // Saturday — closed
    0: null                       // Sunday — closed
  };

  function updateStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;
    const today = schedule[day];

    const dot = badge.querySelector('.status-dot');
    const text = badge.querySelector('.status-text');

    if (today && currentTime >= today.open && currentTime < today.close) {
      // Open
      badge.className = 'status-badge status-badge--open';
      dot.className = 'status-dot status-dot--open';
      const hoursLeft = Math.floor(today.close - currentTime);
      const minsLeft = Math.round((today.close - currentTime - hoursLeft) * 60);
      if (hoursLeft < 2) {
        text.textContent = `Open \u00b7 Closes in ${hoursLeft}h ${minsLeft}m`;
      } else {
        text.textContent = 'Open Now';
      }
    } else {
      // Closed
      badge.className = 'status-badge status-badge--closed';
      dot.className = 'status-dot status-dot--closed';

      // Find next open day
      let nextDay = day;
      for (let i = 1; i <= 7; i++) {
        nextDay = (day + i) % 7;
        if (schedule[nextDay]) break;
      }

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if (today && currentTime < today.open) {
        text.textContent = `Closed \u00b7 Opens at ${today.open}:00 AM`;
      } else {
        text.textContent = `Closed \u00b7 Opens ${dayNames[nextDay]} 8:00 AM`;
      }
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Update every minute
})();

/* ─────────────────────────────────────
   EXP: BOOKING STEPPER
   ───────────────────────────────────── */
(function initBookingStepper() {
  const stepper = document.querySelector('.booking-stepper');
  if (!stepper) return;

  let currentStep = 0;
  const panels = stepper.querySelectorAll('.stepper-panel');
  const steps = stepper.querySelectorAll('.stepper-step');
  const lines = stepper.querySelectorAll('.stepper-line');
  const nextBtns = stepper.querySelectorAll('[data-stepper="next"]');
  const backBtns = stepper.querySelectorAll('[data-stepper="back"]');

  function goToStep(index) {
    if (index < 0 || index >= panels.length) return;

    // Update panels
    panels.forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });

    // Update step indicators
    steps.forEach((s, i) => {
      s.classList.remove('active', 'completed');
      if (i === index) s.classList.add('active');
      if (i < index) s.classList.add('completed');
    });

    // Update lines
    lines.forEach((l, i) => {
      l.classList.toggle('filled', i < index);
    });

    currentStep = index;
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep + 1));
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep - 1));
  });

  // Service card selection
  stepper.querySelectorAll('.service-select-card').forEach(card => {
    card.addEventListener('click', () => {
      card.closest('.service-select-grid')
        .querySelectorAll('.service-select-card')
        .forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  goToStep(0);
})();

/* ─────────────────────────────────────
   EXP: SECTION DOT NAVIGATION
   ───────────────────────────────────── */
(function initSectionDots() {
  const dotsContainer = document.querySelector('.section-dots');
  const sections = document.querySelectorAll('section[id][data-label]');
  if (!dotsContainer || !sections.length) return;

  // Build dots
  sections.forEach(section => {
    const dot = document.createElement('button');
    dot.className = 'section-dot';
    dot.setAttribute('aria-label', section.dataset.label);
    dot.dataset.target = section.id;
    dot.addEventListener('click', () => {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  // Track active section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const dot = dotsContainer.querySelector(`[data-target="${entry.target.id}"]`);
      if (dot) dot.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();

/* ─────────────────────────────────────
   EXP: BENTO GRID IO (fallback)
   ───────────────────────────────────── */
if (!CSS.supports('animation-timeline', 'view()') && !prefersReducedMotion) {
  const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, i * 80);
        bentoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.bento-item').forEach(el => {
    bentoObserver.observe(el);
  });
}
