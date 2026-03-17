import { Table } from 'react-bootstrap';
import { gcn } from '../../utils/govClassNames';
import type { GovTableProps, SortDirection } from './GovTable.types';

function nextDirection(current: SortDirection): SortDirection {
  if (current === 'none') return 'asc';
  if (current === 'asc') return 'desc';
  return 'none';
}

function SortIcon({ direction }: { direction: SortDirection; }) {
  return (
    <span className="gov-table__sort-icon" aria-hidden="true">
      {direction === 'asc' ? '▲' : direction === 'desc' ? '▼' : '⬍'}
    </span>
  );
}

export function GovTable<T = Record<string, unknown>>({
  columns,
  data,
  rowKey,
  caption,
  sortable = false,
  sortColumn,
  sortDirection = 'none',
  onSort,
  striped = true,
  hover = true,
  className,
  bsProps,
  ...rest
}: GovTableProps<T>) {
  function handleSort(key: string) {
    if (!onSort) return;
    const current = sortColumn === key ? sortDirection : 'none';
    onSort(key, nextDirection(current));
  }

  return (
    <div className={gcn('gov-table', className)} {...rest}>
      <Table striped={striped} hover={hover} bordered size="sm" {...bsProps}>
        {caption && (
          <caption className="gov-table__caption">{caption}</caption>
        )}
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortColumn === col.key;
              const canSort = sortable && col.sortable !== false;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    isSorted
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {canSort ? (
                    <button
                      type="button"
                      className="gov-table__sort-btn"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.header}
                      <SortIcon direction={isSorted ? sortDirection : 'none'} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowKey ? rowKey(row, rowIndex) : rowIndex}>
              {columns.map((col) => {
                const value = (row as Record<string, unknown>)[col.key];
                return (
                  <td key={col.key}>
                    {col.render ? col.render(value, row, rowIndex) : String(value ?? '')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GovTable;
