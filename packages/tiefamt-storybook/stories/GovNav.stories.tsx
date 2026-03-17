import type { Meta, StoryObj } from '@storybook/react';
import { GovNav, GovProvider, GovSidebar } from '@tiefamt/core';

const SECTIONS = [
  {
    heading: 'Mein Bereich',
    items: [
      { label: 'Übersicht', href: '#', active: true },
      { label: 'Meine Anträge', href: '#' },
      { label: 'Nachrichten', href: '#' },
    ],
  },
  {
    heading: 'Einstellungen',
    items: [
      { label: 'Profil', href: '#' },
      { label: 'Zugangsdaten', href: '#' },
    ],
  },
];

const meta: Meta<typeof GovNav> = {
  title: 'Components/GovNav',
  component: GovNav,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ width: '240px' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof GovNav>;

export const Default: Story = {
  args: { sections: SECTIONS },
};

export const InSidebar: Story = {
  render: () => (
    <GovProvider config={{ agencyName: 'Testbehörde' }}>
      <div style={{ display: 'flex', height: '400px' }}>
        <GovSidebar sections={SECTIONS} style={{ width: '240px' }} />
        <main style={{ padding: '1.5rem', flex: 1 }}>Hauptinhalt</main>
      </div>
    </GovProvider>
  ),
};
