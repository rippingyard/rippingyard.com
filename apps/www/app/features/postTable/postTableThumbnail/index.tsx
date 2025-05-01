import { FC } from 'react';

import { usePostContents } from '~/hooks/normalize/usePostContents';
import { Post } from '~/schemas/post';

import * as styles from './style.css';

type Props = {
  post: Post;
};

export const PostTableThumbnail: FC<Props> = ({ post }) => {
  if (!post) return;

  const { thumbnail, hasThumbnail } = usePostContents(post.content);

  if (!hasThumbnail) return;

  return (
    <div className={styles.image}>
      <img src={thumbnail} />
    </div>
  );
};
