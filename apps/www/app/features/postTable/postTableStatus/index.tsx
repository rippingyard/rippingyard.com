import { FC } from 'react';

import { PostStatusLabel } from '~/utils/post';

type Props = {
  status: string;
};

export const PostTableStatus: FC<Props> = ({ status }) => {
  return <div>{PostStatusLabel[status] || '不明'}</div>;
};
