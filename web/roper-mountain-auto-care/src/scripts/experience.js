/**
 * Roper Mountain Auto Care — Interactive Experiences
 * Sector: Auto Repair
 *
 * Experiences:
 * 1. Process Timeline (SVG stroke draw on scroll)
 * 2. Stats with Context (counter + typewriter reveal)
 * 3. Service Tabs (slide transitions)
 * 4. Magnetic Button (CTA attraction)
 * 5. Section Dot Navigation (scroll position indicator)
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================
  // 1. PROCESS TIMELINE — SVG stroke draw
  // ========================================
  function initTimeline() {
    const timeline = document.querySelector('.process-timeline');
    if (!timeline) return;

    const line = timeline.querySelector('.timeline-line-progress');
    if (!line) return;

    const steps = timeline.querySelectorAll('.timeline-step');
    const totalLength = line.getTotalLength ? line.getTotalLength() : 500;

    line.style.strokeDasharray = totalLength;
    line.style.strokeDashoffset = totalLength;

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Animate the line drawing
          if (!prefersReducedMotion) {
            line.style.transition = `stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)`;
            line.style.strokeDashoffset = '0';
          } else {
            line.style.strokeDashoffset = '0';
          }

          // Reveal steps with stagger
          steps.forEach((step, i) => {
            const delay = prefersReducedMotion ? 0 : 300 + i * 250;
            setTimeout(() => {
              step.classList.add('step-visible');
            }, delay);
          });

          timelineObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    timelineObserver.observe(timeline);
  }

  // ========================================
  // 2. STATS WITH CONTEXT — counter + typewriter
  // ========================================
  function initStatsWithContext() {
    const stats = document.querySelectorAll('[data-stat]');
    if (!stats.length) return;

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const numberEl = el.querySelector('[data-counter]');
          const contextEl = el.querySelector('[data-context]');

          if (numberEl) {
            const target = parseInt(numberEl.dataset.target || numberEl.textContent.replace(/\D/g, ''), 10);

            if (prefersReducedMotion) {
              numberEl.textContent = target.toLocaleString();
            } else {
              const duration = 1500;
              const start = performance.now();
              numberEl.textContent = '0';

              const update = (time) => {
                const progress = Math.min((time - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                numberEl.textContent = Math.floor(ease * target).toLocaleString();
                if (progress < 1) {
                  requestAnimationFrame(update);
                } else {
                  numberEl.textContent = target.toLocaleString();
                  // After counter finishes, reveal context with typewriter
                  if (contextEl) typewriterReveal(contextEl);
                }
              };
              requestAnimationFrame(update);
            }

            if (prefersReducedMotion && contextEl) {
              contextEl.style.opacity = '1';
              contextEl.textContent = contextEl.dataset.text || contextEl.textContent;
            }
          }

          statsObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((el) => statsObserver.observe(el));
  }

  function typewriterReveal(el) {
    const text = el.dataset.text || el.textContent;
    if (!text) return;

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

  // ========================================
  // 3. SERVICE TABS — slide transitions
  // ========================================
  function initServiceTabs() {
    const tabContainer = document.querySelector('.service-tabs');
    if (!tabContainer) return;

    const tabs = tabContainer.querySelectorAll('[data-tab]');
    const panels = tabContainer.querySelectorAll('[data-panel]');
    const indicator = tabContainer.querySelector('.tab-indicator');

    if (!tabs.length || !panels.length) return;

    let currentIndex = 0;

    function activateTab(index) {
      const prevIndex = currentIndex;
      currentIndex = index;

      // Update tab states
      tabs.forEach((tab, i) => {
        tab.classList.toggle('tab-active', i === index);
        tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      // Slide indicator
      if (indicator) {
        const activeTab = tabs[index];
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = tabContainer.querySelector('.tab-list').getBoundingClientRect();

        if (!prefersReducedMotion) {
          indicator.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s ease';
        }
        indicator.style.width = `${tabRect.width}px`;
        indicator.style.transform = `translateX(${tabRect.left - containerRect.left}px)`;
      }

      // Slide panels
      const direction = index > prevIndex ? 1 : -1;
      panels.forEach((panel, i) => {
        if (i === index) {
          panel.classList.add('panel-active');
          panel.removeAttribute('hidden');
          if (!prefersReducedMotion) {
            panel.style.animation = `panelSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
            panel.style.setProperty('--slide-from', `${direction * 30}px`);
          }
        } else {
          panel.classList.remove('panel-active');
          panel.setAttribute('hidden', '');
        }
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activateTab(i));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') activateTab(Math.min(i + 1, tabs.length - 1));
        if (e.key === 'ArrowLeft') activateTab(Math.max(i - 1, 0));
      });
    });

    // Initialize first tab
    activateTab(0);
  }

  // ========================================
  // 4. MAGNETIC BUTTON — CTA attraction
  // ========================================
  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    if (!matchMedia('(pointer: fine)').matches) return;

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
        btn.style.transition = 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          btn.style.transition = '';
        }, 400);
      });
    });
  }

  // ========================================
  // 5. SECTION DOT NAVIGATION
  // ========================================
  function initSectionDots() {
    const sections = document.querySelectorAll('section[id]');
    const dotsContainer = document.querySelector('.section-dots');

    if (!dotsContainer || !sections.length) return;

    dotsContainer.innerHTML = [...sections]
      .map(
        (s) =>
          `<a href="#${s.id}" class="dot" data-section="${s.id}" aria-label="${s.dataset.label || s.id.replace(/-/g, ' ')}"></a>`
      )
      .join('');

    const dots = dotsContainer.querySelectorAll('.dot');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const dot = dotsContainer.querySelector(`[data-section="${e.target.id}"]`);
          if (dot) dot.classList.toggle('active', e.isIntersecting);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));

    // Smooth scroll on dot click
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(`#${dot.dataset.section}`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ========================================
  // OPEN/CLOSED STATUS INDICATOR
  // ========================================
  function initOpenStatus() {
    const statusEl = document.querySelector('[data-open-status]');
    if (!statusEl) return;

    // Roper Mountain Auto Care typical hours: Mon-Fri 8am-5:30pm
    const hours = {
      1: { open: 8, close: 17.5 },
      2: { open: 8, close: 17.5 },
      3: { open: 8, close: 17.5 },
      4: { open: 8, close: 17.5 },
      5: { open: 8, close: 17.5 },
    };

    const now = new Date();
    const day = now.getDay(); // 0=Sun, 6=Sat
    const currentHour = now.getHours() + now.getMinutes() / 60;
    const todayHours = hours[day];

    if (todayHours && currentHour >= todayHours.open && currentHour < todayHours.close) {
      const hoursLeft = todayHours.close - currentHour;
      const hrs = Math.floor(hoursLeft);
      const mins = Math.round((hoursLeft - hrs) * 60);
      statusEl.innerHTML = `<span class="status-dot status-open"></span> Open Now${hrs > 0 ? ` · Closes in ${hrs}h ${mins}m` : ` · Closing soon`}`;
      statusEl.classList.add('is-open');
    } else {
      statusEl.innerHTML = `<span class="status-dot status-closed"></span> Closed · Opens Mon 8:00 AM`;
      statusEl.classList.add('is-closed');
    }
  }

  // ========================================
  // INITIALIZE ALL
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
    initStatsWithContext();
    initServiceTabs();
    initMagneticButtons();
    initSectionDots();
    initOpenStatus();
  });
})();
