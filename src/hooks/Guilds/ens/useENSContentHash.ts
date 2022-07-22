import { useContractRead, useEnsResolver } from 'wagmi';
import ensResolverABI from 'abis/ENSPublicResolver.json';
import {
  convertToIPFSHash,
  convertToNameHash,
} from 'Components/ActionsBuilder/SupportedActions/UpdateENSName/utils';

interface ENSContentHashData {
  ipfsHash?: string;
}

export default function useENSContentHash(
  ensName: string,
  chainId?: number
): ENSContentHashData {
  const { data: resolver } = useEnsResolver({ name: ensName, chainId });
  const { data } = useContractRead({
    addressOrName: resolver?.address,
    contractInterface: ensResolverABI,
    functionName: 'contenthash',
    args: convertToNameHash(ensName),
    enabled: !!ensName && !!resolver,
    select(data) {
      return convertToIPFSHash(data.toString());
    },
  });
  return {
    ipfsHash: data.toString(),
  };
}
