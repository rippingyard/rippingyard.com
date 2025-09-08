import dayjs from 'dayjs';
import {
  Timestamp,
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { useFirestore } from '~/hooks/firestore/useFirestore';
import { Routes, buildSitemap } from '~/utils/sitemap';

import { Route } from './+types/$year';

export const loader = async ({ params }: Route.LoaderArgs) => {
  try {
    const { year } = params;
    if (!year) {
      throw new Error();
    }
    console.log('year', `${Number(year) + 1}-01-01 00:00:00`);

    const { db } = useFirestore();

    const routes: Routes = [];

    const q = query(
      collection(db, 'posts'),
      where('isPublic', '==', true),
      where('isDeleted', '==', false),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      endAt(Timestamp.fromDate(new Date(`${parseInt(year)}-01-01 00:00:00`))),
      startAfter(
        Timestamp.fromDate(new Date(`${parseInt(year) + 1}-01-01 00:00:00`))
      )
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      const post = doc.data();
      routes.push({
        path: `post/${doc.id}`,
        lastmod: dayjs(post.updatedAt.toDate()),
        // priority: '1.00',
      });
    });

    // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
    return new Response(buildSitemap(routes), {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
        'xml-version': '1.0',
        encoding: 'UTF-8',
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};
