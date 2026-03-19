import { Badge } from "react-bootstrap";
import { gcn } from "../../utils/govClassNames";
import type { GovBadgeProps } from "./GovBadge.types";

export function GovBadge({ variant, children, className, bsProps, ...rest }: GovBadgeProps) {
  return (
    <Badge as="span" bg="" className={gcn("gov-badge", `gov-badge--${variant}`, className)} {...bsProps} {...rest}>
      {children}
    </Badge>
  );
}

export default GovBadge;
