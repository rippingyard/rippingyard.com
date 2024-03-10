import { FC, memo, useState } from 'react';

import { PlayYouTubeIcon } from '~/assets/icons/PlayYouTube';
import { getYouTubeId, getYoutubeThumbnail } from '~/utils/typography';

import {
  containerStyle,
  playIconStyle,
  previewContainerStyle,
  previewImageStyle,
  widgetStyle,
} from './style.css';

const YouTubeComponent: FC<{ url: string }> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeId = getYouTubeId(url);
  if (!youtubeId) return;
  const thumbnail = getYoutubeThumbnail(youtubeId);
  return (
    <>
      {!isPlaying && (
        <div
          className={previewContainerStyle}
          onClick={() => setIsPlaying(true)}
        >
          <div className={playIconStyle}>
            <PlayYouTubeIcon />
          </div>
          <img src={thumbnail} className={previewImageStyle} />
        </div>
      )}
      {isPlaying && (
        <div className={containerStyle}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={widgetStyle}
          />
        </div>
      )}
    </>
  );

  return <button onClick={() => console.log('YouTube!')}>YouTube Test</button>;
};

export const YouTube = memo(YouTubeComponent);
