# Rudy's Rug Cleaning — Sitio Web

## Stack
- HTML5 + CSS3 (vanilla, sin bundler)
- Tailwind CSS v4 (CDN) — utilidades opcionales
- Alpine.js 3.x (CDN) — interactividad ligera
- CSS Custom Properties + @layer (base, components, utilities)
- Google Fonts: Libre Baskerville + Karla

## Instalaci&oacute;n
```bash
# No requiere instalaci&oacute;n. Abrir directamente en el navegador:
# Opci&oacute;n 1: Doble click en index.html
# Opci&oacute;n 2: Servidor local
npx serve .
# o
python -m http.server 8000
```

## Estructura
```
rudys-rug-cleaning/
  index.html              # Homepage (hero, services, process, testimonials, FAQ, quote form)
  contact.html            # P&aacute;gina de contacto (formulario, mapa, horarios)
  styles/
    design-system.css     # Tokens, paleta, tipograf&iacute;a, componentes, layout
    animations.css        # 4 capas de animaci&oacute;n (load, scroll, micro, especiales)
    main.css              # Entry point (importa design-system + animations)
  js/
    main.js               # Scroll reveals, counters, nav, FAQ accordion, mobile menu
  assets/
    images/               # Im&aacute;genes locales (actualmente usa CDN de Squarespace)
    icons/                # SVG icons (actualmente inline)
```

## Deploy
```bash
# Netlify
# 1. Arrastra la carpeta rudys-rug-cleaning/ a app.netlify.com/drop
# 2. O conecta el repo y configura:
#    - Build command: (vac&iacute;o)
#    - Publish directory: web/rudys-rug-cleaning

# Vercel
vercel --prod
# Publish directory: web/rudys-rug-cleaning

# GitHub Pages
# Configura Settings > Pages > Source: carpeta web/rudys-rug-cleaning
```

## Notas
- Formularios apuntan a Formspree (reemplazar `your-form-id` con ID real)
- Im&aacute;genes actualmente servidas desde Squarespace CDN del sitio original
- Para producci&oacute;n: descargar im&aacute;genes, convertir a WebP, servir localmente
