import { gcn } from '../../utils/govClassNames'
import type { GovPageThumbnailProps } from './GovPageThumbnail.types'

export function GovPageThumbnail({
  src,
  pageNumber,
  loading = false,
  selected = false,
  width = 80,
  height = 113,
  className,
  ...rest
}: GovPageThumbnailProps) {
  return (
    <div
      className={gcn('gov-page-thumbnail', selected && 'gov-page-thumbnail--selected', className)}
      style={{ width, height }}
      {...rest}
    >
      {loading || !src ? (
        <div className="gov-page-thumbnail__skeleton" style={{ width, height }} />
      ) : (
        <img
          src={src}
          alt={pageNumber ? `Seite ${pageNumber}` : 'Dokumentseite'}
          className="gov-page-thumbnail__img"
          loading="lazy"
        />
      )}
      {pageNumber !== undefined && (
        <span className="gov-page-thumbnail__page-number">{pageNumber}</span>
      )}
    </div>
  )
}

export default GovPageThumbnail
