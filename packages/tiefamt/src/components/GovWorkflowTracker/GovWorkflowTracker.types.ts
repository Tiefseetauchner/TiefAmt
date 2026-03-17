import type React from 'react'
import type { WorkflowStep } from '../../types/workflow'

export interface GovWorkflowTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: WorkflowStep[]
  orientation?: 'horizontal' | 'vertical'
}
