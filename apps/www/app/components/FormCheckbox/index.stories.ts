import type { Meta, StoryObj } from '@storybook/react';

// import { fn } from '@storybook/test';
import { FormCheckbox } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FormCheckbox> = {
  title: 'Component/Form/Checkbox',
  component: FormCheckbox,
  parameters: {
    layout: 'centered',
  },
  // // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof FormCheckbox>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Unchecked: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};
