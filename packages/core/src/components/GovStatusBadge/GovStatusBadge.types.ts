import type React from "react";
import { GovBadgeVariant } from "../../types/GovBadgeVariant";

export interface GovStatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** CSS modifier key — drives gov-status-badge--{status} */
  status: GovBadgeVariant;
  label: React.ReactNode;
  /** If provided, renders a "previousLabel → children" transition */
  previousLabel?: React.ReactNode;
  timestamp?: React.ReactNode;
}
