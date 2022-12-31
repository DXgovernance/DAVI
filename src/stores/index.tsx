import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';
import { SHA256, enc } from 'crypto-js';
import { useMatch } from 'react-router-dom';
import { GovernanceInterface, HookStoreContextInterface } from './types';
import { governanceInterfaces } from './governanceInterfaces';

export const HookStoreContext = createContext<HookStoreContextInterface>(null);

export const HookStoreProvider = ({ children }) => {
  const urlParams = useMatch('/:chainName/:daoId/*');

  const [daoId, setDaoId] = useState(urlParams ? urlParams.params.daoId : null);
  const [daoBytecode, setDaoBytecode] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [useDefaultSource, setUseDefaultSource] = useState(true);
  const provider = useProvider();
  const CHECK_DATA_SOURCE_INTEVAL = 10000;

  useEffect(() => {
    if (urlParams?.params?.daoId) {
      setIsLoading(true);
      setDaoId(urlParams?.params?.daoId);
    }
  }, [urlParams?.params?.daoId, daoId]);

  useEffect(() => {
    const getBytecode = async () => {
      const localBtcode = localStorage.getItem(`hashed-bytecode-${daoId}`);
      if (!localBtcode) {
        const btcode = await provider.getCode(daoId);
        const hashedBytecode = `0x${SHA256(btcode).toString(enc.Hex)}`;
        setDaoBytecode(hashedBytecode);
        localStorage.setItem(`hashed-bytecode-${daoId}`, hashedBytecode);
        setIsLoading(false);
        return;
      }
      setDaoBytecode(localBtcode);
      setIsLoading(false);
    };

    getBytecode();
  }, [daoId, provider]);

  const governanceType: Omit<GovernanceInterface, 'hooksFallback'> =
    useMemo(() => {
      const match = governanceInterfaces.find(governance => {
        return governance.bytecodes.find(bytecode => bytecode === daoBytecode);
      });

      setIsLoading(false);

      if (match) {
        return {
          name: match.name,
          bytecodes: match.bytecodes,
          capabilities: match.capabilities,
          hooks: useDefaultSource ? match.hooks : match.hooksFallback,
          checkDataSourceAvailability: match.checkDataSourceAvailability,
        };
      } else {
        return {
          name: governanceInterfaces[0].name,
          bytecodes: governanceInterfaces[0].bytecodes,
          capabilities: governanceInterfaces[0].capabilities,
          hooks: useDefaultSource
            ? governanceInterfaces[0].hooks
            : governanceInterfaces[0].hooksFallback,
          checkDataSourceAvailability:
            governanceInterfaces[0].checkDataSourceAvailability,
        };
      }
    }, [daoBytecode, useDefaultSource]);

  // TODO: maybe implement states of the app. Instead of changing the boolean states everywhere, use a switch case

  useEffect(() => {
    if (isFetching) {
      setIsFetching(false);
      setIsLoading(false);
    }
  }, [isFetching]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (governanceType) {
        const isDefaultSourceAvailable =
          governanceType.checkDataSourceAvailability();
        if (useDefaultSource !== isDefaultSourceAvailable) {
          setIsLoading(true);
          setIsFetching(true);
          setUseDefaultSource(isDefaultSourceAvailable);
        }
      }
    }, CHECK_DATA_SOURCE_INTEVAL); // This implementation makes a data source health check every 10 seconds. This interval is arbitrary.

    return () => clearInterval(interval);
  }, [governanceType, useDefaultSource]);

  // TODO: Make a better loading screen

  return isLoading ? (
    <>Loading...</>
  ) : (
    <HookStoreContext.Provider value={{ ...governanceType, isLoading, daoId }}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);

// General TODOS
// TODO: port writer hooks
// TODO: port fetching hooks
// TODO: extract events from hooks (?)
// TODO: implement subgraph data fetching
// TODO: replace mentions of "guilds" for "dao" as is a more general term
