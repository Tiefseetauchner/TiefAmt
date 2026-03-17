# TiefAmt

A React UI component library providing a government/bureaucratic aesthetic (EU/Austrian style), built on React Bootstrap.

## Install

```bash
npm install tiefamt react react-dom react-bootstrap bootstrap
```

Import styles — pick exactly one preset:

```ts
import 'tiefamt/styles/presets/austria'  // Republik Österreich (red)
import 'tiefamt/styles/presets/eu'       // European Union (blue + gold)
import 'tiefamt/styles/presets/neutral'  // Generic government, no national identity
// or the unstyled base:
import 'tiefamt/styles'
```

---

## Setup

Wrap your app in `GovProvider` — it sets density and exposes agency config via context.

```tsx
import { GovProvider } from 'tiefamt'

<GovProvider config={{ agencyName: 'Bundesministerium', density: 'default', locale: 'de-AT' }}>
  <App />
</GovProvider>
```

`density` accepts `'comfortable'`, `'default'`, or `'compact'`.

---

## Foundation

### `GovPage`

Full-page shell with named slots for header, sidebar, content, and footer.

```tsx
<GovPage header={<GovHeader />} sidebar={<GovSidebar />} footer={<GovFooter />}>
  <main>…</main>
</GovPage>
```

### `GovHeader`

Two-bar navbar: a thin agency identity bar on top, main navigation below.

```tsx
<GovHeader agencyName="BM Inneres" navItems={[{ label: 'Akten', href: '/akten' }]} />
```

### `GovBanner`

"Official website" notice bar — dismissible, hidden in development.

```tsx
<GovBanner />
```

### `GovAlert`

Government severity variants beyond Bootstrap's defaults: `info`, `warning`, `erlass`, `pflichthinweis`.

```tsx
<GovAlert variant="erlass" heading="Erlass 2024/001">Text</GovAlert>
```

### `GovBadge`

Fixed semantic badge variants: `active`, `pending`, `revoked`, and others.

```tsx
<GovBadge variant="active">Aktiv</GovBadge>
```

### `GovFormGroup`

Label + input + hint + error, all accessibility-wired.

```tsx
<GovFormGroup label="Aktenzeichen" hint="Format: XX/YYYY" error={errors.az}>
  <Form.Control name="az" />
</GovFormGroup>
```

### `GovTable`

Dense, formal table with optional sort indicators and a caption slot.

```tsx
<GovTable caption="Eingaben 2024" sortable>…</GovTable>
```

### `GovFooter`

Agency info and legal links.

```tsx
<GovFooter agencyName="BM Inneres" links={[{ label: 'Impressum', href: '/impressum' }]} />
```

### `GovNav` / `GovSidebar`

Vertical navigation with section headings.

```tsx
<GovSidebar>
  <GovNav items={navItems} />
</GovSidebar>
```

---

## Workflow & State (DMS)

### `GovStatusBadge`

Encodes a document state machine visually. Optionally shows a `previousStatus → currentStatus` transition and a timestamp.

```tsx
<GovStatusBadge status="under-review" previousStatus="submitted" timestamp="2024-11-01T10:00:00Z" />
```

Variants: `draft` `submitted` `under-review` `approved` `rejected` `returned`.

### `GovWorkflowTracker`

Horizontal or vertical step indicator for approval chains. Supports parallel approvers, skipped steps, and the `returned` state. Stateless — driven entirely by props.

```tsx
<GovWorkflowTracker
  orientation="horizontal"
  steps={[
    { id: '1', label: 'Eingang', status: 'complete' },
    { id: '2', label: 'Prüfung', status: 'active', assignee: 'M. Huber' },
    { id: '3', label: 'Genehmigung', status: 'pending' },
  ]}
/>
```

### `GovActionBar`

Sticky bar for document-level actions. Derives available actions from the current document status — invalid transitions are simply absent, not disabled. Destructive actions (Reject, Return) show a built-in confirmation dialog before firing `onAction`.

```tsx
<GovActionBar
  documentId={doc.id}
  status={doc.status}
  onAction={(action, id) => handleWorkflow(action, id)}
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
  debounceMs={300}
  loading={isFetching}
  chips={activeChips}
  onRemoveChip={(key) => removeFilter(key)}
/>
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

```tsx
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
<GovDocumentCard
  document={doc}
  onClick={(id) => openDrawer(id)}
/>
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

Key types exported from the package:

```ts
import type {
  GovDocumentStatus,
  GovWorkflowAction,
  WorkflowStep,
  GovColumnDef,
  FilterFieldSchema,
  GovPdfViewerMode,
} from 'tiefamt'

import { WORKFLOW_TRANSITIONS } from 'tiefamt'
```
