# WEB — STEP 7: DELIVERABLES & QUALITY CHECKLIST

Verify that everything meets the standards before confirming delivery.

---

## Delivery order

1. **Creative brief** — documented comment in main file
2. **Folder structure** — complete project tree
3. **design-system.css** — CSS variables and base styles
4. **Base components** — Button, Card, SectionHeader (if applicable)
5. **Hero + Navbar + Social Proof Bar** — with page load animations
6. **Content sections** — Services → Differentiators → Process → Testimonials
7. **Intermediate CTA + Contact + Footer**
8. **Secondary pages** — About, Services, Portfolio, Contact
9. **SEO** — meta tags + JSON-LD schema on all pages
10. **Project README**

---

## Deliverable project README

```markdown
# [Business Name] — Website

## Stack
[framework, dependencies, versions]

## Installation
[exact commands to run locally]

## Structure
[folder tree]

## Deploy
[instructions for Vercel/Netlify]
```

---

## Quality checklist (verify ALL)

### Design
- [ ] The design is UNIQUE — it doesn't look like a ThemeForest template
- [ ] Fonts with personality that complement the industry
- [ ] Primary color from JSON dominates without overwhelming
- [ ] At least ONE element that breaks the grid or surprises
- [ ] Background is NOT pure white (#fff) nor pure black (#000)
- [ ] Shadows use brand color

### UX and Conversion
- [ ] Main CTA is the first thing that draws attention in the Hero
- [ ] Social proof visible (logos, testimonials, metrics)
- [ ] Intermediate CTA before the contact section
- [ ] Form accessible and usable on mobile

### Animations
- [ ] Smooth and natural animations
- [ ] `prefers-reduced-motion` respected
- [ ] No animation blocks access to content

### Responsive
- [ ] Mobile (360px) looks AS good as desktop
- [ ] Hero uses `svh` on mobile (content doesn't get clipped)
- [ ] Touch targets minimum 44×44px on mobile
- [ ] Mobile menu functional (hamburger or similar)

### Accessibility
- [ ] All images with descriptive `alt`
- [ ] WCAG AA contrast (minimum 4.5:1) on all backgrounds
- [ ] Visible focus on interactive elements (`:focus-visible`)
- [ ] Semantic HTML (no divs where buttons/links/nav should go)

### SEO and Performance
- [ ] Unique `<title>` and `<meta description>` per page
- [ ] Unique H1 per page
- [ ] JSON-LD schema present
- [ ] `loading="lazy"` on images (except hero)
- [ ] `fetchpriority="high"` on LCP image
- [ ] `font-display: swap` on fonts
- [ ] Speculation rules for prefetch
- [ ] `content-visibility: auto` on below the fold sections

### Code
- [ ] No console.log in production
- [ ] No unnecessary commented-out code
- [ ] CSS variables used consistently
- [ ] JavaScript doesn't block initial render
- [ ] CSS organized with `@layer`
