import { getDownloadURL as u } from 'firebase/storage';

import { useStorageRef as r } from '../firebase/useStorageRef';

export const useDownloadURL = async (p: string): Promise<string> =>
  await u(r(p));
