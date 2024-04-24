import { Await, Link, useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';
import { Suspense, useMemo } from 'react';

import { ADSENSE_IDS, Adsense } from '~/components/Adsense';
import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading';
import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { usePost } from '~/hooks/fetch/usePost.server';
import { usePosts } from '~/hooks/fetch/usePosts.server';
import { usePostEditLink } from '~/hooks/link/usePostEditLink';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { useCanEditPost } from '~/hooks/permission/useCanEditPost.server';
import { getMe } from '~/middlewares/session.server';
import { containerStyle } from '~/styles/container.css';
import { articleSectionStyle } from '~/styles/section.css';
import { getSummary, getThumbnailFromText, getTitle } from '~/utils/typography';

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  try {
    const { postId } = params;
    const canEditPost = useCanEditPost();
    const postLink = usePostLink();

    if (!postId) throw new Error();

    const { post } = await usePost(postId, request);
    console.log('post', post);
    if (!post) throw new Error();

    const { data: nextPosts } = await usePosts({
      limit: 5,
      startAfter: post.publishedAt,
    });

    const path = postLink(post.id);
    const canonicalUrl = new URL(path, request.url).toString();
    const { uid, role } = await getMe(request);

    return json({
      post,
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
    alt: useDate(post.publishedAt, 'YYYY年MM月DD日の記録'),
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
  const { post, nextPosts, canEditPost } = useLoaderData<typeof loader>();

  const hasNext = useMemo(() => nextPosts.length > 0, [nextPosts.length]);
  const editLink = usePostEditLink(post.id);

  return (
    <>
      <Heading>Post</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={post}>
            <section className={articleSectionStyle}>
              {post.status === 'drafted' && <p>この記事は下書き状態です</p>}
              {!post.isPublic && <p>この記事は一般公開されていません</p>}
              <Article text={post.content} />
              <Adsense slot={ADSENSE_IDS.POST_BOTTOM} />
              {canEditPost && <Link to={editLink}>編集</Link>}
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
