import '../../core/src/styles/govamt.scss';
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { GovFilterChip, GovFilterPanel, GovProvider, GovSearchBar } from '@tiefamt/core'
import type { FilterFieldSchema } from '@tiefamt/core'

const meta: Meta = {
  title: 'DMS/Search & Filter',
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ maxWidth: '480px', padding: '1.5rem' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
}
export default meta

export const SearchBar: StoryObj = {
  render: () => {
    const [query, setQuery] = useState('')
    return (
      <GovSearchBar
        value={query}
        onSearch={setQuery}
        chips={
          query
            ? [{ label: 'Suche', value: query, onRemove: () => setQuery('') }]
            : []
        }
      />
    )
  },
}

export const FilterChips: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <GovFilterChip label="Status" value="In Prüfung" onRemove={() => {}} />
      <GovFilterChip label="Typ" value="Bescheid" onRemove={() => {}} />
      <GovFilterChip label="Datum" value="01.01–31.03.2026" onRemove={() => {}} />
    </div>
  ),
}

const SCHEMA: FilterFieldSchema[] = [
  { key: 'status', label: 'Status', type: 'select', options: [
    { label: 'Entwurf', value: 'draft' },
    { label: 'Eingereicht', value: 'submitted' },
    { label: 'Genehmigt', value: 'approved' },
  ]},
  { key: 'docType', label: 'Dokumenttyp', type: 'multiselect', options: [
    { label: 'Bescheid', value: 'bescheid' },
    { label: 'Antrag', value: 'antrag' },
    { label: 'Erlass', value: 'erlass' },
  ]},
  { key: 'dateRange', label: 'Zeitraum', type: 'daterange' },
]

export const FilterPanel: StoryObj = {
  render: () => {
    const [filters, setFilters] = useState<Record<string, unknown>>({})
    return (
      <>
        <GovFilterPanel schema={SCHEMA} value={filters} onChange={setFilters} collapsible />
        <pre style={{ marginTop: '1rem', fontSize: '0.75rem' }}>
          {JSON.stringify(filters, null, 2)}
        </pre>
      </>
    )
  },
}
