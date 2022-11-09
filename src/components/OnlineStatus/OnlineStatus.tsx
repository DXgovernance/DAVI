import React from 'react';
import useOnlineStatus from 'hooks/Guilds/useOnlineStatus';
import { OnlineStatusWrapper, Title, SubTitle } from './OnlineStatus.styled';
import { RiWifiOffLine } from 'react-icons/ri';
import { Flex } from 'components/primitives/Layout/Flex';
import { useTranslation } from 'react-i18next';

export const OnlineStatus: React.FunctionComponent<{
  children: React.ReactElement;
}> = ({ children }) => {
  const { isOnline } = useOnlineStatus();
  const { t } = useTranslation();

  return isOnline ? (
    children
  ) : (
    <OnlineStatusWrapper data-testid="offline-wrapper">
      <Flex>
        <RiWifiOffLine size={60} />
        <Title>{t('youAreNotOnline')}</Title>
        <SubTitle>{t('pleaseCheckYourInternetConnection')}</SubTitle>
      </Flex>
    </OnlineStatusWrapper>
  );
};
