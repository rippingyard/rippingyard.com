import type { Meta, StoryObj } from '@storybook/react';

import { ComboBox } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ComboBox> = {
  title: 'Component/ComboBox',
  component: ComboBox,
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

type Story = StoryObj<typeof ComboBox>;

const entities: string[] = [];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    tags: [
      'Art',
      'Book',
      'Computer',
      'Dragon',
      'Egg',
      'Film',
      'Good',
      'Hire',
      'Item',
      'Japanese',
      'Korean',
      'Look',
      'Music',
      'Nature',
      'Operation',
      'Privacy',
      'Quick',
      'Room',
      'Sound',
      'Trauma',
      'Unite',
      'Vault',
      'World',
      'Xenon',
      'Year',
      'Zelda',
    ],
    onSelectItem: (entity: string) => {
      const index = entities.findIndex((e) => e === entity);
      if (index > -1) {
        entities.splice(index, 1);
      } else {
        entities.push(entity);
      }
      alert(entities);
    },
  },
};
