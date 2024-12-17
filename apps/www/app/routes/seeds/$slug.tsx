import { Suspense } from 'react';
import { Await, data, useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import type { LoaderFunction, MetaFunction } from 'react-router';

import { ADSENSE_IDS, Adsense } from '~/components/Adsense';
import { Article } from '~/components/Article';
import { Heading } from '~/components/Heading';
import { PostItem } from '~/components/PostItem';
import { Loading } from '~/features/loading';
import { useSeeds } from '~/hooks/fetch/useSeeds';
import { useSeedLink } from '~/hooks/link/useSeedLink';
import { containerStyle } from '~/styles/container.css';
import { articleSectionStyle } from '~/styles/section.css';
import { seedToPost } from '~/utils/seed';
import { getSummary, getThumbnailFromText, getTitle } from '~/utils/typography';

export const loader: LoaderFunction = async ({
  params,
  request,
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

    const path = useSeedLink(post.slug as string);
    const canonicalUrl = new URL(path, request.url).toString();

    return data(
      { post, prevPost, nextPost, canonicalUrl },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600',
        },
      }
    );
  } catch (e) {
    console.error(e);
    throw new Response('Not Found', { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const { post, canonicalUrl } = data;

  const title = getTitle(post.content);
  const summary = getSummary(post.content, 340);
  const thumbnail = getThumbnailFromText(post.content);

  const image = thumbnail || '/images/ogimage.png';
  const description = getSummary(post.content, 140);
  const htmlTitle = `${title} - Seed - rippingyard`;

  return [
    { title: htmlTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
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
