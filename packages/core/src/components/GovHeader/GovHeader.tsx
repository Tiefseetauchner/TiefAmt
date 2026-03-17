import { Container, Navbar } from 'react-bootstrap';
import { useGovTheme } from '../../provider/GovProvider';
import { gcn } from '../../utils/govClassNames';
import type { GovHeaderProps } from './GovHeader.types';

export function GovHeader({
  children,
  agencyName,
  agencyLogo,
  agencyBarExtra,
  className,
  bsProps,
  ...rest
}: GovHeaderProps) {
  const ctx = useGovTheme();
  const name = agencyName ?? ctx.agencyName;
  const logo = agencyLogo ?? ctx.agencyLogo;

  return (
    <header className={gcn('gov-header', className)} {...rest}>
      {/* Thin agency bar */}
      <div className="gov-header__agency-bar">
        <Container fluid="xl" className="d-flex align-items-center gap-2">
          {logo && (
            <img
              src={logo}
              alt=""
              role="presentation"
              className="gov-header__logo"
              style={{ height: '1.25rem' }}
            />
          )}
          <span>{name}</span>
          {agencyBarExtra && <div className="ms-auto">{agencyBarExtra}</div>}
        </Container>
      </div>

      {/* Navigation bar */}
      <div className="gov-header__nav-bar">
        <Container fluid="xl">
          <Navbar expand="lg" className="p-0" {...bsProps}>
            {logo && (
              <Navbar.Brand href="/" className="me-4 p-0">
                <img src={logo} alt={name} className="gov-header__logo" />
              </Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="gov-header-nav" />
            <Navbar.Collapse id="gov-header-nav">{children}</Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
    </header>
  );
}

export default GovHeader;
