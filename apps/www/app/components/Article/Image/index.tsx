import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

export const Image: FC<{ block: ContentBlock }> = ({ block }) => {
  const src = block.attrs?.src;
  if (!src) return;

  return <img src={src} />;
};
