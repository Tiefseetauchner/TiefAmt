import type React from 'react'
import type { NavbarProps } from 'react-bootstrap'

export interface GovHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation links rendered in the nav bar */
  children?: React.ReactNode
  /** Override the agency name shown in the top bar (defaults to GovContext value) */
  agencyName?: string
  /** Override the agency logo (defaults to GovContext value) */
  agencyLogo?: string
  /** Extra content for the thin agency bar (e.g. language switcher) */
  agencyBarExtra?: React.ReactNode
  /** Props forwarded to the React Bootstrap Navbar in the nav bar */
  bsProps?: Omit<NavbarProps, 'children'>
}
