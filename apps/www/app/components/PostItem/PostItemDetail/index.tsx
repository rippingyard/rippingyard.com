import { Link } from '@remix-run/react';
import clsx from 'clsx';
import { FC } from 'react';

import { Article } from '~/components/Article';
import { usePostLink } from '~/hooks/link/usePostLink';
import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import { Post } from '~/schemas/post';
import { articleStyle } from '~/styles/article.css';

import {
  containerStyle,
  contentWithNoTitleStyle,
  footerStyle,
  headingStyle,
} from './style.css';

type Props = {
  post: Post;
  permalink?: string;
};

export const PostListItemDetail: FC<Props> = ({
  post,
  permalink: overwriteLink,
}) => {
  const postLink = usePostLink();

  const { title, content, hasTitleBlock } = usePostContents(post.content);
  const permalink = overwriteLink || postLink(post.id);
  const publishdate = useDate(post.publishedAt as unknown as TimestampType);

  return (
    <div className={containerStyle}>
      {(hasTitleBlock && (
        <>
          <div className={clsx(articleStyle, headingStyle)}>
            <h1>
              <Link to={permalink} prefetch="viewport">
                {title}
              </Link>
            </h1>
          </div>
          <Article text={content} />
        </>
      )) || (
        <div className={contentWithNoTitleStyle}>
          <Article text={post.content} />
        </div>
      )}
      <div className={footerStyle}>
        <Link to={permalink} prefetch="viewport">
          {publishdate}
        </Link>
      </div>
    </div>
  );
};
