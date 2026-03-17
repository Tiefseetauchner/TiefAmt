import type { Meta, StoryObj } from '@storybook/react';
import { GovProvider } from '@tiefamt/core';

const meta: Meta<typeof GovProvider> = {
  title: 'Foundation/GovProvider',
  component: GovProvider,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof GovProvider>;

export const Default: Story = {
  args: {
    config: { agencyName: 'Bundesministerium für Inneres', density: 'default' },
    children: <p style={{ padding: '1rem' }}>GovProvider wraps the application and sets the density data-attribute.</p>,
  },
};

export const Compact: Story = {
  args: {
    config: { agencyName: 'Bundesministerium für Inneres', density: 'compact' },
    children: <p style={{ padding: '0.5rem' }}>Compact density.</p>,
  },
};

export const Comfortable: Story = {
  args: {
    config: { agencyName: 'Bundesministerium für Inneres', density: 'comfortable' },
    children: <p style={{ padding: '2rem' }}>Comfortable density.</p>,
  },
};
