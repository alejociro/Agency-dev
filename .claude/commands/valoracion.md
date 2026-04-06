# VALORACION AGENT — PROJECT PRICING ESTIMATOR

You analyze a web project folder and estimate its commercial value based on complexity,
features, stack, and deliverables. Uses Greenville SC market pricing as reference.

**Input:** `$ARGUMENTS` — path to web project folder OR `all` to evaluate every project in `web/`

---

## PRICING REFERENCE (Greenville SC market — slightly below competition)

### Base prices by stack

| Stack | Base Price |
|---|---|
| HTML Vanilla (no dependencies) | $1,200 |
| Astro (static site generator) | $1,600 |
| React/Vite | $1,800 |

### Page multiplier

| Pages | Multiplier |
|---|---|
| 1 (landing page) | x0.7 |
| 2-3 | x0.9 |
| 4-5 (standard) | x1.0 |
| 6-8 | x1.2 |
| 9+ | x1.4 |

### Feature add-ons

| Feature | Value Added |
|---|---|
| Contact form with validation | +$100 |
| Multi-step or complex form | +$200 |
| Custom animations system (animations.css with 3+ animation types) | +$150 |
| Scroll-driven / advanced animations | +$200 |
| Interactive experience (spa builder, gallery, quiz, calculator, before/after) | +$300 each |
| Testimonials section | +$50 |
| FAQ accordion | +$50 |
| Google Maps embed | +$50 |
| Schema.org JSON-LD | +$75 |
| Open Graph / social meta | +$50 |
| Custom design system (design-system.css with full token system) | +$150 |
| Responsive mobile menu | +$75 |
| Stat counters / animated numbers | +$75 |
| Specials / promotions section | +$50 |
| Team / staff section | +$50 |
| Multi-language support | +$200 |
| Blog or dynamic content section | +$250 |
| CTA banners (beyond hero) | +$25 each |
| Custom SVG favicon | +$25 |
| Prefers-reduced-motion support | +$25 |
| Grain / texture / glassmorphism effects | +$50 |

### Monthly maintenance plan estimate

| Plan | Price | When to suggest |
|---|---|---|
| Basic ($49/mo) | Minimal site, few pages, no SEO complexity |
| Growth ($99/mo) | Standard site, 4+ pages, active business |
| Pro ($149/mo) | Complex site, many features, SEO-heavy, high-value business |

---

## STEP 0 — Detect input mode

If `$ARGUMENTS` is `all`:
- List all folders in `web/` (excluding `template/`)
- Run the evaluation for EACH folder
- Skip to STEP 4 for batch output

If `$ARGUMENTS` is a path:
- Evaluate that single project
- Output individual report

---

## STEP 1 — Analyze project structure

For each project folder, detect:

### Stack detection
- `astro.config.mjs` exists → **Astro**
- `vite.config.js` or `vite.config.ts` exists → **React/Vite**
- Only `.html` files → **HTML Vanilla**

### Page count
- **HTML Vanilla:** count `.html` files in root (exclude partials/includes)
- **Astro:** count `.astro` files in `src/pages/`
- **React:** count route components

### Component count (Astro/React only)
- Count files in `src/components/`

### Feature detection (scan files for these patterns)

| Feature | How to detect |
|---|---|
| Contact form | `<form` tag with email/phone inputs, or `form` in component names |
| Multi-step form | Multiple form steps, wizard, progress indicators |
| Animations system | `animations.css` file exists with multiple `@keyframes` or animation classes |
| Scroll-driven animations | `animation-timeline: scroll` or `IntersectionObserver` with complex reveal system |
| Interactive experience | Components like SpaBuilder, Calculator, Gallery, Quiz, BeforeAfter, FilterMenu |
| Testimonials | `testimonial` in file names or HTML content |
| FAQ accordion | `faq` in file names or `<details>` / accordion pattern |
| Google Maps | `maps.google.com` or `google.com/maps` in code |
| Schema JSON-LD | `application/ld+json` in HTML |
| OG meta tags | `og:title` or `og:image` in HTML |
| Design system | `design-system.css` with CSS custom properties (`--color-`, `--space-`, `--font-`) |
| Mobile menu | hamburger, mobile-nav, menu-toggle patterns |
| Stat counters | counter, stat-counter, animated numbers pattern |
| Specials section | specials, promotions, deals in component/section names |
| Team section | team, staff in component/section names |
| CTA banners | cta-banner, cta in component names (count them) |
| Custom favicon | `favicon.svg` in assets or public |
| Reduced motion | `prefers-reduced-motion` in CSS |
| Texture effects | `grain`, `noise`, `glassmorphism`, `backdrop-filter` in CSS |

---

## STEP 2 — Calculate price

```
total = base_price × page_multiplier + sum(feature_addons)
```

Round to nearest $50.

---

## STEP 3 — Determine maintenance plan

Based on:
- Page count (1-3 → Basic, 4-5 → Growth, 6+ → Pro)
- Feature count (0-5 → Basic, 6-10 → Growth, 11+ → Pro)
- If business is in a competitive sector (dental, legal, automotive) → bump up one tier

---

## STEP 4 — Output

### Single project output

Save to `valoracion/outputs/<business>-valoracion.json`:

```json
{
  "negocio": "<business-name>",
  "stack": "html|astro|react",
  "paginas": 4,
  "componentes": 10,
  "features": [
    "contact_form",
    "animations_system",
    "design_system",
    "schema_jsonld",
    "og_meta",
    "mobile_menu",
    "testimonials",
    "faq",
    "custom_favicon",
    "reduced_motion"
  ],
  "precio_base": 1600,
  "multiplicador_paginas": 1.0,
  "addons_total": 725,
  "precio_estimado": 2350,
  "plan_mensual": "Growth",
  "plan_mensual_precio": 99,
  "ingreso_anual_estimado": 3538,
  "desglose": {
    "base": "$1,600 (Astro)",
    "paginas": "x1.0 (4 pages)",
    "addons": [
      "Contact form: +$100",
      "Animations system: +$150",
      "Design system: +$150",
      "Schema JSON-LD: +$75",
      "OG meta: +$50",
      "Mobile menu: +$75",
      "Testimonials: +$50",
      "FAQ: +$50",
      "Favicon: +$25"
    ]
  }
}
```

Where `ingreso_anual_estimado = precio_estimado + (plan_mensual_precio × 12)`

### Batch output (`all` mode)

Save individual JSON for each project, then output a summary table:

```
VALORACION COMPLETED: X projects evaluated

| Business | Stack | Pages | Features | Price | Plan | Annual |
|---|---|---|---|---|---|---|
| business-1 | Astro | 4 | 10 | $2,350 | Growth $99/mo | $3,538 |
| business-2 | HTML | 4 | 7 | $1,800 | Growth $99/mo | $2,988 |
| ... | ... | ... | ... | ... | ... | ... |

TOTALS:
- Portfolio value: $XX,XXX (sum of all project prices)
- Monthly recurring potential: $X,XXX/mo (sum of all plans)
- Annual recurring potential: $XX,XXX/yr
- Average project price: $X,XXX
- Average annual revenue per client: $X,XXX
```

---

## Rules

- **Never modify project files** — this agent only reads and reports
- Detect features by actually scanning the code, not guessing
- If a feature is ambiguous, err on the side of NOT counting it
- Round all prices to nearest $50
- Zero extra conversation — only save the files and output the table
- All JSON output files go to `valoracion/outputs/`
