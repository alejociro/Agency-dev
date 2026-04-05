/* ============================================
   Greenville Irrigation Services — Main JS
   Animations, interactions, and functionality
   ============================================ */

(function () {
  'use strict';

  /* ============================================
     MOBILE MENU
     ============================================ */

  function initMobileMenu() {
    const hamburger = document.querySelector('.header__hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================
     SCROLL REVEAL — IO Fallback
     ============================================ */

  function initScrollReveal() {
    // Only use IO if scroll-driven animations are NOT supported
    if (CSS.supports && CSS.supports('animation-timeline', 'view()')) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-scroll]').forEach((el) => observer.observe(el));
    document.querySelectorAll('[data-kinetic]').forEach((el) => observer.observe(el));
  }

  /* ============================================
     READING PROGRESS — IO Fallback
     ============================================ */

  function initReadingProgress() {
    if (CSS.supports && CSS.supports('animation-timeline', 'scroll()')) return;

    const bar = document.querySelector('.reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = 'scaleX(' + Math.min(progress, 1) + ')';
    }, { passive: true });
  }

  /* ============================================
     KINETIC TEXT — Split hero title by words
     ============================================ */

  function initKineticText() {
    document.querySelectorAll('[data-kinetic]').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map(
          (w, i) =>
            '<span class="kw" style="--i:' + i + '"><span class="kw-inner">' + w + '</span></span>'
        )
        .join(' ');
      el.classList.add('kinetic-ready');
    });
  }

  /* ============================================
     ANIMATED COUNTERS
     ============================================ */

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function update(time) {
      const progress = Math.min((time - start) / duration, 1);
      // Ease out cubic
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
     MAGNETIC BUTTONS
     ============================================ */

  function initMagneticButtons() {
    if (!matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const strength = 0.25;
      const radius = 70;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);

        if (dist < radius) {
          const pull = 1 - dist / radius;
          btn.style.transform =
            'translate(' + (x * pull * strength) + 'px, ' + (y * pull * strength) + 'px)';
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        btn.style.transform = '';
        setTimeout(() => {
          btn.style.transition = '';
        }, 500);
      });
    });
  }

  /* ============================================
     FAQ ACCORDION
     ============================================ */

  function initFAQ() {
    document.querySelectorAll('.faq-item__question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all others
        document.querySelectorAll('.faq-item__question').forEach((other) => {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            other.nextElementSibling.setAttribute('aria-hidden', 'true');
          }
        });

        btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        answer.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      });
    });
  }

  /* ============================================
     FLOATING CTA (mobile)
     ============================================ */

  function initFloatingCTA() {
    const cta = document.querySelector('.floating-cta');
    if (!cta) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        cta.classList.add('visible');
      } else {
        cta.classList.remove('visible');
      }
    }, { passive: true });
  }

  /* ============================================
     RIPPLE EFFECT on containers
     ============================================ */

  function initRippleContainers() {
    document.querySelectorAll('.ripple-container').forEach((container) => {
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        container.style.setProperty('--ripple-x', x + '%');
        container.style.setProperty('--ripple-y', y + '%');
      });
    });
  }

  /* ============================================
     SMOOTH SCROLL for anchor links
     ============================================ */

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

  /* ============================================
     FORM HANDLING
     ============================================ */

  function handleFormSubmit(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        var data = new FormData(form);
        var response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          form.innerHTML =
            '<div class="form-success"><h3>Thank you!</h3><p>We\'ll get back to you within 24 hours.</p></div>';
        } else {
          throw new Error('Submit failed');
        }
      } catch (err) {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('There was an error. Please call us at (864) 664-2323.');
      }
    });
  }

  function initContactForm() {
    document.querySelectorAll('#contact-form, #hero-form').forEach(handleFormSubmit);
  }

  /* ============================================
     SEASONAL SERVICE SELECTOR
     Changes hero palette + shows seasonal services
     ============================================ */

  function initSeasonSelector() {
    const buttons = document.querySelectorAll('[data-season]');
    const display = document.querySelector('.season-services');
    if (!buttons.length || !display) return;

    const seasons = {
      spring: {
        accent: '#5BA65E',
        label: 'Spring',
        services: [
          'System startup & inspection',
          'New irrigation installation',
          'Smart controller programming',
          'Backflow testing & certification'
        ]
      },
      summer: {
        accent: '#2D7A3A',
        label: 'Summer',
        services: [
          'Efficiency optimization',
          'Smart irrigation upgrades',
          'Emergency sprinkler repair',
          'Zone adjustment & calibration'
        ]
      },
      fall: {
        accent: '#D4A843',
        label: 'Fall',
        services: [
          'Winterization preparation',
          'Drainage system installation',
          'Landscape lighting setup',
          'End-of-season maintenance'
        ]
      },
      winter: {
        accent: '#4A90A4',
        label: 'Winter',
        services: [
          'System winterization',
          'Indoor lighting upgrades',
          'Planning & design consultation',
          'Off-season repair specials'
        ]
      }
    };

    // Determine current season
    const month = new Date().getMonth();
    var currentSeason = 'spring';
    if (month >= 2 && month <= 4) currentSeason = 'spring';
    else if (month >= 5 && month <= 7) currentSeason = 'summer';
    else if (month >= 8 && month <= 10) currentSeason = 'fall';
    else currentSeason = 'winter';

    function selectSeason(season) {
      var data = seasons[season];
      if (!data) return;

      // Update active button
      buttons.forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.season === season);
      });

      // Animate out, update, animate in
      display.style.opacity = '0';
      display.style.transform = 'translateY(12px)';

      setTimeout(function() {
        display.innerHTML = '<h4 class="season-title">' + data.label + ' Services</h4>' +
          '<ul class="season-list">' +
          data.services.map(function(s) {
            return '<li>' + s + '</li>';
          }).join('') +
          '</ul>';

        display.style.opacity = '1';
        display.style.transform = 'translateY(0)';
      }, 250);

      // Update CSS accent color smoothly
      document.documentElement.style.setProperty('--season-accent', data.accent);
    }

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        selectSeason(btn.dataset.season);
      });
    });

    // Auto-select current season
    selectSeason(currentSeason);
  }

  /* ============================================
     IRRIGATION AREA ESTIMATOR
     Interactive slider for project cost estimate
     ============================================ */

  function initEstimator() {
    var slider = document.querySelector('#area-slider');
    var output = document.querySelector('.estimator__value');
    var serviceToggles = document.querySelectorAll('[data-service-type]');
    if (!slider || !output) return;

    var rates = {
      irrigation: { base: 800, perSqFt: 0.85, label: 'Irrigation System' },
      lighting: { base: 600, perSqFt: 0.65, label: 'Landscape Lighting' },
      drainage: { base: 500, perSqFt: 0.55, label: 'Drainage Solution' }
    };

    var currentService = 'irrigation';

    function updateEstimate() {
      var sqft = parseInt(slider.value, 10);
      var rate = rates[currentService];
      var low = Math.round(rate.base + sqft * rate.perSqFt * 0.8);
      var high = Math.round(rate.base + sqft * rate.perSqFt * 1.2);

      // Animate the number change
      var areaDisplay = document.querySelector('.estimator__area');
      if (areaDisplay) areaDisplay.textContent = sqft.toLocaleString() + ' sq ft';

      // Smooth number transition
      animateEstimateValue(output, low, high);

      // Update slider fill
      var pct = ((sqft - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
      slider.style.setProperty('--fill', pct + '%');
    }

    function animateEstimateValue(el, low, high) {
      el.textContent = '$' + low.toLocaleString() + ' - $' + high.toLocaleString();
    }

    slider.addEventListener('input', updateEstimate);

    serviceToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        currentService = toggle.dataset.serviceType;
        serviceToggles.forEach(function(t) {
          t.classList.toggle('active', t === toggle);
        });
        updateEstimate();
      });
    });

    // Initialize
    updateEstimate();
  }

  /* ============================================
     BEFORE/AFTER PROJECT SLIDER
     Draggable comparison slider for project photos
     ============================================ */

  function initBeforeAfter() {
    document.querySelectorAll('.before-after').forEach(function(container) {
      var handle = container.querySelector('.ba-handle');
      var overlay = container.querySelector('.ba-overlay');
      if (!handle || !overlay) return;

      var dragging = false;

      function update(x) {
        var rect = container.getBoundingClientRect();
        var pct = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
        overlay.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
        handle.style.left = pct + '%';
        handle.setAttribute('aria-valuenow', Math.round(pct));
      }

      container.addEventListener('pointerdown', function(e) {
        dragging = true;
        container.setPointerCapture(e.pointerId);
        update(e.clientX);
      });

      container.addEventListener('pointermove', function(e) {
        if (dragging) update(e.clientX);
      });

      container.addEventListener('pointerup', function() {
        dragging = false;
      });

      // Keyboard accessibility
      handle.setAttribute('role', 'slider');
      handle.setAttribute('tabindex', '0');
      handle.setAttribute('aria-label', 'Compare before and after');
      handle.setAttribute('aria-valuemin', '0');
      handle.setAttribute('aria-valuemax', '100');
      handle.setAttribute('aria-valuenow', '50');

      handle.addEventListener('keydown', function(e) {
        var rect = container.getBoundingClientRect();
        var current = parseFloat(handle.style.left) || 50;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          update(rect.left + rect.width * (current - 3) / 100);
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          update(rect.left + rect.width * (current + 3) / 100);
        }
      });
    });
  }

  /* ============================================
     INITIALIZE ALL
     ============================================ */

  function init() {
    // Check reduced motion preference
    var prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initContactForm();
    initFloatingCTA();
    initSeasonSelector();
    initEstimator();
    initBeforeAfter();

    if (!prefersReducedMotion) {
      initKineticText();
      initScrollReveal();
      initReadingProgress();
      initCounters();
      initMagneticButtons();
      initRippleContainers();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
