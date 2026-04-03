/* ========================================
   MAIN JS — Greenville Chiropractic
   Nav, scroll reveal, counter, FAQ, progress
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar hide/show on scroll ---- */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  const scrollThreshold = 60;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > scrollThreshold) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 300) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  /* ---- Mobile menu toggle ---- */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll Reveal (IntersectionObserver) ---- */
  const animateElements = document.querySelectorAll('[data-animate]');

  if (animateElements.length > 0) {
    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animateObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    animateElements.forEach(el => animateObserver.observe(el));
  }

  /* ---- Counter Animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1500;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ---- Reading Progress Bar ---- */
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }

  /* ---- Smooth anchor scroll with nav offset ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq__item');
      const list = item.closest('.faq__list');
      const isOpen = item.classList.contains('open');

      list.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
});

/* ---- Booking Mockup Interactions ---- */

function selectService(el) {
  el.closest('.booking-services').querySelectorAll('.booking-service-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function selectDay(el) {
  el.closest('.booking-calendar__grid').querySelectorAll('.booking-calendar__day').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
}

function selectTime(el) {
  el.closest('.booking-times').querySelectorAll('.booking-time-slot').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
}
