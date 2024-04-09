import type { Meta, StoryObj } from '@storybook/react';

import { YouTube } from '.';

const meta: Meta<typeof YouTube> = {
  title: 'Component/YouTube',
  component: YouTube,
};

export default meta;

type Story = StoryObj<typeof YouTube>;

export const Default: Story = {
  args: {
    url: 'https://www.youtube.com/watch?v=tIIDON6ED-E',
  },
};
