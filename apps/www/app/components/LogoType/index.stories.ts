import type { Meta, StoryObj } from '@storybook/react';
import { LogoType } from '.';

const meta: Meta<typeof LogoType> = {
  title: 'Component/LogoType',
  component: LogoType,
};

export default meta;

type Story = StoryObj<typeof LogoType>;

export const Default: Story = {
  args: {},
};
