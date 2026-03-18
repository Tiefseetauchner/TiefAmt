import { gcn } from '../../utils/govClassNames'
import type { GovStatusBadgeProps } from './GovStatusBadge.types'

const LABELS: Record<string, string> = {
  draft:          'Entwurf',
  submitted:      'Eingereicht',
  'under-review': 'In Prüfung',
  approved:       'Genehmigt',
  rejected:       'Abgelehnt',
  returned:       'Zurückgegeben',
}

export function GovStatusBadge({
  status,
  previousStatus,
  timestamp,
  className,
  ...rest
}: GovStatusBadgeProps) {
  return (
    <span
      className={gcn('gov-status-badge', `gov-status-badge--${status}`, className)}
      {...rest}
    >
      {previousStatus && (
        <span className="gov-status-badge__transition">
          {LABELS[previousStatus] ?? previousStatus} →{' '}
        </span>
      )}
      {LABELS[status] ?? status}
      {timestamp && (
        <span className="gov-status-badge__timestamp"> · {timestamp}</span>
      )}
    </span>
  )
}

export default GovStatusBadge
