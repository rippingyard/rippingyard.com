import { FC, memo, useMemo } from 'react';
import { Link } from 'react-router';

import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { TimestampType } from '~/hooks/normalize/useDateObject';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import { getSummary } from '~/utils/typography';

import type { Post } from '@rippingyard/schemas';

import {
  containerStyle,
  contentStyle,
  footerStyle,
  headingStyle,
  imageStyle,
  summaryStyle,
} from './style.css';

type Props = {
  post: Post;
  permalink?: string;
};

const PostItemLineComponent: FC<Props> = ({
  post,
  permalink: overwriteLink,
}) => {
  const postLink = usePostLink();

  const { title, content, thumbnail, hasTitleBlock, hasThumbnail } =
    usePostContents(post.content);
  const permalink = overwriteLink || postLink(post.id);
  const length = useMemo(() => (hasTitleBlock ? 80 : 140), [hasTitleBlock]);
  const summary = useMemo(() => getSummary(content, length), [content, length]);

  const publishdate = useDate(post.publishedAt as unknown as TimestampType);

  return (
    <Link to={permalink} className={containerStyle} prefetch="viewport">
      <div className={contentStyle}>
        {hasTitleBlock && <h4 className={headingStyle}>{title}</h4>}
        <p className={summaryStyle}>{summary}</p>
        <div className={footerStyle}>{publishdate}</div>
      </div>
      {hasThumbnail && (
        <div className={imageStyle}>
          <img src={thumbnail} />
        </div>
      )}
    </Link>
  );
};

export const PostItemLine = memo(PostItemLineComponent);
