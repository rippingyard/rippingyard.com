import { css } from '@emotion/react';
import { SerializeFrom } from '.pnpm/@remix-run+node@2.5.0_typescript@5.3.3/node_modules/@remix-run/node/dist';
import { Link } from '.pnpm/@remix-run+react@2.5.0_react-dom@18.2.0_react@18.2.0_typescript@5.3.3/node_modules/@remix-run/react/dist';
import { FC } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

import { Article } from '~/components/article';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { Post } from '~/schemas/post';
import { gray } from '~/utils/style';

type Props = {
  post: SerializeFrom<Post>;
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
        <Link to={permalink}>{createdate}</Link>
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
