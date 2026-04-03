# Indigo Flow and Art — Sitio Web

## Stack
- HTML5 semantico
- CSS vanilla con custom properties, nesting nativo, `@layer`, container queries
- JavaScript vanilla (ES6+)
- Tailwind CSS v4 (CDN)
- Google Fonts: Fraunces (display) + Outfit (body)

## Instalacion
No requiere build. Abrir directamente en el navegador:
```bash
# Opcion 1: abrir archivo
open index.html

# Opcion 2: servidor local
npx serve .
# o
python -m http.server 8000
```

## Estructura
```
indigo-flow-and-art/
  index.html          # Home — hero split, dual blocks, testimonios, contacto
  pilates.html        # Classical Pilates — precios, horarios, FAQ, instructor
  art.html            # Fine Art — galeria lightbox, Julie Hughes, horarios
  about.html          # About — historia, co-owners, stats, ubicacion
  styles/
    design-system.css  # Variables CSS, reset, utilidades, brief creativo
    main.css           # Componentes + animaciones (4 capas)
  js/
    main.js            # Nav, scroll reveal, lightbox, counters, form
  assets/
    images/            # Imagenes locales (actualmente usa CDN de Squarespace)
    icons/             # Iconos SVG
  README.md
```

## Deploy
```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=.

# Cloudflare Pages
npx wrangler pages deploy .
```

Sitio estatico — cualquier hosting de archivos funciona. No requiere servidor ni build.

## Datos del negocio
- **Cliente:** Indigo Flow and Art
- **Sector:** Wellness / Arte (Pilates Clasico + Galeria)
- **Ubicacion:** 1272 Pendleton Street, Greenville SC 29611
- **Contacto Pilates:** Katie — (864) 884-5606
- **Contacto Galeria:** Julie — (864) 884-5607
- **Email:** hello.indigoflowandart@gmail.com
