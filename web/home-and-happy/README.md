# Home & Happy — Sitio Web

## Stack
- HTML5 + CSS3 (nesting nativo, @layer, container queries)
- Tailwind CSS v4 (CDN)
- Alpine.js 3.x (interactividad ligera)
- JavaScript vanilla (animaciones, scroll reveal, counters)

## Instalaci&oacute;n
```bash
# No requiere build — abrir directamente en navegador
# Opci&oacute;n 1: Live Server (VS Code)
# Opci&oacute;n 2: cualquier servidor est&aacute;tico
npx serve .

# O simplemente abrir index.html en el navegador
```

## Estructura
```
home-and-happy/
  index.html              # P&aacute;gina principal (single-page)
  README.md
  styles/
    design-system.css     # Variables CSS, base, utilities
    main.css              # Componentes y animaciones
  js/
    main.js               # Alpine stores, scroll reveal, counters
  assets/
    images/               # Im&aacute;genes locales (si se descargan)
    icons/                # SVG icons (si se extraen)
```

## Caracter&iacute;sticas
- Design system completo con CSS custom properties
- Tipograf&iacute;a: Fraunces (display) + Outfit (body)
- Paleta: verde bosque + &aacute;mbar dorado + off-white c&aacute;lido
- Animaciones en 4 capas (page load, scroll reveal, micro-interactions, parallax)
- `prefers-reduced-motion` respetado
- Schema JSON-LD: HomeAndConstructionBusiness + FAQPage
- SEO: meta tags, Open Graph, Twitter Cards
- Mobile-first, responsive desde 360px
- Galer&iacute;a filtrable por categor&iacute;a
- FAQ accordion con Alpine.js
- Formulario de contacto con selecci&oacute;n de servicios

## Deploy
```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir .

# GitHub Pages
# Subir contenido de esta carpeta a la rama gh-pages
```

## Notas
- Las im&aacute;genes se cargan desde Squarespace CDN (URLs originales del cliente)
- Para producci&oacute;n, descargar im&aacute;genes y optimizar con WebP/AVIF
- Reemplazar URLs gen&eacute;ricas de redes sociales por perfiles reales del negocio
- A&ntilde;adir tel&eacute;fono y email reales cuando el cliente los proporcione
