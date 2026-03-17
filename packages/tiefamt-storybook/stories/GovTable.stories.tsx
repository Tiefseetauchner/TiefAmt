import '../../core/src/styles/govamt.scss';
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { GovBadge, GovProvider, GovTable } from '@tiefamt/core'
import type { GovColumn, SortDirection } from '@tiefamt/core'

const meta: Meta<typeof GovTable> = {
  title: 'Components/GovTable',
  component: GovTable,
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

interface Antrag {
  id: string
  name: string
  datum: string
  status: 'active' | 'pending' | 'revoked' | 'expired' | 'draft' | 'approved'
}

const DATA: Antrag[] = [
  { id: 'AZ-2026-001', name: 'Mustermann, Max', datum: '12.01.2026', status: 'active' },
  { id: 'AZ-2026-002', name: 'Musterfrau, Maria', datum: '15.01.2026', status: 'pending' },
  { id: 'AZ-2025-099', name: 'Testperson, Hans', datum: '30.12.2025', status: 'approved' },
  { id: 'AZ-2025-050', name: 'Beispiel, Erika', datum: '01.07.2025', status: 'expired' },
]

const COLUMNS: GovColumn<Antrag>[] = [
  { key: 'id', header: 'Aktenzeichen', sortable: true },
  { key: 'name', header: 'Antragsteller', sortable: true },
  { key: 'datum', header: 'Datum', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (value) => <GovBadge variant={value as Antrag['status']} />,
  },
]

type Story = StoryObj<typeof GovTable>

export const Default: Story = {
  args: {
    columns: COLUMNS,
    data: DATA,
    caption: 'Anträge — Übersicht',
    rowKey: (row: Antrag) => row.id,
  },
}

export const Sortable: Story = {
  render: () => {
    const [sortCol, setSortCol] = useState<string>('id')
    const [sortDir, setSortDir] = useState<SortDirection>('asc')

    function handleSort(col: string, dir: SortDirection) {
      setSortCol(col)
      setSortDir(dir)
    }

    const sorted = [...DATA].sort((a, b) => {
      if (sortDir === 'none') return 0
      const av = (a as Record<string, string>)[sortCol] ?? ''
      const bv = (b as Record<string, string>)[sortCol] ?? ''
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })

    return (
      <GovTable
        columns={COLUMNS}
        data={sorted}
        caption="Anträge — sortierbar"
        rowKey={(row: Antrag) => row.id}
        sortable
        sortColumn={sortCol}
        sortDirection={sortDir}
        onSort={handleSort}
      />
    )
  },
}
