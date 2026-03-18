# @tiefamt/core

> Let's quickly vibe code a little UI library!

Well turns out, quickly, UI library and vibe coding have circles in the venn diagram that are so far apart, the influence of gravity on each other is negligable.

React UI components for government/bureaucratic interfaces. Built on React Bootstrap. Looks exactly as joyless as the forms you're building with it — by design.

---

## Install

```bash
bun add @tiefamt/core react react-dom react-bootstrap bootstrap
```

You also need styles. Either import the unstyled base from this package, or pick a themed preset from [`@tiefamt/styles`](../styles/README.md):

```ts
// unstyled base (dark navy, no national identity)
import '@tiefamt/core/styles'
```

Bootstrap's own CSS is your problem. Peer dependency. You know what to do.

---

## Setup

Wrap your app in `GovProvider`. This is not optional — it sets the `data-gov-density` attribute that the CSS custom properties depend on, and feeds agency config into context.

```tsx
import { GovProvider } from '@tiefamt/core'

<GovProvider config={{
  agencyName: 'Bundesministerium für Digitalisierung',
  density: 'default',   // 'comfortable' | 'default' | 'compact'
  locale: 'de-AT',
}}>
  <App />
</GovProvider>
```

`density` controls spacing via CSS tokens — no class names, no rerenders, just a `data-` attribute on a wrapper div. Pick `compact` for dashboards drowning in data, `comfortable` for when you want the page to breathe.

---

## Page shell

```tsx
import { GovPage, GovHeader, GovBanner, GovSidebar, GovFooter } from '@tiefamt/core'

<GovPage
  header={<GovHeader />}
  banner={<GovBanner />}
  sidebar={<GovSidebar sections={navSections} />}
  footer={<GovFooter links={legalLinks} />}
>
  <main>your content here</main>
</GovPage>
```

`GovHeader` renders a two-bar layout: a thin agency identity strip on top, navigation below. Pass children for nav items.

`GovBanner` is the "this is an official website" notice. Dismissible. Hidden in development by default — pass `forceShow` to override.

`GovSidebar` / `GovNav` take a `sections` array with headings and items. Nothing fancy.

`GovFooter` takes a `links` array. Impressum, Datenschutz, the usual.

---

## Foundation components

### `GovFormGroup`

Label + input + hint + error in one go, with all the `aria-` attributes wired up so you don't have to think about it.

```tsx
<GovFormGroup inputId="aktenzeichen" label="Aktenzeichen" hint="Format: AZ-YYYY-NNN">
  <Form.Control type="text" id="aktenzeichen" />
</GovFormGroup>
```

Pass `error` to show a validation message. The component handles `aria-describedby` across hint and error automatically.

### `GovAlert`

Bootstrap's `Alert` with extra severity variants for government use.

```tsx
<GovAlert variant="erlass" heading="Erlass 2024/001">
  Geltungsbereich ab 01.01.2025.
</GovAlert>
```

Variants: `info` `warning` `erlass` `pflichthinweis` — and all the standard Bootstrap ones still work.

### `GovTable`

Dense, formal table. Columns are typed. Rows get a `rowKey` function for React keys so you don't forget and trigger a wall of warnings.

```tsx
const columns: GovColumn<Row>[] = [
  { key: 'id', header: 'Aktenzeichen' },
  { key: 'status', header: 'Status', render: (v) => <GovBadge variant={v} /> },
]

<GovTable columns={columns} data={rows} rowKey={(r) => r.id} caption="Eingaben 2024" />
```

Need pagination, sorting, and row selection? That's `GovDataTable` — see below.

### `GovBadge`

Fixed semantic variants only. No inventing your own.

```tsx
<GovBadge variant="active" />
<GovBadge variant="pending" />
<GovBadge variant="revoked" />
```

---

## Workflow & document state

These exist because government software lives and dies by document lifecycles and nobody should have to build this for the fifth time.

### `GovStatusBadge`

Renders a document status with optional transition context and timestamp.

```tsx
<GovStatusBadge
  status="under-review"
  previousStatus="submitted"
  timestamp="2026-03-12T10:00:00Z"
/>
```

Valid statuses: `draft` `submitted` `under-review` `approved` `rejected` `returned`.

### `GovWorkflowTracker`

Horizontal or vertical step indicator for approval chains. Supports parallel approvers, skipped steps, and the `returned` state. Completely stateless — you manage the data, it manages the pixels.

```tsx
<GovWorkflowTracker
  orientation="horizontal"
  steps={[
    { id: '1', label: 'Einreichung', status: 'complete', completedAt: '2026-03-10' },
    { id: '2', label: 'Sachbearbeitung', status: 'active', assignee: 'Mag. Hofbauer' },
    { id: '3', label: 'Genehmigung', status: 'pending' },
  ]}
/>
```

