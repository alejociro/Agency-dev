# Handyman Greenville SC — Sitio Web

## Stack
- HTML5 vanilla + CSS3 moderno (nesting, @layer, oklch, container queries)
- Tailwind CSS v4 (CDN)
- Alpine.js 3.x (interactividad: menu mobile, FAQ accordion)
- Alpine.js Collapse plugin (animaciones de accordion)
- Google Fonts: Zilla Slab + Karla
- Zero build step — abrir index.html en navegador

## Estructura
```
handyman-greenville/
  index.html              # Pagina principal (9 secciones)
  about.html              # Historia, stats, valores
  services.html           # Detalle de 6 servicios + FAQ
  contact.html            # Info de contacto + formulario
  styles/
    design-system.css      # Tokens, variables, base, componentes core
    main.css               # Estilos de layout y secciones
  js/
    main.js                # Scroll observers, parallax, counters, slider
  assets/
    images/                # Hero, gallery, OG image (agregar)
    icons/
      favicon.svg          # Favicon SVG (wrench en copper)
```

## Instalacion
No requiere instalacion. Abrir `index.html` en cualquier navegador moderno.

Para servidor local:
```bash
npx serve .
```

## Deploy
### Netlify
1. Arrastrar carpeta `handyman-greenville/` a Netlify Drop
2. Configurar dominio personalizado

### Vercel
```bash
npx vercel --prod
```

### Cloudflare Pages
1. Conectar repositorio o subir carpeta
2. Build command: (ninguno)
3. Output directory: `/`

## Imagenes requeridas
Antes de publicar, agregar las siguientes imagenes en `assets/images/`:
- `hero-workshop.jpg` — Hero background (1920x1080 recomendado)
- `before-kitchen.jpg` — Before/after slider (800x500)
- `after-kitchen.jpg` — Before/after slider (800x500)
- `og-image.jpg` — Open Graph preview (1200x630)

## Notas tecnicas
- Mobile-first: media queries desde 360px
- `prefers-reduced-motion` respetado en CSS y JS
- Schema JSON-LD: HomeAndConstructionBusiness + ItemList
- Speculation Rules API para prefetch/prerender
- `content-visibility: auto` en secciones below the fold
- CSS @layer: base → components → utilities
