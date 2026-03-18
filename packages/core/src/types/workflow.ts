/**
 * Generic action definition — the building block users compose into workflows.
 * `confirm`, when present and non-empty, triggers a confirmation dialog before
 * the action fires. Absence (or empty string) means fire immediately.
 */
export interface GovActionDef<TKey extends string = string> {
  key: TKey
  label: string
  /** Bootstrap button variant. Defaults to 'secondary'. */
  variant?: string
  /** Confirmation prompt. Dialog is shown iff this is defined and non-empty. */
  confirm?: string
}

/**
 * A complete workflow definition: the set of action definitions plus a
 * transition map declaring which actions are valid in each state.
 * Define this once in your app and reuse it across components.
 *
 * @example
 * const myWorkflow: GovWorkflowDef<'draft' | 'submitted', 'submit' | 'approve'> = {
 *   transitions: {
 *     draft:     ['submit'],
 *     submitted: ['approve'],
 *   },
 *   actions: [
 *     { key: 'submit',  label: 'Submit',  variant: 'primary' },
 *     { key: 'approve', label: 'Approve', variant: 'success', confirm: 'Approve this document?' },
 *   ],
 * }
 */
export interface GovWorkflowDef<
  TState extends string = string,
  TKey extends string = string,
> {
  transitions: Record<TState, TKey[]>
  actions: GovActionDef<TKey>[]
}

/**
 * Returns the subset of action definitions that are valid for `currentState`.
 * Order follows the transition array, not the actions array.
 */
export function resolveGovActions<
  TState extends string,
  TKey extends string,
>(
  workflow: GovWorkflowDef<TState, TKey>,
  currentState: TState,
): GovActionDef<TKey>[] {
  const keys = workflow.transitions[currentState] ?? []
  const defMap = new Map(workflow.actions.map((a) => [a.key, a]))
  return keys.flatMap((k) => {
    const def = defMap.get(k)
    return def ? [def] : []
  })
}

/** UI shape used by GovWorkflowTracker. Not a business-domain type. */
export interface WorkflowStep {
  id: string
  label: string
  status: 'pending' | 'active' | 'complete' | 'skipped' | 'returned'
  assignee?: string
  /** ISO date string */
  completedAt?: string
}
