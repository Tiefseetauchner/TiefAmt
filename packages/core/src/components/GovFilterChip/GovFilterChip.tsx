import { gcn } from '../../utils/govClassNames'
import type { GovFilterChipProps } from './GovFilterChip.types'

export function GovFilterChip({ label, value, onRemove, removeLabel, className, ...rest }: GovFilterChipProps) {
  return (
    <span className={gcn('gov-filter-chip', className)} {...rest}>
      <span className="gov-filter-chip__label">{label}:</span>
      {' '}{value}
      {onRemove && (
        <button
          type="button"
          className="gov-filter-chip__remove"
          onClick={onRemove}
          aria-label={removeLabel}
        >
          ×
        </button>
      )}
    </span>
  )
}

export default GovFilterChip
