import React from 'react'
import { Form, Pagination, Table } from 'react-bootstrap'
import { gcn } from '../../utils/govClassNames'
import type { GovDataTableProps } from './GovDataTable.types'

export function GovDataTable<T>({
  data,
  columns,
  totalCount,
  page,
  pageSize,
  onPageChange,
  sortColumn,
  sortDirection,
  onSortChange,
  rowId,
  selectedIds,
  onSelectionChange,
  renderEmpty,
  caption,
  className,
  bsProps,
  ...rest
}: GovDataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const selectable = !!onSelectionChange && !!rowId

  function handleSort(key: string) {
    if (!onSortChange) return
    const next = sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc'
    onSortChange(key, next)
  }

  function toggleRow(id: string) {
    if (!onSelectionChange || !selectedIds) return
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id]
    onSelectionChange(next)
  }

  function toggleAll() {
    if (!onSelectionChange || !rowId) return
    const allIds = data.map(rowId)
    const allSelected = allIds.every((id) => selectedIds?.includes(id))
    onSelectionChange(allSelected ? [] : allIds)
  }

  const allSelected =
    selectable && data.length > 0 && data.every((row) => selectedIds?.includes(rowId!(row)))

  // Build page numbers to show
  function pageNumbers(): number[] {
    const pages: number[] = []
    const delta = 2
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className={gcn('gov-data-table', className)} {...rest}>
      {selectable && (selectedIds?.length ?? 0) > 0 && (
        <div className="gov-data-table__toolbar">
          <span className="gov-data-table__selection-count">
            {selectedIds!.length} ausgewählt
          </span>
        </div>
      )}

      <Table bordered striped hover size="sm" {...bsProps}>
        {caption && (
          <caption className="gov-table__caption">{caption}</caption>
        )}
        <thead>
          <tr>
            {selectable && (
              <th className="gov-data-table__select-cell">
                <Form.Check
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Alle auswählen"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                aria-sort={
                  sortColumn === col.key
                    ? sortDirection === 'asc' ? 'ascending' : 'descending'
                    : undefined
                }
              >
                {col.sortable && onSortChange ? (
                  <button
                    type="button"
                    className="gov-table__sort-btn"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.header}
                    <span className="gov-table__sort-icon" aria-hidden="true">
                      {sortColumn === col.key
                        ? (sortDirection === 'asc' ? ' ▲' : ' ▼')
                        : ' ⬍'}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)}>
                <div className="gov-data-table__empty">
                  {renderEmpty ? renderEmpty() : 'Keine Einträge gefunden.'}
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, i) => {
              const id = rowId ? rowId(row) : String(i)
              const isSelected = selectedIds?.includes(id) ?? false
              return (
                <tr
                  key={id}
                  className={gcn(isSelected && 'gov-data-table__row--selected')}
                >
                  {selectable && (
                    <td className="gov-data-table__select-cell">
                      <Form.Check
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(id)}
                        aria-label={`Zeile ${i + 1} auswählen`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key}>{col.render(row)}</td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <div className="gov-data-table__pagination">
          <span className="gov-data-table__page-info">
            Seite {page} von {totalPages} ({totalCount} Einträge)
          </span>
          <Pagination size="sm" className="mb-0">
            <Pagination.First onClick={() => onPageChange(1)} disabled={page === 1} />
            <Pagination.Prev onClick={() => onPageChange(page - 1)} disabled={page === 1} />
            {pageNumbers().map((p) => (
              <Pagination.Item key={p} active={p === page} onClick={() => onPageChange(p)}>
                {p}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={page === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default GovDataTable
