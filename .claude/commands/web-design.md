# WEB — STEP 2: VISUAL DESIGN SYSTEM

Generate the complete design system based on the creative brief and JSON data.

## CREATIVE VARIATION RULE

**Every site must have a UNIQUE design system. The code here is structural reference, not a template.**

- **Typography:** The tone table suggests fonts, but there are hundreds of options on Google Fonts. Don't repeat the same font across two different sites in the same batch. Explore combinations not in the table if they fit the business better.
- **Colors:** The variants with `color-mix()` and `oklch()` are the technique — the values must be unique per site. Experiment with different saturations, luminosities, and hue angles.
- **Spacing and layout:** Not all sites need the same `--container-max` or `--section-padding`. A luxury site breathes more, an urgent services site is more compact.
- **Depth effects:** Grain, glassmorphism, gradient mesh, colored shadows — choose the ones that fit the tone. Don't use all of them, don't always use the same ones.
- **Separators:** Lines, SVGs, clip-paths, gradients — vary the technique between sites.

**What MUST be constant:** Semantic CSS variables, WCAG AA contrast, no pure #fff/#000, maximum 2 font families.

---

## 2.1 Typography (defines the site's character)

Use Google Fonts or @font-face. **Never** Inter, Roboto, Arial, Helvetica, or Open Sans as display.

Pairing rules:
- One display font with strong personality (serif, condensed, experimental)
- One legible and complementary body font
- Maximum 2 families per project

```css
@import url('https://fonts.googleapis.com/css2?family=[Display]:wght@400;600;700&family=[Body]:wght@300;400;500&display=swap');

:root {
  --font-display: '[Display Font]', serif;
  --font-body:    '[Body Font]', sans-serif;
}

h1, h2, h3, .hero-title { font-family: var(--font-display); }
body, p, .btn            { font-family: var(--font-body); }
```

---

## 2.2 Color and Atmosphere

