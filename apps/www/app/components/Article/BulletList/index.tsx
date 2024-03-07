import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { ArticleNodeComponents } from '..';

export const BulletList: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <ul>
      <ArticleNodeComponents blocks={block.content} />
    </ul>
  );
};
