import type React from 'react'
import type { GovActionDef, WorkflowStep } from '../../types/workflow'

export interface GovDocumentMeta {
  id: string
  title: string
  type: string
  status: string
  date: string
  workflowSteps?: WorkflowStep[]
}

export interface GovDocumentDrawerProps {
  show: boolean
  onHide: () => void
  document: GovDocumentMeta
  /** Actions valid for the current document state. Derive via resolveGovActions. */
  actions: GovActionDef[]
  onAction: (key: string, documentId: string) => void
  renderPreview?: () => React.ReactNode
}
