import { ActionViewProps } from '..';
import Summary from '../common/Summary';
import { SupportedAction } from 'Components/ActionsBuilder/types';
import { useNetwork } from 'wagmi';
import { TokenType, useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useMemo } from 'react';

const ERC20TransferSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { chain } = useNetwork();
  const { tokens } = useTokenList(chain?.id, true);

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    if (decodedCall.callType === SupportedAction.ERC20_TRANSFER) {
      const token = tokens.find(token => token.address === decodedCall.to);
      return {
        source: decodedCall.from,
        token,
        amount: decodedCall.args._value,
        recipientAddress: decodedCall.args._to,
      };
    } else if (decodedCall.callType === SupportedAction.NATIVE_TRANSFER) {
      const token = tokens.find(token => token.type === TokenType.NATIVE);
      return {
        source: decodedCall.from,
        token,
        amount: decodedCall.value,
        recipientAddress: decodedCall.to,
      };
    } else {
      return null;
    }
  }, [decodedCall, tokens]);

  return (
    <>
      <Summary
        decodedCall={decodedCall}
        address={parsedData?.recipientAddress}
      />
    </>
  );
};

export default ERC20TransferSummary;
