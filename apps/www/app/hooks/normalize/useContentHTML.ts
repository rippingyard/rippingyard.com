import { ContentBlock, Mark } from './useContentBlocks';

export const useContentHTML = (block: ContentBlock) => {
  let content = '';

  block.content?.map((block) => {
    switch (block.type) {
      case 'text': {
        let text = block.text;

        for (const mark of block.marks || []) {
          if (isBold(mark)) text = `<strong>${text}</strong>`;
          if (isItalic(mark)) text = `<em>${text}</em>`;
          if (isHighlight(mark)) text = `<mark>${text}</mark>`;
          if (isStrike(mark)) text = `<strike>${text}</strike>`;
          if (isLink(mark))
            text = `<a href="${mark.attrs?.href || ''}" target="${mark.attrs?.target || '_blank'}" rel="${mark.attrs?.rel || 'noopener noreferrer nofollow'}">${text}</a>`;
        }

        content += text;
        break;
      }
      case 'hardBreak':
        content += '<br />';
        break;
      default:
        break;
    }
  });

  return content;
};

const isMarked = (
  mark: Mark,
  type: 'bold' | 'italic' | 'strike' | 'highlight' | 'link'
) => !!mark && mark.type === type;

const isLink = (mark: Mark) => isMarked(mark, 'link');
const isBold = (mark: Mark) => isMarked(mark, 'bold');
const isItalic = (mark: Mark) => isMarked(mark, 'italic');
const isStrike = (mark: Mark) => isMarked(mark, 'strike');
const isHighlight = (mark: Mark) => isMarked(mark, 'highlight');
