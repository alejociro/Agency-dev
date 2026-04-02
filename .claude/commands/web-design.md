# WEB — PASO 2: SISTEMA DE DISEÑO VISUAL

Genera el design system completo basado en el brief creativo y los datos del JSON.

---

## 2.1 Tipografía (define el carácter del sitio)

Usa Google Fonts o @font-face. **Nunca** Inter, Roboto, Arial, Helvetica ni Open Sans como display.

Reglas de pairing:
- Una fuente display con personalidad fuerte (serif, condensada, experimental)
- Una fuente body legible y complementaria
- Máximo 2 familias en el proyecto

```css
@import url('https://fonts.googleapis.com/css2?family=[Display]:wght@400;600;700&family=[Body]:wght@300;400;500&display=swap');

:root {
  --font-display: '[Display Font]', serif;
  --font-body:    '[Body Font]', sans-serif;
}

h1, h2, h3, .hero-title { font-family: var(--font-display); }
body, p, .btn            { font-family: var(--font-body); }
```

---

## 2.2 Color y Atmósfera

Nunca blanco puro (#fff) ni negro puro (#000) para fondos o texto principal.

| Elemento | Recomendación |
|---|---|
| Fondo principal | #fafaf8 (warm) / #f5f7fa (cool) / #0f0f0f (dark) |
| Superficie (card) | 4-6% más oscuro/claro que fondo |
| Texto principal | #1a1a1a o #f0efe9 según tema |
| Texto secundario | 60% opacidad del principal |

### Variantes de color con funciones CSS modernas:
```css
:root {
  --color-primary:       [hex del JSON];
  --color-primary-dark:  color-mix(in oklch, var(--color-primary) 80%, black);
  --color-primary-light: color-mix(in oklch, var(--color-primary) 40%, white);
  --color-primary-glow:  oklch(from var(--color-primary) l c h / 0.25);
}
```

### Efectos de profundidad (elegir 1-2 según tono):

**Grain overlay** (premium, subtle):
```css
.grain::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 100;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

**Gradient mesh** (moderno, vibrante):
```css
.mesh-bg {
  background:
    radial-gradient(ellipse at 20% 50%, var(--color-primary-glow) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, var(--color-secondary-glow) 0%, transparent 50%),
    var(--color-bg);
}
```

**Glassmorphism** (tech, futurista):
```css
.glass {
  background: oklch(from var(--color-bg) l c h / 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid oklch(from var(--color-bg) l c h / 0.12);
}
```

---

## 2.3 Espaciado y Layout

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.section {
  padding-block: var(--section-padding);
}
```

### Romper la grilla en al menos 2 secciones:
- Elemento que desborda su contenedor (imagen edge-to-edge en desktop)
- Texto en diagonal con `clip-path` o `transform: rotate(-2deg)`
- Card asimétrica con `position: absolute` superpuesta sobre la siguiente sección
- CSS Grid asimétrico (`2fr 1fr` o `3fr 2fr`)
- CSS Subgrid para alinear contenido entre cards hermanas

---

## 2.4 Sombras con personalidad

```css
:root {
  --shadow-card:  0 4px 24px -4px var(--color-primary-glow),
                  0 1px 4px oklch(0 0 0 / 0.06);
  --shadow-hover: 0 16px 48px -8px var(--color-primary-glow),
                  0 4px 12px oklch(0 0 0 / 0.08);
  --shadow-btn:   0 4px 16px var(--color-primary-glow);
}
```

---

## 2.5 Separadores y detalles decorativos

```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  border: none;
}

.section-tag::before {
  content: '—';
  color: var(--color-accent);
  margin-right: 0.5rem;
}
```

---

## 2.6 Técnicas CSS modernas a usar

- **CSS Nesting nativo:** agrupar estilos relacionados sin preprocesador
- **Container Queries:** `@container` para componentes adaptables al contenedor
- **`:has()` selector:** estilizar padres basado en hijos (ej: `.card:has(img)`)
- **`oklch()`:** variantes de color perceptualmente uniformes
- **CSS Subgrid:** alinear contenido internamente entre grid siblings
- **`@layer`:** base, components, utilities — para controlar la cascada
- **`light-dark()`:** si el diseño soporta temas claro/oscuro
- **Logical properties:** usar `margin-inline`, `padding-block`, `inset` en vez de `margin-left/right`
