import { FC } from 'react';

import { YouTube } from '~/components/YouTube';
import { isYouTubeUrl } from '~/utils/typography';
// import { isInstagramUrl, isTwitterUrl, isYouTubeUrl } from '~/utils/typography';

import { EmbedLink } from './EmbedLink';
// import { Instagram } from './Instagram';
// import { Twitter } from './Twitter';

export const Link: FC<{ url: string }> = ({ url }) => {
  if (!url) return;

  if (isYouTubeUrl(url)) return <YouTube url={url} />;
  // if (isInstagramUrl(url)) return <Instagram url={url} />;
  // if (isTwitterUrl(url)) return <Twitter url={url} />;

  return <EmbedLink url={url} />;
};
