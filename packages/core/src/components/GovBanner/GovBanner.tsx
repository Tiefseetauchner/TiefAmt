import { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { gcn } from '../../utils/govClassNames';
import type { GovBannerProps } from './GovBanner.types';

export function GovBanner({
  children,
  dismissible = true,
  dismissLabel,
  className,
  bsProps,
  ...rest
}: GovBannerProps) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className={gcn('gov-banner', className)} {...rest}>
      <Container fluid="xl">
        <Alert
          variant="light"
          className="gov-banner__inner border-0 bg-transparent m-0 p-0 d-flex align-items-center gap-2"
          {...bsProps}
        >
          {children}
          {dismissible && (
            <button
              type="button"
              className="ms-auto btn-close"
              aria-label={dismissLabel}
              onClick={() => setShow(false)}
            />
          )}
        </Alert>
      </Container>
    </div>
  );
}

export default GovBanner;
