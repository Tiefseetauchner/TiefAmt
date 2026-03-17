import type { Meta, StoryObj } from '@storybook/react';
import { GovBanner, GovProvider } from '@tiefamt/core';

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
};
export default meta;

type Story = StoryObj<typeof GovBanner>;

export const Default: Story = {
  args: {
    forceShow: true,
    dismissible: true,
    children: 'Dies ist ein Test.',
  },
};

export const CustomContent: Story = {
  args: {
    forceShow: true,
    dismissible: true,
    children: (
      <>
        <strong>Offizielle Website</strong> — Verwenden Sie nur sichere Verbindungen (https://).
      </>
    ),
  },
};

export const NonDismissible: Story = {
  args: { forceShow: true, dismissible: false, children: (<>Dies ist ein toller Test</>) },
};
