import { useContent } from '~/hooks/normalize/useContent';
import { articleStyle } from '~/utils/style';

import { FC } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

type Props = {
  text: string;
};

export const Article: FC<Props> = ({ text = '' }) => {
  const html = useContent(text);
  return <div css={articleStyle} dangerouslySetInnerHTML={{ __html: html }} />;
};
