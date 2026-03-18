import type React from "react";

export interface GovFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Override agency name (defaults to GovContext) */
  agencyName?: string;
  /** Address or contact line */
  address?: React.ReactNode;
  /** Legal / navigation links */
  links?: React.ReactNode[];
  /** Extra content in the bottom row */
  children?: React.ReactNode;
}
