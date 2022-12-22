import { createContext, useContext } from 'react';
import { SupportedABIs } from './types';
import { snapshotGuildImplementation } from './modules/SnapshotERC20Guild';
import { HooksInterface } from './types';

export const HookStoreContext = createContext<HooksInterface>(null);

export const HookStoreProvider = ({ children }) => {
  // TODO: logic to select governance implementation
  const governanceType: SupportedABIs = 'SnapshotERC20Guild';
  // TODO: types for governanceFunctions
  let governanceFunctions;
  // let governanceFunctions = {
  //   useProposal: useProposal,
  // };

  switch (governanceType) {
    case 'SnapshotERC20Guild':
      governanceFunctions = snapshotGuildImplementation;
      break;
    default:
      governanceFunctions = snapshotGuildImplementation;
      break;
  }

  return (
    <HookStoreContext.Provider value={governanceFunctions}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);
