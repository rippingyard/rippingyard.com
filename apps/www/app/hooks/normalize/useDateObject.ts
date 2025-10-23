import { Timestamp } from 'firebase/firestore';

export type TimestampType = { _seconds: number; _nanoseconds: number };

export const useDateObject = ({ _seconds, _nanoseconds }: TimestampType) => {
  const timestamp = new Timestamp(_seconds, _nanoseconds);
  return timestamp.toDate();
};
