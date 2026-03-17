import type React from 'react'
import type { GovDocumentStatus, GovWorkflowAction } from '../../types/workflow'

export interface GovActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  documentStatus: GovDocumentStatus
  onAction: (action: GovWorkflowAction) => void
  /** Render in sticky position at bottom of viewport */
  sticky?: boolean
  /** Extra content on the left side of the bar */
  leading?: React.ReactNode
}
