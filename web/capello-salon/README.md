# Capello Salon and Suites — Sitio Web

## Stack
- HTML5 vanilla + CSS3 moderno (nesting, @layer, container queries)
- Tailwind CSS v4 (CDN)
- Alpine.js 3.x (interacciones ligeras)
- JavaScript vanilla (animaciones, Intersection Observer)
- Google Fonts: Fraunces + Jost

## Instalaci&oacute;n
No requiere build ni dependencias. Abrir directamente en el navegador:

```bash
# Opci&oacute;n 1: abrir directamente
open index.html

# Opci&oacute;n 2: servidor local (recomendado para evitar CORS)
npx serve .
# o
python -m http.server 8000
```

## Estructura
```
capello-salon/
  index.html              # P&aacute;gina principal (todas las secciones)
  styles/
    design-system.css      # Variables CSS, reset, tipograf&iacute;a, layout
    main.css               # Componentes, animaciones, utilidades
  js/
    main.js                # Scroll reveal, counters, nav, parallax
  assets/
    images/                # Im&aacute;genes del sitio
    icons/                 # &Iacute;conos SVG
  README.md
```

## Secciones incluidas
1. Hero con gradiente org&aacute;nico + orbs flotantes
2. Social Proof Bar (contadores animados)
3. Servicios (6 cards con SVG icons)
4. Scalp Lounge (diferenciador)
5. Proceso (4 pasos con l&iacute;nea conectora)
6. About / Historia
7. CTA intermedio full-width
8. Team (14 estilistas)
9. Birdie Boutique
10. Testimonios (scroll snap carousel)
11. FAQ (8 accordions nativos)
12. Contacto (2 locations + formulario + mapa)
13. Footer

## SEO
- Schema JSON-LD: HairSalon + FAQPage
- Meta tags: title, description, OG, Twitter Cards
- Geo tags para SEO local
- Speculation Rules API para prefetch

## Deploy
Compatible con cualquier hosting est&aacute;tico:

```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --dir=.

# GitHub Pages
# Subir el contenido de esta carpeta al repo
```

## Notas
- Todas las animaciones respetan `prefers-reduced-motion`
- Booking integrado con Vagaro (links externos)
- Im&aacute;genes placeholder donde no hab&iacute;a fotos disponibles en el scraping
- Email de contacto actualizado a `info@capello-salon.com` (el original era `facebook@capello-salon.com`)
