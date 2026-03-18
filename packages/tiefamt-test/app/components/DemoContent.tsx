"use client";

import { GovActionBar, GovAlert, GovBadge, GovBadgeVariant, GovProvider, GovWorkflowDef, resolveGovActions } from "@tiefamt/core";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

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
    { key: "archive", label: "Archive", confirm: "This action is irrevocable! Do you want to archive this item?" },
    { key: "reopen", label: "Back to Incoming", variant: "warning" },
  ],
};

export default function DemoContent({ agencyName, presetLabel }: DemoContentProps) {
  let [currentDocState, setCurrentDocState] = useState<WorkflowStates>("incoming");
  let [currentBadgeVariant, setCurrentBadgeVariant] = useState<GovBadgeVariant>("neutral");

  useEffect(() => {
    switch (currentDocState) {
      case "incoming":
        setCurrentBadgeVariant("neutral");
        break;
      case "inprogress":
        setCurrentBadgeVariant("neutral");
        break;
      case "inreview":
        setCurrentBadgeVariant("neutral");
        break;
      case "resolved":
        setCurrentBadgeVariant("success");
        break;
      case "archived":
        setCurrentBadgeVariant("danger");
        break;
    }
  }, [currentDocState]);

  return (
    <GovProvider config={{ agencyName, density: "default", locale: "de-AT" }}>
      <Container className="gx-2">
        <Row>
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
        </Row>

        <Row>
          <GovAlert accent variant={"info"} heading={""} dismissible>
            <p>Visiting preset "{presetLabel}"</p>
          </GovAlert>
        </Row>

        <GovBadge variant={currentBadgeVariant}>{docStates.find((s) => s.state == currentDocState)?.label}</GovBadge>
      </Container>
    </GovProvider>
  );
}
