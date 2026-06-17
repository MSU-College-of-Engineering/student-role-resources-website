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

## Content sources

The original source documents are linked from the site itself:

- **Resources** page → hero button + footer link → `master-documentation.pdf`
- **Components** page → header button + footer link → `drupal-user-guide.pdf`

So they ship with the build, the PDFs live in `public/content-source/` (Vite only
serves/bundles assets from `public/`). The editable originals are kept in the
top-level `content-source/` folder; if you replace them, copy the new versions
into `public/content-source/` (same filenames) so the site picks them up:

```bash
cp content-source/*.pdf public/content-source/
```

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run deploy   # build + publish dist/ to the gh-pages branch
```

## Deploy to GitHub Pages

`npm run deploy` builds the site and pushes `dist/` to a `gh-pages` branch on
`origin` (via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package),
adding a `.nojekyll` file so Pages serves the build as-is.

One-time setup, in the repo's **Settings → Pages**: set the source to
**Deploy from a branch → `gh-pages` / `root`**. After that, every `npm run deploy`
publishes to:

```
https://msu-college-of-engineering.github.io/student-role-resources-website/
```

The Vite `base` is set to `'./'` (relative), so the build works at that subpath
without hardcoding the repo name, and hash-based routing (`#/`, `#/components`)
needs no extra server config.
