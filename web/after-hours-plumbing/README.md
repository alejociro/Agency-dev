# After Hours Plumbing — Sitio Web

## Stack
- HTML5 semántico
- CSS con `@layer`, nesting nativo, custom properties, `color-mix(in oklch)`
- Tailwind CSS v4 (CDN)
- Alpine.js 3.x (interactividad: menú, FAQ accordion, formulario)
- JavaScript vanilla (IntersectionObserver, scroll animations, counters)

## Instalación
```bash
# No requiere build — abrir directamente en navegador
open index.html

# O servir con cualquier servidor local
npx serve .
python -m http.server 8000
```

## Estructura
```
after-hours-plumbing/
├── index.html              # Página principal (single page)
├── README.md               # Este archivo
├── styles/
│   ├── design-system.css   # Variables, reset, base, utilities
│   └── main.css            # Componentes y secciones
├── js/
│   └── main.js             # Alpine.js + animaciones + counters
└── assets/
    ├── images/             # Imágenes del sitio
    └── icons/              # SVG icons
```

## Secciones
1. Hero — "The Light That's Always On" con resplandor radial dorado
2. Stats Bar — Counters animados (30+ años, 24/7, 5000+ jobs)
3. Plumbing Services — 6 cards con SVG icons
4. Electrical Services — 3 cards, sección dawn transition
5. How It Works — 4 pasos con línea conectora
6. About — Grid asimétrico 3fr/2fr con imagen
7. Testimonials — Carousel scroll-snap horizontal
8. FAQ — Accordion con Alpine.js
9. CTA Banner — Mesh background + glow pulse en teléfono
10. Contact — Formulario + info + Google Maps
11. Footer — 3 columnas

## Design System
- **Tipografía:** Syne (display) + DM Sans (body)
- **Paleta:** Navy #0f2337 · Gold #c8a96e · Copper #b87333 · Off-white #f5f0eb
- **Concepto:** "The light that's always on" — fondos nocturnos + destellos dorados

## Deploy
```bash
# Netlify (drag & drop o CLI)
netlify deploy --dir=.

# Vercel
vercel --prod

# GitHub Pages
# Push a repo, activar Pages desde Settings > main branch
```
