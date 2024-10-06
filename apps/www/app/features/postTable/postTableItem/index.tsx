import { SerializeFrom } from '@vercel/remix';
import clsx from 'clsx';
import { FC, useMemo } from 'react';

import { Link } from '~/components/Link';
import { summaryWithoutTitleStyle } from '~/components/PostItem/PostItemLine/style.css';
import { usePostEditLink } from '~/hooks/link/usePostEditLink';
import { usePostLink } from '~/hooks/link/usePostLink';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import { Post } from '~/schemas/post';
import { getSummary } from '~/utils/typography';

import {
  containerStyle,
  footerStyle,
  headingStyle,
  imageStyle,
  summaryStyle,
} from './style.css';

type Props = {
  post: SerializeFrom<Post>;
};

export const PostTableItem: FC<Props> = ({ post }) => {
  if (!post) return;

  const { title, content, thumbnail, hasTitleBlock, hasThumbnail } =
    usePostContents(post.content);

  const postLink = usePostLink();
  const permalink = postLink(post.id);
  const editLink = usePostEditLink(post.id);

  const length = useMemo(() => (hasTitleBlock ? 60 : 100), [hasTitleBlock]);
  const summary = useMemo(() => getSummary(content, length), [content, length]);

  return (
    <div className={clsx(containerStyle)}>
      {hasTitleBlock && (
        <h3 className={headingStyle}>
          <Link to={permalink} target="_blank" hasUnderline>
            {title}
          </Link>
        </h3>
      )}
      <p
        className={clsx(
          summaryStyle,
          !hasTitleBlock && summaryWithoutTitleStyle
        )}
      >
        {summary}
      </p>
      {hasThumbnail && (
        <div className={imageStyle}>
          <img src={thumbnail} />
        </div>
      )}
      <div className={footerStyle}>
        <Link
          to={permalink}
          target="_blank"
          color="success"
          size="x-small"
          isButton={true}
          isBold={true}
        >
          詳細
        </Link>
        <Link
          to={editLink}
          target="_blank"
          color="warning"
          size="x-small"
          isButton={true}
          isBold={true}
        >
          編集
        </Link>
      </div>
    </div>
  );
};
