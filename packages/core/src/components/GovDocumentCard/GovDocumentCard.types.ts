import type React from 'react'
import type { GovDocumentStatus } from '../../types/workflow'

export interface GovDocumentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  documentType: string
  status: GovDocumentStatus
  date: string
  /** URL to a first-page JPEG thumbnail */
  thumbnailSrc?: string
  /** Fallback icon when no thumbnail is available */
  icon?: React.ReactNode
}
