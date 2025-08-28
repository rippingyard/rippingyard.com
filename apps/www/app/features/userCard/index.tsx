import { FC, memo } from 'react';

import { Avatar } from '~/components/Avatar';

import type { User } from '@rippingyard/schemas';

import {
  containerStyle,
  idStyle,
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
        <p className={idStyle}>@{user.userName}</p>
      </div>
      {user.avatar && (
        <div className={sideStyle}>
          <Avatar url={user.avatar} />
        </div>
      )}
    </div>
  );
};

export const UserCard = memo(UserCardComponent);
