import React from 'react';
import { FilterProvider } from '.';
import { OrbisProvider } from './orbis';
import { HookStoreProvider } from 'stores';

export const GuildsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <HookStoreProvider>
      <FilterProvider>
        <OrbisProvider>{children}</OrbisProvider>
      </FilterProvider>
    </HookStoreProvider>
  );
};
