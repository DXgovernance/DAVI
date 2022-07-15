import { ActionViewProps } from '..';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import Summary from '../common/Summary';

const ERC20TransferSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  console.log(decodedCall);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    return {
      tokenAddress: decodedCall.to,
      amount: BigNumber.from(decodedCall.args._value),
      source: decodedCall.from,
      destination: decodedCall.args._to,
    };
  }, [decodedCall]);

  return (
    <>
      <Summary decodedCall={decodedCall} address={parsedData?.destination} />
    </>
  );
};

export default ERC20TransferSummary;
