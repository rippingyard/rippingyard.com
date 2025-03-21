﻿import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { FormElasticInput } from '.';

// import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FormElasticInput> = {
  title: 'Component/Form/ElasticInput',
  component: FormElasticInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   // backgroundColor: { control: 'color' },
  // },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof FormElasticInput>;

export const Default: Story = {
  args: {},
  render: ({ ...args }) => {
    const [value, setValue] = useState('');

    if (!meta.component) return <></>;

    return (
      <meta.component
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
