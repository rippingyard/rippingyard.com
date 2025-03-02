﻿import type { Meta, StoryObj } from '@storybook/react';
// import { Timestamp } from 'firebase-admin/firestore';

import { SerializedTimestamp } from '~/utils/date';

import { UserCard } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof UserCard> = {
  title: 'Features/UserCard',
  component: UserCard,
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
  // args: { onClose: fn() },
};

export default meta;

type Story = StoryObj<typeof UserCard>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    user: {
      displayName: 'Display Name',
      uid: 'uid',
      userName: 'userName',
      role: 'resident',
      avatar: 'https://placehold.jp/180x180.png',
      isBanned: false,
      isDeleted: false,
      createdAt: undefined as unknown as SerializedTimestamp,
      updatedAt: undefined as unknown as SerializedTimestamp,
    },
  },
};
