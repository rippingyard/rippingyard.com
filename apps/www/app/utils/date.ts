import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

import { TimestampType } from '~/hooks/normalize/useDateObject';

const toTimestamp = ({ _seconds, _nanoseconds }: TimestampType) =>
  new Timestamp(_seconds, _nanoseconds);

export const toDate = (times: TimestampType) =>
  dayjs(toTimestamp(times).toDate());

export const toMicroseconds = (times: TimestampType) => {
  return toDate(times).valueOf();
};
