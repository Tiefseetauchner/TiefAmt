import { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { gcn } from '../../utils/govClassNames';
import type { GovBannerProps } from './GovBanner.types';

const DEFAULT_MESSAGE =
  'Dies ist eine offizielle Website einer österreichischen Behörde.';

export function GovBanner({
  message = DEFAULT_MESSAGE,
  dismissible = true,
  forceShow = false,
  className,
  bsProps,
  ...rest
}: GovBannerProps) {
  const [show, setShow] = useState(true);

  // Hidden in development unless forced
  if (!forceShow) return null;
  if (!show) return null;

  return (
    <div className={gcn('gov-banner', className)} {...rest}>
      <Container fluid="xl">
        <Alert
          variant="light"
          className="gov-banner__inner border-0 bg-transparent m-0 p-0 d-flex align-items-center gap-2"
          {...bsProps}
        >
          <span className="gov-banner__icon" aria-hidden="true">
            🏛
          </span>
          <span className="gov-banner__text">{message}</span>
          {dismissible && (
            <button
              type="button"
              className="ms-auto btn-close"
              aria-label="Schließen"
              onClick={() => setShow(false)}
            />
          )}
        </Alert>
      </Container>
    </div>
  );
}

export default GovBanner;
