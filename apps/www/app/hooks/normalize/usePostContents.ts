import { useMemo } from 'react';

import {
  getHeadingTags,
  getSummary,
  getThumbnailFromText,
  getTitle,
} from '~/utils/typography';

import { removeTitle } from '@rippingyard/utils';

import { useContentBlocks } from './useContentBlocks';

type Options = {
  alt?: string;
  titleLength?: number;
  summaryLength?: number;
};

export const usePostContents = (str: string, options: Options = {}) => {
  const { alt, titleLength = 140, summaryLength = 240 } = options;

  const { blocks: contentBlocks } = useContentBlocks(str);
  const hasTitleBlock = useMemo(
    () =>
      contentBlocks &&
      contentBlocks[0].type === 'heading' &&
      contentBlocks[0].attrs?.level === 1,
    [contentBlocks]
  );

  const headings = useMemo(() => getHeadingTags(str, 1) || [], [str]);
  const hasHeadingTag = useMemo(
    () => headings.length > 0 && headings[0] !== '',
    [headings]
  );

  const title = useMemo(
    () =>
      getTitle(str, {
        alt,
        titleLength,
      }),
    [alt, titleLength, str]
  );

  const content = useMemo(() => (str ? removeTitle(str, 1) : ''), [str]);
  const summary = useMemo(
    () => getSummary(content, summaryLength),
    [content, summaryLength]
  );

  const thumbnail = useMemo(() => getThumbnailFromText(content), [content]);
  const hasThumbnail = useMemo(() => !!thumbnail, [thumbnail]);

  return {
    title,
    content,
    summary,
    headings,
    thumbnail,
    hasTitleBlock,
    hasHeadingTag,
    hasThumbnail,
  };

  // if (typeof content === 'string') {
  // const headings = getheadings(content);
  // if (htags && htags[0] !== '') return decodeEntities(htags[0]);
  // return alt || getSummary(content, length);
  // }
  // else {
  //   const htags = getHtags(content.content);
  //   if (htags && htags[0] !== '') return decodeEntities(htags[0]);
  //   // if (parent && parent?.name?.ja) return parent.name.ja;
  //   return (
  //     alt ||
  //     dayjs(
  //       content.publishedAt.toDate
  //         ? content.publishedAt.toDate()
  //         : content.publishedAt.seconds * 1000
  //     ).format('YYYY年M月D日の記録')
  //   );
  // }
};
