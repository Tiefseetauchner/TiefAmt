import type React from "react";

export interface FilterFieldSchema {
  key: string;
  label: string;
  type: "text" | "select" | "daterange" | "multiselect";
  options?: { label: string; value: string }[];
  /** Label for the empty/all option in select fields; omit to not render an empty option */
  emptyOptionLabel?: string;
  /** Accessible label for the "from" date input in daterange fields */
  fromLabel?: string;
  /** Accessible label for the "to" date input in daterange fields */
  toLabel?: string;
}

export interface GovFilterPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  schema: FilterFieldSchema[];
  value: Record<string, unknown>;
  onChange: (filters: Record<string, unknown>) => void;
  /** Heading rendered above the filter fields; omit to render no heading */
  heading?: React.ReactNode;
  collapsible?: boolean;
}
