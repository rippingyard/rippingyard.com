import { css } from '@emotion/react';
import { SerializeFrom } from '.pnpm/@remix-run+node@2.5.0_typescript@5.3.3/node_modules/@remix-run/node/dist';
import { Link } from '.pnpm/@remix-run+react@2.5.0_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist';
import { FC } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

import { Article } from '~/components/article';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';
import { articleStyle } from '~/utils/style';

type Props = {
  post: SerializeFrom<Post>;
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
            <Link to={permalink}>{title}</Link>
          </h1>
        </div>
      )) || (
        <div>
          <Link to={permalink}>{createdate}</Link>
        </div>
      )}
      <Article text={content} />
      <div css={footerStyle}>
        <Link to={permalink}>{createdate}</Link>
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
