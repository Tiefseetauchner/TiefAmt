import { Badge } from 'react-bootstrap';
import { gcn } from '../../utils/govClassNames';
import type { GovBadgeProps, GovBadgeVariant } from './GovBadge.types';

const DEFAULT_LABELS: Record<GovBadgeVariant, string> = {
  active: 'Aktiv',
  pending: 'In Bearbeitung',
  revoked: 'Widerrufen',
  expired: 'Abgelaufen',
  draft: 'Entwurf',
  approved: 'Genehmigt',
};

export function GovBadge({
  variant,
  children,
  className,
  bsProps,
  ...rest
}: GovBadgeProps) {
  return (
    <Badge
      as="span"
      bg=""
      className={gcn('gov-badge', `gov-badge--${variant}`, className)}
      {...bsProps}
      {...rest}
    >
      {children ?? DEFAULT_LABELS[variant]}
    </Badge>
  );
}

export default GovBadge;
