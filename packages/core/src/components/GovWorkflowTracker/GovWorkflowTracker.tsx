import { gcn } from '../../utils/govClassNames'
import type { GovWorkflowTrackerProps } from './GovWorkflowTracker.types'
import type { WorkflowStep } from '../../types/workflow'

const STEP_ICONS: Record<WorkflowStep['status'], string> = {
  pending:  '○',
  active:   '●',
  complete: '✓',
  skipped:  '–',
  returned: '↩',
}

export function GovWorkflowTracker({
  steps,
  orientation = 'horizontal',
  className,
  ...rest
}: GovWorkflowTrackerProps) {
  return (
    <div
      className={gcn(
        'gov-workflow-tracker',
        `gov-workflow-tracker--${orientation}`,
        className
      )}
      role="list"
      {...rest}
    >
      {steps.map((step) => (
        <div
          key={step.id}
          className={gcn(
            'gov-workflow-tracker__step',
            `gov-workflow-tracker__step--${step.status}`
          )}
          role="listitem"
          aria-current={step.status === 'active' ? 'step' : undefined}
        >
          <div className="gov-workflow-tracker__dot" aria-hidden="true">
            {STEP_ICONS[step.status]}
          </div>
          <div>
            <div className="gov-workflow-tracker__label">{step.label}</div>
            {(step.assignee ?? step.completedAt) && (
              <div className="gov-workflow-tracker__meta">
                {step.assignee && <span>{step.assignee}</span>}
                {step.assignee && step.completedAt && <span> · </span>}
                {step.completedAt && <span>{step.completedAt}</span>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GovWorkflowTracker
