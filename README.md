# TiefAmt

> Let's quickly vibe code a little UI library!

Well turns out, quickly, UI library and vibe coding have circles in the venn diagram that are so far apart, the influence of gravity on each other is negligable.

This is a React UI component library providing a government/bureaucratic aesthetic built on React Bootstrap. Published as a scoped monorepo under the `@tiefamt` org.

## Packages

| Package | Description |
|---------|-------------|
| `@tiefamt/core` | Components, hooks, base styles |
| `@tiefamt/styles` | Compiled CSS presets (Austria, EU, Neutral) |

---

## Install

```bash
bun add @tiefamt/core @tiefamt/styles react react-dom react-bootstrap bootstrap
```

Import styles — pick exactly one preset, or the unstyled base:

```ts
// from @tiefamt/styles — pick one:
import '@tiefamt/styles/presets/austria'  // Republik Österreich (Pantone 186 C red)
import '@tiefamt/styles/presets/eu'       // European Union (Pantone 286 C blue + Pantone 116 C gold)
import '@tiefamt/styles/presets/neutral'  // Generic government, no national identity

// or the base styles with no preset (from @tiefamt/core):
import '@tiefamt/core/styles'
```

---

## Setup

Wrap your app in `GovProvider` — it sets density and exposes agency config via context.

```tsx
import { GovProvider } from '@tiefamt/core'

<GovProvider config={{ agencyName: 'Bundesministerium', density: 'default', locale: 'de-AT' }}>
  <App />
</GovProvider>
```

`density` accepts `'comfortable'`, `'default'`, or `'compact'`.

---

## Foundation

### `GovPage`

Full-page shell with named slots for header, banner, sidebar, content, and footer.

```tsx
<GovPage header={<GovHeader />} banner={<GovBanner />} sidebar={<GovSidebar />} footer={<GovFooter />}>
  <main>…</main>
</GovPage>
```

### `GovHeader`

Two-bar navbar: a thin agency identity bar on top, main navigation below. Accepts children for custom nav content.

```tsx
<GovHeader>
  <Nav className="ms-auto gap-1">
    <Nav.Link href="/akten">Akten</Nav.Link>
  </Nav>
</GovHeader>
```

### `GovBanner`

"Official website" notice bar — dismissible, hidden in development. Pass `forceShow` to display in dev/test environments.

```tsx
<GovBanner forceShow>Dies ist eine Testseite.</GovBanner>
```

### `GovAlert`

Government severity variants beyond Bootstrap's defaults: `info`, `warning`, `erlass`, `pflichthinweis`.

```tsx
<GovAlert variant="erlass" heading="Erlass 2024/001">Text</GovAlert>
```

### `GovBadge`

Fixed semantic badge variants: `active`, `pending`, `approved`, `revoked`, and others.

```tsx
<GovBadge variant="active" />
```

### `GovFormGroup`

Label + input + hint + error, all accessibility-wired. Pass the input as a child.

```tsx
<GovFormGroup inputId="aktenzeichen" label="Aktenzeichen" hint="Format: AZ-YYYY-NNN">
  <Form.Control type="text" />
</GovFormGroup>
```

### `GovTable`

Dense, formal table. Accepts typed `columns` and `data` props; a `rowKey` function for React keys; and an optional `caption`.

```tsx
const columns: GovColumn<Row>[] = [
  { key: 'id', header: 'Aktenzeichen' },
  { key: 'name', header: 'Antragsteller' },
  { key: 'status', header: 'Status', render: (v) => <GovBadge variant={v} /> },
]

<GovTable columns={columns} data={rows} rowKey={(r) => r.id} caption="Eingaben 2024" />
```

### `GovFooter`

Agency info and legal links.

```tsx
<GovFooter
  links={[
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ]}
/>
```

### `GovNav` / `GovSidebar`

Vertical navigation with section headings.

```tsx
<GovSidebar sections={[
  {
    heading: 'Hauptnavigation',
    items: [{ label: 'Anträge', href: '/antraege' }],
  },
]} />
```

---

## Workflow & State (DMS)

### `GovStatusBadge`

Encodes a document state machine visually. Optionally shows a `previousStatus → currentStatus` transition and a timestamp.

```tsx
<GovStatusBadge status="under-review" previousStatus="submitted" timestamp="2026-03-12T10:00:00Z" />
```

Variants: `draft` `submitted` `under-review` `approved` `rejected` `returned`.

### `GovWorkflowTracker`

Horizontal or vertical step indicator for approval chains. Supports parallel approvers, skipped steps, and the `returned` state. Stateless — driven entirely by props.

```tsx
<GovWorkflowTracker
  steps={[
    { id: '1', label: 'Einreichung', status: 'complete', completedAt: '2026-03-10' },
    { id: '2', label: 'Sachbearbeitung', status: 'active', assignee: 'Mag. Hofbauer' },
    { id: '3', label: 'Genehmigung', status: 'pending' },
  ]}
/>
```

### `GovActionBar`

Sticky bar for document-level actions. Derives available actions from the current document status — invalid transitions are simply absent, not disabled. Destructive actions (Reject, Return) show a built-in confirmation dialog before firing `onAction`.

```tsx
<GovActionBar
  documentStatus={doc.status}
  onAction={(action) => handleWorkflow(action, doc.id)}
/>
```

Valid actions per status are defined by `WORKFLOW_TRANSITIONS` — exported from the package for reference.

---

## Search & Filtering

### `GovSearchBar`

