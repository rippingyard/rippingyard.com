import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';

import { BulletList } from '../BulletList';
import { Heading } from '../Heading';
import { HorizontalRule } from '../HorizontalRule';
import { Image } from '../Image';
import { OrderedList } from '../OrderedList';
import { Paragraph } from '../Paragraph';

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
    case 'heading':
      return <Heading block={block} />;
    case 'image':
      return <Image block={block} />;
    case 'horizontalRule':
      return <HorizontalRule />;
    case 'paragraph':
      return <Paragraph block={block} />;
    case 'bulletList':
      return <BulletList block={block} />;
    case 'orderedList':
      return <OrderedList block={block} />;
    default:
      console.warn('An undefined block was found', block.type, block);
      return;
  }
};
