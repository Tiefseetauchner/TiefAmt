import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { gcn } from "../../utils/govClassNames";
import type { GovActionDef } from "../../types/workflow";
import type { GovActionBarProps } from "./GovActionBar.types";

export function GovActionBar<TKey extends string = string>({
  actions,
  onAction,
  renderConfirm,
  sticky = true,
  leading,
  className,
  ...rest
}: GovActionBarProps<TKey>) {
  const [pendingAction, setPendingAction] = useState<GovActionDef<TKey> | null>(null);

  function handleClick(action: GovActionDef<TKey>) {
    if (action.confirm && renderConfirm) {
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

  function cancelAction() {
    setPendingAction(null);
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

      {renderConfirm && (
        <Modal show={pendingAction !== null} onHide={cancelAction} centered size="sm">
          {pendingAction && renderConfirm(pendingAction, confirmAction, cancelAction)}
        </Modal>
      )}
    </>
  );
}

export default GovActionBar;