### `GovActionBar`

Sticky action bar for document-level operations. Derives which actions are available from the current document status — it reads `WORKFLOW_TRANSITIONS` so you don't have to. Actions that aren't valid for the current status simply don't appear. Destructive actions (Reject, Return) show a confirmation dialog before firing `onAction`.

```tsx
<GovActionBar
  documentStatus={doc.status}
  onAction={(action) => handleWorkflow(action, doc.id)}
/>
```

`WORKFLOW_TRANSITIONS` is exported if you need it for your own logic.

---

## Search & filtering

### `GovSearchBar`

Search input with debounce, clear button, loading spinner, and an active filter chip row beneath it.

```tsx
<GovSearchBar
  onSearch={(query) => setQuery(query)}
  debounce={300}
  loading={isFetching}
  chips={activeChips}
/>
```

Build the chips array from your active filter state. Each chip owns its own `onRemove`:

```tsx
const chips: GovFilterChipProps[] = activeFilters.map((f) => ({
  label: f.label,
  value: f.value,
  onRemove: () => removeFilter(f.key),
}))
```

### `GovFilterPanel`

Collapsible filter panel driven by a schema. Define your filter groups, bind `value` and `onChange`, and you're done.

```tsx
<GovFilterPanel
  schema={[
    { key: 'status', label: 'Status', type: 'multiselect', options: statusOptions },
    { key: 'date',   label: 'Datum',  type: 'daterange' },
    { key: 'type',   label: 'Typ',    type: 'select', options: typeOptions },
  ]}
  value={filters}
  onChange={setFilters}
  collapsible
/>
```

Field types: `text` `select` `multiselect` `daterange`.

### `GovDataTable`

The DMS workhorse. Adds controlled sort, pagination, row selection with count indicator, and an empty-state slot on top of `GovTable`. Column `render` functions receive the full row, not the cell value.

```tsx
const columns: GovColumnDef<Row>[] = [
  { key: 'id',     header: 'Aktenzeichen', render: (row) => row.id },
  { key: 'status', header: 'Status',       render: (row) => <GovStatusBadge status={row.status} />, sortable: true },
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

## Document preview

### `GovPdfViewer`

Two modes. Pick one explicitly — the component will not silently switch on you.

**`mode="jpeg"`** (default): renders prerendered JPEG pages as scrollable images with a thumbnail strip sidebar. Zero PDF dependencies. Your backend renders the pages.

```tsx
<GovPdfViewer mode="jpeg" pages={jpegUrls} downloadUrl="/doc.pdf" />
```

**`mode="iframe"`**: renders the PDF in a sandboxed `<iframe>`. You must pass `enableIframe={true}` to activate it. If you don't, it falls back to JPEG mode and logs a warning — loudly, on purpose.

```tsx
<GovPdfViewer mode="iframe" pdfUrl="/doc.pdf" enableIframe downloadUrl="/doc.pdf" />
```

No `react-pdf`, no PDF.js, no extra megabytes. The browser already knows how to show a PDF. Let it.

### `GovDocumentCard`

Grid or list card for a document. Shows the first-page thumbnail or a file-type icon, title, `GovStatusBadge`, document type, and date. Fires `onClick`.

```tsx
<GovDocumentCard document={doc} onClick={(id) => openDrawer(id)} />
```

### `GovDocumentDrawer`

Slides in from the right on document selection. Composes the metadata header, `GovStatusBadge`, `GovWorkflowTracker`, `GovActionBar`, and a `renderPreview` slot. State management stays outside — this component renders and fires callbacks, nothing else.

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
| `useGovSearch(opts)` | Debounced search + filter state, ready to bind to `GovSearchBar` + `GovFilterPanel` |
| `useGovDocumentDrawer()` | Open/close state and selected document for `GovDocumentDrawer` |

---

## Types

Everything is exported. The ones you'll actually need:

```ts
import type {
  GovDocumentStatus,
  GovWorkflowAction,
  WorkflowStep,
  GovColumn,
  GovColumnDef,
  FilterFieldSchema,
} from '@tiefamt/core'

// The state machine itself, if your app logic needs it
import { WORKFLOW_TRANSITIONS } from '@tiefamt/core'
```

---

## All components accept `className` and `...rest`

Every component forwards `className` (merged with internal classes via `clsx`) and spreads `...rest` onto the underlying element. Where React Bootstrap props need to pass through, use `bsProps`. You can always reach the DOM.
