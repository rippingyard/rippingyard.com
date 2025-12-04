import { FC, memo } from 'react';

import {
  ContentBlock,
  useContentBlocks,
} from '~/hooks/normalize/useContentBlocks';
import { articleStyle } from '~/styles/article.css';

import { Blockquote } from './Blockquote';
import { BulletList } from './BulletList';
import { CodeBlock } from './CodeBlock';
import { Heading } from './Heading';
import { HorizontalRule } from './HorizontalRule';
import { Image } from './Image';
import { ListItem } from './ListItem';
import { OrderedList } from './OrderedList';
import { Paragraph } from './Paragraph';

type Props = {
  text: string;
  showExternalEmbed?: boolean;
};

const ArticleComponent: FC<Props> = ({
  text = '',
  showExternalEmbed = false,
}) => {
  const { blocks } = useContentBlocks(text);
  return (
    <div className={articleStyle}>
      <ArticleNodeComponents
        blocks={blocks}
        showExternalEmbed={showExternalEmbed}
      />
    </div>
  );
};

export const ArticleNodeComponents: FC<{
  blocks?: ContentBlock[];
  showExternalEmbed?: boolean;
}> = ({ blocks = [], showExternalEmbed = false }) => {
  return (
    <>
      {blocks.map((block, i) => (
        <NodeComponent
          block={block}
          key={i}
          showExternalEmbed={showExternalEmbed}
        />
      ))}
    </>
  );
};

const NodeComponent: FC<{
  block: ContentBlock;
  showExternalEmbed?: boolean;
}> = ({ block, showExternalEmbed = false }) => {
  switch (block.type) {
    case 'heading':
      return <Heading block={block} />;
    case 'image':
      return <Image block={block} />;
    case 'blockquote':
      return <Blockquote block={block} />;
    case 'horizontalRule':
      return <HorizontalRule />;
    case 'paragraph':
      return <Paragraph block={block} showExternalEmbed={showExternalEmbed} />;
    case 'bulletList':
      return <BulletList block={block} />;
    case 'orderedList':
      return <OrderedList block={block} />;
    case 'codeBlock':
      return <CodeBlock block={block} />;
    case 'listItem':
      return <ListItem block={block} />;
    default:
      console.warn('An undefined block was found', block.type, block);
      return;
  }
};

export const Article = memo(ArticleComponent);
