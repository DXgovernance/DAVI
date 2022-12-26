import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GovernanceInterface } from './types';
import { useMatch } from 'react-router-dom';
import { useProvider } from 'wagmi';
import { SHA256, enc } from 'crypto-js';
import { governanceInterfaces } from './governanceInterfaces';

export const HookStoreContext = createContext<GovernanceInterface>(null);

export const HookStoreProvider = ({ children }) => {
  ///////////////////////////////

  // TODO: Replace getting the daoId from the URL with some kind of setter/getter
  const urlParams = useMatch('/:chainName/:daoId/*');
  const daoId = useMemo(
    () => (urlParams ? urlParams.params.daoId : ''),
    [urlParams]
  );

  // TODO: make localhost boolean
  // const { chain } = useNetwork();
  // const isLocalhost = useMemo(() => chain?.id === LOCALHOST_ID, [chain]);

  const [daoBytecode, setDaoBytecode] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const provider = useProvider();

  useEffect(() => {
    const getBytecode = async () => {
      const localBtcode = localStorage.getItem(`hashed-bytecode-${daoId}`);
      if (!localBtcode) {
        const btcode = await provider.getCode(daoId);
        const hashedBytecode = `0x${SHA256(btcode).toString(enc.Hex)}`;
        setDaoBytecode(hashedBytecode);
        localStorage.setItem(`hashed-bytecode-${daoId}`, hashedBytecode);
        setLoaded(true);
        return;
      }
      setDaoBytecode(localBtcode);
      setLoaded(true);
    };
    getBytecode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoId]);

  const governanceType: GovernanceInterface = useMemo(() => {
    // TODO: make prod and local ternary
    // const match = (
    //   isLocalhost ? deployedHashedBytecodesLocal : deployedHashedBytecodes
    // ).find(({ bytecode_hash }) => daoBytecode === bytecode_hash);
    const match = governanceInterfaces.find(governance => {
      return governance.bytecode === daoBytecode;
    });

    return match ?? governanceInterfaces[0]; // default to IERC20Dao
  }, [daoBytecode]);

  // TODO: handle loading state
  console.log(loaded);

  ///////////////////////////////

  return (
    <HookStoreContext.Provider value={governanceType}>
      {children}
    </HookStoreContext.Provider>
  );
};

export const useHookStoreProvider = () => useContext(HookStoreContext);
