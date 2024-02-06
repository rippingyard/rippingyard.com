import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

type TimestampType = { seconds: number; nanoseconds: number };

const toTimestamp = ({ seconds, nanoseconds }: TimestampType) =>
  new Timestamp(seconds, nanoseconds);

const toDate = (times: TimestampType) => dayjs(toTimestamp(times).toDate());

export const toMicroseconds = (times: TimestampType) => toDate(times).valueOf();
