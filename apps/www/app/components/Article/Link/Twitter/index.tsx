import { FC } from 'react';
import { XEmbed } from 'react-social-media-embed';

import * as styles from './style.css';
import { NormalLink } from '../NormalLink';

export const Twitter: FC<{ url: string; showExternalEmbed: boolean }> = ({
  url,
  showExternalEmbed = false,
}) => {
  if (!showExternalEmbed) return <NormalLink url={url} />;
  return (
    <div className={styles.container}>
      <XEmbed url={url} width="100%" />
    </div>
  );
};
