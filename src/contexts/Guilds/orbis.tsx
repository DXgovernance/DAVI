import { createContext } from 'react';
import { Orbis } from '@orbisclub/orbis-sdk';

export const OrbisContext = createContext(null);

export const OrbisProvider = ({ children }) => {
  const orbis = new Orbis();

  return (
    <OrbisContext.Provider value={{ orbis }}>{children}</OrbisContext.Provider>
  );
};
