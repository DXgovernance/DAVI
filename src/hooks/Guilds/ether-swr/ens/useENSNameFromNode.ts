import { useProvider } from 'wagmi';
import useEtherSWR from '../useEtherSWR';

export default function useENSNameFromNode(node: string) {
  const provider = useProvider();
  const { data: ensName } = useEtherSWR<string>(
    node ? ['resolveName', node] : [],
    {
      web3Provider: provider,
    }
  );

  return ensName;
}
