import { createContext } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

export interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

const ServerStyleContext = createContext<null | ServerStyleContextData[]>(null);

export default ServerStyleContext;
