import { useState } from "react";
import { Form } from "react-bootstrap";
import { gcn } from "../../utils/govClassNames";
import type React from "react";
import type {
  FilterFieldProps,
  DateRangeFilterField,
  GovFilterFieldType,
  GovFilterPanelProps,
  MultiSelectFilterField,
  SelectFilterField,
  FilterField,
  CustomFilterEntry,
} from "./GovFilterPanel.types";

export function customFilter<TKey extends string, TType extends string, TFilterFieldType>(def: {
  key: TType;
  field: (
    field: FilterField<TKey, TType, TFilterFieldType, TFilterFieldType>,
    value: TFilterFieldType,
    onChange: (val: TFilterFieldType) => void,
  ) => React.ReactNode;
}): CustomFilterEntry<TKey, TType> {
  return def as CustomFilterEntry<TKey, TType>;
}

function FilterFieldControl<TKey extends string, TType extends string, TFilterFieldType, TFilterValueType>({
  field,
  value,
  onChange,
  customFilterFields,
}: FilterFieldProps<TKey, TType, TFilterFieldType, TFilterValueType>): React.ReactNode {
  switch (field.type) {
    case "text":
      return (
        <Form.Control
          type="text"
          size="sm"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value as TFilterValueType)}
          placeholder={field.label}
        />
      );

    case "select": {
      const selectField = field as unknown as SelectFilterField<TKey, TFilterValueType>;
      const selectOptionsMapping = selectField.options.map((opt, i) => ({ key: `${i}`, option: opt }));
      return (
        <Form.Select
          size="sm"
          value={selectOptionsMapping.find((o) => o.option.value === value)?.key}
          onChange={(e) => {
            onChange(selectOptionsMapping.find((opt) => opt.key === e.target.value)?.option.value);
          }}
        >
          {selectField.emptyOptionLabel !== undefined && <option value="">{selectField.emptyOptionLabel}</option>}
          {selectOptionsMapping?.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.option.label}
            </option>
          ))}
        </Form.Select>
      );
    }

    case "multiselect": {
      const multiSelectField = field as unknown as MultiSelectFilterField<TKey, { id: string | number }>;
      const selectedIds = (value as Array<string | number> | undefined) ?? [];
      return (
        <div className="d-flex flex-column gap-1">
          {multiSelectField.options.map((opt) => {
            const checked = selectedIds.includes(opt.value.id);
            return (
              <Form.Check
                key={opt.value.id}
                type="checkbox"
                id={`filter-${multiSelectField.key}-${opt.value.id}`}
                label={opt.label}
                checked={checked}
                onChange={() => {
                  const next = checked
                    ? selectedIds.filter((id) => id !== opt.value.id)
                    : [...selectedIds, opt.value.id];
                  onChange(next as TFilterValueType);
                }}
              />
            );
          })}
        </div>
      );
    }

    case "daterange": {
      const dateRangeField = field as DateRangeFilterField<TKey>;
      const range = (value as { from?: string; to?: string } | undefined) ?? {};
      return (
        <div className="d-flex gap-1">
          <Form.Control
            type="date"
            size="sm"
            value={range.from ?? ""}
            onChange={(e) => onChange({ ...range, from: e.target.value } as TFilterValueType)}
            aria-label={dateRangeField.fromLabel}
          />
          <Form.Control
            type="date"
            size="sm"
            value={range.to ?? ""}
            onChange={(e) => onChange({ ...range, to: e.target.value } as TFilterValueType)}
            aria-label={dateRangeField.toLabel}
          />
        </div>
      );
    }

    default: {
      const customField = customFilterFields?.find((f) => f.key == field.type);
      return customField?.field(field, value, onChange) ?? <p style={{ color: "red" }}>No element could be found to render your option!</p>;
    }
  }
}

export function GovFilterPanel<TKey extends string = string, TType extends GovFilterFieldType | string = GovFilterFieldType>({
  schema,
  value,
  customFilterFields,
  onChange,
  heading,
  collapsible = false,
  className,
  ...rest
}: GovFilterPanelProps<TKey, TType>) {
  const [collapsed, setCollapsed] = useState(false);

  function updateField(key: string, val: unknown) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className={gcn("gov-filter-panel", className)} {...rest}>
      {(heading !== undefined || collapsible) && (
        <div className="gov-filter-panel__heading">
          {heading}
          {collapsible && (
            <button type="button" className="gov-filter-panel__toggle" onClick={() => setCollapsed((c) => !c)} aria-expanded={!collapsed}>
              {collapsed ? "▼" : "▲"}
            </button>
          )}
        </div>
      )}

      {!collapsed &&
        schema.map((field) => (
          <div key={field.key} className="gov-filter-panel__group">
            <label className="gov-filter-panel__group-label" htmlFor={`filter-${field.key}`}>
              {field.label}
            </label>
            <FilterFieldControl
              field={field}
              value={value[field.key]}
              onChange={(val) => updateField(field.key, val)}
              customFilterFields={customFilterFields}
            />
          </div>
        ))}
    </div>
  );
}

export default GovFilterPanel;
