# AGENTE BATCH-REFINE — REVISIÓN Y REFINAMIENTO PARALELO MULTI-SITIO

Recibes una lista de carpetas web ya construidas y ejecutas review + refine para cada una,
en paralelo, como procesos completamente independientes.

**Input:** `$ARGUMENTS` — lista de rutas a carpetas web separadas por comas o saltos de línea

Ejemplo:
```
/batch-refine web/negocio-1/, web/negocio-2/, web/negocio-3/
```

---

## FLUJO POR CADA SITIO

Cada carpeta pasa por este mini-pipeline, en orden:

```
/web-review web/<negocio>/
    ↓
(si review ≠ A) /web-refine web/<negocio>/ | <instrucciones del review>
    ↓
/deploy web/<negocio>/ <negocio>
```

---

## EJECUCIÓN PARALELA

**CRÍTICO: Cada sitio DEBE ejecutarse como un agente independiente usando la herramienta Agent.**

Para cada ruta en la lista:

1. **Parsea las rutas** — separa por comas, espacios, o saltos de línea. Limpia espacios.
2. **Lanza un Agent por cada ruta** — usa la herramienta Agent con estos parámetros:
   - `description`: "Review+Refine: <nombre-negocio>"
   - `prompt`: El prompt completo del pipeline (ver template abajo)
   - Lanza TODOS los agents en una sola llamada (parallel tool calls)

### Template de prompt para cada Agent:

```
Ejecuta review + refine para este sitio web. Trabaja en el directorio /Users/et59866/agencia/Agency-dev/

IMPORTANTE: Cada paso debe ejecutarse secuencialmente. No avances al siguiente hasta que el anterior termine.

## Paso 1: Review
Ejecuta el skill /web-review con la ruta: <RUTA>
Lee el output del review. Captura la calidad (A/B/C) y las instrucciones generadas.

## Paso 2: Refine (condicional)
Si el review NO dio calidad "A", ejecuta el skill /web-refine con las instrucciones que generó el review.
Formato: /web-refine <RUTA> | <instrucciones del review>
Si dio "A", salta este paso.

## Paso 3: Deploy
Ejecuta el skill /deploy con: web/<negocio>/ <negocio>
Esto desplegará el sitio o lo redesplegará si ya existía un deployment previo.
Captura la URL de producción.

## Output final
Al terminar, responde EXACTAMENTE con este formato:
REVIEW+REFINE COMPLETADO: <nombre-negocio> → Calidad: <A|B|C> → Refinado: <Sí|No> → <url-deploy>
```

---

## MONITOREO Y RESULTADO FINAL

Después de lanzar todos los agents:

1. **Espera** a que todos los agents completen
2. **Recopila** los resultados de cada uno
3. **Genera la tabla resumen** con este formato:

```
BATCH-REFINE COMPLETADO: X/Y sitios revisados y desplegados

| Negocio | Calidad | Refinado | URL Deploy |
|---|---|---|---|
| negocio-1 | B → refinado | Sí | https://negocio-1.vercel.app |
| negocio-2 | A | No | https://negocio-2.vercel.app |
| ... | ... | ... | ... |

Fallidos (si hay):
- negocio-X: [razón del fallo]
```

---

## REGLAS

- **Aislamiento total** — cada Agent trabaja su sitio sin saber de los otros
- **No mezclar contextos** — nunca pases datos de un sitio a otro
- **Tolerancia a fallos** — si un sitio falla, los demás continúan. Reporta el fallo al final.
- **Máximo 10 rutas** por batch — si hay más, rechaza con: "BATCH-REFINE: máximo 10 rutas por ejecución"
- **Sin confirmaciones intermedias** — el pipeline corre de principio a fin sin pedir input
- Cero conversación extra — solo la tabla final
