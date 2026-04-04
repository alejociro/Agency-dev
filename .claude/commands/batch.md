# AGENTE BATCH — PIPELINE PARALELO MULTI-SITIO

Recibes una lista de URLs de negocios y ejecutas el pipeline completo para cada uno,
en paralelo, como procesos completamente independientes.

**Input:** `$ARGUMENTS` — lista de URLs separadas por comas o saltos de línea

Ejemplo:
```
/batch https://sitio1.com, https://sitio2.com, https://sitio3.com
```

---

## FLUJO POR CADA URL

Cada URL pasa por este pipeline completo, en orden:

```
/scraping <url>
    ↓
/auditoria scraping/outputs/<negocio>-scraping.json
    ↓
/web auditoria/outputs/<negocio>-auditoria.json
    ↓
/web-review web/<negocio>/
    ↓
(si review ≠ A) /web-refine web/<negocio>/ | <instrucciones del review>
    ↓
/deploy web/<negocio>/ <negocio>
```

---

## EJECUCIÓN PARALELA

**CRÍTICO: Cada sitio DEBE ejecutarse como un agente independiente usando la herramienta Agent.**

Para cada URL en la lista:

1. **Parsea las URLs** — separa por comas, espacios, o saltos de línea. Limpia espacios.
2. **Lanza un Agent por cada URL** — usa la herramienta Agent con estos parámetros:
   - `description`: "Pipeline completo: <nombre-dominio>"
   - `prompt`: El prompt completo del pipeline (ver template abajo)
   - Lanza TODOS los agents en una sola llamada (parallel tool calls)

### Template de prompt para cada Agent:

```
Ejecuta el pipeline completo para este negocio. Trabaja en el directorio /Users/et59866/agencia/Agency-dev/

IMPORTANTE: Cada paso debe ejecutarse secuencialmente. No avances al siguiente hasta que el anterior termine.

## Paso 1: Scraping
Ejecuta el skill /scraping con la URL: <URL>
Espera a que se guarde el archivo en scraping/outputs/

## Paso 2: Auditoría
Identifica el archivo scraping generado en scraping/outputs/ (el más reciente o que coincida con el negocio).
Ejecuta el skill /auditoria con la ruta al scraping.json

## Paso 3: Web
Ejecuta el skill /web con la ruta al auditoria.json generado.
Esto construirá el sitio completo en web/<negocio>/

## Paso 4: Review
Ejecuta el skill /web-review con la ruta web/<negocio>/
Lee el output del review.

## Paso 5: Refine (condicional)
Si el review NO dio calidad "A", ejecuta el skill /web-refine con las instrucciones que generó el review.
Si dio "A", salta este paso.

## Paso 6: Deploy
Ejecuta el skill /deploy con: web/<negocio>/ <negocio>
Captura la URL de producción.

## Output final
Al terminar, responde EXACTAMENTE con este formato:
PIPELINE COMPLETADO: <nombre-negocio> → <url-deploy>
```

---

## MONITOREO Y RESULTADO FINAL

Después de lanzar todos los agents:

1. **Espera** a que todos los agents completen
2. **Recopila** los resultados de cada uno
3. **Genera la tabla resumen** con este formato:

```
BATCH COMPLETADO: X/Y sitios desplegados

| Negocio | URL Deploy |
|---|---|
| negocio-1 | https://negocio-1.vercel.app |
| negocio-2 | https://negocio-2.vercel.app |
| ... | ... |

Fallidos (si hay):
- negocio-X: [razón del fallo]
```

---

## REGLAS

- **Aislamiento total** — cada Agent trabaja su sitio sin saber de los otros
- **No mezclar contextos** — nunca pases datos de un sitio a otro
- **Tolerancia a fallos** — si un sitio falla, los demás continúan. Reporta el fallo al final.
- **Máximo 10 URLs** por batch — si hay más, rechaza con: "BATCH: máximo 10 URLs por ejecución"
- **Sin confirmaciones intermedias** — el pipeline corre de principio a fin sin pedir input
- El brief creativo (/web-brief) debe ejecutarse sin esperar confirmación del usuario — elige el tono que mejor aplique según el sector automáticamente
- Cero conversación extra — solo la tabla final
