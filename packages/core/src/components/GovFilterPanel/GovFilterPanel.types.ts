import type React from 'react'

export interface FilterFieldSchema {
  key: string
  label: string
  type: 'text' | 'select' | 'daterange' | 'multiselect'
  options?: { label: string; value: string }[]
}

export interface GovFilterPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  schema: FilterFieldSchema[]
  value: Record<string, unknown>
  onChange: (filters: Record<string, unknown>) => void
  collapsible?: boolean
}
