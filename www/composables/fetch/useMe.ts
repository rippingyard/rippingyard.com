// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { FirebaseApp } from 'firebase/app';
import { useCachedDoc } from '../firestore/useCachedDoc';
import { useAuth } from '../firebase/useAuth';
import { User } from '~/schemas/user';

// const getMe = (id: string) => {
//   const result = ref<User>();
//   onMounted(() => {
//     result.value = useCachedDoc<User>({
//       collection: 'users',
//       id,
//       // where: [
//       //   { key: 'isDeleted', val: false },
//       //   { key: 'isPublic', val: true },
//       //   { key: 'status', val: 'published' },
//       //   ...where,
//       // ],
//     });
//     console.log('result.value', result.value);
//   });
//   return result;
// }

export const useMe = () => {

  const result = ref<any>({
    isLoading: true,
    isError: false,
    error: undefined,
    data: undefined,
  });

  const authedUser = useAuth();

  onMounted(() => {
    console.log('useMe!!!!!!', authedUser.value.user);
    if (!result.value.isLoading || !authedUser.value.user?.uid) return;
    console.log('authedUser.value.user?.uid', authedUser.value.user);
    result.value = useCachedDoc<User>({
      collection: 'users',
      id: authedUser.value.user?.uid
    });
    console.log('result.value', result.value);
  });

  // const { where = [] } = args;

  // onMounted(() => {
  //   authedUser.value = useAuth();
  //   console.log('Auth!', authedUser.value);
  //   // authedUser.value = auth?.user;
  // });

  // onMounted(() => {
  //   const auth = getAuth(useState<FirebaseApp>('fb').value);
  //   onAuthStateChanged(auth, user => {
  //     if (!user?.uid) return;
  //     console.log('user loaded!', user);
  //     result.value = getMe(user.uid);
  //     // result.value = useCachedDoc<User>({
  //     //   collection: 'users',
  //     //   id: user.uid,
  //     //   // where: [
  //     //   //   { key: 'isDeleted', val: false },
  //     //   //   { key: 'isPublic', val: true },
  //     //   //   { key: 'status', val: 'published' },
  //     //   //   ...where,
  //     //   // ],
  //     // });
  //   });
  // });

  // watch(authedUser, () => {

  //   //     const { user } = res
  //   //     const userRef = await this.$fire.firestore
  //   //       .collection('users')
  //   //       .doc(user.uid)

  //   //     // TODO: isDeletedの時はエラー
  //   //     // TODO: isBannedの時はエラー

  //   //     userRef.get().then((doc: { data: () => void }) => {
  //   //       commit('setMe', doc.data())
  //   //     })

  //   if (!authedUser.value.user) return;

  //   console.log('authedUser', authedUser);

  //   result.value = getMe(authedUser.value.user?.uid);
  // })

  return result;

};