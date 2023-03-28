import { Routes, buildSitemap } from '../../../../utils/sitemap';

export default defineEventHandler(async (event) => {

  console.log('import.meta.env.VITE_GCLOUD_PROJECT', import.meta.env.VITE_GCLOUD_PROJECT);



  if (!event.context.params || !event.context.params['year.xml']) {
    throw new Error();
  }



  console.log('route', event.context.params['year.xml']);

  const routes: Routes = [
    {
      path: 'post/test',
      // lastmod: dayjs('2020-07-09 07:00'),
      // priority: '1.00',
    },
  ];

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemap(routes));
});