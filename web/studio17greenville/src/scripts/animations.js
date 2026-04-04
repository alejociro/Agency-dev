/**
 * Animation System — Studio 17
 * Intersection Observer + Counter + Nav scroll
 */

// ============================================
// SCROLL REVEAL — Intersection Observer
// ============================================

function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
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
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
}

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();
  const suffix = el.dataset.suffix || '';

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  };

  requestAnimationFrame(update);
}

function initCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (prefersReduced) {
            const target = parseInt(entry.target.dataset.target, 10);
            const suffix = entry.target.dataset.suffix || '';
            entry.target.textContent = target.toLocaleString() + suffix;
          } else {
            animateCounter(entry.target);
          }
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach((el) => {
    counterObserver.observe(el);
  });
}

// ============================================
// NAVIGATION SCROLL STATE
// ============================================

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.classList.add('nav-scrolled');
        } else {
          nav.classList.remove('nav-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// EXPERIENCE: MAGNETIC BUTTON (pointer:fine only)
// ============================================

function initMagneticButtons() {
  if (!matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 400ms cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => (btn.style.transition = ''), 400);
    });
  });
}

// ============================================
// EXPERIENCE: TEXT SPLIT REVEAL
// ============================================

function initSplitReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  document.querySelectorAll('[data-split]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map(
        (w, i) =>
          `<span class="word" style="--i:${i}"><span class="word-inner">${w}</span></span>`
      )
      .join(' ');
    el.setAttribute('data-animate', 'split');
  });
}

// ============================================
// EXPERIENCE: STUDIO TOUR (Visual Gallery)
// ============================================

function initStudioTour() {
  document.querySelectorAll('.tour-gallery').forEach((gallery) => {
    const slides = gallery.querySelectorAll('.tour-slide');
    const dots = gallery.querySelector('.tour-dots');
    const prevBtn = gallery.querySelector('.tour-prev');
    const nextBtn = gallery.querySelector('.tour-next');

    if (!slides.length) return;

    let current = 0;
    const total = slides.length;

    // Create dots
    if (dots) {
      dots.innerHTML = Array.from({ length: total }, (_, i) =>
        `<button class="tour-dot${i === 0 ? ' active' : ''}" aria-label="Slide ${i + 1}" data-index="${i}"></button>`
      ).join('');

      dots.addEventListener('click', (e) => {
        const dot = e.target.closest('.tour-dot');
        if (dot) goTo(parseInt(dot.dataset.index, 10));
      });
    }

    function goTo(index) {
      slides[current].classList.remove('active');
      current = (index + total) % total;
      slides[current].classList.add('active');

      if (dots) {
        dots.querySelectorAll('.tour-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch/swipe support
    let startX = 0;
    gallery.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
    });
    gallery.addEventListener('pointerup', (e) => {
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(current - 1);
        else goTo(current + 1);
      }
    });

    // Keyboard support
    gallery.setAttribute('tabindex', '0');
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', 'Studio tour gallery');
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });
  });
}

// ============================================
// EXPERIENCE: CLASS FINDER QUIZ
// ============================================

function initClassQuiz() {
  const quiz = document.querySelector('.class-quiz');
  if (!quiz) return;

  const steps = quiz.querySelectorAll('.quiz-step');
  const progressBar = quiz.querySelector('.quiz-progress-bar');
  let currentStep = 0;
  const answers = {};
  const total = steps.length;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
      if (i === index) {
        step.style.display = 'block';
        requestAnimationFrame(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateX(0)';
        });
      } else {
        step.style.opacity = '0';
        step.style.transform = i < index ? 'translateX(-30px)' : 'translateX(30px)';
        setTimeout(() => {
          if (!step.classList.contains('active')) step.style.display = 'none';
        }, 300);
      }
    });

    if (progressBar) {
      progressBar.style.width = `${((index + 1) / total) * 100}%`;
    }
  }

  quiz.addEventListener('click', (e) => {
    const option = e.target.closest('.quiz-option');
    if (!option) return;

    // Mark selected
    const stepEl = option.closest('.quiz-step');
    stepEl.querySelectorAll('.quiz-option').forEach((o) => o.classList.remove('selected'));
    option.classList.add('selected');

    // Store answer
    const key = stepEl.dataset.question;
    answers[key] = option.dataset.value;

    // Advance after brief delay
    setTimeout(() => {
      if (currentStep < total - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        showResult();
      }
    }, 400);
  });

  function showResult() {
    const resultEl = quiz.querySelector('.quiz-result');
    if (!resultEl) return;

    // Simple recommendation logic based on answers
    let recommendation = 'mat-beginner';
    const experience = answers.experience || 'none';
    const goal = answers.goal || 'general';
    const pace = answers.pace || 'steady';

    if (experience === 'advanced' && pace === 'lively') {
      recommendation = 'mat-advanced';
    } else if (experience === 'intermediate' || experience === 'advanced') {
      if (goal === 'strength' || goal === 'equipment') {
        recommendation = 'group-reformer';
      } else {
        recommendation = 'old-school';
      }
    } else if (experience === 'none') {
      recommendation = 'getting-started';
    }

    // Show the matching recommendation
    resultEl.querySelectorAll('.quiz-recommendation').forEach((rec) => {
      rec.style.display = rec.dataset.class === recommendation ? 'block' : 'none';
    });

    // Hide steps, show result
    steps.forEach((s) => (s.style.display = 'none'));
    resultEl.style.display = 'block';
    requestAnimationFrame(() => {
      resultEl.style.opacity = '1';
      resultEl.style.transform = 'translateY(0)';
    });
  }

  // Initialize
  showStep(0);
}

// ============================================
// INIT ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initMagneticButtons();
  initSplitReveal();
  initStudioTour();
  initClassQuiz();
});
