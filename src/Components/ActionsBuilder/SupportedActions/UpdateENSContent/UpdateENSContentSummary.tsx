import {
  DetailBody,
  DetailHeader,
  DetailRow,
  StyledSegmentLink,
} from '../common/Summary.styled';
import Summary from '../common/Summary';
import { useUpdateEnsContent } from 'hooks/Guilds/guild/useUpdateEnsContent';
import { useEnsName, useNetwork } from 'wagmi';
import { convertToIpfsHash, getIpfsUrl, isValidChainId } from './utils';
import { useTranslation } from 'react-i18next';
import { ActionViewProps } from '..';
import useENSContentHash from 'hooks/Guilds/ens/useENSContentHash';
import { BiLinkExternal } from 'react-icons/bi';
import { getBlockExplorerUrl } from 'provider/chains';

const UpdateENSContentSummary: React.FC<ActionViewProps> = ({
  decodedCall,
}) => {
  const { t } = useTranslation();
  const { parsedData } = useUpdateEnsContent({ decodedCall });
  const { chain } = useNetwork();
  const chainId = isValidChainId(chain.id);
  const { data: ensName } = useEnsName({
    address: parsedData?.from,
    chainId,
  });
  const { ipfsHash: currentIpfsHash } = useENSContentHash(ensName, chainId);
  const currentIpfsUrl = getIpfsUrl(currentIpfsHash);
  const newIpfsHash = convertToIpfsHash(parsedData?.contentHash);
  const newIpfsUrl = getIpfsUrl(newIpfsHash);
  const blockExplorerUrl = getBlockExplorerUrl(
    chain,
    parsedData?.from,
    'address'
  );

  return (
    <>
      <DetailHeader>{t('ens.domain')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          <StyledSegmentLink
            href={blockExplorerUrl}
            target="_blank"
            rel="noopener"
          >
            {ensName || parsedData?.from}
            <BiLinkExternal />
          </StyledSegmentLink>
        </DetailBody>
      </DetailRow>
      <DetailHeader>{t('ens.currentContent')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          <StyledSegmentLink
            href={currentIpfsUrl || ''}
            target="_blank"
            rel="noopener"
          >
            {currentIpfsUrl || ''}
            <BiLinkExternal />
          </StyledSegmentLink>
        </DetailBody>
      </DetailRow>
      <DetailHeader>{t('ens.newContent')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          <StyledSegmentLink
            href={newIpfsUrl || ''}
            target="_blank"
            rel="noopener"
          >
            {newIpfsUrl || ''}
            <BiLinkExternal />
          </StyledSegmentLink>
        </DetailBody>
      </DetailRow>
      <Summary
        decodedCall={decodedCall}
        address={parsedData?.to}
        blockExplorerUrl={blockExplorerUrl}
      />
    </>
  );
};

export default UpdateENSContentSummary;
