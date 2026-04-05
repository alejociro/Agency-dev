# Agencia — Audit & Web Development Pipeline

## Pipeline
```
/prospeccion → /scraping → /auditoria → /web → /web-review → [/web-refine] → /deploy → /propuesta
```

## Commands
| Command | Input | Output |
|---|---|---|
| `/prospeccion <zone> [category]` | geographic zone + optional category | `prospeccion/outputs/<zone>-prospeccion.json` |
| `/scraping <url>` | site URL | `scraping/outputs/<business>-scraping.json` |
| `/auditoria <path>` | path to scraping.json | `auditoria/outputs/<business>-auditoria.json` |
| `/web <path>` | path to auditoria.json | `web/<business>/` |
| `/web-review <folder>` | web folder | quality report + instructions for refine |
| `/deploy <path> <name>` | web folder + name | `deploy/outputs/<business>-deploy.json` |
| `/propuesta <path> [url]` | auditoria.json + optional demo url | `propuesta/outputs/<business>-propuesta.html` |
| `/batch <urls>` | comma-separated URL list | business → deploy url table |
| `/batch-refine <folders>` | web folder list (with optional `\| instructions` per project) | business → quality + refinement table |

The `/web` agent is composed of individually invocable sub-steps:
`/web-brief` → `/web-stack` → `/web-design` → `/web-animations` → `/web-experience` → `/web-pages` → `/web-seo` → `/web-components` → `/web-entregables`

Post-pipeline: `/web-refine <folder> [| instructions]` — reviews and polishes the design, accepts specific instructions
Post-pipeline: `/web-review <folder>` — senior lead reviews quality vs scraping, generates instructions for refine

Batch: `/batch <url1>, <url2>, ...` — runs the full pipeline (scraping → auditoria → web → review → refine → deploy) for each URL in parallel, each site as an isolated process
Batch-Refine: `/batch-refine web/business-1/ | fix header, web/business-2/, web/business-3/ | fix form` — runs review + refine + deploy for each web folder in parallel, accepts per-project specific instructions with `|`

## Conventions
- Files: `<business>-<type>.json` in kebab-case
- Scraping schema: `scraping/schema.json`
- Proposal template: `propuesta/template.html`
- Zero conversation in outputs — only save the file and confirm the path
- Never invent data missing from the source JSON — use `null`
