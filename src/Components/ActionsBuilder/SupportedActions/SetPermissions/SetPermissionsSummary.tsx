import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import { DetailCell, DetailHeader, DetailRow } from '../common/summary';
import Avatar from 'old-components/Guilds/Avatar';
import { ParsedDataInterface } from './types';
import { useMemo } from 'react';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import { MAINNET_ID, shortenAddress } from 'utils';
import { useERC20Info } from 'hooks/Guilds/ether-swr/erc20/useERC20Info';
import useBigNumberToNumber from 'hooks/Guilds/conversions/useBigNumberToNumber';
import { useTranslation } from 'react-i18next';

// TODO: What is the best way to display the information?

const SetPermissionsSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { t } = useTranslation();

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

  const { data: tokenInfo } = useERC20Info(parsedData?.asset[0]);
  const roundedBalance = useBigNumberToNumber(
    parsedData?.valueAllowed[0],
    tokenInfo?.decimals,
    4
  );

  const { ensName, imageUrl } = useENSAvatar(parsedData?.to[0], MAINNET_ID);

  return (
    <>
      <DetailHeader>
        <DetailCell>{t('receiver')}</DetailCell>
        <DetailCell>{t('amount')}</DetailCell>
      </DetailHeader>

      <DetailRow>
        <DetailCell>
          <Segment>
            <Avatar defaultSeed={parsedData?.to[0]} src={imageUrl} size={24} />
          </Segment>
          <Segment>{ensName || shortenAddress(parsedData?.to[0])}</Segment>
        </DetailCell>
        <DetailCell>
          {roundedBalance} {tokenInfo?.symbol}
        </DetailCell>
      </DetailRow>
    </>
  );
};

export default SetPermissionsSummary;
