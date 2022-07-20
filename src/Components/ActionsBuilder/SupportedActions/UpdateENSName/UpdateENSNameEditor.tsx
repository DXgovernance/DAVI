/* eslint-disable react-hooks/exhaustive-deps */
import { StyledToolTip } from 'old-components/Guilds/common/ToolTip';
import React, { useState, useEffect } from 'react';
import { Control, ControlLabel, ControlRow, StyledInfoIcon } from './styles';
import Input from 'old-components/Guilds/common/Form/Input';
import { ReactComponent as Info } from 'assets/images/info.svg';
import { convertToContentHash, convertToNameHash, useDebounce } from './utils';
import useENSRegistry from 'hooks/Guilds/ether-swr/ens/useENSRegistry';
import { isEnsName, isIPFSHash } from './validation';
import { useTranslation } from 'react-i18next';
import { useWeb3React } from '@web3-react/core';
import { LOCALHOST_ID, MAINNET_ID } from 'utils';

const UpdateENSNameEditor = ({ decodedCall, updateCall }) => {
  const { t } = useTranslation();

  const [ensName, setEnsName] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

  // useDebounce will make sure we're not spamming the resolver
  const debouncedEnsName = useDebounce(ensName, 500);
  const debouncedIpfsHash = useDebounce(ipfsHash, 500);
  let { chainId } = useWeb3React();

  //QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4
  if (!chainId || chainId === LOCALHOST_ID) {
    chainId = MAINNET_ID;
  }
  const ensRegistry = useENSRegistry(debouncedEnsName, chainId);
  useEffect(() => {
    if (debouncedEnsName && isEnsName(debouncedEnsName)) {
      const nameHash = convertToNameHash(debouncedEnsName);
      updateCall({
        ...decodedCall,
        to: ensRegistry.resolverAddress,
        args: {
          ...decodedCall.args,
          node: nameHash,
        },
      });
    }
  }, [debouncedEnsName]);
  useEffect(() => {
    if (debouncedIpfsHash && isIPFSHash(debouncedIpfsHash)) {
      const contentHash = convertToContentHash(debouncedIpfsHash);
      updateCall({
        ...decodedCall,
        to: ensRegistry.resolverAddress,
        args: {
          ...decodedCall.args,
          hash: contentHash,
        },
      });
    }
  }, [debouncedIpfsHash]);

  return (
    <React.Fragment>
      <Control>
        <ControlLabel>
          {'ENS Name'}
          <StyledInfoIcon src={Info} />
          <StyledToolTip>{t('ensName.nameTooltip')}</StyledToolTip>
        </ControlLabel>
        <ControlRow>
          <Input value={ensName} onChange={e => setEnsName(e.target.value)} />
          <p>.eth</p>
        </ControlRow>
      </Control>
      <ControlRow>
        <Control>
          <ControlLabel>
            {'CID/IPFS Hash'}
            <StyledInfoIcon src={Info} />
            <StyledToolTip>{t('ensName.ipfsHashToolTip')}</StyledToolTip>
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

export default UpdateENSNameEditor;
