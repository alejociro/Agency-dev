/**
 * SARKS AUTOMOTIVE — Interactive Experiences
 *
 * Sectorial (Auto Repair / Professional Services):
 * 1. Process Timeline — SVG stroke animation on scroll
 * 2. Stats with Context — counter + typewriter reveal
 * 3. Service Tabs — horizontal slide transition with spring indicator
 *
 * Universal:
 * 4. Magnetic Button — CTA attraction on pointer proximity
 * 5. Section Progress Dots — lateral dot navigation
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ══════════════════════════════════════════
  // 1. PROCESS TIMELINE — Progressive SVG line draw on scroll
  // ══════════════════════════════════════════

  function initProcessTimeline() {
    const timeline = document.querySelector('[data-timeline]');
    if (!timeline) return;

    const line = timeline.querySelector('.timeline-line-progress');
    if (!line) return;

    const steps = timeline.querySelectorAll('.timeline-step');
    const totalLength = line.getTotalLength ? line.getTotalLength() : 400;

    if (line.getTotalLength) {
      line.style.strokeDasharray = totalLength;
      line.style.strokeDashoffset = totalLength;
    }

    if (prefersReducedMotion) {
      if (line.getTotalLength) line.style.strokeDashoffset = '0';
      steps.forEach(s => s.classList.add('is-active'));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      },
      { threshold: 0 }
    );

    function onScroll() {
      const rect = timeline.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = rect.top + viewH * 0.3;
      const end = rect.bottom - viewH * 0.3;
      const progress = Math.max(0, Math.min(1, (viewH - rect.top - viewH * 0.3) / (rect.height - viewH * 0.4)));

      if (line.getTotalLength) {
        line.style.strokeDashoffset = totalLength * (1 - progress);
      }

      steps.forEach((step, i) => {
        const stepThreshold = (i + 1) / steps.length;
        step.classList.toggle('is-active', progress >= stepThreshold * 0.8);
      });
    }

    observer.observe(timeline);
  }

  // ══════════════════════════════════════════
  // 2. STATS WITH CONTEXT — Counter + typewriter phrase
  // ══════════════════════════════════════════

  function initStatsWithContext() {
    const stats = document.querySelectorAll('[data-stat]');
    if (!stats.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const numberEl = el.querySelector('.stat-number');
            const contextEl = el.querySelector('.stat-context');
            const target = parseInt(numberEl?.dataset.counter, 10);
            const suffix = numberEl?.dataset.suffix || '';
            const prefix = numberEl?.dataset.prefix || '';

            if (numberEl && target) {
              animateStatCounter(numberEl, target, prefix, suffix, () => {
                if (contextEl) typewriterReveal(contextEl);
              });
            }

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((el) => observer.observe(el));
  }

  function animateStatCounter(el, target, prefix, suffix, onComplete) {
    if (prefersReducedMotion) {
      el.textContent = prefix + target.toLocaleString() + suffix;
      if (onComplete) onComplete();
      return;
    }

    const duration = 1800;
    const start = performance.now();

    function update(time) {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // ease-out quartic
      el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
        if (onComplete) setTimeout(onComplete, 200);
      }
    }

    requestAnimationFrame(update);
  }

  function typewriterReveal(el) {
    const text = el.dataset.text || el.textContent;
    if (!text) return;

    if (prefersReducedMotion) {
      el.textContent = text;
      el.style.opacity = '1';
      return;
    }

    el.textContent = '';
    el.style.opacity = '1';
    let i = 0;

    function type() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(type, 25 + Math.random() * 35);
      }
    }

    type();
  }

  // ══════════════════════════════════════════
  // 3. SERVICE TABS — Slide transitions with spring indicator
  // ══════════════════════════════════════════

  function initServiceTabs() {
    const tabContainers = document.querySelectorAll('[data-tabs]');

    tabContainers.forEach((container) => {
      const buttons = container.querySelectorAll('[data-tab-btn]');
      const panels = container.querySelectorAll('[data-tab-panel]');
      const indicator = container.querySelector('.tab-indicator');
      let currentIndex = 0;

      if (!buttons.length || !panels.length) return;

      function activateTab(index, direction) {
        const prevIndex = currentIndex;
        currentIndex = index;

        // Update buttons
        buttons.forEach((btn, i) => {
          const isActive = i === index;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-selected', isActive);
          btn.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        // Slide indicator
        if (indicator) {
          const activeBtn = buttons[index];
          const containerRect = container.querySelector('.tab-nav')?.getBoundingClientRect();
          const btnRect = activeBtn.getBoundingClientRect();
          if (containerRect) {
            indicator.style.width = `${btnRect.width}px`;
            indicator.style.transform = `translateX(${btnRect.left - containerRect.left}px)`;
          }
        }

        // Slide panels
        panels.forEach((panel, i) => {
          if (i === index) {
            panel.removeAttribute('hidden');
            if (!prefersReducedMotion) {
              const dir = index > prevIndex ? 1 : -1;
              panel.style.animation = `slideIn${dir > 0 ? 'Right' : 'Left'} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both`;
            }
            panel.setAttribute('aria-hidden', 'false');
          } else {
            panel.setAttribute('hidden', '');
            panel.setAttribute('aria-hidden', 'true');
            panel.style.animation = '';
          }
        });
      }

      // Click handlers
      buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => activateTab(i));
      });

      // Keyboard navigation
      container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = (currentIndex + 1) % buttons.length;
          activateTab(next);
          buttons[next].focus();
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = (currentIndex - 1 + buttons.length) % buttons.length;
          activateTab(prev);
          buttons[prev].focus();
        }
      });

      // Initialize first tab
      activateTab(0);
    });
  }

  // ══════════════════════════════════════════
  // 4. MAGNETIC BUTTON — CTA attraction effect
  // ══════════════════════════════════════════

  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    if (!matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const bound = 80;
      const strength = 0.3;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        const dist = Math.sqrt(x * x + y * y);

        if (dist < bound) {
          const pull = 1 - dist / bound;
          btn.style.transform = `translate(${x * pull * strength}px, ${y * pull * strength}px)`;
          btn.style.transition = 'transform 100ms ease';
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });
    });
  }

  // ══════════════════════════════════════════
  // 5. SECTION PROGRESS DOTS
  // ══════════════════════════════════════════

  function initSectionDots() {
    const dotsContainer = document.querySelector('.section-dots');
    const sections = document.querySelectorAll('section[id]');
    if (!dotsContainer || !sections.length) return;

    // Build dots
    dotsContainer.innerHTML = [...sections]
      .map(
        (s) =>
          `<a href="#${s.id}" class="dot" data-section="${s.id}" aria-label="${s.dataset.label || s.id}">
            <span class="dot-tooltip">${s.dataset.label || s.id}</span>
          </a>`
      )
      .join('');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dot = dotsContainer.querySelector(`[data-section="${entry.target.id}"]`);
          if (dot) {
            dot.classList.toggle('active', entry.isIntersecting);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // ══════════════════════════════════════════
  // INITIALIZE ALL EXPERIENCES
  // ══════════════════════════════════════════

  document.addEventListener('DOMContentLoaded', () => {
    initProcessTimeline();
    initStatsWithContext();
    initServiceTabs();
    initMagneticButtons();
    initSectionDots();
  });
})();
