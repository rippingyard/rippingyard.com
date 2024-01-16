import { css } from '@emotion/react';
import Link from 'next/link';
import { FC } from 'react';

import { Article } from '~/components/article';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';
import { articleStyle } from '~/utils/style';

type Props = {
  post: Post;
};

export const PostListItemDetail: FC<Props> = ({ post }) => {
  const { title, content, hasHeadingTag } = usePostTitle(post.content);
  const permalink = usePostLink(post.id);
  const createdate = useDate(post.createdAt);
  return (
    <>
      {(hasHeadingTag && (
        <div css={[articleStyle, headingStyle]}>
          <h1>
            <Link href={permalink}>{title}</Link>
          </h1>
        </div>
      )) || (
        <div>
          <Link href={permalink}>{createdate}</Link>
        </div>
      )}
      <Article text={content} />
      <div css={footerStyle}>
        <Link href={permalink}>{createdate}</Link>
      </div>
    </>
  );
};

const headingStyle = css({
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  'a:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

const footerStyle = css({
  fontSize: '0.8em',
});
