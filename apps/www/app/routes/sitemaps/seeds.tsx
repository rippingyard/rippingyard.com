import axios from 'axios';
import dayjs from 'dayjs';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';

import { useStorage } from '~/hooks/firebase/useStorage';
import { Routes, buildSitemap } from '~/utils/sitemap';

import type { Seed } from '@rippingyard/schemas';

export const loader = async () => {
  const routes: Routes = [];

  const { storage } = useStorage();

  const pathref = storageRef(storage, 'seeds/seeds.json');
  const url = await getDownloadURL(pathref);
  const res = await axios.get(url);

  const Seeds = res.data.reverse();

  Seeds.forEach((seed: Seed) => {
    if (seed.status === 'published') {
      routes.push({
        path: `seeds/${seed.slug}`,
        lastmod: dayjs(seed.published_at),
        // priority: '1.00',
      });
    }
  });

  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(buildSitemap(routes), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      'Cache-Control': 'public, max-age=432000',
      encoding: 'UTF-8',
    },
  });
};
