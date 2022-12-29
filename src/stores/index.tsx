import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';
import { SHA256, enc } from 'crypto-js';
import { useMatch } from 'react-router-dom';
import { GovernanceInterface, HookStoreContextInterface } from './types';
import { governanceInterfaces } from './governanceInterfaces';

export const HookStoreContext = createContext<HookStoreContextInterface>(null);

export const HookStoreProvider = ({ children }) => {
  const urlParams = useMatch('/:chainName/:daoId/*');

  const [daoId, setDaoId] = useState(urlParams ? urlParams.params.daoId : '');
  useEffect(() => {
    setIsLoading(true);
    setDaoId(urlParams?.params?.daoId);
  }, [urlParams?.params?.daoId, daoId]);

  const [daoBytecode, setDaoBytecode] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [useDefaultSource, setUseDefaultSource] = useState(true);
  const provider = useProvider();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoId]);

  const governanceType: Omit<GovernanceInterface, 'hooksFallback'> =
    useMemo(() => {
      const match = governanceInterfaces.find(governance => {
        return governance.bytecodes.find(bytecode => bytecode === daoBytecode);
      });

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

      // return match ?? governanceInterfaces[0];
    }, [daoBytecode, useDefaultSource]);

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
    }, 10000);
    return () => clearInterval(interval);
  }, [governanceType, useDefaultSource]);

  console.log({ ...governanceType, isLoading, daoId });

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
