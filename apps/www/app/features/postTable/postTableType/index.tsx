import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { PostTypeLabel } from '~/utils/post';

type Props = {
  type: string;
};

export const PostTableType: FC<Props> = ({ type }) => {
  const { t } = useTranslation();
  return <div>{t(PostTypeLabel[type] || 'unknown')}</div>;
};
