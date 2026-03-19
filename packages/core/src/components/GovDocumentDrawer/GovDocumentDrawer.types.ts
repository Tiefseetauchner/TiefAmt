import type React from 'react'
import type { OffcanvasProps } from 'react-bootstrap'

export interface GovDocumentDrawerProps {
  show: boolean
  onHide: () => void
  title?: React.ReactNode
  children?: React.ReactNode
  bsProps?: Omit<OffcanvasProps, 'show' | 'onHide' | 'placement' | 'children'>
}
