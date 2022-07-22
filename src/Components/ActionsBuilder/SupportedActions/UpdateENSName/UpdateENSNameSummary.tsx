import { DetailBody, DetailHeader, DetailRow } from '../common/Summary.styled';
import { Segment } from '../common/infoLine';
import Summary from '../common/Summary';
import { useUpdateEnsName } from 'hooks/Guilds/guild/useUpdateEnsName';
import { useEnsName, useNetwork } from 'wagmi';
import { convertToIPFSHash, getIpfsUrl, isValidChainId } from './utils';
import { useTranslation } from 'react-i18next';
import { ActionViewProps } from '..';
import useENSContentHash from 'hooks/Guilds/ens/useENSContentHash';

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
          <Segment>{ensName || parsedData?.from}</Segment>
        </DetailBody>
      </DetailRow>
      <DetailHeader>{t('ensName.currentContent')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          <Segment>{currentIpfsUrl || ''}</Segment>
        </DetailBody>
      </DetailRow>
      <DetailHeader>{t('ensName.newContent')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          <Segment>{newIpfsUrl || ''}</Segment>
        </DetailBody>
      </DetailRow>
      <Summary decodedCall={decodedCall} address={parsedData?.to} />
    </>
  );
};

export default UpdateENSNameSummary;
