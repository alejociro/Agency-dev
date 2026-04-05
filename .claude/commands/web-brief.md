# WEB — STEP 0: CREATIVE DIRECTION

Read the indicated audit JSON and define the creative brief before writing any code.

**Input:** `$ARGUMENTS` (path to auditoria.json, if not already in context)

**Language rule:** The brief comment content should be in Spanish where it references business-specific data. Website copy and client-facing text must be in Spanish.

---

## Required Brief

Document as a comment at the top of the main file:

```
/* BRIEF CREATIVO
   Negocio    : [name from JSON]
   Sector     : [sector from JSON]
   Tono       : [choose one or combination from table]
   Concepto   : [one phrase capturing the CENTRAL IDEA of the design]
   Diferenciador visual: [the thing nobody will forget about this site]
   Tipografía : [display font] + [body font]
   Mood       : [3 words: e.g. "dark · golden · precise"]
   Paleta base: [colors from JSON as starting point]
*/
```

---

## Tone Table

| Tone | Suggested Typography | Suggested Effects | Typical Sectors |
|---|---|---|---|
| luxury refined | Cormorant Garamond + Jost | grain, golden shadows | fashion, jewelry, spa |
| brutalist vibrant | Space Grotesk + DM Mono | thick borders, offset text | agencies, art, music |
| editorial sophisticated | Playfair Display + Source Serif | lots of space, fine lines | magazines, architecture |
| organic natural | Lora + Nunito | green textures, soft gradients | food, wellness |
| futuristic tech | Syne + IBM Plex Mono | neon, glassmorphism | SaaS, startups, crypto |
| artisanal warm | Libre Baskerville + Karla | paper, grain, ochres | crafts, restaurants |
| corporate modern | Plus Jakarta Sans + Inter | subtle gradients, clean | finance, consulting, B2B |
| minimalist premium | DM Sans + Cabinet Grotesk | lots of white, big typography | architecture, design |
| retro bold | Clash Display + Satoshi | saturated colors, geometric shapes | culture, events, gastro |
| neo-organic | Fraunces + Outfit | blobs, warm gradients, soft edges | wellness, eco, organic |

---

## Brief Rules

- The tone is chosen based on the JSON `sector` and the business values
- If the JSON has detected colors → use them as a starting point, don't ignore them
- The "diferenciador visual" must be something concrete: "hero with diagonal text over grainy image", not "modern and elegant design"
- Typography can NEVER be Inter, Roboto, Arial, Helvetica, or Open Sans as display font (except in "corporate modern" where Inter is only allowed as body)
- Present the brief to the user and wait for confirmation before proceeding to the next step
