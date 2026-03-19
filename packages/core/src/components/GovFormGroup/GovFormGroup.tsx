import React from "react";
import { Form } from "react-bootstrap";
import { gcn } from "../../utils/govClassNames";
import type { GovFormGroupProps } from "./GovFormGroup.types";

export function GovFormGroup({ inputId, label, required, hint, error, children, className, bsProps, ...rest }: GovFormGroupProps) {
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  // Inject aria-describedby and aria-invalid onto the child input
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const childWithA11y = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required ? true : undefined,
      })
    : children;

  return (
    <Form.Group controlId={inputId} className={gcn("gov-form-group", className)} {...bsProps} {...rest}>
      <Form.Label>
        {label}
        {required && (
          <span className="text-danger ms-1" aria-hidden="true">
            *
          </span>
        )}
      </Form.Label>

      {childWithA11y}

      {hint && !error && (
        <div id={hintId} className="gov-form-group__hint">
          {hint}
        </div>
      )}

      {error && (
        <div id={errorId} className="gov-form-group__error" role="alert">
          {error}
        </div>
      )}
    </Form.Group>
  );
}

export default GovFormGroup;
