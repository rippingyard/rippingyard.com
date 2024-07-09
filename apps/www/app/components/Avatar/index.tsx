import { FC, memo } from 'react';

import { containerStyle, imageStyle } from './style.css';

const AvatarComponent: FC<{ url: string }> = ({ url }) => {
  if (!url) return;

  return (
    <div className={containerStyle}>
      <img src={url} className={imageStyle} />
    </div>
  );
};

export const Avatar = memo(AvatarComponent);
