import { ActionViewProps } from '..';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import Summary from '../common/Summary';
import { ZERO_ADDRESS } from 'utils';

const ERC20TransferSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    const isNativeToken =
      decodedCall.value !== null && decodedCall.value._hex !== '0x00'
        ? true
        : false;

    if (isNativeToken) {
      return {
        tokenAddress: ZERO_ADDRESS,
        amount: BigNumber.from(decodedCall.value),
        source: decodedCall.from,
        destination: decodedCall.to,
      };
    } else {
      return {
        tokenAddress: decodedCall.to,
        amount: BigNumber.from(decodedCall.args._value),
        source: decodedCall.from,
        destination: decodedCall.args._to,
      };
    }
  }, [decodedCall]);

  return (
    <>
      <Summary decodedCall={decodedCall} address={parsedData?.destination} />
    </>
  );
};

export default ERC20TransferSummary;
