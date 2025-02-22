import clsx from 'clsx';
import { Timestamp } from 'firebase/firestore';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import { TimestampType, useDate } from '~/hooks/normalize/useDate';
import { SerializedPost } from '~/schemas/post';

import {
  containerStyle,
  addTitleStyle,
  itemStyle,
  dateStyle,
} from './style.css';

type Props = {
  post?: SerializedPost;
  hasTitle: boolean;
  setHasTitle: Dispatch<SetStateAction<boolean>>;
};

export const StatusHeader: FC<Props> = ({ post, hasTitle, setHasTitle }) => {
  const { seconds, nanoseconds } = Timestamp.now();
  const now: TimestampType = { _seconds: seconds, _nanoseconds: nanoseconds };
  const [publishedAt] = useState(post?.publishedAt || now);
  const publishdate = useDate(publishedAt as unknown as TimestampType);

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
    </ul>
  );
};
