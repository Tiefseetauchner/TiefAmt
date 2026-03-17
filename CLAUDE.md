# TiefAmt — project blueprint

TiefAmt is a React UI component library providing a government/bureaucratic aesthetic
(EU/Austrian style) built on top of React Bootstrap. Published as an npm package.

---

## Runtime & tooling constraints

- **Bun only.** Use `bun` for all package management, script execution, and bundling tasks.
  Do not use npm, yarn, or pnpm. Do not generate package-lock.json or yarn.lock.
- **Bundler:** tsup (runs via bun). Outputs ESM + CJS + `.d.ts`.
- **TypeScript:** strict mode. No `any` unless genuinely unavoidable and commented.
- **React:** 18+, peer dependency only.
- **React Bootstrap:** peer dependency only.
- **Bootstrap SCSS:** peer dependency only (consumer provides it).

---

## Monorepo structure

```
tiefamt/
├── CLAUDE.md                  ← you are here
├── package.json               ← workspace root (bun workspaces)
├── bunfig.toml
├── packages/
│   ├── tiefamt/               ← the published npm package
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   ├── src/
│   │   │   ├── index.ts           ← barrel export
│   │   │   ├── provider/
│   │   │   │   └── GovProvider.tsx
│   │   │   ├── components/
│   │   │   │   ├── GovPage/
│   │   │   │   ├── GovHeader/
│   │   │   │   ├── GovBanner/
│   │   │   │   ├── GovAlert/
│   │   │   │   ├── GovTable/
│   │   │   │   ├── GovDataTable/
│   │   │   │   ├── GovFormGroup/
│   │   │   │   ├── GovBadge/
│   │   │   │   ├── GovStatusBadge/
│   │   │   │   ├── GovFooter/
│   │   │   │   ├── GovSidebar/
│   │   │   │   ├── GovNav/
│   │   │   │   ├── GovSearchBar/
│   │   │   │   ├── GovFilterPanel/
│   │   │   │   ├── GovFilterChip/
│   │   │   │   ├── GovWorkflowTracker/
│   │   │   │   ├── GovActionBar/
│   │   │   │   ├── GovDocumentDrawer/
│   │   │   │   ├── GovDocumentCard/
│   │   │   │   ├── GovPageThumbnail/
│   │   │   │   └── GovPdfViewer/
│   │   │   ├── hooks/
│   │   │   │   ├── useGovTheme.ts
│   │   │   │   ├── useGovSearch.ts       ← debounced search + filter state
│   │   │   │   └── useGovDocumentDrawer.ts
│   │   │   ├── utils/
│   │   │   │   └── govClassNames.ts
│   │   │   └── styles/
│   │   │       ├── govamt.scss        ← main SCSS entry point
│   │   │       ├── _variables.scss    ← Bootstrap variable overrides
│   │   │       ├── _typography.scss
│   │   │       ├── _density.scss      ← CSS custom property tokens
│   │   │       ├── _components.scss   ← component-level overrides
│   │   │       └── presets/
│   │   │           ├── austria.scss   ← Republik Österreich (Pantone 186 C)
│   │   │           ├── eu.scss        ← European Union (Pantone 286 C + 116 C)
│   │   │           └── neutral.scss   ← generic government, no national identity
│   │   └── dist/              ← gitignored, tsup output
│   └── tiefamt-storybook/     ← docs/showcase, NOT published to npm
│       ├── package.json
│       ├── .storybook/
│       └── stories/
└── tsconfig.base.json
```

Each component folder (e.g. `GovPage/`) contains:
```
GovPage/
├── GovPage.tsx
├── GovPage.types.ts
└── index.ts
```

---

## Package metadata (`packages/tiefamt/package.json`)

```json
{
  "name": "tiefamt",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles":                  "./dist/styles/govamt.css",
    "./styles/presets/austria":  "./dist/styles/presets/austria.css",
    "./styles/presets/eu":       "./dist/styles/presets/eu.css",
    "./styles/presets/neutral":  "./dist/styles/presets/neutral.css"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "react-bootstrap": ">=2",
    "bootstrap": ">=5"
  },
  "devDependencies": {
    "tsup": "latest",
    "typescript": "latest",
    "@types/react": "latest"
  }
}
```

