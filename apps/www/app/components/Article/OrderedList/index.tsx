import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { ArticleNodeComponents } from '..';

export const OrderedList: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <ol>
      <ArticleNodeComponents blocks={block.content} />
    </ol>
  );
};
