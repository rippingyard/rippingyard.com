import dayjs from 'dayjs';
import { Routes, buildSitemapIndex } from '../../../utils/sitemap';

export default defineEventHandler(async (event) => {

  const routes: Routes = [];

  const thisYear = parseInt(dayjs().format('YYYY'));

  for (let i = 2020; i <= thisYear; i++) {
    routes.push({
      path: `sitemaps/posts/${i}.xml`,
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    })
  }

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemapIndex(routes));
});