import { useMemo } from 'react';
import { UpdateENSContentDecodedCall } from 'components/ActionsBuilder/SupportedActions/UpdateENSContent/types';

/**
 * @property {string} from Guild address
 * @property {string} to ENS resolver address
 * @property {string} node Namehash of the ENS name
 * @property {string} contentHash IPFS/CID hash
 * @property {object} optionalProps Props needed to update the ENS frontend content
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
