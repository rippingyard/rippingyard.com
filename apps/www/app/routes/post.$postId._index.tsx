import { Await, useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import type { MetaFunction } from '@vercel/remix';
import { Suspense, useMemo } from 'react';

import { ADSENSE_IDS, Adsense } from '~/components/Adsense';
import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading';
import { Link } from '~/components/Link';
import { PostTags } from '~/components/PostTags';
import { Loading } from '~/features/loading';
import { PostHeader } from '~/features/postHeader';
import { PostList } from '~/features/postList';
import { UserCard } from '~/features/userCard';
import { usePost } from '~/hooks/fetch/usePost.server';
import { usePosts } from '~/hooks/fetch/usePosts.server';
import { useUser } from '~/hooks/fetch/useUser.server';
import { usePostEditLink } from '~/hooks/link/usePostEditLink';
import { usePostLink } from '~/hooks/link/usePostLink';
import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { useCanEditPost } from '~/hooks/permission/useCanEditPost.server';
import { getMe } from '~/middlewares/session.server';
import { containerStyle } from '~/styles/container.css';
import { articleFooterStyle, articleSectionStyle } from '~/styles/section.css';
import { getSummary, getThumbnailFromText, getTitle } from '~/utils/typography';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    const { postId } = params;
    const canEditPost = useCanEditPost();
    const postLink = usePostLink();

    if (!postId) throw new Error();

    const { post } = await usePost(postId, request);
    if (!post) throw new Error();

    const { data: nextPosts } = await usePosts({
      limit: 5,
      startAfter: post.publishedAt,
    });

    const path = postLink(post.id);
    const canonicalUrl = new URL(path, request.url).toString();
    const { uid, role } = await getMe(request);

    const { user: owner } = await useUser(post?.owner?.id || '');

    return json({
      post,
      owner,
      nextPosts,
      canonicalUrl,
      canEditPost: canEditPost(uid, role, post),
      meta: [{ tagName: 'link', rel: 'canonical', href: canonicalUrl }],
    });
  } catch (e) {
    console.error(e);
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const { post, canonicalUrl } = data;

  const title = getTitle(post.content, {
    alt: useDate(
      post.publishedAt as unknown as TimestampType,
      'YYYY年MM月DD日の記録'
    ),
    // level: 1,
  });
  const summary = getSummary(post.content, 340);
  const thumbnail = getThumbnailFromText(post.content);
  const description = getSummary(post.content, 140);
  const htmlTitle = `${title} - rippingyard`;
  const image = thumbnail || '/images/ogimage.png';

  return [
    { title: htmlTitle },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    { name: 'description', content: description },
    { property: 'og:title', content: htmlTitle },
    { property: 'og:description', content: summary },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    { name: 'twitter:title', content: htmlTitle },
    { name: 'twitter:description', content: summary },
    { name: 'twitter:image', content: image },
    { name: 'twitter:card', content: 'summary' },
  ];
};

export default function Main() {
  const { post, owner, nextPosts, canEditPost } =
    useLoaderData<typeof loader>();

  const hasNext = useMemo(() => nextPosts.length > 0, [nextPosts.length]);
  const editLink = usePostEditLink(post.id);

  return (
    <>
      <Heading>Post</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={post}>
            <section className={articleSectionStyle}>
              <PostHeader post={post} />
              <Article text={post.content} />
              {owner && (
                <div className={articleSectionStyle}>
                  <UserCard user={owner} />
                </div>
              )}
              <div className={articleSectionStyle}>
                <Adsense slot={ADSENSE_IDS.POST_BOTTOM} />
              </div>
              {post?.tags && (
                <div className={articleSectionStyle}>
                  <PostTags tags={post?.tags || []} />
                </div>
              )}

              {canEditPost && (
                <div className={articleFooterStyle}>
                  <Link to={editLink} size="x-small" isButton isBold>
                    編集
                  </Link>
                </div>
              )}
            </section>
            {hasNext && (
              <>
                <Heading level="partial">もっと読む</Heading>
                <PostList posts={nextPosts} />
              </>
            )}
          </Await>
        </Suspense>
      </main>
    </>
  );
}
