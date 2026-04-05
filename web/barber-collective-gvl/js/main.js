/* main.js — The Barber Collective
   Animations + Interactive Experiences
   - Kinetic text, IO fallback, magnetic buttons, mobile nav
   - Open/Closed indicator, section dots, gallery drag, service filter
*/

document.addEventListener('DOMContentLoaded', () => {

  /* ====================== KINETIC TEXT (hero title word reveal) ====================== */
  document.querySelectorAll('[data-kinetic]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) =>
      `<span class="kw" style="--i:${i}"><span class="kw-inner">${w}</span></span>`
    ).join(' ');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add('kinetic-ready');
      });
    });
  });

  /* ====================== IO FALLBACK (scroll reveal for older browsers) ====================== */
  if (!CSS.supports('animation-timeline', 'view()')) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));
  }

  /* ====================== MAGNETIC BUTTONS ====================== */
  if (matchMedia('(pointer: fine)').matches) {
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
        btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        btn.style.transform = '';
        setTimeout(() => { btn.style.transition = ''; }, 500);
      });
    });
  }

  /* ====================== MOBILE NAV TOGGLE ====================== */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const navOverlay = document.querySelector('[data-nav-overlay]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (navOverlay) navOverlay.classList.toggle('nav-overlay-visible', isOpen);
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navMenu.classList.remove('nav-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navOverlay.classList.remove('nav-overlay-visible');
      });
    }

    navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (navOverlay) navOverlay.classList.remove('nav-overlay-visible');
      });
    });
  }

  /* ====================== NAVBAR SCROLL BEHAVIOR ====================== */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    let lastScroll = 0;
    const scrollThreshold = 80;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > scrollThreshold) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }

      if (currentScroll > lastScroll && currentScroll > 300) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ====================== OPEN / CLOSED DYNAMIC INDICATOR ====================== */
  function updateOpenStatus() {
    const badge = document.querySelector('[data-open-status]');
    if (!badge) return;

    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, ...
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    // Schedule: Tue-Sat, closed Sun-Mon
    const schedule = {
      2: { open: 600, close: 1080 },  // Tue 10am-6pm
      3: { open: 600, close: 960 },   // Wed 10am-4pm
      4: { open: 600, close: 1080 },  // Thu 10am-6pm
      5: { open: 600, close: 1020 },  // Fri 10am-5pm
      6: { open: 600, close: 780 }    // Sat 10am-1pm
    };

    const today = schedule[day];
    let isOpen = false;
    let statusText = 'Closed Now';
    let subText = '';

    if (today && currentTime >= today.open && currentTime < today.close) {
      isOpen = true;
      const minsLeft = today.close - currentTime;
      const hrsLeft = Math.floor(minsLeft / 60);
      const mLeft = minsLeft % 60;
      statusText = 'Open Now';
      if (hrsLeft > 0) {
        subText = `Closes in ${hrsLeft}h ${mLeft}m`;
      } else {
        subText = `Closes in ${mLeft}m`;
      }
    } else if (today && currentTime < today.open) {
      const minsUntil = today.open - currentTime;
      const hrsUntil = Math.floor(minsUntil / 60);
      subText = `Opens in ${hrsUntil}h ${minsUntil % 60}m`;
    } else {
      // Find next open day
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 1; i <= 7; i++) {
        const nextDay = (day + i) % 7;
        if (schedule[nextDay]) {
          subText = `Opens ${dayNames[nextDay]} at 10am`;
          break;
        }
      }
    }

    badge.classList.toggle('status-open', isOpen);
    badge.classList.toggle('status-closed', !isOpen);

    const statusEl = badge.querySelector('.status-text');
    const subEl = badge.querySelector('.status-sub');
    if (statusEl) statusEl.textContent = statusText;
    if (subEl) subEl.textContent = subText;
  }

  updateOpenStatus();
  // Update every minute
  setInterval(updateOpenStatus, 60000);

  /* ====================== SECTION DOT NAVIGATION ====================== */
  function initSectionDots() {
    const sections = document.querySelectorAll('section[id]');
    const dotsContainer = document.querySelector('.section-dots');
    if (!dotsContainer || !sections.length) return;

    dotsContainer.innerHTML = [...sections].map(s =>
      `<a href="#${s.id}" class="dot" data-section="${s.id}" aria-label="${s.dataset.label || s.id}">
        <span class="dot-label">${s.dataset.label || s.id}</span>
      </a>`
    ).join('');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const dot = dotsContainer.querySelector(`[data-section="${e.target.id}"]`);
        if (dot) dot.classList.toggle('active', e.isIntersecting);
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  initSectionDots();

  /* ====================== GALLERY DRAG SCROLL (pointer events) ====================== */
  document.querySelectorAll('.gallery-scroll-track').forEach(track => {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('pointerup', (e) => {
      isDown = false;
      track.style.cursor = '';
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  });

  /* ====================== SERVICE FILTER TABS ====================== */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const serviceCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length && serviceCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filterBtns.forEach(b => b.classList.remove('filter-active'));
        btn.classList.add('filter-active');

        // Filter cards with staggered animation
        let visibleIndex = 0;
        serviceCards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.transitionDelay = match ? `${visibleIndex * 50}ms` : '0ms';

          if (match) {
            card.classList.remove('card-hidden');
            card.classList.add('card-visible');
            visibleIndex++;
          } else {
            card.classList.add('card-hidden');
            card.classList.remove('card-visible');
          }
        });
      });
    });
  }

  /* ====================== SMOOTH ANCHOR SCROLL ====================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
