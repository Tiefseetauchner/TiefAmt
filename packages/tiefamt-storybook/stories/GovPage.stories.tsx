import type { Meta, StoryObj } from '@storybook/react'
import { Form } from 'react-bootstrap'
import {
  GovAlert,
  GovBadge,
  GovBanner,
  GovFooter,
  GovFormGroup,
  GovHeader,
  GovPage,
  GovProvider,
  GovSidebar,
  GovTable,
} from 'tiefamt'
import type { GovColumn } from 'tiefamt'

const meta: Meta<typeof GovPage> = {
  title: 'Layouts/GovPage',
  component: GovPage,
  parameters: { layout: 'fullscreen' },
}
export default meta

interface Row { id: string; name: string; status: 'active' | 'pending' | 'approved' }
const COLS: GovColumn<Row>[] = [
  { key: 'id', header: 'Aktenzeichen' },
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status', render: (v) => <GovBadge variant={v as Row['status']} /> },
]
const ROWS: Row[] = [
  { id: 'AZ-001', name: 'Mustermann', status: 'active' },
  { id: 'AZ-002', name: 'Musterfrau', status: 'pending' },
]

const SECTIONS = [
  {
    heading: 'Navigation',
    items: [
      { label: 'Startseite', href: '#', active: true },
      { label: 'Anträge', href: '#' },
    ],
  },
]

type Story = StoryObj<typeof GovPage>

export const FullPage: Story = {
  render: () => (
    <GovProvider config={{ agencyName: 'Bundesministerium für Inneres', density: 'default' }}>
      <GovPage
        header={<GovHeader />}
        banner={<GovBanner forceShow />}
        sidebar={<GovSidebar sections={SECTIONS} style={{ width: '220px' }} />}
        footer={
          <GovFooter
            links={[
              { label: 'Impressum', href: '#' },
              { label: 'Datenschutz', href: '#' },
            ]}
          />
        }
      >
        <h1>Antragsübersicht</h1>
        <GovAlert variant="info" heading="Hinweis">
          Neue Einreichungen werden werktags innerhalb von 5 Tagen bearbeitet.
        </GovAlert>
        <GovTable columns={COLS} data={ROWS} rowKey={(r) => r.id} caption="Aktuelle Anträge" />
        <hr />
        <GovFormGroup inputId="suche" label="Aktenzeichen suchen">
          <Form.Control type="search" placeholder="AZ-2026-…" />
        </GovFormGroup>
      </GovPage>
    </GovProvider>
  ),
}
