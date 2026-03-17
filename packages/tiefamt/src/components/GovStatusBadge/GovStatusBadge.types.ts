import type React from 'react'
import type { GovDocumentStatus } from '../../types/workflow'

export interface GovStatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: GovDocumentStatus
  /** Show a "was X → now Y" transition label */
  previousStatus?: GovDocumentStatus
  /** ISO date string shown as a secondary label */
  timestamp?: string
}
