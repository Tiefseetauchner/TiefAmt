import type React from 'react'
import type { GovActionDef } from '../../types/workflow'

export type { GovActionDef }

export interface GovActionBarProps<TKey extends string = string>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions to render. Pass only the ones valid for the current state. */
  actions: GovActionDef<TKey>[]
  onAction: (key: TKey) => void
  /**
   * Renders the content of the confirmation modal for actions with confirm=true.
   * The modal shell (show/hide state) is managed by GovActionBar.
   * Provide Modal.Header, Modal.Body, Modal.Footer — or any content.
   */
  renderConfirm?: (
    action: GovActionDef<TKey>,
    onConfirm: () => void,
    onCancel: () => void,
  ) => React.ReactNode
  /** Render the bar in a sticky position at the bottom of the viewport. */
  sticky?: boolean
  /** Extra content rendered on the left side of the bar. */
  leading?: React.ReactNode
}
