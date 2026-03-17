import type React from 'react'
import type { TableProps } from 'react-bootstrap'

export type SortDirection = 'asc' | 'desc' | 'none'

export interface GovColumn<T = Record<string, unknown>> {
  /** Unique key matching a property on the data row */
  key: string
  /** Column header label */
  header: React.ReactNode
  /** Custom cell renderer */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode
  /** Whether this column is sortable (requires `sortable` on GovTable) */
  sortable?: boolean
}

export interface GovTableProps<T = Record<string, unknown>>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Column definitions */
  columns: GovColumn<T>[]
  /** Row data */
  data: T[]
  /** Key extractor for row identity */
  rowKey?: (row: T, index: number) => React.Key
  /** Accessible caption */
  caption?: string
  /** Enable sort indicators on sortable columns */
  sortable?: boolean
  /** Controlled sort state */
  sortColumn?: string
  sortDirection?: SortDirection
  onSort?: (column: string, direction: SortDirection) => void
  /** Striped rows */
  striped?: boolean
  /** Hover highlight */
  hover?: boolean
  /** Props forwarded to the React Bootstrap Table */
  bsProps?: Omit<TableProps, 'children'>
}
