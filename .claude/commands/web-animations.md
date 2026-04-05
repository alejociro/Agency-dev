# WEB — STEP 3: ANIMATION SYSTEM

Implement animations in 4 layers. All must respect `prefers-reduced-motion`.
For HTML/Astro: CSS + native JS. For React: Framer Motion.

## CREATIVE VARIATION RULE

**The code in this file is a minimum quality reference, NOT a template to copy.**

Every site MUST vary its implementation. For each animation, adapt based on the brief's tone:

| Aspect | Vary between... |
|---|---|
| **Direction** | fade-up, fade-left, fade-right, scale-in, rotate-in, clip-reveal |
| **Easing** | `cubic-bezier(0.16,1,0.3,1)` (spring), `ease-out`, `cubic-bezier(0.34,1.56,0.64,1)` (bounce), `linear` |
| **Timing** | Delays between 0.03s-0.1s, durations between 0.4s-1.2s |
| **Reveal technique** | opacity, transform, clip-path, filter blur, scale |
| **Stagger pattern** | Sequential, even/odd, center-out, random |

**Mental test:** If you place two different sites side by side, do they feel distinct? If not, you're copying the template. Rewrite the keyframes, change directions, invent combinations.

**What MUST be constant:** `prefers-reduced-motion`, performance (only transform/opacity), scroll-driven as primary method.

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

## Layer 1 — Page Load (immediate impact)

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

