import { type ActionFunction, data } from 'react-router';

import { getSession, destroySession } from '~/middlewares/session.server';

export const action: ActionFunction = async ({ request }) => {
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
