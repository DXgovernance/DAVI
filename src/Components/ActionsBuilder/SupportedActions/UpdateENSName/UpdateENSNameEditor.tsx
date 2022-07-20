import { StyledToolTip } from 'old-components/Guilds/common/ToolTip';
import React from 'react';
import { Control, ControlLabel, ControlRow, StyledInfoIcon } from './styles';
import Input from 'old-components/Guilds/common/Form/Input';
import { ReactComponent as Info } from 'assets/images/info.svg';
import { useSetContentHash } from 'hooks/Guilds/guild/useSetContentHash';
import { convertToContentHash, convertToNameHash } from './utils';
// import { convertToContentHash, convertToNameHash } from './utils';

const UpdateENSNameEditor = ({ decodedCall, updateCall }) => {
  console.log({ decodedCall });
  console.log({ updateCall });

  const { parsedData } = useSetContentHash({ decodedCall });
  console.log(parsedData);

  // Ensname --> nameHash
  // Get the resolver
  // Set the resolver to "to" in the decoded call
  // Make sure the resolver is set to the correct address

  // useDebounce will make sure we're not spamming the resolver

  const setCallDataNameHash = (name: string) => {
    const nameHash = convertToNameHash(name);
    // findResolver(nameHash)
    updateCall({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        nameHash,
      },
    });
  };

  const setCallDataContentHash = (ipfsHash: string) => {
    const contentHash = convertToContentHash(ipfsHash);
    updateCall({
      ...decodedCall,
      args: {
        ...decodedCall.args,
        contentHash,
      },
    });
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
            value={''}
            onChange={e => setCallDataNameHash(e.target.value)}
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
              value={''}
              onChange={e => setCallDataContentHash(e.target.value)}
            />
          </ControlRow>
        </Control>
      </ControlRow>
    </React.Fragment>
  );
};

export default UpdateENSNameEditor;
