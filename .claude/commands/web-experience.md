# WEB — PASO 3.5: EXPERIENCIAS INTERACTIVAS

Eres un creative technologist que transforma sitios web en experiencias memorables.
Analizas el sector del negocio y aplicas interacciones avanzadas que un desarrollador promedio jamás implementaría.

**Input:** La carpeta del proyecto web ya en construcción + el JSON de auditoría disponible en contexto.

**Regla:** No decores — agrega experiencias que aporten valor real al usuario y refuercen el mensaje del negocio. Cada experiencia debe tener propósito, no ser un demo técnico.

---

## PASO 1 — Identificar el sector y seleccionar experiencias

Lee el JSON de auditoría (`sector`, `servicios`, `tipo_negocio`) y selecciona **3-5 experiencias** del catálogo según relevancia. No apliques todo — elige las que mejor encajan.

---

## CATÁLOGO POR SECTOR

### Restaurantes / Food / Cafeterías
| Experiencia | Descripción |
|---|---|
| **Menú interactivo filtrable** | Grid de platos con filtros animados por categoría (CSS `:has()` + transiciones FLIP). Al filtrar, los items se reposicionan con animación suave, no desaparecen bruscamente. |
| **Hover reveal en galería** | Imágenes de platos con overlay que revela nombre + precio con `clip-path` animado desde el centro. |
| **Horario dinámico** | Indicador "Abierto ahora" / "Cierra en X horas" calculado con JS nativo según horarios del JSON. Badge verde/rojo con pulse animation. |
| **Scroll gastronómico** | Sección horizontal scrollable de especialidades con snap points, cada item ocupa 80vw en mobile. |

### Servicios profesionales / Consultoría / Legal / Contabilidad
| Experiencia | Descripción |
|---|---|
| **Calculadora/Estimador interactivo** | Formulario de 3-4 pasos con sliders y opciones que calcula un estimado en tiempo real. Usa `<input type="range">` estilizado + output animado. Datos basados en servicios del JSON. |
| **Timeline de proceso inmersivo** | Los pasos del proceso se revelan conforme el usuario hace scroll, con una línea conectora que se dibuja progresivamente (SVG `stroke-dashoffset` animado con scroll-timeline). |
| **Tabs con transición de contenido** | Secciones de servicio que transicionan con slide horizontal, no con fade genérico. El indicador activo se mueve con spring animation. |
| **Estadísticas con contexto** | Contadores que al llegar al número revelan una frase de contexto con typewriter effect. Ej: "142+" → "clientes confían en nosotros". |

### Salud / Dental / Bienestar / Fitness
| Experiencia | Descripción |
|---|---|
| **Before/After slider** | Comparador de imágenes con handle draggable. `clip-path: inset()` controlado por pointer events. Sin librería. |
| **Quiz interactivo** | 3-4 preguntas con opciones visuales (cards seleccionables) que llevan a una recomendación de servicio personalizada. Transiciones entre preguntas con slide. |
| **Tour visual** | Galería de instalaciones con navegación por flechas, dots indicator, y transiciones crossfade. Touch/swipe en mobile con pointer events. |
| **Booking por pasos** | Stepper visual: seleccionar servicio → fecha → hora → confirmar. Cada paso con animación de entrada. Progress bar animada arriba. |

### Landscaping / Home Services / Construcción / Limpieza
| Experiencia | Descripción |
|---|---|
| **Before/After de proyectos** | Mismo slider draggable pero optimizado para fotos de exterior. Grid de proyectos donde cada uno abre el comparador en `<dialog>`. |
| **Selector de temporada** | 4 botones (Primavera/Verano/Otoño/Invierno) que al seleccionar cambian la paleta del hero + muestran servicios estacionales. Transición suave de colores con `color-mix()`. |
| **Galería masonry filtrable** | Grid con `columns` CSS que se filtra por categoría. Al filtrar, items salen con `scale(0.8) + opacity(0)` y entran con stagger. |
| **Estimador de área** | Slider que representa metros cuadrados, muestra precio estimado en tiempo real con animación de número. Incluye toggle para tipo de servicio. |

