import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PostStatusLabel } from '~/utils/post';

type Props = {
  status: string;
};

export const PostTableStatus: FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  return <div>{t(PostStatusLabel[status] || 'unknown')}</div>;
};
