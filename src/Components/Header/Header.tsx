import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { NetworkButton } from '../NetworkButton';
import { WalletButton } from '../WalletButton';
import {
  HeaderWrapper,
  HeaderContainer,
  MenuItems,
  ClickableHeading,
} from './Header.styled';

const Header = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <HeaderWrapper as="header">
      <HeaderContainer>
        <ClickableHeading onClick={() => history.push('/')} size={2}>
          <strong>{t('guilds.guilds')}</strong>
        </ClickableHeading>
        <MenuItems>
          <NetworkButton />
          <WalletButton />
        </MenuItems>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
