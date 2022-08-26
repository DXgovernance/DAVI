import { useProvider, useNetwork, chainId as chains } from 'wagmi';
import useEtherSWR from '../useEtherSWR';

export default function useENSNameFromAddress(
  ensAddress?: string,
  chainId?: number
) {
  const provider = useProvider();
  const { chain } = useNetwork();
  const isLocalChain = chain?.id === chains.localhost;

  const { data: ensName } = useEtherSWR<string>(
    // localhost network does not support ENS. This is a temp fix to avoid multiple errors on localhost.
    // TODO: Find a way to make this work in localhost without throwing multiple errors
    ensAddress && !isLocalChain ? ['lookupAddress', ensAddress] : [],
    {
      web3Provider: provider,
    }
  );

  return ensName;
}
