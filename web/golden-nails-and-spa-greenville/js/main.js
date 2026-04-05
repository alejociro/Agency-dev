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

  // Gold line animation
  document.querySelectorAll(".gold-line--animated").forEach((el) => {
    scrollObserver.observe(el);
  });

  // Custom cursor (only if motion is fine)
  if (!prefersReducedMotion) {
    initCustomCursor();
  }

  // Sparkle radial follow on service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--sparkle-x", x + "%");
      card.style.setProperty("--sparkle-y", y + "%");
    });
  });
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

  /* ── Gallery Lightbox with Filter ── */
  Alpine.data("galleryLightbox", () => ({
    open: false,
    currentIndex: 0,
    images: [],
    filter: "all",

    init() {
      this.images = Array.from(
        document.querySelectorAll("[data-lightbox-src]")
      ).map((el) => el.getAttribute("data-lightbox-src"));

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

  /* ── Price Menu ── */
  Alpine.data("priceMenu", () => ({
    activeTab: 0,
    categories: [
      {
        name: "Manicures",
        note: "Extra $15 for Gel Polish on Collagen Spa Manicure",
        items: [
          { name: "Classic Manicure", desc: "Nail trimming, cuticle treatment, lotion massage, regular polish, hot towel", price: "$25" },
          { name: "Signature Manicure", desc: "Sugar scrub, hot oil massage, hot towel, regular polish", price: "$35" },
          { name: "Collagen Spa Manicure", desc: "Collagen gloves, deep moisturizing, sugar scrub, hot oil massage", price: "$45" }
        ]
      },
      {
        name: "Pedicures",
        note: "Extra $15 for Gel Polish. Collagen Socks add-on: $10",
        items: [
          { name: "Regular Pedicure", desc: null, price: "$35" },
          { name: "Spa Pedicure", desc: null, price: "$45" },
          { name: "Deluxe Pedicure", desc: null, price: "$55" },
          { name: "Lovely Pedicure", desc: "20-min massage, collagen treatment, hot stone, choice of 5 scents", price: "$65" },
          { name: "Collagen Socks", desc: "Intense hydration, smooths fine lines", price: "$10" }
        ]
      },
      {
        name: "Enhancements",
        note: null,
        items: [
          { name: "Acrylic Full Set", desc: null, price: "$45+" },
          { name: "Acrylic Fill-In", desc: null, price: "$35+" },
          { name: "Acrylic with Gel Polish (Full Set)", desc: null, price: "$55+" },
          { name: "Acrylic with Gel Polish (Fill-In)", desc: null, price: "$50+" },
          { name: "Pink & White Full Set", desc: null, price: "$65+" },
          { name: "Pink & White Fill-In", desc: null, price: "$55+" },
          { name: "Nail Removal / Take-Off", desc: null, price: "$10+" },
          { name: "Nail Repair", desc: null, price: "$4+" }
        ]
      },
      {
        name: "Dipping Powder",
        note: null,
        items: [
          { name: "Color Full Set", desc: null, price: "$50+" },
          { name: "Color Fill-In", desc: null, price: "$45+" },
          { name: "Pink & White Full Set", desc: null, price: "$55+" },
          { name: "Pink & White Fill-In", desc: null, price: "$50+" },
          { name: "Ombre Full Set", desc: null, price: "$65+" },
          { name: "Ombre Fill-In", desc: null, price: "$60+" },
          { name: "Color Overlay Full Set", desc: null, price: "$45" },
          { name: "Additional Services", desc: null, price: "$5+" }
        ]
      },
      {
        name: "Waxing",
        note: null,
        items: [
          { name: "Eyebrows", desc: null, price: "$12" },
          { name: "Upper Lip", desc: null, price: "$8" },
          { name: "Bottom Lip & Chin", desc: null, price: "$20+" },
          { name: "Eyebrows, Lip & Chin", desc: null, price: "$25+" },
          { name: "Full Face", desc: null, price: "$35+" },
          { name: "Arms", desc: null, price: "$50+" },
          { name: "Underarms", desc: null, price: "$30+" },
          { name: "Leg (Knees Down)", desc: null, price: "$60+" }
        ]
      },
      {
        name: "Extras",
        note: null,
        items: [
          { name: "Gel Polish Change (Fingernails)", desc: null, price: "$25" },
          { name: "Gel Polish Change (Toenails)", desc: null, price: "$30" },
          { name: "Regular Polish Change (Fingernails)", desc: null, price: "$15" },
          { name: "Regular Polish Change (Toenails)", desc: null, price: "$20" },
          { name: "White Tip", desc: null, price: "Extra $5" },
          { name: "Nail Design", desc: null, price: "$7+" }
        ]
      }
    ]
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
