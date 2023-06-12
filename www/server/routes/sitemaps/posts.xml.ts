import dayjs from 'dayjs';
import { Routes, buildSitemap } from '../../../utils/sitemap';

export default defineEventHandler(async (event) => {

  console.log('import.meta.env.VITE_GCLOUD_PROJECT', import.meta.env.VITE_GCLOUD_PROJECT);

  const routes: Routes = [];

  const thisYear = parseInt(dayjs().format('YYYY'));

  console.log('thisYear', thisYear);

  for (let i = 2020; i <= thisYear; i++) {
    routes.push({
      path: `sitemaps/posts/${i}.xml`,
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    })
  }

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemap(routes));
});