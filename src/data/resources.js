// Resources cited in the "Master Documentation for Student Front-End Web Assistant".
// URLs are taken directly from the hyperlinks embedded in that document.

export const resources = [
  /* ── Core Tools ──────────────────────────────────────────────── */
  {
    id: 'figma-library',
    name: 'Figma Component Library',
    category: 'tools',
    icon: 'figma',
    status: 'active',
    type: 'Design',
    desc: 'Figma component library used to build MSU College of Engineering website mockups and high-fidelity prototypes.',
    facts: [
      'Mirrors the Drupal CMS components available on the live site.',
      'Used to design and review high-fidelity mockups before building in Drupal.',
      'Maintained to stay aligned with MSU brand standards and accessibility guidelines.',
    ],
    tech: ['Figma', 'Design System', 'Drupal'],
    links: [
      {
        label: 'Open in Figma',
        url: 'https://www.figma.com/design/bzbbp58Obf8CGt89uOT6ja/Drupal-Component-Library?node-id=0-1&t=Jzcj460ucFP4kcOJ-1',
        primary: true,
      },
    ],
  },
  {
    id: 'component-guide',
    name: 'Drupal Component Guide',
    category: 'tools',
    icon: 'layout',
    status: 'active',
    type: 'Component reference',
    // Internal page within this site (see Components tab) rather than an external link.
    route: '#/components',
    desc: 'Step-by-step build guide for every EGR Drupal component — fields, options, and instructions. Lives on this site.',
    facts: [
      'Documents all 18 EGR Drupal components used to build pages.',
      'Each component lists its fields, options, and a step-by-step setup guide.',
      'Pairs with the Figma Component Library when translating mockups into Drupal.',
    ],
    tech: ['Drupal', 'Components', 'Reference'],
    links: [],
  },
  {
    id: 'broken-link-checker',
    name: 'Broken Link Checker',
    category: 'tools',
    icon: 'link',
    status: 'active',
    type: 'Automation',
    desc: 'Automated crawler that scans MSU Engineering sites for broken or erroring links and publishes the results to a reporting dashboard.',
    facts: [
      'Crawls MSU College of Engineering websites and flags broken or erroring links.',
      'Runs on a scheduled GitLab CI pipeline and deploys its output to a GitHub Pages site.',
      'The Link Audit dashboard tracks totals, redirects, errors, timeouts, and suggestions across hundreds of thousands of links.',
      'If a scheduled scan fails, rerun it from the pipeline schedules page to keep monitoring uninterrupted.',
    ],
    tech: ['GitLab CI', 'GitHub Pages', 'Crawler'],
    links: [
      {
        label: 'Open Link Audit dashboard',
        url: 'https://msu-college-of-engineering.github.io/broken-links-website/',
        primary: true,
      },
      {
        label: 'Frontend repo (GitHub)',
        url: 'https://github.com/MSU-College-of-Engineering/broken-links-website',
      },
      {
        label: 'Source & pipeline (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/broken-link-checker',
      },
      {
        label: 'Pipeline schedules',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/broken-link-checker/-/pipeline_schedules',
      },
    ],
  },
  {
    id: 'keywords-search',
    name: 'Keywords Search',
    category: 'tools',
    icon: 'search',
    status: 'active',
    type: 'Tool · CLI + UI',
    desc: 'Searches for keywords — plain text or regex — across every page in the MSU Engineering sitemap and outputs the matching URLs.',
    facts: [
      'Searches plain-text or regular-expression patterns across the full MSU Engineering site.',
      'Available as both a command-line tool and a Streamlit web UI.',
      'Lets you scope the search to specific HTML tags and CSS classes, and to ignore header/footer content.',
      'The GitLab repo is mirrored to GitHub purely for Streamlit deployment — do not push to the GitHub mirror.',
    ],
    tech: ['Python', 'Streamlit', 'Regex', 'CLI'],
    links: [
      {
        label: 'Open Streamlit app',
        url: 'https://keywords-search-dtjzv9zwkj4jyqx6eea9yx.streamlit.app/',
        primary: true,
      },
      {
        label: 'Source (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/keywords-search',
      },
      {
        label: 'Deploy mirror (GitHub · do not push)',
        url: 'https://github.com/MSU-College-of-Engineering/keywords-search',
      },
    ],
  },
  {
    id: 'news-extension',
    name: 'News Browser Extension',
    category: 'tools',
    icon: 'extension',
    status: 'active',
    type: 'Browser extension',
    desc: 'A browser toolkit that streamlines the news content-management and publishing workflow on MSUToday and the MSU Engineering site.',
    facts: [
      'Adds a toolbox to the MSUToday and MSU Engineering websites for formatting and publishing news.',
      'Process Clipboard HTML — strips styling carried over from Outlook so formatting stays consistent across the site.',
      'MSUToday Article — fetches and formats an MSUToday article’s HTML, adjusts links, and copies it ready to paste.',
      'Designed to reduce manual steps and errors when publishing stories via Drupal.',
    ],
    tech: ['Browser Extension', 'HTML', 'Drupal'],
    links: [
      {
        label: 'Source (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/sitecore-extension',
        primary: true,
      },
      { label: 'MSUToday', url: 'https://msutoday.msu.edu/' },
      { label: 'MSU Engineering', url: 'https://engineering.msu.edu/' },
    ],
  },

  /* ── Migration Utilities ─────────────────────────────────────── */
  {
    id: 'drupal-json',
    name: 'Drupal JSON',
    category: 'migration',
    icon: 'braces',
    status: 'active',
    type: 'Migration utility',
    desc: 'Generates Drupal-compatible JSON files from the resources folder backed up from the previous website.',
    facts: [
      'Converts the backed-up resources folder from the previous site into Drupal-compatible JSON.',
      'Used to bulk-import legacy content into the Drupal CMS during migration.',
    ],
    tech: ['Python', 'JSON', 'Drupal'],
    links: [
      {
        label: 'Source (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/drupal-json',
        primary: true,
      },
    ],
  },
  {
    id: 'download-faculty-images',
    name: 'Download Faculty Images',
    category: 'migration',
    icon: 'image',
    status: 'active',
    type: 'Migration utility',
    desc: 'Downloads the images from specified faculty profiles, used during the website migration.',
    facts: [
      'Pulls profile images from a set of specified faculty pages.',
      'Used to gather faculty photos for migration into the new site.',
    ],
    tech: ['Python', 'Scraper'],
    links: [
      {
        label: 'Source (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/download-faculty-images',
        primary: true,
      },
    ],
  },
  {
    id: 'news-tags-ai',
    name: 'News Tags AI Analysis',
    category: 'migration',
    icon: 'sparkles',
    status: 'active',
    type: 'Migration utility',
    desc: 'Analyses news articles and suggests tags for them — used during the website migration.',
    facts: [
      'Reads news articles and proposes relevant tags automatically.',
      'Used to categorise migrated news content consistently.',
    ],
    tech: ['Python', 'AI', 'Tagging'],
    links: [
      {
        label: 'Source (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/news-tags-ai-analysis',
        primary: true,
      },
    ],
  },

  /* ── Standards & References ──────────────────────────────────── */
  {
    id: 'accessibility-standards',
    name: 'MSU Accessibility Standards',
    category: 'reference',
    icon: 'accessibility',
    status: 'reference',
    type: 'Standard',
    desc: 'MSU web accessibility policy. All webpages must meet WCAG 2.0 Level AA, including downloadable files such as PDFs.',
    facts: [
      'All webpages must meet WCAG 2.0 Level AA in accordance with the MSU Accessibility Policy.',
      'Drupal has the Editoria11y accessibility checker integrated — its warnings are worth paying attention to.',
      'Verify contrast and structure with free tools such as WAVE and the WebAIM Color Contrast Checker.',
    ],
    tech: ['WCAG 2.0 AA', 'Accessibility'],
    links: [
      {
        label: 'MSU Accessibility Policy',
        url: 'https://dxstudio.msu.edu/website-technology/web-standards/accessibility',
        primary: true,
      },
      { label: 'Editoria11y (Drupal module)', url: 'https://www.drupal.org/project/editoria11y' },
    ],
  },
  {
    id: 'assets-guidelines',
    name: 'MSU Assets & Images Guidelines',
    category: 'reference',
    icon: 'image',
    status: 'reference',
    type: 'Standard',
    desc: 'Guidelines for image usage rights, compression, sizing, alt text, and consistent file & asset naming conventions.',
    facts: [
      'Only use images for which usage rights are confirmed, and only official MSU logos and marks.',
      'Compress images before uploading (e.g. ImageOptim or TinyIMG) and size them appropriately for context.',
      'Every image needs descriptive alt text; downloadable PDFs must also meet WCAG 2.0 AA.',
      'Use lowercase, hyphen-separated, descriptive filenames (e.g. news-banner-fall-2024.jpg).',
    ],
    tech: ['Images', 'Naming', 'WCAG 2.0 AA'],
    links: [
      {
        label: 'MSU Assets & Images Guidelines',
        url: 'https://dxstudio.msu.edu/website-technology/web-standards/assets-images',
        primary: true,
      },
      { label: 'TinyIMG', url: 'https://tinyimg.io/' },
    ],
  },
  {
    id: 'wave',
    name: 'WAVE',
    category: 'reference',
    icon: 'accessibility',
    status: 'reference',
    type: 'External tool',
    desc: 'WebAIM’s free Web Accessibility Evaluation tool for checking pages against accessibility best practices.',
    facts: [
      'Free accessibility checker recommended in the MSU accessibility workflow.',
      'Flags contrast, structure, and ARIA issues directly on the rendered page.',
    ],
    tech: ['Accessibility', 'WebAIM'],
    links: [{ label: 'Open WAVE', url: 'https://wave.webaim.org/', primary: true }],
  },
  {
    id: 'webaim-contrast',
    name: 'WebAIM Color Contrast Checker',
    category: 'reference',
    icon: 'contrast',
    status: 'reference',
    type: 'External tool',
    desc: 'Verifies that foreground/background color pairs meet WCAG AA contrast ratios.',
    facts: [
      'Used to confirm sufficient color contrast for text and UI elements.',
      'Reports pass/fail against WCAG AA and AAA thresholds.',
    ],
    tech: ['Accessibility', 'Contrast'],
    links: [
      {
        label: 'Open Contrast Checker',
        url: 'https://webaim.org/resources/contrastchecker/',
        primary: true,
      },
    ],
  },

  /* ── Deprecated ──────────────────────────────────────────────── */
  {
    id: 'full-urls-news-search',
    name: 'Full-URLs News Search',
    category: 'deprecated',
    icon: 'search',
    status: 'deprecated',
    type: 'Deprecated',
    desc: 'Scans a list of news-article URLs and flags any that contain raw URLs in their body text.',
    facts: [
      'Deprecated — use Keywords Search instead.',
      'Scans a list of news-article URLs and flags raw URLs left in the body text.',
    ],
    tech: ['Python', 'Deprecated'],
    links: [
      {
        label: 'Source (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/full-url-news-search',
        primary: true,
      },
    ],
  },
  {
    id: 'get-sitemap',
    name: 'Get Sitemap',
    category: 'deprecated',
    icon: 'sitemap',
    status: 'deprecated',
    type: 'Deprecated',
    desc: 'Scans the sitemap page and downloads a sitemap CSV. Originally used with Sitecore.',
    facts: [
      'Deprecated — originally used while the site ran on Sitecore.',
      'Scans the sitemap page and downloads a CSV of the URLs.',
    ],
    tech: ['Python', 'Sitecore', 'Deprecated'],
    links: [
      {
        label: 'Source (GitLab)',
        url: 'https://gitlab.msu.edu/egr-college-website/marco/get-sitemap',
        primary: true,
      },
    ],
  },
]

export const catLabels = {
  tools: 'Core Tools',
  migration: 'Migration Utilities',
  reference: 'Standards & References',
  deprecated: 'Deprecated',
}

export const catOrder = ['tools', 'migration', 'reference', 'deprecated']

export const statusLabels = {
  active: 'Active',
  reference: 'Reference',
  deprecated: 'Deprecated',
}
