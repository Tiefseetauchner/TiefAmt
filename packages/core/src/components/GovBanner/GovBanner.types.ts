import type React from 'react';
import type { AlertProps } from 'react-bootstrap';

export interface GovBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Allow the user to dismiss the banner */
  dismissible?: boolean;
  /** Accessible label for the dismiss button */
  dismissLabel?: string;
  /** Props forwarded to the underlying React Bootstrap Alert */
  bsProps?: Omit<AlertProps, 'children' | 'dismissible'>;
}
