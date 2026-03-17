import '../../core/src/styles/govamt.scss';
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  GovDocumentDrawer,
  GovPdfViewer,
  GovProvider,
} from '@tiefamt/core'
import type { GovDocumentMeta, GovWorkflowAction } from '@tiefamt/core'

const DOC: GovDocumentMeta = {
  id: 'AZ-2026-042',
  title: 'Baugenehmigung Hauptstraße 12',
  type: 'Bescheid',
  status: 'submitted',
  date: '17.03.2026',
  workflowSteps: [
    { id: '1', label: 'Eingereicht', status: 'complete', assignee: 'M. Mustermann', completedAt: '15.03.2026' },
    { id: '2', label: 'Erstprüfung', status: 'active', assignee: 'Ref. Bau' },
    { id: '3', label: 'Genehmigung', status: 'pending' },
  ],
}

const meta: Meta = {
  title: 'DMS/GovDocumentDrawer',
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Stadtbauamt' }}>
        <Story />
      </GovProvider>
    ),
  ],
}
export default meta

export const Default: StoryObj = {
  render: () => {
    const [show, setShow] = useState(false)
    function handleAction(action: GovWorkflowAction, id: string) {
      alert(`Action: ${action} on ${id}`)
      setShow(false)
    }
    return (
      <>
        <div style={{ padding: '1.5rem' }}>
          <Button onClick={() => setShow(true)}>Dokument öffnen</Button>
        </div>
        <GovDocumentDrawer
          show={show}
          onHide={() => setShow(false)}
          document={DOC}
          onAction={handleAction}
          renderPreview={() => (
            <GovPdfViewer
              mode="jpeg"
              pages={[
                'https://placehold.co/600x800/e8e8e8/5a6a8a?text=Seite+1',
                'https://placehold.co/600x800/e8e8e8/5a6a8a?text=Seite+2',
              ]}
            />
          )}
        />
      </>
    )
  },
}
