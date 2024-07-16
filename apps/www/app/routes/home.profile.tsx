import { useActionData, useLoaderData } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from '@vercel/remix';
import { useEffect, useState } from 'react';
import { typeToFlattenedError, ZodError } from 'zod';

import { ProfileEditor } from '~/features/profileEditor';
import { useUser } from '~/hooks/fetch/useUser.server';
import { useUserFormData } from '~/hooks/form/useUserFormData';
import { useSaveUser } from '~/hooks/save/useSaveUser.server';
import { getMe } from '~/middlewares/session.server';
import { User } from '~/schemas/user';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  try {
    const title = 'プロフィール編集';
    const canonicalUrl = new URL('home/profile', request.url).toString();

    const { uid } = await getMe(request);
    console.log('uid', uid);
    if (!uid) throw new Error('You have to login');

    const { user: me } = await useUser(uid);
    console.log('uid', uid);
    if (!me) throw new Error('User Not Found');

    return json({
      me,
      title,
      canonicalUrl,
    });
  } catch (e) {
    console.error('Not Found');
    throw e;
  }
};

export const action: ActionFunction = async ({ request }) => {
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

    return json({
      me: newUser,
    });
  } catch (e) {
    console.error(e);
    return json(
      {
        errors: e,
      },
      {
        status: 400,
      }
    );
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
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

export default function Main() {
  const { me } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();

  const [errors, setErrors] = useState<typeToFlattenedError<User, string>>(
    new ZodError<User>([]).flatten()
  );

  if (!me) return;

  console.log('data', data);

  useEffect(() => {
    if (!data?.errors) return;
    console.log('data.errors', data.errors);
    setErrors(data.errors);
  }, [data?.errors]);

  return (
    <>
      <ProfileEditor user={me} errors={errors} />
    </>
  );
}
