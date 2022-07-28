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
  StyledSegmentLink,
} from './Summary.styled';
import { SummaryProps } from './types';
import { BiLinkExternal } from 'react-icons/bi';
import { getBlockExplorerUrl } from 'provider';

const Summary = ({ decodedCall, address }: SummaryProps) => {
  const { t } = useTranslation();
  const parsedValueToString = useBigNumberToString(decodedCall?.value, 18);
  const { ensName, imageUrl } = useENSAvatar(address, MAINNET_ID);
  const { chain } = useNetwork();
  const blockchainUrl = getBlockExplorerUrl(chain, address, 'address');
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
          <StyledSegmentLink
            href={blockchainUrl}
            target="_blank"
            rel="noopener"
          >
            {ensName || address}
            <BiLinkExternal />
          </StyledSegmentLink>
        </DetailBody>
      </DetailRow>
    </>
  );
};

export default Summary;
