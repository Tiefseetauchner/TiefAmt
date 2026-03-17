import type React from 'react'
import type { FormGroupProps } from 'react-bootstrap'

export interface GovFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Input id — wires label htmlFor and aria-describedby automatically */
  inputId: string
  /** Label text */
  label: React.ReactNode
  /** Whether the field is required */
  required?: boolean
  /** Hint text shown below the input */
  hint?: React.ReactNode
  /** Validation error message; presence implies invalid state */
  error?: React.ReactNode
  /** The actual input/select/textarea element */
  children: React.ReactNode
  /** Props forwarded to the React Bootstrap Form.Group */
  bsProps?: Omit<FormGroupProps, 'controlId' | 'children'>
}
