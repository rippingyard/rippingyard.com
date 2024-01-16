import { css } from '@emotion/react';
import Link from 'next/link';
import { FC } from 'react';

import { Article } from '~/components/article';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { Post } from '~/schemas/post';
import { gray } from '~/utils/style';

type Props = {
  post: Post;
};

export const PostListItemSimple: FC<Props> = ({ post }) => {
  const permalink = usePostLink(post.id);
  const createdate = useDate(post.createdAt);
  return (
    <>
      <div css={contentStyle}>
        <Article text={post.content} />
      </div>
      <div css={footerStyle}>
        <Link href={permalink}>{createdate}</Link>
      </div>
    </>
  );
};

const contentStyle = css({
  padding: 16,
  paddingBottom: 0,
  background: gray(),
  borderRadius: 8,
});

const footerStyle = css({
  fontSize: '0.8em',
});
