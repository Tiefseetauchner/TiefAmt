import type React from 'react'
import type { GovNavSection } from '../GovNav/GovNav.types'

export interface GovSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation sections rendered inside the sidebar */
  sections?: GovNavSection[]
  /** Freeform content instead of (or alongside) sections */
  children?: React.ReactNode
}
