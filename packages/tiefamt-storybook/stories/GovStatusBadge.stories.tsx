import type { Meta, StoryObj } from '@storybook/react';
import { GovProvider, GovStatusBadge } from '@tiefamt/core';

const meta: Meta<typeof GovStatusBadge> = {
  title: 'DMS/GovStatusBadge',
  component: GovStatusBadge,
  decorators: [
    (Story) => (
      <GovProvider config={{ agencyName: 'Testbehörde' }}>
        <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Story />
        </div>
      </GovProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof GovStatusBadge>;

export const AllStatuses: Story = {
  render: () => (
    <>
      <GovStatusBadge status="draft" />
      <GovStatusBadge status="submitted" />
      <GovStatusBadge status="under-review" />
      <GovStatusBadge status="approved" />
      <GovStatusBadge status="rejected" />
      <GovStatusBadge status="returned" />
    </>
  ),
};

export const WithTransition: Story = {
  args: {
    status: 'approved',
    previousStatus: 'under-review',
    timestamp: '17.03.2026',
  },
};
