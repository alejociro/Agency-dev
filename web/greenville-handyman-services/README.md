# Greenville Handyman Services — Website

## Stack
- HTML5 + CSS3 (native nesting, `@layer`, `oklch()`, container queries)
- Vanilla JavaScript (zero dependencies)
- Google Fonts: Space Grotesk + Karla
- Form handling: Formspree (requires configuration)

## Local Development
```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx serve .

# Option 3: VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```
Then open `http://localhost:8000`

## Structure
```
greenville-handyman-services/
├── index.html              # Single-page landing (all sections)
├── README.md
├── styles/
│   ├── design-system.css   # Variables, reset, base, utilities, decorative
│   └── main.css            # Components, layout, animations (4 layers)
├── js/
│   └── main.js             # Mobile menu, FAQ, scroll reveal, counters
└── assets/
    ├── images/
    └── icons/
```

## Deploy (Netlify)
1. Drag & drop the `greenville-handyman-services/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Or connect via Git and set publish directory to `web/greenville-handyman-services`

## Deploy (Cloudflare Pages)
1. Connect repo → set build output to `web/greenville-handyman-services`
2. No build command needed (static HTML)

## Configuration
- **Form**: Replace `your-form-id` in the form action URL with your Formspree endpoint
- **Images**: Replace Unsplash URLs with client's actual photography
- **Analytics**: Add tracking script before `</body>`
