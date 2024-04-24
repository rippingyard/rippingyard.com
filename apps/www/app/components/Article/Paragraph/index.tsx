import { FC, memo } from 'react';

import { ContentBlock } from '~/hooks/normalize/useContentBlocks';
import { useContentHTML } from '~/hooks/normalize/useContentHTML';
import { autolink, extractUrls, stripTags } from '~/utils/typography';

import { Link } from '../Link';

export const ParagraphComponent: FC<{ block: ContentBlock }> = ({ block }) => {
  if (!block.content) return;
  let content = useContentHTML(block);

  const urls = extractUrls(content);

  if (urls.length === 1 && stripTags(content) === urls[0]) {
    return <Link url={urls[0]} />;
  } else if (urls.length > 0) {
    content = autolink(content);
  }

  return <p dangerouslySetInnerHTML={{ __html: content }} />;
};

export const Paragraph = memo(ParagraphComponent);
