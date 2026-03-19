import type React from 'react'
import type { NavProps } from 'react-bootstrap'

export interface GovNavSectionProps extends React.HTMLAttributes<HTMLElement> {
  heading?: React.ReactNode
  children: React.ReactNode
}

type GovNavItemOwnProps = {
  active?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/**
 * Polymorphic props for GovNavItem. Defaults to rendering an <a>.
 * Pass `as={Link}` (Next.js, React Router, etc.) to render as that component —
 * the prop types of that component are then merged in automatically.
 */
export type GovNavItemProps<As extends React.ElementType = 'a'> =
  GovNavItemOwnProps & { as?: As } &
  Omit<React.ComponentPropsWithoutRef<As>, keyof GovNavItemOwnProps | 'as'>

export interface GovNavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  /** Props forwarded to the React Bootstrap Nav */
  bsProps?: Omit<NavProps, 'children'>
}
