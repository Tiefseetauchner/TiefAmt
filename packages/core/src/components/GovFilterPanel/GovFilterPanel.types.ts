import type React from "react";

export interface FilterFieldProps<TKey extends string, TType extends string, TFilterFieldType, TFilterValueType> {
  field: FilterField<TKey, TType, TFilterFieldType, TFilterValueType>;
  value: TFilterValueType;
  onChange: (val: TFilterValueType | undefined) => void;
  customFilterFields?: CustomFilterEntry<TKey, TType>[];
}

export type GovFilterFieldType = "text" | "select" | "daterange" | "multiselect";

export interface FilterField<TKey extends string, TType extends string, _TFilterFieldType, _TFilterValueType> {
  key: TKey;
  type: TType;
  label: string;
}

export interface TextFilterField<TKey extends string> extends FilterField<TKey, "text", string, string> {}

export interface SelectFilterField<TKey extends string, TFilterFieldType> extends FilterField<TKey, "select", TFilterFieldType, TFilterFieldType> {
  options: { label: string; value: TFilterFieldType }[];
  emptyOptionLabel: string;
}

export interface MultiSelectFilterField<TKey extends string, TFilterFieldType extends { id: string | number }> extends FilterField<
  TKey,
  "multiselect",
  TFilterFieldType,
  TFilterFieldType["id"][]
> {
  options: { label: string; value: TFilterFieldType }[];
  emptyOptionLabel?: string;
}

export interface DateRangeFilterField<TKey extends string> extends FilterField<
  TKey,
  "daterange",
  { from?: string; to?: string } | undefined,
  { from?: string; to?: string } | undefined
> {
  fromLabel?: string;
  toLabel?: string;
}

export interface CustomFilterEntry<TKey extends string, TType extends string> {
  key: TType;
  field: (field: FilterField<TKey, TType, any, any>, value: any, onChange: (val: any) => void) => React.ReactNode;
}

export interface GovFilterPanelProps<TKey extends string = string, TType extends GovFilterFieldType | string = GovFilterFieldType> extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  schema: FilterField<TKey, TType, unknown, unknown>[];
  value: Record<string, unknown>;
  customFilterFields?: CustomFilterEntry<TKey, TType>[];
  onChange: (filters: Record<string, unknown>) => void;
  heading?: React.ReactNode;
  collapsible?: boolean;
}
