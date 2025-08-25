import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { Link } from 'react-router';

import { usePostLink } from '~/hooks/link/usePostLink';
import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import type { Post } from '@rippingyard/schemas';
import { getSummary } from '~/utils/typography';

import {
  containerStyle,
  contentStyle,
  contentWithBorderStyle,
  contentWithNoTitleStyle,
  footerStyle,
  headingStyle,
  imageStyle,
  summaryStyle,
} from './style.css';

type Props = {
  post: Post;
  permalink?: string;
};

const SUMMARY_LENGTH = 240;

export const PostItemHero: FC<Props> = ({ post, permalink: overwriteLink }) => {
  const postLink = usePostLink();

  const { title, summary, thumbnail, hasThumbnail, hasTitleBlock } =
    usePostContents(post.content, {
      summaryLength: SUMMARY_LENGTH,
    });
  const permalink = overwriteLink || postLink(post.id);
  const publishdate = useDate(post.publishedAt as unknown as TimestampType);

  const dynamicSummary = useMemo(
    () => getSummary(summary, (hasThumbnail && 80) || SUMMARY_LENGTH),
    [hasThumbnail, summary]
  );

  return (
    <div className={containerStyle}>
      {hasThumbnail && (
        <Link to={permalink} prefetch="viewport" className={imageStyle}>
          <img src={thumbnail} />
        </Link>
      )}
      {summary && (
        <div
          className={clsx(contentStyle, hasThumbnail && contentWithBorderStyle)}
        >
          {(hasTitleBlock && (
            <>
              <h1 className={headingStyle}>
                <Link to={permalink} prefetch="viewport">
                  {title}
                </Link>
              </h1>
              <p className={summaryStyle}>{dynamicSummary}</p>
            </>
          )) || (
            <div className={contentWithNoTitleStyle}>
              <Link to={permalink} prefetch="viewport">
                <p>{dynamicSummary}</p>
              </Link>
            </div>
          )}
          <div className={footerStyle}>
            <Link to={permalink} prefetch="viewport">
              {publishdate}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
