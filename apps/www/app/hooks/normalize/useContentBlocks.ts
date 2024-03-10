import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { generateJSON } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import { useMemo } from 'react';

import { sanitize } from '~/utils/typography';

type BlockType =
  | 'doc'
  | 'heading'
  | 'paragraph'
  | 'text'
  | 'image'
  | 'blockquote'
  | 'bulletList'
  | 'orderedList'
  | 'codeBlock'
  | 'listItem'
  | 'horizontalRule';

type Attributes = Partial<{
  alt: string;
  src: string;
  title: string;
  level: number;
}>;

export type Mark = Partial<{
  type: 'bold' | 'italic' | 'strike' | 'highlight' | 'link';
  attrs: Partial<{
    href: string;
    target: '_blank' | '_self';
    rel: string;
    class: string;
  }>;
}>;

export type ContentBlock = {
  type: BlockType;
  content?: ContentBlock[];
  text?: string;
  marks?: Mark[];
  attrs?: Attributes;
};

// export type ContentBlock = {
//   type: BlockType;
//   content: string;
//   attrs?: Attributes;
// };

export const useContentBlocks = (html: string) => {
  const sanitizedHtml = sanitize(html);
  const blocks = useMemo<ContentBlock>(
    () =>
      generateJSON(sanitizedHtml, [
        StarterKit,
        Image,
        Link,
        Highlight,
      ]) as ContentBlock,
    [sanitizedHtml]
  );

  if (!blocks.content) return { blocks: [] };

  return { blocks: blocks.content };
};
