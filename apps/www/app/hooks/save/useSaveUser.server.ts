import { Timestamp } from 'firebase-admin/firestore';
import { ZodError } from 'zod';

import { translation } from '~/middlewares/i18n/translation.server';

import { UserSchema, User } from '@rippingyard/schemas';

import { useDocReference } from '../firestore/useDocReference.server';
import { useFirestore } from '../firestore/useFirestore.server';

const defaultErrors = new ZodError<User>([]).flatten();

const saveUser = async (
  payload: Partial<
    Pick<
      User,
      'uid' | 'userName' | 'displayName' | 'profile' | 'avatar' | 'createdAt'
    >
  >
) => {
  try {
    const db = useFirestore();
    const { t } = await translation(new Request(''));

    const { uid, role, userName, displayName, profile, avatar } =
      payload as Partial<User>;

    console.log('userName', userName);

    const userCollection = db.collection('users');
    const userDoc = uid ? userCollection.doc(uid) : userCollection.doc();

    const userRef = useDocReference(uid, 'users');

    const snap = await userRef.get();
    const user = (snap.data() || {
      role: 'anonymous',
      isDeleted: false,
      isBanned: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }) as User;

    user.uid = userDoc.id;
    if (displayName !== undefined) user.displayName = displayName;
    if (profile !== undefined) user.profile = profile;
    if (avatar !== undefined) user.avatar = avatar;

    if (role) user.role = role;

    if (userName !== undefined && userName !== user.userName) {
      const users: User[] = [];
      const usersSnapshot = await userCollection
        .where('userName', '==', userName)
        .get();
      usersSnapshot.forEach((s) => {
        const u = s.data() as User;
        if (!u.isDeleted && u.uid !== user.uid) users.push(u);
      });

      console.log('users', users);
      if (users.length > 0)
        throw new ZodError<User>([
          {
            code: 'custom',
            path: ['userName'],
            message: t('error.duplicatedUsers'),
          },
        ]);

      user.userName = userName;
    }

    user.updatedAt = Timestamp.now();

    console.log('user', user);

    // Validation
    UserSchema.parse(user);

    await userDoc.set(user);

    return {
      user,
      errors: defaultErrors,
    };
  } catch (e) {
    if (e instanceof ZodError) {
      const flattened = e.flatten();
      console.log('flattened', flattened);
      throw flattened;
      // return {
      //   user: null,
      //   errors: flattened,
      // };
    }

    console.error(e);
    throw e;
  }
};

export const useSaveUser = () => saveUser;
