import type { Meta, StoryObj } from '@storybook/react';

// import { fn } from '@storybook/test';
import { Avatar } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Avatar> = {
  title: 'Component/Avatar',
  component: Avatar,
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

type Story = StoryObj<typeof Avatar>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    url: 'https://placehold.jp/400x400.png',
  },
};

export const WideInSquare: Story = {
  args: {
    url: 'https://placehold.jp/600x200.png',
  },
};

export const TallInSquare: Story = {
  args: {
    url: 'https://placehold.jp/200x600.png',
  },
};
