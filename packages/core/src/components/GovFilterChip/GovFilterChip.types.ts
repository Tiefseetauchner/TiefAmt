import type React from 'react'

export interface GovFilterChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  value: string
  onRemove?: () => void
}
