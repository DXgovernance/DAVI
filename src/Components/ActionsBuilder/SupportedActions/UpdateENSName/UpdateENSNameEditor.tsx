import { StyledToolTip } from 'old-components/Guilds/common/ToolTip';
import React, { useState } from 'react';
import { Control, ControlLabel, ControlRow, StyledInfoIcon } from './styles';
import Input from 'old-components/Guilds/common/Form/Input';
import { ReactComponent as Info } from 'assets/images/info.svg';

const UpdateENSNameEditor = ({ decodedCall }) => {
  const [ensName, setENSName] = useState<string>('');
  const [IPFSHash, setIPFSHash] = useState<string>('');
  console.log({ decodedCall });
  const handleENSNameChange = (e: string) => {
    if (e) {
      setENSName(e);
    }
  };
  const handleIPFSHashChange = (e: string) => {
    if (e) {
      setIPFSHash(e);
    }
  };
  return (
    <React.Fragment>
      <Control>
        <ControlLabel>
          {'ENS Name'}
          <StyledInfoIcon src={Info} />
          <StyledToolTip>{'tip'}</StyledToolTip>
        </ControlLabel>
        <ControlRow>
          <Input
            value={ensName}
            onChange={e => handleENSNameChange(e.target.value)}
          />
          <p>.eth</p>
        </ControlRow>
      </Control>
      <ControlRow>
        <Control>
          <ControlLabel>
            {'CID/IPFS Hash'}
            <StyledInfoIcon src={Info} />
            <StyledToolTip>{'tips'}</StyledToolTip>
          </ControlLabel>
          <ControlRow>
            <Input
              value={IPFSHash}
              onChange={e => handleIPFSHashChange(e.target.value)}
            />
          </ControlRow>
        </Control>
      </ControlRow>
    </React.Fragment>
  );
};

export default UpdateENSNameEditor;
