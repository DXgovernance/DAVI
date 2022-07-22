import { DetailBody, DetailHeader, DetailRow } from '../common/Summary.styled';
import { StyledSegmentLink } from './styles';
import Summary from '../common/Summary';
import { useUpdateEnsName } from 'hooks/Guilds/guild/useUpdateEnsName';
import { useEnsName, useNetwork } from 'wagmi';
import { convertToIPFSHash, getIpfsUrl, isValidChainId } from './utils';
import { useTranslation } from 'react-i18next';
import { ActionViewProps } from '..';
import useENSContentHash from 'hooks/Guilds/ens/useENSContentHash';
import { BiLinkExternal } from 'react-icons/bi';

const UpdateENSNameSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { t } = useTranslation();
  const { parsedData } = useUpdateEnsName({ decodedCall });
  const { chain } = useNetwork();
  const chainId = isValidChainId(chain.id);
  const { data: ensName } = useEnsName({
    address: '0xC5B20AdE9c9Cd5e0CC087C62b26B815A4bc1881f',
    chainId,
  });
  const { ipfsHash: currentIpfsHash } = useENSContentHash(ensName, chainId);
  const currentIpfsUrl = getIpfsUrl(currentIpfsHash);
  const newIpfsHash = convertToIPFSHash(parsedData?.contentHash);
  const newIpfsUrl = getIpfsUrl(newIpfsHash);

  return (
    <>
      <DetailHeader>{t('ensName.domain')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          <StyledSegmentLink
            href="https://github.com/styled-components/styled-components"
            target="_blank"
            rel="noopener"
          >
            {ensName || parsedData?.from}
            <BiLinkExternal />
          </StyledSegmentLink>
        </DetailBody>
      </DetailRow>
      <DetailHeader>{t('ensName.currentContent')}</DetailHeader>
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
      <DetailHeader>{t('ensName.newContent')}</DetailHeader>
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
      <Summary decodedCall={decodedCall} address={parsedData?.to} />
    </>
  );
};

export default UpdateENSNameSummary;
