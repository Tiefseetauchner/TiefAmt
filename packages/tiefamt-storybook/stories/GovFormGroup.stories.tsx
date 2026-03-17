import type { Meta, StoryObj } from '@storybook/react'
import { Form } from 'react-bootstrap'
import { GovFormGroup, GovProvider } from 'tiefamt'

const meta: Meta<typeof GovFormGroup> = {
  title: 'Components/GovFormGroup',
  component: GovFormGroup,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ maxWidth: '480px', padding: '1.5rem' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof GovFormGroup>

export const Default: Story = {
  args: {
    inputId: 'vorname',
    label: 'Vorname',
    hint: 'Wie auf dem Personalausweis.',
    children: <Form.Control type="text" placeholder="Max" />,
  },
}

export const Required: Story = {
  args: {
    inputId: 'nachname',
    label: 'Nachname',
    required: true,
    children: <Form.Control type="text" />,
  },
}

export const WithError: Story = {
  args: {
    inputId: 'svnr',
    label: 'Sozialversicherungsnummer',
    required: true,
    error: 'Bitte geben Sie eine gültige Sozialversicherungsnummer ein.',
    children: <Form.Control type="text" isInvalid />,
  },
}
