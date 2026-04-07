/* ═══════════════════════════════════════
   MAIN JS — Golden Nails & Spa
   Scroll reveal + Alpine.js data + interactions
   ═══════════════════════════════════════ */

/* ── Scroll Reveal (Intersection Observer) ── */
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-animate], [data-stagger]").forEach((el) => {
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
    } else {
      scrollObserver.observe(el);
    }
  });

  initBASlider();
  initMagnetic();
});

/* ── Before/After Slider ── */
function initBASlider() {
  const slider = document.getElementById("baSlider");
  if (!slider) return;

  const afterImg = slider.querySelector(".ba-slider__after");
  const line = slider.querySelector(".ba-slider__line");
  const handle = slider.querySelector(".ba-slider__handle");
  let isDragging = false;

  function setPosition(x) {
    const rect = slider.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    afterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
    line.style.left = pct + "%";
    handle.style.left = pct + "%";
  }

  slider.addEventListener("mousedown", (e) => { isDragging = true; setPosition(e.clientX); });
  slider.addEventListener("touchstart", (e) => { isDragging = true; setPosition(e.touches[0].clientX); }, { passive: true });

  window.addEventListener("mousemove", (e) => { if (isDragging) setPosition(e.clientX); });
  window.addEventListener("touchmove", (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });

  window.addEventListener("mouseup", () => { isDragging = false; });
  window.addEventListener("touchend", () => { isDragging = false; });
}

/* ── Magnetic Button ── */
function initMagnetic() {
  if (prefersReducedMotion) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

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

  /* ── Gallery Lightbox ── */
  Alpine.data("galleryLightbox", () => ({
    open: false,
    currentIndex: 0,
    images: [],

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
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
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
          { name: "Classic Manicure", desc: "Shaping, cuticle care, lotion massage, regular polish, hot towel", price: "$25" },
          { name: "Signature Manicure", desc: "Sugar scrub, hot oil massage, hot towel, regular polish", price: "$35" },
          { name: "Collagen Spa Manicure", desc: "Collagen gloves, deep moisturizing, exfoliation, hot oil massage", price: "$45" }
        ]
      },
      {
        name: "Pedicures",
        note: "Extra $15 for Gel Polish. Collagen Socks: $10",
        items: [
          { name: "Regular Pedicure", desc: null, price: "$35" },
          { name: "Spa Pedicure", desc: null, price: "$45" },
          { name: "Deluxe Pedicure", desc: null, price: "$55" },
          { name: "Lovely Pedicure", desc: "20-min massage, collagen treatment, hot stone, choice of 5 scents", price: "$65" },
          { name: "Collagen Socks", desc: "Intense hydration, softens fine lines", price: "$10" }
        ]
      },
      {
        name: "Extensions",
        note: null,
        items: [
          { name: "Acrylic Full Set", desc: null, price: "$45+" },
          { name: "Acrylic Fill-In", desc: null, price: "$35+" },
          { name: "Acrylic w/ Gel Polish (Full Set)", desc: null, price: "$55+" },
          { name: "Acrylic w/ Gel Polish (Fill-In)", desc: null, price: "$50+" },
          { name: "Pink & White Full Set", desc: null, price: "$65+" },
          { name: "Pink & White Fill-In", desc: null, price: "$55+" },
          { name: "Nail Removal", desc: null, price: "$10+" },
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
          { name: "Lower Lip & Chin", desc: null, price: "$20+" },
          { name: "Eyebrows, Lip & Chin", desc: null, price: "$25+" },
          { name: "Full Face", desc: null, price: "$35+" },
          { name: "Arms", desc: null, price: "$50+" },
          { name: "Underarms", desc: null, price: "$30+" },
          { name: "Legs (Knee Down)", desc: null, price: "$60+" }
        ]
      },
      {
        name: "Extras",
        note: null,
        items: [
          { name: "Gel Polish Change (Hands)", desc: null, price: "$25" },
          { name: "Gel Polish Change (Feet)", desc: null, price: "$30" },
          { name: "Regular Polish Change (Hands)", desc: null, price: "$15" },
          { name: "Regular Polish Change (Feet)", desc: null, price: "$20" },
          { name: "White Tip", desc: null, price: "Extra $5" },
          { name: "Nail Design", desc: null, price: "$7+" }
        ]
      },
      {
        name: "Kids",
        note: "Gel Polish: Extra $15",
        items: [
          { name: "NexGen Pink & White (Full Set)", desc: null, price: "$45" },
          { name: "NexGen Pink & White (Fill-In)", desc: null, price: "$38" },
          { name: "NexGen Colors (Full Set)", desc: null, price: "$40" },
          { name: "NexGen Colors (Fill-In)", desc: null, price: "$35" },
          { name: "Acrylic White Tips (Full Set)", desc: null, price: "$35" },
          { name: "Acrylic White Tips (Fill-In)", desc: null, price: "$28" },
          { name: "Acrylic (Full Set)", desc: null, price: "$30" },
          { name: "Acrylic (Fill-In)", desc: null, price: "$23" },
          { name: "Acrylic with Gel Polish (Full Set)", desc: null, price: "$40" },
          { name: "Acrylic with Gel Polish (Fill-In)", desc: null, price: "$35" },
          { name: "Manicure", desc: null, price: "$20" },
          { name: "Manicure with Gel Polish", desc: null, price: "$35" },
          { name: "Gel Polish Change", desc: null, price: "$20" },
          { name: "Regular Pedicure", desc: null, price: "$25" },
          { name: "Spa Pedicure", desc: null, price: "$35" },
          { name: "Deluxe Pedicure", desc: null, price: "$45" },
          { name: "Toenail Polish Change", desc: null, price: "$15" },
          { name: "Fingernail Polish Change", desc: null, price: "$12" }
        ]
      }
    ]
  }));

  /* ── FAQ Accordion ── */
  Alpine.data("faqAccordion", () => ({
    activeIndex: 0,

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
