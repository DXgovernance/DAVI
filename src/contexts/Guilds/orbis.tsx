import { createContext, useRef } from 'react';
import { Orbis } from '@orbisclub/orbis-sdk';

export const OrbisContext = createContext(null);

export const OrbisProvider = ({ children }) => {
  let orbis = useRef(new Orbis());

  debugger;

  return (
    <OrbisContext.Provider value={{ orbis }}>{children}</OrbisContext.Provider>
  );
};
