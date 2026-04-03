# Greenville Executive Limo Service — Sitio Web

## Stack
- **Framework:** Astro 5 (SSG)
- **Estilos:** Tailwind CSS v4 + CSS custom properties
- **Interactividad:** Alpine-style vanilla JS (IntersectionObserver, custom cursor, counters)
- **Fuentes:** Playfair Display + Jost (Google Fonts)
- **Animaciones:** CSS nativo (4 capas) + scroll-driven animations

## Instalacion
```bash
cd web/gvl-limo
npm install
npm run dev      # Dev server en localhost:4321
npm run build    # Build estatico en dist/
npm run preview  # Preview del build
```

## Estructura
```
gvl-limo/
  astro.config.mjs
  tailwind.config.mjs
  package.json
  README.md
  public/
    assets/
      icons/favicon.svg
      images/
  src/
    layouts/
      BaseLayout.astro        # Header, footer, SEO, grain, cursor
    pages/
      index.astro             # Home (hero, stats, services, fleet, why, process, testimonials, CTA, areas, contact)
      services.astro          # Fleet (7 vehiculos + downtown cart)
      experiences.astro       # Tours y experiencias con precios
      about.astro             # About, credentials, safety, GVL SAFE, FAQ
      contact.astro           # Formulario completo + info + mapa
    components/
      PageHero.astro          # Hero de paginas internas
      SectionHeader.astro     # Kicker + h2 + subtitle
      Button.astro            # primary / outline / ghost
      ServiceCard.astro       # Card con SVG icon
      TestimonialCard.astro   # Quote + author
      VehicleRow.astro        # Vehiculo con imagen + specs
      ContactInfo.astro       # Bloque de contacto reutilizable
      GoldSeam.astro          # Separador dorado (4 variantes)
      CtaBand.astro           # CTA full-width invertido
    styles/
      design-system.css       # Variables, base, componentes, utilities
      animations.css          # 4 capas de animacion
    scripts/
      animations.js           # Observer, counters, cursor, anchors
```

## Deploy
```bash
npm run build
# Subir contenido de dist/ a Netlify o Vercel
# O usar CLI:
npx netlify deploy --prod --dir=dist
# O:
npx vercel --prod
```

## Notas
- Todas las imagenes son URLs externas (wsimg.com) del sitio actual del cliente
- Para produccion, descargar imagenes, convertir a WebP/AVIF, y servir desde /public/assets/images/
- Formularios apuntan a `action="#"` — conectar con Formspree, Netlify Forms, o backend del cliente
- Custom cursor se desactiva automaticamente en dispositivos tactiles y con prefers-reduced-motion
