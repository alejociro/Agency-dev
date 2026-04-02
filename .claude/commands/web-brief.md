# WEB — PASO 0: DIRECCIÓN CREATIVA

Lee el JSON de auditoría indicado y define el brief creativo antes de escribir código.

**Input:** `$ARGUMENTS` (ruta al auditoria.json, si no está ya en contexto)

---

## Brief obligatorio

Documenta como comentario al tope del archivo principal:

```
/* BRIEF CREATIVO
   Negocio    : [nombre del JSON]
   Sector     : [sector del JSON]
   Tono       : [elegir uno o combinación de la tabla]
   Concepto   : [una frase que capture la IDEA central del diseño]
   Diferenciador visual: [lo que nadie va a olvidar de este sitio]
   Tipografía : [display font] + [body font]
   Mood       : [3 palabras: ej. "oscuro · dorado · preciso"]
   Paleta base: [colores del JSON como punto de partida]
*/
```

---

## Tabla de tonos

| Tono | Tipografía sugerida | Efectos sugeridos | Sectores típicos |
|---|---|---|---|
| luxury refinado | Cormorant Garamond + Jost | grain, sombras doradas | moda, joyería, spa |
| brutalist vibrante | Space Grotesk + DM Mono | bordes gruesos, offset texto | agencias, arte, música |
| editorial sofisticado | Playfair Display + Source Serif | mucho espacio, líneas finas | revistas, arquitectura |
| orgánico natural | Lora + Nunito | texturas verdes, gradientes suaves | alimentación, bienestar |
| futurista tech | Syne + IBM Plex Mono | neón, glassmorphism | SaaS, startups, crypto |
| artesanal cálido | Libre Baskerville + Karla | papel, grano, ocres | artesanía, restaurantes |
| corporativo moderno | Plus Jakarta Sans + Inter | gradientes sutiles, limpio | finanzas, consultoría, B2B |
| minimalista premium | DM Sans + Cabinet Grotesk | mucho blanco, tipografía big | arquitectura, diseño |
| retro bold | Clash Display + Satoshi | colores saturados, formas geométricas | cultura, eventos, gastro |
| neo-orgánico | Fraunces + Outfit | blobs, gradientes cálidos, bordes suaves | wellness, eco, orgánico |

---

## Reglas del brief

- El tono se elige según `sector` del JSON y los valores del negocio
- Si el JSON tiene colores detectados → usalos como punto de partida, no los ignores
- El "diferenciador visual" debe ser algo concreto: "hero con texto en diagonal sobre imagen granulada", no "diseño moderno y elegante"
- Tipografía NUNCA puede ser Inter, Roboto, Arial, Helvetica ni Open Sans como fuente display (salvo en "corporativo moderno" donde Inter solo se permite como body)
- Presenta el brief al usuario y espera confirmación antes de proceder al siguiente paso
