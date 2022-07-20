import { useMemo } from 'react';

interface ContentHashNameState {
  node: string;
  contentHash: string;
}

export const useSetContentHash = ({ decodedCall }) => {
  const parsedData = useMemo<ContentHashNameState>(() => {
    if (!decodedCall) return null;
    return {
      node: decodedCall.args.node,
      contentHash: decodedCall.args.hash,
    };
  }, [decodedCall]);

  return {
    parsedData,
  };
};
