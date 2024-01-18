import { FC } from 'react';

import { useContent } from '~/hooks/normalize/useContent';
import { articleStyle } from '~/styles/article.css';

type Props = {
  text: string;
};

export const Article: FC<Props> = ({ text = '' }) => {
  const html = useContent(text);
  return (
    <div className={articleStyle} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
