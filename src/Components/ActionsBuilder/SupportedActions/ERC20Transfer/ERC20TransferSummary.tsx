import { ActionViewProps } from '..';
import { Segment } from '../common/infoLine';
import { DetailBody, DetailHeader, DetailRow } from '../common/summary';
import { BigNumber } from 'ethers';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import Avatar from 'old-components/Guilds/Avatar';
import { useMemo } from 'react';
import { MAINNET_ID } from 'utils';
import { useTranslation } from 'react-i18next';

const ERC20TransferSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { t } = useTranslation();

  const parsedData = useMemo(() => {
    if (!decodedCall) return null;

    return {
      tokenAddress: decodedCall.to,
      amount: BigNumber.from(decodedCall.args._value),
      source: decodedCall.from,
      destination: decodedCall.args._to,
    };
  }, [decodedCall]);

  const { ensName, imageUrl } = useENSAvatar(
    parsedData?.destination,
    MAINNET_ID
  );

  return (
    <>
      <DetailHeader>{t('interactWith')}:</DetailHeader>

      <DetailRow>
        <DetailBody>
          <Segment>
            <Avatar
              defaultSeed={parsedData?.destination}
              src={imageUrl}
              size={24}
            />
          </Segment>
          <Segment>{ensName || parsedData?.destination}</Segment>
        </DetailBody>
      </DetailRow>
    </>
  );
};

export default ERC20TransferSummary;
