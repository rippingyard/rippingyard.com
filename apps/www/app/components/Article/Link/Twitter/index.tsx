import { FC, useEffect, useMemo } from 'react';

import * as styles from './style.css';
import { NormalLink } from '../NormalLink';

export const Twitter: FC<{
  url: string;
  showExternalEmbed: boolean;
}> = ({ url, showExternalEmbed = false }) => {
  const tweetUrl = useMemo(() => url.replace('x.com/', 'twitter.com/'), [url]);

  useEffect(() => {
    if (!showExternalEmbed || !window?.twttr?.widgets) return;
    // Twitterウィジェットの再レンダリングをトリガー
    window.twttr.widgets.load();
  });

  if (!showExternalEmbed) return <NormalLink url={url} />;

  return (
    <div className={styles.container}>
      <blockquote className="twitter-tweet">
        <a href={`${tweetUrl}?ref_src=twsrc%5Etfw`}>{url}</a>
      </blockquote>
    </div>
  );
};
