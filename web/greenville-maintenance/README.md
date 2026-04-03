# Greenville Maintenance Services — Sitio Web

## Stack
- HTML5 + CSS3 (native nesting, @layer, container queries)
- Tailwind CSS v4 (CDN)
- Alpine.js 3 (CDN)
- Google Fonts: Plus Jakarta Sans + Outfit
- Vanilla JavaScript (IntersectionObserver, scroll-driven animations)

## Instalación
```bash
# No requiere build — abrir directamente en navegador
# Opción 1: Abrir index.html en el navegador

# Opción 2: Servidor local (recomendado para módulos ES)
npx serve .
# o
python -m http.server 8000
```

## Estructura
```
greenville-maintenance/
  index.html          ← Home (hero, stats, services, testimonials, contact)
  about.html          ← About (story, timeline, team, values)
  services.html       ← Services (4 servicios detallados, FAQ)
  contact.html        ← Contact (formulario completo, info)
  styles/
    design-system.css  ← Tokens, base, componentes, animaciones, utilidades
    main.css           ← Layout de header, hero, secciones, footer
  js/
    main.js            ← Alpine stores, scroll reveal, counters
  assets/
    images/
    icons/
```

## Deploy
```bash
# Netlify (drag & drop o CLI)
netlify deploy --prod --dir=.

# Vercel
vercel --prod

# GitHub Pages
# Push a repo → Settings → Pages → Branch: main, Folder: / (root)
```

## Notas
- Todas las imágenes usan URLs del sitio original (reemplazar por optimizadas en producción)
- Formularios son front-end only — requieren integración con backend (Formspree, Netlify Forms, etc.)
- Schema JSON-LD incluido en index.html, services.html, contact.html
- Speculation Rules API para prefetch de navegación
