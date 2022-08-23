import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import Avatar from 'components/Avatar';
import { useMemo } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { BiSend } from 'react-icons/bi';
import { MAINNET_ID, shortenAddress } from 'utils';
import { useTranslation } from 'react-i18next';
import { SupportedAction } from 'components/ActionsBuilder/types';
import { TokenType, useTokenList } from 'hooks/Guilds/tokens/useTokenList';
import { useNetwork } from 'wagmi';

const ERC20TransferInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  compact,
  noAvatar,
}) => {
  const { t } = useTranslation();

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

  const roundedBalance = useBigNumberToNumber(
    parsedData?.amount,
    parsedData?.token?.decimals,
    4
  );
  const { ensName, imageUrl } = useENSAvatar(
    parsedData?.recipientAddress,
    MAINNET_ID
  );

  return (
    <>
      <Segment>
        <BiSend size={16} />
      </Segment>
      <Segment>
        {!compact ? t('transfer') : ''} {roundedBalance}{' '}
        {parsedData?.token?.symbol}
      </Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      {noAvatar ? null : (
        <Segment>
          <Avatar
            defaultSeed={parsedData?.recipientAddress}
            src={imageUrl}
            size={compact ? 14 : 24}
          />
        </Segment>
      )}
      <Segment>
        {ensName ||
          (parsedData?.recipientAddress
            ? shortenAddress(parsedData?.recipientAddress, compact ? 2 : 4)
            : '')}
      </Segment>
    </>
  );
};

export default ERC20TransferInfoLine;
