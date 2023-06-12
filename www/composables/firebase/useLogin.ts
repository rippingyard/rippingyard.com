import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebase } from './useFirebase';
import { Auth, authValidationErrors, authValidator } from '~/schemas/auth';

export const useLogin = async (args: Auth): Promise<any> => {
  const { email, password } = args;

  const { validationErrors, useValidationError } = authValidationErrors();
  const errors = ref(validationErrors);

  if (!authValidator({ email, password })) {
    const { validationErrors } = useValidationError(authValidator.errors);
    errors.value = validationErrors;
    return {
      errors,
    };
  }

  try {

    const { fb } = useFirebase();
    const auth = getAuth(fb);

    return await signInWithEmailAndPassword(auth, email, password);

  } catch (e: any) {
    console.error('login error', e)

    if (e?.code) {
      switch (e.code) {
        case 'auth/user-not-found':
          errors.value._total = [`ユーザーが登録されていません`];
          break;

        case 'auth/wrong-password':
          errors.value.password = [`パスワードが正しくありません`];
          break;

        default:
          errors.value._total = [`ログインに失敗しました`];
          break;
      }
    }

    return {
      errors
    };
  }
}
