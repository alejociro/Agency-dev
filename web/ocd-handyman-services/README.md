# OCD Handyman Services — Sitio Web

## Stack
- HTML5 + CSS3 (nesting nativo, @layer, container queries)
- Tailwind CSS v4 (CDN)
- JavaScript vanilla (ES2022+)
- Google Fonts: Space Grotesk + DM Sans

## Instalacion
Sitio estatico — no requiere build ni dependencias.

```bash
# Opcion 1: abrir directamente
open index.html

# Opcion 2: servidor local
npx serve .

# Opcion 3: Live Server en VS Code
```

## Estructura
```
ocd-handyman-services/
  index.html          # Home (hero, services, why us, process, testimonials, gallery, contact)
  services.html       # Servicios detallados + FAQ
  about.html          # Historia, timeline, valores, stats
  contact.html        # Formulario completo + mapa + info
  styles/
    design-system.css  # Variables, reset, animaciones, reduced-motion
    main.css           # Componentes (nav, hero, cards, footer, splits, gallery, forms)
  js/
    main.js            # Nav scroll, mobile menu, scroll reveal, counter animation
  assets/
    images/            # Placeholder para imagenes locales
    icons/             # Placeholder para iconos locales
```

## Paginas
| Pagina | Ruta | Contenido |
|---|---|---|
| Home | index.html | Hero, servicios, diferenciadores, proceso, testimonios, galeria, contacto |
| Services | services.html | Servicios detallados, grid completo, FAQ (6 preguntas) |
| About | about.html | Historia, timeline (2018-hoy), stats animados, valores |
| Contact | contact.html | Formulario, telefono, direccion, mapa, horarios |

## Deploy
```bash
# Netlify
netlify deploy --prod --dir=.

# Vercel
vercel --prod

# GitHub Pages
# Push to repo, enable Pages in Settings > source: root
```

## Notas
- Imagenes usan Unsplash como placeholder — reemplazar por fotos reales del negocio
- Formulario apunta a Formspree (placeholder) — configurar endpoint real
- Mapa de Google embebido con coordenadas aproximadas — verificar ubicacion exacta
