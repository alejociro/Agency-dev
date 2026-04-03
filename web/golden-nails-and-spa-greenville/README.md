# Golden Nails & Spa — Sitio Web

## Stack
- HTML5 semántico
- CSS3 con custom properties, nesting nativo, `@layer`, container queries
- Alpine.js 3.x (interactividad: nav, lightbox, FAQ, formulario)
- Google Fonts: Cormorant Garamond + Jost

## Instalación
```bash
# No requiere build — abrir directamente en navegador
# Opción 1: Live Server (VS Code)
# Opción 2: cualquier servidor estático
npx serve .
```

## Estructura
```
golden-nails-and-spa-greenville/
├── index.html              # Página principal (single-page)
├── styles/
│   ├── design-system.css   # Variables, reset, animaciones, utilities
│   └── main.css            # Componentes: nav, hero, services, gallery, etc.
├── js/
│   └── main.js             # Alpine.js components + scroll animations + cursor
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## Secciones
1. Hero con parallax + grain overlay
2. Social proof bar (counters animados)
3. About (comillas doradas oversized)
4. Services (6 categorías con precios reales)
5. Kids' Services (diferenciador competitivo)
6. Process (3 pasos)
7. Gallery (8 imágenes + lightbox con keyboard nav)
8. Testimonials (fondo oscuro + estrellas doradas)
9. CTA Banner (full-width)
10. FAQ (6 preguntas, accordion)
11. Contact (formulario + info + mapa)
12. Footer

## Deploy
```bash
# Netlify
netlify deploy --prod --dir=.

# Vercel
vercel --prod

# GitHub Pages
# Push a rama main, activar Pages en Settings
```

## SEO
- Schema JSON-LD: `NailSalon` con servicios, horarios, dirección
- Open Graph + Twitter Cards
- Meta description optimizada
- H1 con keyword principal
- Alt text en todas las imágenes
