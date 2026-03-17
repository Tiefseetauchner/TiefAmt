'use client';

import { Nav, Form } from 'react-bootstrap';
import {
  GovProvider,
  GovPage,
  GovHeader,
  GovBanner,
  GovSidebar,
  GovFooter,
  GovTable,
  GovAlert,
  GovBadge,
  GovFormGroup,
  GovStatusBadge,
  GovWorkflowTracker,
} from '@tiefamt/core';
import type { GovColumn, WorkflowStep } from '@tiefamt/core';

interface Row {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'pending' | 'approved';
}

const COLS: GovColumn<Row>[] = [
  { key: 'id', header: 'Aktenzeichen' },
  { key: 'name', header: 'Antragsteller' },
  { key: 'type', header: 'Antragsart' },
  {
    key: 'status',
    header: 'Status',
    render: (v) => <GovBadge variant={v as Row['status']} />,
  },
];

const ROWS: Row[] = [
  { id: 'AZ-2026-001', name: 'Mustermann, Max', type: 'Gewerbeanmeldung', status: 'active' },
  { id: 'AZ-2026-002', name: 'Musterfrau, Maria', type: 'Baugenehmigung', status: 'pending' },
  { id: 'AZ-2026-003', name: 'Schmidt, Josef', type: 'Reisepass', status: 'approved' },
];

const SECTIONS = [
  {
    heading: 'Hauptnavigation',
    items: [
      { label: 'Startseite', href: '/' },
      { label: 'Anträge', href: '#stuff1' },
      { label: 'Dokumente', href: '#stuff2' },
      { label: 'Einstellungen', href: '#stuff3' },
    ],
  },
  {
    heading: 'Verwaltung',
    items: [
      { label: 'Benutzer', href: '#stuff4' },
      { label: 'Berichte', href: '#stuff5' },
    ],
  },
];

const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: '1', label: 'Einreichung', status: 'complete', completedAt: '2026-03-10' },
  { id: '2', label: 'Formale Prüfung', status: 'complete', completedAt: '2026-03-12' },
  { id: '3', label: 'Sachbearbeitung', status: 'active', assignee: 'Mag. Hofbauer' },
  { id: '4', label: 'Genehmigung', status: 'pending' },
];

interface DemoContentProps {
  agencyName: string;
  presetLabel: string;
}

export default function DemoContent({ agencyName, presetLabel }: DemoContentProps) {
  return (
    <GovProvider config={{ agencyName, density: 'default', locale: 'de-AT' }}>
      <GovPage
        header={
          <GovHeader>
            <Nav className="ms-auto gap-1">
              <Nav.Link href="homepage">Startseite</Nav.Link>
              <Nav.Link href="services">Dienste</Nav.Link>
              <Nav.Link href="contact">Kontakt</Nav.Link>
            </Nav>
          </GovHeader>
        }
        banner={
          <GovBanner forceShow>
            Dies ist eine Testseite für TiefAmt — Preset: <strong>{presetLabel}</strong>
          </GovBanner>
        }
        sidebar={<GovSidebar sections={SECTIONS} style={{ width: '220px' }} />}
        footer={
          <GovFooter
            links={[
              { label: 'Impressum', href: '#' },
              { label: 'Datenschutz', href: '#' },
              { label: 'Barrierefreiheit', href: '#' },
            ]}
          />
        }
      >
        <h1>Antragsübersicht</h1>

        <GovAlert variant="info" heading="Hinweis">
          Neue Einreichungen werden werktags innerhalb von 5 Tagen bearbeitet.
        </GovAlert>

        <h2 className="mt-4 mb-3">Aktuelle Anträge</h2>
        <GovTable columns={COLS} data={ROWS} rowKey={(r) => r.id} caption="Eingegangene Anträge" />

        <h2 className="mt-4 mb-3">Antrag AZ-2026-002 — Bearbeitungsstatus</h2>
        <div className="d-flex align-items-center gap-3 mb-3">
          <span>Aktueller Status:</span>
          <GovStatusBadge status="under-review" />
        </div>
        <GovWorkflowTracker steps={WORKFLOW_STEPS} />

        <h2 className="mt-4 mb-3">Suche & Filterung</h2>
        <GovFormGroup inputId="aktenzeichen" label="Aktenzeichen" hint="Format: AZ-YYYY-NNN">
          <Form.Control type="search" placeholder="AZ-2026-…" />
        </GovFormGroup>
        <GovFormGroup inputId="status-filter" label="Status">
          <Form.Select>
            <option value="">Alle</option>
            <option value="active">Aktiv</option>
            <option value="pending">Ausstehend</option>
            <option value="approved">Genehmigt</option>
          </Form.Select>
        </GovFormGroup>

        <div className="mt-3 d-flex gap-2">
          <GovBadge variant="active" />
          <GovBadge variant="pending" />
          <GovBadge variant="approved" />
          <GovBadge variant="revoked" />
        </div>
      </GovPage>
    </GovProvider>
  );
}
