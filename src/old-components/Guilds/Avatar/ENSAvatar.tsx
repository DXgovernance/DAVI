import styled from 'styled-components';
import React from 'react';
import useENSAvatar from '../../../hooks/Guilds/ens/useENSAvatar';
import Avatar from '.';

const ENSAvatarContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  line-height: 0;
`;

interface ENSAvatarProps {
  address?: string;
  size?: number;
}

const ENSAvatar: React.FC<ENSAvatarProps> = ({ address, size = 24 }) => {
  const { imageUrl } = useENSAvatar(address, 1);

  return (
    <ENSAvatarContainer>
      <Avatar src={imageUrl} defaultSeed={address} size={size} />
    </ENSAvatarContainer>
  );
};

export default ENSAvatar;
