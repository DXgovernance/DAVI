import { useMemo } from 'react';
import { UpdateENSContentDecodedCall } from 'Components/ActionsBuilder/SupportedActions/UpdateENSContent/types';

/*
  @from: Guild address
  @to ENS resolver address
  @node: Namehash of the ENS name 
  @contentHash: IPFS/CID hash
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
    };
  }, [decodedCall]);

  return {
    parsedData,
  };
};
