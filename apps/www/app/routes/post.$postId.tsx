import type { LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';
import { Suspense, useMemo } from 'react';

import { ADSENSE_IDS, Adsense } from '~/components/Adsense';
import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading';
import { Loading } from '~/features/loading';
import { PostList } from '~/features/postList';
import { usePost } from '~/hooks/fetch/usePost';
import { usePosts } from '~/hooks/fetch/usePosts';
import { useDate } from '~/hooks/normalize/useDate';
import { containerStyle } from '~/styles/container.css';
import { articleSectionStyle } from '~/styles/section.css';
import { getSummary, getTitle } from '~/utils/typography';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    const { postId } = params;

    if (!postId) throw new Error();

    const { post } = await usePost(postId);
    if (!post) throw new Error();

    const { data: nextPosts } = await usePosts({
      limit: 3,
      startAfter: post.publishedAt,
    });

    return json({ post, nextPosts });
  } catch (e) {
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const { post } = data;
  const title = getTitle(post.content, {
    alt: useDate(post.publishedAt, 'YYYY年MM月DD日の記録'),
  });
  const summary = getSummary(post.content, 340);
  const htmlTitle = `${title} - rippingyard`;
  return [
    { title: htmlTitle },
    { property: 'og:title', content: htmlTitle },
    { name: 'twitter:title', content: htmlTitle },
    { name: 'description', content: summary },
    { property: 'og:description', content: summary },
    { name: 'twitter:description', content: summary },
  ];
};

export default function Main() {
  const { post, nextPosts } = useLoaderData<typeof loader>();

  const hasNext = useMemo(() => nextPosts.length > 0, [nextPosts.length]);

  return (
    <>
      <Heading>Post</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={post}>
            <section className={articleSectionStyle}>
              <Article text={post.content} />
              <Adsense slot={ADSENSE_IDS.POST_BOTTOM} />
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
