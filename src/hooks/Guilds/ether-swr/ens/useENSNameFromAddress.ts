import { useProvider } from 'wagmi';
import useEtherSWR from '../useEtherSWR';

export default function useENSNameFromAddress(
  ensAddress?: string,
  chainId?: number
) {
  const provider = useProvider();
  const { data: ensName } = useEtherSWR<string>(
    ensAddress ? ['lookupAddress', ensAddress] : [],
    {
      web3Provider: provider,
    }
  );

  return ensName;
}
