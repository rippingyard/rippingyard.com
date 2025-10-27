import { FC } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

import * as styles from './styles.css';
import { NormalLink } from '../NormalLink';

export const Instagram: FC<{ url: string; showExternalEmbed: boolean }> = ({
  url,
  showExternalEmbed = false,
}) => {
  if (!showExternalEmbed) return <NormalLink url={url} />;
  return (
    <div className={styles.container}>
      <InstagramEmbed url={url} width="100%" />
    </div>
  );
};
