import type { Meta, StoryObj } from '@storybook/react'
import { GovFooter, GovProvider } from 'tiefamt'

const meta: Meta<typeof GovFooter> = {
  title: 'Components/GovFooter',
  component: GovFooter,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Bundesministerium für Inneres' }}>
        <Story />
      </GovProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof GovFooter>

export const Default: Story = {
  args: {
    address: 'Herrengasse 7, 1010 Wien',
    links: [
      { label: 'Impressum', href: '#' },
      { label: 'Datenschutz', href: '#' },
      { label: 'Barrierefreiheit', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
}
