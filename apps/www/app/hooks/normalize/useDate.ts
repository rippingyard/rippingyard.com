import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export type TimestampType = { _seconds: number; _nanoseconds: number };

export const useDate = (
  { _seconds, _nanoseconds }: TimestampType,
  format: string = 'YYYY-MM-DD HH:mm'
) => {
  const timestamp = new Timestamp(_seconds, _nanoseconds);
  return dayjs(timestamp.toDate()).format(format);
};
