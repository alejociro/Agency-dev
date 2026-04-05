# WEB — STEP 4: PAGES & SECTIONS

Generate all pages with the same design quality.
Use data from the audit JSON to personalize content.

**Language rule:** All website copy, headings, CTAs, form labels, and placeholder text must be written in Spanish.

## CREATIVE VARIATION RULE

**The section structure below is the minimum expected content, NOT a fixed wireframe.**

- **Section order:** Can vary. Not all sites need the same sequence. A restaurant can put the gallery before services. A spa can start with an immersive visual experience before the traditional hero.
- **Example HTML:** It is meant to illustrate semantics, not to be copied. Write your own markup adapted to the actual business content.
- **Section layout:** The hero is not always centered text. It can be split (image + text), full-bleed image with overlay, video background, asymmetric grid. Vary according to the brief's tone.
- **Number of sections:** Add or remove based on what the JSON contains. If there are no testimonials, don't create an empty section. If there are many services, it may deserve a separate page.
- **Class naming:** Don't literally copy `.hero-tag`, `.hero-title` if they don't fit. The CSS classes are yours — name them according to the actual structure you create.

**What MUST remain constant:** Semantic HTML, accessibility (touch targets, focus visible, alt text), visible CTA above the fold, real data from the JSON, functional responsive design.

---

## Main page (index)

### HERO — First impression = Everything
- 100vh desktop, 90svh mobile (use `svh` for real viewport on mobile devices)
- Hierarchy: small tag → huge title → subtitle → primary CTA → social proof
- Background based on brief's tone (gradient mesh / image with overlay / geometric / muted video)
- Primary CTA impossible to miss — high contrast, generous size, shimmer on hover
- Optional secondary CTA: ghost button or link with arrow
- Animated scroll indicator
- Classes: `hero-tag`, `hero-title`, `hero-sub`, `hero-cta` (see /web-animations)

```html
<section class="hero">
  <div class="container">
    <span class="hero-tag"><!-- sector tag --></span>
    <h1 class="hero-title"><!-- powerful title --></h1>
    <p class="hero-sub"><!-- value proposition --></p>
    <div class="hero-cta">
      <a href="#contacto" class="btn-primary"><!-- CTA --></a>
      <a href="#servicios" class="btn-ghost">Ver servicios →</a>
    </div>
    <div class="hero-proof"><!-- social proof --></div>
  </div>
  <div class="hero-bg"><!-- visual background --></div>
</section>
```

---

### SOCIAL PROOF BAR
- **Option A:** Logos in infinite scroll loop (`logos-track`)
- **Option B:** Metrics: "X+ clients · X% satisfaction · X years"

---

### SERVICES / VALUE PROPOSITION
- Cards with unique inline SVG icons — no emojis or Font Awesome
- Each SVG simple, distinctive, related to the service
- Hover reveals description or changes visual state
- Asymmetric layout: featured card highlighted or grid with different sizes
- Use CSS Subgrid to align content across cards

---

### WHY US? / DIFFERENTIATORS
- Based on `recomendaciones` from the JSON (rewritten as strengths)
- Minimum 3 differentiators with concrete data or evidence
- Avoid generic bullets — use timeline, tabs, or before/after comparison

---

### PROCESS / HOW IT WORKS
- 3–5 numbered steps with animated connecting line
- Reduces purchase friction by explaining what it's like to work with the business

---

### TESTIMONIALS
- Carousel with CSS scroll snap (no libraries)
- Cards: avatar (placeholder with initials + color), name, role, company
- Inline SVG rating
- If the JSON has testimonials: use them. If not: generate 3 believable ones for the sector

```css
.testimonials-track {
  display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
  gap: var(--space-4); scrollbar-width: none;
}
.testimonials-track::-webkit-scrollbar { display: none; }
.testimonial-card { scroll-snap-align: start; flex: 0 0 clamp(280px, 80vw, 420px); }
```

---

### MID-PAGE CTA (full-width)
- Background `--color-primary` or contrasting gradient
- Urgency message based on real problems from the JSON
- Contrasting button (dark bg → light button and vice versa)
- 100% width without container

---

### CONTACT
- Form: name, email, phone, service (select with options from JSON), message
- Floating labels or bottom-border inputs (no generic boxes)
- Contact info with inline SVG icons
- Map embed if address exists in JSON
- WhatsApp if phone number exists in JSON
- Use native `<dialog>` for submission confirmation

```html
<div class="field">
  <input type="text" id="name" placeholder=" " required>
  <label for="name">Nombre completo</label>
</div>
```

```css
.field { position: relative; }
.field label {
  position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  transition: all 200ms ease; color: var(--color-text-muted); pointer-events: none;
}
.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  top: -10px; transform: none; font-size: 0.75rem; color: var(--color-primary);
}
```

---

### FOOTER
- Logo + tagline
- Navigation in 2–3 columns
- SVG icons for social media from the JSON
- Minimalist newsletter input (visual)
- Copyright with current year + legal links

---

## Secondary pages

Each one with its own design, coherent with the site's identity.

### About
- Visual timeline of the business history
- Team grid with hover (or values grid if no team)
- Mission/vision in large display typography
- Animated numbers (`animateCounter`)

### Services
- Section hero with strong title (not generic "Services")
- Each service: description, benefit bullets, individual CTA
- FAQ accordion with native `<details>` + CSS animation

```css
details {
  & summary { cursor: pointer; list-style: none; }
  & summary::marker { display: none; }
  &[open] .faq-content {
    animation: slideDown 0.3s ease;
  }
}
```

### Portfolio
- Masonry grid with CSS columns or filterable by category (vanilla JS)
- Hover: overlay with title + CTA
- Believable sector placeholders if no data available

### Contact
- Two-column layout: info + full form
- Map embed if address available
- Hours and response times
- WhatsApp with animated SVG icon

---

## Modern semantic HTML

- Use `<search>` for search containers
- Use `<dialog>` for modals (not divs with z-index)
- `popover` attribute for tooltips and dropdowns
- `<details>` for accordions
- Minimum 44×44px touch targets on mobile
