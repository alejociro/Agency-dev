/**
 * REFORA GVL — Interactive Experiences
 * Sector: Pilates, Yoga & Coffee Studio
 *
 * 1. Studio Tour Gallery (crossfade navigation)
 * 2. Class Schedule Tabs (spring indicator)
 * 3. Magnetic Buttons (on CTAs)
 * 4. Text Split Reveal (on major headings)
 * 5. Open/Close Status Indicator
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════════════
     1. STUDIO TOUR GALLERY — Crossfade + Dots + Swipe
     ═══════════════════════════════════════════════════ */

  function initTourGallery() {
    const galleries = document.querySelectorAll('[data-gallery]');

    galleries.forEach((gallery) => {
      const slides = gallery.querySelectorAll('.gallery-slide');
      const dotsContainer = gallery.querySelector('.gallery-dots');
      const prevBtn = gallery.querySelector('[data-gallery-prev]');
      const nextBtn = gallery.querySelector('[data-gallery-next]');
      let current = 0;
      let autoTimer;

      if (slides.length < 2) return;

      /* Create dots */
      if (dotsContainer) {
        slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.className = `gallery-dot ${i === 0 ? 'is-active' : ''}`;
          dot.setAttribute('aria-label', `View image ${i + 1}`);
          dot.addEventListener('click', () => goTo(i));
          dotsContainer.appendChild(dot);
        });
      }

      function goTo(index) {
        slides[current].classList.remove('is-active');
        if (dotsContainer) {
          dotsContainer.children[current]?.classList.remove('is-active');
        }

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('is-active');
        if (dotsContainer) {
          dotsContainer.children[current]?.classList.add('is-active');
        }

        resetAutoPlay();
      }

      function resetAutoPlay() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => goTo(current + 1), 5000);
      }

      if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

      /* Swipe support */
      let startX = 0;
      gallery.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
      });
      gallery.addEventListener('pointerup', (e) => {
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? goTo(current + 1) : goTo(current - 1);
        }
      });

      /* Keyboard */
      gallery.setAttribute('tabindex', '0');
      gallery.setAttribute('role', 'region');
      gallery.setAttribute('aria-label', 'Studio gallery');
      gallery.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'ArrowLeft') goTo(current - 1);
      });

      /* Auto-play start */
      resetAutoPlay();

      /* Pause on hover */
      gallery.addEventListener('mouseenter', () => clearInterval(autoTimer));
      gallery.addEventListener('mouseleave', () => resetAutoPlay());
    });
  }

  /* ═══════════════════════════════════════════════════
     2. CLASS SCHEDULE TABS — Spring Indicator
     ═══════════════════════════════════════════════════ */

  function initScheduleTabs() {
    const tabContainers = document.querySelectorAll('[data-tabs]');

    tabContainers.forEach((container) => {
      const tabs = container.querySelectorAll('[data-tab]');
      const panels = container.querySelectorAll('[data-tab-panel]');
      const indicator = container.querySelector('.tab-indicator');

      if (!tabs.length || !panels.length) return;

      function activateTab(tab) {
        const target = tab.dataset.tab;

        /* Deactivate all */
        tabs.forEach((t) => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach((p) => {
          p.classList.remove('is-active');
          p.setAttribute('hidden', '');
        });

        /* Activate target */
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        const targetPanel = container.querySelector(`[data-tab-panel="${target}"]`);
        if (targetPanel) {
          targetPanel.classList.add('is-active');
          targetPanel.removeAttribute('hidden');
        }

        /* Move spring indicator */
        if (indicator) {
          const rect = tab.getBoundingClientRect();
          const containerRect = tab.parentElement.getBoundingClientRect();
          indicator.style.width = `${rect.width}px`;
          indicator.style.transform = `translateX(${rect.left - containerRect.left}px)`;
        }
      }

      tabs.forEach((tab) => {
        tab.setAttribute('role', 'tab');
        tab.addEventListener('click', () => activateTab(tab));
      });

      panels.forEach((panel) => {
        panel.setAttribute('role', 'tabpanel');
        if (!panel.classList.contains('is-active')) {
          panel.setAttribute('hidden', '');
        }
      });

      /* Initialize first tab */
      const firstActive = container.querySelector('[data-tab].is-active') || tabs[0];
      if (firstActive) activateTab(firstActive);

      /* Keyboard navigation */
      container.addEventListener('keydown', (e) => {
        const activeTab = container.querySelector('[data-tab].is-active');
        const tabArr = [...tabs];
        const idx = tabArr.indexOf(activeTab);

        if (e.key === 'ArrowRight' && idx < tabArr.length - 1) {
          activateTab(tabArr[idx + 1]);
          tabArr[idx + 1].focus();
        }
        if (e.key === 'ArrowLeft' && idx > 0) {
          activateTab(tabArr[idx - 1]);
          tabArr[idx - 1].focus();
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     3. MAGNETIC BUTTONS — Subtle attraction to cursor
     ═══════════════════════════════════════════════════ */

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

  /* ═══════════════════════════════════════════════════
     4. TEXT SPLIT REVEAL — Word by word entrance
     ═══════════════════════════════════════════════════ */

  function initSplitReveal() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('[data-split]').forEach((el) => {
      /* Skip elements with child elements (e.g. brand-dot spans) to avoid destroying inner HTML */
      if (el.querySelector('span, a, em, strong, svg')) return;

      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map(
          (w, i) =>
            `<span class="word" style="--i:${i}"><span class="word-inner">${w}</span></span>`
        )
        .join(' ');
      el.setAttribute('data-animate', 'split');
      el.setAttribute('aria-label', words.join(' '));
    });
  }

  /* ═══════════════════════════════════════════════════
     5. OPEN/CLOSE STATUS — Dynamic business hours
     ═══════════════════════════════════════════════════ */

  function initOpenStatus() {
    const badges = document.querySelectorAll('[data-open-status]');
    if (!badges.length) return;

    /* Refora hours: Mon-Fri 5AM-5PM, Sat-Sun 10AM-2PM */
    const schedule = {
      1: { open: 5, close: 17 },  /* Monday */
      2: { open: 5, close: 17 },
      3: { open: 5, close: 17 },
      4: { open: 5, close: 17 },
      5: { open: 5, close: 17 },  /* Friday */
      6: { open: 10, close: 14 }, /* Saturday */
      0: { open: 10, close: 14 }, /* Sunday */
    };

    function updateStatus() {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours() + now.getMinutes() / 60;
      const today = schedule[day];

      badges.forEach((badge) => {
        if (!today) {
          badge.textContent = 'Closed today';
          badge.classList.add('status--closed');
          badge.classList.remove('status--open');
          return;
        }

        if (hour >= today.open && hour < today.close) {
          const hoursLeft = Math.floor(today.close - hour);
          const minsLeft = Math.round((today.close - hour - hoursLeft) * 60);
          badge.textContent =
            hoursLeft > 1
              ? `Open · Closes in ${hoursLeft}h`
              : `Open · Closes in ${minsLeft}min`;
          badge.classList.add('status--open');
          badge.classList.remove('status--closed');
        } else {
          badge.textContent = 'Closed now';
          badge.classList.add('status--closed');
          badge.classList.remove('status--open');
        }
      });
    }

    updateStatus();
    setInterval(updateStatus, 60000); /* Update every minute */
  }

  /* ═══════════════════════════════════════════════════
     INITIALIZE ALL
     ═══════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', () => {
    initSplitReveal();
    initTourGallery();
    initScheduleTabs();
    initMagneticButtons();
    initOpenStatus();
  });
})();
