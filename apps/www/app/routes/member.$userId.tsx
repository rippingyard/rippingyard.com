import { LoaderFunctionArgs } from 'react-router';

import { useUser } from '~/hooks/fetch/useUser.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { userId } = params;

    if (!userId) throw new Error();

    const { user } = await useUser(userId);

    if (!user) throw new Error();

    return {
      user,
    };
  } catch (e) {
    console.error(e);
    throw new Response('Not Found', { status: 404 });
  }
};
