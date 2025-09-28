import { FC, memo } from 'react';

import { type ItemMode, PostItem } from '~/components/PostItem';

import type { Post } from '@rippingyard/schemas';

import { containerStyle, itemStyle } from './style.css';

type Props = {
  posts: Post[];
  mode?: ItemMode;
};

const PostListComponent: FC<Props> = ({ posts = [], mode = 'list' }) => {
  return (
    <ul className={containerStyle}>
      {posts.map((post) => (
        <li key={post.id} className={itemStyle}>
          <PostItem post={post} mode={mode} />
        </li>
      ))}
    </ul>
  );
};

export const PostList = memo(PostListComponent);
