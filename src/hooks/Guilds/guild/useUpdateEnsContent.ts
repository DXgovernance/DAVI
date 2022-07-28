import { useMemo } from 'react';
import { UpdateENSContentDecodedCall } from 'Components/ActionsBuilder/SupportedActions/UpdateENSContent/types';

/*
  @from: Guild address
  @to ENS resolver address
  @node: Namehash of the ENS name 
  @contentHash: IPFS/CID hash
  @optionalProps: Props needed to update the ENS frontend content
  */

export const useUpdateEnsContent = ({
  decodedCall,
}): { parsedData: UpdateENSContentDecodedCall } | null => {
  const parsedData = useMemo<UpdateENSContentDecodedCall>(() => {
    if (!decodedCall) return null;
    return {
      from: decodedCall.from,
      to: decodedCall.to,
      node: decodedCall.args.node,
      contentHash: decodedCall.args.hash,
      optionalProps: {
        ensName: decodedCall.optionalProps.ensName,
        ipfsHash: decodedCall.optionalProps.ipfsHash,
      },
    };
  }, [decodedCall]);

  return {
    parsedData,
  };
};
