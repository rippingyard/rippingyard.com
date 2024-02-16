import { FetcherWithComponents } from '@remix-run/react';
import { SerializeFrom } from '@vercel/remix';
import { useCallback, useEffect, useState } from 'react';

type Props<T> = {
  initialItems: SerializeFrom<T>[];
  fetcher: FetcherWithComponents<
    SerializeFrom<{
      items: T[];
    }>
  >;
};

export const useInifiniteItems = <T>({ initialItems, fetcher }: Props<T>) => {
  const [items, setItems] = useState(initialItems);
  const [isCompleted, setIsCompleted] = useState(false);
  const [queries, setQueries] = useState<string[]>([]);

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

  return {
    items,
    loadMore,
    isCompleted,
    state: fetcher.state,
  };
};
