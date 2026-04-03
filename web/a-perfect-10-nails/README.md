# A Perfect 10 Nails — Sitio Web

## Stack
- HTML5 semantico
- CSS3 con custom properties, nesting nativo, `@layer`, `oklch()`, `color-mix()`, container queries
- JavaScript vanilla (Intersection Observer, custom cursor, lightbox)
- Tailwind CSS v4 (CDN)
- Alpine.js 3.x (CDN) — FAQ accordion, mobile menu
- Google Fonts: Cormorant Garamond + Jost

## Instalacion
No requiere build. Abrir `index.html` en el navegador o servir con cualquier servidor estatico:

```bash
# Con Python
python -m http.server 8000

# Con Node
npx serve .

# Con VS Code
# Instalar extension "Live Server" y click derecho > Open with Live Server
```

## Estructura
```
a-perfect-10-nails/
  index.html              <- Pagina principal (single page)
  README.md               <- Este archivo
  styles/
    design-system.css     <- Variables CSS, reset, tipografia, grain overlay
    main.css              <- Componentes: nav, hero, hygiene, services, gallery, about, contact, footer
  js/
    main.js               <- Scroll reveal, custom cursor, lightbox, nav scroll
  assets/
    images/               <- Imagenes del negocio (placeholder)
    icons/                <- Iconos adicionales
```

## Deploy
Subir la carpeta completa a cualquier hosting estatico:

### Vercel
```bash
npx vercel --prod
```

### Netlify
Arrastrar la carpeta al dashboard de Netlify o:
```bash
npx netlify deploy --prod --dir .
```

### GitHub Pages
Push a un repo y activar Pages desde Settings > Pages > Source: main branch.

## SEO
- Schema.org JSON-LD: NailSalon + LocalBusiness + FAQPage
- Open Graph y Twitter Cards completos
- Meta tags optimizados para busquedas locales "nail salon greenville sc"
