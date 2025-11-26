import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';
import crypto from 'node:crypto';
import ogs from 'open-graph-scraper';

import { fetchBookmark } from '~/hooks/fetch/bookmark.server';
import { useCache } from '~/hooks/fetch/useCache.server';
import { useSaveBookmark } from '~/hooks/save/useSaveBookmark.server';
import { useSaveCache } from '~/hooks/save/useSaveCache.server';

import { Route } from './+types/url';

const fetchUrl = async (
  url: string
): Promise<{
  url: string;
  title?: string;
  sitename?: string;
  description: string;
  image?: {
    height?: number;
    type?: string;
    url: string;
    width?: number;
    alt?: string;
  };
  isSuccess: boolean;
}> => {
  const { result } = await ogs({ url });

  return {
    isSuccess: result.success ?? false,
    url: result.ogUrl ?? result.requestUrl ?? url,
    title: result?.ogTitle,
    sitename: result?.ogSiteName,
    description: result?.ogDescription || '',
    image: result?.ogImage && result?.ogImage[0],
  };
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const u = new URL(request.url);
    const url = u.searchParams.get('url');

    if (!url) throw new Error('URL is required');

    const id = crypto.hash('sha256', url);

    const { bookmark } = await fetchBookmark(id);

    const expiredAt = Timestamp.fromDate(dayjs().add(1, 'month').toDate());

    if (!bookmark) {
      const cacheKey = `url-0.3-${id}`;
      const cache = await useCache<any>(cacheKey);

      if (cache) return cache;

      const { saveCache } = useSaveCache();

      const body = await fetchUrl(url);

      saveCache({
        id: cacheKey,
        body,
        expiredAt,
      });

      return Response.json({
        ...body,
      });
    }

    if (
      !bookmark.contents ||
      dayjs(bookmark.expiredAt?.toDate()).isBefore(dayjs())
    ) {
      const contents = await fetchUrl(url);

      const saveBookmark = useSaveBookmark();

      await saveBookmark(url, {
        contents,
        expiredAt,
      });

      return Response.json({
        ...contents,
      });
    }

    return Response.json({
      ...bookmark.contents,
    });
  } catch (e: unknown) {
    console.error('error:', e);

    return Response.json(
      {
        error: e,
      },
      {
        status: 400,
      }
    );
  }
};
