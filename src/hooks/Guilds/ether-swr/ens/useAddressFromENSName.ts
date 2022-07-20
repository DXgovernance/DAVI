import { useProvider } from 'wagmi';
import useEtherSWR from '../useEtherSWR';

export default function useAddressFromENSName(
  ensName: string,
  chainId?: number
) {
  const provider = useProvider();
  const { data: ensAddress } = useEtherSWR<string>(
    ensName ? ['resolveName', ensName] : [],
    {
      web3Provider: provider,
    }
  );

  return ensAddress;
}
