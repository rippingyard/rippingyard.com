import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { ListItem } from '../ListItem';

export const NodeComponents: FC<{
  blocks?: ContentBlock[];
}> = ({ blocks = [] }) => {
  return (
    <>
      {blocks.map((block, i) => (
        <NodeComponent block={block} key={i} />
      ))}
    </>
  );
};

const NodeComponent: FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'listItem':
      return <ListItem block={block} />;
    default:
      console.warn('An undefined block was found', block.type, block);
      return;
  }
};
