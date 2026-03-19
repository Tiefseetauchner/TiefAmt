import type React from 'react'

export interface GovPageThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** JPEG URL for the page image */
  src?: string
  /** 1-based page number shown as overlay */
  pageNumber?: number
  /** Show loading skeleton instead of image */
  loading?: boolean
  /** Whether this page is currently selected */
  selected?: boolean
  width?: number
  height?: number
  /** Alt text for the page image */
  alt?: string
}
