import dayjs from 'dayjs';
import { Routes, buildSitemapIndex } from '../../utils/sitemap';

export default defineEventHandler(async (event) => {
  const routes: Routes = [
    {
      path: 'sitemaps/posts',
      lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    },
    {
      path: 'sitemaps/statics',
      lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    },
  ];

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemapIndex(routes));
});