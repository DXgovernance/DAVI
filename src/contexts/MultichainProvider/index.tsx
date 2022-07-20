import { JsonRpcProvider } from '@ethersproject/providers';
import { createContext, useMemo } from 'react';
import { useNetwork } from 'wagmi';

interface MultichainContextInterface {
  providers: Record<number, JsonRpcProvider>;
}

export const MultichainContext =
  createContext<MultichainContextInterface>(null);

const MultichainProvider = ({ children }) => {
  const { chains } = useNetwork();

  const providers = useMemo(() => {
    return chains.reduce((acc, chain) => {
      acc[chain.id] = new JsonRpcProvider(chain.rpcUrls.default);
      return acc;
    }, {} as Record<number, JsonRpcProvider>);
  }, [chains]);

  return (
    <MultichainContext.Provider value={{ providers }}>
      {children}
    </MultichainContext.Provider>
  );
};

export default MultichainProvider;
