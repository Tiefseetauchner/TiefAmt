import type React from 'react'

export type GovDocumentStatus =
  | 'draft'
  | 'submitted'
  | 'under-review'
  | 'approved'
  | 'rejected'
  | 'returned'

export type GovWorkflowAction =
  | 'submit'
  | 'approve'
  | 'reject'
  | 'return'
  | 'request-info'
  | 'retract'

export const WORKFLOW_TRANSITIONS: Record<GovDocumentStatus, GovWorkflowAction[]> = {
  draft:          ['submit', 'retract'],
  submitted:      ['approve', 'reject', 'return', 'request-info'],
  'under-review': ['approve', 'reject', 'return', 'request-info'],
  approved:       [],
  rejected:       [],
  returned:       ['submit', 'retract'],
}

export interface WorkflowStep {
  id: string
  label: string
  status: 'pending' | 'active' | 'complete' | 'skipped' | 'returned'
  assignee?: string
  completedAt?: string // ISO date string
}

export interface GovDocumentMeta {
  id: string
  title: string
  type: string
  status: GovDocumentStatus
  date: string
  workflowSteps?: WorkflowStep[]
}

export interface GovDocumentDrawerProps {
  show: boolean
  onHide: () => void
  document: GovDocumentMeta
  onAction: (action: GovWorkflowAction, documentId: string) => void
  renderPreview?: () => React.ReactNode
}