---

## tsup config (`packages/tiefamt/tsup.config.ts`)

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/styles/govamt.scss',
    'src/styles/presets/austria.scss',
    'src/styles/presets/eu.scss',
    'src/styles/presets/neutral.scss',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react-bootstrap', 'bootstrap'],
})
```

---

## Theme layer — SCSS architecture

`govamt.scss` is the consumer's single import. It must:
1. Import Bootstrap's `functions` and `mixins` only (no output yet)
2. Import `_variables.scss` to override Bootstrap tokens
3. Import the rest of Bootstrap
4. Import `_typography.scss`, `_density.scss`, `_components.scss`

### Key Bootstrap variable overrides (`_variables.scss`)

```scss
// Color palette — dark navy primary, functional secondaries
$primary:   #1a2b5e;
$secondary: #5a6a8a;
$success:   #2e7d32;
$warning:   #e65100;
$danger:    #b71c1c;
$info:      #01579b;
$light:     #f4f4f2;
$dark:      #1a1a1a;

// Typography — neutral, legible, slightly condensed
$font-family-base: "Source Sans 3", "Helvetica Neue", Arial, sans-serif;
$font-size-base:   0.9375rem;   // 15px
$line-height-base: 1.55;
$headings-font-weight: 600;

// Geometry — flat, boxy, bureaucratic
$border-radius:    2px;
$border-radius-sm: 2px;
$border-radius-lg: 4px;
$border-radius-pill: 2px;     // pills become rectangles. correct.

// Inputs — heavy border, no rounding
$input-border-color:       #6b7280;
$input-border-width:       2px;
$input-border-radius:      2px;
$input-focus-border-color: $primary;
$input-focus-box-shadow:   0 0 0 2px rgba($primary, 0.2);

// Buttons — flat
$btn-border-radius:    2px;
$btn-border-radius-sm: 2px;
$btn-border-radius-lg: 2px;
$btn-font-weight:      600;

// Tables — dense, formal
$table-cell-padding-y:      0.5rem;
$table-cell-padding-x:      0.75rem;
$table-border-color:        #c0c0c0;
$table-striped-bg:          rgba(0, 0, 0, 0.025);
$table-hover-bg:            rgba($primary, 0.05);

// Cards — minimal chrome
$card-border-radius: 2px;
$card-border-color:  #c8c8c8;
```

### Density tokens (`_density.scss`)

CSS custom properties driven by `data-gov-density` attribute set by `GovProvider`.

```scss
:root,
[data-gov-density="default"] {
  --gov-cell-pad-y:  0.5rem;
  --gov-cell-pad-x:  0.75rem;
  --gov-row-gap:     0.75rem;
  --gov-section-gap: 1.5rem;
}

[data-gov-density="comfortable"] {
  --gov-cell-pad-y:  0.75rem;
  --gov-cell-pad-x:  1rem;
  --gov-row-gap:     1rem;
  --gov-section-gap: 2rem;
}

[data-gov-density="compact"] {
  --gov-cell-pad-y:  0.25rem;
  --gov-cell-pad-x:  0.5rem;
  --gov-row-gap:     0.5rem;
  --gov-section-gap: 1rem;
}
```

---

## Theme presets

Presets are compile-time only. Each preset is a standalone SCSS file that overrides
variables and then forwards to the base `govamt.scss`. No runtime switching.

Consumer usage — import one preset instead of the base styles:
```scss
// pick exactly one:
@import 'tiefamt/styles/presets/austria';
@import 'tiefamt/styles/presets/eu';
@import 'tiefamt/styles/presets/neutral';
// or the unstyled base:
@import 'tiefamt/styles/govamt';
```

Each preset file follows this structure:
```scss
// 1. override variables
$primary: #CE1126;
// ...

