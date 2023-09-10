import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';
import { useFirebase } from '../firebase/useFirebase';
import axios from 'axios';
import { Seed } from '~~/schemas/seed';

export const getSeeds = async (): Promise<Seed[]> => {
  console.log('get all seeds');
  const { fb } = useFirebase();
  const pathref = storageRef(getStorage(fb), 'seeds/seeds.json');
  const url = await getDownloadURL(pathref);
  const res = await axios.get(url);
  const Seeds = res.data;
  return Seeds.reverse();
};

export const useSeeds = () => {
  return useAsyncData<Seed[]>('seeds-all', () => getSeeds(), { server: false });
};