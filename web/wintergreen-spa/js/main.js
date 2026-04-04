/* ═══════════════════════════════════════════════════════
   WINTERGREEN SPA — Main JavaScript
   ═══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Navigation scroll effect ──────────────────────── */
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("nav--scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu toggle ────────────────────────────── */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !isOpen);
      menu.classList.toggle("nav__menu--open", !isOpen);
    });

    menu.querySelectorAll(".nav__link, .nav__cta").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("nav__menu--open");
      });
    });
  }

  /* ── Scroll-triggered fade-up animations ───────────── */
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReduced) {
    const targets = document.querySelectorAll(
      ".service-card, .amenity-card, .gift-card, .faq__item, .about__content, .about__visual, .section__header, .contact__block, .contact__form"
    );

    targets.forEach((el) => el.classList.add("fade-up"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ── FAQ accordion — smooth open/close ─────────────── */
  document.querySelectorAll(".faq__item").forEach((item) => {
    const summary = item.querySelector("summary");
    if (summary) {
      summary.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = item.hasAttribute("open");
        document.querySelectorAll(".faq__item[open]").forEach((other) => {
          if (other !== item) other.removeAttribute("open");
        });
        if (isOpen) {
          item.removeAttribute("open");
        } else {
          item.setAttribute("open", "");
        }
      });
    }
  });

  /* ── Contact form handler ──────────────────────────── */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "Sent! We'll be in touch.";
      btn.disabled = true;
      btn.style.opacity = "0.7";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = "1";
        form.reset();
      }, 3000);
    });
  }

  /* ── Smooth scroll for anchor links ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
