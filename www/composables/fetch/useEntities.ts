// import { collection, doc, DocumentData, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { useMe } from '../fetch/useMe';
// import { useFirebase } from '../firebase/useFirebase';
import { useRetryMutation } from '../firestore/useRetryMutation';

const fetchEntities = async (content: string) => {
  try {
    // const { fb } = useFirebase();
    // const db = getFirestore(fb);
    const { me } = useMe();

    // TODO: validation
    // TODO: auth処理
    if (!me.value) throw new Error('権限がありません');

    const urls = extractUrls(content);

    const cacheKey = urls.join('-');

    // const promises = [];

    const { data } = await useAsyncData(cacheKey, async () => await Promise.all(urls.map(url => $fetch('/api/url/fetch', {
      params: {
        url
      }
    }))));

    // promises.push(useAsyncData(entities.join('-'), { entity }))

    // const entities = post.entities || defaultPost.entities
    // entities.byContent = await dispatch(
    //   'entity/getEntitiesFromContent',
    //   post.content,
    //   { root: true }
    // )
    // post.entities = entities

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useEntities = () => useRetryMutation(
  (content: string) => fetchEntities(content)
);
