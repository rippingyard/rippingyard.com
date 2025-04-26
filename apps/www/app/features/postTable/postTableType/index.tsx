import { FC } from 'react';

import { PostTypeLabel } from '~/utils/post';

type Props = {
  type: string;
};

export const PostTableType: FC<Props> = ({ type }) => {
  return <div>{PostTypeLabel[type] || '不明'}</div>;
};
