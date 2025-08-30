import { redirect } from 'react-router';

import { Route } from '../tag/+types/$tag';

export const loader = ({ params }: Route.LoaderArgs) => {
  const { tag } = params;
  if (!tag) throw new Error();
  throw redirect(`/tag/${encodeURIComponent(tag)}`, { status: 301 });
};
