import type React from 'react'

export interface GovStatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string
  previousStatus?: string
  timestamp?: string
}
