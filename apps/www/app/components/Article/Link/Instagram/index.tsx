import { FC } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

import * as styles from './styles.css';
import { NormalLink } from '../NormalLink';

export const Instagram: FC<{
  url: string;
  showExternalEmbed: boolean;
  isTesting: boolean;
}> = ({ url, showExternalEmbed = false, isTesting = true }) => {
  if (!showExternalEmbed || isTesting) return <NormalLink url={url} />;
  return (
    <div className={styles.container}>
      <InstagramEmbed url={url} width="100%" />
    </div>
  );
};
