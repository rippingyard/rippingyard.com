// import dayjs from 'dayjs';

// import { Post } from '~/schemas/post';
// import { numberByString } from '~/utils';
// import {
//   getThumbnailFromText,
//   getTitle,
//   hasThumbnailFromText,
//   removeTitle,
// } from '~/utils/typography';

// import { usePostEditLink } from '../link/usePostEditLink';
// import { usePostLink } from '../link/usePostLink';

// import { useMemo } from 'react';

// // import { useItem } from '../fetch/useItem';
// // import { usePostEditLink } from '../link/usePostEditLink';
// // import { usePostLink } from '../link/usePostLink';

// // import { usePostSocialLink } from '~~/composables/link/usePostSocialLink';

// // const getParent = (post: Post) => {
// //   if (!post.parent) return { data: undefined };
// //   return useItem({ ref: post?.parent });
// // };

// export const useNormalizedPost = (originalPost: Post) => {
//   // const { data: parent } = getParent(originalPost);

//   const title = useMemo(() => getTitle(originalPost), [originalPost]);

//   const permalink = useMemo(() => usePostLink(originalPost), [originalPost]);
//   const editlink = useMemo(() => usePostEditLink(originalPost), [originalPost]);
//   // const sociallink = (post: Partial<Post>): string => usePostSocialLink(post);

//   const contentBody = useMemo(
//     () => (originalPost?.content ? removeTitle(originalPost.content) : ''),
//     [originalPost.content]
//   );
//   const hasThumbnail = useMemo(
//     () => hasThumbnailFromText(originalPost.content),
//     [originalPost.content]
//   );
//   const autoCode = useMemo(
//     () => numberByString(originalPost.id),
//     [originalPost.id]
//   );

//   const post = useMemo<Post>(() => {
//     return {
//       ...originalPost,
//       title,
//       contentOriginal: originalPost.content,
//       contentBody,
//       hasThumbnail,
//       autoCode,
//       thumbnail: thumbnail(originalPost),
//       permalink,
//       // sociallink: sociallink,
//       editlink,
//       createdDate: dayjs(originalPost.createdAt.toDate()),
//       updatedDate: dayjs(originalPost.updatedAt.toDate()),
//       publishedDate: dayjs(originalPost.publishedAt.toDate()),
//     };
//   }, [
//     autoCode,
//     contentBody,
//     editlink,
//     hasThumbnail,
//     originalPost,
//     permalink,
//     title,
//   ]);

//   return post;
// };

// export const thumbnail = (post: Post): string => {
//   const thumbnailFromText = getThumbnailFromText(post?.content);
//   if (thumbnailFromText) return thumbnailFromText;

//   // if (post?.parent?.thumbnailImage) return post.parent.thumbnailImage;

//   return '';
// };