// 2. forward to base — which imports Bootstrap internals + all TiefAmt partials
@forward '../govamt';
```

---

### Preset: Austria (`presets/austria.scss`)

Federal Republic of Austria identity. Primary is Pantone 186 C exactly.
Warm off-white background, transitional serif body font, anthracite text.

```scss
// Primary — Pantone 186 C (Austrian flag red, exact)
$primary:          #CE1126;
$primary-dark:     #A50E1E;   // hover / active states
$primary-light:    #F2C4CB;   // tinted backgrounds, focus rings

// Neutrals — warm-shifted, never pure black or white
$secondary:        #6B6B69;
$body-bg:          #F7F5F0;   // warm cream, not white
$body-color:       #1C1C1B;   // warm near-black
$border-color:     #C8C4BC;

// Functional — warm-shifted to avoid clashing with the red primary
$success:          #2D6A2D;
$warning:          #C45C00;
$danger:           #8B0000;   // distinct from primary — darker, less saturated
$info:             #1A4A7A;

// Typography — transitional serif; federal Austrian comms use serif body text
$font-family-base:    "Source Serif 4", "Georgia", serif;
$font-family-heading: "Source Serif 4", "Georgia", serif;
$font-size-base:      0.9375rem;
$line-height-base:    1.6;
$headings-font-weight: 600;

// Geometry — same as base (flat, boxy)
$border-radius:    2px;
$border-radius-sm: 2px;
$border-radius-lg: 4px;

// Links — primary red, underlined (accessibility, formal documents)
$link-color:            $primary;
$link-hover-color:      $primary-dark;
$link-decoration:       underline;

