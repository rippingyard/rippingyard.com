import { FC } from 'react';

import { SerializedPost } from '~/schemas/post';

import { PostListItemDetail } from './PostItemDetail';
import { PostItemLine } from './PostItemLine';

export type ItemMode = 'detail' | 'list';

export const PostItem: FC<{
  post: SerializedPost;
  mode?: ItemMode;
  permalink?: string;
}> = ({ post, mode = 'list', permalink }) => {
  if (mode === 'detail')
    return <PostListItemDetail post={post} permalink={permalink} />;

  return <PostItemLine post={post} permalink={permalink} />;
};
