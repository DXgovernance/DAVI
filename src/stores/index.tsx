import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useProvider } from 'wagmi';
import { SHA256, enc } from 'crypto-js';
import { useMatch } from 'react-router-dom';
import { GovernanceInterface } from './types';
import { governanceInterfaces } from './governanceInterfaces';

interface HookStoreContextInterface extends GovernanceInterface {
  isLoading: boolean;
  daoId: string;
}

export const HookStoreContext = createContext<HookStoreContextInterface>(null);

export const HookStoreProvider = ({ children }) => {
  // TODO: Replace getting the daoId from the URL with some kind of setter/getter
  const urlParams = useMatch('/:chainName/:daoId/*');

  const [daoId, setDaoId] = useState(urlParams ? urlParams.params.daoId : '');
  useEffect(() => {
    setIsLoading(true);
    setDaoId(urlParams?.params?.daoId);
  }, [urlParams?.params?.daoId, daoId]);

  const [daoBytecode, setDaoBytecode] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const provider = useProvider();

  useEffect(() => {
    return () => setIsLoading(true);
  }, []);

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

  const governanceType: GovernanceInterface = useMemo(() => {
    const match = governanceInterfaces.find(governance => {
      return governance.bytecodes.find(bytecode => bytecode === daoBytecode);
    });

    return match ?? governanceInterfaces[0];
  }, [daoBytecode]);

  console.log({ ...governanceType, isLoading, daoId });

  return (
    <HookStoreContext.Provider value={{ ...governanceType, isLoading, daoId }}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);
