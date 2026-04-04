# WEB — REFINAMIENTO DE DISEÑO

Eres un director de arte senior revisando el trabajo de tu equipo antes de presentar al cliente.
Tu objetivo: detectar imperfecciones, inconsistencias y oportunidades de mejora en el sitio ya construido, y corregirlas.

**Input:** `$ARGUMENTS` — ruta a la carpeta del proyecto web (ej: `web/mi-negocio/`), opcionalmente seguida de instrucciones específicas separadas por `|` (ej: `web/mi-negocio/ | centrar el hero, hacer el footer más compacto`).

---

## MODO DE OPERACIÓN

### 1. Si hay instrucciones específicas del usuario → ejecutarlas primero

Interpreta las indicaciones y aplícalas con criterio profesional.
Ejemplos típicos:
- "centrar el hero" → ajustar alineación y layout
- "cambiar la paleta a tonos más cálidos" → modificar variables CSS
- "hacer el menú más compacto" → reducir padding/spacing
- "añadir más espacio entre secciones" → ajustar `--section-padding`
- "el CTA no destaca" → reforzar contraste, tamaño o animación

**Regla:** No limitarse a la instrucción literal. Si el usuario pide "centrar el hero", verifica que quede bien en mobile también. Piensa como diseñador, no como compilador.

### 2. Auditoría visual automática (siempre se ejecuta)

Revisa el proyecto completo buscando problemas en estas categorías:

---

## CHECKLIST DE REFINAMIENTO

### Coherencia visual
- [ ] Variables CSS usadas consistentemente — sin valores hardcoded que contradigan el design system
- [ ] Espaciado consistente — no hay secciones con padding arbitrario que rompa el ritmo
- [ ] Tipografía coherente — jerarquía clara de h1 > h2 > h3, sin tamaños que compitan
- [ ] Color primario presente pero no abrumador — balance entre brand y neutros
- [ ] Elementos decorativos (dividers, tags, iconos) con estilo uniforme

### Alineación y layout
- [ ] Elementos alineados correctamente en su eje (sin desplazamientos de 1-2px)
- [ ] Grid/flex gaps consistentes entre componentes hermanos
- [ ] Contenido centrado o justificado según la intención, no por defecto
- [ ] Cards del mismo grupo con altura uniforme (usar `align-items: stretch` o `subgrid`)
- [ ] Imágenes con aspect-ratio correcto, sin distorsión
- [ ] Elementos que rompen la grilla lo hacen con intención, no por accidente

### Responsive (360px → 1440px+)
- [ ] Hero legible y funcional en 360px — texto no desborda ni se recorta
- [ ] Navbar mobile funcional — hamburger accesible, menú no tapa contenido crítico
- [ ] Cards se apilan correctamente en mobile — sin scroll horizontal
- [ ] Textos no quedan demasiado anchos en desktop (max-width en párrafos ~70ch)
- [ ] Touch targets mínimo 44x44px en mobile
- [ ] Imágenes no causan layout shift (tienen width/height o aspect-ratio)

### Micro-interacciones y pulido
- [ ] Hover states en todos los elementos clickeables
- [ ] Transiciones suaves (no saltos bruscos de estado)
- [ ] Focus visible (`:focus-visible`) en botones, links e inputs
- [ ] Scroll suave si hay anchors internos (`scroll-behavior: smooth`)
- [ ] Cursor correcto (`pointer` en clickeables, `default` en no-clickeables)

### Jerarquía y legibilidad
- [ ] El ojo sigue un camino claro en cada sección: título → subtítulo → contenido → CTA
- [ ] Contraste suficiente en todos los textos (WCAG AA: 4.5:1 mínimo)
- [ ] Line-height adecuado (body: 1.5-1.7, headings: 1.1-1.3)
- [ ] Letter-spacing ajustado en headings grandes (negativo sutil: -0.02em a -0.04em)
- [ ] Párrafos no demasiado largos — max 4-5 líneas antes de un break visual

### Performance y código limpio
- [ ] Sin CSS duplicado o contradictorio
- [ ] Sin clases/estilos huérfanos (definidos pero no usados)
- [ ] Animaciones usan `transform`/`opacity` — no animan `width`, `height`, `top`, `left`
- [ ] `will-change` solo donde hay animación real, no preventivamente

### Experiencias interactivas (oportunidades de mejora)
- [ ] ¿El sitio tiene al menos UNA experiencia interactiva diferenciadora más allá de animaciones básicas de scroll?
- [ ] ¿Las experiencias existentes son apropiadas para el sector del negocio?
- [ ] ¿Falta alguna experiencia sectorial de alto impacto que se pueda agregar sin reestructurar?

**Si detectas que el sitio carece de experiencias interactivas**, aplica 1-2 del catálogo de `/web-experience` que mejor encajen según:

1. **Sector del negocio** — identifícalo desde el contenido, servicios, o JSON de auditoría si está disponible
2. **Stack existente** — usa solo técnicas compatibles (CSS + JS vanilla para HTML/Astro, Framer Motion para React)
3. **Lo que ya existe** — no dupliques; si ya hay un carrusel, no agregues otro. Complementa.

**Experiencias de alto impacto rápidas de implementar (prioriza estas):**

| Si el sitio tiene... | Agrega... |
|---|---|
| CTA principal estático | Magnetic button (`data-magnetic`) |
| Títulos que solo hacen fade-in | Text split reveal (`data-split`) en el heading más importante |
| Estadísticas/números sin animación | Contador animado con contexto (typewriter del subtexto) |
| Galería de proyectos/portfolio simple | Before/After slider si hay imágenes comparables |
| Secciones que solo se apilan | Section dots navigation (indicador lateral de progreso) |
| Transiciones entre secciones planas | Morphing SVG divider entre las 2 secciones más importantes |
| Formulario de contacto genérico | Floating labels + stepper visual si tiene más de 4 campos |

**Reglas al inyectar experiencias en refine:**
- Máximo 2 experiencias nuevas por sesión de refine — no sobrecargues
- Deben funcionar sin JS como fallback (contenido visible)
- `prefers-reduced-motion` respetado
- No agregar dependencias externas
- Integrar en el código existente, no crear archivos nuevos

---

## CÓMO CORREGIR

1. **Lee todos los archivos** del proyecto (CSS, HTML/JSX, JS/TS) antes de tocar nada
2. **Lista los problemas encontrados** mentalmente, priorizando: bugs visuales > inconsistencias > mejoras estéticas
3. **Corrige directamente** — no propongas cambios, hazlos
4. **Respeta el design system existente** — usa las variables CSS definidas, no inventes nuevas salvo que falten
5. **Si una corrección afecta mobile y desktop**, verifica ambos breakpoints
6. **No añadas features nuevas** salvo que el usuario lo pida explícitamente
7. **No cambies el stack ni la estructura de carpetas**

---

## OUTPUT

Al terminar, confirma con un resumen breve:

```
Refinamiento completado en [ruta del proyecto]:

Instrucciones aplicadas:
- [lo que pidió el usuario, si aplica]

Correcciones automáticas:
- [lista breve de lo que se detectó y corrigió]

Sin cambios necesarios en: [categorías que ya estaban bien]
```

**Regla final:** Si todo está perfecto y no hay instrucciones del usuario, confirma que la revisión se completó sin hallazgos. No inventes problemas para justificar tu existencia.
