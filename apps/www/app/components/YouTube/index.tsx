import { FC, memo, useEffect, useMemo, useState } from 'react';

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
  const youtubeId = useMemo(() => getYouTubeId(url), [url]);
  if (!youtubeId) return;
  const thumbnail = useMemo(() => getYoutubeThumbnail(youtubeId), [youtubeId]);

  useEffect(() => setIsPlaying(false), [url]);

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
};

export const YouTube = memo(YouTubeComponent);
