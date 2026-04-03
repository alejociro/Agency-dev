# Studio 17 Greenville — Sitio Web

Classical Pilates studio in Greenville, SC. Sitio web completo con 4 paginas, design system propio, y sistema de animaciones en 4 capas.

## Stack

- **HTML5** — semantic markup
- **Tailwind CSS v4** — via CDN
- **CSS Custom Properties** — design system completo en `design-system.css`
- **CSS Nesting + @layer** — cascade organizada (base, components, utilities)
- **Alpine.js 3.x** — interactividad ligera
- **Vanilla JS** — animaciones, scroll reveal, counters

## Estructura

```
studio17-greenville/
  index.html              # Home (hero, benefits, about, classes, process, testimonials, FAQ, CTA)
  classes.html             # Classes (private, group, equipment grid, schedule)
  about.html               # About BeLinda (story, values, timeline, stats)
  contact.html             # Contact (info + form, FAQ, success dialog)
  styles/
    design-system.css      # Variables CSS, reset, tipografia, animaciones, utilities
    main.css               # Componentes: nav, buttons, cards, footer, forms
    pages.css              # Layouts de paginas y secciones
  js/
    main.js                # Nav, scroll reveal, counters, FAQ, smooth scroll
  assets/
    icons/
      favicon.svg          # Favicon SVG "17"
    images/                # (placeholder — reemplazar con fotos reales del estudio)
```

## Instalacion local

No requiere build ni dependencias. Abrir directamente en el navegador:

```bash
# Opcion 1: abrir archivo
open index.html

# Opcion 2: servidor local (recomendado para speculation rules)
npx serve .
# o
python -m http.server 3000
```

## Deploy

### Vercel
```bash
# Desde la carpeta del proyecto
npx vercel --prod
```

### Netlify
1. Arrastrar carpeta `studio17-greenville/` al dashboard de Netlify
2. O conectar repo y configurar:
   - Build command: (ninguno)
   - Publish directory: `web/studio17-greenville`

### Cloudflare Pages
```bash
npx wrangler pages deploy . --project-name=studio17-greenville
```

## Notas

- Las imagenes usan Unsplash como placeholder. Reemplazar con fotos reales del estudio.
- El email de contacto fue corregido: `info@studio17greenville.com` (el original tenia doble @).
- JSON-LD schema markup en las 4 paginas (HealthAndBeautyBusiness, OfferCatalog, Person, ContactPage).
- Todas las animaciones respetan `prefers-reduced-motion`.
- Speculation Rules API para prefetch/prerender de navegacion probable.