### Retail / E-commerce / Tiendas
| Experiencia | Descripción |
|---|---|
| **Product showcase** | Cards de producto que al hover muestran segunda imagen con crossfade, precio con spring animation al cambiar. |
| **Catálogo con FLIP transitions** | Al filtrar categorías, los productos se reposicionan con animación FLIP (First-Last-Invert-Play) calculada con JS. |
| **Quick view modal** | Click en producto abre `<dialog>` con imagen ampliada + detalles. La imagen hace `view-transition-name` desde el grid al modal. |
| **Carrito con feedback** | Al agregar producto, el botón hace morphing (texto cambia con transición), badge del carrito hace bounce. |

### Educación / Cursos / Academias
| Experiencia | Descripción |
|---|---|
| **Curriculum explorer** | Acordeón de módulos/temas donde al expandir se revelan los contenidos con stagger animation. Progreso visual de cada módulo. |
| **Contador de impacto** | Métricas (estudiantes, cursos, años) que animan en cascada cuando la sección entra en viewport, con suffix animado (+, %, años). |
| **Testimonial con video thumbnail** | Cards que al click hacen expand animation y cargan video embed. Thumbnail con play button animado (pulse + scale). |

---

## CATÁLOGO UNIVERSAL (aplicable a cualquier sector)

Selecciona **1-2 de estas** además de las sectoriales:

### Magnetic Button
Botón CTA principal que se "atrae" sutilmente hacia el cursor cuando está cerca (radio de 80px).
```js
function magneticButton(btn) {
  const bound = 80;
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    if (dist < bound) {
      const pull = 1 - dist / bound;
      btn.style.transform = `translate(${x * pull * 0.3}px, ${y * pull * 0.3}px)`;
    }
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 400ms cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => btn.style.transition = '', 400);
  });
}
// Solo en dispositivos con pointer fino
if (matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-magnetic]').forEach(magneticButton);
}
```

### Text Split Reveal
Títulos que se revelan palabra por palabra o letra por letra al entrar en viewport.
```js
function splitReveal(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) =>
    `<span class="word" style="--i:${i}"><span class="word-inner">${w}</span></span>`
  ).join(' ');
  el.setAttribute('data-animate', 'split');
}

document.querySelectorAll('[data-split]').forEach(splitReveal);
```
```css
.word { display: inline-block; overflow: hidden; }
.word-inner {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  transition-delay: calc(var(--i) * 0.04s);
}
[data-animate="split"].is-visible .word-inner {
  transform: translateY(0);
}
```

### Horizontal Scroll Section
Sección que convierte scroll vertical en desplazamiento horizontal — ideal para showcases, portfolios o timelines.
```css
.horizontal-section {
  overflow-x: hidden;
}
.horizontal-track {
  display: flex;
  gap: var(--space-6);
  width: max-content;
  animation: scroll-horizontal linear;
  animation-timeline: view();
  animation-range: entry 0% exit 100%;
}
@keyframes scroll-horizontal {
  from { transform: translateX(20%); }
  to   { transform: translateX(-20%); }
}
```
Fallback con JS para navegadores sin `animation-timeline`:
```js
if (!CSS.supports('animation-timeline', 'view()')) {
  const track = document.querySelector('.horizontal-track');
  const section = document.querySelector('.horizontal-section');
  if (track && section) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
    function onScroll() {
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / (rect.height - window.innerHeight);
      const clamp = Math.max(0, Math.min(1, progress));
      const maxShift = track.scrollWidth - section.clientWidth;
      track.style.transform = `translateX(${-clamp * maxShift}px)`;
    }
    observer.observe(section);
  }
}
```

### Parallax Multicapa
Fondo con 2-3 capas que se mueven a velocidades diferentes con scroll-driven CSS.
```css
.parallax-container { position: relative; overflow: hidden; min-height: 80vh; }
.parallax-layer {
  position: absolute; inset: -20% 0;
  animation: parallax-shift linear;
  animation-timeline: view();
}
.parallax-back  { animation-range: entry 0% exit 100%; }
.parallax-mid   { animation-range: entry 10% exit 90%; }
.parallax-front { animation-range: entry 20% exit 80%; }

@keyframes parallax-shift {
  from { transform: translateY(-10%); }
  to   { transform: translateY(10%); }
}
.parallax-back  { --speed: 15%; }
.parallax-mid   { --speed: 8%; }
```

