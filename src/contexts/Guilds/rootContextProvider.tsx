import React from 'react';
import { FilterProvider } from '.';
import { OrbisProvider } from './orbis';
import { VoteCartProvider } from './voteCart';

export const GuildsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FilterProvider>
      <OrbisProvider>
        <VoteCartProvider>{children}</VoteCartProvider>
      </OrbisProvider>
    </FilterProvider>
  );
};
