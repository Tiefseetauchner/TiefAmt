import React from 'react'
import { Nav } from 'react-bootstrap'
import { gcn } from '../../utils/govClassNames'
import type { GovNavProps } from './GovNav.types'

export function GovNav({ sections, className, bsProps, ...rest }: GovNavProps) {
  return (
    <nav className={gcn('gov-nav', className)} {...rest}>
      <Nav as="ul" className="flex-column" {...bsProps}>
        {sections.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {section.heading && (
              <li role="presentation">
                <p className="gov-nav__section-heading">{section.heading}</p>
              </li>
            )}
            {section.items.map((item) => (
              <li key={item.href} role="presentation">
                <Nav.Link
                  as="a"
                  href={item.href}
                  active={item.active}
                  className="d-flex align-items-center gap-2"
                >
                  {item.icon && <span aria-hidden="true">{item.icon}</span>}
                  {item.label}
                </Nav.Link>
              </li>
            ))}
          </React.Fragment>
        ))}
      </Nav>
    </nav>
  )
}

export default GovNav
