import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

import { TimestampType } from '~/hooks/normalize/useDate';

const toTimestamp = ({ _seconds, _nanoseconds }: TimestampType) =>
  new Timestamp(_seconds, _nanoseconds);

export const toDate = (times: TimestampType) =>
  dayjs(toTimestamp(times).toDate());

export const toMicroseconds = (times: TimestampType) => {
  // console.log('typeof Timestamp', toDate);
  return toDate(times).valueOf();
};
