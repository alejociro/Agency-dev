/* ============================================
   ANIMATIONS ENGINE — GVL LIMO
   Scroll observer + Counter + Custom cursor
   ============================================ */

// ---- Scroll Reveal (Intersection Observer) ----
function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
}

// ---- Animated Counters ----
function initCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, prefersReduced);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach((el) => observer.observe(el));
}

function animateCounter(el, instant) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';

  if (instant) {
    el.textContent = prefix + target.toLocaleString() + suffix;
    return;
  }

  const duration = 1500;
  const start = performance.now();

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

  requestAnimationFrame(update);
}

// ---- Custom Cursor (pointer devices only) ----
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.querySelector('.custom-cursor');
  const ring = document.querySelector('.cursor-ring');
  if (!cursor || !ring) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 5 + 'px';
    cursor.style.top = mouseY - 5 + 'px';
  });

  function followRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX - 20 + 'px';
    ring.style.top = ringY - 20 + 'px';
    requestAnimationFrame(followRing);
  }
  requestAnimationFrame(followRing);

  // Expand on interactive elements
  const interactives = 'a, button, [role="button"], input, textarea, select, .card, .card-vehicle';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      ring.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      ring.classList.remove('is-hovering');
    }
  });
}

// ---- Smooth anchor scroll offset (for fixed header) ----
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ---- Init everything on DOM ready ----
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initCursor();
  initSmoothAnchors();
});
