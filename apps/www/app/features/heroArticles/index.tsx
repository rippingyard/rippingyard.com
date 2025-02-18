﻿import clsx from 'clsx';
import { FC, memo, useState } from 'react';

import { PostItem } from '~/components/PostItem';
import { Post } from '~/schemas/post';

import {
  containerStyle,
  frameStyle,
  headerStyle,
  invisibleStyle,
  itemStyle,
  labelStyle,
  pagerContainerStyle,
  pagerItemStyle,
} from './style.css';

type Props = {
  posts: Post[];
  label?: string;
};

export const HeroArticles: FC<Props> = memo(({ posts = [], label }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <div className={frameStyle}>
        <div className={headerStyle}>
          {label && <h2 className={labelStyle}>{label}</h2>}
          <ul className={pagerContainerStyle}>
            {posts.map((post, i) => (
              <li
                key={post.id}
                className={pagerItemStyle}
                onClick={() => setIndex(i)}
              >
                {(index === i && <>⚫︎</>) || <>⚪︎</>}
              </li>
            ))}
          </ul>
        </div>
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
    </>
  );
});
