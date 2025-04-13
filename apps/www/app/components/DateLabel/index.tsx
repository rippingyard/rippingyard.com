import { Dayjs } from 'dayjs';
import { FC } from 'react';

import { containerStyle, dayStyle, monthStyle, yearStyle } from './style.css';

type Props = {
  date: Dayjs;
};

export const DateLabel: FC<Props> = ({ date }) => {
  const year = date.format('YYYY');
  const month = date.format('MMM');
  const day = date.format('DD');

  return (
    <div className={containerStyle}>
      <span className={dayStyle}>{day}</span>
      <span className={monthStyle}>{month}</span>
      <span className={yearStyle}>{year}</span>
    </div>
  );
};
