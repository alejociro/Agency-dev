# WEB — PASO 1: STACK Y CONFIGURACIÓN

Configura el proyecto según `stack_para_web.framework` del JSON de auditoría.

---

## Selección de stack

| Valor JSON | Stack completo | Cuándo aplica |
|---|---|---|
| `html` | HTML + CSS + JS vanilla + Tailwind CSS v4 CDN | Brochure simples, < 5 páginas |
| `astro` | Astro 5 + Tailwind CSS v4 (vía `@tailwindcss/vite`) | Contenido rico, buen SEO, sin backend |
| `react` | Vite 6 + React 19 + Tailwind CSS v4 (vía `@tailwindcss/vite`) + Framer Motion | Apps dinámicas, muchas interacciones |

---

## Estructura de carpetas

### HTML vanilla
```
<negocio>/
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
<negocio>/
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

> **NO crear** `tailwind.config.mjs` — Tailwind v4 no lo usa. Los tokens se definen en `design-system.css` con `@theme`.

### React 19 (Vite 6)
```
<negocio>/
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

> **NO crear** `tailwind.config.js` — Tailwind v4 no lo usa.

---

## Configuración de Tailwind CSS v4 (OBLIGATORIO)

Tailwind v4 usa `@tailwindcss/vite` como plugin de Vite. **NO usar `@astrojs/tailwind`** (ese paquete es para Tailwind v3 y es incompatible).

### package.json — dependencias Astro

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@tailwindcss/vite": "^4.2.2",
    "tailwindcss": "^4.2.2"
  }
}
```

### package.json — dependencias React

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

### design-system.css — inicio del archivo (SIEMPRE)

```css
@import "tailwindcss";
```

> **NUNCA usar** `@tailwind base; @tailwind components; @tailwind utilities;` (sintaxis v3).
> **NUNCA usar** `@layer base, components, utilities;` sin `@import "tailwindcss"`.
> **NUNCA crear** `tailwind.config.mjs` ni `postcss.config.mjs` — Tailwind v4 no los necesita.

### Paquetes prohibidos (NO instalar)

- `@astrojs/tailwind` — integración obsoleta para Tailwind v3
- `postcss-nesting` — Tailwind v4 soporta nesting nativo
- `autoprefixer` — Tailwind v4 lo incluye internamente

---

## Variables CSS universales (en design-system.css — SIEMPRE)

```css
:root {
  /* Paleta — adaptar del JSON */
  --color-primary:       [del JSON];
  --color-primary-dark:  [10% más oscuro];
  --color-primary-glow:  [con alpha 0.25 para efectos];
  --color-secondary:     [del JSON];
  --color-accent:        [del JSON];
  --color-bg:            [nunca #fff puro — usar warm o cool off-white];
  --color-surface:       [ligeramente diferente al bg para cards];
  --color-text:          [nunca #000 puro — usar #1a1a1a o similar];
  --color-text-muted:    [60-70% opacidad del text];

  /* Espaciado (base 8px) */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-6: 3rem;
  --space-8: 4rem;
  --space-12: 6rem;
  --space-16: 8rem;

  /* Tipografía fluida */
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

  /* Secciones */
  --section-padding:   clamp(5rem, 10vw, 10rem);
  --container-max:     1200px;
  --container-padding: clamp(1rem, 5vw, 2rem);
}
```

---

## Reglas de configuración

- Mobile-first: media queries de 360px hacia arriba
- Usar CSS nesting nativo (soportado en todos los browsers modernos 2025+)
- Usar `@layer` de Tailwind v4 para organizar cascade (se activa con `@import "tailwindcss"`)
- `prefers-reduced-motion` desactiva animaciones no esenciales
- `font-display: swap` en todas las fuentes
- Todas las imágenes: `width`, `height`, `loading="lazy"`, `decoding="async"`
- Critical CSS (above the fold) inline en `<head>`
- Usar `oklch()` para definir colores cuando se necesiten variantes programáticas
- Container queries (`@container`) para componentes que se adaptan a su contenedor, no solo al viewport
- En frontmatter de Astro (entre `---`): usar backticks o comillas dobles para strings con apóstrofes (ej: `"property's"`, nunca `'property's'`)
