import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { GovActionBar } from '../GovActionBar/GovActionBar'
import { GovStatusBadge } from '../GovStatusBadge/GovStatusBadge'
import { GovWorkflowTracker } from '../GovWorkflowTracker/GovWorkflowTracker'
import type { GovDocumentDrawerProps } from '../../types/workflow'

export function GovDocumentDrawer({
  show,
  onHide,
  document: doc,
  onAction,
  renderPreview,
}: GovDocumentDrawerProps) {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="gov-document-drawer"
      style={{ width: '48rem', maxWidth: '95vw' }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontSize: '1rem', fontWeight: 600 }}>
          {doc.title}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Metadata header */}
        <div className="gov-document-drawer__meta">
          <div className="gov-document-drawer__meta-title">{doc.title}</div>
          <div className="gov-document-drawer__meta-row">
            <span>{doc.type}</span>
            <span>·</span>
            <span>{doc.date}</span>
            <GovStatusBadge status={doc.status} />
          </div>
        </div>

        {/* Workflow tracker */}
        {doc.workflowSteps && doc.workflowSteps.length > 0 && (
          <div className="gov-document-drawer__workflow">
            <GovWorkflowTracker steps={doc.workflowSteps} orientation="horizontal" />
          </div>
        )}

        {/* Preview slot */}
        {renderPreview && (
          <div className="gov-document-drawer__preview">
            {renderPreview()}
          </div>
        )}

        {/* Action bar — sticky at bottom of the drawer body */}
        <GovActionBar
          documentStatus={doc.status}
          onAction={(action) => onAction(action, doc.id)}
          sticky={false}
          style={{ borderTop: '2px solid var(--bs-primary, #1a2b5e)', marginTop: 'auto' }}
        />
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default GovDocumentDrawer
