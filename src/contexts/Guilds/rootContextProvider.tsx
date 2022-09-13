import React from 'react';
import { FilterProvider } from '.';
import { OrbisProvider } from './orbis';

export const GuildsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FilterProvider>
      <OrbisProvider>{children}</OrbisProvider>
    </FilterProvider>
  );
};
