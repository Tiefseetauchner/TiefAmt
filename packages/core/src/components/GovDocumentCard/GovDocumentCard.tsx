import { GovPageThumbnail } from "../GovPageThumbnail/GovPageThumbnail";
import { gcn } from "../../utils/govClassNames";
import type { GovDocumentCardProps } from "./GovDocumentCard.types";
import GovBadge from "../GovBadge";

export function GovDocumentCard({ title, documentType, status, statusLabel, date, thumbnailSrc, icon, className, ...rest }: GovDocumentCardProps) {
  return (
    <div className={gcn("gov-document-card", className)} role="button" tabIndex={0} {...rest}>
      <div className="gov-document-card__thumb">
        {thumbnailSrc ? (
          <GovPageThumbnail src={thumbnailSrc} pageNumber={1} width={80} height={113} />
        ) : (
          <span className="gov-document-card__thumb-icon" aria-hidden="true">
            {icon ?? "📄"}
          </span>
        )}
      </div>
      <div className="gov-document-card__body">
        <div className="gov-document-card__title" title={title}>
          {title}
        </div>
        <div className="gov-document-card__meta">
          <span>{documentType}</span>
          <span>·</span>
          <span>{date}</span>
          <GovBadge variant={status}>{statusLabel}</GovBadge>
        </div>
      </div>
    </div>
  );
}

export default GovDocumentCard;
