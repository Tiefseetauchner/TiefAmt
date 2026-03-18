import { useState } from "react";
import { Alert } from "react-bootstrap";
import { gcn } from "../../utils/govClassNames";
import type { GovAlertProps } from "./GovAlert.types";

export function GovAlert({ variant = "info", heading, accent = false, dismissible = false, children, className, bsProps, ...rest }: GovAlertProps) {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <Alert
      variant={variant}
      className={gcn("gov-alert", accent && "gov-alert--accented", className)}
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
