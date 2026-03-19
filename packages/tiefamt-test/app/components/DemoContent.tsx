"use client";

import {
  CustomFilterEntry,
  FilterField,
  GovActionBar,
  GovAlert,
  GovBadge,
  GovBadgeVariant,
  GovBanner,
  GovDataTable,
  GovDocumentCard,
  GovDocumentDrawer,
  GovFilterFieldType,
  GovFilterPanel,
  GovProvider,
  GovStatusBadge,
  GovWorkflowDef,
  MultiSelectFilterField,
  SelectFilterField,
  customFilter,
  resolveGovActions,
} from "@tiefamt/core";
import { useEffect, useState } from "react";
import { Button, Container, Modal, ToggleButton } from "react-bootstrap";

interface DemoContentProps {
  agencyName: string;
  presetLabel: string;
}

type WorkflowStates = "incoming" | "inprogress" | "inreview" | "resolved" | "archived";
type WorkflowTransitions = "startprogress" | "startreview" | "resolve" | "reopen" | "archive";
const docStates: { state: WorkflowStates; label: string }[] = [
  { state: "archived", label: "Archived" },
  { state: "incoming", label: "Incoming" },
  { state: "inprogress", label: "In Progress" },
  { state: "inreview", label: "In Review" },
  { state: "resolved", label: "Resolved" },
];
const workflow: GovWorkflowDef<WorkflowStates, WorkflowTransitions> = {
  transitions: {
    archived: [],
    incoming: ["startprogress", "archive"],
    inprogress: ["reopen", "startreview", "archive"],
    inreview: ["reopen", "resolve", "archive"],
    resolved: ["reopen", "archive"],
  },
  actions: [
    { key: "startprogress", label: "Start Progress", variant: "info" },
    { key: "startreview", label: "Start Review", variant: "info" },
    { key: "resolve", label: "Resolve", variant: "success" },
    { key: "archive", label: "Archive", confirm: "You're about to irreversibly archive this item!" },
    { key: "reopen", label: "Back to Incoming", variant: "warning" },
  ],
};
const getBadgeVariantFromState = (state: WorkflowStates) => {
  switch (state) {
    case "incoming":
      return "neutral";
      break;
    case "inprogress":
      return "neutral";
      break;
    case "inreview":
      return "neutral";
      break;
    case "resolved":
      return "success";
      break;
    case "archived":
      return "danger";
      break;
  }
};
type Doc = {
  id: number;
  state: WorkflowStates;
  name: string;
};

type CustomFilterPanelTypes = GovFilterFieldType | "toggle";
type FilterPanelKeys = "john" | "frances" | "problemchild";

interface ToggleFilterField<TKey extends string> extends FilterField<TKey, "toggle", boolean, boolean> {}

