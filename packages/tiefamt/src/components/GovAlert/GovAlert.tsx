import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { gcn } from '../../utils/govClassNames';
import type { GovAlertProps, GovAlertVariant } from './GovAlert.types';

// Map gov variants to Bootstrap variants
const BS_VARIANT: Record<GovAlertVariant, string> = {
  info: 'info',
  warning: 'warning',
  success: 'success',
  danger: 'danger',
  erlass: 'warning',
  pflichthinweis: 'danger',
};

export function GovAlert({
  variant = 'info',
  heading,
  dismissible = false,
  children,
  className,
  bsProps,
  ...rest
}: GovAlertProps) {
  const [show, setShow] = useState(true);
  if (!show) return null;

  const isCustom = variant === 'erlass' || variant === 'pflichthinweis';

  return (
    <Alert
      variant={BS_VARIANT[variant]}
      className={gcn(
        isCustom && `gov-alert gov-alert--${variant}`,
        className
      )}
      onClose={dismissible ? () => setShow(false) : undefined}
      dismissible={dismissible}
      {...bsProps}
      {...rest}
    >
      {heading && <Alert.Heading>{heading}</Alert.Heading>}
      {children}
    </Alert>
  );
}

export default GovAlert;
