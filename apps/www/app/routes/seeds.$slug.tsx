import type { LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { json } from '@vercel/remix';
import type { LoaderFunction, MetaFunction } from '@vercel/remix';
import { Suspense } from 'react';

import { ADSENSE_IDS, Adsense } from '~/components/Adsense';
import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading';
import { PostItem } from '~/components/PostItem';
import { Loading } from '~/features/loading';
import { useSeeds } from '~/hooks/fetch/useSeeds';
import { useDate } from '~/hooks/normalize/useDate';
import { containerStyle } from '~/styles/container.css';
import { articleSectionStyle } from '~/styles/section.css';
import { seedToPost } from '~/utils/seed';
import { getSummary, getTitle } from '~/utils/typography';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  try {
    const { slug } = params;

    if (!slug) throw new Error();

    const seeds = await useSeeds();
    const index = seeds.findIndex((seed) => seed.slug === slug);

    if (index < 0) throw new Error();

    const seed = seeds[index];
    const prevSeed = seeds[index - 1] || undefined;
    const nextSeed = seeds[index + 1] || undefined;

    const post = seedToPost(seed);
    const prevPost = prevSeed ? seedToPost(prevSeed) : undefined;
    const nextPost = nextSeed ? seedToPost(nextSeed) : undefined;

    return json({ post, prevPost, nextPost });
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
  const htmlTitle = `${title} - Seed - rippingyard`;
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
  const { post, nextPost, prevPost } = useLoaderData<typeof loader>();
  return (
    <>
      <Heading>Seed</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={post}>
            <section className={articleSectionStyle}>
              <Article text={post.content} />
              <Adsense slot={ADSENSE_IDS.POST_BOTTOM} />

              {(nextPost || prevPost) && (
                <Heading level="partial">もっと読む</Heading>
              )}
              {prevPost && (
                <PostItem
                  post={prevPost}
                  permalink={`/seeds/${prevPost.slug}`}
                />
              )}
              {nextPost && (
                <PostItem
                  post={nextPost}
                  permalink={`/seeds/${nextPost.slug}`}
                />
              )}
            </section>
          </Await>
        </Suspense>
      </main>
    </>
  );
}
