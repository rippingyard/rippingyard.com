import { FC } from 'react';

import { YouTube } from '~/components/YouTube';
import { isYouTubeUrl } from '~/utils/typography';

export const Link: FC<{ url: string }> = ({ url }) => {
  if (!url) return;

  if (isYouTubeUrl(url)) return <YouTube url={url} />;

  return (
    <p>
      <a href={url} target="_blank">
        {url}
      </a>
    </p>
  );
};
