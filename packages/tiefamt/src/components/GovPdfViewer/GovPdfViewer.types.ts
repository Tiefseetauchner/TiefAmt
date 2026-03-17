export type GovPdfViewerMode = 'jpeg' | 'iframe'

export interface GovPdfViewerProps {
  mode: GovPdfViewerMode
  /** jpeg mode: array of image URLs, one per page */
  pages?: string[]
  /** iframe mode: URL passed as <iframe src> */
  pdfUrl?: string
  /**
   * Must be explicitly true for mode="iframe" to activate.
   * If false/absent with mode="iframe", falls back to jpeg and emits a console.warn.
   */
  enableIframe?: boolean
  /** Accessible title for the iframe element */
  iframeTitle?: string
  /** sandbox attribute; default: "allow-scripts allow-same-origin" */
  iframeSandbox?: string
  /** jpeg mode only: initial page (1-based) */
  initialPage?: number
  onPageChange?: (page: number) => void
  /** Renders a download button when provided (both modes) */
  downloadUrl?: string
  /** iframe mode: container height */
  height?: string
  className?: string
}
