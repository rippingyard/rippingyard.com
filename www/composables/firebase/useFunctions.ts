import { getFunctions } from 'firebase/functions';
import { useFirebase } from './useFirebase';

export const useFunctions = () => {
  const { fb } = useFirebase();

  return { functions: getFunctions(fb) };
}