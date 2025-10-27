import { FC } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

import * as styles from './styles.css';

export const Instagram: FC<{ url: string }> = ({ url }) => {
  return (
    <div className={styles.container}>
      <InstagramEmbed url={url} width="100%" />
    </div>
  );
};
