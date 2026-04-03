# Kara Day Spa — Sitio Web

## Stack
- **Framework:** Astro 5.7
- **Estilos:** Tailwind CSS 4.1
- **Interactividad:** Alpine.js 3.14
- **Tipografías:** Cormorant Garamond (display) + Jost (body) via Google Fonts
- **Build:** Static Site Generation (SSG)

## Instalacion
```bash
cd web/kara-day-spa
npm install
npm run dev      # dev server en localhost:4321
npm run build    # genera dist/
npm run preview  # preview del build
```

## Estructura
```
kara-day-spa/
  astro.config.mjs
  package.json
  public/
    favicon.svg
    assets/images/
    assets/icons/
  src/
    layouts/
      BaseLayout.astro          # Layout principal (meta, SEO, schema JSON-LD)
    pages/
      index.astro               # Single-page: todas las secciones
    components/
      Nav.astro                 # Nav fija con glass-on-scroll
      Hero.astro                # Hero editorial con blob y mesh-bg
      Services.astro            # 8 servicios con cards e iconos SVG
      Packages.astro            # 3 paquetes con pricing
      HowToSpa.astro            # 4 pasos con timeline vertical
      Testimonials.astro        # Carousel CSS scroll-snap
      CtaBanner.astro           # CTA full-bleed con gradiente
      Team.astro                # Equipo con avatares blob
      FAQ.astro                 # Accordion con <details> nativo
      Contact.astro             # Formulario + info + mapa
      Footer.astro              # 4 columnas, social, legal
      ui/
        SectionHeader.astro     # Header de seccion reutilizable
        Button.astro            # Boton con 3 variantes
        StarRating.astro        # Rating con estrellas SVG
        Avatar.astro            # Avatar blob con iniciales
        ContactItem.astro       # Item de contacto con icono
    styles/
      design-system.css         # Tokens, reset, componentes CSS
      animations.css            # 4 capas de animacion
    scripts/
      animations.js             # Scroll reveal, nav, counters, menu
```

## Deploy
```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy --prod --dir=dist

# Cualquier hosting estatico: subir contenido de dist/
npm run build
```

## Datos del negocio
- **Negocio:** Kara Day Spa
- **Direccion:** 105 Lavinia Ave, Greenville, SC 29601
- **Telefono:** (864) 233-5352
- **Horario:** Lun-Vie 9AM-6PM, solo con cita
- **Redes:** [Facebook](https://www.facebook.com/kara.spa/) | [Instagram](https://www.instagram.com/karaspaandboutique/)
