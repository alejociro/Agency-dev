# Greenville Landscaping Near Me — Sitio Web

## Stack
- **Framework:** Astro 5 (SSG)
- **Estilos:** Tailwind CSS v4 + CSS custom properties
- **Interactividad:** Alpine.js + vanilla JS
- **Tipografía:** Fraunces (display) + Outfit (body) via Google Fonts
- **Animaciones:** CSS nativo + Intersection Observer + scroll-driven animations

## Instalación

```bash
npm install
npm run dev      # dev server en localhost:4321
npm run build    # genera dist/
npm run preview  # preview del build
```

## Estructura

```
greenville-landscaping-near-me/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   └── assets/images/, icons/
└── src/
    ├── layouts/
    │   └── BaseLayout.astro       # Layout base con SEO, schema, animations
    ├── components/
    │   ├── Nav.astro              # Navegación + mobile menu
    │   ├── Footer.astro           # Footer con 4 columnas + service area
    │   ├── Button.astro           # primary, secondary, accent, ghost
    │   ├── SectionHeader.astro    # tag + title + subtitle
    │   ├── ServiceCard.astro      # Card de servicio con SVG icon
    │   ├── TestimonialCard.astro  # Card testimonial con avatar
    │   ├── StatCounter.astro      # Número animado con counter
    │   ├── ContactInfo.astro      # Bloque de info de contacto
    │   └── FAQItem.astro          # Accordion con <details>
    ├── pages/
    │   ├── index.astro            # Home — hero, stats, services, why us, process, testimonials, FAQ, contact
    │   ├── services.astro         # Servicios detallados + packages
    │   ├── about.astro            # Historia, valores, timeline, mission
    │   └── contact.astro          # Formulario completo + info
    └── styles/
        ├── design-system.css      # Design tokens, base, components, utilities
        └── animations.css         # 4 capas de animaciones
```

## Deploy

### Netlify
```bash
npm run build
# Publish directory: dist/
```

### Vercel
```bash
npx vercel --prod
# Framework preset: Astro
```

## Características
- Mobile-first responsive (360px+)
- prefers-reduced-motion respetado
- Schema JSON-LD (HomeAndConstructionBusiness + Service)
- Open Graph + Twitter Cards
- Speculation Rules API (prefetch/prerender)
- content-visibility para lazy rendering
- CSS @layer cascade control
- View Transitions API para navegación
- Scroll-driven reading progress bar
- Counter animation en stats
- Grain texture overlay
- Organic clip-path section dividers
