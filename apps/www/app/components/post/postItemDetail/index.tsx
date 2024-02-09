import { SerializeFrom } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { FC } from 'react';

import { Article } from '~/components/article';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';
import { articleStyle } from '~/styles/article.css';

import { footerStyle, headingStyle } from './style.css';

type Props = {
  post: SerializeFrom<Post>;
  permalink?: string;
};

export const PostListItemDetail: FC<Props> = ({
  post,
  permalink: overwriteLink,
}) => {
  const { title, content, hasHeadingTag } = usePostTitle(post.content);
  const permalink = overwriteLink || usePostLink(post.id);
  const createdate = useDate(post.createdAt);
  return (
    <>
      {(hasHeadingTag && (
        <div className={`${articleStyle} ${headingStyle}`}>
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
      <div className={footerStyle}>
        <Link to={permalink}>{createdate}</Link>
      </div>
    </>
  );
};
