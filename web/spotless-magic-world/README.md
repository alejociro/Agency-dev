# Spotless Magic World — Sitio Web

## Stack
- HTML5 + CSS3 (nesting nativo, `@layer`, `container queries`)
- Tailwind CSS v4 (CDN)
- Alpine.js 3.x (CDN)
- Vanilla JavaScript (ES2022+)
- Google Fonts: Fraunces + Outfit

## Instalaci&oacute;n
```bash
# No requiere build — abrir directamente en navegador
# Opci&oacute;n 1: archivo local
open index.html

# Opci&oacute;n 2: servidor local (recomendado para evitar CORS)
npx serve .
# o
python -m http.server 8000
```

## Estructura
```
spotless-magic-world/
  index.html              &larr; P&aacute;gina principal (single-page)
  README.md
  styles/
    design-system.css     &larr; Variables, reset, tipograf&iacute;a, animaciones, utilidades
    main.css              &larr; Componentes: nav, hero, cards, form, footer
  js/
    main.js               &larr; Navegaci&oacute;n, scroll reveal, sparkles, counters, parallax
  assets/
    images/               &larr; Im&aacute;genes del sitio (agregar antes de deploy)
    icons/                &larr; &Iacute;conos custom (SVGs inline en HTML)
```

## Deploy
```bash
# Netlify (drag & drop o CLI)
netlify deploy --prod --dir .

# Vercel
vercel --prod

# GitHub Pages
# Pushear a rama main, activar Pages en Settings > Pages
```

## Notas
- Formulario de contacto usa placeholder de Formspree — reemplazar `your-form-id` en el action del form
- Im&aacute;genes OG (`og-image.jpg`) deben crearse en 1200x630px y subirse a `assets/images/`
- Google Analytics GA4 (G-XE42RLSBB3) del sitio original no est&aacute; incluido — agregar script si se desea mantener tracking
