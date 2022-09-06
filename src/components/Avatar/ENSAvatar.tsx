import styled from 'styled-components';
import React from 'react';
import useENSAvatar from 'hooks/Guilds/ens/useENSAvatar';
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
}

export const ENSAvatar: React.FC<ENSAvatarProps> = ({
  address,
  size = 24,
  displayEnsOrAddress,
}) => {
  const { imageUrl, ensName } = useENSAvatar(address, 1);

  return (
    <ENSAvatarContainer>
      <Avatar src={imageUrl} defaultSeed={address} size={size} />
      {/* {displayEnsOrAddress && ensName ? `${ensName}` : null} */}
      {displayEnsOrAddress ? <Address>{ensName ?? address}</Address> : null}
    </ENSAvatarContainer>
  );
};
