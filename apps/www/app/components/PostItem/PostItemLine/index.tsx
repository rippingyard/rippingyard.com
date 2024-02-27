import { SerializeFrom } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { FC, memo, useMemo } from 'react';

import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';
import { getSummary } from '~/utils/typography';

import {
  contentStyle,
  footerStyle,
  headingStyle,
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
  const { title, content, hasHeadingTag } = usePostTitle(post.content);
  const permalink = overwriteLink || usePostLink(post.id);
  const length = useMemo(() => (hasHeadingTag ? 80 : 140), [hasHeadingTag]);
  const summary = useMemo(() => getSummary(content, length), [content, length]);
  const createdate = useDate(post.createdAt);

  return (
    <Link to={permalink} className={contentStyle}>
      {hasHeadingTag && <h4 className={headingStyle}>{title}</h4>}
      <p className={summaryStyle}>{summary}</p>
      <div className={footerStyle}>{createdate}</div>
    </Link>
  );
};

export const PostItemLine = memo(PostItemLineComponent);
