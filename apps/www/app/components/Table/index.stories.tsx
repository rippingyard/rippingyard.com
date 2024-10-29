import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';

import { Table, TableItem } from '.';
import { Button } from '../Button';
import { useCallback, useMemo, useState } from 'react';

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
    id: `${i + 1}`,
    title: `タイトル${i}`,
    button: <Button isGhost>編集</Button>,
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
  },
  render: (args) => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const isCheckedAll = useMemo(
      () => items.length === checkedItems.length,
      [checkedItems.length, items.length]
    );

    const onClickCheckbox = useCallback(
      (item: TableItem) => {
        const id = item.value.id as string;

        const newCheckedItems: string[] = checkedItems.includes(id)
          ? checkedItems.filter((checkedId) => checkedId !== id)
          : [...checkedItems, id];

        setCheckedItems(newCheckedItems);
      },
      [checkedItems]
    );

    const onClickAllCheckbox = useCallback(() => {
      console.log(isCheckedAll);
      const newCheckedItems = isCheckedAll ? [] : items.map((item) => item.id);
      setCheckedItems(newCheckedItems);
    }, [isCheckedAll, items]);

    const filteredItems: TableItem[] = useMemo(
      () =>
        items.map((item) => {
          return {
            value: {
              id: item.id,
              title: item.title,
              button: item.button,
            },
            isChecked: checkedItems.includes(item.id),
          };
        }),
      [checkedItems, items]
    );

    const meta = {
      checkbox: {
        key: 'id',
        isCheckedAll,
        onClick: onClickCheckbox,
        onClickForAll: onClickAllCheckbox,
      },
    };

    return <Table {...args} items={filteredItems} meta={meta} />;
  },
};
