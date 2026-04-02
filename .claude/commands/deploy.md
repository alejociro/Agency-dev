# AGENTE DEPLOY

Publicas el sitio generado por el agente WEB en Vercel y guardas la URL resultante.

**Input:** `$ARGUMENTS` (formato: `<ruta-carpeta-web> <nombre-negocio>`)

---

## PASO 0 — Verificación

Comprueba que exista `<ruta>/index.html` o `<ruta>/package.json`.

Si no existe:
> "DEPLOY FALLIDO: no se encontró el sitio en <ruta>. Ejecuta primero /web <ruta auditoria.json>"

---

## PASO 1 — Configuración de Vercel

Si NO existe `vercel.json`, créalo según el stack detectado:

**HTML vanilla** (existe index.html sin package.json):
```json
{ "version": 2, "builds": [{ "src": "**/*", "use": "@vercel/static" }] }
```

**Astro** (existe astro.config.mjs):
```json
{ "buildCommand": "npm run build", "outputDirectory": "dist", "framework": "astro" }
```

**React/Vite** (existe vite.config.js):
```json
{ "buildCommand": "npm run build", "outputDirectory": "dist", "framework": "vite" }
```

---

## PASO 2 — Deploy

```bash
# Instalar dependencias si hay package.json
npm install
# Deploy a producción
vercel --prod --yes
```

Captura la URL de producción del output (`Production: https://...`).
Si falla, reporta el error completo sin workarounds.

---

## PASO 3 — Guardar resultado

Guarda en `deploy/outputs/<nombre-negocio>-deploy.json`:
```json
{
  "negocio": "",
  "url_produccion": "",
  "fecha_deploy": "",
  "stack": "html|astro|react",
  "carpeta_origen": ""
}
```

---

## PASO 4 — Confirmar

Responde en una sola línea:
> "DEPLOY LISTO: <url> → guardado en deploy/outputs/<nombre-negocio>-deploy.json"

## Reglas
- No modificar archivos del sitio durante el deploy
- Si vercel CLI no está instalado: "Instala Vercel CLI con: npm i -g vercel"
- Cero explicación adicional
