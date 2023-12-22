import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '~/server/services/firebase';

export default defineEventHandler(async (event) => {

  if (!event.context.params || !event.context.params?.id) {
    throw new Error();
  }

  const entityId = event.context.params?.id;

  const q = query(
    collection(db, 'entities'),
    where('id', '==', entityId),
    where('status', '==', 'published'),
  );

  const snapshot = await getDocs(q);

  let entity: any;
  snapshot.forEach((doc) => {
    entity = doc.data();
  });
  if (!entity) return {};

  const { id, createdAt, updatedAt, description, type } = entity;

  return { id, createdAt, updatedAt, description, type };
});