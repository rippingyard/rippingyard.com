import clsx from 'clsx';
import { FC, useMemo } from 'react';

import { SerializedPost } from '~/schemas/post';

import {
  containerStyle,
  postIsPublicStyle,
  postStatusStyle,
  statusStyle,
} from './style.css';

export const PostHeader: FC<{
  post: SerializedPost;
}> = ({ post }) => {
  const isShown = useMemo(
    () => !post.isPublic || post.status === 'drafted',
    [post]
  );

  if (!isShown) return;

  return (
    <div className={containerStyle}>
      {post.status === 'drafted' && (
        <p className={clsx(statusStyle, postStatusStyle)}>
          この記事は下書き状態です
        </p>
      )}
      {post.isPublic && (
        <p className={clsx(statusStyle, postIsPublicStyle)}>
          この記事は一般公開されていません
        </p>
      )}
    </div>
  );
};
