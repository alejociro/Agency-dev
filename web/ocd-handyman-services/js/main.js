/* ============================================
   MAIN JS — OCD Handyman Services
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Nav scroll effect ----
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile menu toggle ----
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Capa 2: Scroll Reveal (Intersection Observer) ----
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // ---- Capa 4: Counter Animation ----
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
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };

    requestAnimationFrame(update);
  }

  if (!prefersReduced) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-counter]').forEach(el => {
      counterObserver.observe(el);
    });
  } else {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      el.textContent = prefix + target.toLocaleString() + suffix;
    });
  }

  // ---- Testimonials Carousel (auto-scroll + manual) ----
  const testimonialsTrack = document.getElementById('testimonials-track');
  const testimonialsPrev = document.getElementById('testimonials-prev');
  const testimonialsNext = document.getElementById('testimonials-next');
  const testimonialsDots = document.querySelectorAll('.testimonials-dot');

  if (testimonialsTrack) {
    const slides = testimonialsTrack.children;
    let currentIndex = 0;
    let autoScrollInterval = null;
    let userInteracted = false;

    function scrollToTestimonial(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      const slide = slides[currentIndex];
      testimonialsTrack.scrollTo({
        left: slide.offsetLeft - testimonialsTrack.offsetLeft,
        behavior: 'smooth'
      });

      testimonialsDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
        dot.style.background = i === currentIndex ? 'var(--color-secondary)' : 'var(--color-border)';
      });
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        if (!userInteracted) {
          scrollToTestimonial(currentIndex + 1);
        }
      }, 5000);
    }

    function pauseAutoScroll() {
      userInteracted = true;
      clearInterval(autoScrollInterval);
      setTimeout(() => {
        userInteracted = false;
        startAutoScroll();
      }, 10000);
    }

    if (testimonialsNext) {
      testimonialsNext.addEventListener('click', () => {
        pauseAutoScroll();
        scrollToTestimonial(currentIndex + 1);
      });
    }

    if (testimonialsPrev) {
      testimonialsPrev.addEventListener('click', () => {
        pauseAutoScroll();
        scrollToTestimonial(currentIndex - 1);
      });
    }

    testimonialsDots.forEach(dot => {
      dot.addEventListener('click', () => {
        pauseAutoScroll();
        scrollToTestimonial(parseInt(dot.dataset.index, 10));
      });
    });

    testimonialsTrack.addEventListener('pointerdown', () => pauseAutoScroll(), { passive: true });

    if (!prefersReduced) startAutoScroll();
  }

  // ---- Gallery Carousel (manual scroll + counter) ----
  const galleryTrack = document.getElementById('gallery-track');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const galleryCounter = document.getElementById('gallery-counter');

  if (galleryTrack) {
    const slides = galleryTrack.querySelectorAll('.gallery-slide');
    let galleryIndex = 0;

    function updateGalleryCounter() {
      if (galleryCounter) {
        galleryCounter.textContent = String(galleryIndex + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      }
    }

    function scrollGalleryTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      galleryIndex = index;

      const slide = slides[galleryIndex];
      galleryTrack.scrollTo({
        left: slide.offsetLeft - galleryTrack.offsetLeft,
        behavior: 'smooth'
      });

      updateGalleryCounter();
    }

    if (galleryNext) {
      galleryNext.addEventListener('click', () => scrollGalleryTo(galleryIndex + 1));
    }
    if (galleryPrev) {
      galleryPrev.addEventListener('click', () => scrollGalleryTo(galleryIndex - 1));
    }

    // Update counter on manual scroll
    let scrollTimeout;
    galleryTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackLeft = galleryTrack.scrollLeft;
        let closest = 0;
        let closestDist = Infinity;
        slides.forEach((slide, i) => {
          const dist = Math.abs(slide.offsetLeft - galleryTrack.offsetLeft - trackLeft);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        galleryIndex = closest;
        updateGalleryCounter();
      }, 100);
    }, { passive: true });

    updateGalleryCounter();
  }

});
