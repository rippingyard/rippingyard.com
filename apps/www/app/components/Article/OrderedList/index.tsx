import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { NodeComponents } from './node';

export const OrderedList: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <ol>
      <NodeComponents blocks={block.content} />
    </ol>
  );
};
