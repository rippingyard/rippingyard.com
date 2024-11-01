import { FC } from 'react';

import { TimestampType, useDate } from '~/hooks/normalize/useDate';

import {
  containerStyle,
  dayStyle,
  hourStyle,
  monthStyle,
  yearStyle,
} from './style.css';

export const PostTableDate: FC<{
  timestamp: TimestampType;
}> = ({ timestamp }) => {
  const yyyy = useDate(timestamp, 'YYYY');
  const mm = useDate(timestamp, 'MMM');
  const dd = useDate(timestamp, 'DD');

  const hour = useDate(timestamp, 'HH:mm');

  return (
    <p className={containerStyle}>
      <span className={dayStyle}>{dd}</span>
      <span className={monthStyle}>{mm}</span>
      <span className={yearStyle}>{yyyy}</span>
      <span className={hourStyle}>{hour}</span>
    </p>
  );
};
