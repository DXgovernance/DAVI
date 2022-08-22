import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import { BigNumber } from 'ethers';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import Avatar from 'components/Avatar';
import { useMemo } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { BiSend } from 'react-icons/bi';
import { MAINNET_ID, shortenAddress } from 'utils';
import { useTranslation } from 'react-i18next';

const ERC20TransferInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  compact,
  noAvatar,
}) => {
  const { t } = useTranslation();

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    return {
      tokenAddress: decodedCall.to,
      amount: BigNumber.from(decodedCall.args._value),
      source: decodedCall.from,
      destination: decodedCall.args._to as string,
    };
  }, [decodedCall]);

  const { data: tokenInfo } = useERC20Info(parsedData?.tokenAddress);
  const roundedBalance = useBigNumberToNumber(
    parsedData?.amount,
    tokenInfo?.decimals,
    4
  );
  const { ensName, imageUrl } = useENSAvatar(
    parsedData?.destination,
    MAINNET_ID
  );

  return (
    <>
      <Segment>
        <BiSend size={16} />
      </Segment>
      <Segment>
        {!compact ? t('transfer') : ''} {roundedBalance} {tokenInfo?.symbol}
      </Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      {noAvatar ? null : (
        <Segment>
          <Avatar
            defaultSeed={parsedData?.destination}
            src={imageUrl}
            size={compact ? 14 : 24}
          />
        </Segment>
      )}
      <Segment>
        {ensName ||
          (parsedData?.destination
            ? shortenAddress(parsedData?.destination, compact ? 2 : 4)
            : '')}
      </Segment>
    </>
  );
};

export default ERC20TransferInfoLine;
