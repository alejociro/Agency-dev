# Agencia — Pipeline de Auditoría y Desarrollo Web

Sistema de agentes especializados para analizar sitios web de clientes, generar propuestas
comerciales profesionales y construir sitios de nueva generación.

---

## Flujo del pipeline

```
/scraping → /auditoria → /web → [/deploy opcional] → /propuesta
```

Cada agente produce un output que alimenta al siguiente.

---

## Comandos (skills)

Todos los comandos se ejecutan desde cualquier directorio del proyecto.

### 1. Scraping
```
/scraping https://www.ejemplo.com
```
Extrae toda la información visual, textual y técnica del sitio.
**Output:** `scraping/outputs/<negocio>-scraping.json`

### 2. Auditoría
```
/auditoria scraping/outputs/<negocio>-scraping.json
```
Evalúa en 5 dimensiones (SEO, UX/UI, Marketing, Contenido, Técnico) con benchmarks por sector.
**Output:** `auditoria/outputs/<negocio>-auditoria.json`

### 3. Web
```
/web auditoria/outputs/<negocio>-auditoria.json
```
Construye un sitio web premium con diseño único. Se compone de sub-pasos:

| Sub-paso | Skill | Qué produce |
|---|---|---|
| Brief creativo | `/web-brief` | Dirección creativa documentada |
| Stack | `/web-stack` | Proyecto configurado |
| Design system | `/web-design` | Variables CSS, tipografía, color |
| Animaciones | `/web-animations` | Sistema de animaciones en 4 capas |
| Páginas | `/web-pages` | Todas las páginas con contenido |
| SEO | `/web-seo` | Meta tags, schema, performance |
| Componentes | `/web-components` | Componentes reutilizables (React/Astro) |
| Entregables | `/web-entregables` | Checklist de calidad |

El stack se determina automáticamente según la complejidad de la auditoría:

| Complejidad | Stack |
|---|---|
| baja | HTML + Tailwind CSS v4 + Alpine.js |
| media | Astro 5 + Tailwind CSS v4 |
| alta | Vite 6 + React 19 + Tailwind CSS v4 + Framer Motion |

**Output:** `web/<negocio>/`

### 4. Deploy *(opcional)*
```
/deploy web/<negocio> <negocio>
```
Publica en Vercel. Requiere `vercel` CLI instalado.
**Output:** `deploy/outputs/<negocio>-deploy.json`

### 5. Propuesta
```
/propuesta auditoria/outputs/<negocio>-auditoria.json
/propuesta auditoria/outputs/<negocio>-auditoria.json https://demo.vercel.app
```
Genera propuesta comercial HTML lista para PDF.
**Output:** `propuesta/outputs/<negocio>-propuesta.html`

---

## Estructura del proyecto

```
agencia/
  CLAUDE.md                    ← convenciones generales (ligero)
  .claude/
    commands/
      scraping.md              ← /scraping
      auditoria.md             ← /auditoria
      web.md                   ← /web (orquestador)
      web-brief.md             ← /web-brief
      web-stack.md             ← /web-stack
      web-design.md            ← /web-design
      web-animations.md        ← /web-animations
      web-pages.md             ← /web-pages
      web-seo.md               ← /web-seo
      web-components.md        ← /web-components
      web-entregables.md       ← /web-entregables
      deploy.md                ← /deploy
      propuesta.md             ← /propuesta
  scraping/
    schema.json                ← estructura del JSON de scraping
    outputs/
  auditoria/
    outputs/
  web/
    <negocio>/                 ← sitios generados
  propuesta/
    template.html              ← template de la propuesta
    outputs/
  deploy/
    outputs/
```

---

## Personalización de la propuesta

El HTML generado tiene 3 placeholders:

| Placeholder | Reemplazar con |
|---|---|
| `[PRECIO]` | Tu precio real |
| `[NOMBRE TU AGENCIA]` | Nombre de tu agencia |
| `[CONTACTO AGENCIA]` | Email, teléfono o enlace |

---

## Notas

- **Sitios SPA**: El scraping detecta automáticamente sitios con JS rendering y lo documenta.
- **Deploy opcional**: La propuesta funciona con o sin demo en vivo.
- **Skills modulares**: Cada skill se carga solo al invocarlo, optimizando el uso de tokens.
