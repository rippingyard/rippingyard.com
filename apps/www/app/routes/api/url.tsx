import dayjs from 'dayjs';
import { Timestamp } from 'firebase-admin/firestore';
import crypto from 'node:crypto';
import ogs from 'open-graph-scraper';

import { useCache } from '~/hooks/fetch/useCache.server';
import { useSaveCache } from '~/hooks/save/useSaveCache.server';

import { Route } from './+types/url';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const u = new URL(request.url);
    const url = u.searchParams.get('url');

    if (!url) throw new Error('URL is required');

    const hash = crypto.hash('sha256', url);

    const cacheKey = `url-0.2-${hash}`;
    const cache = await useCache<any>(cacheKey);

    if (cache) return cache;

    const { saveCache } = useSaveCache();

    const { result } = await ogs({ url });

    const expiredAt = Timestamp.fromDate(dayjs().add(1, 'month').toDate());

    const body: {
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
    } = {
      isSuccess: result.success ?? false,
      url: result.ogUrl ?? result.requestUrl ?? url,
      title: result?.ogTitle,
      sitename: result?.ogSiteName,
      description: result?.ogDescription || '',
      image: result?.ogImage && result?.ogImage[0],
    };

    saveCache({
      id: cacheKey,
      body,
      expiredAt,
    });

    return Response.json({
      ...body,
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
