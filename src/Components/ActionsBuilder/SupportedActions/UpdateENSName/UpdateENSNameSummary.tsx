import { DetailBody, DetailHeader, DetailRow } from '../common/Summary.styled';
import { Segment } from '../common/infoLine';
import Summary from '../common/Summary';
import { useUpdateEnsName } from 'hooks/Guilds/guild/useUpdateEnsName';
import { useNetwork } from 'wagmi';
import { isValidChainId } from './utils';
import useENSNameFromAddress from 'hooks/Guilds/ether-swr/ens/useENSNameFromAddress';
import { convertToIPFSHash } from './utils';
import { useTranslation } from 'react-i18next';
import { ActionViewProps } from '..';

const UpdateENSNameSummary: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { t } = useTranslation();
  const { parsedData } = useUpdateEnsName({ decodedCall });

  const { chain } = useNetwork();
  const chainId = isValidChainId(chain.id);
  const ensName = useENSNameFromAddress(parsedData?.from, chainId);
  const ipfsHash = convertToIPFSHash(parsedData?.contentHash);
  const ipfsRoot = 'ipfs://';

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
          <Segment>{`${ipfsRoot}${ipfsHash}` || ''}</Segment>
        </DetailBody>
      </DetailRow>
      <DetailHeader>{t('ensName.newContent')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          <Segment>{`${ipfsRoot}${ipfsHash}` || ''}</Segment>
        </DetailBody>
      </DetailRow>
      <Summary decodedCall={decodedCall} address={parsedData?.to} />
    </>
  );
};

export default UpdateENSNameSummary;

// kenny.eth --> 0x0000000000000000000000000000000000000000

// nameHash/node --> kenny.eth

// address --> ANY_ADDRESS

// resolverAdress --> ANY_OTHER_ADDRESS

// contentHash --> ANY_HASH

// QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4
