import useBigNumberToString from 'hooks/Guilds/conversions/useBigNumberToString';
import useENSAvatar from 'hooks/Guilds/ether-swr/ens/useENSAvatar';
import Avatar from 'components/Avatar';
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

const Summary = ({ decodedCall, blockExplorerUrl }: SummaryProps) => {
  const { t } = useTranslation();
  const parsedValueToString = useBigNumberToString(decodedCall?.value, 18);
  const { ensName, imageUrl } = useENSAvatar(decodedCall.to, MAINNET_ID);
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
            <Avatar defaultSeed={decodedCall.to} src={imageUrl} size={24} />
          </Segment>
          <StyledSegmentLink
            href={blockExplorerUrl}
            target="_blank"
            rel="noopener"
          >
            {ensName || decodedCall.to}
            <BiLinkExternal />
          </StyledSegmentLink>
        </DetailBody>
      </DetailRow>
    </>
  );
};

export default Summary;
