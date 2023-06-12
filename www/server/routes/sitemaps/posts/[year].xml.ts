import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { collection, endAt, endBefore, getDocs, getFirestore, orderBy, query, startAfter, startAt, Timestamp, where } from 'firebase/firestore';
import { Routes, buildSitemap } from '../../../../utils/sitemap';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

export default defineEventHandler(async (event) => {

  console.log('firebaseConfig', config);

  if (!event.context.params || !event.context.params['year.xml']) {
    throw new Error();
  }

  const year = parseInt(event.context.params['year.xml'].replace('.xml', ''));

  const routes: Routes = [];

  const fb = initializeApp(config);
  const db = getFirestore(fb);

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