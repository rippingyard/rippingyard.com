import { collection, doc, DocumentData, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { useMe } from '../fetch/useMe';
import { useFirebase } from '../firebase/useFirebase';
import { OriginalPost } from '~/schemas/post';

export const defaultPost: Omit<OriginalPost, 'id'> = {
  slug: '',
  owner: undefined,
  colaborators: [],
  content: '',
  status: 'published',
  type: 'log',
  entities: [],
  items: [],
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  isPublic: false,
  isDeleted: false,
  publishedAt: Timestamp.now(),
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

const savePost = async (post: Partial<OriginalPost>) => {
  try {
    const { fb } = useFirebase();
    const db = getFirestore(fb);
    const { me } = useMe();

    // TODO: validation
    // TODO: auth処理
    if (!me.value) throw new Error('権限がありません');

    // const entities = post.entities || defaultPost.entities
    // entities.byContent = await dispatch(
    //   'entity/getEntitiesFromContent',
    //   post.content,
    //   { root: true }
    // )
    // post.entities = entities

    // TODO: slug

    post.updatedAt = Timestamp.now();

    post.createdAt = post.createdAt || Timestamp.now();
    post.publishedAt = post.publishedAt || Timestamp.now();

    const userCollection = collection(db, 'users');
    if (!post.owner) {
      post.owner = await doc<DocumentData>(userCollection, me.value.uid);
    } else if (post.owner.id) {
      post.owner = await doc(userCollection, post.owner.id)
    }

    const postCollection = collection(db, 'posts');

    const postDoc = post.id ? doc(postCollection, post.id) : doc(postCollection);
    post.id = postDoc.id;

    const newPost = { ...defaultPost, ...post };
    console.log('newPost', newPost);

    await setDoc(postDoc, newPost);

    // await this.saveActivity({
    //   type: 'item:create',
    //   status,
    //   payload: params,
    // })
    return newPost;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useSavePost = () => async (params: Partial<OriginalPost>) => await savePost(params);
