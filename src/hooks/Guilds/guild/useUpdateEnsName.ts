import { useMemo } from 'react';

interface ParsedEnsNameState {
  from: string;
  to: string;
  node: string;
  contentHash: string;
}

export const useUpdateEnsName = ({ decodedCall }) => {
  const parsedData = useMemo<ParsedEnsNameState>(() => {
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
