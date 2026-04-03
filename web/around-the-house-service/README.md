# Around The House Service — Sitio Web

## Stack
- HTML5 + CSS3 + JavaScript vanilla
- Google Fonts (Bitter + Karla)
- CSS Custom Properties, Nesting, @layer, Container Queries
- No build tools required

## Instalacion
```bash
# Opcion 1: abrir directamente
open index.html

# Opcion 2: servidor local
npx serve .

# Opcion 3: Live Server (VS Code)
# Click derecho en index.html → Open with Live Server
```

## Estructura
```
around-the-house-service/
  index.html            Landing principal
  services.html         Detalle de servicios
  about.html            Historia, valores, area de servicio
  contact.html          Formulario + info de contacto + mapa
  styles/
    design-system.css   Variables CSS, reset, tipografia, base
    main.css            Componentes (nav, cards, stamps, forms, footer)
    animations.css      4 capas de animacion (load, scroll, micro, especiales)
  js/
    main.js             Nav, scroll, FAQ accordion, counters, form
  assets/
    icons/
      favicon.svg       Favicon SVG (casa navy + ambar)
    images/             Placeholder para imagenes del negocio
```

## Deploy
```bash
# Netlify (drag & drop o CLI)
netlify deploy --prod --dir=.

# Vercel
vercel --prod

# GitHub Pages
# Push to repo → Settings → Pages → Source: main branch
```

## Notas
- Dominio recomendado: aroundthehouseservicesc.com
- Reemplazar formulario simulado con endpoint real (Formspree, Netlify Forms, etc.)
- Agregar imagenes reales del negocio en assets/images/
- Google Analytics: agregar tag en <head> de cada pagina