/* Hero stagger */
.hero-tag    { animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
.hero-title  { animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
.hero-sub    { animation: fadeIn  0.8s ease                        0.5s both; }
.hero-cta    { animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
.hero-proof  { animation: fadeIn  0.6s ease                        1.0s both; }
```

---

## Layer 2 — Scroll Reveal (PRIORITIZE scroll-driven CSS, fallback with IO)

**Preference:** Use `animation-timeline: view()` (native CSS) as the primary method. Only use IntersectionObserver as a fallback for browsers that don't support scroll-driven animations.

### Primary method: Scroll-Driven Animations (pure CSS, 0 JavaScript)

```css
/* ═══ Basic reveal — elements enter when appearing in viewport ═══ */
@keyframes scroll-fade-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes scroll-fade-left {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes scroll-fade-right {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes scroll-scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

/* Apply to any element with data-scroll */
[data-scroll="fade-up"] {
  animation: scroll-fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
[data-scroll="fade-left"] {
  animation: scroll-fade-left linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
[data-scroll="fade-right"] {
  animation: scroll-fade-right linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
[data-scroll="scale-in"] {
  animation: scroll-scale-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 35%;
}

/* ═══ Pure CSS stagger — each child enters with progressive delay ═══ */
[data-scroll="stagger"] > * {
  animation: scroll-fade-up linear both;
  animation-timeline: view();
}
[data-scroll="stagger"] > *:nth-child(1) { animation-range: entry 0% entry 30%; }
[data-scroll="stagger"] > *:nth-child(2) { animation-range: entry 5% entry 35%; }
[data-scroll="stagger"] > *:nth-child(3) { animation-range: entry 10% entry 40%; }
[data-scroll="stagger"] > *:nth-child(4) { animation-range: entry 15% entry 45%; }
[data-scroll="stagger"] > *:nth-child(5) { animation-range: entry 20% entry 50%; }
[data-scroll="stagger"] > *:nth-child(6) { animation-range: entry 25% entry 55%; }

/* ═══ Reading progress bar ═══ */
.reading-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 3px;
  background: var(--color-primary);
  transform-origin: left;
  animation: scaleX linear;
  animation-timeline: scroll();
  z-index: 100;
}
@keyframes scaleX {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* ═══ Smooth parallax tied to scroll ═══ */
.hero-bg {
  animation: parallax linear;
  animation-timeline: scroll();
  animation-range: 0vh 100vh;
}
@keyframes parallax {
  to { transform: translateY(100px); }
}

/* ═══ Elements that progressively change opacity with scroll ═══ */
[data-scroll="parallax-fade"] {
  animation: parallax-fade linear both;
  animation-timeline: view();
  animation-range: exit 0% exit 50%;
}
@keyframes parallax-fade {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-30px); }
}
```

### Fallback: IntersectionObserver (for browsers without scroll-driven support)

Add ONLY if broad support is needed. The JS detects if scroll-driven is supported:

```js
if (!CSS.supports('animation-timeline', 'view()')) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('is-visible');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));
}
```

```css
/* Fallback styles — only apply if scroll-driven is NOT supported */
@supports not (animation-timeline: view()) {
  [data-scroll]             { opacity: 0; transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1); }
  [data-scroll="fade-up"]   { transform: translateY(32px); }
  [data-scroll="fade-left"] { transform: translateX(-32px); }
  [data-scroll="fade-right"]{ transform: translateX(32px); }
  [data-scroll="scale-in"]  { transform: scale(0.93); }
  [data-scroll].is-visible  { opacity: 1; transform: none; }

  [data-scroll="stagger"] > * {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  [data-scroll="stagger"].is-visible > *:nth-child(1) { transition-delay: 0.05s; opacity: 1; transform: none; }
  [data-scroll="stagger"].is-visible > *:nth-child(2) { transition-delay: 0.12s; opacity: 1; transform: none; }
  [data-scroll="stagger"].is-visible > *:nth-child(3) { transition-delay: 0.19s; opacity: 1; transform: none; }
  [data-scroll="stagger"].is-visible > *:nth-child(4) { transition-delay: 0.26s; opacity: 1; transform: none; }
  [data-scroll="stagger"].is-visible > *:nth-child(5) { transition-delay: 0.33s; opacity: 1; transform: none; }
  [data-scroll="stagger"].is-visible > *:nth-child(6) { transition-delay: 0.40s; opacity: 1; transform: none; }
}
```

---

## Layer 3 — Micro-interactions

```css
/* Cards with spring */
.card {
  transition: transform 250ms cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 250ms ease;
}
.card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: var(--shadow-hover);
}

/* Primary button with shimmer */
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

## Layer 4 — Special Elements (based on brief tone)

### Animated counter
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

### Infinite logo scroll
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

### View Transitions API (for page navigation — Astro/MPA)
```css
/* Smooth transitions between pages without SPA */
@view-transition { navigation: auto; }

::view-transition-old(root) {
  animation: fade-out 0.2s ease;
}
::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}

/* Custom transition per element */
.hero-title { view-transition-name: hero-title; }
.site-logo  { view-transition-name: site-logo; }
```

### Custom cursor (luxury/premium only)
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

---

## Layer 5 — Premium 2025+ Techniques (MANDATORY: at least 3 per site)

**MINIMUM REQUIRED — choose at least 3 of the following, adapted to the business tone:**

| Technique | When it FITS | When it DOESN'T fit |
|---|---|---|
| **Kinetic Text** | Always (hero h1) | Never — every site must have it |
| **Scroll-Driven Animations** | Always (Layer 2 already requires it) | Never — it's the standard |
| **Gradient Mesh** | Dark themes, luxury, tech, premium health | Rustic/organic sites where a solid background is better |
| **Grain Overlay** | Premium, artisanal, vintage, barbershop, café | Childlike, colorful, playful |
| **Bento Grid** | 4-6 services/features with varied content | Less than 3 items or uniform content |
| **Magnetic Buttons** | Main CTA on desktop | Sites where the CTA is a phone number (mobile-first) |
| **Scroll Snap** | Few sections (4-6), strong visual content | Lots of text, long forms, 8+ sections |

**Validation before moving to the next step:**
- [ ] Did I implement kinetic text in the hero h1?
- [ ] Do scroll animations use `animation-timeline: view()` as the primary method (not just IO)?
- [ ] Is there at least 1 visual depth technique (grain, gradient mesh, or glassmorphism)?
- [ ] Is there at least 1 premium interaction technique (magnetic buttons, scroll snap, or multilayer parallax)?
- [ ] If I place this site next to another I made, do they feel visually distinct?

If a technique DOESN'T fit the business, substitute it with another from the catalog — but never deliver a site with fewer than 3 premium techniques.

### Section Scroll Snap (presentation effect)
Each section occupies the full viewport. Feels like keynote slides.
```css
html {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}
.section-snap {
  scroll-snap-align: start;
  min-height: 100dvh;
  display: grid;
  place-content: center;
}
/* Disable on mobile if content overflows */
@media (max-height: 600px) {
  html { scroll-snap-type: none; }
}
```
**When to use:** Sites with few sections (4-6), strong visual content, luxury/premium/futuristic tones. DO NOT use if there's lots of text or long forms.

### Animated gradients and mesh backgrounds
Backgrounds that feel alive — not static. Immediate difference between "template" and "premium".
```css
/* ═══ Animated gradient mesh (hero or featured section) ═══ */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes gradient-rotate {
  to { --angle: 360deg; }
}

.hero-mesh {
  background:
    conic-gradient(from var(--angle) at 30% 40%, var(--color-primary-glow), transparent 60%),
    conic-gradient(from calc(var(--angle) + 120deg) at 70% 60%, var(--color-secondary-glow, var(--color-primary-light)), transparent 50%),
    var(--color-bg);
  animation: gradient-rotate 12s linear infinite;
}

/* ═══ Scroll-following gradient (pure CSS) ═══ */
@keyframes gradient-scroll {
  from { background-position: 0% 0%; }
  to   { background-position: 100% 100%; }
}
.scroll-gradient {
  background: linear-gradient(135deg, var(--color-primary-glow), transparent 40%, var(--color-secondary-glow, var(--color-primary-light)), transparent 80%);
  background-size: 200% 200%;
  animation: gradient-scroll linear;
  animation-timeline: scroll();
}

/* ═══ Aurora borealis (dark themes) ═══ */
@keyframes aurora {
  0%, 100% { opacity: 0.4; transform: translateY(0) scale(1); }
  50%      { opacity: 0.7; transform: translateY(-20px) scale(1.1); }
}
.aurora-bg::before,
.aurora-bg::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  border-radius: 50%;
  filter: blur(80px);
}
.aurora-bg::before {
  background: var(--color-primary-glow);
  animation: aurora 8s ease-in-out infinite;
}
.aurora-bg::after {
  background: var(--color-secondary-glow, var(--color-primary-light));
  animation: aurora 10s ease-in-out infinite 2s;
}
```

### Kinetic Text — Split Text Reveal by words (hero titles)
The hero title reveals word by word with staggered timing. First visual impact.
```js
function kineticText(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) =>
    `<span class="kw" style="--i:${i}"><span class="kw-inner">${w}</span></span>`
  ).join(' ');
  el.classList.add('kinetic-ready');
}
document.querySelectorAll('[data-kinetic]').forEach(kineticText);
```
```css
.kw { display: inline-block; overflow: hidden; vertical-align: top; }
.kw-inner {
  display: inline-block;
  transform: translateY(110%) rotateX(-80deg);
  opacity: 0;
  transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease;
  transition-delay: calc(var(--i) * 0.06s);
}

/* Activate with scroll-driven if supported */
@supports (animation-timeline: view()) {
  .kinetic-ready .kw-inner {
    animation: kinetic-word linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
    animation-delay: calc(var(--i) * 0.04s);
    transition: none;
  }
  @keyframes kinetic-word {
    from { transform: translateY(110%) rotateX(-80deg); opacity: 0; }
    to   { transform: translateY(0) rotateX(0); opacity: 1; }
  }
}

/* Fallback with .is-visible */
@supports not (animation-timeline: view()) {
  [data-kinetic].is-visible .kw-inner {
    transform: translateY(0) rotateX(0);
    opacity: 1;
  }
}
```
**Use on:** The main hero heading (h1). Optionally on key section titles. Maximum 2 per page.

### Bento Grid Layout (services/features sections)
The layout Apple, Linear, Stripe use. Asymmetric grids with varied-size cards.
```css
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: var(--space-4);
}
.bento-item:nth-child(1) { grid-column: span 2; grid-row: span 2; } /* hero card */
.bento-item:nth-child(4) { grid-column: span 2; }                    /* wide card */

/* Each card enters with scroll-driven */
.bento-item {
  animation: scroll-scale-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 35%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface, oklch(from var(--color-bg) calc(l - 0.03) c h));
  padding: var(--space-6);
}

/* Responsive */
@media (max-width: 768px) {
  .bento { grid-template-columns: 1fr 1fr; }
  .bento-item:nth-child(1) { grid-column: span 2; grid-row: span 1; }
}
@media (max-width: 480px) {
  .bento { grid-template-columns: 1fr; }
  .bento-item { grid-column: span 1 !important; }
}
```
**When to use:** Services, features, or "why us" sections with 4-6 items. Replaces the generic uniform grid.

### Magnetic Buttons (main CTA)
The CTA button "attracts" toward the cursor. Micro-interaction that makes the site feel alive.
```js
if (matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    const strength = 0.3;
    const radius = 80;

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
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      btn.style.transform = '';
      setTimeout(() => btn.style.transition = '', 400);
    });
  });
}
```
**Use on:** Main hero CTA button. Optionally on secondary CTAs. Add `data-magnetic` to the element.
