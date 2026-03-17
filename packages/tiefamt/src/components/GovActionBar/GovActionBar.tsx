import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { WORKFLOW_TRANSITIONS } from '../../types/workflow'
import type { GovWorkflowAction } from '../../types/workflow'
import { gcn } from '../../utils/govClassNames'
import type { GovActionBarProps } from './GovActionBar.types'

interface ActionConfig {
  label: string
  variant: string
  destructive: boolean
  confirmMessage: string
}

const ACTION_CONFIG: Record<GovWorkflowAction, ActionConfig> = {
  submit:       { label: 'Einreichen',          variant: 'primary',   destructive: false, confirmMessage: '' },
  approve:      { label: 'Genehmigen',           variant: 'success',   destructive: false, confirmMessage: '' },
  reject:       { label: 'Ablehnen',             variant: 'danger',    destructive: true,  confirmMessage: 'Möchten Sie dieses Dokument wirklich ablehnen? Diese Aktion kann nicht rückgängig gemacht werden.' },
  return:       { label: 'Zurückgeben',          variant: 'warning',   destructive: true,  confirmMessage: 'Möchten Sie dieses Dokument zurückgeben?' },
  'request-info': { label: 'Auskunft anfordern', variant: 'secondary', destructive: false, confirmMessage: '' },
  retract:      { label: 'Zurückziehen',         variant: 'outline-secondary', destructive: true, confirmMessage: 'Möchten Sie die Einreichung zurückziehen?' },
}

export function GovActionBar({
  documentStatus,
  onAction,
  sticky = true,
  leading,
  className,
  ...rest
}: GovActionBarProps) {
  const [pendingAction, setPendingAction] = useState<GovWorkflowAction | null>(null)

  const availableActions = WORKFLOW_TRANSITIONS[documentStatus]

  function handleClick(action: GovWorkflowAction) {
    if (ACTION_CONFIG[action].destructive) {
      setPendingAction(action)
    } else {
      onAction(action)
    }
  }

  function confirmAction() {
    if (pendingAction) {
      onAction(pendingAction)
      setPendingAction(null)
    }
  }

  if (availableActions.length === 0) return null

  return (
    <>
      <div
        className={gcn('gov-action-bar', sticky && 'gov-action-bar--sticky', className)}
        {...rest}
      >
        {leading && <div>{leading}</div>}
        <div className="gov-action-bar__spacer" />
        {availableActions.map((action) => {
          const cfg = ACTION_CONFIG[action]
          return (
            <Button
              key={action}
              variant={cfg.variant}
              size="sm"
              onClick={() => handleClick(action)}
            >
              {cfg.label}
            </Button>
          )
        })}
      </div>

      {/* Confirmation dialog for destructive actions */}
      <Modal
        show={pendingAction !== null}
        onHide={() => setPendingAction(null)}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1rem' }}>
            {pendingAction ? ACTION_CONFIG[pendingAction].label : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pendingAction ? ACTION_CONFIG[pendingAction].confirmMessage : ''}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={() => setPendingAction(null)}>
            Abbrechen
          </Button>
          <Button
            variant={pendingAction ? ACTION_CONFIG[pendingAction].variant : 'primary'}
            size="sm"
            onClick={confirmAction}
          >
            Bestätigen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GovActionBar
