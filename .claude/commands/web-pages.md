# WEB — PASO 4: PÁGINAS Y SECCIONES

Genera todas las páginas con la misma calidad de diseño.
Usa datos del JSON de auditoría para personalizar contenido.

---

## Página principal (index)

### HERO — Primera impresión = Todo
- 100vh desktop, 90svh mobile (usar `svh` para viewport real en móviles)
- Jerarquía: etiqueta pequeña → título enorme → subtítulo → CTA primario → prueba social
- Fondo según tono del brief (gradient mesh / imagen con overlay / geométrico / video muted)
- CTA primario imposible de ignorar — alto contraste, tamaño generoso, shimmer en hover
- CTA secundario opcional: ghost button o link con flecha
- Indicador de scroll animado
- Clases: `hero-tag`, `hero-title`, `hero-sub`, `hero-cta` (ver /web-animations)

```html
<section class="hero">
  <div class="container">
    <span class="hero-tag"><!-- etiqueta del sector --></span>
    <h1 class="hero-title"><!-- título poderoso --></h1>
    <p class="hero-sub"><!-- propuesta de valor --></p>
    <div class="hero-cta">
      <a href="#contacto" class="btn-primary"><!-- CTA --></a>
      <a href="#servicios" class="btn-ghost">Ver servicios →</a>
    </div>
    <div class="hero-proof"><!-- social proof --></div>
  </div>
  <div class="hero-bg"><!-- fondo visual --></div>
</section>
```

---

### SOCIAL PROOF BAR
- **Opción A:** Logos en scroll loop infinito (`logos-track`)
- **Opción B:** Métricas: "X+ clientes · X% satisfacción · X años"

---

### SERVICIOS / PROPUESTA DE VALOR
- Cards con SVG icons inline únicos — ni emojis ni Font Awesome
- Cada SVG simple, distintivo, relacionado al servicio
- Hover revela descripción o cambia estado visual
- Layout asimétrico: featured card destacada o grid con tamaños diferentes
- Usar CSS Subgrid para alinear contenido entre cards

---

### ¿POR QUÉ NOSOTROS? / DIFERENCIADORES
- Basado en `recomendaciones` del JSON (redactadas como fortalezas)
- 3 diferenciadores mínimo con dato o evidencia concreta
- Evitar bullets genéricos — usar timeline, tabs, o comparativa antes/después

---

### PROCESO / CÓMO FUNCIONA
- 3–5 pasos numerados con línea conectora animada
- Reduce fricción de compra explicando cómo es trabajar con el negocio

---

### TESTIMONIOS
- Carousel con CSS scroll snap (sin librerías)
- Cards: avatar (placeholder con iniciales + color), nombre, cargo, empresa
- Rating SVG inline
- Si el JSON tiene testimonios: úsalos. Si no: genera 3 creíbles del sector

```css
.testimonials-track {
  display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
  gap: var(--space-4); scrollbar-width: none;
}
.testimonials-track::-webkit-scrollbar { display: none; }
.testimonial-card { scroll-snap-align: start; flex: 0 0 clamp(280px, 80vw, 420px); }
```

---

### CTA INTERMEDIO (full-width)
- Fondo `--color-primary` o gradiente que contraste
- Mensaje de urgencia basado en problemas reales del JSON
- Botón contrastante (bg oscuro → botón claro y viceversa)
- 100% del ancho sin container

---

### CONTACTO
- Formulario: nombre, email, teléfono, servicio (select con opciones del JSON), mensaje
- Labels flotantes o inputs borde-bottom (no cajas genéricas)
- Datos de contacto con SVG icons inline
- Mapa embed si hay dirección en JSON
- WhatsApp si hay número en JSON
- Usar `<dialog>` nativo para confirmación de envío

```html
<div class="field">
  <input type="text" id="name" placeholder=" " required>
  <label for="name">Nombre completo</label>
</div>
```

```css
.field { position: relative; }
.field label {
  position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  transition: all 200ms ease; color: var(--color-text-muted); pointer-events: none;
}
.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  top: -10px; transform: none; font-size: 0.75rem; color: var(--color-primary);
}
```

---

### FOOTER
- Logo + tagline
- Navegación en 2–3 columnas
- SVG icons para redes sociales del JSON
- Input newsletter minimalista (visual)
- Copyright con año actual + links legales

---

## Páginas secundarias

Cada una con diseño propio coherente con la identidad del sitio.

### About
- Timeline visual de historia del negocio
- Grid del equipo con hover (o grid de valores si no hay equipo)
- Misión/visión en tipografía display grande
- Números animados (`animateCounter`)

### Services
- Hero de sección con título fuerte (no genérico "Servicios")
- Cada servicio: descripción, bullets de beneficios, CTA individual
- FAQ accordion con `<details>` nativo + animación CSS

```css
details {
  & summary { cursor: pointer; list-style: none; }
  & summary::marker { display: none; }
  &[open] .faq-content {
    animation: slideDown 0.3s ease;
  }
}
```

### Portfolio
- Grid masonry con CSS columns o filtrable por categoría (JS nativo)
- Hover: overlay con título + CTA
- Placeholders creíbles del sector si no hay datos

### Contact
- Layout dos columnas: info + formulario completo
- Mapa embed si hay dirección
- Horarios y tiempos de respuesta
- WhatsApp con SVG icon animado

---

## HTML semántico moderno

- Usar `<search>` para contenedores de búsqueda
- Usar `<dialog>` para modales (no divs con z-index)
- `popover` attribute para tooltips y dropdowns
- `<details>` para accordions
- Touch targets mínimo 44×44px en mobile
