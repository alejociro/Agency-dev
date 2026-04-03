# Cutting Edge Mowing and Washing — Sitio Web

## Stack
- HTML5 + CSS3 (nesting nativo, oklch, container queries, @layer)
- Tailwind CSS v4 (CDN)
- JavaScript vanilla (IntersectionObserver, scroll-driven animations)
- Google Fonts: Fraunces (display) + Outfit (body)

## Instalaci&oacute;n
```bash
# No requiere instalaci&oacute;n — abrir directamente en el navegador
open index.html

# O servir con cualquier servidor est&aacute;tico
npx serve .
python -m http.server 3000
```

## Estructura
```
cutting-edge-greenville/
  index.html              # P&aacute;gina principal (single-page)
  styles/
    design-system.css     # Variables CSS, paleta oklch, tipograf&iacute;a, componentes base
    main.css              # Estilos de secciones + sistema de animaciones 4 capas
  js/
    main.js               # Scroll reveal, counters, nav, FAQ, form dialog
  assets/
    images/               # Im&aacute;genes locales (si se descargan)
    icons/                # Iconos SVG (si se extraen)
```

## Deploy
```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=.

# GitHub Pages
# Subir contenido de la carpeta al branch gh-pages
```

## Notas
- Las im&aacute;genes apuntan al servidor original del cliente (WordPress)
- Para producci&oacute;n: descargar im&aacute;genes, convertir a WebP, y servir localmente
- El formulario de contacto usa un placeholder de Formspree — configurar endpoint real antes de deploy
- Reemplazar `action="https://formspree.io/f/placeholder"` con el endpoint real
