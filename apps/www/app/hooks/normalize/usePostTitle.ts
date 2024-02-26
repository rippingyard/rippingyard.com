﻿import {
  getHeadingTags,
  getSummary,
  getTitle,
  removeTitle,
} from '~/utils/typography';

import { useMemo } from 'react';

type Options = {
  alt?: string;
  titleLength?: number;
  summaryLength?: number;
};

export const usePostTitle = (str: string, options: Options = {}) => {
  const { alt, titleLength = 140, summaryLength = 240 } = options;

  const headings = useMemo(() => getHeadingTags(str) || [], [str]);
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

  const content = useMemo(() => (str ? removeTitle(str) : ''), [str]);
  const summary = useMemo(
    () => getSummary(content, summaryLength),
    [content, summaryLength]
  );

  return {
    title,
    content,
    summary,
    headings,
    hasHeadingTag,
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
