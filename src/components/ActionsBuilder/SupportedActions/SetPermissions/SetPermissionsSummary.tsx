import { ActionViewProps } from '..';
import { ParsedDataInterface } from './types';
import { useMemo } from 'react';
import Summary from '../common/Summary';

const SetPermissionsSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const parsedData = useMemo<ParsedDataInterface>(() => {
    if (!decodedCall) return null;

    const { functionName } = decodedCall;
    const { asset, to, functionSignature, valueAllowed, allowance } =
      decodedCall.args;
    return {
      asset,
      to,
      functionSignature,
      valueAllowed,
      allowance,
      functionName,
    };
  }, [decodedCall]);

  return (
    <>
      <Summary decodedCall={decodedCall} address={parsedData?.to[0]} />
    </>
  );
};

export default SetPermissionsSummary;
