# DESIGN-GUIDE.md

## Design Philosophy

Follows this core aesthetic principles: **clean, minimal, content-first**. The design should never compete with the content-everything exists to serve readability.

Inspired by [AstroPaper](https://github.com/satnaing/astro-paper).

---

## Unified CSS Class System

All styles are defined in `@src/styles/global.css`. No inline `<style>` allowed in components.

### Typography Classes
| Class | Description |
|-------|-------------|
| `title-xl` | Page title (serif, 2rem, 500) |
| `title-lg` | Section title (serif, 1.45rem, 500) |
| `title-md` | Subsection (serif, 1.2rem, 600) |
| `body` | Body text (1rem, 1.7 line-height) |
| `body-sm` | Small text (0.85rem) |
| `body-xs` | Tiny text (0.75rem) |
| `mono` | Code/text (JetBrains Mono) |

### Layout Classes
| Class | Description |
|-------|-------------|
| `container-narrow` | Max-width 800px |
| `space-y-1` to `space-y-4` | Margin bottom scale (0.5-2rem) |
| `gap-1` to `gap-4` | Gap scale |

### Component Classes
| Class | Description |
|-------|-------------|
| `card` | List item container with border-bottom |
| `card-title` | Title link with hover effect |
| `card-meta` | Metadata row with opacity |
| `card-desc` | Description with 2-line clamp |
| `card-link` | External link button |
| `tag` | Minimal accent-colored badge |
| `btn` | Standard button |
| `btn-sm` | Small button |
| `btn-icon` | Icon-only circular button |
| `icon-btn` | Social/share buttons |
| `social-link` | Social icon links |
| `link` | Text link with underline |
| `badge` | Venue label (mono, accent on tinted background) |
| `chip-list` / `chip` | Topic tags (mono, outlined) |
| `pill-row` / `pill` | Rounded external-link buttons (arXiv, INSPIRE, slides) |
| `figure-tile` | 16:10 frame for a paper figure; inverted in dark mode |
| `section-heading` | Serif heading followed by a hairline rule |
| `pub` / `pub-*` | Publication list item (thumbnail + text) |
| `feature` / `feature-grid` | "Selected work" cards on the home page |
| `agenda` / `agenda-date` | Talk list item with a date column |

### Layout Section Classes
| Class | Description |
|-------|-------------|
| `sidebar` | 280px sticky profile sidebar |
| `sidebar-avatar` | 112px circular avatar |
| `sidebar-name` | Name heading |
| `sidebar-info` | Institution/info text |
| `sidebar-bio` | Short bio text |
| `navbar` | Top navigation bar |
| `nav-links` | Nav link list |
| `nav-link` | Nav link with active indicator |
| `main-content` | Right content area wrapper |
| `main-body` | Content padding container |
| `footer` | Site footer |

### Prose Classes
| Class | Description |
|-------|-------------|
| `prose` | Main content wrapper |
| `prose h1/h2/h3` | Heading styles |
| `prose p` | Paragraph styling |
| `prose ul/ol` | List styling with accent markers |
| `prose code` | Inline code styling |
| `prose pre` | Code block with border |
| `prose img` | Image styling |
| `prose blockquote` | Quote styling |
| `prose hr` | Horizontal divider |

---

## Layout

### 2-Column Structure (Primary)
- **Left Sidebar:** Sticky profile with name, institution, social links, short bio. Width 280px desktop.
- **Right Main:** Scrollable content area. Max-width 800px for optimal reading line length.
- **Responsive:** Sidebar collapses to top header + border on mobile.

### Spacing (Compact)
- Vertical whitespace between sections: 2rem
- Items in lists separated by 2rem gaps
- Paragraphs use tighter line-height (1.65-1.7)

---

## Color

### Principles (AstroPaper-inspired)
- **Quiet base:** Near-white page, near-black text. Let content breathe.
- **Accent = function + identity:** Accent marks links, labels (badges, years) and the hero emphasis.
- **One accent color per theme:** Never use multiple accent colors together in the UI. Figures may use their own palette.
- **Surface ≠ background:** Cards and figure tiles sit on `surface`, which is lighter (light theme) or raised (dark theme) relative to `background`.
- **Sidebar panel:** themes may set `sidebar` / `sidebarText`; the sidebar then becomes a coloured panel (extended to the window edge on wide screens).
- **Active themes:** `light_petrol` / `dark_petrol` (petroleum blue). Alternative: `light_mpg` / `dark_mpg` (Max Planck green) — switch in `src/config/site.ts`.

### Theme System
- Themes configured in `src/config/themes.ts` - unified THEMES object with `isDark` flag
- Each theme defines 6 tokens: `background`, `foreground`, `accent`, `muted`, `border`, `surface`
- All CSS variables injected into `src/styles/global.css`
- Users select active light/dark themes via `src/config/site.ts` (`THEME_CONFIG.themeLight`, `THEME_CONFIG.themeDark`)

### Contrast (non-negotiable)
- Text must pass WCAG AAA contrast in both light and dark modes.
- Minimum 7:1 contrast ratio for body text.

---

## Typography

### Font Stack
- **Headings:** Newsreader (serif, via @fontsource-variable/newsreader)
- **Body:** Inter (via @fontsource/inter)
- **Code/Tags/Metadata:** JetBrains Mono (via @fontsource/jetbrains-mono)
- No external web fonts—self-host via fontsource packages

### Hierarchy
- **Home intro:** the first section of `bio.md` opens the page, in normal body text
- **Page title:** serif, 2.4rem, weight 500, letter-spacing -0.02em
- **Section heading (h2):** serif, 1.45rem, weight 500, followed by a hairline rule
- **Body text:** 1rem, line-height 1.7; secondary text uses `--text-muted` (not opacity)

---

## Figures

- Each publication can set `image` in its frontmatter: the thumbnail used in lists and cards (e.g. `/images/papers/<slug>.webp`). A single diagram reads best at thumbnail size.
- `figure` (optional) is the full figure shown on the paper's own page, with an optional `figure_caption`. Without `figure`, the page shows `image`.
- Figures are cropped from the arXiv sources/PDFs and saved as WebP with a transparent background.
- Use line art on a transparent or white background. In dark mode, `.figure-tile img` is inverted (`invert(1) hue-rotate(180deg)`), so dark ink becomes light.
- `featured: true` on a publication puts it in "Selected work" on the home page (first three, newest first).
- The home page opens with the first section of `src/content/bio.md` ("Current Work"); the remaining sections follow, then "Selected work".

---

## UI Components

### Flat Design
- **NO drop shadows.** Ever.
- **NO glassmorphism.**
- NO heavy gradients.
- Separation = 1px solid border OR subtle background variation.
- **Subtle border-radius:** 0.25rem on cards and code blocks

### Links
- Underline with 4px offset.
- Hover: color shifts to accent, full opacity.
- Transition: 0.2s ease.

### Buttons
- Flat, no shadows.
- Hover: subtle border/color change.
- Icon buttons use 50% border-radius.

### Icons
- Outline style (Lucide/Tabler style).
- stroke-width: 1.5px.
- Sizes: 24px (standard).

---

## Accessibility

- **Focus rings:** Visible dashed outline for keyboard navigation.
- **Reduced motion:** Respect `prefers-reduced-motion` media query.
- **Alt text:** Required for all images.

---

## Implementation Notes

- **No `<style>` in `.astro` files.** All styles in global.css or via Tailwind classes.
- **Tailwind v4:** Uses `@tailwindcss/vite` plugin (no `tailwind.config.js`).
- Tailwind utilities allowed for layout, but prefer unified CSS classes.
- Use CSS variables (e.g., `var(--foreground)`, `var(--accent)`) for theming.

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── LeftSidebar.astro   (uses .sidebar, .sidebar-avatar, .sidebar-name, .social-link)
│   │   ├── Navbar.astro        (uses .navbar, .nav-links, .nav-link, .btn-icon)
│   │   ├── RightMain.astro     (uses .main-content, .main-body)
│   │   └── Footer.astro        (uses .footer)
│   ├── content/
│   │   └── ContentLinks.astro
│   └── ui/
│       ├── BaseItemCard.astro  (uses .card, .card-title, .card-meta, .card-desc)
│       ├── Tag.astro          (uses .tag)
│       ├── BackLink.astro    (uses .back-link)
│       ├── ShareButtons.astro (uses .icon-btn)
│       └── Icon.astro
├── layouts/
│   ├── BaseLayout.astro
│   ├── BaseDetail.astro       (uses .prose, .page-title, .card-meta)
│   ├── BaseListing.astro      (uses .item-list, .page-header)
│   └── DevToolsLayout.astro
└── styles/
    └── global.css             (all unified classes)
```