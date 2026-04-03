/* ═══════════════════════════════════════
   MAIN JS — Golden Nails & Spa
   4 capas de animación + Alpine.js data
   ═══════════════════════════════════════ */

/* ── Capa 2: Scroll Reveal (Intersection Observer) ── */
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
);

/* ── Capa 4: Animated Counter ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1500;
  const start = performance.now();

  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString() + suffix;
  };

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

/* ── Capa 4: Custom Cursor (luxury, pointer: fine only) ── */
function initCustomCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  const follower = document.createElement("div");
  follower.className = "cursor-follower";
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
  });

  function updateFollower() {
    followerX += (cursorX - followerX) * 0.12;
    followerY += (cursorY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(updateFollower);
  }
  requestAnimationFrame(updateFollower);

  const hoverTargets = "a, button, [role='button'], .gallery__item, .service-card, .btn";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add("cursor--hover");
      follower.classList.add("cursor--hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove("cursor--hover");
      follower.classList.remove("cursor--hover");
    }
  });
}

/* ── Respeta prefers-reduced-motion ── */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── DOMContentLoaded: init observers ── */
document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal
  document.querySelectorAll("[data-animate]").forEach((el) => {
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
    } else {
      scrollObserver.observe(el);
    }
  });

  // Counters
  document.querySelectorAll("[data-counter]").forEach((el) => {
    if (prefersReducedMotion) {
      el.textContent = parseInt(el.dataset.target, 10).toLocaleString() + (el.dataset.suffix || "");
    } else {
      counterObserver.observe(el);
    }
  });

  // Gold line animation
  document.querySelectorAll(".gold-line--animated").forEach((el) => {
    scrollObserver.observe(el);
  });

  // Custom cursor (only if motion is fine)
  if (!prefersReducedMotion) {
    initCustomCursor();
  }
});

/* ═══════════════════════════════════════
   ALPINE.JS COMPONENTS
   ═══════════════════════════════════════ */

document.addEventListener("alpine:init", () => {

  /* ── Navigation ── */
  Alpine.data("navigation", () => ({
    scrolled: false,
    mobileOpen: false,

    init() {
      this.checkScroll();
      window.addEventListener("scroll", () => this.checkScroll(), { passive: true });
    },

    checkScroll() {
      this.scrolled = window.scrollY > 60;
    },

    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
      document.body.style.overflow = this.mobileOpen ? "hidden" : "";
    },

    closeMobile() {
      this.mobileOpen = false;
      document.body.style.overflow = "";
    }
  }));

  /* ── Lightbox ── */
  Alpine.data("lightbox", () => ({
    open: false,
    currentIndex: 0,
    images: [],

    init() {
      this.images = Array.from(
        document.querySelectorAll("[data-lightbox-src]")
      ).map((el) => el.getAttribute("data-lightbox-src"));

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (!this.open) return;
        if (e.key === "Escape") this.close();
        if (e.key === "ArrowRight") this.next();
        if (e.key === "ArrowLeft") this.prev();
      });
    },

    openAt(index) {
      this.currentIndex = index;
      this.open = true;
      document.body.style.overflow = "hidden";
    },

    close() {
      this.open = false;
      document.body.style.overflow = "";
    },

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },

    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },

    get currentSrc() {
      return this.images[this.currentIndex] || "";
    }
  }));

  /* ── FAQ Accordion ── */
  Alpine.data("faqAccordion", () => ({
    activeIndex: null,

    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },

    isOpen(index) {
      return this.activeIndex === index;
    }
  }));

  /* ── Contact Form ── */
  Alpine.data("contactForm", () => ({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    submitted: false,
    error: false,

    submit() {
      if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
        this.error = true;
        return;
      }
      this.error = false;
      this.submitted = true;
    },

    reset() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.service = "";
      this.message = "";
      this.submitted = false;
      this.error = false;
    }
  }));
});