Never pure white (#fff) or pure black (#000) for backgrounds or main text.

| Element | Recommendation |
|---|---|
| Main background | #fafaf8 (warm) / #f5f7fa (cool) / #0f0f0f (dark) |
| Surface (card) | 4-6% darker/lighter than background |
| Main text | #1a1a1a or #f0efe9 depending on theme |
| Secondary text | 60% opacity of main |

### Mandatory Color Variable Mapping

**CRITICAL RULE:** Each semantic variable MUST have a distinct value with sufficient contrast. Never assign the same hex to `--color-primary` and `--color-text`, nor to `--color-text` and `--color-bg`.

Use the JSON colors (`primario`, `secundario`, `fondo`, `texto`) as a starting point:

```css
:root {
  /* --- Base palette (from JSON / brief) --- */
  --color-primary:   [primary hex from JSON — accent, buttons, links];
  --color-secondary: [secondary hex — complement, badges, hovers];
  --color-bg:        [background hex — main site background];
  --color-text:      [text hex — body text color];

  /* --- Mandatory mental validation --- */
  /* ✅ --color-text must be READABLE on --color-bg (WCAG AA ≥ 4.5:1) */
  /* ✅ --color-primary must be READABLE on --color-bg as link/button */
  /* ❌ If text and bg are similar → light text on dark bg or vice versa */
  /* ❌ If primary == text → change text to a neutral (see table below) */

  /* --- Automatic variants --- */
  --color-primary-dark:  color-mix(in oklch, var(--color-primary) 80%, black);
  --color-primary-light: color-mix(in oklch, var(--color-primary) 40%, white);
  --color-primary-glow:  oklch(from var(--color-primary) l c h / 0.25);
  --color-text-muted:    oklch(from var(--color-text) l c h / 0.6);
}
```

### Fallbacks if JSON lacks clear colors

| Background | Recommended Text | Avoid |
|---|---|---|
| light (#fafaf8, #f5f7fa) | dark (#1a1a1a, #2d2d2d) | same tone as primary |
| dark (#0f0f0f, #1a1a2e) | light (#f0efe9, #e8e8e8) | mid-gray with no contrast |
| medium (#4a5568) | DO NOT use as main background | — |

### ⛔ MANDATORY CONTRAST VALIDATION GATE

**BEFORE writing the CSS file, you MUST calculate and verify these 4 contrast pairs. This is a BLOCKING requirement — do NOT proceed if any pair fails.**

| Pair | Minimum Ratio | Common Failure |
|---|---|---|
| `--color-text` on `--color-bg` | ≥ 4.5:1 | Dark gray on medium gray |
| `--color-primary` on `--color-bg` | ≥ 4.5:1 (normal text) / ≥ 3:1 (large text only) | **Gold/tan/beige on cream/white — ALMOST ALWAYS FAILS** |
| `--color-primary` on `--color-surface` | ≥ 3:1 | Same warm family = invisible |
| `--color-text-muted` on `--color-bg` | ≥ 4.5:1 | Low-opacity text on light bg |

**How to validate:** For each pair, estimate the contrast ratio. If `--color-primary` is used as text color for labels, links, or prices on light backgrounds, it MUST pass 4.5:1. If only used for large headings (≥24px / 18.66px bold), 3:1 is acceptable.

**Warm-on-warm trap:** Gold (#C9A96E), tan, beige, coral, peach on cream (#FAF7F2), ivory, white backgrounds = ~2-3:1 ratio = **FAILS**. Solutions:
- Darken the primary: gold → deep gold (#8B7530) or bronze (#7A6332)
- Cool the background: cream → cool light (#F5F7FA) or true white-ish (#FAFAFA)
- Use primary only for decorative elements (borders, icons, backgrounds) and a darker variant for text

**If ANY pair fails → adjust the value and re-verify before writing the file.**

### Depth Effects (choose 1-2 based on tone):

**Grain overlay** (premium, subtle):
```css
.grain::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 100;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

**Gradient mesh** (modern, vibrant):
```css
.mesh-bg {
  background:
    radial-gradient(ellipse at 20% 50%, var(--color-primary-glow) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, var(--color-secondary-glow) 0%, transparent 50%),
    var(--color-bg);
}
```

**Glassmorphism** (tech, futuristic):
```css
.glass {
  background: oklch(from var(--color-bg) l c h / 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid oklch(from var(--color-bg) l c h / 0.12);
}
```

---

## 2.3 Spacing and Layout

**Spacing bounds (MANDATORY):**
- `--section-padding`: `clamp(3rem, 6vw, 6rem)` as DEFAULT. Only hero and full-width CTA banners may use up to `clamp(4rem, 8vw, 8rem)`.
- **NEVER use 10rem+ section padding.** Empty space ≠ luxury. Content density must feel intentional, not abandoned. A page with 13 sections × 10rem padding = user scrolls through voids.
- Luxury sites breathe through **typography scale and whitespace within content**, not through massive section padding.

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.section {
  padding-block: var(--section-padding); /* clamp(3rem, 6vw, 6rem) — NEVER exceed 6rem */
}
```

### Break the grid in at least 2 sections:
- Element that overflows its container (edge-to-edge image on desktop)
- Diagonal text with `clip-path` or `transform: rotate(-2deg)`
- Asymmetric card with `position: absolute` overlapping the next section
- Asymmetric CSS Grid (`2fr 1fr` or `3fr 2fr`)
- CSS Subgrid to align content between sibling cards

---

## 2.4 Shadows with Personality

```css
:root {
  --shadow-card:  0 4px 24px -4px var(--color-primary-glow),
                  0 1px 4px oklch(0 0 0 / 0.06);
  --shadow-hover: 0 16px 48px -8px var(--color-primary-glow),
                  0 4px 12px oklch(0 0 0 / 0.08);
  --shadow-btn:   0 4px 16px var(--color-primary-glow);
}
```

---

## 2.5 Separators and Decorative Details

```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  border: none;
}

.section-tag::before {
  content: '—';
  color: var(--color-accent);
  margin-right: 0.5rem;
}
```

---

## 2.6 Modern CSS Techniques to Use

- **Native CSS Nesting:** group related styles without preprocessor
- **Container Queries:** `@container` for components adaptable to their container
- **`:has()` selector:** style parents based on children (e.g.: `.card:has(img)`)
- **`oklch()`:** perceptually uniform color variants
- **CSS Subgrid:** align content internally between grid siblings
- **`@layer`:** base, components, utilities — to control the cascade
- **`light-dark()`:** if the design supports light/dark themes
- **Logical properties:** use `margin-inline`, `padding-block`, `inset` instead of `margin-left/right`
