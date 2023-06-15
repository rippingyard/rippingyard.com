import dayjs from 'dayjs';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { Routes, buildSitemap } from '../../../utils/sitemap';
import { storage } from '~/server/services/firebase';
import axios from 'axios';

export default defineEventHandler(async (event) => {

  const routes: Routes = [];

  const pathref = storageRef(storage, 'seeds/seeds.json');
  const url = await getDownloadURL(pathref);
  const res = await axios.get(url);

  const Seeds = res.data.reverse();

  Seeds.forEach((seed: any) => {
    if (seed.status === 'published') {
      console.log('seed', seed);
      routes.push({
        path: `seeds/${seed.slug}`,
        lastmod: dayjs(seed.published_at),
        // priority: '1.00',
      });
    }
  });

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemap(routes));
});