import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import { BigNumber } from 'ethers';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import Avatar from 'old-components/Guilds/Avatar';
import { useMemo } from 'react';
import { FiArrowRight, FiNavigation } from 'react-icons/fi';
import {
  getNetworkById,
  MAINNET_ID,
  shortenAddress,
  ZERO_ADDRESS,
} from 'utils';
import { useTranslation } from 'react-i18next';
import { useNetwork } from 'wagmi';

const ERC20TransferInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  compact,
}) => {
  const { t } = useTranslation();
  const { chain } = useNetwork();

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
        destination: decodedCall.to as string,
      };
    } else {
      return {
        tokenAddress: decodedCall.to,
        amount: BigNumber.from(decodedCall.args._value),
        source: decodedCall.from,
        destination: decodedCall.args._to as string,
      };
    }
  }, [decodedCall]);

  const { data: erc20TokenInfo } = useERC20Info(parsedData?.tokenAddress);
  const { nativeAsset } = getNetworkById(chain?.id);

  let [tokenSymbol, tokenDecimals] = useMemo(() => {
    if (erc20TokenInfo !== undefined) {
      return [erc20TokenInfo.symbol, erc20TokenInfo.decimals];
    } else {
      return [nativeAsset.symbol, nativeAsset.decimals];
    }
  }, [erc20TokenInfo, nativeAsset]);

  const roundedBalance = useBigNumberToNumber(
    parsedData?.amount,
    tokenDecimals,
    4
  );
  const { ensName, imageUrl } = useENSAvatar(
    parsedData?.destination,
    MAINNET_ID
  );

  return (
    <>
      <Segment>
        <FiNavigation size={16} />
      </Segment>
      <Segment>
        {!compact ? t('transfer') : ''} {roundedBalance} {tokenSymbol}
      </Segment>
      <Segment>
        <FiArrowRight />
      </Segment>
      <Segment>
        <Avatar
          defaultSeed={parsedData?.destination}
          src={imageUrl}
          size={compact ? 14 : 24}
        />
      </Segment>
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
