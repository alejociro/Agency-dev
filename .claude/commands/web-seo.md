# WEB — PASO 5: SEO Y PERFORMANCE

Aplica optimizaciones de SEO, meta tags, schema markup y performance a todas las páginas.

---

## Meta tags en cada página

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO primario -->
  <title>[Keyword principal] | [Nombre del Negocio] — [Ciudad si aplica]</title>
  <meta name="description" content="[150-160 chars con keyword + propuesta de valor + CTA]">
  <meta name="keywords" content="[del JSON meta.keywords]">
  <link rel="canonical" href="[URL de la página]">

  <!-- Open Graph -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="[URL]">
  <meta property="og:title"       content="[title o variante]">
  <meta property="og:description" content="[meta description]">
  <meta property="og:image"       content="[URL absoluta og-image 1200x630]">
  <meta property="og:site_name"   content="[Negocio]">

  <!-- Twitter/X -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="[title]">
  <meta name="twitter:description" content="[description]">
  <meta name="twitter:image"       content="[og-image]">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="[favicon del JSON o placeholder]">
</head>
```

---

## Schema Markup (JSON-LD)

Adaptar `@type` según sector:

| Sector | @type |
|---|---|
| Restaurant | `Restaurant` |
| E-commerce | `Store` |
| Salud | `MedicalBusiness` |
| Educación | `EducationalOrganization` |
| Genérico | `LocalBusiness` |

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "[según sector]",
  "name": "[negocio]",
  "description": "[meta.description]",
  "url": "[url]",
  "telephone": "[contacto.telefono]",
  "email": "[contacto.email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[contacto.direccion o null]"
  },
  "sameAs": ["[redes del JSON]"]
}
</script>
```

---

## Performance

### Imágenes
```html
<!-- Todas las imágenes -->
<img src="[url]" alt="[descripción real]" width="[real]" height="[real]" loading="lazy" decoding="async">

<!-- Solo hero (above the fold) — sin lazy, con fetchpriority -->
<img src="hero.jpg" alt="..." width="1200" height="600" decoding="async" fetchpriority="high">
```

### Fuentes
```css
@import url('https://fonts.googleapis.com/css2?family=Font+Name&display=swap');
/* font-display: swap SIEMPRE incluido en la URL */
```

### CSS Crítico
El CSS de hero, nav y tipografía base va inline en `<style>` en el `<head>`.
El resto en archivo externo con `<link rel="stylesheet">`.

### Preloading de recursos críticos
```html
<!-- Preload de fuente display (la más importante visualmente) -->
<link rel="preload" href="[font-url]" as="font" type="font/woff2" crossorigin>

<!-- Preload de imagen hero -->
<link rel="preload" href="hero.jpg" as="image" fetchpriority="high">
```

### Speculation Rules API (prefetch inteligente)
```html
<!-- Prefetch de páginas probables — navegación anticipada -->
<script type="speculationrules">
{
  "prerender": [
    { "where": { "href_matches": "/services" } },
    { "where": { "href_matches": "/contact" } }
  ],
  "prefetch": [
    { "where": { "href_matches": "/about" } }
  ]
}
</script>
```

### Content-visibility (lazy rendering de secciones below the fold)
```css
.section:not(.hero) {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

### will-change (con moderación)
```css
.hero-bg { will-change: transform; }
.card    { will-change: transform; }
/* Quitar después de animación si es posible */
```

---

## Checklist SEO antes de entregar

- [ ] Cada página tiene `<title>` único y `<meta description>` único
- [ ] H1 único por página con keyword principal
- [ ] H2 y H3 en estructura lógica (sin saltarse niveles)
- [ ] Todas las imágenes con `alt` descriptivo
- [ ] Schema JSON-LD sin errores de sintaxis
- [ ] `<link rel="canonical">` en todas las páginas
- [ ] Open Graph completo para compartir en redes
- [ ] `fetchpriority="high"` en la imagen LCP (hero)
- [ ] Speculation rules para navegación anticipada
- [ ] `content-visibility: auto` en secciones below the fold
