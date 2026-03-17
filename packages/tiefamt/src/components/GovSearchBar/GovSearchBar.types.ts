import type React from 'react'
import type { GovFilterChipProps } from '../GovFilterChip/GovFilterChip.types'

export interface GovSearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onSearch: (query: string) => void
  placeholder?: string
  /** Debounce delay in ms (default 300) */
  debounce?: number
  /** Active filter chips displayed below the input */
  chips?: GovFilterChipProps[]
  /** Show loading indicator */
  loading?: boolean
}
