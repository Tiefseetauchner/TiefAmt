import type React from 'react'

export interface GovPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Slot for GovHeader */
  header?: React.ReactNode
  /** Slot for GovSidebar / GovNav */
  sidebar?: React.ReactNode
  /** Slot for GovBanner */
  banner?: React.ReactNode
  /** Slot for GovFooter */
  footer?: React.ReactNode
  /** Main page content */
  children?: React.ReactNode
}
