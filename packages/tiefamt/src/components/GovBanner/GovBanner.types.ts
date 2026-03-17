import type React from 'react'
import type { AlertProps } from 'react-bootstrap'

export interface GovBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom message — defaults to generic official-site notice */
  message?: React.ReactNode
  /** Allow the user to dismiss the banner */
  dismissible?: boolean
  /** Force show even in development (default: hidden when NODE_ENV=development) */
  forceShow?: boolean
  /** Props forwarded to the underlying React Bootstrap Alert */
  bsProps?: Omit<AlertProps, 'children' | 'dismissible'>
}
