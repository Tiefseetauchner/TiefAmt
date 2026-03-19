import type React from 'react'
import type { TableProps } from 'react-bootstrap'

export interface GovColumnDef<T> {
  key: string
  header: string
  render: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

export interface GovDataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: GovColumnDef<T>[]
  /** Total number of records (for pagination display) */
  totalCount: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  /** Controlled sort */
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void
  /** Called when a row is clicked */
  onRowClick?: (row: T) => void
  /** Row selection — IDs derived via rowId */
  rowId?: (row: T) => string
  selectedIds?: string[]
  onSelectionChange?: (ids: string[]) => void
  /** Accessible label for the select-all checkbox */
  selectAllLabel?: string
  /** Accessible label for per-row checkboxes */
  selectRowLabel?: (index: number) => string
  /** Rendered when data is empty */
  renderEmpty?: () => React.ReactNode
  /** Rendered as the page info area in the pagination bar */
  renderPageInfo?: (page: number, totalPages: number, totalCount: number) => React.ReactNode
  caption?: string
  bsProps?: Omit<TableProps, 'children'>
}
