import { makeServer } from '../helper/makeServer';
import { HttpModule } from './http.module';

/**
 * HTTP Server
 */
export const initHttp = () => {
  return makeServer(HttpModule);
};
