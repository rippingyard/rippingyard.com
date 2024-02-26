import { createContext } from '.pnpm/@types+react@18.2.47/node_modules/@types/react';

export interface ClientStyleContextData {
  reset: () => void;
}

const ClientStyleContext = createContext<ClientStyleContextData>({
  reset: () => {},
});

export default ClientStyleContext;
