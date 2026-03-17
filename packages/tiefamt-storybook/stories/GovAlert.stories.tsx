import '../../core/src/styles/govamt.scss';
import type { Meta, StoryObj } from '@storybook/react'
import { GovAlert, GovProvider } from '@tiefamt/core'

const meta: Meta<typeof GovAlert> = {
  title: 'Components/GovAlert',
  component: GovAlert,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'danger', 'erlass', 'pflichthinweis'],
    },
  },
}
export default meta

type Story = StoryObj<typeof GovAlert>

export const Info: Story = {
  args: { variant: 'info', heading: 'Hinweis', children: 'Dies ist ein informativer Hinweis.' },
}

export const Warning: Story = {
  args: { variant: 'warning', heading: 'Warnung', children: 'Bitte beachten Sie diese Warnung.' },
}

export const Erlass: Story = {
  args: { variant: 'erlass', heading: 'Erlass', children: 'Gemäß Erlass vom 1. Jänner 2026 gilt Folgendes…' },
}

export const Pflichthinweis: Story = {
  args: {
    variant: 'pflichthinweis',
    heading: 'Pflichthinweis',
    children: 'Diese Angaben sind gemäß § 5 Abs. 1 AMG verpflichtend.',
  },
}
