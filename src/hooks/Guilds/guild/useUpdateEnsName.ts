import { useMemo } from 'react';

interface ContentHashNameState {
  to: string;
  node: string;
  contentHash: string;
}

export const useUpdateEnsName = ({ decodedCall }) => {
  const parsedData = useMemo<ContentHashNameState>(() => {
    if (!decodedCall) return null;
    return {
      to: decodedCall.to,
      node: decodedCall.args.node,
      contentHash: decodedCall.args.hash,
    };
  }, [decodedCall]);

  return {
    parsedData,
  };
};
