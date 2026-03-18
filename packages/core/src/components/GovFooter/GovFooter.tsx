import { Container } from "react-bootstrap";
import { useGovTheme } from "../../provider/GovProvider";
import { gcn } from "../../utils/govClassNames";
import type { GovFooterProps } from "./GovFooter.types";

export function GovFooter({ agencyName, address, links, children, className, ...rest }: GovFooterProps) {
  const ctx = useGovTheme();
  const name = agencyName ?? ctx.agencyName;

  return (
    <footer className={gcn("gov-footer", className)} {...rest}>
      <Container fluid="xl">
        <div className="gov-footer__agency">{name}</div>
        {address && <div>{address}</div>}

        {links && links.length > 0 && (
          <>
            <hr className="gov-footer__divider" />
            <ul className="gov-footer__links">{links.map((link) => link)}</ul>
          </>
        )}

        {children}
      </Container>
    </footer>
  );
}

export default GovFooter;
