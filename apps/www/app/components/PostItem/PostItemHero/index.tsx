import { FC } from 'react';
import { Link } from 'react-router';

import { usePostLink } from '~/hooks/link/usePostLink';
import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import { Post } from '~/schemas/post';

import {
  containerStyle,
  contentStyle,
  contentWithNoTitleStyle,
  footerStyle,
  headingStyle,
  imageStyle,
} from './style.css';

type Props = {
  post: Post;
  permalink?: string;
};

export const PostItemHero: FC<Props> = ({ post, permalink: overwriteLink }) => {
  const postLink = usePostLink();

  const { title, summary, thumbnail, hasThumbnail, hasTitleBlock } =
    usePostContents(post.content, {
      summaryLength: 60,
    });
  const permalink = overwriteLink || postLink(post.id);
  const publishdate = useDate(post.publishedAt as unknown as TimestampType);

  return (
    <div className={containerStyle}>
      {hasThumbnail && (
        <div className={imageStyle}>
          <img src={thumbnail} />
        </div>
      )}
      <div className={contentStyle}>
        {(hasTitleBlock && (
          <>
            <h1 className={headingStyle}>
              <Link to={permalink} prefetch="viewport">
                {title}
              </Link>
            </h1>
            <p>{summary}</p>
          </>
        )) || (
          <div className={contentWithNoTitleStyle}>
            <p>{summary}</p>
          </div>
        )}
        <div className={footerStyle}>
          <Link to={permalink} prefetch="viewport">
            {publishdate}
          </Link>
        </div>
      </div>
    </div>
  );
};
