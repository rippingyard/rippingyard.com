import { Routes, buildSitemap } from '../../../utils/sitemap';

export default defineEventHandler(async (event) => {
  const routes: Routes = [
    {
      path: 'login',
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
    },
    {
      path: 'seeds',
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
    },
  ];

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemap(routes));
});