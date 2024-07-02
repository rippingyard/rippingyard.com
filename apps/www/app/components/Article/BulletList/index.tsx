import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { NodeComponents } from './node';

export const BulletList: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <ul>
      <NodeComponents blocks={block.content} />
    </ul>
  );
};
