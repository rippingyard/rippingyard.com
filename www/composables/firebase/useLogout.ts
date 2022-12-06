import { getAuth, signOut } from 'firebase/auth'
import { useFirebase } from './useFirebase';

type Props = {
  doToast?: boolean,
}

export const useLogout = async (props: Props = {}) => {

  const { doToast = true } = props;
  const { $openToast: openToast } = useNuxtApp();

  try {
    const { fb } = useFirebase();
    const auth = getAuth(fb);
    await signOut(auth);
    if (doToast) openToast('ログアウトしました');
    // this.$router.push('/')
  } catch (e) {
    console.error(e);
  }
};