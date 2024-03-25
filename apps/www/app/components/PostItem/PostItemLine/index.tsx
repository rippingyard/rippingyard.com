import { Link } from '@remix-run/react';
import { SerializeFrom } from '@vercel/remix';
import { FC, memo, useMemo } from 'react';

import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import { Post } from '~/schemas/post';
import { getSummary } from '~/utils/typography';

import {
  containerStyle,
  contentStyle,
  footerStyle,
  headingStyle,
  imageStyle,
  summaryStyle,
} from './style.css';

type Props = {
  post: SerializeFrom<Post>;
  permalink?: string;
};

const PostItemLineComponent: FC<Props> = ({
  post,
  permalink: overwriteLink,
}) => {
  const { title, content, thumbnail, hasHeadingTag, hasThumbnail } =
    usePostContents(post.content);
  const permalink = overwriteLink || usePostLink(post.id);
  const length = useMemo(() => (hasHeadingTag ? 80 : 140), [hasHeadingTag]);
  const summary = useMemo(() => getSummary(content, length), [content, length]);
  const createdate = useDate(post.createdAt);

  return (
    <Link to={permalink} className={containerStyle} prefetch="viewport">
      <div className={contentStyle}>
        {hasHeadingTag && <h4 className={headingStyle}>{title}</h4>}
        <p className={summaryStyle}>{summary}</p>
        <div className={footerStyle}>{createdate}</div>
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
