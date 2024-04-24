import { useFetcher } from '@remix-run/react';
import { SerializeFrom } from '@vercel/remix';
import { useCallback, useEffect, useState } from 'react';

import { getCachedItems } from '../cache/useCache';

type Props<T> = {
  key: string;
  initialItems: SerializeFrom<T>[];
};

export const useInifiniteItems = <T>({ key, initialItems }: Props<T>) => {
  const cachedItems = getCachedItems<T>(key);

  const [items, setItems] = useState(
    cachedItems.length > 0 ? cachedItems : initialItems
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [queries, setQueries] = useState<string[]>([]);

  const fetcher = useFetcher<{ items: T[] }>();

  const loadMore = useCallback(
    (query: string) => {
      if (!query || isCompleted || fetcher.state !== 'idle') return;
      if (queries.includes(query)) return;
      setQueries((prev) => [...prev, query]);
      fetcher.load(query);
    },
    [fetcher, isCompleted, queries]
  );

  useEffect(() => {
    if (!fetcher.data || fetcher.state !== 'idle') return;
    const newItems = fetcher.data.items;
    if (newItems.length === 0) return setIsCompleted(true);
    setItems((prevItems) => [...prevItems, ...newItems] as SerializeFrom<T>[]);
  }, [fetcher.data, fetcher.state]);

  useEffect(() => {
    if (sessionStorage) sessionStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  return {
    items,
    loadMore,
    isCompleted,
    state: fetcher.state,
  };
};
