import { SerializeFrom } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { FC } from 'react';

import { Article } from '~/components/Article_';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { Post } from '~/schemas/post';

import { contentStyle, footerStyle } from './style.css';

type Props = {
  post: SerializeFrom<Post>;
};

export const PostListItemSimple: FC<Props> = ({ post }) => {
  const permalink = usePostLink(post.id);
  const createdate = useDate(post.createdAt);
  return (
    <>
      <div className={contentStyle}>
        <Article text={post.content} />
      </div>
      <div className={footerStyle}>
        <Link to={permalink}>{createdate}</Link>
      </div>
    </>
  );
};
