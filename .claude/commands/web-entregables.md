# WEB — PASO 7: ENTREGABLES Y CHECKLIST DE CALIDAD

Verifica que todo cumple los estándares antes de confirmar entrega.

---

## Orden de entrega

1. **Brief creativo** — comentario documentado en archivo principal
2. **Estructura de carpetas** — árbol completo del proyecto
3. **design-system.css** — variables CSS y estilos base
4. **Componentes base** — Button, Card, SectionHeader (si aplica)
5. **Hero + Navbar + Social Proof Bar** — con animaciones de page load
6. **Secciones de contenido** — Servicios → Diferenciadores → Proceso → Testimonios
7. **CTA intermedio + Contacto + Footer**
8. **Páginas secundarias** — About, Services, Portfolio, Contact
9. **SEO** — meta tags + schema JSON-LD en todas las páginas
10. **README del proyecto**

---

## README del proyecto entregable

```markdown
# [Nombre Negocio] — Sitio Web

## Stack
[framework, dependencias, versiones]

## Instalación
[comandos exactos para correr en local]

## Estructura
[árbol de carpetas]

## Deploy
[instrucciones para Vercel/Netlify]
```

---

## Checklist de calidad (verificar TODO)

### Diseño
- [ ] El diseño es ÚNICO — no parece template de ThemeForest
- [ ] Tipografías con personalidad que complementan el sector
- [ ] Color primario del JSON domina sin aplastar
- [ ] Al menos UN elemento que rompe la grilla o sorprende
- [ ] Fondo NO es blanco puro (#fff) ni negro puro (#000)
- [ ] Sombras usan color del brand

### UX y Conversión
- [ ] CTA principal es lo primero que atrae en el Hero
- [ ] Prueba social visible (logos, testimonios, métricas)
- [ ] CTA intermedio antes del contacto
- [ ] Formulario accesible y usable en mobile

### Animaciones
- [ ] Animaciones fluidas y naturales
- [ ] `prefers-reduced-motion` respetado
- [ ] Ninguna animación bloquea acceso al contenido

### Responsive
- [ ] Mobile (360px) se ve TAN bien como desktop
- [ ] Hero usa `svh` en mobile (no se recorta contenido)
- [ ] Touch targets mínimo 44×44px en mobile
- [ ] Menú mobile funcional (hamburger o similar)

### Accesibilidad
- [ ] Todas las imágenes con `alt` descriptivo
- [ ] Contraste WCAG AA (mínimo 4.5:1) en todos los fondos
- [ ] Focus visible en elementos interactivos (`:focus-visible`)
- [ ] HTML semántico (no divs donde van buttons/links/nav)

### SEO y Performance
- [ ] `<title>` y `<meta description>` únicos por página
- [ ] H1 único por página
- [ ] Schema JSON-LD presente
- [ ] `loading="lazy"` en imágenes (excepto hero)
- [ ] `fetchpriority="high"` en imagen LCP
- [ ] `font-display: swap` en fuentes
- [ ] Speculation rules para prefetch
- [ ] `content-visibility: auto` en secciones below the fold

### Código
- [ ] Sin console.log en producción
- [ ] Sin código comentado innecesario
- [ ] Variables CSS usadas consistentemente
- [ ] JavaScript no bloquea render inicial
- [ ] CSS organizado con `@layer`
