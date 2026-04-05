# WEB — STEP 5: SEO & PERFORMANCE

Apply SEO optimizations, meta tags, schema markup, and performance to all pages.

---

## Meta tags on each page

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO -->
  <title>[Main Keyword] | [Business Name] — [City if applicable]</title>
  <meta name="description" content="[150-160 chars with keyword + value proposition + CTA]">
  <meta name="keywords" content="[from JSON meta.keywords]">
  <link rel="canonical" href="[Page URL]">

  <!-- Open Graph -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="[URL]">
  <meta property="og:title"       content="[title or variant]">
  <meta property="og:description" content="[meta description]">
  <meta property="og:image"       content="[absolute URL og-image 1200x630]">
  <meta property="og:site_name"   content="[Business]">

  <!-- Twitter/X -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="[title]">
  <meta name="twitter:description" content="[description]">
  <meta name="twitter:image"       content="[og-image]">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="[favicon from JSON or placeholder]">
</head>
```

---

## Schema Markup (JSON-LD)

Adapt `@type` according to sector:

| Sector | @type |
|---|---|
| Restaurant | `Restaurant` |
| E-commerce | `Store` |
| Health | `MedicalBusiness` |
| Education | `EducationalOrganization` |
| Generic | `LocalBusiness` |

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "[according to sector]",
  "name": "[business]",
  "description": "[meta.description]",
  "url": "[url]",
  "telephone": "[contact.phone]",
  "email": "[contact.email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[contact.address or null]"
  },
  "sameAs": ["[social networks from JSON]"]
}
</script>
```

---

## Performance

### Images
```html
<!-- All images -->
<img src="[url]" alt="[real description]" width="[real]" height="[real]" loading="lazy" decoding="async">

<!-- Hero only (above the fold) — no lazy, with fetchpriority -->
<img src="hero.jpg" alt="..." width="1200" height="600" decoding="async" fetchpriority="high">
```

### Fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Font+Name&display=swap');
/* font-display: swap ALWAYS included in the URL */
```

### Critical CSS
The CSS for hero, nav, and base typography goes inline in `<style>` in the `<head>`.
The rest in an external file with `<link rel="stylesheet">`.

### Preloading critical resources
```html
<!-- Preload display font (the most visually important one) -->
<link rel="preload" href="[font-url]" as="font" type="font/woff2" crossorigin>

<!-- Preload hero image -->
<link rel="preload" href="hero.jpg" as="image" fetchpriority="high">
```

### Speculation Rules API (smart prefetch)
```html
<!-- Prefetch probable pages — anticipatory navigation -->
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

### Content-visibility (lazy rendering of sections below the fold)
```css
.section:not(.hero) {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

### will-change (use sparingly)
```css
.hero-bg { will-change: transform; }
.card    { will-change: transform; }
/* Remove after animation if possible */
```

---

## SEO checklist before delivery

- [ ] Each page has a unique `<title>` and unique `<meta description>`
- [ ] Unique H1 per page with main keyword
- [ ] H2 and H3 in logical structure (no skipping levels)
- [ ] All images with descriptive `alt`
- [ ] Schema JSON-LD without syntax errors
- [ ] `<link rel="canonical">` on all pages
- [ ] Complete Open Graph for social sharing
- [ ] `fetchpriority="high"` on the LCP image (hero)
- [ ] Speculation rules for anticipatory navigation
- [ ] `content-visibility: auto` on sections below the fold