// Tables — slightly warmer borders
$table-border-color:  #C8C4BC;
$table-striped-bg:    rgba(0, 0, 0, 0.02);
$table-hover-bg:      rgba(#CE1126, 0.04);

// Cards
$card-border-color: #C8C4BC;
$card-bg:           #FDFAF6;   // slightly warmer than body-bg for layering

@forward '../govamt';
```

---

### Preset: EU (`presets/eu.scss`)

European Union identity. Pantone 286 C blue primary, Pantone 116 C gold accent.
Cold white background, clinical sans-serif — EU documents are stark, not warm.
Gold is exposed as a CSS custom property `--gov-eu-gold` for accent use
(star motifs, decorative rules) — it is NOT mapped to a Bootstrap semantic color.

```scss
// Primary — Pantone 286 C (EU flag blue, exact)
$primary:       #003399;
$primary-dark:  #002277;
$primary-light: #C5D0F0;

// EU gold — Pantone 116 C
// NOT assigned to $warning — gold is decorative/identity, not a semantic state
// Exposed as a CSS custom property instead (see bottom of file)
$eu-gold:       #FFCC00;   // SCSS-only variable, used for the custom prop below

// Neutrals — cold, no warmth
$secondary:     #6C757D;
$body-bg:       #FFFFFF;   // EU documents use pure white
$body-color:    #212529;
$border-color:  #CED4DA;

// Functional
$success:       #1E7E34;
$warning:       #D39E00;   // amber, NOT the EU gold
$danger:        #BD2130;
$info:          #117A8B;

// Typography — EU officially uses Arial; Source Sans 3 is the acceptable alternative.
// No serif — EU documents are sans throughout.
$font-family-base:    "Source Sans 3", "Arial", "Helvetica Neue", sans-serif;
$font-family-heading: "Source Sans 3", "Arial", "Helvetica Neue", sans-serif;
$font-size-base:      0.9375rem;
$line-height-base:    1.55;
$headings-font-weight: 700;   // EU headings are heavier than Austrian

// Geometry
$border-radius:    2px;
$border-radius-sm: 2px;
$border-radius-lg: 4px;

// Links — blue, underlined
$link-color:       $primary;
$link-hover-color: $primary-dark;
$link-decoration:  underline;

// Tables
$table-border-color: #CED4DA;
$table-striped-bg:   rgba(0, 0, 0, 0.025);
$table-hover-bg:     rgba(#003399, 0.04);

@forward '../govamt';

// Expose EU gold as a custom property — available to components for
// decorative use (star rules, header accents) without polluting Bootstrap semantics
:root {
  --gov-eu-gold: #{$eu-gold};
}
```

---

### Preset: Neutral (`presets/neutral.scss`)

Generic government aesthetic. No national identity. Safe for internal tooling,
white-label products, or any context where Austria/EU branding is inappropriate.
Uses system font stack only — zero web font dependency.

```scss
// Primary — desaturated government navy, no strong national association
$primary:       #2B4270;
$primary-dark:  #1E2F52;
$primary-light: #C8D2E8;

// Neutrals — fully desaturated
$secondary:     #6C6C6C;
$body-bg:       #F5F5F5;
$body-color:    #1A1A1A;
$border-color:  #CCCCCC;

// Functional — standard, unsurprising
$success:       #276227;
$warning:       #C45C00;
$danger:        #B01C1C;
$info:          #1A5276;

// Typography — system stack, no web font loading at all
$font-family-base:    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                      "Helvetica Neue", Arial, sans-serif;
$font-family-heading: $font-family-base;
$font-size-base:      0.9375rem;
$line-height-base:    1.55;
$headings-font-weight: 600;

// Geometry
$border-radius:    2px;
$border-radius-sm: 2px;
$border-radius-lg: 4px;

// Links
$link-color:       $primary;
$link-hover-color: $primary-dark;
$link-decoration:  underline;

// Tables
$table-border-color: #CCCCCC;
$table-striped-bg:   rgba(0, 0, 0, 0.025);
$table-hover-bg:     rgba(#2B4270, 0.04);

@forward '../govamt';
```

---



```ts
// GovProvider.tsx
export type GovDensity = 'comfortable' | 'default' | 'compact'

export interface GovConfig {
  agencyName: string
  agencyLogo?: string
  density?: GovDensity
  locale?: string            // 'de-AT' default
}

export const GovContext = React.createContext<GovConfig>({ agencyName: '' })

export function GovProvider({ config, children }: {
  config: GovConfig
  children: React.ReactNode
}) {
  return (
    <GovContext.Provider value={config}>
      <div data-gov-density={config.density ?? 'default'}>
        {children}
      </div>
    </GovContext.Provider>
  )
}

export function useGovTheme() {
  return React.useContext(GovContext)
}
```

---

## Component contract (apply to every component)

All components must:

1. **Accept and forward `className`** — merge with internal classes using `clsx`
2. **Spread `...rest`** onto the underlying DOM element or React Bootstrap component
3. **Expose `bsProps`** for anything that needs to pass through specifically to the RB layer
4. **Never hard-code colors** — use SCSS variables or CSS custom properties only
5. **Export both named and default** from their `index.ts`

Example signature pattern:
```ts
export interface GovTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  caption?: string
  sortable?: boolean
  bsProps?: TableProps          // React Bootstrap Table props
}
```

---

## Component catalogue (build in this order)

### Foundation (build first — everything else depends on these)

| Priority | Component | Wraps | Notes |
|----------|-----------|-------|-------|
| 1 | `GovProvider` | — | Context + density attribute |
| 2 | `GovPage` | Container + Row + Col | Full page shell; header/sidebar/content/footer slots |
| 3 | `GovHeader` | Navbar | Two-bar layout: thin agency bar + nav bar |
| 4 | `GovBanner` | Alert | "Official website" notice; dismissible; hidden in dev |
| 5 | `GovFormGroup` | Form.Group | Label + input + hint + error, all a11y-wired |
| 6 | `GovTable` | Table | Dense mode, sort indicators, caption slot |
| 7 | `GovAlert` | Alert | Gov severity variants: info/warning/Erlass/Pflichthinweis |
| 8 | `GovBadge` | Badge | Fixed semantic variants: active/pending/revoked/… |
| 9 | `GovFooter` | — | Agency info, legal links |
| 10 | `GovNav` / `GovSidebar` | Nav | Vertical nav with section headings |

### DMS — workflow & state

| Priority | Component | Wraps | Notes |
|----------|-----------|-------|-------|
| 11 | `GovStatusBadge` | Badge | Encodes a document state machine visually. Fixed variants: `draft` `submitted` `under-review` `approved` `rejected` `returned`. Optional `previousStatus` prop renders a "was X → now Y" transition. Optional `timestamp`. |
| 12 | `GovWorkflowTracker` | — | Horizontal or vertical step indicator for approval chains. Supports parallel approvers, skipped steps, `returned` state. Driven by a `steps: WorkflowStep[]` prop — does not manage state itself. |
| 13 | `GovActionBar` | — | Sticky bar for document-level actions (Approve, Reject, Return, Request Info). `availableActions` prop is derived from current document status — invalid transitions are simply absent, not disabled. Destructive actions (Reject, Return) trigger a built-in confirmation dialog before firing `onAction`. |

### DMS — search & filtering

| Priority | Component | Wraps | Notes |
|----------|-----------|-------|-------|
| 14 | `GovSearchBar` | FormControl | Styled search input with filter chip row beneath. Built-in debounce (default 300ms, configurable). Clear button, loading spinner state. Fires `onSearch(query)`. |
| 15 | `GovFilterChip` | — | Individual active filter tag. Shows `label: value`. Dismissible via `onRemove`. Used inside `GovSearchBar`'s chip row and standalone. |
| 16 | `GovFilterPanel` | — | Collapsible sidebar or inline panel with labeled filter groups. Accepts a `filterSchema` prop defining groups (date range, doc type, status, unit). Outputs a typed `FilterState` object via `onChange`. |
| 17 | `GovDataTable` | Table | Promoted from `GovTable`. Adds: controlled sort state, pagination via `GovPagination`, row selection with count indicator, empty state slot (`renderEmpty`). This is the DMS workhorse. |

### DMS — document preview

| Priority | Component | Wraps | Notes |
|----------|-----------|-------|-------|
| 18 | `GovPageThumbnail` | — | Single-page preview tile. Accepts `src: string` (JPEG URL). Shows page number overlay, loading skeleton. Used inside cards and the page strip. |
| 19 | `GovDocumentCard` | Card | Grid/list card for a document. Shows: first-page thumbnail or file-type icon, title, `GovStatusBadge`, document type, date. Clickable; fires `onClick`. |
| 20 | `GovPdfViewer` | — | Two modes. `mode="jpeg"` (default, always available): renders a `pages: string[]` array as scrollable `<img>` tags with a `GovPageThumbnail` strip sidebar — zero extra dependencies. `mode="iframe"` (opt-in): renders the PDF URL inside a sandboxed `<iframe>` — no library dependency, but must be explicitly enabled by the consumer via the `enableIframe` prop; the component renders the JPEG fallback and logs a warning if `enableIframe` is not set. Never silently fall back — always be explicit about which mode is active. Always include a page counter slot (JPEG mode) and a download button slot (both modes). |
| 21 | `GovDocumentDrawer` | Offcanvas | Slides in from the right on document selection. Composition point: contains metadata header, `GovStatusBadge`, `GovWorkflowTracker`, `GovActionBar`, and a `renderPreview` slot (typically `GovPdfViewer`). `onAction` callback bubbles up from `GovActionBar` — app logic stays outside TiefAmt. |

---

## Key prop interfaces (DMS components)

```ts
// Workflow state machine
export type GovDocumentStatus =
  | 'draft' | 'submitted' | 'under-review'
  | 'approved' | 'rejected' | 'returned'

export type GovWorkflowAction =
  | 'submit' | 'approve' | 'reject' | 'return' | 'request-info' | 'retract'

// Valid transitions — GovActionBar derives available actions from this
export const WORKFLOW_TRANSITIONS: Record<GovDocumentStatus, GovWorkflowAction[]> = {
  'draft':        ['submit', 'retract'],
  'submitted':    ['approve', 'reject', 'return', 'request-info'],
  'under-review': ['approve', 'reject', 'return', 'request-info'],
  'approved':     [],
  'rejected':     [],
  'returned':     ['submit', 'retract'],
}

export interface WorkflowStep {
  id: string
  label: string
  status: 'pending' | 'active' | 'complete' | 'skipped' | 'returned'
  assignee?: string
  completedAt?: string   // ISO date string
}

// GovDocumentDrawer
export interface GovDocumentDrawerProps {
  show: boolean
  onHide: () => void
  document: {
    id: string
    title: string
    type: string
    status: GovDocumentStatus
    date: string
    workflowSteps?: WorkflowStep[]
  }
  onAction: (action: GovWorkflowAction, documentId: string) => void
  renderPreview?: () => React.ReactNode   // slot for GovPdfViewer
}

// GovPdfViewer
export type GovPdfViewerMode = 'jpeg' | 'iframe'

export interface GovPdfViewerProps {
  mode: GovPdfViewerMode
  pages?: string[]           // jpeg mode: array of image URLs, one per page
  pdfUrl?: string            // iframe mode: URL passed as <iframe src>
  enableIframe?: boolean     // must be explicitly true for mode="iframe" to activate;
                             // if false/absent with mode="iframe", falls back to jpeg
                             // and emits a console.warn — never silently switches modes
  iframeTitle?: string       // accessible title for the iframe element
  iframeSandbox?: string     // sandbox attribute; default: "allow-scripts allow-same-origin"
  initialPage?: number       // jpeg mode only
  onPageChange?: (page: number) => void  // jpeg mode only
  downloadUrl?: string       // renders a download button if provided (both modes)
  height?: string            // iframe mode: container height, default "100%"
}

// GovDataTable (generic)
export interface GovDataTableProps<T> {
  data: T[]
  columns: GovColumnDef<T>[]
  totalCount: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  renderEmpty?: () => React.ReactNode
  caption?: string
}

export interface GovColumnDef<T> {
  key: string
  header: string
  render: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

// GovFilterPanel
export interface FilterFieldSchema {
  key: string
  label: string
  type: 'text' | 'select' | 'daterange' | 'multiselect'
  options?: { label: string; value: string }[]   // for select/multiselect
}

export interface GovFilterPanelProps {
  schema: FilterFieldSchema[]
  value: Record<string, unknown>
  onChange: (filters: Record<string, unknown>) => void
  collapsible?: boolean
}
```

---

## Barrel export (`src/index.ts`)

Export everything from here. Components, types, hooks, and the provider.
Keep it clean — one export per component file, re-exported here.

---

## Bun scripts (root `package.json`)

```json
{
  "scripts": {
    "build":   "cd packages/tiefamt && bun run build",
    "dev":     "cd packages/tiefamt && bun run build --watch",
    "storybook": "cd packages/tiefamt-storybook && bun storybook",
    "typecheck": "tsc --noEmit -p packages/tiefamt/tsconfig.json",
    "lint":    "bunx eslint packages/tiefamt/src"
  },
  "workspaces": ["packages/*"]
}
```

---

## What NOT to do

- Do not install or reference npm/yarn/pnpm at any point
- Do not add CSS-in-JS (no styled-components, no emotion)
- Do not add a runtime theme-switching mechanism beyond density — color themes are a compile-time SCSS concern
- Do not wrap every Bootstrap component — only wrap where TiefAmt adds genuine value
- Do not ship Bootstrap or React Bootstrap in the bundle — they are peer dependencies
- Do not make `GovDocumentDrawer` manage workflow state — it renders state, fires callbacks, nothing else
- Do not add `react-pdf` or any PDF parsing library — `GovPdfViewer` uses native browser `<iframe>` or prerendered JPEGs only
- Do not activate `mode="iframe"` unless `enableIframe={true}` is explicitly set — fall back to JPEG and warn
- Do not set permissive iframe sandbox attributes by default — the consumer must opt in to broader permissions
- Do not invent workflow transitions at runtime — `WORKFLOW_TRANSITIONS` is the source of truth; `GovActionBar` reads from it
- Do not put business logic (API calls, state management) inside any component
