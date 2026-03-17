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
│   │   │   │   ├── GovFormGroup/
│   │   │   │   ├── GovBadge/
│   │   │   │   ├── GovFooter/
│   │   │   │   ├── GovSidebar/
│   │   │   │   └── GovNav/
│   │   │   ├── hooks/
│   │   │   │   └── useGovTheme.ts
│   │   │   ├── utils/
│   │   │   │   └── govClassNames.ts
│   │   │   └── styles/
│   │   │       ├── govamt.scss        ← main SCSS entry point
│   │   │       ├── _variables.scss    ← Bootstrap variable overrides
│   │   │       ├── _typography.scss
│   │   │       ├── _density.scss      ← CSS custom property tokens
│   │   │       └── _components.scss   ← component-level overrides
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
    "./styles": "./dist/govamt.css"
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
  entry: ['src/index.ts'],
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

## Context & provider

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

## Component catalogue (MVP — build in this order)

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
