import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Await, useLoaderData } from 'react-router';

import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Loading } from '~/features/loading';
import { SeedList } from '~/features/seedList';
import { useSeeds } from '~/hooks/fetch/useSeeds';
import { Seed } from '@rippingyard/schemas';
import { containerStyle } from '~/styles/container.css';

export const loader = async () => {
  return {
    seeds: await useSeeds(),
  };
};

export const meta = () => {
  const title = 'Seeds - rippingyard';
  return [
    { title },
    { property: 'og:title', content: title },
    { name: 'twitter:title', content: title },
    // { name: 'description', content: summary },
    // { property: 'og:description', content: summary },
    // { name: 'twitter:description', content: summary },
  ];
};

export default function Index() {
  const PER_PAGE = 12;
  const { seeds: allSeeds } = useLoaderData<{ seeds: Seed[] }>();

  const [index, setIndex] = useState(1);
  const [seeds, setSeeds] = useState(allSeeds.slice(0, PER_PAGE));

  const { ref, inView } = useInView({ threshold: 0 });

  const showed = useMemo(() => PER_PAGE * (index + 1), [index]);
  const isCompleted = useMemo(
    () => showed >= allSeeds.length,
    [allSeeds.length, showed]
  );

  const loadMore = useCallback(() => {
    setSeeds(allSeeds.slice(0, showed));
    setIndex(index + 1);
  }, [allSeeds, index, showed]);

  useEffect(() => {
    if (!inView) return;
    loadMore();
  }, [inView, loadMore]);

  return (
    <>
      <Heading>Seeds</Heading>
      <main className={containerStyle}>
        <Suspense fallback={<Loading />}>
          <Await resolve={seeds}>
            <SeedList seeds={seeds} />
            {!isCompleted && (
              <Button ref={ref} onClick={loadMore} isLoading={true}>
                もっと読む
              </Button>
            )}
          </Await>
        </Suspense>
      </main>
    </>
  );
}
