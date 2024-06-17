import { FC, memo } from 'react';

import { User } from '~/schemas/user';

import {
  containerStyle,
  imageContainerStyle,
  imageStyle,
  mainStyle,
  nameStyle,
  sideStyle,
} from './style.css';

const UserCardComponent: FC<{ user?: User }> = ({ user }) => {
  if (!user) return;

  return (
    <div className={containerStyle}>
      <div className={mainStyle}>
        <p className={nameStyle}>{user.displayName}</p>
      </div>
      {user.avatar && (
        <div className={sideStyle}>
          <div className={imageContainerStyle}>
            <img src={user.avatar} className={imageStyle} />
          </div>
        </div>
      )}
    </div>
  );
};

export const UserCard = memo(UserCardComponent);
