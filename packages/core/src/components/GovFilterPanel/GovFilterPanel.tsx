import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { gcn } from '../../utils/govClassNames'
import type { FilterFieldSchema, GovFilterPanelProps } from './GovFilterPanel.types'

function FilterField({
  field,
  value,
  onChange,
}: {
  field: FilterFieldSchema
  value: unknown
  onChange: (val: unknown) => void
}) {
  switch (field.type) {
    case 'text':
      return (
        <Form.Control
          type="text"
          size="sm"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.label}
        />
      )

    case 'select':
      return (
        <Form.Select
          size="sm"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— Alle —</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Form.Select>
      )

    case 'multiselect':
      return (
        <div className="d-flex flex-column gap-1">
          {field.options?.map((opt) => {
            const selected = (value as string[] | undefined) ?? []
            const checked = selected.includes(opt.value)
            return (
              <Form.Check
                key={opt.value}
                type="checkbox"
                id={`filter-${field.key}-${opt.value}`}
                label={opt.label}
                checked={checked}
                onChange={() => {
                  const next = checked
                    ? selected.filter((v) => v !== opt.value)
                    : [...selected, opt.value]
                  onChange(next)
                }}
              />
            )
          })}
        </div>
      )

    case 'daterange': {
      const range = (value as { from?: string; to?: string } | undefined) ?? {}
      return (
        <div className="d-flex gap-1">
          <Form.Control
            type="date"
            size="sm"
            value={range.from ?? ''}
            onChange={(e) => onChange({ ...range, from: e.target.value })}
            aria-label={`${field.label} von`}
          />
          <Form.Control
            type="date"
            size="sm"
            value={range.to ?? ''}
            onChange={(e) => onChange({ ...range, to: e.target.value })}
            aria-label={`${field.label} bis`}
          />
        </div>
      )
    }
  }
}

export function GovFilterPanel({
  schema,
  value,
  onChange,
  collapsible = false,
  className,
  ...rest
}: GovFilterPanelProps) {
  const [collapsed, setCollapsed] = useState(false)

  function updateField(key: string, val: unknown) {
    onChange({ ...value, [key]: val })
  }

  return (
    <div className={gcn('gov-filter-panel', className)} {...rest}>
      <div className="gov-filter-panel__heading">
        Filter
        {collapsible && (
          <button
            type="button"
            className="gov-filter-panel__toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-expanded={!collapsed}
          >
            {collapsed ? '▼' : '▲'}
          </button>
        )}
      </div>

      {!collapsed && schema.map((field) => (
        <div key={field.key} className="gov-filter-panel__group">
          <label className="gov-filter-panel__group-label" htmlFor={`filter-${field.key}`}>
            {field.label}
          </label>
          <FilterField
            field={field}
            value={value[field.key]}
            onChange={(val) => updateField(field.key, val)}
          />
        </div>
      ))}
    </div>
  )
}

export default GovFilterPanel
