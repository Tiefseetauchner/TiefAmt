import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { GovDataTable, GovProvider, GovStatusBadge } from 'tiefamt'
import type { GovColumnDef, GovDocumentStatus } from 'tiefamt'

interface Doc {
  id: string
  title: string
  type: string
  status: GovDocumentStatus
  date: string
}

const ALL_DOCS: Doc[] = Array.from({ length: 23 }, (_, i) => ({
  id: `AZ-2026-${String(i + 1).padStart(3, '0')}`,
  title: `Dokument ${i + 1}`,
  type: i % 3 === 0 ? 'Bescheid' : i % 3 === 1 ? 'Antrag' : 'Erlass',
  status: (['draft', 'submitted', 'under-review', 'approved', 'rejected'] as GovDocumentStatus[])[i % 5],
  date: `${String((i % 28) + 1).padStart(2, '0')}.01.2026`,
}))

const COLS: GovColumnDef<Doc>[] = [
  { key: 'id', header: 'Aktenzeichen', render: (r) => r.id, sortable: true },
  { key: 'title', header: 'Titel', render: (r) => r.title, sortable: true },
  { key: 'type', header: 'Typ', render: (r) => r.type },
  { key: 'status', header: 'Status', render: (r) => <GovStatusBadge status={r.status} /> },
  { key: 'date', header: 'Datum', render: (r) => r.date },
]

const meta: Meta = {
  title: 'DMS/GovDataTable',
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ padding: '1.5rem' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
}
export default meta

export const Default: StoryObj = {
  render: () => {
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState<string[]>([])
    const pageSize = 5
    const paged = ALL_DOCS.slice((page - 1) * pageSize, page * pageSize)

    return (
      <GovDataTable
        data={paged}
        columns={COLS}
        totalCount={ALL_DOCS.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        rowId={(r) => r.id}
        selectedIds={selected}
        onSelectionChange={setSelected}
        caption="Vorgänge"
      />
    )
  },
}

export const Empty: StoryObj = {
  render: () => (
    <GovDataTable
      data={[]}
      columns={COLS}
      totalCount={0}
      page={1}
      pageSize={5}
      onPageChange={() => {}}
      renderEmpty={() => 'Keine Dokumente gefunden.'}
      caption="Leere Tabelle"
    />
  ),
}
