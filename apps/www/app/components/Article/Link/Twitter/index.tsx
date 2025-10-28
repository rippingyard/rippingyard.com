import { FC } from 'react';
import { XEmbed } from 'react-social-media-embed';

import * as styles from './style.css';
import { NormalLink } from '../NormalLink';

export const Twitter: FC<{
  url: string;
  showExternalEmbed: boolean;
  isTesting: boolean;
}> = ({ url, showExternalEmbed = false, isTesting = true }) => {
  const tweetId = url.substring(url.lastIndexOf('/') + 1).replace(/[?].*$/, '');
  console.log('tweetId', tweetId);

  if (!showExternalEmbed || isTesting) return <NormalLink url={url} />;
  return (
    <div className={styles.container}>
      <XEmbed url={url} width="100%" />
    </div>
  );
};
