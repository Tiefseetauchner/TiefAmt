import '../../core/src/styles/govamt.scss';
import type { Meta, StoryObj } from '@storybook/react'
import { GovActionBar, GovProvider } from '@tiefamt/core'

const meta: Meta<typeof GovActionBar> = {
  title: 'DMS/GovActionBar',
  component: GovActionBar,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ padding: '1.5rem', paddingBottom: 0, background: '#f8f8f7', minHeight: '200px' }}>
          <p>Dokumentinhalt…</p>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
  argTypes: {
    documentStatus: {
      control: 'select',
      options: ['draft', 'submitted', 'under-review', 'approved', 'rejected', 'returned'],
    },
  },
}
export default meta

type Story = StoryObj<typeof GovActionBar>

export const Submitted: Story = {
  args: { documentStatus: 'submitted', sticky: false, onAction: (a) => alert(a) },
}

export const Draft: Story = {
  args: { documentStatus: 'draft', sticky: false, onAction: (a) => alert(a) },
}

export const Approved: Story = {
  args: { documentStatus: 'approved', sticky: false, onAction: (a) => alert(a) },
}
