import styled from 'styled-components';
import React from 'react';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
import { shortenAddress } from 'utils';
import { Avatar } from './Avatar';

const ENSAvatarContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  line-height: 0;
`;
const Address = styled.span`
  margin-left: 6px;
`;
interface ENSAvatarProps {
  address?: string;
  size?: number;
  displayEnsOrAddress?: boolean;
  shortAddress?: boolean;
}

export const ENSAvatar: React.FC<ENSAvatarProps> = ({
  address,
  size = 24,
  displayEnsOrAddress,
  shortAddress,
}) => {
  const { imageUrl, ensName } = useENSAvatar(address, 1);

  return (
    <ENSAvatarContainer>
      <Avatar src={imageUrl} defaultSeed={address} size={size} />
      {displayEnsOrAddress ? (
        <Address>
          {ensName ?? shortAddress ? shortenAddress(address) : address}
        </Address>
      ) : null}
    </ENSAvatarContainer>
  );
};

ENSAvatar.defaultProps = {
  displayEnsOrAddress: false,
  shortAddress: false,
};
