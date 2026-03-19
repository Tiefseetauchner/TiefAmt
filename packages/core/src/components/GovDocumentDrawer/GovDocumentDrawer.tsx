import { Offcanvas } from "react-bootstrap";
import type { GovDocumentDrawerProps } from "./GovDocumentDrawer.types";

export function GovDocumentDrawer({ show, onHide, title, children, bsProps }: GovDocumentDrawerProps) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="gov-document-drawer" style={{ width: "48rem", maxWidth: "95vw" }} {...bsProps}>
      <Offcanvas.Header closeButton>{title && <Offcanvas.Title>{title}</Offcanvas.Title>}</Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}

export default GovDocumentDrawer;
