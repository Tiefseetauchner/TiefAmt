import type React from "react";
import type { BadgeProps } from "react-bootstrap";
import { GovBadgeVariant } from "../../types/GovBadgeVariant";

export interface GovBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: GovBadgeVariant;
  children: React.ReactNode;
  /** Props forwarded to the React Bootstrap Badge */
  bsProps?: Omit<BadgeProps, "bg" | "children">;
}
