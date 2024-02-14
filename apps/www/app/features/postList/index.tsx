import { SerializeFrom } from '@remix-run/node';
import { FC } from 'react';

import { PostListItemDetail } from '~/components/Post/PostItemDetail';
import { PostListItemSimple } from '~/components/Post/PostItemSimple';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';

import { containerStyle, itemStyle } from './style.css';

type Props = {
  posts: SerializeFrom<Post>[];
};

const Item: FC<{
  post: SerializeFrom<Post>;
}> = ({ post }) => {
  const { hasHeadingTag } = usePostTitle(post.content);
  if (hasHeadingTag) return <PostListItemDetail post={post} />;
  return <PostListItemSimple post={post} />;
};

export const PostList: FC<Props> = ({ posts = [] }) => {
  return (
    <ul className={containerStyle}>
      {posts.map((post) => (
        <li key={post.id} className={itemStyle}>
          <Item post={post} />
        </li>
      ))}
    </ul>
  );
};
