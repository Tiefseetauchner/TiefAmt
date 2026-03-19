import { gcn } from "../../utils/govClassNames";
import type { GovStatusBadgeProps } from "./GovStatusBadge.types";

export function GovStatusBadge({ status, label, previousLabel, timestamp, className, ...rest }: GovStatusBadgeProps) {
  return (
    <span className={gcn("gov-status-badge", `gov-status-badge--${status}`, className)} {...rest}>
      {previousLabel && <span className="gov-status-badge__transition">{previousLabel} → </span>}
      {label}
      {timestamp && <span className="gov-status-badge__timestamp"> · {timestamp}</span>}
    </span>
  );
}

export default GovStatusBadge;
