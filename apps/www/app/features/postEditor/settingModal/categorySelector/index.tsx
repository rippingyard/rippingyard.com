import clsx from 'clsx';
import { FC, useMemo } from 'react';

import type { Category } from '@rippingyard/schemas';

import { itemStyle, listStyle, selectedItemStyle } from './style.css';
import { SuggestedCategory } from '..';

type Props = {
  selectedCategories: SuggestedCategory[];
};

const allCategories: Category[] = [
  {
    id: 'film',
    label: {
      ja: '映画',
    },
  },
  {
    id: 'music',
    label: {
      ja: '音楽',
    },
  },
  {
    id: 'book',
    label: {
      ja: '文学',
    },
  },
  {
    id: 'art',
    label: {
      ja: '芸術',
    },
  },
  {
    id: 'game',
    label: {
      ja: 'ゲーム',
    },
  },
  {
    id: 'politic',
    label: {
      ja: '政治',
    },
  },
  {
    id: 'food',
    label: {
      ja: '食',
    },
  },
  {
    id: 'technology',
    label: {
      ja: 'テクノロジー',
    },
  },
];

export const CategorySelector: FC<Props> = ({ selectedCategories = [] }) => {
  if (allCategories.length === 0) return;

  console.log('selectedCategories', selectedCategories);

  const categories = useMemo(
    () =>
      allCategories.map((c) => ({
        ...c,
        isSelected: selectedCategories.includes(c.id),
      })),
    [selectedCategories]
  );

  return (
    <ul className={listStyle}>
      {categories.map((category) => (
        <li
          className={clsx(itemStyle, category?.isSelected && selectedItemStyle)}
        >
          {category.label.ja}
        </li>
      ))}
    </ul>
  );
};
