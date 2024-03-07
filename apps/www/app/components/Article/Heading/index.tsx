import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';
import { useContentHTML } from '~/hooks/normalize/useContentHTML';

export const Heading: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;

  const content = useContentHTML(block);

  switch (block.attrs?.level) {
    case 2:
      return <h2 dangerouslySetInnerHTML={{ __html: content }} />;
    case 3:
      return <h3 dangerouslySetInnerHTML={{ __html: content }} />;
    case 4:
      return <h4 dangerouslySetInnerHTML={{ __html: content }} />;
    case 5:
      return <h5 dangerouslySetInnerHTML={{ __html: content }} />;
    case 6:
      return <h6 dangerouslySetInnerHTML={{ __html: content }} />;
    default:
      return <h1 dangerouslySetInnerHTML={{ __html: content }} />;
  }
};
