# Killian Auto Pros -- Website

## Stack
- **Framework:** Astro 5
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Animations:** CSS native + vanilla JS (Intersection Observer, scroll-driven)
- **Fonts:** Bebas Neue (display) + Space Grotesk (body) via Google Fonts

## Installation
```bash
npm install
npm run dev
```

## Structure
```
killian-auto-pros/
  astro.config.mjs
  package.json
  BRIEF.md
  README.md
  public/
    assets/
  src/
    layouts/
      BaseLayout.astro
    components/
      Header.astro
      Footer.astro
    pages/
      index.astro          # Home
      services.astro       # Services (8 specialties + FAQ)
      about.astro          # About (timeline, values, certifications)
      contact.astro        # Contact (appointment stepper + form + map)
    styles/
      design-system.css    # Full design system (tokens, components, grids)
      animations.css       # 4-layer animation system
    scripts/
      animations.js        # Scroll reveal, counters, magnetic buttons, stepper
```

## Deploy
```bash
npm run build     # Generates static site in dist/
npx vercel        # Deploy to Vercel
```

## Pages
| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, services grid, amenities, locations, testimonials, offers |
| Services | `/services` | 8 service details with benefits, FAQ accordion |
| About | `/about` | Company story, values, timeline, ASE certification |
| Contact | `/contact` | 4-step appointment stepper, location map, contact form |

## Design Decisions
- **Brutalist vibrante + industrial** aesthetic matching auto repair sector
- Red (#D90000) refined from original #FE0000 for more visual weight
- Oversized numbers break the grid on service cards and location cards
- Blueprint-style dashed lines for amenities checklist
- Grain overlay for industrial texture
- Mobile-first with tool-panel navigation concept
