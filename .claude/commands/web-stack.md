# WEB — PASO 1: STACK Y CONFIGURACIÓN

Configura el proyecto según `stack_para_web.framework` del JSON de auditoría.

---

## Selección de stack

| Valor JSON | Stack completo | Cuándo aplica |
|---|---|---|
| `html` | HTML + CSS + JS vanilla + Tailwind CSS v4 CDN | Brochure simples, < 5 páginas |
| `astro` | Astro 5 + Tailwind CSS v4 | Contenido rico, buen SEO, sin backend |
| `react` | Vite 6 + React 19 + Tailwind CSS v4 + Framer Motion | Apps dinámicas, muchas interacciones |

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
  tailwind.config.mjs
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

### React 19 (Vite 6)
```
<negocio>/
  vite.config.js
  tailwind.config.js
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
- Usar `@layer` para organizar cascade: `@layer base, components, utilities`
- `prefers-reduced-motion` desactiva animaciones no esenciales
- `font-display: swap` en todas las fuentes
- Todas las imágenes: `width`, `height`, `loading="lazy"`, `decoding="async"`
- Critical CSS (above the fold) inline en `<head>`
- Usar `oklch()` para definir colores cuando se necesiten variantes programáticas
- Container queries (`@container`) para componentes que se adaptan a su contenedor, no solo al viewport
