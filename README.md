# EGR Web Resources

Single website for the **MSU College of Engineering – Student Front-End Web Assistant**,
with two pages sharing one header and design system:

- **Resources** (`#/`) — every resource cited in the master documentation (tools, migration
  utilities, and standards) in one searchable, filterable hub.
- **Components** (`#/components`) — the EGR Drupal Component Guide: a step-by-step build guide
  for all 18 Drupal components.

Built with React + Vite, reusing the EGR design system (MSU green branding, Outfit type,
category-grouped cards, slide-in detail panels). Navigation uses lightweight hash-based routing,
so it deploys to any static host (e.g. GitHub Pages) with no server config.

## Structure

```
src/
  App.jsx              # hash router → ResourcesPage | ComponentsPage
  components/
    SiteHeader.jsx     # shared header + Resources/Components nav + search
  pages/
    ResourcesPage.jsx  # the resource hub (homepage)
    ComponentsPage.jsx # the Drupal component reference
  data/
    resources.js       # cited resources + real URLs
    components.js       # the 18 EGR Drupal components
  icons.jsx            # shared icon set
  index.css            # shared design system
public/previews/       # component preview images
```

## Resources

| Category | Resources |
| --- | --- |
| **Core Tools** | Figma Component Library, Broken Link Checker, Keywords Search, News Browser Extension |
| **Migration Utilities** | Drupal JSON, Download Faculty Images, News Tags AI Analysis |
| **Standards & References** | MSU Accessibility Standards, MSU Assets & Images Guidelines, WAVE, WebAIM Color Contrast Checker |
| **Deprecated** | Full-URLs News Search, Get Sitemap |

All links are sourced directly from the hyperlinks embedded in the master documentation PDF.
To add or edit a resource, update [`src/data/resources.js`](src/data/resources.js).

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run deploy   # build + publish dist/ to GitHub Pages
```
