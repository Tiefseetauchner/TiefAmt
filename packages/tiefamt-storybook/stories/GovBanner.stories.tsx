import type { Meta, StoryObj } from '@storybook/react'
import { GovBanner, GovProvider } from 'tiefamt'

const meta: Meta<typeof GovBanner> = {
  title: 'Components/GovBanner',
  component: GovBanner,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <Story />
      </GovProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof GovBanner>

export const Default: Story = {
  args: { forceShow: true, dismissible: true },
}

export const NonDismissible: Story = {
  args: { forceShow: true, dismissible: false },
}
