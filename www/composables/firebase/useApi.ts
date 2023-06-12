import { httpsCallable } from 'firebase/functions';
import { useFunctions } from './useFunctions';

export const useApi = (endpoint: string) => {
  const { functions } = useFunctions();

  return { api: httpsCallable(functions, endpoint) };
}