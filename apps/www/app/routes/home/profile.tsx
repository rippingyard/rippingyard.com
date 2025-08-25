import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { data, redirect } from 'react-router';
import { typeToFlattenedError, ZodError } from 'zod';

import { ProfileEditor } from '~/features/profileEditor';
import { useUser } from '~/hooks/fetch/useUser.server';
import { useUserFormData } from '~/hooks/form/useUserFormData';
import { useSaveUser } from '~/hooks/save/useSaveUser.server';
import { getMe } from '~/middlewares/session.server';
import type { User } from '@rippingyard/schemas';
import { containerStyle, edgeStyle } from '~/styles/container.css';

import { Route } from './+types/profile';

export const loader = async ({ request }: Route.LoaderArgs) => {
  try {
    const title = 'プロフィール編集';
    const canonicalUrl = new URL('home/profile', request.url).toString();

    const { uid } = await getMe(request);
    console.log('uid', uid);
    if (!uid) throw new Error('You have to login');

    const { user: me } = await useUser(uid);
    console.log('uid', uid);
    if (!me) throw new Error('User Not Found');

    return {
      me,
      title,
      canonicalUrl,
    };
  } catch (e) {
    console.error('Not Found');
    throw e;
  }
};

export const action = async ({ request }: Route.ActionArgs) => {
  const saveUser = useSaveUser();

  try {
    const { uid } = await getMe(request);
    console.log('uid on action', uid);
    if (!uid) throw new Error('Unauthenticated');

    const { user } = await useUser(uid);
    if (!user) throw new Error();

    const { displayName, profile, avatar, userName } =
      await useUserFormData(request);

    const { user: newUser } = await saveUser({
      uid,
      userName,
      displayName,
      profile,
      avatar,
    });

    console.log('saved!', newUser);

    redirect('/profile');

    // return {
    //   me: newUser,
    // };
  } catch (e) {
    console.error(e);
    return data(
      {
        errors: e as typeToFlattenedError<User, string>,
      },
      {
        status: 400,
      }
    );
  }
};

export const meta = ({ data }: Route.MetaArgs) => {
  const { title, canonicalUrl } = data;

  const htmlTitle = `${title} - rippingyard`;
  const image = '/images/ogimage.png';

  return [
    { title: htmlTitle },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    // { name: 'description', content: description },
    // { property: 'og:title', content: htmlTitle },
    // { property: 'og:description', content: summary },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: image },
    // { name: 'twitter:title', content: htmlTitle },
    // { name: 'twitter:description', content: summary },
    { name: 'twitter:image', content: image },
    // { name: 'twitter:card', content: 'summary' },
  ];
};

export default function Main({ loaderData, actionData }: Route.ComponentProps) {
  const { me } = loaderData;

  const [errors, setErrors] = useState<typeToFlattenedError<User, string>>(
    new ZodError<User>([]).flatten()
  );

  if (!me) return;

  console.log('actionData', actionData);

  useEffect(() => {
    if (typeof actionData === 'undefined') return;
    if (typeof actionData?.errors === 'undefined') return;
    console.log('data.errors', actionData.errors);
    setErrors(actionData.errors);
  }, [actionData]);

  return (
    <main className={clsx(containerStyle, edgeStyle)}>
      <ProfileEditor user={me} errors={errors} />
    </main>
  );
}