### Morphing Divider
SVG decorativo entre secciones que se deforma suavemente con scroll.
```html
<svg class="section-divider" viewBox="0 0 1440 120" preserveAspectRatio="none">
  <path class="divider-path" d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="var(--color-surface)"/>
</svg>
```
```css
.section-divider {
  display: block; width: 100%; height: clamp(60px, 8vw, 120px);
  margin-block: calc(var(--space-2) * -1);
}
.divider-path {
  transition: d 0.8s cubic-bezier(0.16,1,0.3,1);
}
/* Variante: cambiar la forma cuando la siguiente sección es visible */
.next-section.is-visible ~ .section-divider .divider-path,
.section-divider.is-visible .divider-path {
  d: path("M0,30 C480,100 960,10 1440,80 L1440,120 L0,120 Z");
}
```

### Scroll Progress por Secciones
Indicador lateral o superior que muestra en qué sección está el usuario, con dot navigation.
```js
function sectionProgress() {
  const sections = document.querySelectorAll('section[id]');
  const dots = document.querySelector('.section-dots');
  if (!dots || !sections.length) return;

  dots.innerHTML = [...sections].map(s =>
    `<a href="#${s.id}" class="dot" data-section="${s.id}" aria-label="${s.dataset.label || s.id}"></a>`
  ).join('');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const dot = dots.querySelector(`[data-section="${e.target.id}"]`);
      if (dot) dot.classList.toggle('active', e.isIntersecting);
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}
sectionProgress();
```
```css
.section-dots {
  position: fixed; right: var(--space-4); top: 50%;
  transform: translateY(-50%); display: flex; flex-direction: column;
  gap: var(--space-3); z-index: 50;
}
.dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--color-text-muted); opacity: 0.4;
  transition: opacity 300ms ease, transform 300ms cubic-bezier(0.34,1.56,0.64,1),
              background 300ms ease;
}
.dot.active {
  opacity: 1; background: var(--color-primary);
  transform: scale(1.4);
}
/* Ocultar en mobile — ocupa espacio de touch */
@media (max-width: 768px) { .section-dots { display: none; } }
```

### Smooth Anchor Scroll con Highlight
Al navegar a una sección por anchor, la sección destino hace un flash sutil de highlight.
```css
:target {
  animation: target-highlight 1.5s ease;
}
@keyframes target-highlight {
  0%, 100% { box-shadow: inset 0 0 0 0 transparent; }
  30% { box-shadow: inset 0 0 0 4px oklch(from var(--color-primary) l c h / 0.15); }
}
```

### Cursor Trail (solo luxury/creative — pointer:fine)
Estela de partículas que sigue al cursor con delay decreciente.
```js
if (matchMedia('(pointer: fine)').matches) {
  const trail = Array.from({ length: 5 }, (_, i) => {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.setProperty('--delay', `${i * 60}ms`);
    document.body.appendChild(dot);
    return dot;
  });
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  function updateTrail() {
    trail.forEach((dot, i) => {
      const delay = (i + 1) * 0.12;
      const x = dot._x || mouseX;
      const y = dot._y || mouseY;
      dot._x = x + (mouseX - x) * (1 - delay);
      dot._y = y + (mouseY - y) * (1 - delay);
      dot.style.transform = `translate(${dot._x}px, ${dot._y}px)`;
    });
    requestAnimationFrame(updateTrail);
  }
  updateTrail();
}
```
```css
.trail-dot {
  position: fixed; top: -4px; left: -4px;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--color-primary); opacity: 0.3;
  pointer-events: none; z-index: 9999;
  transition: opacity 200ms;
}
.trail-dot:first-child { opacity: 0.6; width: 10px; height: 10px; }
```

---

## IMPLEMENTACIONES TÉCNICAS COMPARTIDAS

