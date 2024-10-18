import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { Table } from '.';
import { Button } from '../Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Table> = {
  title: 'Component/Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
};

export default meta;

type Story = StoryObj<typeof Table>;

const items = [...Array(10)].map((_, i) => {
  return {
    value: {
      id: `${i + 1}`,
      title: `タイトル${i}`,
      button: <Button isGhost>編集</Button>,
    },
    isChecked: false,
  };
});

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'title', label: 'タイトル' },
      { key: 'button', label: 'アクション' },
    ],
    items,
    meta: {
      checkbox: {
        key: 'id',
        isCheckedAll: false,
        onClick: () => undefined,
        onClickForAll: () => undefined,
      },
    },
  },
};
