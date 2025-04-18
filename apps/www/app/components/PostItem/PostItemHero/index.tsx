﻿import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router';

import { usePostLink } from '~/hooks/link/usePostLink';
import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import { Post } from '~/schemas/post';
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

export const PostItemHero: FC<Props> = ({ post, permalink: overwriteLink }) => {
  const postLink = usePostLink();

  const { title, summary, thumbnail, hasThumbnail, hasTitleBlock } =
    usePostContents(post.content, {
      summaryLength: 120,
    });
  const permalink = overwriteLink || postLink(post.id);
  const publishdate = useDate(post.publishedAt as unknown as TimestampType);

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
              <p className={summaryStyle}>{getSummary(summary, 80)}</p>
            </>
          )) || (
            <div className={contentWithNoTitleStyle}>
              <p>{(hasThumbnail && getSummary(summary, 80)) || summary}</p>
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
