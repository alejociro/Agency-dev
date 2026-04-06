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
        name: "Manicuras",
        note: "Extra $15 por Gel Polish en Collagen Spa Manicure",
        items: [
          { name: "Classic Manicure", desc: "Corte y moldeado, tratamiento de cutículas, masaje con loción, esmalte regular, toalla caliente", price: "$25" },
          { name: "Signature Manicure", desc: "Exfoliación con azúcar, masaje con aceite caliente, toalla caliente, esmalte regular", price: "$35" },
          { name: "Collagen Spa Manicure", desc: "Guantes de colágeno, hidratación profunda, exfoliación, masaje con aceite caliente", price: "$45" }
        ]
      },
      {
        name: "Pedicuras",
        note: "Extra $15 por Gel Polish. Collagen Socks: $10",
        items: [
          { name: "Regular Pedicure", desc: null, price: "$35" },
          { name: "Spa Pedicure", desc: null, price: "$45" },
          { name: "Deluxe Pedicure", desc: null, price: "$55" },
          { name: "Lovely Pedicure", desc: "Masaje de 20 min, tratamiento de colágeno, piedra caliente, elección de 5 aromas", price: "$65" },
          { name: "Collagen Socks", desc: "Hidratación intensa, suaviza líneas finas", price: "$10" }
        ]
      },
      {
        name: "Extensiones",
        note: null,
        items: [
          { name: "Acrylic Full Set", desc: null, price: "$45+" },
          { name: "Acrylic Fill-In", desc: null, price: "$35+" },
          { name: "Acrylic con Gel Polish (Full Set)", desc: null, price: "$55+" },
          { name: "Acrylic con Gel Polish (Fill-In)", desc: null, price: "$50+" },
          { name: "Pink & White Full Set", desc: null, price: "$65+" },
          { name: "Pink & White Fill-In", desc: null, price: "$55+" },
          { name: "Remoción de Uñas", desc: null, price: "$10+" },
          { name: "Reparación de Uña", desc: null, price: "$4+" }
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
          { name: "Servicios Adicionales", desc: null, price: "$5+" }
        ]
      },
      {
        name: "Depilación",
        note: null,
        items: [
          { name: "Cejas", desc: null, price: "$12" },
          { name: "Labio Superior", desc: null, price: "$8" },
          { name: "Labio Inferior y Mentón", desc: null, price: "$20+" },
          { name: "Cejas, Labio y Mentón", desc: null, price: "$25+" },
          { name: "Rostro Completo", desc: null, price: "$35+" },
          { name: "Brazos", desc: null, price: "$50+" },
          { name: "Axilas", desc: null, price: "$30+" },
          { name: "Piernas (Rodilla hacia abajo)", desc: null, price: "$60+" }
        ]
      },
      {
        name: "Extras",
        note: null,
        items: [
          { name: "Cambio Gel Polish (Manos)", desc: null, price: "$25" },
          { name: "Cambio Gel Polish (Pies)", desc: null, price: "$30" },
          { name: "Cambio Esmalte Regular (Manos)", desc: null, price: "$15" },
          { name: "Cambio Esmalte Regular (Pies)", desc: null, price: "$20" },
          { name: "Punta Blanca", desc: null, price: "Extra $5" },
          { name: "Diseño de Uñas", desc: null, price: "$7+" }
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
