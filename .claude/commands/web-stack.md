# WEB — STEP 1: STACK & CONFIGURATION

Configure the project based on `stack_para_web.framework` from the audit JSON.

---

## Stack Selection

| JSON Value | Full Stack | When to Use |
|---|---|---|
| `html` | HTML + CSS + JS vanilla + Tailwind CSS v4 CDN | Simple brochures, < 5 pages |
| `astro` | Astro 5 + Tailwind CSS v4 (via `@tailwindcss/vite`) | Rich content, good SEO, no backend |
| `react` | Vite 6 + React 19 + Tailwind CSS v4 (via `@tailwindcss/vite`) + Framer Motion | Dynamic apps, many interactions |

---

## Folder Structure

### HTML vanilla
```
<business>/
  index.html
  about.html
  services.html
  contact.html
  styles/
    design-system.css
    main.css
  js/
    main.js
  assets/
    images/
    icons/
```

### Astro 5
```
<business>/
  astro.config.mjs
  package.json
  src/
    pages/
      index.astro
      about.astro
      services.astro
      contact.astro
    components/
    layouts/
      BaseLayout.astro
    styles/
      design-system.css
  public/
    assets/
```

> **DO NOT create** `tailwind.config.mjs` — Tailwind v4 doesn't use it. Tokens are defined in `design-system.css` with `@theme`.

### React 19 (Vite 6)
```
<business>/
  vite.config.js
  package.json
  src/
    App.jsx
    pages/
      Home.jsx
      About.jsx
      Services.jsx
      Contact.jsx
    components/
    styles/
      design-system.css
    assets/
```

> **DO NOT create** `tailwind.config.js` — Tailwind v4 doesn't use it.

---

## Tailwind CSS v4 Configuration (MANDATORY)

Tailwind v4 uses `@tailwindcss/vite` as a Vite plugin. **DO NOT use `@astrojs/tailwind`** (that package is for Tailwind v3 and is incompatible).

### package.json — Astro dependencies

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@tailwindcss/vite": "^4.2.2",
    "tailwindcss": "^4.2.2"
  }
}
```

### package.json — React dependencies

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@tailwindcss/vite": "^4.2.2",
    "tailwindcss": "^4.2.2"
  }
}
```

### astro.config.mjs (Astro)

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### vite.config.js (React)

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### design-system.css — file start (ALWAYS)

```css
@import "tailwindcss";
```

> **NEVER use** `@tailwind base; @tailwind components; @tailwind utilities;` (v3 syntax).
> **NEVER use** `@layer base, components, utilities;` without `@import "tailwindcss"`.
> **NEVER create** `tailwind.config.mjs` or `postcss.config.mjs` — Tailwind v4 doesn't need them.

### Prohibited Packages (DO NOT install)

- `@astrojs/tailwind` — obsolete integration for Tailwind v3
- `postcss-nesting` — Tailwind v4 supports native nesting
- `autoprefixer` — Tailwind v4 includes it internally

---

## Universal CSS Variables (in design-system.css — ALWAYS)

```css
:root {
  /* Palette — adapt from JSON */
  --color-primary:       [from JSON];
  --color-primary-dark:  [10% darker];
  --color-primary-glow:  [with alpha 0.25 for effects];
  --color-secondary:     [from JSON];
  --color-accent:        [from JSON];
  --color-bg:            [never pure #fff — use warm or cool off-white];
  --color-surface:       [slightly different from bg for cards];
  --color-text:          [never pure #000 — use #1a1a1a or similar];
  --color-text-muted:    [60-70% opacity of text];

  /* Spacing (base 8px) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --space-12: 6rem;
  --space-16: 8rem;

  /* Fluid Typography */
  --text-hero:  clamp(3rem, 8vw, 7rem);
  --text-h1:    clamp(2rem, 5vw, 4rem);
  --text-h2:    clamp(1.5rem, 3vw, 2.5rem);
  --text-h3:    clamp(1.2rem, 2vw, 1.75rem);
  --text-body:  clamp(1rem, 1.2vw, 1.125rem);
  --text-small: clamp(0.8rem, 1vw, 0.9rem);

  /* Line heights */
  --leading-tight: 1.1;
  --leading-snug:  1.3;
  --leading-body:  1.6;

  /* Border radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* Sections */
  --section-padding:   clamp(5rem, 10vw, 10rem);
  --container-max:     1200px;
  --container-padding: clamp(1rem, 5vw, 2rem);
}
```

---

## Configuration Rules

- Mobile-first: media queries from 360px upward
- Use native CSS nesting (supported in all modern browsers 2025+)
- Use Tailwind v4 `@layer` to organize cascade (activated with `@import "tailwindcss"`)
- `prefers-reduced-motion` disables non-essential animations
- `font-display: swap` on all fonts
- All images: `width`, `height`, `loading="lazy"`, `decoding="async"`
- Critical CSS (above the fold) inline in `<head>`
- Use `oklch()` to define colors when programmatic variants are needed
- Container queries (`@container`) for components that adapt to their container, not just the viewport
- In Astro frontmatter (between `---`): use backticks or double quotes for strings with apostrophes (e.g.: `"property's"`, never `'property's'`)
