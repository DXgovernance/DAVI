import { useContractRead, useEnsResolver } from 'wagmi';
import ensResolverABI from 'abis/ENSPublicResolver.json';
import {
  convertToIpfsHash,
  convertToNameHash,
} from 'Components/ActionsBuilder/SupportedActions/UpdateENSContent/utils';

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
    select(data) {
      return convertToIpfsHash(data.toString());
    },
  });
  return {
    ipfsHash: data?.toString(),
  };
}
