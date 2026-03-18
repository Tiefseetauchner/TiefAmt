import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { gcn } from "../../utils/govClassNames";
import type { GovActionDef } from "../../types/workflow";
import type { GovActionBarProps } from "./GovActionBar.types";

export function GovActionBar<TKey extends string = string>({
  actions,
  onAction,
  sticky = true,
  leading,
  className,
  ...rest
}: GovActionBarProps<TKey>) {
  const [pendingAction, setPendingAction] = useState<GovActionDef<TKey> | null>(null);

  function handleClick(action: GovActionDef<TKey>) {
    if (action.confirm) {
      setPendingAction(action);
    } else {
      onAction(action.key);
    }
  }

  function confirmAction() {
    if (pendingAction) {
      onAction(pendingAction.key);
      setPendingAction(null);
    }
  }

  if (actions.length === 0) return null;

  return (
    <>
      <div className={gcn("gov-action-bar", sticky && "gov-action-bar--sticky", className)} {...rest}>
        {leading && <div>{leading}</div>}
        <div className="gov-action-bar__spacer" />
        {actions.map((action) => (
          <Button key={action.key} variant={action.variant ?? "secondary"} size="sm" onClick={() => handleClick(action)}>
            {action.label}
          </Button>
        ))}
      </div>

      <Modal show={pendingAction !== null} onHide={() => setPendingAction(null)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1rem" }}>{pendingAction?.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{pendingAction?.confirm}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={() => setPendingAction(null)}>
            Abbrechen
          </Button>
          <Button variant={pendingAction?.variant ?? "primary"} size="sm" onClick={confirmAction}>
            Bestätigen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GovActionBar;
