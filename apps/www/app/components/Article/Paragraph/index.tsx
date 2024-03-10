import { FC } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';
import { useContentHTML } from '~/hooks/normalize/useContentHTML';
import { extractUrls } from '~/utils/typography';

import { Link } from '../Link';

export const Paragraph: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  const content = useContentHTML(block);

  const urls = extractUrls(content);
  if (urls.length > 0) console.log('urls', urls);

  if (urls.length === 1 && content === urls[0]) return <Link url={urls[0]} />;

  return <p dangerouslySetInnerHTML={{ __html: content }} />;
};
