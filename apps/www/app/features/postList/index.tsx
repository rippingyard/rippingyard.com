import { SerializeFrom } from '@remix-run/node';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '~/components/button';
import { PostListItemDetail } from '~/components/post/postItemDetail';
import { PostListItemSimple } from '~/components/post/postItemSimple';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';

import { containerStyle, itemStyle } from './style.css';

type Props = {
  posts: SerializeFrom<Post>[];
  onLoadMore?: () => void;
};

const Item: FC<{
  post: SerializeFrom<Post>;
}> = ({ post }) => {
  const { hasHeadingTag } = usePostTitle(post.content);
  if (hasHeadingTag) return <PostListItemDetail post={post} />;
  return <PostListItemSimple post={post} />;
};

export const PostList: FC<Props> = ({ posts = [], onLoadMore }) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  // useEffect(() => {
  //   console.log('inView', inView);
  //   if (!onLoadMore || !inView) return;
  //   onLoadMore();
  // }, [inView, onLoadMore]);

  return (
    <>
      <ul className={containerStyle}>
        {posts.map((post) => (
          <li key={post.id} className={itemStyle}>
            <Item post={post} />
          </li>
        ))}
      </ul>
      {!!onLoadMore && (
        <Button ref={ref} onClick={onLoadMore}>
          Load More...{inView ? 'IN' : 'OUT'}
        </Button>
      )}
    </>
  );
};
