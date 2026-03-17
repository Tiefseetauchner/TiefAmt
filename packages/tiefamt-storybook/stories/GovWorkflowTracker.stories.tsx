import '../../core/src/styles/govamt.scss';
import type { Meta, StoryObj } from '@storybook/react'
import { GovProvider, GovWorkflowTracker } from '@tiefamt/core'
import type { WorkflowStep } from '@tiefamt/core'

const STEPS: WorkflowStep[] = [
  { id: '1', label: 'Eingereicht', status: 'complete', assignee: 'M. Mustermann', completedAt: '10.03.2026' },
  { id: '2', label: 'Erstprüfung', status: 'complete', assignee: 'Ref. A', completedAt: '12.03.2026' },
  { id: '3', label: 'Abteilungsleiter', status: 'active', assignee: 'AL Huber' },
  { id: '4', label: 'Genehmigung', status: 'pending' },
]

const meta: Meta<typeof GovWorkflowTracker> = {
  title: 'DMS/GovWorkflowTracker',
  component: GovWorkflowTracker,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ padding: '1.5rem' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
}
export default meta

type Story = StoryObj<typeof GovWorkflowTracker>

export const Horizontal: Story = { args: { steps: STEPS, orientation: 'horizontal' } }
export const Vertical: Story = { args: { steps: STEPS, orientation: 'vertical' } }
export const WithReturned: Story = {
  args: {
    steps: [
      ...STEPS.slice(0, 2),
      { id: '3', label: 'Abteilungsleiter', status: 'returned', assignee: 'AL Huber', completedAt: '14.03.2026' },
      { id: '4', label: 'Genehmigung', status: 'pending' },
    ],
    orientation: 'horizontal',
  },
}
