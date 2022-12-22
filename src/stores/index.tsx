import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GovernanceInterface } from './types';
import { useMatch } from 'react-router-dom';
import { useProvider } from 'wagmi';
import { SHA256, enc } from 'crypto-js';
import { governanceInterfaces } from './governanceInterfaces';

export const HookStoreContext = createContext<GovernanceInterface>(null);

export const HookStoreProvider = ({ children }) => {
  ///////////////////////////////

  const urlParams = useMatch('/:chainName/:guildId/*');
  const guildAddress = useMemo(
    () => (urlParams ? urlParams.params.guildId : ''),
    [urlParams]
  );

  // TODO: make localhost boolean
  // const { chain } = useNetwork();
  // const isLocalhost = useMemo(() => chain?.id === LOCALHOST_ID, [chain]);

  const [guildBytecode, setGuildBytecode] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const provider = useProvider();

  useEffect(() => {
    const getBytecode = async () => {
      const localBtcode = localStorage.getItem(
        `hashed-bytecode-${guildAddress}`
      );
      if (!localBtcode) {
        const btcode = await provider.getCode(guildAddress);
        const hashedBytecode = `0x${SHA256(btcode).toString(enc.Hex)}`;
        setGuildBytecode(hashedBytecode);
        localStorage.setItem(`hashed-bytecode-${guildAddress}`, hashedBytecode);
        setLoaded(true);
        return;
      }
      setGuildBytecode(localBtcode);
      setLoaded(true);
    };
    getBytecode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildAddress]);

  const governanceType: GovernanceInterface = useMemo(() => {
    // TODO: make prod and local ternary
    // const match = (
    //   isLocalhost ? deployedHashedBytecodesLocal : deployedHashedBytecodes
    // ).find(({ bytecode_hash }) => guildBytecode === bytecode_hash);
    const match = governanceInterfaces.find(governance => {
      return governance.bytecode === guildBytecode;
    });

    return match ?? governanceInterfaces[0]; // default to IERC20Guild
  }, [guildBytecode]);

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
