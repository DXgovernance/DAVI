import React from 'react';
import useOnlineStatus from 'hooks/Guilds/useOnlineStatus';
import { OnlineStatusWrapper, Title, SubTitle } from './OnlineStatus.styled';
import { RiWifiOffLine } from 'react-icons/ri';
import { Flex } from 'components/primitives/Layout/Flex';

export const OnlineStatus: React.FunctionComponent<{
  children: React.ReactElement;
}> = ({ children }) => {
  const { isOnline } = useOnlineStatus();

  return isOnline ? (
    children
  ) : (
    <OnlineStatusWrapper data-testid="offline-wrapper">
      <Flex>
        <RiWifiOffLine size={60} />
        <Title>You are not Online</Title>
        <SubTitle> Please check your internet connection</SubTitle>
      </Flex>
    </OnlineStatusWrapper>
  );
};
