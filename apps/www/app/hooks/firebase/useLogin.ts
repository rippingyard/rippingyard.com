﻿import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ZodError, ZodIssue } from 'zod';

import { Auth, AuthSchema } from '~/schemas/auth';

import { useFirebase } from './useFirebase';

const defaultErrors = new ZodError<Auth>([]).flatten();

export const useLogin = async (args: Auth) => {
  const { email, password } = args;
  console.log('email', email);
  console.log('password', password);

  const { auth } = useFirebase();

  try {
    AuthSchema.parse({
      email,
      password,
    });

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();

    return {
      user,
      token,
      errors: defaultErrors,
    };
  } catch (e) {
    console.error('login error', e);

    let errors = defaultErrors;

    if (e instanceof ZodError) {
      errors = e.flatten();
    }

    if (e instanceof FirebaseError) {
      const error: ZodIssue = {
        code: 'custom',
        path: [],
        message: 'ログインに失敗しました',
      };

      if (e?.code) {
        switch (e.code) {
          case 'auth/user-not-found':
            error.message = 'ユーザーが登録されていません';
            break;
          case 'auth/wrong-password':
            error.path.push('password');
            error.message = 'パスワードが正しくありません';
            break;
        }
      }
      errors = new ZodError<Auth>([error]).flatten();
    }

    return {
      users: null,
      token: null,
      errors,
    };
  }
};