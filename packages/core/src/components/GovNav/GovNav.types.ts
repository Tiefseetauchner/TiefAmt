import type React from 'react'
import type { NavProps } from 'react-bootstrap'

export interface GovNavItem {
  label: string
  href: string
  active?: boolean
  icon?: React.ReactNode
}

export interface GovNavSection {
  heading?: string
  items: GovNavItem[]
}

export interface GovNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Flat list of nav items, or sectioned list */
  sections: GovNavSection[]
  /** Props forwarded to the React Bootstrap Nav */
  bsProps?: Omit<NavProps, 'children'>
}
