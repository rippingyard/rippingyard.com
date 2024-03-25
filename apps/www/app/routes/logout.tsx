import { json } from '@vercel/remix';
import type { ActionFunction } from '@vercel/remix';

import { getSession, destroySession } from '~/middlewares/session.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  return json(
    {},
    {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    }
  );
};
