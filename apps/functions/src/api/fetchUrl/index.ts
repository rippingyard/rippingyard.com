import { makeServer } from '../../helper/makeServer';
import { FetchUrlModule } from './fetchUrl.module';

/**
 * api/fetchUrl
 */
export const initFetchUrl = () => {
  return makeServer(FetchUrlModule);
};
