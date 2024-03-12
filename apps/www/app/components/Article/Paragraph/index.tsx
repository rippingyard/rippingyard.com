import { FC, memo } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';
import { useContentHTML } from '~/hooks/normalize/useContentHTML';
import { extractUrls, stripTags } from '~/utils/typography';

import { Link } from '../Link';

export const ParagraphComponent: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  const content = useContentHTML(block);

  const urls = extractUrls(content);

  if (urls.length === 1 && stripTags(content) === urls[0])
    return <Link url={urls[0]} />;

  return <p dangerouslySetInnerHTML={{ __html: content }} />;
};

export const Paragraph = memo(ParagraphComponent);
