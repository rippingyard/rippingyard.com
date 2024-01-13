import { css } from '@emotion/react';
import { SerializeFrom } from '.pnpm/@remix-run+node@2.5.0_typescript@5.3.3/node_modules/@remix-run/node/dist';
import { FC } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

import { PostListItemDetail } from '~/components/post/postItemDetail';
import { PostListItemSimple } from '~/components/post/postItemSimple';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';

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
