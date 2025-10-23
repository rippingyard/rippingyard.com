import dayjs from 'dayjs';

import { TimestampType, useDateObject } from './useDateObject';

export const useDate = (
  timestamp: TimestampType,
  format: string = 'YYYY-MM-DD HH:mm'
) => {
  const date = useDateObject(timestamp);
  return dayjs(date).format(format);
};
