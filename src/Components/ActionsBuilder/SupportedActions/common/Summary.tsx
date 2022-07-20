import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import Avatar from 'old-components/Guilds/Avatar';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getNetworkById, MAINNET_ID } from 'utils';
import { useNetwork } from 'wagmi';
import { Segment } from './infoLine';
import {
  DetailBody,
  DetailHeader,
  DetailRow,
  RedHighlight,
} from './Summary.styled';

const Summary = ({ decodedCall, address }) => {
  const { t } = useTranslation();
  const parsedValueToString = useBigNumberToString(decodedCall?.value, 18);
  const { ensName, imageUrl } = useENSAvatar(address, MAINNET_ID);
  const { chain } = useNetwork();

  const nativeTokenSymbol = useMemo(() => {
    return getNetworkById(chain?.id).nativeAsset.symbol;
  }, [chain]);

  return (
    <>
      <DetailHeader>
        {t('interactWith')}
        {parsedValueToString !== '0.0' && (
          <RedHighlight>
            {' '}
            {parsedValueToString} {nativeTokenSymbol}
          </RedHighlight>
        )}
        :
      </DetailHeader>

      <DetailRow>
        <DetailBody>
          <Segment>
            <Avatar defaultSeed={address} src={imageUrl} size={24} />
          </Segment>
          <Segment>{ensName || address}</Segment>
        </DetailBody>
      </DetailRow>
    </>
  );
};

export default Summary;
