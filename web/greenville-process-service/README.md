# Greenville Process Service — Sitio Web

## Stack
- HTML5 + CSS3 + JavaScript vanilla
- Tailwind CSS v4 (CDN)
- Alpine.js 3 (CDN) — formulario y menu mobile
- Google Fonts: Playfair Display + Source Sans 3
- Zero build step — abrir index.html en browser

## Instalacion
```bash
# No requiere instalacion. Abrir directamente:
open index.html

# O con servidor local:
npx serve .
# o
python -m http.server 8000
```

## Estructura
```
greenville-process-service/
  index.html              # Home (hero, stats, servicios, cobertura, testimonios, CTA)
  services.html           # Servicios (process serving, court filing, skip trace, FAQ)
  about.html              # About (historia Watson, valores, timeline, stats)
  contact.html            # Contacto (formulario, info, mapa)
  styles/
    design-system.css     # Variables CSS, reset, tipografia, animaciones, layers
    main.css              # Componentes: nav, botones, cards, badges, footer
  js/
    main.js               # Scroll nav, mobile menu, intersection observer, contadores
  assets/
    icons/
      favicon.svg         # Favicon SVG
    images/               # (placeholder para imagenes del negocio)
  README.md
```

## Design System
- **Paleta:** Navy #1B2A41 / Crema #F4EDE4 / Cobre #B87333 / Slate #475569 / Off-white #FAF8F5
- **Tipografia:** Playfair Display (display) + Source Sans 3 (body)
- **Tono:** Editorial sofisticado — gravitas legal

## SEO
- Meta tags + Open Graph + Twitter Cards en las 4 paginas
- Schema JSON-LD: LegalService (index), Service + FAQPage (services)
- Speculation Rules API para prefetch/prerender
- content-visibility: auto en secciones below the fold

## Deploy
```bash
# Netlify (drag & drop o CLI)
netlify deploy --dir=.

# Vercel
vercel --prod

# GitHub Pages
# Push a repo y activar Pages en Settings > Pages > main branch
```

## Contacto del negocio
- **Telefono:** 864-242-0712
- **Email:** greenvilleps@bellsouth.net
- **Direccion:** 25 Woods Lake Road, Suite 216, Greenville, SC 29607
- **Horario:** Lunes-Viernes 8:00 AM - 5:00 PM
