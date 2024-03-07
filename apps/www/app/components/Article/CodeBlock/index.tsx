import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';
import { useContentHTML } from '~/hooks/normalize/useContentHTML';

export const CodeBlock: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  const content = useContentHTML(block);
  return <pre dangerouslySetInnerHTML={{ __html: content }} />;
};
