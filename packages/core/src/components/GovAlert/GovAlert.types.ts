import type React from 'react'
import type { AlertProps } from 'react-bootstrap'

export type GovAlertVariant = 'info' | 'warning' | 'success' | 'danger'

export interface GovAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GovAlertVariant
  /** Alert heading */
  heading?: React.ReactNode
  /** Renders a left accent border in the variant's color */
  accent?: boolean
  /** Whether the alert can be dismissed */
  dismissible?: boolean
  children?: React.ReactNode
  /** Props forwarded to the React Bootstrap Alert */
  bsProps?: Omit<AlertProps, 'variant' | 'dismissible' | 'children'>
}
