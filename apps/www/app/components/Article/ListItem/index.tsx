import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { NodeComponents } from './node';

export const ListItem: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <li>
      <NodeComponents blocks={block.content} />
    </li>
  );
};
