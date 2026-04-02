# Downtown Dental, LLC — Sitio Web

## Stack
- HTML5 + CSS3 + JavaScript vanilla
- Tailwind CSS v4 (CDN)
- Google Fonts: Fraunces (display) + Outfit (body)
- Zero dependencias de servidor — sitio 100% estático

## Estructura
```
downtown-dental/
  index.html          # Homepage
  about.html          # About / Meet the Doctors
  services.html       # All dental services
  contact.html        # Contact + appointment form
  styles/
    design-system.css  # Variables, base layer, grain overlay
    main.css           # Components, layout, utilities
    animations.css     # 4-layer animation system
  js/
    main.js            # Scroll reveal, mobile nav, FAQ, counters
  assets/
    icons/
      favicon.svg      # SVG favicon
    images/             # (empty — uses remote images from original site)
```

## Instalaci&oacute;n local
Abrir `index.html` en cualquier navegador. No requiere build ni servidor.

Para servidor local (opcional):
```bash
npx serve .
```

## Deploy
Subir la carpeta completa a cualquier hosting est&aacute;tico:

**Netlify:** Drag & drop en app.netlify.com  
**Vercel:** `npx vercel --prod`  
**GitHub Pages:** Push a repo y activar en Settings > Pages
