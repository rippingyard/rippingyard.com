import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';
import { useFirebase } from '../firebase/useFirebase';
import axios from 'axios';
import { useQuery, isServer } from "@tanstack/vue-query";
import { useDefaultValue } from '../firestore/useDefaultValue';
import { Seed } from '~~/schemas/seed';

export const getSeeds = async () => {
  const { fb } = useFirebase();
  const pathref = storageRef(getStorage(fb), 'seeds/seeds.json');
  const url = await getDownloadURL(pathref);
  const res = await axios.get(url);
  const Seeds = res.data;
  return Seeds.reverse();
};

export const useSeeds = () => {
  if (isServer) return useDefaultValue<Seed[]>();

  return useQuery({
    queryKey: ['seeds', 'all'],
    queryFn: () => getSeeds()
  })
};