import '../../core/src/styles/govamt.scss';
import type { Meta, StoryObj } from '@storybook/react'
import { Nav } from 'react-bootstrap'
import { GovHeader, GovProvider } from '@tiefamt/core'

const meta: Meta<typeof GovHeader> = {
  title: 'Components/GovHeader',
  component: GovHeader,
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

type Story = StoryObj<typeof GovHeader>

export const Default: Story = {
  args: {
    children: (
      <Nav className="ms-auto gap-1">
        <Nav.Link href="#">Startseite</Nav.Link>
        <Nav.Link href="#">Dienste</Nav.Link>
        <Nav.Link href="#">Kontakt</Nav.Link>
      </Nav>
    ),
  },
}
