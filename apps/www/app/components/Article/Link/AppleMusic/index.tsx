import { FC, useMemo } from 'react';

import * as styles from './styles.css';
import { NormalLink } from '../NormalLink';

export const AppleMusic: FC<{
  url: string;
  showExternalEmbed: boolean;
  isTesting?: boolean;
}> = ({ url, showExternalEmbed = false, isTesting = false }) => {
  if (!showExternalEmbed || isTesting) return <NormalLink url={url} />;

  const embedUrl = useMemo(
    () =>
      url.replace('https://music.apple.com', 'https://embed.music.apple.com'),
    []
  );

  const urlInfo = new URL(url);
  if (urlInfo.pathname.includes('/album/'))
    return <AppleMusicAlbum url={embedUrl} isTesting={isTesting} />;
  if (urlInfo.pathname.includes('/artist/'))
    return <AppleMusicAlbum url={embedUrl} isTesting={isTesting} />;
  if (urlInfo.pathname.includes('/playlist/'))
    return <AppleMusicPlaylist url={url} isTesting={isTesting} />;

  return <NormalLink url={url} />;
};

const AppleMusicAlbum: FC<{
  url: string;
  isTesting?: boolean;
}> = ({ url, isTesting = false }) => {
  if (isTesting) return <NormalLink url={url} />;

  return (
    <div className={styles.container}>
      <iframe
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        frameBorder="0"
        height="450"
        style={{
          width: '100%',
          maxWidth: 660,
          overflow: 'hidden',
          borderRadius: 10,
        }}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src={url}
      />
    </div>
  );
};

const AppleMusicPlaylist: FC<{
  url: string;
  isTesting?: boolean;
}> = ({ url, isTesting = false }) => {
  if (isTesting) return <NormalLink url={url} />;

  const urlInfo = new URL(url);
  const uris = urlInfo.pathname.split('/');
  const index = uris.indexOf('playlist') + 1;

  if (index === 0 || !uris[index]) return <NormalLink url={url} />;
  console.log('urlInfo', uris, uris[index]);

  // TODO: embedの際のIDと、実際のURLのIDが異なるため、APIを叩く必要がありそう

  // const playlistId = uris[index].replace('p.', 'pl.');
  // const embedUrl = `https://embed.music.apple.com/jp/playlist/-/${playlistId}`;

  // <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/playlist/arrrps-list-3-apr-2023/pl.u-7YLpSNEyqWk"></iframe>

  // const embedUrl =
  //   'https://embed.music.apple.com/jp/playlist/-/pl.u-7YLpSNEyqWk';

  // https://music.apple.com/jp/library/playlist/p.1lm8ikzrRqK?l=ja
  // https://embed.music.apple.com/jp/playlist/arrrps-list-3-apr-2023/pl.u-7YLpSNEyqWk

  // return (
  //   <div className={styles.container}>
  //     <iframe
  //       allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
  //       frameBorder="0"
  //       height="450"
  //       style={{
  //         width: '100%',
  //         maxWidth: 660,
  //         overflow: 'hidden',
  //         borderRadius: 10,
  //       }}
  //       sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
  //       src={embedUrl}
  //     />
  //   </div>
  // );

  return <NormalLink url={url} />;
};