### FLIP Animation Helper (para filtros y reordenamiento)
```js
function flipAnimate(container, selector, applyChange) {
  const items = container.querySelectorAll(selector);
  // First: capturar posiciones iniciales
  const first = new Map();
  items.forEach(el => first.set(el, el.getBoundingClientRect()));

  // Aplicar el cambio (filtro, reorden, etc.)
  applyChange();

  // Last + Invert + Play
  const newItems = container.querySelectorAll(selector);
  newItems.forEach(el => {
    const prev = first.get(el);
    if (!prev) {
      // Elemento nuevo — entrar con fade
      el.style.opacity = '0';
      el.style.transform = 'scale(0.8)';
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = '';
      });
      return;
    }
    const last = el.getBoundingClientRect();
    const dx = prev.left - last.left;
    const dy = prev.top - last.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = 'none';
    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      el.style.transform = '';
    });
  });
}
```

### Before/After Slider (reutilizable)
```js
function beforeAfterSlider(container) {
  const handle = container.querySelector('.ba-handle');
  const overlay = container.querySelector('.ba-overlay');
  let dragging = false;

  function update(x) {
    const rect = container.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    overlay.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = `${pct}%`;
  }

  container.addEventListener('pointerdown', (e) => {
    dragging = true;
    container.setPointerCapture(e.pointerId);
    update(e.clientX);
  });
  container.addEventListener('pointermove', (e) => { if (dragging) update(e.clientX); });
  container.addEventListener('pointerup', () => { dragging = false; });

  // Accesibilidad: keyboard
  handle.setAttribute('role', 'slider');
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('aria-label', 'Comparar antes y después');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    const current = parseFloat(handle.style.left) || 50;
    if (e.key === 'ArrowLeft') update(rect.left + rect.width * (current - 5) / 100);
    if (e.key === 'ArrowRight') update(rect.left + rect.width * (current + 5) / 100);
  });
}
document.querySelectorAll('.before-after').forEach(beforeAfterSlider);
```
```css
.before-after {
  position: relative; overflow: hidden; cursor: ew-resize;
  border-radius: var(--radius-lg);
}
.ba-after, .ba-overlay { position: absolute; inset: 0; }
.ba-after img, .ba-overlay img { width: 100%; height: 100%; object-fit: cover; }
.ba-overlay { clip-path: inset(0 50% 0 0); }
.ba-handle {
  position: absolute; top: 0; bottom: 0; left: 50%;
  width: 3px; background: white;
  transform: translateX(-50%);
  z-index: 2;
}
.ba-handle::after {
  content: ''; position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 40px; height: 40px; border-radius: 50%;
  background: white; box-shadow: 0 2px 8px oklch(0 0 0 / 0.3);
  display: grid; place-items: center;
}
```

### Typewriter Effect (para estadísticas con contexto)
```js
function typewriter(el) {
  const text = el.dataset.text;
  if (!text) return;
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, 30 + Math.random() * 40);
    }
  }
  // Trigger con IntersectionObserver — el observer de scroll reveal lo activa
  return type;
}
```

---

## REGLAS DE IMPLEMENTACIÓN

1. **Máximo 3-5 experiencias por sitio** — calidad sobre cantidad
2. **Cada experiencia debe funcionar sin JavaScript** como fallback aceptable (contenido visible, solo pierde interactividad)
3. **`prefers-reduced-motion`** desactiva toda animación de movimiento, mantiene cambios de estado (color, opacity)
4. **Pointer events** para touch — no usar `mousedown`/`mousemove`, usar `pointerdown`/`pointermove`
5. **No agregar dependencias externas** — todo en CSS + JS vanilla (o Framer Motion si el stack es React)
6. **Accesibilidad:** sliders con `role="slider"`, controles con keyboard, aria-labels
7. **Performance:** usar `requestAnimationFrame` para animaciones JS, `will-change` solo donde hay animación activa, `passive: true` en scroll listeners
8. **Implementar directamente en los archivos del proyecto** — no crear archivos separados de "experiencias"

---

## OUTPUT

Integra las experiencias directamente en el código existente del proyecto. Al terminar, confirma:

```
Experiencias implementadas en [ruta]:

Sectoriales:
- [nombre] — [dónde se aplicó]
- [nombre] — [dónde se aplicó]

Universales:
- [nombre] — [dónde se aplicó]

Descartadas (y por qué):
- [nombre] — [razón: no encaja / ya existe algo similar / etc.]
```
