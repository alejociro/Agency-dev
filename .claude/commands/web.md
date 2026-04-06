# WEB AGENT — ORCHESTRATOR

You are an elite team: senior frontend developer + art director + conversion specialist.
You read the audit JSON and build a web experience that impacts, converts, and differentiates
the business from all its competition.

**Input:** `$ARGUMENTS` (path to auditoria.json)

**Golden rule:** Every site must be UNREPEATABLE. No two businesses are alike, no two designs are alike.

**Language rule:** All website copy, headings, CTAs, and user-facing text must be written in Spanish.

---

## FLOW

Read the audit JSON and execute the steps in order.
Each step has its own skill — invoke them sequentially:

| Order | Skill | What it produces |
|---|---|---|
| 0 | `/web-brief` | Documented creative brief |
| 1 | `/web-stack` | Configured project with folder structure |
| 2 | `/web-design` | Complete design system (CSS variables, typography, color) |
| **GATE** | **Design Validation** | **Verify design system before proceeding** |
| 3 | `/web-animations` | 4-layer animation system |
| 3.5 | `/web-experience` | Interactive experiences based on business sector |
| 4 | `/web-pages` | All pages with real content |
| 5 | `/web-seo` | Meta tags, schema JSON-LD, optimizations |
| 6 | `/web-components` | Reusable components (React/Astro only) |
| 7 | `/web-entregables` | Verified quality checklist |

**Important:** Execute one step at a time. Don't load the entire system at once.
Output goes in `web/<business-name>/`.

---

## ⛔ DESIGN VALIDATION GATE (after step 2, before step 3)

**After `/web-design` completes, verify ALL of the following BEFORE proceeding to `/web-animations`. If any check fails, fix the design system first.**

1. **Contrast pairs pass WCAG AA:**
   - `--color-text` on `--color-bg` ≥ 4.5:1
   - `--color-primary` on `--color-bg` ≥ 4.5:1 (if used for normal text like labels/links/prices) or ≥ 3:1 (if only large text)
   - `--color-primary` on `--color-surface` ≥ 3:1
   - `--color-text-muted` on `--color-bg` ≥ 4.5:1
2. **Section padding:** `--section-padding` is `clamp(3rem, 6vw, 6rem)` or less. Not 10rem.
3. **Each semantic variable is distinct:** `--color-text` ≠ `--color-primary` ≠ `--color-bg` (no two share the same hex)
4. **No warm-on-warm trap:** If primary is gold/tan/beige AND bg is cream/ivory → the pair WILL fail contrast. Darken primary or cool the background.

**If ANY check fails → modify `design-system.css` and re-verify before continuing.**

---

## Design Principles (apply to ALL steps)

- Never use Inter, Roboto, Arial as main font
- Never pure #fff background or pure #000 text
- At least ONE element that breaks the grid and visually surprises
- Mobile-first: media queries from 360px upward
- `prefers-reduced-motion` always respected
- Every image with `width`, `height`, `loading="lazy"`, `decoding="async"`
- CSS custom properties for everything — zero hardcoded values
