import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { ArticleNodeComponents } from '..';

export const ListItem: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <li>
      <ArticleNodeComponents blocks={block.content} />
    </li>
  );
};