Styled search input with an active filter chip row. Built-in debounce (default 300 ms). Shows a clear button and a loading spinner state.

```tsx
<GovSearchBar
  onSearch={(query) => setQuery(query)}
  debounce={300}
  loading={isFetching}
  chips={activeChips}
/>
```

Each chip in `chips` carries its own `onRemove` — pass it when building the array:

```tsx
const chips: GovFilterChipProps[] = activeFilters.map((f) => ({
  label: f.label,
  value: f.value,
  onRemove: () => removeFilter(f.key),
}))
```

### `GovFilterChip`

Individual active-filter tag showing `label: value`. Dismissible.

```tsx
<GovFilterChip label="Status" value="Genehmigt" onRemove={() => clearStatus()} />
```

### `GovFilterPanel`

Collapsible sidebar or inline panel with labeled filter groups. Accepts a `filterSchema` defining groups (text, select, multiselect, date range). Outputs a typed `FilterState` via `onChange`.

```tsx
<GovFilterPanel
  schema={[
    { key: 'status', label: 'Status', type: 'multiselect', options: statusOptions },
    { key: 'date', label: 'Datum', type: 'daterange' },
  ]}
  value={filters}
  onChange={setFilters}
  collapsible
/>
```

### `GovDataTable`

The DMS workhorse. Builds on `GovTable` with controlled sort, pagination, row selection with count indicator, and an empty-state slot.

Note: `GovDataTable` uses `GovColumnDef<T>` for its columns, not `GovColumn<T>`. The `render` function receives the full row, not the cell value:

```tsx
const columns: GovColumnDef<Row>[] = [
  { key: 'id', header: 'Aktenzeichen', render: (row) => row.id },
  { key: 'status', header: 'Status', render: (row) => <GovStatusBadge status={row.status} />, sortable: true },
]

<GovDataTable
  data={rows}
  columns={columns}
  totalCount={total}
  page={page}
  pageSize={25}
  onPageChange={setPage}
  sortColumn="date"
  sortDirection="desc"
  onSortChange={handleSort}
  rowId={(row) => row.id}
  selectedIds={selected}
  onSelectionChange={setSelected}
  renderEmpty={() => <p>Keine Ergebnisse.</p>}
/>
```

---

## Document Preview

### `GovPageThumbnail`

Single-page preview tile. Accepts a JPEG URL, shows a page number overlay and a loading skeleton.

```tsx
<GovPageThumbnail src="/previews/page-1.jpg" pageNumber={1} />
```

### `GovDocumentCard`

Grid or list card for a document. Shows the first-page thumbnail (or file-type icon), title, `GovStatusBadge`, document type, and date. Fires `onClick`.

```tsx
<GovDocumentCard document={doc} onClick={(id) => openDrawer(id)} />
```

### `GovPdfViewer`

Two modes:

- **`mode="jpeg"`** (default, always available) — renders a `pages: string[]` array of JPEG URLs as scrollable images with a thumbnail strip sidebar. Zero extra dependencies.
- **`mode="iframe"`** — renders the PDF in a sandboxed `<iframe>`. Must be explicitly enabled with `enableIframe={true}`; falls back to JPEG and logs a warning otherwise.

```tsx
// JPEG mode
<GovPdfViewer mode="jpeg" pages={jpegPages} downloadUrl="/doc.pdf" />

// iframe mode (opt-in)
<GovPdfViewer mode="iframe" pdfUrl="/doc.pdf" enableIframe downloadUrl="/doc.pdf" />
```

### `GovDocumentDrawer`

Slides in from the right on document selection. Composes metadata header, `GovStatusBadge`, `GovWorkflowTracker`, `GovActionBar`, and a `renderPreview` slot. State management stays outside — this component only renders and fires callbacks.

```tsx
<GovDocumentDrawer
  show={drawerOpen}
  onHide={() => setDrawerOpen(false)}
  document={selectedDoc}
  onAction={(action, id) => handleWorkflow(action, id)}
  renderPreview={() => <GovPdfViewer mode="jpeg" pages={pages} />}
/>
```

---

## Hooks

| Hook | Purpose |
|------|---------|
| `useGovTheme()` | Returns the current `GovConfig` from context |
| `useGovSearch(opts)` | Debounced search + filter state management |
| `useGovDocumentDrawer()` | Open/close + selected document state for `GovDocumentDrawer` |

---

## Types

Key types exported from `@tiefamt/core`:

```ts
import type {
  GovDocumentStatus,
  GovWorkflowAction,
  WorkflowStep,
  GovColumn,
} from '@tiefamt/core'

import { WORKFLOW_TRANSITIONS } from '@tiefamt/core'
```

---

## Development

This repo uses [Bun](https://bun.sh) workspaces. Do not use npm, yarn, or pnpm.

```bash
bun install          # install all workspace deps
bun run build        # build @tiefamt/core and @tiefamt/styles
bun run dev          # build core in watch mode
bun run storybook    # start Storybook
bun run test         # starts the nextjs test website
bun run typecheck    # tsc --noEmit on core
```

### Test app

`packages/tiefamt-test` is a Next.js 15 app that renders all four presets side by side against a realistic demo layout. It is not published to npm.

```bash
bun run test
```

Routes:

| Route | Preset |
|-------|--------|
| `/` | Index — links to all presets |
| `/base` | Base styles only, no national identity |
| `/austria` | Republik Österreich (Pantone 186 C red) |
| `/eu` | European Union (Pantone 286 C blue + Pantone 116 C gold) |
| `/neutral` | Generic government, system font stack |
