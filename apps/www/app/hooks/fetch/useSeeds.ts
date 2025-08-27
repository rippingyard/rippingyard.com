import axios from 'axios';

import type { Seed } from '@rippingyard/schemas';

import { useDownloadURL } from '../firebase/useDownloadURL';

export const useSeeds = async (): Promise<Seed[]> => {
  const url = await useDownloadURL('seeds/seeds.json');
  const res = await axios.get(url);
  const Seeds = res.data;
  return Seeds.reverse();
};
