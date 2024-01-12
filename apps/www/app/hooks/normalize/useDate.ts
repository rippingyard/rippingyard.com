import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const useDate = (
  { seconds, nanoseconds }: { seconds: number; nanoseconds: number },
  format: string = 'YYYY-MM-DD HH:mm'
) => {
  const timestamp = new Timestamp(seconds, nanoseconds);
  return dayjs(timestamp.toDate()).format(format);
};
