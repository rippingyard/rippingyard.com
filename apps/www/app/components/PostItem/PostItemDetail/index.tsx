import { FC } from 'react';
import { Link } from 'react-router';

import { Article } from '~/components/Article';
import { PostTags } from '~/components/PostTags';
import { usePostLink } from '~/hooks/link/usePostLink';
import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { usePostContents } from '~/hooks/normalize/usePostContents';

import type { Post } from '@rippingyard/schemas';

import * as styles from './style.css';

type Props = {
  post: Post;
  permalink?: string;
};

export const PostItemDetail: FC<Props> = ({
  post,
  permalink: overwriteLink,
}) => {
  const postLink = usePostLink();

  const { title, content, hasTitleBlock } = usePostContents(post.content);
  const permalink = overwriteLink || postLink(post.id);
  const publishdate = useDate(post.publishedAt as unknown as TimestampType);

  return (
    <div className={styles.container}>
      {(hasTitleBlock && (
        <>
          <h1 className={styles.heading}>
            <Link to={permalink} prefetch="viewport">
              {title}
            </Link>
          </h1>
          <Article text={content} />
        </>
      )) || (
        <div className={styles.contentWithNoTitle}>
          <Article text={post.content} />
        </div>
      )}
      <div className={styles.footer}>
        {post?.tags && (
          <div className={styles.tags}>
            <PostTags tags={post?.tags || []} />
          </div>
        )}
        <Link to={permalink} prefetch="viewport">
          {publishdate}
        </Link>
      </div>
    </div>
  );
};
