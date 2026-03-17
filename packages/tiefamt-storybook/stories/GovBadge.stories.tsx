import type { Meta, StoryObj } from '@storybook/react'
import { GovBadge, GovProvider } from 'tiefamt'

const meta: Meta<typeof GovBadge> = {
  title: 'Components/GovBadge',
  component: GovBadge,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['active', 'pending', 'revoked', 'expired', 'draft', 'approved'],
    },
  },
}
export default meta

type Story = StoryObj<typeof GovBadge>

export const AllVariants: Story = {
  render: () => (
    <>
      <GovBadge variant="active" />
      <GovBadge variant="pending" />
      <GovBadge variant="approved" />
      <GovBadge variant="draft" />
      <GovBadge variant="expired" />
      <GovBadge variant="revoked" />
    </>
  ),
}

export const Active: Story = { args: { variant: 'active' } }
export const Pending: Story = { args: { variant: 'pending' } }
