import { FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const useLogin = async (email: string, password: string) => {
  console.log('email', email);
  console.log('password', password);

  const auth = getAuth(useState<FirebaseApp>('fb').value);

  return await signInWithEmailAndPassword(auth, email, password);
}


// async login({ commit }: Store<any>, { email, password }: LoginParams) {
//   try {
//     const res = await this.$fire.auth
//       .signInWithEmailAndPassword(email, password)
//     const { user } = res
//     const userRef = await this.$fire.firestore
//       .collection('users')
//       .doc(user.uid)

//     // TODO: isDeletedの時はエラー
//     // TODO: isBannedの時はエラー

//     userRef.get().then((doc: { data: () => void }) => {
//       commit('setMe', doc.data())
//     })

//     return res
//   } catch (e) {
//     // console.warn('error', e)
//     commit('removeMe')
//     return e
//   }
// },