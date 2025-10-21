import clsx from 'clsx';
import { Timestamp } from 'firebase/firestore';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';

import { TimestampType, useDate } from '~/hooks/normalize/useDate';

import type { Post } from '@rippingyard/schemas';

import {
  containerStyle,
  addTitleStyle,
  itemStyle,
  dateStyle,
} from './style.css';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  post?: Post;
  hasTitle: boolean;
  setHasTitle: Dispatch<SetStateAction<boolean>>;
};

export const StatusHeader: FC<Props> = ({ post, hasTitle, setHasTitle }) => {
  const { seconds, nanoseconds } = Timestamp.now();
  const now: TimestampType = { _seconds: seconds, _nanoseconds: nanoseconds };
  const [publishedAt] = useState(post?.publishedAt || now);
  const publishdate = useDate(publishedAt as unknown as TimestampType);

  const [startDate, setStartDate] = useState(new Date());

  return (
    <ul className={containerStyle}>
      <li className={itemStyle}>
        {(hasTitle && (
          <span className={addTitleStyle} onClick={() => setHasTitle(false)}>
            タイトルを削除
          </span>
        )) || (
          <span className={addTitleStyle} onClick={() => setHasTitle(true)}>
            タイトルを付ける
          </span>
        )}
      </li>
      <li className={clsx(itemStyle, dateStyle)}>{publishdate}</li>
      <li>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            if (!date) return;
            setStartDate(date);
          }}
        />
      </li>
    </ul>
  );
};
