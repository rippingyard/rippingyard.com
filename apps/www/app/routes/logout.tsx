import { data } from 'react-router';

import { getSession, destroySession } from '~/middlewares/session.server';

import type { Route } from './+types/logout';

export const action = async ({ request }: Route.ActionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  return data(
    {},
    {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    }
  );
};
