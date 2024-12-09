import dayjs from 'dayjs';

import { Routes, buildSitemapIndex } from '~/utils/sitemap';

export const loader = () => {
  const routes: Routes = [
    {
      path: 'sitemaps/posts.xml',
      lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    },
    {
      path: 'sitemaps/seeds.xml',
      lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
      isIndex: true,
    },
    // {
    //   path: 'sitemaps/statics.xml',
    //   lastmod: dayjs('2020-07-09 07:00'),
    //   // priority: '1.00',
    //   isIndex: true,
    // },
  ];
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(buildSitemapIndex(routes), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=432000',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
