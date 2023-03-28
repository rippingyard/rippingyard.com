import { Routes, buildSitemap } from '../../../utils/sitemap';

export default defineEventHandler(async (event) => {

  console.log('import.meta.env.VITE_GCLOUD_PROJECT', import.meta.env.VITE_GCLOUD_PROJECT);

  const routes: Routes = [
    {
      path: 'posts',
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
    },
    {
      path: 'sitemaps/posts/2022',
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    },
  ];

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemap(routes));
});