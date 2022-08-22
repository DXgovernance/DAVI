/* eslint-disable react-hooks/exhaustive-deps */
import { StyledToolTip } from 'components/ToolTip';
import React, { useState, useEffect } from 'react';
import { Control, ControlLabel, ControlRow, StyledInfoIcon } from './styles';
import Input from 'components/Primitives/Forms/Input';
import { ReactComponent as Info } from 'assets/images/info.svg';
import {
  convertToContentHash,
  convertToNameHash,
  isValidChainId,
} from './utils';
import { useDebounce } from 'hooks/Guilds/useDebounce';
import { isEnsName, isIpfsHash } from './validation';
import { useTranslation } from 'react-i18next';
import { useNetwork, useEnsResolver } from 'wagmi';
import { ActionEditorProps } from '..';
import { useUpdateEnsContent } from 'hooks/Guilds/guild/useUpdateEnsContent';

const UpdateENSContentEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  updateCall,
}) => {
  const { parsedData } = useUpdateEnsContent({ decodedCall });
  const { t } = useTranslation();
  const [ensName, setEnsName] = useState(parsedData?.optionalProps?.ensName);
  const [ipfsHash, setIpfsHash] = useState(parsedData?.optionalProps?.ipfsHash);

  // useDebounce will make sure we're not spamming the resolver
  const debouncedEnsName = useDebounce(ensName, 200);
  const debouncedIpfsHash = useDebounce(ipfsHash, 200);
  const fullEnsName = `${debouncedEnsName}.eth`;

  const { chain } = useNetwork();
  const chainId = isValidChainId(chain.id);
  const { data: resolver } = useEnsResolver({
    name: `${debouncedEnsName}.eth`,
    chainId,
  });

  useEffect(() => {
    if (debouncedEnsName && isEnsName(debouncedEnsName)) {
      const nameHash = convertToNameHash(fullEnsName);
      updateCall({
        ...decodedCall,
        to: resolver?.address,
        args: {
          ...decodedCall.args,
          node: nameHash,
        },
        optionalProps: {
          ...decodedCall.optionalProps,
          ensName: debouncedEnsName,
        },
      });
    }
  }, [debouncedEnsName]);
  useEffect(() => {
    if (debouncedIpfsHash && isIpfsHash(debouncedIpfsHash)) {
      const contentHash = convertToContentHash(debouncedIpfsHash);
      updateCall({
        ...decodedCall,
        to: resolver?.address,
        args: {
          ...decodedCall.args,
          hash: contentHash,
        },
        optionalProps: {
          ...decodedCall.optionalProps,
          ipfsHash: debouncedIpfsHash,
        },
      });
    }
  }, [debouncedIpfsHash]);
  return (
    <React.Fragment>
      <Control>
        <ControlLabel>
          {t('ens.name')}
          <StyledInfoIcon src={Info} />
          <StyledToolTip>{t('ens.nameTooltip')}</StyledToolTip>
        </ControlLabel>
        <ControlRow>
          <Input value={ensName} onChange={e => setEnsName(e.target.value)} />
          <p>.eth</p>
        </ControlRow>
      </Control>
      <ControlRow>
        <Control>
          <ControlLabel>
            {t('ens.ipfsHash')}
            <StyledInfoIcon src={Info} />
            <StyledToolTip>{t('ens.ipfsHashToolTip')}</StyledToolTip>
          </ControlLabel>
          <ControlRow>
            <Input
              value={ipfsHash}
              onChange={e => setIpfsHash(e.target.value)}
            />
          </ControlRow>
        </Control>
      </ControlRow>
    </React.Fragment>
  );
};

export default UpdateENSContentEditor;
