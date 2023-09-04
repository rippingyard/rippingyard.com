import axios from 'axios';
import { collection, endAt, getDocs, orderBy, query, startAfter, Timestamp, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { Seed } from 'schemas/seed';
import { storage, db } from '~/server/services/firebase';

export default defineEventHandler(async (event) => {

  console.log('slug', event.context.params?.slug);

  if (!event.context.params || !event.context.params?.slug) {
    throw new Error();
  }

  const slug = event.context.params?.slug;

  const pathref = ref(storage, 'seeds/seeds.json');
  const url = await getDownloadURL(pathref);
  const res = await axios.get(url);
  const seeds = res.data.reverse();

  return seeds.find((s: Seed) => s.slug === slug);
});