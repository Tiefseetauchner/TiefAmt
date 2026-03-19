// ── Provider & context ────────────────────────────────────────────────────────
export { GovProvider, GovContext, useGovTheme } from "./provider/GovProvider";
export type { GovConfig, GovDensity } from "./provider/GovProvider";

// ── Hooks ─────────────────────────────────────────────────────────────────────
export { useGovSearch } from "./hooks/useGovSearch";
export type { UseGovSearchOptions, UseGovSearchReturn } from "./hooks/useGovSearch";

export { useGovDocumentDrawer } from "./hooks/useGovDocumentDrawer";
export type { UseGovDocumentDrawerReturn } from "./hooks/useGovDocumentDrawer";

// ── Utils ─────────────────────────────────────────────────────────────────────
export { gcn } from "./utils/govClassNames";

// ── Workflow model (shared across DMS components) ─────────────────────────────
export { resolveGovActions } from "./types/workflow";
export type { GovActionDef, GovWorkflowDef, WorkflowStep } from "./types/workflow";

// ── Foundation components ─────────────────────────────────────────────────────
export { GovBanner } from "./components/GovBanner";
export type { GovBannerProps } from "./components/GovBanner";

export { GovFormGroup } from "./components/GovFormGroup";
export type { GovFormGroupProps } from "./components/GovFormGroup";

export { GovTable } from "./components/GovTable";
export type { GovTableProps, GovColumn, SortDirection } from "./components/GovTable";

export { GovAlert } from "./components/GovAlert";
export type { GovAlertProps, GovAlertVariant } from "./components/GovAlert";

export { GovBadge } from "./components/GovBadge";
export type { GovBadgeProps } from "./components/GovBadge";

export { GovNav } from "./components/GovNav";
export type { GovNavProps, GovNavSection, GovNavItem } from "./components/GovNav";

export { GovSidebar } from "./components/GovSidebar";
export type { GovSidebarProps } from "./components/GovSidebar";

export type { GovBadgeVariant } from "./types/GovBadgeVariant";

// ── DMS — workflow & state ────────────────────────────────────────────────────
export { GovStatusBadge } from "./components/GovStatusBadge";
export type { GovStatusBadgeProps } from "./components/GovStatusBadge";

export { GovWorkflowTracker } from "./components/GovWorkflowTracker";
export type { GovWorkflowTrackerProps } from "./components/GovWorkflowTracker";

export { GovActionBar } from "./components/GovActionBar";
export type { GovActionBarProps } from "./components/GovActionBar";

// ── DMS — search & filtering ──────────────────────────────────────────────────
export { GovSearchBar } from "./components/GovSearchBar";
export type { GovSearchBarProps } from "./components/GovSearchBar";

export { GovFilterChip } from "./components/GovFilterChip";
export type { GovFilterChipProps } from "./components/GovFilterChip";

export { customFilter, GovFilterPanel } from "./components/GovFilterPanel";
export type {
  GovFilterPanelProps,
  GovFilterFieldType,
  FilterField,
  CustomFilterEntry,
  FilterFieldProps,
  TextFilterField,
  SelectFilterField,
  MultiSelectFilterField,
  DateRangeFilterField,
} from "./components/GovFilterPanel";

export { GovDataTable } from "./components/GovDataTable";
export type { GovDataTableProps, GovColumnDef } from "./components/GovDataTable";

// ── DMS — document preview ────────────────────────────────────────────────────
export { GovPageThumbnail } from "./components/GovPageThumbnail";
export type { GovPageThumbnailProps } from "./components/GovPageThumbnail";

export { GovDocumentCard } from "./components/GovDocumentCard";
export type { GovDocumentCardProps } from "./components/GovDocumentCard";

export { GovPdfViewer } from "./components/GovPdfViewer";
export type { GovPdfViewerProps, GovPdfViewerMode } from "./components/GovPdfViewer";

export { GovDocumentDrawer } from "./components/GovDocumentDrawer";
export type { GovDocumentDrawerProps } from "./components/GovDocumentDrawer";
