import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { NodeComponents } from './node';

export const Blockquote: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  return (
    <blockquote>
      <NodeComponents blocks={block.content} />
    </blockquote>
  );
};
