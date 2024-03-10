import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { ArticleNodeComponents } from '..';

export const Blockquote: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <blockquote>
      <ArticleNodeComponents blocks={block.content} />
    </blockquote>
  );
};