export default function DemoContent({ agencyName, presetLabel }: DemoContentProps) {
  let [currentDocState, setCurrentDocState] = useState<WorkflowStates>("incoming");
  let [currentBadgeVariant, setCurrentBadgeVariant] = useState<GovBadgeVariant>("neutral");
  let [currentPage, setCurrentPage] = useState<number>(1);
  let [currentSort, setCurrentSort] = useState<{ column: string; direction: "asc" | "desc" }>({
    column: "n",
    direction: "asc",
  });
  let [activeDocument, setActiveDocument] = useState<Doc | undefined>();
  let [filters, setFilters] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setCurrentBadgeVariant(getBadgeVariantFromState(currentDocState));
  }, [currentDocState]);

  return (
    <GovProvider config={{ agencyName, density: "default", locale: "de-AT" }}>
      <Container>
        <GovActionBar
          actions={resolveGovActions(workflow, currentDocState)}
          onAction={(key) => {
            switch (key) {
              case "reopen":
                setCurrentDocState("incoming");
                break;
              case "archive":
                setCurrentDocState("archived");
                break;
              case "startprogress":
                setCurrentDocState("inprogress");
                break;
              case "startreview":
                setCurrentDocState("inreview");
                break;
              case "resolve":
                setCurrentDocState("resolved");
                break;
              default:
                throw new Error("Unknown transition event.");
            }
          }}
          renderConfirm={(action, onConfirm, onCancel) => (
            <>
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1rem" }}>{action.label}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{action.confirm}</Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" size="sm" onClick={onCancel}>
                  ABORT!!!!
                </Button>
                <Button variant={action.variant ?? "primary"} size="sm" onClick={onConfirm}>
                  ok :)
                </Button>
              </Modal.Footer>
            </>
          )}
        />
        <GovAlert accent variant={"info"} heading={""} dismissible>
          <p>Visiting preset "{presetLabel}"</p>
        </GovAlert>
        <GovBadge variant={currentBadgeVariant}>{docStates.find((s) => s.state == currentDocState)?.label}</GovBadge>
        <GovBanner dismissible dismissLabel="Dismiss">
          This is a test site, do not enter real information
        </GovBanner>
        <GovDataTable<Doc>
          totalCount={20}
          pageSize={5}
          page={currentPage}
          onPageChange={(p) => setCurrentPage(p)}
          columns={[
            { key: "n", header: "Name", render: (d) => d.name, sortable: true },
            {
              key: "s",
              header: "Status",
              render: (d) => <GovBadge variant={getBadgeVariantFromState(d.state)}>{docStates.find((s) => d.state === s.state)?.label}</GovBadge>,
              sortable: true,
            },
          ]}
          data={[
            { id: 1, name: `Hello, page ${currentPage}.1`, state: "incoming" },
            { id: 1, name: `Hello, page ${currentPage}.2`, state: "inprogress" },
            { id: 1, name: `Hello, page ${currentPage}.3`, state: "inreview" },
            { id: 1, name: `Hello, page ${currentPage}.4`, state: "resolved" },
            { id: 1, name: `Hello, page ${currentPage}.5`, state: "archived" },
          ]}
          sortColumn={currentSort.column}
          sortDirection={currentSort.direction}
          onSortChange={(c, d) => setCurrentSort({ column: c, direction: d })}
        />
        <GovDataTable<Doc>
          totalCount={20}
          pageSize={5}
          page={currentPage}
          onPageChange={(p) => setCurrentPage(p)}
          columns={[
            { key: "n", header: "Name", render: (d) => d.name, sortable: true },
            {
              key: "s",
              header: "Status",
              render: (d) => <GovBadge variant={getBadgeVariantFromState(d.state)}>{docStates.find((s) => d.state === s.state)?.label}</GovBadge>,
              sortable: true,
            },
          ]}
          data={[
            { id: 1, name: `Hello, page ${currentPage}.1`, state: "incoming" },
            { id: 2, name: `Hello, page ${currentPage}.2`, state: "inprogress" },
            { id: 3, name: `Hello, page ${currentPage}.3`, state: "inreview" },
            { id: 4, name: `Hello, page ${currentPage}.4`, state: "resolved" },
            { id: 5, name: `Hello, page ${currentPage}.5`, state: "archived" },
          ]}
          rowId={(doc) => `${doc.id}`}
          sortColumn={currentSort.column}
          sortDirection={currentSort.direction}
          onSortChange={(c, d) => setCurrentSort({ column: c, direction: d })}
          onRowClick={(row) => setActiveDocument(row)}
        />
        <GovDataTable<string>
          columns={[
            {
              key: "name",
              header: "Name",
              render: (row) => row,
            },
          ]}
          data={[]}
          totalCount={0}
          page={0}
          onPageChange={() => {}}
          pageSize={Infinity}
          renderEmpty={() => "Empty"}
        />

        <GovDocumentCard title={activeDocument?.name ?? ""} documentType="Complaint Record" date="10. 0. 2021" status="info" statusLabel="toggle" />

        <GovDocumentDrawer show={activeDocument !== undefined} onHide={() => setActiveDocument(undefined)} title={activeDocument?.name}>
          <GovStatusBadge status={getBadgeVariantFromState(activeDocument?.state ?? "incoming")} label={activeDocument?.state ?? ""} />
          <GovActionBar
            actions={resolveGovActions(workflow, currentDocState)}
            onAction={(key) => {
              switch (key) {
                case "reopen":
                  setCurrentDocState("incoming");
                  break;
                case "archive":
                  setCurrentDocState("archived");
                  break;
                case "startprogress":
                  setCurrentDocState("inprogress");
                  break;
                case "startreview":
                  setCurrentDocState("inreview");
                  break;
                case "resolve":
                  setCurrentDocState("resolved");
                  break;
                default:
                  throw new Error("Unknown transition event.");
              }
            }}
          />
        </GovDocumentDrawer>

        <GovFilterPanel<FilterPanelKeys, CustomFilterPanelTypes>
          schema={[
            {
              key: "john",
              label: "John",
              type: "select",
              options: [
                { label: "Magic", value: { id: 1, name: "Nothing", state: "archived" } },
                { label: "Fun", value: { id: 2, name: "Nothing", state: "archived" } },
                { label: "Omnibus", value: { id: 3, name: "Nothing", state: "archived" } },
              ],
              emptyOptionLabel: "Select your option of doom",
            } as SelectFilterField<FilterPanelKeys, Doc>,
            {
              key: "problemchild",
              label: "Multiple Select Problem Child",
              type: "multiselect",
              options: [
                { label: "Magic", value: { id: 1, name: "Nothing", state: "archived" } },
                { label: "Fun", value: { id: 2, name: "Nothing", state: "archived" } },
                { label: "Omnibus", value: { id: 3, name: "Nothing", state: "archived" } },
              ],
              emptyOptionLabel: "Select your option of doom",
            } as MultiSelectFilterField<FilterPanelKeys, Doc>,
            {
              key: "frances",
              type: "toggle",
              label: "Frances",
            } as ToggleFilterField<"frances">,
          ]}
          customFilterFields={[
            customFilter<FilterPanelKeys, CustomFilterPanelTypes, boolean>({
              key: "toggle",
              field(field, value, onChange) {
                return (
                  <ToggleButton
                    id={field.key}
                    checked={value}
                    variant={value ? "danger" : "success"}
                    onClick={() => onChange(!value)}
                    value={`${value}`}
                  >
                    {value ? "Turn off" : "Turn on"}
                  </ToggleButton>
                );
              },
            }),
          ]}
          value={filters}
          onChange={function (filters: Record<string, unknown>): void {
            setFilters(filters);
          }}
        />
      </Container>
    </GovProvider>
  );
}
