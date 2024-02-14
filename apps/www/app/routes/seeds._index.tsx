﻿import { Await, useLoaderData } from '@remix-run/react';
import { defer } from '@vercel/remix';
import type { LoaderFunction } from '@vercel/remix';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Button } from '~/components/Button_';
import { Heading } from '~/components/Heading_';
import { Loading } from '~/features/loading';
import { SeedList } from '~/features/seedList';
import { useSeeds } from '~/hooks/fetch/useSeeds';
import { Seed } from '~/schemas/seed';
import { containerStyle } from '~/styles/container.css';

export const loader: LoaderFunction = async () => {
  return defer({
    seeds: await useSeeds(),
  });
};

export default function Index() {
  const PER_PAGE = 12;
  const { seeds: allSeeds } = useLoaderData<{ seeds: Seed[] }>();

  const [index, setIndex] = useState(1);
  const [seeds, setSeeds] = useState(allSeeds.slice(0, PER_PAGE));

  const { ref, inView } = useInView({ threshold: 0 });

  const loadMore = useCallback(() => {
    setSeeds(allSeeds.slice(0, PER_PAGE * (index + 1)));
    setIndex(index + 1);
  }, [allSeeds, index]);

  useEffect(() => {
    if (!inView) return;
    loadMore();
  }, [inView, loadMore]);

  return (
    <main className={containerStyle}>
      <Heading>Seeds</Heading>
      <Suspense fallback={<Loading />}>
        <Await resolve={seeds}>
          <SeedList seeds={seeds} />
          <Button ref={ref} onClick={loadMore}>
            Load More...
          </Button>
        </Await>
      </Suspense>
    </main>
  );
}