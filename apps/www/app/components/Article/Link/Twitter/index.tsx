import { FC } from 'react';
import { XEmbed } from 'react-social-media-embed';

import * as styles from './style.css';

export const Twitter: FC<{ url: string }> = ({ url }) => {
  return (
    <div className={styles.container}>
      <XEmbed url={url} width="100%" />
    </div>
  );
};
