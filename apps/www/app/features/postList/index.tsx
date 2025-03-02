﻿import { FC, memo } from 'react';

import { type ItemMode, PostItem } from '~/components/PostItem';
import { SerializedPost } from '~/schemas/post';

import { containerStyle, itemStyle } from './style.css';

type Props = {
  posts: SerializedPost[];
  mode?: ItemMode;
};

export const PostList: FC<Props> = memo(({ posts = [], mode = 'list' }) => {
  return (
    <ul className={containerStyle}>
      {posts.map((post) => (
        <li key={post.id} className={itemStyle}>
          <PostItem post={post} mode={mode} />
        </li>
      ))}
    </ul>
  );
});
