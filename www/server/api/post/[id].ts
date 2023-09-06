import { collection, endAt, getDocs, orderBy, query, startAfter, Timestamp, where } from 'firebase/firestore';
import { db } from '~/server/services/firebase';

export default defineEventHandler(async (event) => {

  if (!event.context.params || !event.context.params?.id) {
    throw new Error();
  }

  const postId = event.context.params?.id;

  const q = query(
    collection(db, 'posts'),
    where('id', '==', postId),
    where('isPublic', '==', true),
    where('isDeleted', '==', false),
    where('status', '==', 'published'),
    //   orderBy('publishedAt', 'desc'),
    //   endAt(Timestamp.fromDate(new Date(`${year}-01-01 00:00:00`))),
    //   startAfter(Timestamp.fromDate(new Date(`${year + 1}-01-01 00:00:00`))),
  );

  const snapshot = await getDocs(q);

  let post: any;
  snapshot.forEach((doc) => {
    post = doc.data();
  });

  const { id, parent, createdAt, publishedAt, updatedAt, content, type } = post;

  return { id, parent, createdAt, publishedAt, updatedAt, content, type };
});