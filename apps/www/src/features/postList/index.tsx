import { css } from '@emotion/react';
import { FC } from 'react';

import { PostListItemDetail } from '~/components/post/postItemDetail';
import { PostListItemSimple } from '~/components/post/postItemSimple';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';

type Props = {
  posts: Post[];
};

const Item: FC<{
  post: Post;
}> = ({ post }) => {
  const { hasHeadingTag } = usePostTitle(post.content);
  if (hasHeadingTag) return <PostListItemDetail post={post} />;
  return <PostListItemSimple post={post} />;
};

export const PostList: FC<Props> = ({ posts = [] }) => {
  return (
    <ul css={containerStyle}>
      {posts.map((post) => (
        <li key={post.id} css={itemStyle}>
          <Item post={post} />
        </li>
      ))}
    </ul>
  );
};

const containerStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const itemStyle = css({
  marginBottom: 32,
});
