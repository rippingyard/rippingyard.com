import dayjs from 'dayjs';
import { collection, endAt, getDocs, orderBy, query, startAfter, Timestamp, where } from 'firebase/firestore';
import { Routes, buildSitemap } from '../../../../utils/sitemap';
import { db } from '~/server/services/firebase';

export default defineEventHandler(async (event) => {

  if (!event.context.params || !event.context.params['year.xml']) {
    throw new Error();
  }

  const year = parseInt(event.context.params['year.xml'].replace('.xml', ''));

  const routes: Routes = [];

  const q = query(
    collection(db, 'posts'),
    where('isPublic', '==', true),
    where('isDeleted', '==', false),
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
    endAt(Timestamp.fromDate(new Date(`${year}-01-01 00:00:00`))),
    startAfter(Timestamp.fromDate(new Date(`${year + 1}-01-01 00:00:00`))),
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const post = doc.data();
    routes.push({
      path: `post/${doc.id}`,
      lastmod: dayjs(post.updatedAt.toDate()),
      // priority: '1.00',
    })
  });

  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(buildSitemap(routes));
});