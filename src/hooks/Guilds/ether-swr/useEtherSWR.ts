import useEtherSWRHook, {
  etherKeyFuncInterface,
  ethKeyInterface,
  ethKeysInterface,
  EthSWRConfigInterface,
} from 'ether-swr';
import { useEffect } from 'react';
import { SWRResponse, Fetcher } from 'swr';
import { useNetwork } from 'wagmi';
import { usePrevious } from '../usePrevious';

function useEtherSWR<Data = any, Error = any>(
  key: ethKeyInterface | ethKeysInterface | etherKeyFuncInterface
): SWRResponse<Data, Error>;
function useEtherSWR<Data = any, Error = any>(
  key: ethKeyInterface | ethKeysInterface | etherKeyFuncInterface,
  config?: EthSWRConfigInterface<Data, Error>
): SWRResponse<Data, Error>;
function useEtherSWR<Data = any, Error = any>(
  key: ethKeyInterface | ethKeysInterface | etherKeyFuncInterface,
  fetcher?: Fetcher<Data>,
  config?: EthSWRConfigInterface<Data, Error>
): SWRResponse<Data, Error>;
function useEtherSWR<Data = any, Error = any>(
  ...args: any[]
): SWRResponse<Data, Error> {
  // @ts-ignore - TS gets confused here about the number of args
  const swrResponse = useEtherSWRHook<Data, Error>(...args);
  const { chain } = useNetwork();

  const prevChainId = usePrevious(chain?.id);
  useEffect(() => {
    if (prevChainId && chain?.id !== prevChainId) {
      swrResponse.mutate(null);
    }
  }, [chain?.id, prevChainId, swrResponse]);

  return swrResponse;
}

export default useEtherSWR;
