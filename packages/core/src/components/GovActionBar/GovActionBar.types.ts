import type React from 'react'
import type { GovActionDef } from '../../types/workflow'

export type { GovActionDef }

export interface GovActionBarProps<TKey extends string = string>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions to render. Pass only the ones valid for the current state. */
  actions: GovActionDef<TKey>[]
  onAction: (key: TKey) => void
  /** Render the bar in a sticky position at the bottom of the viewport. */
  sticky?: boolean
  /** Extra content rendered on the left side of the bar. */
  leading?: React.ReactNode
}
