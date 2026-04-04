# Agencia — Pipeline de Auditoría y Desarrollo Web

## Pipeline
```
/prospeccion → /scraping → /auditoria → /web → /web-review → [/web-refine] → /deploy → /propuesta
```

## Comandos
| Comando | Input | Output |
|---|---|---|
| `/prospeccion <zona> [categoría]` | zona geográfica + categoría opcional | `prospeccion/outputs/<zona>-prospeccion.json` |
| `/scraping <url>` | URL del sitio | `scraping/outputs/<negocio>-scraping.json` |
| `/auditoria <ruta>` | ruta al scraping.json | `auditoria/outputs/<negocio>-auditoria.json` |
| `/web <ruta>` | ruta al auditoria.json | `web/<negocio>/` |
| `/web-review <carpeta>` | carpeta web | reporte de calidad + instrucciones para refine |
| `/deploy <ruta> <nombre>` | carpeta web + nombre | `deploy/outputs/<negocio>-deploy.json` |
| `/propuesta <ruta> [url]` | auditoria.json + url demo opcional | `propuesta/outputs/<negocio>-propuesta.html` |
| `/batch <urls>` | lista de URLs separadas por coma | tabla negocio → url deploy |

El agente `/web` se compone de sub-pasos invocables individualmente:
`/web-brief` → `/web-stack` → `/web-design` → `/web-animations` → `/web-experience` → `/web-pages` → `/web-seo` → `/web-components` → `/web-entregables`

Post-pipeline: `/web-refine <carpeta> [| instrucciones]` — revisa y pule el diseño, acepta indicaciones específicas
Post-pipeline: `/web-review <carpeta>` — senior lead revisa calidad vs scraping, genera instrucciones para refine

Batch: `/batch <url1>, <url2>, ...` — ejecuta el pipeline completo (scraping → auditoria → web → review → refine → deploy) para cada URL en paralelo, cada sitio como proceso aislado

## Convenciones
- Archivos: `<negocio>-<tipo>.json` en kebab-case
- Schema de scraping: `scraping/schema.json`
- Template de propuesta: `propuesta/template.html`
- Cero conversación en outputs — solo guardar archivo y confirmar ruta
- Nunca inventar datos ausentes en el JSON fuente — usar `null`
