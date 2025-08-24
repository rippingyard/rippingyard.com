import clsx from 'clsx';
import { FC, memo, useState } from 'react';

import { PostItem } from '~/components/PostItem';
import { Post } from '@rippingyard/schemas';

import {
  containerStyle,
  frameStyle,
  headerStyle,
  invisibleStyle,
  itemStyle,
  labelStyle,
  pagerContainerStyle,
  pagerItemStyle,
  selectedPagerItemStyle,
} from './style.css';

type Props = {
  posts: Post[];
  label?: string;
};

export const HeroArticles: FC<Props> = memo(({ posts = [], label }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className={frameStyle}>
      <div className={headerStyle}>
        {label && <h2 className={labelStyle}>{label}</h2>}
      </div>
      <ul className={pagerContainerStyle}>
        {posts.map((post, i) => (
          <li
            key={post.id}
            className={clsx(
              pagerItemStyle,
              index === i && selectedPagerItemStyle
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </ul>
      <ul className={containerStyle}>
        {posts.map((post, i) => (
          <li
            key={post.id}
            className={clsx(itemStyle, index !== i && invisibleStyle)}
          >
            <PostItem post={post} mode="hero" />
          </li>
        ))}
      </ul>
    </div>
  );
});
