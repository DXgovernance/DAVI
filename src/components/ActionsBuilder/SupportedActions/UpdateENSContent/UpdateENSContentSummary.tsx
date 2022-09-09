import { diffLines } from 'diff';
import {
  DetailBody,
  DetailHeader,
  DetailRow,
  StyledSegmentLink,
} from '../common/Summary.styled';
import Summary from '../common/Summary';
import { useUpdateEnsContent } from 'hooks/Guilds/useUpdateEnsContent';
import { useEnsName, useNetwork } from 'wagmi';
import { convertToIpfsHash, getIpfsUrl, isSupportedChainId } from './utils';
import { useTranslation } from 'react-i18next';
import { ActionViewProps } from '..';
import { useENSContentHash } from 'hooks/Guilds/ens/useENSPublicResolverContract';
import { BiLinkExternal } from 'react-icons/bi';
import { getBlockExplorerUrl } from 'provider/chains';
import useIPFSFileMetadata from 'hooks/Guilds/ipfs/useIPFSFileMetadata';
import { useMemo } from 'react';
import { DiffView } from 'components/ActionsBuilder/DiffView';
import useIPFSFile from 'hooks/Guilds/ipfs/useIPFSFile';
import { DiffContainer, DiffDetail, DiffStat } from './styles';

const MAX_FILE_DIFF_BYTES = 64000; // 64kb

const UpdateENSContentSummary: React.FC<ActionViewProps> = ({
  decodedCall,
}) => {
  const { t } = useTranslation();
  const { parsedData } = useUpdateEnsContent({ decodedCall });
  const { chain } = useNetwork();
  const chainId = isSupportedChainId(chain.id);
  const { data: ensName } = useEnsName({
    address: parsedData?.from,
    chainId,
  });

  const { ipfsHash: currentIpfsHash } = useENSContentHash(ensName, chainId);
  const currentIpfsUrl = getIpfsUrl(currentIpfsHash);
  const { data: currentFileMetadata } = useIPFSFileMetadata(currentIpfsHash);
  const showCurrentFileDiff = useMemo(() => {
    return (
      currentFileMetadata?.fileSize &&
      currentFileMetadata?.mime === 'application/json' &&
      currentFileMetadata?.fileSize < MAX_FILE_DIFF_BYTES
    );
  }, [currentFileMetadata]);
  const { data: currentFile } = useIPFSFile<object>(
    showCurrentFileDiff ? currentIpfsHash : null
  );

  const newIpfsHash = convertToIpfsHash(parsedData?.contentHash);
  const newIpfsUrl = getIpfsUrl(newIpfsHash);
  const { data: newFileMetadata } = useIPFSFileMetadata(newIpfsHash);
  const showNewFileDiff = useMemo(() => {
    return (
      newFileMetadata?.fileSize &&
      newFileMetadata?.mime === 'application/json' &&
      newFileMetadata?.fileSize < MAX_FILE_DIFF_BYTES
    );
  }, [newFileMetadata]);
  const { data: newFile } = useIPFSFile<object>(
    showNewFileDiff ? newIpfsHash : null
  );

  const numChanges = useMemo(() => {
    const changes = diffLines(
      currentFile ? JSON.stringify(currentFile, null, 2) : '',
      newFile ? JSON.stringify(newFile, null, 2) : ''
    );
    return changes.reduce(
      ({ added, removed }, change) => {
        if (change.added) added += change.count;
        if (change.removed) removed += change.count;

        return { added, removed };
      },
      { added: 0, removed: 0 }
    );
  }, [currentFile, newFile]);

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
          {currentIpfsUrl ? (
            <StyledSegmentLink
              href={currentIpfsUrl || ''}
              target="_blank"
              rel="noopener"
            >
              {currentIpfsUrl || ''}
              <BiLinkExternal />
            </StyledSegmentLink>
          ) : (
            t('none')
          )}
        </DetailBody>
      </DetailRow>
      <DetailHeader>{t('ens.newContent')}</DetailHeader>
      <DetailRow>
        <DetailBody>
          {newFile ? (
            <DiffContainer>
              <DiffDetail>
                <StyledSegmentLink
                  href={newIpfsUrl || ''}
                  target="_blank"
                  rel="noopener"
                >
                  {newIpfsUrl || ''}
                  <BiLinkExternal />
                </StyledSegmentLink>

                <DiffStat removed>---{numChanges?.removed}</DiffStat>
                <DiffStat>+++{numChanges?.added}</DiffStat>
              </DiffDetail>
              <DiffView
                oldCode={
                  currentFile ? JSON.stringify(currentFile, null, 2) : ''
                }
                newCode={JSON.stringify(newFile, null, 2)}
              />
            </DiffContainer>
          ) : (
            <StyledSegmentLink
              href={newIpfsUrl || ''}
              target="_blank"
              rel="noopener"
            >
              {newIpfsUrl || ''}
              <BiLinkExternal />
            </StyledSegmentLink>
          )}
        </DetailBody>
      </DetailRow>
      <Summary decodedCall={decodedCall} blockExplorerUrl={blockExplorerUrl} />
    </>
  );
};

export default UpdateENSContentSummary;
