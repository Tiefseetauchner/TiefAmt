import type React from "react";
import { GovBadgeVariant } from "../../types/GovBadgeVariant";

export interface GovDocumentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  documentType: string;
  status: GovBadgeVariant;
  statusLabel: React.ReactNode;
  date: string;
  /** URL to a first-page JPEG thumbnail */
  thumbnailSrc?: string;
  /** Fallback icon when no thumbnail is available */
  icon?: React.ReactNode;
}
