import React from 'react'
import { Nav } from 'react-bootstrap'
import { gcn } from '../../utils/govClassNames'
import type { GovNavProps, GovNavSectionProps, GovNavItemProps } from './GovNav.types'

export function GovNavSection({ heading, children, ...rest }: GovNavSectionProps) {
  return (
    <React.Fragment>
      {heading && (
        <li role="presentation" {...rest}>
          <p className="gov-nav__section-heading">{heading}</p>
        </li>
      )}
      {children}
    </React.Fragment>
  )
}

export function GovNavItem<As extends React.ElementType = 'a'>({
  as,
  icon,
  active,
  children,
  className,
  ...rest
}: GovNavItemProps<As>) {
  const Comp = (as ?? 'a') as React.ElementType
  return (
    <li role="presentation">
      <Comp
        className={gcn('nav-link d-flex align-items-center gap-2', active && 'active', className)}
        {...rest}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </Comp>
    </li>
  )
}

export function GovNav({ children, className, bsProps, ...rest }: GovNavProps) {
  return (
    <nav className={gcn('gov-nav', className)} {...rest}>
      <Nav as="ul" className="flex-column" {...bsProps}>
        {children}
      </Nav>
    </nav>
  )
}

export default GovNav
