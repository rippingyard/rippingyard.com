﻿import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from '.';

const meta: Meta<typeof Logo> = {
  title: 'Component/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};
