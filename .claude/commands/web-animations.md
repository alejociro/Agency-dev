# WEB — PASO 3: SISTEMA DE ANIMACIONES

Implementa animaciones en 4 capas. Todas deben respetar `prefers-reduced-motion`.
Para HTML/Astro: CSS + JS nativo. Para React: Framer Motion.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Capa 1 — Page Load (impacto inmediato)

```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

/* Stagger en hero */
.hero-tag    { animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
.hero-title  { animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
.hero-sub    { animation: fadeIn  0.8s ease                        0.5s both; }
.hero-cta    { animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
.hero-proof  { animation: fadeIn  0.6s ease                        1.0s both; }
```

---

## Capa 2 — Scroll Reveal (Intersection Observer)

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('is-visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

```css
[data-animate]             { opacity: 0; transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1); }
[data-animate="fade-up"]   { transform: translateY(32px); }
[data-animate="fade-left"] { transform: translateX(-32px); }
[data-animate="fade-right"]{ transform: translateX(32px); }
[data-animate="scale-in"]  { transform: scale(0.93); }
[data-animate].is-visible  { opacity: 1; transform: none; }

/* Stagger para children */
[data-animate="stagger"] > * {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
[data-animate="stagger"].is-visible > *:nth-child(1) { transition-delay: 0.05s; opacity: 1; transform: none; }
[data-animate="stagger"].is-visible > *:nth-child(2) { transition-delay: 0.12s; opacity: 1; transform: none; }
[data-animate="stagger"].is-visible > *:nth-child(3) { transition-delay: 0.19s; opacity: 1; transform: none; }
[data-animate="stagger"].is-visible > *:nth-child(4) { transition-delay: 0.26s; opacity: 1; transform: none; }
[data-animate="stagger"].is-visible > *:nth-child(5) { transition-delay: 0.33s; opacity: 1; transform: none; }
[data-animate="stagger"].is-visible > *:nth-child(6) { transition-delay: 0.40s; opacity: 1; transform: none; }
```

### Scroll-driven animations (CSS nativo — moderno 2025+)

Para elementos que animan progresivamente con el scroll sin JavaScript:

```css
/* Barra de progreso de lectura */
.reading-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 3px;
  background: var(--color-primary);
  transform-origin: left;
  animation: scaleX linear;
  animation-timeline: scroll();
}

@keyframes scaleX {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Parallax suave con scroll-timeline */
.hero-bg {
  animation: parallax linear;
  animation-timeline: scroll();
  animation-range: 0vh 100vh;
}

@keyframes parallax {
  to { transform: translateY(100px); }
}
```

---

## Capa 3 — Micro-interacciones

```css
/* Cards con spring */
.card {
  transition: transform 250ms cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 250ms ease;
}
.card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: var(--shadow-hover);
}

/* Botón primario con shimmer */
.btn-primary {
  position: relative; overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, oklch(1 0 0 / 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 400ms ease;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-btn); }
.btn-primary:hover::after { transform: translateX(0); }
.btn-primary:active { transform: translateY(0); }

/* Nav links */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: ''; position: absolute; left: 0; bottom: -2px;
  width: 0; height: 1px;
  background: var(--color-primary);
  transition: width 300ms ease;
}
.nav-link:hover::after { width: 100%; }
```

---

## Capa 4 — Elementos especiales (según tono del brief)

### Contador animado
```js
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(update);
}
```

### Logo scroll infinito
```css
.logos-track {
  display: flex; gap: var(--space-8);
  animation: scroll-logos 20s linear infinite;
  width: max-content;
}
@keyframes scroll-logos {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.logos-track:hover { animation-play-state: paused; }
```

### View Transitions API (para navegación entre páginas — Astro/MPA)
```css
/* Transiciones suaves entre páginas sin SPA */
@view-transition { navigation: auto; }

::view-transition-old(root) {
  animation: fade-out 0.2s ease;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}

/* Transición personalizada por elemento */
.hero-title { view-transition-name: hero-title; }
.site-logo  { view-transition-name: site-logo; }
```

### Cursor personalizado (solo luxury/premium)
```css
@media (pointer: fine) {
  * { cursor: none; }
  .cursor {
    position: fixed; width: 12px; height: 12px; border-radius: 50%;
    background: var(--color-primary); pointer-events: none; z-index: 9999;
    transition: transform 200ms ease;
  }
  .cursor-follower {
    position: fixed; width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--color-primary); pointer-events: none; z-index: 9998;
    transition: transform 400ms cubic-bezier(0.16,1,0.3,1);
  }
}
```
