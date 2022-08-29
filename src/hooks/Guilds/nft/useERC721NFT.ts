import { resolveUri } from 'utils/url';
import ERC721ABI from 'abis/ERC721.json';
import { useContractReads } from 'wagmi';

export default function useERC721NFT(
  contractId: string,
  tokenId: string,
  chainId?: number
) {
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        addressOrName: contractId,
        contractInterface: ERC721ABI,
        functionName: 'ownerOf',
        args: [tokenId],
      },
      {
        addressOrName: contractId,
        contractInterface: ERC721ABI,
        functionName: 'tokenURI',
        args: [tokenId],
      },
    ],
  });

  if (!data || data.every(v => v === null))
    return { data: undefined, isError, isLoading };
  const [ownerOf, tokenURI] = data;
  const resolvedTokenUri = resolveUri(tokenURI?.toString());

  return {
    ownerAddress: ownerOf?.toString(),
    resolvedTokenUri,
    isError,
    isLoading,
  };
}
