import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { GovPageThumbnail } from '../GovPageThumbnail/GovPageThumbnail'
import { gcn } from '../../utils/govClassNames'
import type { GovPdfViewerProps } from './GovPdfViewer.types'

export function GovPdfViewer({
  mode,
  pages,
  pdfUrl,
  enableIframe,
  iframeTitle,
  iframeSandbox = 'allow-scripts allow-same-origin',
  initialPage = 1,
  onPageChange,
  downloadUrl,
  downloadLabel,
  renderPageCounter,
  height = '100%',
  className,
}: GovPdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Resolve effective mode — iframe requires explicit opt-in
  const effectiveMode: 'jpeg' | 'iframe' = (() => {
    if (mode === 'iframe') {
      if (!enableIframe) {
        console.warn(
          '[GovPdfViewer] mode="iframe" requires enableIframe={true}. ' +
          'Falling back to jpeg mode.'
        )
        return 'jpeg'
      }
      return 'iframe'
    }
    return 'jpeg'
  })()

  function goToPage(p: number) {
    setCurrentPage(p)
    onPageChange?.(p)
  }

  const toolbar = (
    <div className="gov-pdf-viewer__toolbar">
      <span>
        {effectiveMode === 'jpeg' && pages && renderPageCounter
          ? renderPageCounter(currentPage, pages.length)
          : iframeTitle}
      </span>
      {downloadUrl && (
        <Button
          as="a"
          href={downloadUrl}
          download
          variant="outline-secondary"
          size="sm"
        >
          {downloadLabel}
        </Button>
      )}
    </div>
  )

  if (effectiveMode === 'iframe') {
    return (
      <div
        className={gcn('gov-pdf-viewer gov-pdf-viewer--iframe-mode', className)}
        style={{ height }}
      >
        {toolbar}
        <iframe
          src={pdfUrl}
          title={iframeTitle}
          sandbox={iframeSandbox}
          className="gov-pdf-viewer__iframe"
          style={{ height: `calc(${height} - 2.75rem)` }}
        />
      </div>
    )
  }

  // JPEG mode
  return (
    <div className={gcn('gov-pdf-viewer', className)}>
      {pages && pages.length > 1 && (
        <div className="gov-pdf-viewer__strip">
          {pages.map((src, i) => (
            <GovPageThumbnail
              key={i}
              src={src}
              pageNumber={i + 1}
              selected={currentPage === i + 1}
              onClick={() => goToPage(i + 1)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
      <div className="gov-pdf-viewer__main">
        {toolbar}
        {pages && pages.length > 0 && (
          <img
            src={pages[currentPage - 1]}
            alt=""
            className="gov-pdf-viewer__page-img"
          />
        )}
      </div>
    </div>
  )
}

export default GovPdfViewer
