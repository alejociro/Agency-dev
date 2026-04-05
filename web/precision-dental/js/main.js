/* ============================================================
   Precision Dental — Main JS
   Animations (4 layers), interactions, mobile nav
   Tone: warm, organic, inviting — gentle motion with soft easings
   ============================================================ */

(function () {
  'use strict';

  /* ── Layer 2 Fallback: IntersectionObserver for scroll reveals ── */
  if (!CSS.supports('animation-timeline', 'view()')) {
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

  /* ── Layer 4: Kinetic text — word-by-word reveal for hero titles ── */
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

  /* ── Layer 4: Animated counters ── */
  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 1800;
    var start = performance.now();

    function update(time) {
      var progress = Math.min((time - start) / duration, 1);
      /* Soft ease-out-quart for organic feel */
      var ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    }

    requestAnimationFrame(update);
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ── Layer 4: Magnetic buttons (desktop only) ── */
  if (matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var strength = 0.25;
      var radius = 70;

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        var dist = Math.sqrt(x * x + y * y);
        if (dist < radius) {
          var pull = 1 - dist / radius;
          btn.style.transform =
            'translate(' + x * pull * strength + 'px, ' + y * pull * strength + 'px)';
        }
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        btn.style.transform = '';
        setTimeout(function () {
          btn.style.transition = '';
        }, 500);
      });
    });
  }

  /* ── Navigation: scroll state + mobile toggle ── */
  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.querySelector('.nav-mobile');

  /* Scroll-aware nav background */
  if (nav) {
    var lastScroll = 0;
    window.addEventListener(
      'scroll',
      function () {
        var scrollY = window.scrollY;
        if (scrollY > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
      },
      { passive: true }
    );
  }

  /* Mobile nav toggle */
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close mobile nav on link click */
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');

      /* Close all siblings */
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
      });

      /* Toggle clicked */
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav ? nav.offsetHeight + 16 : 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════════════════════════════
     INTERACTIVE EXPERIENCES
     ══════════════════════════════════════════════════════════════ */

  /* ── Experience 1: Facility Tour Gallery ── */
  (function () {
    var gallery = document.querySelector('.tour-gallery');
    if (!gallery) return;

    var slides = gallery.querySelectorAll('.tour-slide');
    var dots = gallery.querySelectorAll('.tour-dot');
    var prevBtn = gallery.querySelector('.tour-prev');
    var nextBtn = gallery.querySelector('.tour-next');
    var current = 0;
    var total = slides.length;
    if (total === 0) return;

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');

      current = (index + total) % total;

      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    /* Touch/swipe support */
    var startX = 0;
    gallery.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button')) return;
      startX = e.clientX;
    });
    gallery.addEventListener('pointerup', function (e) {
      if (e.target.closest('button')) return;
      var diff = e.clientX - startX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current - 1 : current + 1);
      }
    });

    /* Keyboard */
    gallery.setAttribute('tabindex', '0');
    gallery.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    /* Auto-advance every 5s, pause on hover */
    var autoplay = setInterval(function () { goTo(current + 1); }, 5000);
    gallery.addEventListener('mouseenter', function () { clearInterval(autoplay); });
    gallery.addEventListener('mouseleave', function () {
      autoplay = setInterval(function () { goTo(current + 1); }, 5000);
    });
  })();

  /* ── Experience 2: Dynamic open/closed indicator ── */
  (function () {
    var indicator = document.querySelector('.open-indicator');
    if (!indicator) return;

    var now = new Date();
    var day = now.getDay(); /* 0=Sun, 1=Mon... */
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var timeNow = hours + minutes / 60;

    /* Mon-Thu: 8:30-12:30, 14:00-17:00 (closed for lunch 12:30-14:00) */
    var isWeekday = day >= 1 && day <= 4;
    var isMorning = timeNow >= 8.5 && timeNow < 12.5;
    var isAfternoon = timeNow >= 14 && timeNow < 17;
    var isOpen = isWeekday && (isMorning || isAfternoon);

    var statusEl = indicator.querySelector('.open-status');
    var detailEl = indicator.querySelector('.open-detail');

    if (isOpen) {
      indicator.classList.add('is-open');
      statusEl.textContent = 'Open Now';
      /* Calculate closing time */
      if (isMorning) {
        var minsLeft = Math.floor((12.5 - timeNow) * 60);
        if (minsLeft <= 60) {
          detailEl.textContent = 'Lunch break in ' + minsLeft + ' min';
        } else {
          detailEl.textContent = 'Until 12:30 PM';
        }
      } else {
        var minsLeft2 = Math.floor((17 - timeNow) * 60);
        if (minsLeft2 <= 60) {
          detailEl.textContent = 'Closes in ' + minsLeft2 + ' min';
        } else {
          detailEl.textContent = 'Until 5:00 PM';
        }
      }
    } else {
      indicator.classList.add('is-closed');
      statusEl.textContent = 'Closed';
      /* Calculate next open */
      if (day >= 1 && day <= 4 && timeNow < 8.5) {
        detailEl.textContent = 'Opens at 8:30 AM';
      } else if (day >= 1 && day <= 4 && timeNow >= 12.5 && timeNow < 14) {
        detailEl.textContent = 'Back at 2:00 PM';
      } else {
        detailEl.textContent = 'Opens Monday 8:30 AM';
      }
    }
  })();

  /* ── Experience 3: Section dot navigation ── */
  (function () {
    var sections = document.querySelectorAll('section[id]');
    var dotsContainer = document.querySelector('.section-dots');
    if (!dotsContainer || sections.length === 0) return;

    dotsContainer.innerHTML = Array.from(sections).map(function (s) {
      var label = s.dataset.label || s.id.replace(/-/g, ' ');
      return '<a href="#' + s.id + '" class="dot" data-section="' + s.id + '" aria-label="' + label + '"><span class="dot-tooltip">' + label + '</span></a>';
    }).join('');

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var dot = dotsContainer.querySelector('[data-section="' + e.target.id + '"]');
        if (dot) dot.classList.toggle('active', e.isIntersecting);
      });
    }, { threshold: 0.35 });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  })();

  /* ── Experience 4: Service tabs with sliding indicator ── */
  (function () {
    var tabsContainer = document.querySelector('.service-tabs');
    if (!tabsContainer) return;

    var tabs = tabsContainer.querySelectorAll('.service-tab');
    var panels = tabsContainer.querySelectorAll('.service-panel');
    var indicator = tabsContainer.querySelector('.tab-indicator');

    function activateTab(index) {
      tabs.forEach(function (t, i) {
        t.classList.toggle('active', i === index);
        t.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      panels.forEach(function (p, i) {
        p.classList.toggle('active', i === index);
      });

      /* Move sliding indicator */
      if (indicator && tabs[index]) {
        var tabRect = tabs[index].getBoundingClientRect();
        var containerRect = tabsContainer.querySelector('.tabs-header').getBoundingClientRect();
        indicator.style.width = tabRect.width + 'px';
        indicator.style.transform = 'translateX(' + (tabRect.left - containerRect.left) + 'px)';
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activateTab(i); });
    });

    /* Keyboard navigation */
    tabsContainer.addEventListener('keydown', function (e) {
      var activeIndex = Array.from(tabs).findIndex(function (t) { return t.classList.contains('active'); });
      if (e.key === 'ArrowRight') activateTab((activeIndex + 1) % tabs.length);
      if (e.key === 'ArrowLeft') activateTab((activeIndex - 1 + tabs.length) % tabs.length);
    });

    /* Initialize first tab */
    if (tabs.length > 0) activateTab(0);
  })();

})();
