# Shine 4 Seasons Salon — Sitio Web

## Stack
- HTML5 semántico
- CSS (custom properties, nesting nativo, @layer, container queries)
- JavaScript vanilla (ES2023+)
- Tailwind CSS v4 (CDN)
- Google Fonts: Cormorant Garamond + Jost

## Instalación
```bash
# No requiere instalación — abrir directamente en navegador
# Opción 1: abrir index.html
open web/shine4seasons/index.html

# Opción 2: servidor local (recomendado para CORS con fuentes)
npx serve web/shine4seasons
# o
python -m http.server 8000 -d web/shine4seasons
```

## Estructura
```
shine4seasons/
├── index.html              # Home — hero 4 panels, servicios, galería, testimonios
├── about.html              # Historia, valores, números, gift certificates
├── services.html           # Catálogo completo, detalle nail care, FAQ
├── contact.html            # Formulario, info cards, mapa, redes sociales
├── styles/
│   ├── design-system.css   # Tokens, variables, base layer, utilities
│   └── main.css            # Componentes, animaciones (4 capas)
├── js/
│   └── main.js             # Scroll reveal, cursor, nav, counters
├── assets/
│   ├── images/             # (imágenes locales si se descargan)
│   └── icons/              # (SVG icons inline en HTML)
└── README.md
```

## Deploy
```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=.

# GitHub Pages
# Push a repo y activar Pages desde Settings
```

## Concepto de Diseño
- **Tono:** Luxury refinado
- **Concepto:** "Donde cada estación es tu mejor versión"
- **Paleta:** Verde salvia #7A8B6F + champagne dorado #C9A96E + crema #F5F0E8
- **Diferenciador:** Hero con 4 paneles estacionales expandibles
- **Tipografía:** Cormorant Garamond (display) + Jost (body)
