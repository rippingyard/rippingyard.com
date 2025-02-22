import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

import { TimestampType } from '~/hooks/normalize/useDate';

export type SerializedTimestamp = {
  readonly seconds: number;
  readonly nanoseconds: number;
  toDate: undefined;
  toMillis: undefined;
  isEqual: undefined;
  valueOf: undefined;
};

const toTimestamp = ({ _seconds, _nanoseconds }: TimestampType) =>
  new Timestamp(_seconds, _nanoseconds);

const toDate = (times: TimestampType) => dayjs(toTimestamp(times).toDate());

export const toMicroseconds = (times: TimestampType) => {
  // console.log('typeof Timestamp', toDate);
  return toDate(times).valueOf();
};
