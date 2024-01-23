import dayjs from 'dayjs';

import { Routes, buildSitemapIndex } from '~/utils/sitemap';

export const loader = () => {
  const routes: Routes = [];

  const thisYear = parseInt(dayjs().format('YYYY'));

  for (let i = 2020; i <= thisYear; i++) {
    routes.push({
      path: `sitemaps/posts/${i}.xml`,
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    });
  }

  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(buildSitemapIndex(routes), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
