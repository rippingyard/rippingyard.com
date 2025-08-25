import { FC } from 'react';

import type { Post } from '@rippingyard/schemas';

import { PostItemDetail } from './PostItemDetail';
import { PostItemHero } from './PostItemHero';
import { PostItemLine } from './PostItemLine';

export type ItemMode = 'hero' | 'detail' | 'list';

export const PostItem: FC<{
  post: Post;
  mode?: ItemMode;
  permalink?: string;
}> = ({ mode = 'list', ...args }) => {
  if (mode === 'hero') return <PostItemHero {...args} />;
  if (mode === 'detail') return <PostItemDetail {...args} />;
  return <PostItemLine {...args} />;
};
