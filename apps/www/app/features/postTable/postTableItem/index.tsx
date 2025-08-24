import clsx from 'clsx';
import { FC, ReactNode, useMemo } from 'react';

import { Buttons } from '~/components/Buttons';
import { Link } from '~/components/Link';
import { summaryWithoutTitleStyle } from '~/components/PostItem/PostItemLine/style.css';
import { PostTags } from '~/components/PostTags';
import { usePostEditLink } from '~/hooks/link/usePostEditLink';
import { usePostLink } from '~/hooks/link/usePostLink';
import { usePostContents } from '~/hooks/normalize/usePostContents';
import { Post } from '@rippingyard/schemas';
import { getSummary } from '~/utils/typography';

import {
  containerStyle,
  footerStyle,
  headingStyle,
  summaryStyle,
  tagContainerStyle,
} from './style.css';

type Props = {
  post: Post;
};

export const PostTableItem: FC<Props> = ({ post }) => {
  if (!post) return;

  const { title, content, hasTitleBlock } = usePostContents(post.content);

  const postLink = usePostLink();
  const permalink = postLink(post.id);
  const editLink = usePostEditLink(post.id);

  const length = useMemo(() => (hasTitleBlock ? 120 : 210), [hasTitleBlock]);
  const summary = useMemo(() => getSummary(content, length), [content, length]);

  const buttonItems: ReactNode[] = useMemo(
    () => [
      <Link to={permalink} target="_blank" size="x-small">
        詳細
      </Link>,
      <Link to={editLink} size="x-small">
        編集
      </Link>,
    ],
    [editLink, permalink]
  );

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
      {post?.tags && (
        <div className={tagContainerStyle}>
          <PostTags tags={post?.tags || []} />
        </div>
      )}
      <div className={footerStyle}>
        <Buttons items={buttonItems} />
      </div>
    </div>
  );
};
