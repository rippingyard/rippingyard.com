import { FC } from 'react';

import { YouTube } from '~/components/YouTube';
import { isYouTubeUrl } from '~/utils/typography';

import { EmbedLink } from './EmbedLink';

export const Link: FC<{ url: string }> = ({ url }) => {
  if (!url) return;

  if (isYouTubeUrl(url)) return <YouTube url={url} />;

  return <EmbedLink url={url} />;
};
