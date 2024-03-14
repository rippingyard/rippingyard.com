import { FC } from 'react';

import { dateStyle } from './style.css';

export const LastUpdates: FC<{
  updates: string[];
}> = ({ updates }) => {
  return <p className={dateStyle}>最終更新日：{updates[0]}</p>;
};
