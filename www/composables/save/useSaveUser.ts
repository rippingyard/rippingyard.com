import { collection, doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { useMe } from '../fetch/useMe';
import { useFirebase } from '../firebase/useFirebase';
import { useRetryMutation } from '../firestore/useRetryMutation';
import { User } from '~/schemas/user';

export const defaultUser: Omit<User, 'uid'> = {
  displayName: '',
  userName: '',
  code: '',
  profile: '',
  avatar: '',
  role: 'stranger',
  isBanned: false,
  isDeleted: false,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
}

const saveUser = async (user: Partial<User>) => {
  try {
    const { fb } = useFirebase();
    const db = getFirestore(fb);
    const { me } = useMe();

    // TODO: validation
    // TODO: auth処理
    if (!me.value) throw new Error('権限がありません');

    user.updatedAt = Timestamp.now();

    user.createdAt = user.createdAt || Timestamp.now();

    const userCollection = collection(db, 'users');

    const userDoc = user.uid ? doc(userCollection, user.uid) : doc(userCollection);
    user.uid = userDoc.id;

    const newUser = { ...defaultUser, ...user };
    console.log('newUser', newUser);

    await setDoc(userDoc, newUser);

    // await this.saveActivity({
    //   type: 'item:create',
    //   status,
    //   payload: params,
    // })
    return newUser;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const useSaveUser = () => useRetryMutation(
  (params: Partial<User>) => saveUser(params)
);
