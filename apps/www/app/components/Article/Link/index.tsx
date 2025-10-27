import { FC } from 'react';

import { YouTube } from '~/components/YouTube';
import { isInstagramUrl, isTwitterUrl, isYouTubeUrl } from '~/utils/typography';

import { EmbedLink } from './EmbedLink';
import { Instagram } from './Instagram';
import { Twitter } from './Twitter';

export const Link: FC<{ url: string; showExternalEmbed?: boolean }> = ({
  url,
  showExternalEmbed = false,
}) => {
  if (!url) return;

  if (isYouTubeUrl(url)) return <YouTube url={url} />;
  if (isInstagramUrl(url))
    return <Instagram url={url} showExternalEmbed={showExternalEmbed} />;
  if (isTwitterUrl(url))
    return <Twitter url={url} showExternalEmbed={showExternalEmbed} />;

  return <EmbedLink url={url} />;
};
